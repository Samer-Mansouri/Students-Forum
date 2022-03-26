from django.db import models
from user.models import User
# Create your models here.

class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True, null=True)
    question = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reply = models.CharField(max_length=255)
    is_verified = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
