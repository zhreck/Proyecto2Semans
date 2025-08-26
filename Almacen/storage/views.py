from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.


def inicio (request):
    return render(request ,'./html/inicio.html')

def acceso(request):
    return render(request, './templates/html/Acceso.html')

def inicio2 (request):
    return render(request ,'./html/inicio2.html')

def inicio3 (request):
    return render(request ,'./html/inicio3.html')

def productos (request):
    return render(request ,'./templates/html/productos')

def ayuda (request):
    return render(request, './templates/html/Ayuda.html')

def prueba (request):
    return render(request,'/Almacen/storage/templates/htmlPrueba/Acceso.html')