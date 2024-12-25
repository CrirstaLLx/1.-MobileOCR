from rest_framework import serializers
from .models import Ocr

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocr
        fields = '__all__'