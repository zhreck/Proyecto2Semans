from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar_usuario, name='registrar_usuario'),
    path('listar/', views.listar_usuarios, name='listar_usuarios'),
    path('editar/<int:id>/', views.editar_usuario, name='editar_usuario'),
    path('eliminar/<int:id>/', views.eliminar_usuario, name='eliminar_usuario'),
]
