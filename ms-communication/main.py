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
    return sms(request.POST['from_'], 
                                request.POST['to'], 
                                request.POST['body'])


@app.route('/api/whatsapp/',methods=['POST'])
@cross_origin()    
def api_whatsapp():
    return whatsapp(request.POST['from_'],
                                request.POST['to'], 
                                request.POST['body'])


@app.route('/api/whatsappwithmedia/',methods=['POST'])
@cross_origin()    
def api_whatsapp_with_media():
    return whatsapp_with_media(request.POST['from_'], 
                                request.POST['to'],
                                request.POST['body'],
                                request.POST['media_url'])

@app.route('/api/whatsappwithcallbackurl/',methods=['POST'])
@cross_origin()    
def api_whatsapp_with_media():
    return whatsapp_with_callbackURL(request.POST['from_'], 
                                request.POST['to'],
                                request.POST['body'],
                                request.POST['status_callback'])
                                    
app.run(port=5002,host= '0.0.0.0')