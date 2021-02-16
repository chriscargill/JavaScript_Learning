print('Starting routes.py')
from flask import render_template, url_for, flash, redirect, request, jsonify, abort, session, Response
from pjs import app

@app.route('/home')
@app.route('/')
def HomeRoute():
    try: # Attempt to get user ip address
        user_ip = request.environ['HTTP_X_FORWARDED_FOR']
        print(user_ip)
    except:
        user_ip = None
    data = {1:{'name':'Chris', 'age':32}, 2:{'name':'Marie', 'age':35}}
    return render_template('home.html', title='Welcome', data=data, ip=user_ip)

@app.route('/file')
def FIleRoute():
    try: # Attempt to get user ip addressa
        user_ip = request.environ['HTTP_X_FORWARDED_FOR']
        print(user_ip)
    except:
        user_ip = None
    data = {1:{'name':'jack', 'age':32}, 2:{'name':'jill', 'age':35}}
    return render_template('from_js.html', title='FROM JS', data=data, ip=user_ip)