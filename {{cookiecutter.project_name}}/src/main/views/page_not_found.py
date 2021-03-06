from django.template.response import TemplateResponse
from django.views.generic import TemplateView

from main.mixins import ReactViewMixin
from main.serializers import NotFoundPageSerializer


class TemplateResponseNotFound(TemplateResponse):
    status_code = 404


class PageNotFoundView(ReactViewMixin, TemplateView):
    component_name = "NotFoundPage"
    response_class = TemplateResponseNotFound
    serializer_class = NotFoundPageSerializer

    def get_component_props(self):
        return {"exception": "Page not found"}
