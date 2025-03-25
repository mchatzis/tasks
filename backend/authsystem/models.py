import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from authsystem.managers import UserManager
from django.utils import timezone
from datetime import timedelta


class User(AbstractUser):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    is_active = models.BooleanField(default=False)

    username = None
    email = models.EmailField(unique=True, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email


def default_deadline():
    return timezone.now() + timedelta(days=7)

class Task(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('maintenance', 'Maintenance & Repairs'),
        ('safety', 'Safety & Compliance'),
        ('crew', 'Crew Management'),
        ('cargo', 'Cargo & Logistics'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default='general'
    )
    deadline = models.DateTimeField(default=default_deadline)

    def __str__(self):
        return self.title
    

class TaskComment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()

    def __str__(self):
        return f"Comment by {self.user.email} on {self.task.title}"
