import imp
from itertools import product
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from .models import Prestamos
from .serializers import PrestamosSerializer,InventorySerializers

class JSONResponse(HttpResponse):
    def __init__(self,data,**kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type']='application/json'
        super(JSONResponse,self).__init__(content,**kwargs)
@csrf_exempt
def prestamos_list(request):
    if request.method == 'GET':
        prestamos = Prestamos.objects.all()

        serializer = InventorySerializers(prestamos,many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PrestamosSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data,status=201)
        return JSONResponse(serializer.errors,status=400)
        
@csrf_exempt
def prestamos_detail(request,pk):
    try:
        prestamo = Prestamos.objects.get(pk=pk)
    except Prestamos.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = PrestamosSerializer(prestamo)
        return JSONResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PrestamosSerializer(prestamo,data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors,status=400)
    elif request.method == 'DELETE':
        prestamo.delete()
        return HttpResponse(status=204)
