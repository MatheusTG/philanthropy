from django.urls import path
from accounts import views

urlpatterns = [
    path('login/', views.login_user, name='login'),
    path('cadastro/', views.cadastro_user, name='cadastro'),
]
