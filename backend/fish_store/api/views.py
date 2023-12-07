from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Fly
from .models import Catch
from .models import WaterSystem
from .models import WaterSystemConditions
from .serializers import FlySerializer
from .serializers import CatchSerializer
from .serializers import WaterSystemSerializer
from .serializers import WaterSystemConditionsSerializer

class FlyViewSet(viewsets.ModelViewSet):
    queryset = Fly.objects.all()
    serializer_class = FlySerializer

class CatchViewSet(viewsets.ModelViewSet):
    queryset = Catch.objects.all()
    serializer_class = CatchSerializer

class WaterSystemViewSet(viewsets.ModelViewSet):
    queryset = WaterSystem.objects.all()
    serializer_class = WaterSystemSerializer

class WaterSystemConditionsViewSet(viewsets.ModelViewSet):
    queryset = WaterSystemConditions.objects.all()
    serializer_class = WaterSystemConditionsSerializer


