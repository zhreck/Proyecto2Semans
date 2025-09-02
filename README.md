# Proyecto Almacen (Django)

Este proyecto es una app Django con dos apps: `storage` y `usuarios`, e incluye una API con Django REST Framework.

## Requisitos
- Python 3.11+
- pip

## Instalación
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Migraciones y ejecución
```bash
cd Almacen
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Endpoints
- HTML:
  - `/` — inicio
  - `/acceso/`
  - `/inicio2/`
  - `/inicio3/`
  - `/productos/`
  - `/ayuda/`
  - `/registro/`
- API (DRF):
  - `/api/archivos/` — CRUD de `Archivo`

## Notas
- Base de datos por defecto: SQLite (`db.sqlite3`).
- Archivos subidos por `Archivo.archivo` se guardan en `media/storage/` (configurado por `upload_to='storage/'`).
