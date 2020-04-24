from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status

# Create your tests here.
class UserPostListCreateViewTests(APITestCase):
    
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(email="test@test.com", password="foo")
        self.client.force_authenticate(user=self.user)
        
    def test_get_user_posts(self):
        url = reverse("posts:user")
        self.user.posts.create(title="Test Post")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['title'],"Test Post")

    def test_create_user_post(self):
        url = reverse("posts:user")
        response = self.client.post(url, data={'title':'Test Post'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Test Post')
        response = self.client.post(url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        