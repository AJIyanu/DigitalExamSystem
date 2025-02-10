from django.db import models
from uuid import uuid4
from Exam.models import Subject

class Student(models.Model):
    """this class will hold the student details"""
    id = models.CharField(
    primary_key=True,
    max_length=32,
    default=lambda: str(uuid4()).replace('-', ''),
    editable=False
    )
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    date_of_birth = models.DateField("Date of Birth")
    admission_number = models.CharField(max_length=10, unique=True)
    sex = models.CharField(max_length=6, choices=[("Male", "Male"), ("Female", "Female")])
    

class Level(models.Model):
    """this class will hold the level details"""
    id = models.CharField(
    primary_key=True,
    max_length=32,
    default=lambda: str(uuid4()).replace('-', ''),
    editable=False
    )
    level = models.CharField(max_length=50)
    term = models.CharField(max_length=10, choices=[("First", "First"), ("Second", "Second"), ("Third", "Third")])
    level_description = models.CharField(max_length=50)
    total_number_of_students = models.IntegerField(default=0)

class Scoresheet(models.Model):
    """This is the individual student scoresheet for each subject"""
    id = models.CharField(
    primary_key=True,
    max_length=32,
    default=lambda: str(uuid4()).replace('-', ''),
    editable=False
    )
    student = models.ForeignKey("Student", on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True)
    Level = models.ForeignKey("Level", on_delete=models.SET_NULL, null=True)
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


