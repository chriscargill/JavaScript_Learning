print("Starting __init__.py")
from flask import Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'supasecret!' # Yes I know you can see my supasecret secret key

from pjs import routes
print("Ending __init__.py")