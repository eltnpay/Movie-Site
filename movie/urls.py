from django.urls import path
from .views import homepage, movie_detail,actor_detail

urlpatterns = [
    path('',homepage,name='home'),
    path('movie/<slug:slug>/', movie_detail, name='movie_detail'),
    path('actor/<slug:slug>/', actor_detail, name='actor_detail'),

]