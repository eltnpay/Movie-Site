from django.urls import path
from .views import homepage, movie_detail,actor_detail, movies_by_genre, registration,user_login,log_out

urlpatterns = [
    path('',homepage,name='home'),
    path('movie/<slug:slug>/', movie_detail, name='movie_detail'),
    path('actor/<slug:slug>/', actor_detail, name='actor_detail'),
    path('genre/<slug:slug>/', movies_by_genre, name='movies_by_genre'),
    path('reg/', registration, name='regis'),
    path('login/', user_login, name='login'),
    path('logout/',log_out, name='logout'),


]