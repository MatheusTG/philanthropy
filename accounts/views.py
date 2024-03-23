from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http.response import HttpResponse
from django.contrib.auth import authenticate, login

import re

# Verifica se o email é válido
def email_is_valid_verify(email):
  padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
  return re.match(padrao, email)

# Verifica se a senha possuí pelo menos 8 caracteres, e se tem
# necessariamente números e letras
def senha_is_valid_verify(senha):
    if (
      len(senha) < 8 or 
      bool(re.match(r'^(?=.*[a-zA-Z])(?=.*\d).+$', senha))
    ):
      return False
    else:
      return True

def cadastro_user(request):
  if request.method == 'POST':
    email = request.POST['cadastro-email']

    if User.objects.filter(email=email).first():
      return HttpResponse('Já existe um usuário com esse email')

    nome = request.POST['cadastro-nome']
    sobrenome = request.POST['cadastro-sobrenome']
    senha = request.POST['cadastro-senha']
    senhaConfirmar = request.POST['cadastro-c-senha']

    email_is_valid = email_is_valid_verify(email)

    nome_is_valid = len(nome) > 2
    sobrenome_is_valid = True

    senha_is_valid = senha_is_valid_verify(senha)

    senha_confirmar_is_valid = senhaConfirmar != senha

    if (
        email_is_valid and
        nome_is_valid and 
        sobrenome_is_valid and
        senha_is_valid and
        senha_confirmar_is_valid
    ):
      user = User.objects.create_user(
        username=email,
        first_name=nome,
        last_name=sobrenome,
        email=email,
        password=senha
      )
      user.save()
      return redirect('home')

    return redirect('cadastro')

  return render(request, 'core/home.html')

def login_user(request):
  if request.method == 'POST':
    email = request.POST['login-email']
    senha = request.POST['login-senha']

    email_is_valid = email_is_valid_verify(email)
    senha_is_valid = senha_is_valid_verify(senha)

    user = authenticate(request, username=email, password=senha)

    if email_is_valid and senha_is_valid:
      if user:
        login(request, user)
        return  ('home')

    return redirect('login')

  return render(request, 'core/home.html')
