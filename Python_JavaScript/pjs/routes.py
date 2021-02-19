print('Starting routes.py')
from flask import render_template, url_for, flash, redirect, request, jsonify, abort, session, Response
from pjs import app
from pjs.forms import AddForm
from pjs.connect import connect_to_db
import psycopg2

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
def FileRoute():
    try: # Attempt to get user ip addressa
        user_ip = request.environ['HTTP_X_FORWARDED_FOR']
        print(user_ip)
    except:
        user_ip = None
    data = {1:{'name':'jack', 'age':32}, 2:{'name':'jill', 'age':35}}
    return render_template('from_js.html', title='FROM JS', data=data, ip=user_ip)

@app.route('/add', methods=['GET','POST'])
def AddRoute():
    form = AddForm()
    if request.method=='GET':
        return render_template('add.html', title='Let everyone know', status='GET', form=form)
    elif request.method=='POST':
        if form.validate_on_submit():
            try:
                who = form.Who.data
                what = form.What.data
                when = form.When.data
                where = form.Where.data
                why = form.Why.data
                nick = form.nickName.data
                print(f"NICK: {nick}")
                if nick != "":
                    print("passing")
                else:
                    print("Registering")
                print(who,what,when,where,why)
                conn = connect_to_db() # All this function does is connect to a postgres database and return the connected database object. You'll have to implement your own function to do the same thing as I haven't included it in the git
                cursor = conn.cursor()
                cursor.execute("""
                INSERT INTO events 
                (e_who, 
                e_what, 
                e_when, 
                e_where, 
                e_why, 
                user_id) 
                VALUES 
                ('%(e_who)s', 
                '%(e_what)s', 
                '%(e_when)s', 
                '%(e_where)s', 
                '%(e_why)s', 
                1)""" 
                % {'e_who': who, 'e_what':what, 'e_when':when, 'e_where':where, 'e_why':why})
                conn.commit()
                conn.close()
                data = {'who': who, 'what': what, 'when': when, 'where': where, 'why': why}
            except Exception as e:
                data = None
            finally:
                return render_template('add.html', title='Let everyone know', status='POST', data=data)
        else:
            return render_template('add.html', title="Let everyone know", status='GET', form=form)
    else:
        return None