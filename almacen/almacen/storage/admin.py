from django.contrib import admin
from .models import Archivo, Propiedad

@admin.register(Archivo)
class ArchivoAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "archivo", "creado")
    search_fields = ("nombre",)
    list_filter = ("creado",)

@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ("id", "comuna", "precio", "created_at")
    list_filter = ("comuna",)
    search_fields = ("comuna",)
