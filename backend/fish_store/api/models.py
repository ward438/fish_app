from django.db import models
from django.forms.models import model_to_dict


class BaseModel(models.Model):
    id = models.AutoField(primary_key=True)
    class Meta:
        abstract = True
    def __str__(self):
        return str(model_to_dict(self))
    
class WaterSystem(BaseModel):
    name = models.CharField(max_length=255)
    size = models.CharField(max_length=30)
    type = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    county = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    access = models.CharField(max_length=255)
    class Meta:
        unique_together = ('name','access')

class WaterSystemConditions(BaseModel):
    color = models.CharField(max_length=30)
    conditions = models.TextField()
    temp = models.FloatField()
    cfs = models.IntegerField()
    air_temp = models.IntegerField()
    water_system = models.ForeignKey(WaterSystem,on_delete=models.CASCADE, blank=False)

class Fly(BaseModel):
    name = models.CharField(max_length=100)
    size = models.IntegerField()
    description = models.TextField()
    dry_fly = models.BooleanField(default=False)
    nymph_fly = models.BooleanField(default=False)
    streamer_fly = models.BooleanField(default=False)
    class Meta:
        unique_together = ('name','size')    

class Catch(BaseModel):
    fish_type = models.CharField(max_length=255)
    fish_size = models.FloatField()
    date_caught = models.DateField()
    # change time_of_day to textfield
    # time_of_day = models.TextField()
    time_of_day = models.DateTimeField()
    water_system_condition = models.ForeignKey(WaterSystemConditions, on_delete=models.CASCADE)
    landed_fly = models.ForeignKey(Fly, on_delete=models.CASCADE, related_name='landed_catches') 
    other_fly = models.ForeignKey(Fly, on_delete=models.CASCADE, blank=True, null=True, related_name='fly_not_hooked_catches') 
    