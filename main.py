from flask import Flask, request, url_for, render_template
from markupsafe import escape
import animeworld as aw
app = Flask(__name__)

#Comando per eseguire il tutto $ flask --app main.py --debug run

@app.route('/', methods=["GET", "POST"])
def default():
    if request.method == "POST":
        search_text = request.form.get("anime_name")
        res = aw.find(f"{escape(search_text)}")
        return render_template(f"anime.html", allAnime=res, search_text=search_text)
    return render_template("index.html")