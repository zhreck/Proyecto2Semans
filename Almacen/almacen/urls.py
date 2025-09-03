from django.contrib import admin
from django.urls import path, include
 # importa tus vistas desde la app "storage"
from django.conf import settings
from django.conf.urls.static import static

from django.conf import settings

from almacen.storage import views as storageViews

urlpatterns = [
    path('admin/', admin.site.urls),

    # Rutas de tu aplicación
    path('', storageViews.inicio, name='inicio'),
    path('acceso/', storageViews.acceso, name='acceso'),
    path('inicio2/', storageViews.inicio2, name='inicio2'),
    path('inicio3/', storageViews.inicio3, name='inicio3'),
    path('productos/', storageViews.productos, name='productos'),
    path('ayuda/', storageViews.ayuda, name='ayuda'),
    path('registro/',storageViews.registro, name='registro'),

    path("api/", include("almacen.storage.urls")),

    
]

# Para servir archivos estáticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
