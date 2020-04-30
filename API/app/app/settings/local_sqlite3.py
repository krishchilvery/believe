from .base import *

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Application definition

ALLOWED_HOSTS = [
    '192.168.0.101',
    'localhost',
]

#CORS

CORS_ORIGIN_WHITELIST = (
    "http://localhost:3000",
    "http://192.168.0.101:3000",
)

#JWT TOKEN SETTINGS

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=5),
}