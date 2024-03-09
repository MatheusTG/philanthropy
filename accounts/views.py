from django.shortcuts import render

def login(request):
  context = {
    'login_container': True,
  }

  return render(request, 'core/home.html', context)

def cadastro(request):
  context = {
    'cadastro_container': True,
  }

  return render(request, 'core/home.html', context)
