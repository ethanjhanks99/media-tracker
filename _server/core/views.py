from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict
import requests

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
def movie_random(req):
    api_key = os.environ.get("TMDB_API_KEY")
    page = req.headers["Page"]
    print(page)
    url = f"https://api.themoviedb.org/3/discover/movie?language=en-US&page={page}&api_key={api_key}"
    print(req.headers)
    response = requests.get(url)
    
    body = json.loads(response.text)

    return JsonResponse({"movies": body["results"]})

@login_required
def movie_images(req):
    api_key = os.environ.get("TMDB_API_KEY")
    url = f"https://api.themoviedb.org/3/movie/{req.movie_id}/images"

