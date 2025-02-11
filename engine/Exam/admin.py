from django.contrib import admin
from .models import SolvedQuestion, Subject, SubjectScoreSheet, Question

admin.site.register(SolvedQuestion)
admin.site.register(Subject)
admin.site.register(SubjectScoreSheet)
admin.site.register(Question)

# Register your models here.
