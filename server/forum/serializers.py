from rest_framework import serializers
from django_restql.mixins import DynamicFieldsMixin
from .models import Question, Reply

class QuestionSerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username_from_author')
    user_profile_pic = serializers.SerializerMethodField('get_user_porfile_pic')
    comment_number = serializers.SerializerMethodField('post_comment_count')
    resolved = serializers.SerializerMethodField('get_is_resolved')

    class Meta:
        model = Question
        fields = ['id', 'user', 'title', 'question', 'created_at', 'username', 'comment_number', 'user_profile_pic', 'resolved']

    def get_username_from_author(self, question):
      username = question.user.username
      return username

    def get_user_porfile_pic(self, question):

        pic = question.user.profile_pic.url
        return pic

    def post_comment_count(self, question):
      comment_number = Reply.objects.filter(question=question).count()
      return comment_number

    def get_is_resolved(self, question):
      comment_number = Reply.objects.filter(question=question, is_verified=True).count()
      if comment_number > 0:
        return True
      else:
        return False
    
    def verify_is_owner(self, question):
      
      if self.request.user == question.user:
        return True
      else:
        return False


class ReplySerializer(DynamicFieldsMixin, serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username_from_author')
    user_profile_pic = serializers.SerializerMethodField('get_user_porfile_pic')

    class Meta:
        model = Reply
        fields = ['id','user', 'question', 'reply', 'created_at', 'username', 'is_verified', 'user_profile_pic']

    def get_username_from_author(self, question):
      username = question.user.username
      return username

    def get_user_porfile_pic(self, question):

        pic = question.user.profile_pic.url
        return pic

