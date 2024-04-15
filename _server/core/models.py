from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Movies(models.Model):
    movie_id = models.IntegerField(primary_key=False)
    title = models.TextField()
    genre_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Shows(models.Model):
    show_id = models.IntegerField(primary_key=False)
    title = models.TextField()
    genre_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
