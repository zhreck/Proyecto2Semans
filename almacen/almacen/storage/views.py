# almacen/storage/views.py
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import select_template
from django.contrib import messages
from django.contrib.auth import login

from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Archivo, Propiedad
from .serializers import ArchivoSerializer, PropiedadSerializer
from .forms import SignUpForm


# ---------- Páginas ----------
def inicio(request):
    fotos = Archivo.objects.order_by("-creado")[:12]

    top_ids = list(Propiedad.objects.order_by("-vistas", "-created_at")
                   .values_list("id", flat=True)[:6])  # ← tamaño del bloque inferior

    mas_vistas = Propiedad.objects.filter(id__in=top_ids)\
                                  .order_by("-vistas", "-created_at")

    destacados = Propiedad.objects.exclude(id__in=top_ids)\
                                  .order_by("-created_at")[:8]

    tpl = select_template(["html/inicio.html", "html/Iniciov2.html", "html/Iniciov3.html"])
    ctx = {"fotos": fotos, "propiedades": destacados, "mas_vistas": mas_vistas}
    return HttpResponse(tpl.render(ctx, request))


def acceso(request):
    return render(request, "html/acceso.html")

def ayuda(request):
    return render(request, "html/ayuda.html")

def productos(request):
    return render(request, "html/productos.html")

def inicio2(request):
    return render(request, "html/Iniciov2.html")

def inicio3(request):
    return render(request, "html/Iniciov3.html")

def publicar(request):   # formulario para crear "Propiedad" (card)
    return render(request, "html/publicar.html")

def carrusel_admin(request):  # pantalla para gestionar imágenes del carrusel
    # Asegúrate de que exista templates/html/carrusel.html
    return render(request, "html/carrusel.html")


# ---------- Auth / Registro ----------
def registro(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()         # se crea en auth_user
            login(request, user)       # inicia sesión
            messages.success(request, "Cuenta creada correctamente. ¡Bienvenido/a!")
            return redirect("inicio")
        messages.error(request, "Por favor corrige los errores.")
    else:
        form = SignUpForm()
    return render(request, 'html/registro.html', {"form": form})


# ---------- API (DRF) ----------
class ArchivoViewSet(viewsets.ModelViewSet):
    """
    /api/archivos/  (POST: archivo=imagen, nombre=opcional)
    """
    queryset = Archivo.objects.order_by("-creado")
    serializer_class = ArchivoSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx


class PropiedadViewSet(viewsets.ModelViewSet):
    """
    /api/propiedades/  (POST: foto=imagen, precio, comuna)
    """
    queryset = Propiedad.objects.order_by("-created_at")
    serializer_class = PropiedadSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx
