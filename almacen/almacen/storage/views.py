# almacen/storage/views.py
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import select_template
from rest_framework import viewsets, permissions

from .models import Archivo, Propiedad
from .serializers import ArchivoSerializer, PropiedadSerializer

from rest_framework.parsers import MultiPartParser, FormParser

def inicio(request):
    fotos = Archivo.objects.order_by("-creado")[:12]
    propiedades = Propiedad.objects.order_by("-created_at")[:8]
    tpl = select_template(["html/inicio.html","html/Iniciov2.html","html/Iniciov3.html"])
    return HttpResponse(tpl.render({"fotos": fotos, "propiedades": propiedades}, request))


def acceso(request):    return render(request, "html/acceso.html")
def ayuda(request):     return render(request, "html/ayuda.html")
def productos(request): return render(request, "html/productos.html")
def registro(request):  return render(request, "html/registro.html")
def inicio2(request):   return render(request, "html/Iniciov2.html")
def inicio3(request):   return render(request, "html/Iniciov3.html")

def publicar(request):
    return render(request, "html/publicar.html")

class ArchivoViewSet(viewsets.ModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer


class PropiedadViewSet(viewsets.ModelViewSet):
    queryset = Propiedad.objects.order_by("-created_at")
    serializer_class = PropiedadSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx