from django.shortcuts import render 
from django.contrib.auth.forms import UserCreationForm

def inicio(request):
    return render(request, 'html/inicio.html')

def acceso(request):
    return render(request, 'html/Acceso.html')

def inicio2(request):
    return render(request, 'html/Inicio2.html')

def inicio3(request):
    return render(request, 'html/Inicio3.html')

def productos(request):
    return render(request, 'html/productos.html')

def ayuda(request):
    return render(request, 'html/Ayuda.html')

def registro(request):
    return render(request,'html/registro.html')
