from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Archivo

@admin.register(Archivo)
class ArchivoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "archivo", "creado")
    search_fields = ("nombre",)
    list_filter = ("creado",)
