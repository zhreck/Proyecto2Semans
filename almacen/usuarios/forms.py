from django import forms
from .models import Usuario

from django.contrib.auth.hashers import make_password

def registrar_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            usuario = form.save(commit=False)
            usuario.contraseña = make_password(usuario.contraseña)
            usuario.save()
            return redirect('listar_usuarios')
