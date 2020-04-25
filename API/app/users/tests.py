from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

# Create your tests here.

class UserManagerTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="normal@user.com", password="foo")
        self.assertEqual(user.email, "normal@user.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_superuser)
        try:
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(ValueError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password='foo')


    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email="super@user.com", password="foo")
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_superuser)
        try:
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='super@user.com', password="foo", is_superuser=False)

class UserProfileDetailViewTest(APITestCase):

    def setUp(self):
        User = get_user_model()
        self.email = "test@test.com"
        self.user = User.objects.create_user(email=self.email,password="foo")
        self.client.force_authenticate(user=self.user)

    def test_get_profile(self):
        url = reverse('users:profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'],self.email)

    def test_update_user_profile(self):
        url = reverse('users:profile')
        response = self.client.patch(url,data={'first_name':'john', 'last_name':'doe'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.profile.first_name,"john")
        self.assertEqual(self.user.profile.last_name,"doe")

class UserRoleDetailViewTest(APITestCase):

    def setUp(self):
        User = get_user_model()
        self.email = "test@test.com"
        self.user = User.objects.create_user(email=self.email,password="foo")
        self.client.force_authenticate(user=self.user)

    def test_get_role(self):
        url = reverse('users:role')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)