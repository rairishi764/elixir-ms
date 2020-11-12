import flask
from flask import request, jsonify
#import dashboard, lab_invoice, consultation_invoice, consultant, lab_partner, patient
from flask_cors import CORS, cross_origin
from app.twilio.sms import sms
#from app.twilio.whatsapp import whatsapp, whatsapp_with_callbackURL, whatsapp_with_media
from app.twilio.whatsapp import whatsapp, whatsapp_with_media, whatsapp_with_callbackURL


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
    #+13466169573
    return sms(request.get_json(force=True)['from_'], 
                                request.get_json(force=True)['to'], 
                                request.get_json(force=True)['body'])


@app.route('/api/whatsapp/',methods=['POST'])
@cross_origin()    
def api_whatsapp():
    print(request.get_json(force=True)['from_'])
    return whatsapp(request.get_json(force=True)['from_'],
                                request.get_json(force=True)['to'], 
                                request.get_json(force=True)['body'])


@app.route('/api/whatsappwithmedia/',methods=['POST'])
@cross_origin()    
def api_whatsapp_with_media():
    return whatsapp_with_media(request.get_json(force=True)['from_'], 
                                request.get_json(force=True)['to'],
                                request.get_json(force=True)['body'],
                                request.get_json(force=True)['media_url'])

@app.route('/api/whatsappwithcallbackurl/',methods=['POST'])
@cross_origin()    
def api_whatsapp_with_media_callbackURL():
    return whatsapp_with_callbackURL(request.get_json(force=True)['from_'], 
                                request.get_json(force=True)['to'],
                                request.get_json(force=True)['body'],
                                request.get_json(force=True)['status_callback'])
                                    
app.run(port=5002,host= '0.0.0.0')