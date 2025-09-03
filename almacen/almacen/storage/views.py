from django.shortcuts import render 
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets

from .models import Archivo
from .serializers import ArchivoSerializer

from rest_framework import viewsets, permissions
from .models import Propiedad
from .serializers import PropiedadSerializer

def inicio(request):
    return render(request, 'html/inicio.html')

def acceso(request):
    return render(request, 'html/acceso.html')

def inicio2(request):
    return render(request, 'html/Inicio2.html')

def inicio3(request):
    return render(request, 'html/Inicio3.html')

def productos(request):
    return render(request, 'html/productos.html')

def ayuda(request):
    return render(request, 'html/ayuda.html')

def registro(request):
    return render(request, 'html/registro.html')

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    
def inicio(request):
    fotos = Archivo.objects.order_by("-creado")[:12]  # ajusta la cantidad a gusto
    return render(request, "html/inicio.html", {"fotos": fotos})


class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.order_by("-created_at")
    serializer_class = PropiedadSerializer
    permission_classes = [permissions.AllowAny]  # ajusta según tu auth
