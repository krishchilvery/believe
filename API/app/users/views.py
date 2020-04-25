from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from .models import UserProfile
from .serializers import UserProfileSerializer, UserRoleSerializer
from .permissions import IsOwnerProfileOrReadOnly

# Create your views here.   

class UserProfileDetailView(RetrieveUpdateAPIView):
    def get_object(self):
        user = self.request.user
        return user.profile
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, IsOwnerProfileOrReadOnly]

class UserRoleDetailView(RetrieveAPIView):
    def get_object(self):
        user = self.request.user
        return user.profile
    serializer_class = UserRoleSerializer
    permission_classes = [IsAuthenticated, IsOwnerProfileOrReadOnly]
