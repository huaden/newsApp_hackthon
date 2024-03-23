from flask import Blueprint, render_template, url_for, redirect, request, flash, abort
from flask_login import login_required, current_user


main = Blueprint('main', __name__)

@main.route('/')
@main.route('/index')
def index():
    return render_template('index.html')

@main.route('/news')
def getnews():
    pass