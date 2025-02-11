from django.db import models
from uuid import uuid4
# from Exam.models import Subject
from django.conf import settings

class Student(models.Model):
    """this class will hold the student details"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField("Date of Birth")
    admission_number = models.CharField(max_length=10, unique=True)
    sex = models.CharField(max_length=6, choices=[("Male", "Male"), ("Female", "Female")])
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.user:
            user = settings.AUTH_USER_MODEL.objects.create(
                username=self.admission_number,
                password=self.last_name.lower()
                )
            user.save()
            self.user = user
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}, ({self.admission_number})"
    

class Level(models.Model):
    """this class will hold the level details"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    level = models.CharField(max_length=50)
    term = models.CharField(max_length=10, choices=[("First", "First"), ("Second", "Second"), ("Third", "Third")])
    level_description = models.CharField(max_length=50)
    total_number_of_students = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.level} {self.term} Term"

class Scoresheet(models.Model):
    """This is the individual student scoresheet for each subject"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    student = models.ForeignKey("Student", on_delete=models.CASCADE)
    subject = models.ForeignKey("Exam.Subject", on_delete=models.SET_NULL, null=True)
    level = models.ForeignKey("Level", on_delete=models.SET_NULL, null=True)
    attendance = models.IntegerField(default=0)
    assignment = models.IntegerField(default=0)
    test = models.IntegerField(default=0)
    exam = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    grade = models.CharField(max_length=2, default="F9")
    year = models.IntegerField(default=2025)

    class Meta:
        indexes = [
            models.Index(fields=['year']),
            models.Index(fields=['year', 'student']),
            models.Index(fields=['year', 'subject']),
            models.Index(fields=['year', 'subject', 'level']),
        ]

    def __str__(self):
        return f"{self.student.admission_number} {self.subject} {self.level} {self.year} {self.total}"


