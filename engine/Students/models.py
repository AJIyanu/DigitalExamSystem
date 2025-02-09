from django.db import models
from uuid import uuid4

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
    middle_name = models.CharField(max_length=50, optional=True)
    date_of_birth = models.DateField("Date of Birth")
    admission_number = models.CharField(max_length=10, unique=True)
    sex = models.CharField(max_length=6, choices=[("Male", "Male"), ("Female", "Female")])
    level = models.ForeignKey("Level", on_delete=models.SET_NULL, null=True)
    

class Level(models.Model):
    """this class will hold the level details"""
    id = models.CharField(
    primary_key=True,
    max_length=32,
    default=lambda: str(uuid4()).replace('-', ''),
    editable=False
    )
    level = models.CharField(max_length=50)
    level_description = models.CharField(max_length=50)
    total_number_of_subjects = models.IntegerField(default=0)

class Scoresheet(models.Model):
    """This is the individual student scoresheet for each subject"""
    id = models.CharField(
    primary_key=True,
    max_length=32,
    default=lambda: str(uuid4()).replace('-', ''),
    editable=False
    )
    student = models.ForeignKey("Student", on_delete=models.CASCADE)
    subject = models.ForeignKey("Subject", on_delete=models.SET_NULL, null=True)
    Level = models.ForeignKey("Level", on_delete=models.SET_NULL, null=True)
    attendance = models.IntegerField(default=0)
    assignment = models.IntegerField(default=0)
    test = models.IntegerField(default=0)
    exam = models.IntegerField(default=0)
