import random
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .factories.tasks import TaskFactory, TaskCommentFactory
from .models import TaskComment, User, Task
from .permissions import AuthPermissions, IsOwner, NoDeletePermissions
from .serializers.user_serializers import UserSerializer
from .serializers.tasks_serializers import TaskCommentSerializer, TaskSerializer
from .pagination import PageLinksPagination


@extend_schema_view(
    create=extend_schema(
        request=UserSerializer,
        responses={status.HTTP_201_CREATED: UserSerializer},
        methods=['POST'],
        description='User signup endpoint. No authentication required',
        auth=[],
    )
)
class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post']
    permission_classes = [AuthPermissions]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        #TODO: Shouldn't superusers have access to all?
        user = self.request.user
        return User.objects.filter(pk=user.pk)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [NoDeletePermissions, IsOwner]
    http_method_names = ['get', 'post', 'put']
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_favorite',]
    search_fields = ['title']
    ordering_fields = ['title', 'category', 'is_favorite', 'deadline']
    pagination_class = PageLinksPagination
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user, completed=False)
    
    def create(self, request):
        tasks = TaskFactory.create_batch(3, user=request.user, completed=False)
        for task in tasks:
            TaskCommentFactory.create_batch(random.randint(0, 2), task=task, user=request.user)
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class TaskCommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwner]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = TaskCommentSerializer
    queryset = TaskComment.objects.all()

    def get_queryset(self):
        return TaskComment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)