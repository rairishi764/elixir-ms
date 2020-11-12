from twilio.rest import Client
import json
import sys

def whatsapp(from_,to,message_body):
    try:
        with open('../config.json') as json_file:
            configdata = json.load(json_file)            
            # Your Account SID from twilio.com/console
            account_sid = configdata['communication']['twilio']['account_id']
            # Your Auth Token from twilio.com/console
            auth_token = configdata['communication']['twilio']['auth_token']
            client = Client(account_sid, auth_token)
            message = client.messages.create(from_='whatsapp:'+from_,to='whatsapp:'+to, body=message_body)
        return(message.sid)

    except ConnectionError as e:
        print("Error sending message:", e)
    