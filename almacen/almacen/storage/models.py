from django.db import models

# Create your models here.

class Archivo(models.Model):
    nombre = models.CharField(max_length=255)
    archivo = models.FileField(upload_to='fotos/')   # <-- aquí el cambio
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
    
# models.py

COMUNAS_RM = [
    ("Santiago", "Santiago"),
    ("Providencia", "Providencia"),
    ("Las Condes", "Las Condes"),
    ("Ñuñoa", "Ñuñoa"),
    ("Vitacura", "Vitacura"),
    ("Lo Barnechea", "Lo Barnechea"),
    ("La Florida", "La Florida"),
    ("Puente Alto", "Puente Alto"),
    ("Maipú", "Maipú"),
    ("San Miguel", "San Miguel"),
    ("Recoleta", "Recoleta"),
    ("Independencia", "Independencia"),
]

class Propiedad(models.Model):
    foto       = models.ImageField(upload_to="storage/propiedades/")
    precio     = models.PositiveIntegerField()
    comuna     = models.CharField(max_length=40, choices=COMUNAS_RM)
    vistas     = models.PositiveIntegerField(default=0, db_index=True)  # 👈 nuevo
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Propiedad #{self.pk} - {self.comuna} - ${self.precio:,}"