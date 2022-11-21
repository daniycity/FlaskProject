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
    temp = aw.find(f"{escape(name)}")[0]
    link = temp['link']
    image = temp['image']
    story = temp['story']
    anime = aw.Anime(link)
    episodes = anime.getEpisodes()
    direct_links = []
    for ep in episodes:
        direct_links.append(ep.links[0].link.replace("download-file.php?id=",""))
    return render_template("anime.html", anime=anime, links=enumerate(direct_links, 1), image=image, story = story)

@app.route("/search/<name>")
def search(name):
    result =aw.find(f"{escape(name)}")
    realResult=[]
    
    for x in result:
        object = {'name':x['name'],'img':x['image']}
        realResult.append(object)
    return realResult