#!/bin/bash
python manage.py migrate --noinput
python manage.py runscript seed
python manage.py runserver 0.0.0.0:8000

