import flask
from flask import request, jsonify
import lab_invoice, consultation_invoice, consultant, lab_partner, patient
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

@app.route('/api/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Dash Service Up</h1>'''

@app.route('/api/analytics/labinvoice',methods=['GET'])
@cross_origin()
def api_labinvoicedata():
    print("Print POST")
    return lab_invoice.data()

@app.route('/api/analytics/consultationinvoice',methods=['GET'])
@cross_origin()
def api_consultationinvoicedata():
    print("Print POST")
    return consultation_invoice.data()

@app.route('/api/analytics/consultant',methods=['GET'])
@cross_origin()
def api_consultantdata():
    print("Print POST")
    return consultant.data()

@app.route('/api/analytics/labpartner',methods=['GET'])
@cross_origin()
def api_labpartnerdata():
    print("Print POST")
    return lab_partner.data()

@app.route('/api/analytics/patients',methods=['GET'])
@cross_origin()
def api_labpatientdata():
    print("Print POST")
    return patient.data()

app.run(port=5001,host= '0.0.0.0')