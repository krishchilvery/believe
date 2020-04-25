from django.urls import path
from .views import UserProfileDetailView, UserRoleDetailView

app_name = 'users'

urlpatterns = [
    path('users/me', UserProfileDetailView.as_view(), name='profile'),
    path('users/me/role', UserRoleDetailView.as_view(), name='role'),
]