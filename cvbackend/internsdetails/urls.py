from django.urls import path
from .views import StudentCreate, StudentList, hr_login

urlpatterns = [
    path("create/", StudentCreate.as_view()),
    path("", StudentList.as_view()),
    path("login/", hr_login, name="hr_login"),
]
