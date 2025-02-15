from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.student_login.as_view(), name='student_login'),
    path('logout/', views.student_logout.as_view(), name='student_logout'),
    path('new/', views.new_student.as_view(), name='new_student'),
]