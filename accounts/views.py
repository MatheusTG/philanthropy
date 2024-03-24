from django.shortcuts import render

from accounts.forms import RegisterForm


def cadastro_user(request):
  if request.method == 'POST':
    register_form = RegisterForm(request.POST)

    context = {
      'register_form': register_form,
    }

    if register_form.is_valid():
      user = register_form.save(commit=False)
      user.username = user.email
      user.save()

    return render(request, 'core/home.html', context)


  context = {
    'register_form': RegisterForm(),
  }

  return render(request, 'core/home.html', context)

def login_user(request):
  return render(request, 'core/home.html')
