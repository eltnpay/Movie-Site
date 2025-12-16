from django.shortcuts import render, get_object_or_404
from .models import Movie
from django.db.models import Q
from django.db.models.functions import Lower, Concat
from django.core.paginator import Paginator


def homepage(request):
    search_query = request.GET.get('q', '').strip()

    movies = Movie.objects.all().prefetch_related(
        'countries', 'genres', 'actors'
    )

    if search_query:
        movies = movies.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(countries__name__icontains=search_query) |
            Q(genres__genre__icontains=search_query) |
            Q(actors__full_name__icontains=search_query)
        ).distinct()

    paginator = Paginator(movies, 10)
    page_obj = paginator.get_page(request.GET.get('page'))

    return render(request, 'client/home.html', {
        'page_obj': page_obj,
        'search_query': search_query
    })



def movie_detail(request, slug):
    movie = get_object_or_404(Movie, slug=slug)
    return render(request, 'client/detail.html', {'movie': movie})



