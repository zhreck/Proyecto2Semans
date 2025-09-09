# almacen/storage/admin.py
from django.contrib import admin
from .models import Archivo, Propiedad


@admin.register(Archivo)
class ArchivoAdmin(admin.ModelAdmin):
    list_display   = ("id", "nombre", "archivo", "creado")
    search_fields  = ("nombre",)
    list_filter    = ("creado",)
    date_hierarchy = "creado"
    ordering       = ("-creado",)


@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display  = ("id", "comuna", "precio", "vistas", "created_at")  # ← incluye 'vistas'
    list_filter   = ("comuna",)
    search_fields = ("id", "comuna")
    ordering      = ("-vistas", "-created_at")
    readonly_fields = ("vistas",)  # ← hace que 'vistas' no sea editable en el admin
    
    def miniatura(self, obj):
        if obj.foto:
            return format_html('<img src="{}" style="height:48px;border-radius:6px;">', obj.foto.url)
        return "—"
    miniatura.short_description = "Foto"
    