from django.urls import path
from .views import (
  registration_view,
  token_blacklist,
  check_token,
  test_view,
  GetUser,
)
from rest_framework_simplejwt import views as jwt_views





app_name = "users"

urlpatterns = [
  path('register', registration_view, name="register"),
  path('login', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
  path('token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
  path('profile/<int:pk>', GetUser.as_view(), name="get-user"),
  path('logout', token_blacklist, name="logout"),
  path('check', check_token, name="check_token"),
  path('test', test_view, name="test_view"),
]
