"""
Purpose of this file:
    This file will communicate with Googles NLP API to classify course descriptions
"""

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

import six

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="C:\\Users\\computer\\DigitalAcadamy\\np.json"

LANGUAGE = "english"
SENTENCES_COUNT = 1

POST_COUNT = 15


def get_category(text):
    """
    From a block of text, get the categorization of that text
    Parameters
        ----------
        text : str
            the article/text to categorize

    Returns
        ----------
        category : str
            the category of the text contents
    """
    if text and len(text) > 30:
        client = language.LanguageServiceClient()

        if isinstance(text, six.binary_type):
            text = text.decode("utf-8")

        document = types.Document(
            content=text.encode("utf-8"), type=enums.Document.Type.PLAIN_TEXT
        )

        categories = client.classify_text(document).categories

        if categories:
            return categories
    return None
