from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Movies(models.Model):
    id = models.IntegerField(auto_created=False, primary_key=True)
    title = models.TextField()
    poster_path = models.TextField(default="")
    user = models.ManyToManyField(User)

class Shows(models.Model):
    id = models.IntegerField(auto_created=False, primary_key=True)
    title = models.TextField()
    poster_path = models.TextField(default="")
    user = models.ManyToManyField(User)

class Games(models.Model):
    id = models.IntegerField(auto_created=False, primary_key=True)
    title = models.TextField()
    poster_path = models.TextField(default="")
    user = models.ManyToManyField(User)
