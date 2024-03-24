from django.shortcuts import render

from accounts.forms import RegisterForm


def cadastro_user(request):
  if request.method == 'POST':
    context = {
      'register_form': RegisterForm(request.POST),
    }

    return render(request, 'core/home.html', context)


  context = {
    'register_form': RegisterForm(),
  }

  return render(request, 'core/home.html', context)

def login_user(request):
  return render(request, 'core/home.html')
