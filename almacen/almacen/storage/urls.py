from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ArchivoViewSet, PropiedadViewSet,
    inicio, acceso, inicio2, inicio3, productos, ayuda, registro, publicar
)
from almacen.storage import views as storageViews


app_name = "storage"

router = DefaultRouter()

router.register(r'archivos', ArchivoViewSet, basename='archivo')
router.register(r'propiedades', PropiedadViewSet, basename='propiedad')

urlpatterns = router.urls

urlpatterns = [
    # Páginas
    path('', inicio, name='inicio'),
    path('acceso/', acceso, name='acceso'),
    path('inicio2/', inicio2, name='inicio2'),
    path('inicio3/', inicio3, name='inicio3'),
    path('productos/', productos, name='productos'),
    path('ayuda/', ayuda, name='ayuda'),
    path('registro/', registro, name='registro'),

    path('publicar/', storageViews.publicar, name='publicar'),
    # API de esta app (bajo /api/)
    path('api/', include(router.urls)),

]
