from django.apps import AppConfig


class UsuariosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'usuarios'

from django.contrib import admin
from .models import Propiedad
@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ("id", "comuna", "precio", "created_at")
    list_filter = ("comuna",)
    search_fields = ("comuna",)
