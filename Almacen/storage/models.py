from django.db import models

# Create your models here.

class Archivo(models.Model):
    nombre = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='storage/')
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
