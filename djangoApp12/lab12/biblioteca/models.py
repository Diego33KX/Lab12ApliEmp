from django.db import models

# Create your models here.
class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre

class Libro(models.Model):
    autor = models.ForeignKey(Autor,on_delete=models.CASCADE)
    codigo = models.IntegerField(default=0)
    titulo = models.CharField(max_length=100)
    isbn = models.CharField(max_length=30)
    editorial = models.CharField(max_length=60)
    numPags = models.IntegerField(default=0)
    def __str__(self):
        return self.titulo

class Usuario(models.Model):
    numUsuario = models.IntegerField(default=0)
    nif = models.CharField(max_length=20)
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    def __str__(self):
        return self.nombre

class Prestamos(models.Model):
    idLibro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    idUsuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecPrestamo = models.DateField()
    fecDevolucion = models.DateField()


