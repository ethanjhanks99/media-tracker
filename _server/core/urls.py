from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('movie-list/', view=views.movie_list, name="movie-list"),
]