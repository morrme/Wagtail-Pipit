from rest_framework import serializers
from wagtail.core.rich_text import expand_db_html

from .base_serializer import BasePageSerializer
from .article import ArticlePage


class ArticlePageSerializer(BasePageSerializer):
    rich_text = serializers.SerializerMethodField()

    class Meta:
        model = ArticlePage
        fields = BasePageSerializer.Meta.fields + ["rich_text"]

    def get_rich_text(self, page) -> str:
        return expand_db_html(page.rich_text)
