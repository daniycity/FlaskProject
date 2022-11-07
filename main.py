from flask import Flask, url_for
from markupsafe import escape
import animeworld as aw
from flask import render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.get('/login')
def form_get():
    return render_template('form.html')

@app.post('/login')
def form_post():
    return do_the_login()

@app.route("/anime/<anime>")
def anime(anime):
    res = aw.find(f"{escape(anime)}")
    return render_template('anime.html', allAnime=res)

    

