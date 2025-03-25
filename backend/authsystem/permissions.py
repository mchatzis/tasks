from rest_framework.permissions import BasePermission, DjangoModelPermissions


class AuthPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ('retrieve',):
            return request.user.has_perm('authsystem.view_user')
        elif view.action == 'create':
            return True
        return False

class NoDeletePermissions(DjangoModelPermissions):
        perms_map = {
            'GET': [],
            'OPTIONS': [],
            'HEAD': [],
            'POST': ['%(app_label)s.add_%(model_name)s'],
            'PUT': ['%(app_label)s.change_%(model_name)s'],
            'PATCH': ['%(app_label)s.change_%(model_name)s'],
        }

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user