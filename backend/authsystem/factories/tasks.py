import factory
import random
from django.utils import timezone
from datetime import timedelta
from authsystem.models import Task, TaskComment


class TaskFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Task

    title = factory.Faker('sentence')
    is_favorite = factory.Faker('boolean')
    category = factory.Iterator([choice[0] for choice in Task.CATEGORY_CHOICES])
    deadline = factory.LazyFunction(lambda: timezone.now() + timedelta(days=random.randint(1, 7)))


class TaskCommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TaskComment

    task = factory.SubFactory(TaskFactory)
    content = factory.Faker('sentence')
