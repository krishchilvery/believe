from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UnverifiedPostSerializer, UserPostSerializer, VerifiedPostSerializer
from .models import Post
from .permissions import IsAdmin, IsOwner, IsUnverified

# Create your views here.

class UserPostListCreateView(ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser]
    def get_queryset(self):
        user = self.request.user
        return user.posts.all().order_by('-post_date')
    permission_classes = [IsAuthenticated]
    serializer_class = UserPostSerializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UnverifiedPostListView(ListAPIView):
    queryset = Post.objects.filter(verification = Post.UNVERIFIED).order_by('-post_date')
    serializer_class = UnverifiedPostSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

class VerifiedPostListView(ListAPIView):
    queryset = Post.objects.filter(verification = Post.VERIFIED).order_by('-verified_date')
    serializer_class = VerifiedPostSerializer
    permission_classes = [IsAuthenticated]

class UserPostView(RetrieveUpdateDestroyAPIView):
    parser_classes = [MultiPartParser, FormParser]
    queryset = Post.objects.all()
    serializer_class = UserPostSerializer
    permission_classes = [IsOwner, IsAuthenticated, IsUnverified]