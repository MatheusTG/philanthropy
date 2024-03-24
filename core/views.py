from django.shortcuts import render

from accounts.forms import RegisterForm

def home(request):
  # Formulário base de cadastro
  register_form = RegisterForm()

  context = {
    'register_form': register_form
  }

  return render(request, 'core/home.html', context)