from django.urls import path
from . import views
# from .views import index

urlpatterns = [
    path('textocr/', views.PostView.as_view(), name= 'posts_list'),
    # path('', index, name='index'),
]