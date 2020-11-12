import flask
from flask import request, jsonify
#import dashboard, lab_invoice, consultation_invoice, consultant, lab_partner, patient
from flask_cors import CORS, cross_origin
from app.twilio.sms import sms
from app.twilio.whatsapp import whatsapp

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

@app.route('/api/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Communication Service</h1>'''

@app.route('/api/sms/',methods=['POST'])
@cross_origin()
def api_sms():
    return sms(request.POST['from_'], request.POST['to'], request.POST['body'])
    
def api_whatsapp():
    return whatsapp(request.POST['from_'], request.POST['to'], request.POST['body'])
    


app.run(port=5002,host= '0.0.0.0')