from flask import Flask, request, url_for, render_template
from markupsafe import escape
import animeworld as aw
app = Flask(__name__)

#Comando per eseguire il tutto $ flask --app main.py --debug run

@app.route('/', methods=["GET", "POST"])
def default():
    if request.method == "POST":
        search_text = request.form.get("anime_name")
        result = aw.find(f"{escape(search_text)}")
        return render_template(f"search.html", allAnime=result, search_text=search_text)
    return render_template("index.html")

@app.route('/<name>')
def show_anime(name):
    link = aw.find(f"{escape(name)}")[0]['link']
    anime = aw.Anime(link)
    episodes = anime.getEpisodes()
    download = []
    for ep in episodes:
        download.append(ep.links[0].link)
    return download