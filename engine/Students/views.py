from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

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


