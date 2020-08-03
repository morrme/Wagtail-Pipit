from django.contrib.contenttypes.models import ContentType

from wagtail import VERSION as WAGTAIL_VERSION
from wagtail.core.models import Page
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.views import PagesAPIViewSet, BaseAPIViewSet

from wagtail_headless_preview.models import PagePreview
from rest_framework import serializers
from rest_framework.response import Response


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('pages', PagesAPIViewSet)

class PageRelativeUrlListSerializer(serializers.Serializer):
    def to_representation(self, obj):
        return {
            "title": obj.title,
            "relative_url": obj.get_url(None),
        }


class PageRelativeUrlListAPIViewSet(PagesAPIViewSet):
    def listing_view(self, request):
        queryset = self.get_queryset()
        self.check_query_parameters(queryset)
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)

    def get_serializer(self, qs, many=True):
        return PageRelativeUrlListSerializer(qs, many=many)

api_router.register_endpoint('page_relative_urls', PageRelativeUrlListAPIViewSet)


class PagePreviewAPIViewSet(BaseAPIViewSet):
    known_query_parameters = PagesAPIViewSet.known_query_parameters.union(
        ['content_type', 'token']
    )

    def listing_view(self, request):
        page = self.get_object()
        data = page.get_component_data({})
        return Response(data)

    def detail_view(self, request, pk):
        page = self.get_object()
        data = page.get_component_data({})
        return Response(data)

    def get_object(self):
        app_label, model = self.request.GET['content_type'].split('.')
        content_type = ContentType.objects.get(
            app_label=app_label, model=model
        )

        page_preview = PagePreview.objects.get(
            content_type=content_type,
            token=self.request.GET['token'],
        )
        page = page_preview.as_page()
        if not page.pk:
            # fake primary key to stop API URL routing from complaining
            page.pk = 0

        return page


api_router.register_endpoint('page_preview', PagePreviewAPIViewSet)
