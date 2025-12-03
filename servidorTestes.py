from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Task:
    def __init__(self, prioridade, descricao, local, recursosNecessarios, dataLimite, matricula):
        self.prioridade = prioridade
        self.descricao = descricao
        self.local = local
        self.recursosNecessarios = recursosNecessarios
        self.dataLimite = dataLimite
        self.matricula = matricula
        
    def to_dict(self):
        return {
            "prioridade": self.prioridade,
            "descricao": self.descricao,
            "local": self.local,
            "recursosNecessarios": self.recursosNecessarios,
            "dataLimite": self.dataLimite,
            "matricula": self.matricula
        }

tasks = [

]

@app.route("/", methods=["GET"])
def home():
    return jsonify(tasks)

@app.route("/add", methods=["POST"])
def add_task():

    data = request.get_json()
    print("Recebido:", data)

    t = Task(
        data["prioridade"],
        data["descricao"],
        data["local"],
        data["recursosNecessarios"],
        data["dataLimite"],
        data["matricula"]
    )

    tasks.append(t.to_dict())

    return {"message": "foi"}

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)