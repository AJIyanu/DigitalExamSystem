from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Scoresheet, Student, Level

User = get_user_model()

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"