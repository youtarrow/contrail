from django.db import models
from django.contrib.auth.models import User
import uuid


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.user_profile.id) + str(".") + str(ext)])


class Profile(models.Model):
    user_profile = models.OneToOneField(
        User, related_name='user_profile',
        on_delete=models.CASCADE
    )
    img = models.ImageField(blank=True, null=True, upload_to=upload_avatar_path)

    def __str__(self):
        return self.user_profile.username


class Category(models.Model):
    item = models.CharField(max_length=30)

    def __str__(self):
        return self.item


class Article(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=1000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
