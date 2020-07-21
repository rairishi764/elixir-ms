import flask
from flask import request, jsonify
import mail
from flask_cors import CORS, cross_origin
#from flask.ext.cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'}
]

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

@app.route('/api/v1/resources/books', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for book in books:
        if book['id'] == id:
            results.append(book)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)

app.run()