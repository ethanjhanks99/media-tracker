from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('movie-list/', view=views.movie_list, name="movie-list"),
    path('show-list/', view=views.show_list, name="show-list"),
    path('game-list/', view=views.game_list, name="game-list"),
    path('movie/<int:id>/', view=views.movie, name="movie"),
    path('save-movie/', view=views.saved_movie, name="save-movie"),
    path('search/<str:query>/', view=views.search, name="search"),
]