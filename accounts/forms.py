from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
  first_name = forms.CharField(
    label='Nome',
    help_text=None,
  )
 
  last_name = forms.CharField(
    label='Sobrenome',
    help_text='*opcional',
    required=False,
  )

  email = forms.EmailField(
    widget=forms.EmailInput(
      attrs={
        'placeholder': 'email@email.com'
      }
    ),
    label='E-mail',
  )

  password1 = forms.CharField(
    widget=forms.PasswordInput(),
    label='Senha',
    help_text=None,
  )

  password2 = forms.CharField(
    widget=forms.PasswordInput(),
    label='Confirme sua senha',
    help_text=None,
  )

  class Meta:
    model = User
    fields = (
      'first_name', 'last_name', 'email', 'password1', 'password2'
    )

  def clean(self):
    # Define o username igual ao email
    cleaned_data = super().clean()
    email = cleaned_data.get('email')
    if email:
      cleaned_data['username'] = email
    return cleaned_data
  
  def clean_first_name(self):
    first_name = self.cleaned_data.get('first_name')

    if len(first_name) < 2:
      self.add_error(
        'first_name',
        ValidationError(
          'O nome precisa ter pelo menos 2 caracteres.',
          code='invalid'
        )
      )
    
    return first_name