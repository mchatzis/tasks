from rest_framework import serializers
from authsystem.models import Task, TaskComment
from django.utils import timezone


class TaskCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())

    class Meta:
        model = TaskComment
        fields = ('id', 'task', 'user', 'content')


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    comments = TaskCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'category', 'completed', 'is_favorite', 'user', 'deadline', 'comments')
    
    def validate(self, data):
        deadline = data.get('deadline', self.instance.deadline if self.instance else None)
        completed = data.get('completed', self.instance.completed if self.instance else False)
        
        if deadline and deadline < timezone.now() and not completed:
            raise serializers.ValidationError({
                "deadline": "Deadline cannot be in the past unless the task is completed."
            })
        return data