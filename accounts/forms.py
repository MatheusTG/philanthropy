from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
  email = forms.EmailField(
    widget=forms.TextInput(
      attrs={
        'type': 'email',
        'placeholder': 'email@email.com'
      }
    ),
    label='E-mail'
  )

  class Meta:
    model = User
    fields = (
      'first_name', 'last_name', 'email', 'password1', 'password2'
    )
  
  