from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import User
from .serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
#from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
 
@api_view(['POST', ])
@permission_classes((AllowAny,))
def registration_view(request):

  if request.method == "POST":
    
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
      user = serializer.save()
      data["response"] = "Successfully registred a new user"
      data["email"] = user.email
      data["username"] = user.username
      #token = Token.objects.get(user=user).key
      #data['token'] = token
    else:
      data = serializer.errors
    return Response(data)

@api_view(['POST', ])
@permission_classes((AllowAny, ))
def check_token(request):

  if request.method == "POST":
    token = request.data.get('token')
    token = RefreshToken(token)
    print(token)
    print(token.check_blacklist())
    if(token.check_blacklist()):
      return Response("blacklisted")
    else:
      return Response("Good")

@api_view(['POST', ])
@permission_classes((AllowAny,))
def token_blacklist(request):
  
  if request.method == "POST":
    token = request.data.get('refresh')
    token = RefreshToken(token)
    token.blacklist()
    return Response("Logged out")

@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
@authentication_classes((JWTAuthentication,))
def test_view(request):
  
  if request.method == "GET":
    return Response({"Message": "Hello Bro"})


class GetUser(APIView):


  def get_object(self, pk): 
    try: 
      return User.objects.get(pk=pk) 
    except User.DoesNotExist: 
      raise Http404
  
  def get(self, request, pk, format=None):
    user = self.get_object(pk) 
    serializer = RegistrationSerializer(user) 
    return Response(serializer.data) 