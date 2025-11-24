from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import qrcode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer
from rest_framework.permissions import IsAuthenticated

# JWT imports
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

# ---------------------------
# Student APIs
# ---------------------------
class StudentCreate(APIView):
    permission_classes = [AllowAny]  # Protected
    authentication_classes = [] 

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Student added"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentList(APIView):
    permission_classes = [IsAuthenticated]  # Protected
    def get(self, request):
        students = Student.objects.all().order_by('-id')
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

# ---------------------------
# QR Code Generator
# ---------------------------
def generate_qr(request):
    url = "http://10.119.108.182:5173/" 
    qr_img = qrcode.make(url)
    
    response = HttpResponse(content_type="image/png")
    qr_img.save(response, "PNG")
    return response

# ---------------------------
# HR Login using JWT
# ---------------------------
from rest_framework.decorators import api_view

@api_view(["POST"])
def hr_login(request):
    username_or_email = request.data.get("username")
    password = request.data.get("password")

    # 1️⃣ Try login directly as username
    user = authenticate(username=username_or_email, password=password)

    # 2️⃣ If that fails, try searching by email
    if user is None:
        try:
            user_obj = User.objects.get(email=username_or_email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            return Response({"detail": "Invalid username or email"}, status=401)

    # 3️⃣ If still None => invalid password
    if user is None:
        return Response({"detail": "Invalid password"}, status=401)

    # 4️⃣ Success → Generate token
    refresh = RefreshToken.for_user(user)
    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    })