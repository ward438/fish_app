
from django.contrib import admin
from django.urls import path
from .views import FlyViewSet
from .views import WaterSystemViewSet
from .views import WaterSystemConditionsViewSet
from .views import CatchViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'flies', FlyViewSet)
router.register(r'catches', CatchViewSet)
router.register(r'water_systems', WaterSystemViewSet)
router.register(r'water_systems_conditions', WaterSystemConditionsViewSet)

urlpatterns = [] + router.urls





