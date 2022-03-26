from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Question, Reply
from .serializers import QuestionSerializer, ReplySerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page
from django.core.cache import cache


class QuestionListAPI(ListAPIView):
  queryset = Question.objects.all().order_by('-created_at')
  serializer_class = QuestionSerializer
  #authentication_classes = (JWTAuthentication,)
  permission_classes = (AllowAny,)
  #pagination_class = PageNumberPagination



class RepliesListAPI(APIView):
  serializer_class = ReplySerializer
  #authentication_classes = (JWTAuthentication,)
  permission_classes = (AllowAny,)
  #pagination_class = PageNumberPagination
  def get_queryset(self):
        return Reply.objects.filter(question=self.id).order_by('-created_at')



class UserQuestionsListAPI(APIView):
  serializer_class = QuestionSerializer
  #authentication_classes = (JWTAuthentication,)
  permission_classes = (AllowAny,)
  #pagination_class = PageNumberPagination


  def get(self, request, id):
      queryset = Question.objects.filter(user=id).order_by('-created_at')
      #paginate_queryset = paginator.paginate_queryset(queryset, request)
      serializer = QuestionSerializer(queryset, many=True).data
      data = serializer
      print(data)
      return Response(data)


class RepliesListAPI(APIView):


    #parser_classes = [MultiPartParser, FormParser]

    def get_object(self, id):
        try:
            return Question.objects.get(pk=id)
          
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, id):
        queryset = Reply.objects.filter(question=self.get_object(id)).order_by('-created_at')
        #paginate_queryset = paginator.paginate_queryset(queryset, request)
        serializer = ReplySerializer(queryset, many=True).data
        data = serializer
        print(data)
        return Response(data)
  

@api_view(['GET', ])
@permission_classes((AllowAny,))
def api_detail_question_view(request, id):

   
    try:
        question = Question.objects.get(id=id)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
      serializer = QuestionSerializer(question)
      data = serializer.data
      if data["username"] == request.user.username:
        data["owner"] = True
      return Response(data)

class QuestionCreateView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    #parser_classes = [MultiPartParser, FormParser]
  

    def post(self, request, format=None):

        print(request.user.id)
        p = {"user": request.user.id}
        data = {**request.data, **p}
        print(data)
        serializer = QuestionSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentCreateView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    #parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404


    def post(self, request, id, format=None):

        print(request.user.id)
        p = {"user": request.user.id}
        quest = {"question": self.get_object(id).id}
        data = {**request.data, **p, **quest}
        print(data)
        serializer = ReplySerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT', ])
@permission_classes((IsAuthenticated,))
def verify_reply_api(request, quest_id,reply_id):

    try:
      question = Question.objects.get(id=quest_id)
    except Question.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    try:
      reply = Reply.objects.get(id=reply_id, question=question)
    except Reply.DoesNotExist:
      return Response(status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if question.user != user:
      return Response({'response' : "You don't have permission to edit that"})

    if request.method == "PUT":
      data = {
        "is_verified": True
      }
      serializer = ReplySerializer(reply, data=data, partial=True)
      if serializer.is_valid():
        serializer.save()
        data["success"] = "Verified Succesfuly"
        return Response(data=data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


