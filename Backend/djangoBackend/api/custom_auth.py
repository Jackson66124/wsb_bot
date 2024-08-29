from rest_framework import authentication
from django.conf import settings

class InternalAPIAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        internal_token = request.META.get('HTTP_X_INTERNAL_TOKEN')
        if internal_token == settings.INTERNAL_API_TOKEN:
            return (None, None)
        return None