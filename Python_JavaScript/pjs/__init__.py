print("Starting __init__.py")
from flask import Flask
app = Flask(__name__)

from pjs import routes
print("Ending __init__.py")