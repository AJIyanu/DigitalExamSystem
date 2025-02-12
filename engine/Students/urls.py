from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/studentlogin/', views.student_login.as_view(), name='student_login'),
]