# almacen/storage/apps.py

from django.apps import AppConfig

class StorageConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "almacen.storage"     # ruta completa del paquete
    # NO pongas: label = "storage"  (déjalo sin 'label')
