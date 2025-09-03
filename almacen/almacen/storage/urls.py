from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArchivoViewSet, inicio, acceso, inicio2, inicio3, productos, ayuda, registro

app_name = "storage"

router = DefaultRouter()

router.register(r'archivos', ArchivoViewSet, basename='archivo')

urlpatterns = [
    # Rutas HTML (ajusta si quieres otras)
    path('', inicio, name='inicio'),
    path('acceso/', acceso, name='acceso'),
    path('inicio2/', inicio2, name='inicio2'),
    path('inicio3/', inicio3, name='inicio3'),
    path('productos/', productos, name='productos'),
    path('ayuda/', ayuda, name='ayuda'),
    path('registro/', registro, name='registro'),
    # API
    path('', include(router.urls)),
    path("api/", include("storage.urls")), 
    path("api/", include("almacen.storage.urls")),
]
