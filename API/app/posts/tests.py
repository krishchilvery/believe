from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from .models import Post
from django.utils.timezone import now

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
        self.assertEqual(response.data['owner'],self.user.id)
        response = self.client.post(url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
class UnverifiedPostListViewTests(APITestCase):

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(email="test@test.com", password="foo")
        self.adminUser = User.objects.create(email="admintest@test.com", password="foo")
        self.adminUser.profile.is_admin = True
        self.adminUser.profile.save()

    def test_get_unverified_post_list(self):
        url = reverse("posts:unverified")
        Post.objects.create(title="Test Post")
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.force_authenticate(user=self.adminUser)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['title'],"Test Post")

class VerifiedPostListViewTests(APITestCase):

    def setUp(self):
        User = get_user_model()
        user = User.objects.create(email="test@test.com", password="foo")
        self.client.force_authenticate(user=user)

    def test_get_verified_post_list(self):
        url = reverse("posts:verified")
        Post.objects.create(title="Test Post", verification=Post.VERIFIED)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'][0]['title'], "Test Post")

class UserPostViewTests(APITestCase):

    def setUp(self):
        User = get_user_model()
        user = User.objects.create(email="test@test.com", password="foo")
        self.client.force_authenticate(user=user)
        self.url = '/posts/1'
        self.post = user.posts.create(title="Test Post")
        self.verifiedPost = user.posts.create(title="Test verified Post", verification=Post.VERIFIED)
        self.verifiedUrl = '/posts/2'

    def test_get_posts(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Test Post")

        response = self.client.get(self.verifiedUrl)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_posts(self):
        response = self.client.patch(self.url, {'title':'Test update Post'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Test update Post")

        response = self.client.get(self.verifiedUrl, {'title':'Test update verified Post'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_delete_posts(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        response = self.client.delete(self.verifiedUrl)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class PostVerifyViewTests(APITestCase):

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(email="test@test.com", password="foo")
        self.adminUser = User.objects.create(email="admintest@test.com", password="foo")
        self.adminUser.profile.is_admin = True
        self.adminUser.profile.save()

    def test_admin_update_verified_post(self):
        post = Post(title="Test verified post", verification=Post.VERIFIED)
        post.save()
        url = reverse("posts:verify", args=[post.pk])
        self.client.force_authenticate(user=self.adminUser)
        response = self.client.patch(url, data={"verification":"V"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_admin_update_post_verify(self):
        post = Post(title="Test post")
        post.save()
        url = reverse("posts:verify", args=[post.pk])
        self.client.force_authenticate(user=self.adminUser)
        response = self.client.patch(url, data={"verification":"V"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["verification"],"V")
        self.assertEqual(response.data["verified_by"],self.adminUser.id)

    def test_admin_update_post_random_char(self):
        post = Post(title="Test post")
        post.save()
        url = reverse("posts:verify", args=[post.pk])
        self.client.force_authenticate(user=self.adminUser)
        response = self.client.patch(url, data={"verification":"K"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_normal_update_post_verify(self):
        post = Post(title="Test post")
        post.save()
        url = reverse("posts:verify", args=[post.pk])
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(url, data={"verification":"V"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        




