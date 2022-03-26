from pyexpat import model
from readline import replace_history_item
import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import Question, Reply


class QuestionType(DjangoObjectType):

    class Meta:
        model = Question
        fields = ('id', 'title', 'question', 'created_at',)

class ReplyType(DjangoObjectType):

    class  Meta:
        model = Reply
        fields = ('user', 'reply', 'is_verified', 'created_at',)

class Query(graphene.ObjectType):

    question = graphene.Field(QuestionType, id=graphene.Int())
    questions = graphene.List(QuestionType, id=graphene.Int())
    question_replies = graphene.List(ReplyType, id=graphene.Int())
    replies = graphene.List(ReplyType, id=graphene.Int())

    def resolve_question(root, info, id):
        return Question.objects.get(pk=id)

    def resolve_questions(roor, info):
        return Question.objects.all()

    def resolve_question_replies(root, info, id):
        return Reply.objects.filter(question=id)

    def resolve_replies(root, info):
        return Reply.objects.all()

schema = graphene.Schema(query=Query)
