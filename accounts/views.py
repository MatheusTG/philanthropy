from django.shortcuts import render, redirect
from django.contrib import auth, messages

from accounts.forms import RegisterForm
from accounts.forms import LoginForm


def cadastro_user(request):
  # Formulário base de cadastro
  register_form = RegisterForm()

  # Formulário base de login
  login_form = LoginForm()

  if request.method == 'POST':
    register_form = RegisterForm(request.POST)

    context = {
      'register_form': register_form,
      'login_form': login_form,
    }

    if register_form.is_valid():
      user = register_form.save(commit=False)
      user.username = user.email
      user.save()

      messages.success(request, 'Usuário cadastrado!')

      return redirect('home')
    
    return render(request, 'core/home.html', context)

  context = {
    'register_form': register_form,
    'login_form': login_form,
  }

  return render(request, 'core/home.html', context)

def login_user(request):
  # Formulário base de cadastro
  register_form = RegisterForm()

  # Formulário base de login
  login_form = LoginForm()

  if request.method == 'POST':
    login_form = LoginForm(request, request.POST)

    context = {
      'register_form': register_form,
      'login_form': login_form,
    }

    if login_form.is_valid():
      user = login_form.get_user()
      auth.login(request, user)

      messages.success(request, f'Bem vindo {user.first_name}!')

      return redirect('home')
    
    return render(request, 'core/home.html', context)

  context = {
    'register_form': register_form,
    'login_form': login_form,
  }

  return render(request, 'core/home.html', context)

def logout_user(request):
  auth.logout(request)

  return redirect('login')