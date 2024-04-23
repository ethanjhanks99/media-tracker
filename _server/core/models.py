from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Movies(models.Model):
    movie_id = models.IntegerField(primary_key=False)
    title = models.TextField()
    user = models.ManyToManyField(User)

class Shows(models.Model):
    show_id = models.IntegerField(primary_key=False)
    title = models.TextField()
    user = models.ManyToManyField(User)

class Games(models.Model):
    show_id = models.IntegerField(primary_key=False)
    title = models.TextField()
    user = models.ManyToManyField(User)
