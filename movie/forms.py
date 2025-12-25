from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .models import Comments
User = get_user_model()


class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'phone_num', 'password1', 'password2')


class LoginForm(AuthenticationForm):
    pass


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['text']