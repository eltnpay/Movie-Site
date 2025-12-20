from django.shortcuts import render, get_object_or_404
from .models import Movie
from django.db.models import Q
from django.db.models.functions import Lower, Concat
from django.core.paginator import Paginator
from .models import Movie, Genres, Countries, Actors


def homepage(request):
    search_query = request.GET.get('q', '').strip()
    
    # Получаем параметры фильтров
    selected_genres = request.GET.getlist('genre')
    selected_countries = request.GET.getlist('country')
    selected_year = request.GET.get('year', '')
    sort_by = request.GET.get('sort', '')  # rating, year, title
    
    movies = Movie.objects.all().prefetch_related(
        'countries', 'genres', 'actors'
    )
    
    # Текстовый поиск
    if search_query:
        movies = movies.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(countries__name__icontains=search_query) |
            Q(genres__genre__icontains=search_query) |
            Q(actors__full_name__icontains=search_query)
        ).distinct()
    
    # Фильтр по жанрам
    if selected_genres:
        for genre_id in selected_genres:
            movies = movies.filter(genres__id=genre_id)
    
    # Фильтр по странам
    if selected_countries:
        for country_id in selected_countries:
            movies = movies.filter(countries__id=country_id)
    
    # Фильтр по году
    if selected_year:
        movies = movies.filter(year=selected_year)
    
    # Сортировка
    if sort_by == 'year_desc':
        movies = movies.order_by('-year')
    elif sort_by == 'year_asc':
        movies = movies.order_by('year')
    elif sort_by == 'title':
        movies = movies.order_by('title')
    else:
        movies = movies.order_by('-id')  # По умолчанию новые первые
    
    movies = movies.distinct()
    
    # Получаем все жанры и страны для фильтров
    all_genres = Genres.objects.all().order_by('genre')
    all_countries = Countries.objects.all().order_by('name')
    
    # Получаем уникальные годы из фильмов
    years = Movie.objects.values_list('year', flat=True).distinct().order_by('-year')
    
    paginator = Paginator(movies, 12)  # 12 фильмов на странице
    page_obj = paginator.get_page(request.GET.get('page'))
    
    return render(request, 'client/home.html', {
        'page_obj': page_obj,
        'search_query': search_query,
        'all_genres': all_genres,
        'all_countries': all_countries,
        'years': years,
        'selected_genres': [int(g) for g in selected_genres if g],
        'selected_countries': [int(c) for c in selected_countries if c],
        'selected_year': selected_year,
        'sort_by': sort_by,
    })



def movie_detail(request, slug):
    movie = get_object_or_404(Movie, slug=slug)
    return render(request, 'client/detail.html', {'movie': movie})

def actor_detail(request, slug):
    actor = get_object_or_404(Actors, slug=slug)
    return render(request, 'client/actor_detail.html', {'actor': actor})



