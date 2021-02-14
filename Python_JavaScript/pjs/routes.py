print('Starting routes.py')
from flask import render_template, url_for, flash, redirect, request, jsonify, abort, session, Response
from pjs import app

@app.route('/home')
@app.route('/')
def HomeRoute():
    data = {1:{'name':'Chris', 'age':32}, 2:{'name':'Marie', 'age':35}}
    return render_template('home.html', title='Welcome', data=data)
