from rest_framework import serializers
from .models import Post

class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('verification','verified_by','verified_date', 'owner','post_date','updated_date')
    
class UnverifiedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('owner','post_date','updated_date')

class VerifiedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        exclude = ('owner','post_date','updated_date')
        read_only_fields = ('verification','verified_by','verified_date')