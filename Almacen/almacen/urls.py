from django.contrib import admin
from django.urls import path
from storage import views  # importa tus vistas desde la app "storage"
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Rutas de tu aplicación
    path('', views.inicio, name='inicio'),
    path('acceso/', views.acceso, name='acceso'),
    path('inicio2/', views.inicio2, name='inicio2'),
    path('inicio3/', views.inicio3, name='inicio3'),
    path('productos/', views.productos, name='productos'),
    path('ayuda/', views.ayuda, name='ayuda'),
    path('registro/',views.registro, name='registro')
]

# Para servir archivos estáticos y media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
