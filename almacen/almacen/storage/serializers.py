from rest_framework import serializers
from .models import Archivo
from .models import Propiedad

class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = ["id", "nombre", "archivo", "creado"]

class PropiedadSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Propiedad
        fields = ["id", "foto", "precio", "comuna", "vistas", "created_at"]