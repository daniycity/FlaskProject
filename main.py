from flask import Flask, request, url_for, render_template, redirect
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

@app.route('/anime/<name>')
def show_anime(name):
    temp = aw.find(f"{escape(name)}")[0]
    link = temp['link']
    image = temp['image']
    story = temp['story']
    numButton = temp['episodes']
    anime = aw.Anime(link)
    return render_template("anime.html", anime=anime, numButton=numButton, image=image, story=story)

@app.route("/search/<name>")
def search(name):
    preResult = aw.find(f"{escape(name)}")
    result=[]
    for x in preResult:
        object = {'name':x['name'],'img':x['image']}
        result.append(object)
    return result

# TODO This route it's still a problem with bigger anime, needs new logic!
@app.route("/download/<name>/<ep>")
def download(name, ep):
    temp = aw.find(f"{escape(name)}")[0]
    link = temp['link']
    anime = aw.Anime(link)
    episodes = anime.getEpisodes()
    try:
        return redirect(episodes[int(ep)-1].links[0].link.replace("download-file.php?id=",""))
    except IndexError:
        return "Episodio non ancora disponibile!"