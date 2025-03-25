from django.contrib.auth.models import BaseUserManager, Permission


class UserManager(BaseUserManager):
    """ User Model Manager """

    #TODO: Support extra fields? (**extra_fields)
    def create_user(self, email, password=None, is_active=True):
        if not email:
            raise ValueError('Users must have email Address')
        #TODO: Is the following check needed? Django's UserManager does not perform it.
        if not password:
            raise ValueError('User must have Password')
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.is_active = is_active
        #TODO: This will save it in the default database. Django's UserManager uses "user.save(using=self._db)"
        # to handle saving auth data in separate db
        user.save()

        add_task_perm = Permission.objects.get(codename='add_task')
        change_task_perm = Permission.objects.get(codename='change_task')
        view_user_perm = Permission.objects.get(codename='view_user')
        user.user_permissions.set([
            add_task_perm,
            view_user_perm,
            change_task_perm
        ])

        return user
    

    #TODO: create_superuser missing