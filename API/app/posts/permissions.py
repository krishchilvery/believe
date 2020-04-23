from rest_framework.permissions import BasePermission
from .models import Post

class IsAdmin(BasePermission):
    message="Only admin can access unverified posts"
    def has_permission(self, request, view):
        return request.user.profile.is_admin
    def has_object_permission(self, request, view, obj):
        return request.user.profile.is_admin

class IsOwner(BasePermission):
    message="Only Owner can update posts"
    def has_object_permission(self, request, view, obj):
        return request.user == obj.owner

class IsUnverified(BasePermission):
    message="Post must be unverified to edit"
    def has_object_permission(self, request, view, obj):
        return obj.verification == Post.UNVERIFIED