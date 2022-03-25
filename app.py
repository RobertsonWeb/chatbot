from flask import Flask, render_template, request, jsonify

from lib.chatbot import perguntar
app = Flask(__name__, template_folder='templates')

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/chatbot')
def chatbot():
    try:
        pergunta = request.args.get('pergunta')
        resposta = perguntar(pergunta)
    except Exception as e:
        resposta = 'Ops! Ocorreu um erro e eu não pude responder a sua pergunta!'
    return jsonify(resposta=resposta)