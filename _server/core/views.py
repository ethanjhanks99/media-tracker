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
    api_key = os.environ.get("TMDB_API_KEY")
    url = f"https://api.themoviedb.org/3/movie/{id}?language=en-US&api_key={api_key}"
    response = requests.get(url)

    body = json.loads(response.text)

    return JsonResponse({"movie": body})

@login_required
def saved_movie(req):
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
