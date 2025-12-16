from django.contrib import admin
from .models import Movie, Actors, Countries, Genres, CustomUser

admin.site.register(Movie)
admin.site.register(Actors)
admin.site.register(Genres)
admin.site.register(Countries)