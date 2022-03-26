from django.urls import path
from .chat import message






app_name = "chat"

urlpatterns = [
  path('message', message, name="message"),
]
