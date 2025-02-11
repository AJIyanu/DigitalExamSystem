from django.db import models
# from AdminStaff.models import Teacher
from uuid import uuid4

class Subject(models.Model):
    """this class will hold the subject details"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    subject = models.CharField(max_length=15, unique=True)
    subject_description = models.CharField(max_length=50)
    total_number_of_students = models.IntegerField(default=0)
    teacher = models.ForeignKey("AdminStaff.Teacher", on_delete=models.CASCADE)

    def __str__(self):
        return self.subject

class SubjectScoreSheet(models.Model):
    """this class describes the score sheet definition for each subject"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    level = models.ForeignKey("Students.Level", on_delete=models.CASCADE)
    mark_obtainable_attendance = models.IntegerField(default=10)
    mark_obtainable_assignment  = models.IntegerField(default=10)
    mark_obtainable_test = models.IntegerField(default=20)
    mark_obtainable_exam = models.IntegerField(default=60)

    def __str__(self):
        return f"{self.subject} {self.level}"

class Question(models.Model):
    """this class holds every question for a subject"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    level = models.ForeignKey("Students.Level", on_delete=models.CASCADE)
    question_type = models.CharField(max_length=20, choices=[("multiple_choice", "multiple_choice"),
                                                             ("radio_choice", "radio_choice"),
                                                             ("boolean", "boolean")])
    question = models.CharField(max_length=255)
    instruction = models.CharField(max_length=255)
    answer1 = models.CharField(max_length=125, null=True, blank=True)
    answer2 = models.CharField(max_length=125, null=True, blank=True)
    answer3 = models.CharField(max_length=125, null=True, blank=True)
    answer4 = models.CharField(max_length=125, null=True, blank=True)
    option1 = models.CharField(max_length=125)
    option2 = models.CharField(max_length=125)
    option3 = models.CharField(max_length=125, null=True, blank=True)
    option4 = models.CharField(max_length=125, null=True, blank=True)

    def __str__(self):
        return self.question

class SolvedQuestion(models.Model):
    """This is the solutions every student has solved"""
    id = models.CharField(
    primary_key=True,
    max_length=36,
    default=str(uuid4),
    editable=False
    )
    student = models.ForeignKey("Students.Student", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=125)
    answer2 = models.CharField(max_length=125, null=True, blank=True)
    answer3 = models.CharField(max_length=125, null=True, blank=True)
    answer4 = models.CharField(max_length=125, null=True, blank=True)

    def __str__(self):
        return f"{self.question.question} - {self.answer} | {self.student.first_name}"
    
