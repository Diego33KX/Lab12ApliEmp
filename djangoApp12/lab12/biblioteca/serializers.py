from pyexpat import model
from rest_framework import serializers
from .models import Libro, Prestamos, Usuario


class PrestamosSerializer(serializers.ModelSerializer):
    #idLibro = serializers.CharField(source='idLibro.titulo')
    #idUsuario = serializers.CharField(source='idUsuario.nombre')
    class Meta:
        model = Prestamos
        fields=('id','idLibro','idUsuario','fecPrestamo','fecDevolucion')

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields=('id','autor','codigo','titulo','isbn','editorial','numPags')

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields=('id','numUsuario','nif','nombre','direccion','telefono')
#ENLAZAMOS LOS CAMPO FOREIGN KEY PARA OBTENER LOS VALORES DE LA OTRA TABLA
class InventorySerializers(serializers.ModelSerializer):
    model_b = LibroSerializer(source = "idLibro")
    model_u = UsuarioSerializer(source = "idUsuario")
    class Meta:
        model = Prestamos
        fields=('id','idLibro','idUsuario','fecPrestamo','fecDevolucion','model_b','model_u')