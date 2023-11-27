from django.urls import path
from .views import LoginAPI, RegisterAPI, LogoutAPI, AUserAPI, SaveImage

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('login/', LoginAPI),
    path('register/', RegisterAPI),
    path('logout/', LogoutAPI),
    path('get-account/', AUserAPI),

    path('up-image/', SaveImage),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)