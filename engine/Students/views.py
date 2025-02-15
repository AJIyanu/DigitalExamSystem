from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student
from .models import AdmissionTracker
from .serializers import StudentSerializer
import uuid

def index(request):
    return HttpResponse("Hello, world. You're at the Students index.")


class student_login(APIView):
    def post(self, request):
        username = request.data.get('userName')
        password = request.data.get('password')
        user_type = request.data.get('userType')

        if user_type == 'student':
            user = authenticate(username=username,
                                password=password)
            print(user)
            if user is not None and user.student:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token

                access_token['userType'] = 'student'
                access_token['firstName'] = user.student.first_name
                access_token['lastName'] = user.student.last_name
                access_token['middleName'] = user.student.middle_name
                access_token['studentId'] = str(user.student.id)
                access_token['admissionNumber'] = user.student.admission_number

                response = JsonResponse({"msg": "Login successful!"})
                response.set_cookie(key='access_token', value=str(access_token), httponly=True)
                response.set_cookie(key='refresh_token', value=str(refresh), httponly=True)
                
                return response
            return Response({"msg": "invalid credentials or you are not a student!"}, status=401)
        return Response({"msg": "invalid user type!"}, status=401)
    
class student_logout(APIView):
    def get(self, request):
        response = JsonResponse({"msg": "Logout successful!"})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response

class new_student(APIView):
    def post(self, request):
        first_name = request.data.get('firstName')
        middle_name = request.data.get('middleName')
        last_name = request.data.get('lastName')
        sex = request.data.get('sex')
        # admission_number = request.data.get('admissionNumber')
        date_of_birth = request.data.get('dateOfBirth').split('T')[0]

        currentyear = now().year
        counter, created = AdmissionTracker.objects.get_or_create(year=currentyear)
        counter.count += 1
        counter.save()
        admission_number = f"{currentyear}-{str(counter.count).zfill(3)}"

        student = Student.objects.create(first_name=first_name,
                                         id=uuid.uuid4(),
                                         middle_name=middle_name,
                                         last_name=last_name,
                                         date_of_birth=date_of_birth,
                                         admission_number=admission_number,
                                         sex=sex
                                         )
        student.save()
        print(StudentSerializer(student).data)
        return Response({"msg": "Student created successfully!"}, status=201)

