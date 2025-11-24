from django.db import models

# Create your models here.

class Student(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course = models.CharField(max_length=200)

    cv = models.FileField(upload_to="cv/")
    photo = models.ImageField(upload_to="photos/")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

        