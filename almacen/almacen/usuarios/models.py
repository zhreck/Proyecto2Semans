from django.db import models

# Create your models here.
class Usuario(models.Model):
    nombre = models.CharField("Nombre completo", max_length=100)
    correo = models.EmailField("Correo electrónico", unique=True)
    contraseña = models.CharField("Contraseña", max_length=128)

    def __str__(self):
        return self.nombre
