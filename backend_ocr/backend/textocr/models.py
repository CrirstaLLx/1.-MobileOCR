from django.db import models

# Create your models here.

class Ocr(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.title
#    date = models.DateField(auto_now=True)
#    text = models.TextField()