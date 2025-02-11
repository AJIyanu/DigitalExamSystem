from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

class DESUser(AbstractUser):
    """This user defines the auth model for the application"""
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.is_staff:
            self.email = None
            self.phone_number = None
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Teacher(models.Model):
    """Teacher model defines the teacher profile"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    user = models.OneToOneField(DESUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    middlename = models.CharField(max_length=20, blank=True, null=True)
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    date_of_birth = models.DateField("Date of Birth")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.user.is_staff = True
        self.user.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Admin(models.Model):
    """Admin model defines the teacher profile"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    user = models.OneToOneField(DESUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    middlename = models.CharField(max_length=20, blank=True, null=True)
    sex = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')])
    date_of_birth = models.DateField("Date of Birth")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def save(self, *args, **kwargs):
        self.user.is_staff = True
        self.user.is_admin = True
        self.user.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    
