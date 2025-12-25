from django.db import models
from django.contrib.auth.models import AbstractUser
from unidecode import unidecode
from django.utils.text import slugify

def generate_unique_slug(instance, field_value, slug_field_name='slug'):
    slug_base = slugify(unidecode(field_value))  # транслитерируем
    unique_slug = slug_base
    num = 1
    ModelClass = instance.__class__

    while ModelClass.objects.filter(**{slug_field_name: unique_slug}).exists():
        unique_slug = f"{slug_base}-{num}"
        num += 1
    return unique_slug


class CustomUser(AbstractUser):
    phone_num = models.CharField(max_length=13,
                                 help_text='+998XXXXXXX',)
    photo = models.ImageField(upload_to='users/')
    card_number = models.CharField(max_length=16,
                                   help_text='9860yyyyxxxx0101',
                                   blank=True,null=True)
    
    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'



class Genres(models.Model):
    genre = models.CharField(max_length=100,)
    slug = models.SlugField(unique=True,blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.genre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.genre
    
class Actors(models.Model):
    full_name = models.CharField(max_length=250,)
    slug = models.SlugField(unique=True,blank=True)
    biography = models.TextField()
    image = models.ImageField(upload_to='actors/')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.full_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name

class Countries(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(unique=True,blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.name)
        super().save(*args, **kwargs)

    

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=250,verbose_name='Название фильма')
    slug = models.SlugField(unique=True,blank=True,verbose_name='Отображение на маршруте URL')
    image = models.ImageField(upload_to='posters/',verbose_name='Фотография для фильма')
    year = models.CharField(max_length=4,help_text='ГГГГ',verbose_name='Дата выхода фильма')
    description = models.TextField(verbose_name='Описание для фильма')
    countries = models.ManyToManyField(Countries,verbose_name='В каких странах снимался этот фильм')
    genres = models.ManyToManyField(Genres,verbose_name='Категории для фильма')
    actors = models.ManyToManyField(Actors,verbose_name='Актеры')
    age = models.CharField(max_length=3,default='16+',verbose_name='Возрастные ограничения')
    time = models.CharField(max_length=3,verbose_name='Длительность фильма')
    trailer = models.URLField(verbose_name='Ссылка на трейлер')
    film = models.FileField(upload_to='films/',verbose_name='Фильм')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_unique_slug(self, self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Фильм'
        verbose_name_plural = 'Фильмы'

class Comments(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='comments')
    news = models.ForeignKey(Movie,on_delete=models.CASCADE,related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]

    class Meta:
        ordering = ['-created_at']


class Serial(models.Model):
    title = models.CharField(max_length=250, verbose_name='Название сериала')
    slug = models.SlugField(unique=True,blank=True, verbose_name='URL для сериала')
    image = models.ImageField(upload_to='serials/', verbose_name='Постер сериала')
    year = models.CharField(max_length=4, verbose_name='Год выхода')
    description = models.TextField(verbose_name='Описание сериала')
    countries = models.ManyToManyField(Countries, verbose_name='Страны производства')
    genres = models.ManyToManyField(Genres, verbose_name='Жанры сериала')
    actors = models.ManyToManyField(Actors, verbose_name='Актёры')
    age = models.CharField(max_length=3, default='16+', verbose_name='Возрастное ограничение')
    trailer = models.URLField(verbose_name='Ссылка на трейлер')
    film = models.FileField(upload_to='serials/', verbose_name='Файл сериала')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Сериал'
        verbose_name_plural = 'Сериалы'

