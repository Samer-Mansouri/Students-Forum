from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static 
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('user.urls', 'users_api')),
    path('api/forum/', include('forum.urls', 'forum_api')),
    path('api/chat/', include('chat.urls', 'chat_api')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
