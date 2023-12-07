from rest_framework import serializers
from .models import Fly
from .models import Catch
from .models import WaterSystemConditions
from .models import WaterSystem

class BaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

class WaterSystemSerializer(BaseSerializer):
    class Meta:
        model = WaterSystem
        fields = ['id','name', 'size', 'type', 'city', 'county', 'state', 'access']


class WaterSystemConditionsSerializer(BaseSerializer):
    water_system_id = serializers.PrimaryKeyRelatedField(queryset=WaterSystem.objects.all(), source='water_system', write_only=True)
    water_system = WaterSystemSerializer(read_only=True)
    class Meta:
        model = WaterSystemConditions
        fields = ['id','water_system' ,'water_system_id', 'color', 'conditions', 'temp', 'cfs', 'air_temp']

class FlySerializer(BaseSerializer):
    class Meta:
        model = Fly
        fields = ['id', 'name','size', 'description', 'dry_fly', 'nymph_fly', 'streamer_fly']

class CatchSerializer(BaseSerializer):
    # These are my write serializers, http method POST PUT, for INPUT only
    landed_fly_id = serializers.PrimaryKeyRelatedField(queryset=Fly.objects.all(), source='landed_fly', write_only=True)
    other_fly_id = serializers.PrimaryKeyRelatedField(queryset=Fly.objects.all(), required=False, allow_null=True, source='other_fly', write_only=True)
    water_system_condition_id = serializers.PrimaryKeyRelatedField(queryset=WaterSystemConditions.objects.all(), source='water_system_condition', write_only=True)
    #These are my read only serializers, http method GET, and as a response body for POST / PUT
    landed_fly = FlySerializer(read_only=True)
    other_fly = FlySerializer(read_only=True)
    water_system_condition = WaterSystemConditionsSerializer(read_only=True)

    class Meta:
        model = Catch
        fields = ['id','landed_fly_id','other_fly_id','water_system_condition_id','landed_fly','other_fly','water_system_condition','fish_type','fish_size','date_caught','time_of_day']