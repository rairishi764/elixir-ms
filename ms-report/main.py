import flask
from flask import request, jsonify
import dashboard, invoice, center
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

@app.route('/api/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Dash Service Up</h1>'''

@app.route('/api/dashdata/',methods=['GET'])
@cross_origin()
def api_dashdata():
    print("Print POST")
    return dashboard.dashboard()

@app.route('/api/analytics/consultant',methods=['GET'])
@cross_origin()
def api_consultantdata():
    print("Print POST")
    return consultant.data()


app.run(port=5001,host= '0.0.0.0')