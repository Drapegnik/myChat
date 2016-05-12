from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db.models import Model, ForeignKey, DateTimeField, CharField, IntegerField


# Create your models here.

class Message(Model):
    author = ForeignKey(User)
    mes_id = CharField(max_length=256)
    order_id = IntegerField()
    time = DateTimeField(auto_now_add=True, editable=False)
    text = CharField(max_length=5000)
    status = CharField(max_length=100)
