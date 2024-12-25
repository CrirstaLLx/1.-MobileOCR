from django.shortcuts import render
import json
from .serializers import PostSerializer
from .models import Ocr
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

from django.http.response import JsonResponse

# import pytesseract to convert text in image to string
import pytesseract

from .forms import ImageUpload
import os

# import Image from PIL to read image
from PIL import Image

from django.conf import settings

# Create your views here.

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Ocr.objects.all()
        serializer = PostSerializer(posts, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        response_data = {}
        text = ""
        message = ""
        if posts_serializer.is_valid():
            posts_serializer.save()
            try:
                image = request.FILES['image']
                image = image.name
                path = settings.MEDIA_ROOT
                pathz = path + "/images/" + image

                text = pytesseract.image_to_string(Image.open(pathz), lang='rus+eng')
                response_data['result'] = text

                os.remove(pathz)
            except Exception:
                message = "check your filename and ensure it doesn't have any space or check if it has any text"
            context = {
                    'text': text,
                    'message': message
            }
            # print(response_data)
            return JsonResponse(response_data)
        else:
            return Response(posts_serializer.data, status=status.HTTP_400_BAD_REQUEST)


    # def ocr(self, request):
    #     text = ""
    #     message = ""
    #     response_data = {}
    #     posts_serializer = PostSerializer(data=request.data)
    #     if posts_serializer.is_valid():
    #         try:
    #             posts_serializer.save()
    #             image = request.FILES['image']
    #             image = image.name
    #             path = settings.MEDIA_ROOT
    #             pathz = path + "/images/" + image
    #
    #             text = pytesseract.image_to_string(Image.open(pathz), lang='rus+eng')
    #
    #             #response_data['text'] = text
    #
    #             # Summary (0.1% of the original content).
    #             os.remove(pathz)
    #         except:
    #             message = "check your filename and ensure it doesn't have any space or check if it has any text"
    #
    #     context = {
    #         'text': text,
    #         'message': message
    #     }
    #     return Response(request, context)