from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('movie-list/<int:page>', view=views.movie_list, name="movie-list"),
]