#!/usr/bin/env python3
""" Connect all views
"""
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix='/api/v1')

from views.mock import *