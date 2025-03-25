from rest_framework.throttling import AnonRateThrottle


class CustomAnonThrottle(AnonRateThrottle):
    scope = 'custom_anon'
