from django.conf.urls import url

from storage.views import get_messages, change_messages, home

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^chat$', change_messages, name='change'),
    url(r'^chat/TN(?P<code>[0-9]{2,})EN/$', get_messages, name='get'),
]
