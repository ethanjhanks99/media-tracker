from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('movie-list/', view=views.movie_list, name="movie-list"),
    path('show-list/', view=views.show_list, name="show-list"),
    path('game-list/', view=views.game_list, name="game-list"),
]