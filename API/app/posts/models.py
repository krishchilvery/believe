from django.db import models
from users.models import User
import os
# from .storage import PostImageStorage

# Create your models here.

def content_file_name(instance, filename):
    filename = "%s/%s" %(instance.owner.id, filename)
    return filename

class Post(models.Model):
    title = models.CharField(max_length=200, blank=False, default=None)

    text = models.TextField(blank=True)
    url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to=content_file_name, blank=True, null=True)

    owner = models.ForeignKey(User,on_delete=models.SET_NULL, null=True, blank=True, related_name="posts")
    post_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    UNVERIFIED = 'UV'
    FAKE = 'F'
    VERIFIED = 'V'
    verification_choices = [
        ('UV', 'Unverified'),
        ('F', 'Fake'),
        ('V', 'Verified')
    ]

    verification = models.CharField(max_length=2, choices=verification_choices, default=UNVERIFIED)
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="verified_posts", blank=True, null=True)
    verified_date = models.DateTimeField(blank=True, null=True)