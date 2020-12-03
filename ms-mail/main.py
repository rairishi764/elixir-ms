import flask
from flask import request, jsonify
import mail
from flask_cors import CORS, cross_origin
#from flask.ext.cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.

@app.route('/api/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Mail Service Up</h1>'''

@app.route('/api/sendmail/',methods=['POST'])
@cross_origin()
def api_mail():
    print("Print POST")
    data = request.json
    mail.sendmail(data)
    return data.get('sender_mail')

app.run(port=5000,host= '0.0.0.0')