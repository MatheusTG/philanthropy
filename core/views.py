from django.shortcuts import render

from accounts.forms import RegisterForm, LoginForm

def home(request):
  # Formulário base de cadastro
  register_form = RegisterForm()

  # Formulário base de login
  login_form = LoginForm()

  context = {
    'register_form': register_form,
    'login_form': login_form,
  }

  return render(request, 'core/home.html', context)