from django.urls import path
from .views import (
    QuestionListAPI,
    api_detail_question_view,
    QuestionCreateView,
    CommentCreateView,
    verify_reply_api,
    RepliesListAPI,
    UserQuestionsListAPI,
)
from django.conf.urls.static import static 
from django.conf import settings
from graphene_django.views import GraphQLView
from .schema import  schema
from django.views.decorators.csrf import csrf_exempt

app_name = 'forum'

urlpatterns = [
  path('', QuestionListAPI.as_view(), name="question-list"),
  path('<int:id>', api_detail_question_view, name="single-question"),
  path('create', QuestionCreateView.as_view(), name="create-question"),
  path('reply/<int:id>', CommentCreateView.as_view(), name="quest-reply"),
  path('replies/<int:id>', RepliesListAPI.as_view(), name="quest-replies"),
  path('verifyreply/<int:quest_id>/<int:reply_id>', verify_reply_api, name="verify-reply"),
  path('userquest/<int:id>', UserQuestionsListAPI.as_view(), name="userquest"),
  path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)