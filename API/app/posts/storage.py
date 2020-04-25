# from django.core.files.storage import Storage,FileSystemStorage
# from django.conf import settings
# from django.utils.deconstruct import deconstructible
# import requests
# import os

# @deconstructible
# class PostImageStorage(Storage):
    
#     def __init__(self, options=None):
#         if not options:
#             self.options = settings.CUSTOM_STORAGE_OPTIONS

#     def _save(self, name, content):
#         auth = requests.auth.HTTPBasicAuth(self.options['PRIVATE_API_KEY'])
#         url = self.options['IMAGE_UPLOAD_URL']

#     def exists(self, name):
#         return False

#TODO add ImageKitService