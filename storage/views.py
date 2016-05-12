import json
import uuid

from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from storage.models import Message


# Create your views here.

def home(request):
    return render(request, 'home.html')


def get_messages(request, code):
    index = (int(code) - 11) / 8
    messages = Message.objects.all()
    data = obj_to_json(messages[index:])
    data['token'] = 'TN' + str(len(messages) * 8 + 11) + 'EN'
    return JsonResponse(data)


def change_messages(request):
    if request.method == 'POST':
        return do_post(request)
    elif request.method == 'PUT':
        return do_put(request)
    elif request.method == 'DELETE':
        return do_delete(request)


def do_post(request):
    data = json.loads(request.body)
    data['author'] = request.user
    data['mes_id'] = uuid.uuid1()
    Message.objects.create(**data)
    return HttpResponse(200)


def do_put(request):
    data = json.loads(request.body)
    Message.objects.create(author=request.user, mes_id=data['mes_id'], order_id=data['order_id'], text=data['text'],
                           status='edit')
    return HttpResponse(200)


def do_delete(request):
    Message.objects.create(author=request.user, mes_id=request.GET.get('mes_id'), order_id=request.GET.get('order_id'),
                           text='message was delete', status='delete')
    return HttpResponse(200)


def obj_to_json(objects):
    messages = serializers.serialize('json', objects)
    data = dict()
    data['messages'] = []
    for mes in json.loads(messages):
        mes['fields']['author'] = User.objects.get(id=mes['fields']['author']).username
        data['messages'].append(mes['fields'])
    return data
