import sys
import os

# Make the Exp-13 root importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..'))

import serverless_wsgi
from app import app, db

with app.app_context():
    db.create_all()

def handler(event, context):
    return serverless_wsgi.handle_request(app, event, context)
