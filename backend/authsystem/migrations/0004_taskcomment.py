# Generated by Django 4.2.7 on 2025-02-16 11:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authsystem', '0003_task_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='authsystem.task')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
