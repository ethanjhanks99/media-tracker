from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
import requests
from .models import Movies, Shows, Games

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def movie_list(req):
    api_key = os.environ.get("TMDB_API_KEY")
    url = f"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=en-US&api_key={api_key}"
    response = requests.get(url)
    
    body = json.loads(response.text)

    return JsonResponse({"movies": body["results"]})

@login_required
def show_list(req):
    api_key = os.environ.get("TMDB_API_KEY")
    url = f"https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key={api_key}"
    response = requests.get(url)

    body = json.loads(response.text)

    return JsonResponse({"shows": body["results"]})

@login_required
def game_list(req):
    api_key = os.environ.get("RAWG_API_KEY")
    url = f"https://api.rawg.io/api/games?page=1&page_size=8&key={api_key}"
    response = requests.get(url)
    
    body = json.loads(response.text)

    return JsonResponse({"games": body["results"]})

@login_required
def movie(req, id):
    if req.method == "POST":
        body = json.loads(req.body)
        saved_movie = Movies(
            id = body["movieId"],
            title = body["movieTitle"],
            poster_path = body["moviePoster"]
        )
        saved_movie.save()

        saved_movie.user.add(req.user)

        return JsonResponse({"success": True})
    elif req.method == "DELETE":
        movie_data = Movies.objects.filter(id=id, user=req.user)
        movie_data.delete()
        return JsonResponse({"success": True})
    else:
        api_key = os.environ.get("TMDB_API_KEY")
        url = f"https://api.themoviedb.org/3/movie/{id}?language=en-US&api_key={api_key}"
        response = requests.get(url)

        body = json.loads(response.text)
        return JsonResponse({"movie": body, "saved": Movies.objects.filter(pk=id, user=req.user).exists()})

@login_required
def show(req, id):
    if req.method == "POST":
        body = json.loads(req.body)
        saved_show = Shows(
            id = body["showId"],
            title = body["showTitle"],
            poster_path = body["showPoster"]
        )
        saved_show.save()

        saved_show.user.add(req.user)

        return JsonResponse({"success": True})
    elif req.method == "DELETE":
        show_data = Shows.objects.filter(id=id, user=req.user)
        show_data.delete()
        return JsonResponse({"success": True})
    else:
        api_key = os.environ.get("TMDB_API_KEY")
        url = f"https://api.themoviedb.org/3/tv/{id}?language=en-US&api_key={api_key}"
        response = requests.get(url)

        body = json.loads(response.text)

        return JsonResponse({"show": body, "saved": Shows.objects.filter(id=id, user=req.user).exists()})

@login_required
def game(req, id):
    if req.method == "POST":
        body = json.loads(req.body)
        saved_movie = Games(
            id = body["gameId"],
            title = body["gameTitle"],
            poster_path = body["gamePoster"]
        )
        saved_movie.save()

        saved_movie.user.add(req.user)

        return JsonResponse({"success": True, "saved": True})
    elif req.method == "DELETE":
        game_data = Games.objects.filter(id=id, user=req.user)
        game_data.delete()
        return JsonResponse({"success": True, "saved": False})
    else:
        api_key = os.environ.get("RAWG_API_KEY")
        url = f"https://api.rawg.io/api/games/{id}?key={api_key}"
        response = requests.get(url)

        body = json.loads(response.text)

        return JsonResponse({"game": body, "saved": Games.objects.filter(id=id, user=req.user).exists()})

@login_required
def search(req, query):

    tmdb_api_key = os.environ.get("TMDB_API_KEY")
    movie_url = f"https://api.themoviedb.org/3/search/movie?query={query}&language=en-US&api_key={tmdb_api_key}"
    movie_response = requests.get(movie_url)
    movie_body = json.loads(movie_response.text)

    show_url = f"https://api.themoviedb.org/3/search/tv?query={query}&language=en-US&api_key={tmdb_api_key}"
    show_response = requests.get(show_url)
    show_body = json.loads(show_response.text)

    rawg_api_key = os.environ.get("RAWG_API_KEY")
    game_url = f"https://api.rawg.io/api/games?search={query}&page=1&page_size=20&key={rawg_api_key}"
    game_response = requests.get(game_url)
    game_body = json.loads(game_response.text)

    return JsonResponse({"movies": movie_body, "shows": show_body, "games": game_body})

@login_required
def saved(req):
    movies = Movies.objects.filter(user = req.user)
    movies = [model_to_dict(movie) for movie in movies]
    movies = [{key: movie[key] for key in movie if key != 'user'} for movie in movies]
    
    shows = Shows.objects.filter(user = req.user)
    shows = [model_to_dict(show) for show in shows]
    shows = [{key: show[key] for key in show if key != 'user'} for show in shows]

    games = Games.objects.filter(user = req.user)
    games = [model_to_dict(game) for game in games]
    games = [{key: game[key] for key in game if key != 'user'} for game in games]

    username = req.user.first_name

    return JsonResponse({"movies": movies, "shows": shows, "games": games, "username": username})

@login_required
def movie_page(req):
    api_key = os.environ.get("TMDB_API_KEY")

    now_playing_url = f"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key={api_key}"
    now_playing_res = requests.get(now_playing_url)
    now_playing_bod = json.loads(now_playing_res.text)

    upcoming_url = f"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key={api_key}"
    upcoming_res = requests.get(upcoming_url)
    upcoming_bod = json.loads(upcoming_res.text)

    popular_url = f"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key={api_key}"
    popular_res = requests.get(popular_url)
    popular_bod = json.loads(popular_res.text)

    return JsonResponse({"nowPlaying": now_playing_bod, "upcoming": upcoming_bod, "popular": popular_bod})

