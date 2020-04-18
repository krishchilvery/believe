from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import ugettext_lazy as _

class UserManager(BaseUserManager):
    
    def _create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, *kwargs)
        user.set_password(password)
        return user

    def create_user(self, email, password=None, **kwargs):
        user = self._create_user(email, password, **kwargs)
        user.is_superuser = False
        user.save()
        return user

    def create_superuser(self, email, password=None, **kwargs):
        try:
            if kwargs.get("is_superuser") == False:
                raise ValueError("While creating a superuser is_superuser must be True")
        except AttributeError:
            pass
        user = self._create_user(email, password, **kwargs)
        user.is_superuser = True
        user.save()
        return user