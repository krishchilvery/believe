from rest_framework import serializers
from .models import UserProfile, User

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    updated_on = serializers.DateTimeField(read_only=True)
    class Meta:
        model = UserProfile
        fields='__all__'

class UserRoleSerializer(serializers.ModelSerializer):
    is_admin = serializers.BooleanField(read_only=True)
    class Meta:
        model = UserProfile
        fields=('is_admin',)