from django.contrib import admin
from django.urls import path, include
import app
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path("save/", views.save),
    path("index/", views.index),
]
