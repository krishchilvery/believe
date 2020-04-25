from django.urls import path
from .views import UserPostListCreateView, VerifiedPostListView, UnverifiedPostListView, UserPostView, PostVerifyView

app_name = "posts"
urlpatterns = [
    path('posts/me', UserPostListCreateView.as_view(), name="user"),
    path('posts/verified', VerifiedPostListView.as_view(), name="verified"),
    path('posts/unverified', UnverifiedPostListView.as_view(), name="unverified"),
    path('posts/<int:pk>', UserPostView.as_view(), name="update"),
    path('posts/verify/<int:pk>', PostVerifyView.as_view(), name="verify")
]