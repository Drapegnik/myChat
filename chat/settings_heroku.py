import dj_database_url

from chat.settings import *

DEBUG = False

DATABASES['default'] = dj_database_url.config()

ALLOWED_HOSTS = (
    'drapegnik-chat.herokuapp.com',
)
