from django.contrib import admin
from .models import Message


# Register your models here.

class MessageAdmin(admin.ModelAdmin):
    fields = ['mes_id', 'order_id', 'author', 'text', 'status']
    list_display = ('id', 'mes_id', 'order_id', 'author', 'text', 'time', 'status')
    search_fields = ['id', 'mes_id', 'order_id', 'author', 'text', 'time', 'status']


admin.site.register(Message, MessageAdmin)
