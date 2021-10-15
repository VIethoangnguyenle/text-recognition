from flask import Flask, request
from flask_restful import Api, Resource
import textRecognize as tr

app = Flask(__name__)
api = Api(app=app)
 
class textRecognizeRequest:
    def __init__(self, data) -> None:
        self.attachment = data

class TextRecognization(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        attachment = json_data['attachment']
        return tr.TextRecognize(attachment).recognize()

api.add_resource(TextRecognization, "/text/recognize")

if __name__== "__main__":
    app.run(debug=True)
