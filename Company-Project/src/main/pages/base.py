from typing import List, Dict, Any, Optional

from django.utils.module_loading import import_string
from django.http import HttpResponse, JsonResponse
from wagtail.core.models import Page
from rest_framework import serializers

from ..mixins import EnhancedEditHandlerMixin, SeoMixin


class BasePage(EnhancedEditHandlerMixin, SeoMixin, Page):
    # Basepage is not anything creatable in admin
    is_creatable: bool = False
    show_in_menus_default: bool = True

    extra_panels: List = []
    serializer_class: str = "main.pages.BasePageSerializer"

    def __init__(self, *args, **kwargs):
        self.template = "pages/react.html"
        self.component_name = self.__class__.__name__
        super().__init__(*args, **kwargs)

    def get_context(self, request, *args, **kwargs) -> Dict[str, Any]:
        context = super().get_context(request, *args, **kwargs)

        return {**context, "props": self.to_dict({"request": request})}

    def serve(self, request, *args, **kwargs) -> HttpResponse:
        if self.should_serve_json(request):
            json = self.to_dict({"request": request})
            return JsonResponse(json)

        return super().serve(request, *args, **kwargs)

    @staticmethod
    def should_serve_json(request) -> bool:
        return (
            request.GET.get("format", None) == "json"
            or request.content_type == "application/json"
        )

    def to_dict(self, context: Optional[Dict]) -> Dict[str, Any]:
        context = context or {}
        serializer_cls = self.get_serializer_class()
        serializer = serializer_cls(self, context=context)

        return {
            "component_name": self.component_name,
            "component_props": serializer.data,
        }

    def get_serializer_class(self) -> serializers.Serializer:
        return import_string(self.serializer_class)
