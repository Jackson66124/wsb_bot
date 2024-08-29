from rest_framework import permissions

class IsAuthenticatedOrInternal(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow normal user token
        if request.user and request.user.is_authenticated:
            return True
        # Allow user internal token
        return 'HTTP_X_INTERNAL_TOKEN' in request.META