from django.contrib import admin
from .models import Movie, Actors, Countries, Genres, CustomUser
from django.contrib.auth.admin import UserAdmin

admin.site.register(Movie)
admin.site.register(Actors)
admin.site.register(Genres)
admin.site.register(Countries)
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = (
        'username',
        'phone_num',
        'card_number',
        'is_staff',
        'is_active',
    )

    fieldsets = UserAdmin.fieldsets + (
        ('Доп. информация', {
            'fields': ('phone_num', 'photo', 'card_number'),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Доп. информация', {
            'fields': ('phone_num', 'photo', 'card_number'),
        }),
    )