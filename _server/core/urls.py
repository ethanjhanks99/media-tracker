from django.urls import path
from . import views

urlpatterns = [
  path('', view=views.index, name="index"),
  path('movie-list/', view=views.movie_list, name="movie-list"),
  path('show-list/', view=views.show_list, name="show-list"),
  path('game-list/', view=views.game_list, name="game-list"),
  path('movie/<int:id>/', view=views.movie, name="movie"),
  path('show/<int:id>/', view=views.show, name="show"),
  path('game/<int:id>/', view=views.game, name="game"),
  path('search/<str:query>/', view=views.search, name="search"),
  path('saved/', view=views.saved, name="saved"),
  path('movies/', view=views.movie_page, name="movies"),
  path('shows/', view=views.show_page, name="show-page"),
]