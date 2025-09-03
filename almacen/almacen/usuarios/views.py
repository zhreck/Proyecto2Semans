from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.hashers import make_password
from .models import Usuario
from .forms import UsuarioForm

# Página de inicio
def inicio(request):
    return render(request, 'usuarios/inicio.html')

# Crear usuario
def registrar_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            usuario = form.save(commit=False)
            # Seguridad: encriptar contraseña antes de guardar
            usuario.contraseña = make_password(usuario.contraseña)
            usuario.save()
            return redirect('listar_usuarios')
    else:
        form = UsuarioForm()
    return render(request, 'usuarios/registrar.html', {'form': form})

# Listar usuarios
def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    return render(request, 'usuarios/listar.html', {'usuarios': usuarios})

# Editar usuario
def editar_usuario(request, id):
    usuario = get_object_or_404(Usuario, id=id)
    if request.method == 'POST':
        form = UsuarioForm(request.POST, instance=usuario)
        if form.is_valid():
            usuario = form.save(commit=False)
            # Solo actualizar contraseña si fue modificada
            if 'contraseña' in form.changed_data:
                usuario.contraseña = make_password(usuario.contraseña)
            usuario.save()
            return redirect('listar_usuarios')
    else:
        form = UsuarioForm(instance=usuario)
    return render(request, 'usuarios/editar.html', {'form': form})

# Eliminar usuario
def eliminar_usuario(request, id):
    usuario = get_object_or_404(Usuario, id=id)
    usuario.delete()
    return redirect('listar_usuarios')
