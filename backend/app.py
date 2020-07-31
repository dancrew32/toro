import json

from flask import Flask
from flask import jsonify

app = Flask(__name__)


def serve_json(path):
    with open(path, 'rb') as f:
        data = json.load(f)
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/tables')
def tables():
    return serve_json('./data/tables.json')


@app.route('/metrics/<int:table_id>')
def metrics(table_id: int):
    return serve_json(f'./data/metrics.{table_id}.json')
