import imp
from django.contrib import admin
from .models import Libro,Autor, Prestamos,Usuario
# Register your models here.
admin.site.register(Libro)
admin.site.register(Autor)
admin.site.register(Usuario)
admin.site.register(Prestamos)
