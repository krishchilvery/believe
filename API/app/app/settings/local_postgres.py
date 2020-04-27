from .base import *

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

postgres_config = get_env_var("LOCAL_POSTGRES")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': postgres_config['NAME'],
        'USER': postgres_config['USERNAME'],
        'PASSWORD': postgres_config['PASSWORD'],
        'HOST': postgres_config['HOST']
    }
}

# Application definition

ALLOWED_HOSTS = [
    '192.168.0.104',
    'localhost',
]

#CORS

CORS_ORIGIN_WHITELIST = (
    "http://localhost:3000",
    "http://192.168.0.104:3000",
)

#JWT TOKEN SETTINGS

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=5),
}