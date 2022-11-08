from flask import Flask, request, url_for, render_template
from markupsafe import escape
import animeworld as aw
app = Flask(__name__)


@app.route('/', methods=["GET", "POST"])
def default():
    if request.method == "POST":
        anime_name = request.form.get("anime_name")
        res = aw.find(f"{escape(anime_name)}")
        return render_template(f"anime.html", allAnime=res)
    return render_template("index.html")