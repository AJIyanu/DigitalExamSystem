from django.contrib import admin
from .models import Student, Scoresheet, Level, AdmissionTracker

admin.site.register(Student)
admin.site.register(Scoresheet)
admin.site.register(Level)
admin.site.register(AdmissionTracker)

# Register your models here.
