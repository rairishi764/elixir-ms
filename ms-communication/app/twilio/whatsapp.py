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


def whatsapp_with_media(from_,to,message_body,media_url):
    try:
        with open('../config.json') as json_file:
            configdata = json.load(json_file)            
            # Your Account SID from twilio.com/console
            account_sid = configdata['communication']['twilio']['account_id']
            # Your Auth Token from twilio.com/console
            auth_token = configdata['communication']['twilio']['auth_token']
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                     body=message_body,
                     media_url=media_url,
                     from_='whatsapp:'+from_,
                     to='whatsapp:'+to,
                 )
        return(message.sid)

    except ConnectionError as e:
        print("Error sending message:", e)


def whatsapp_with_callbackURL(from_,to,message_body,status_callback):
    try:
        with open('../config.json') as json_file:
            configdata = json.load(json_file)            
            # Your Account SID from twilio.com/console
            account_sid = configdata['communication']['twilio']['account_id']
            # Your Auth Token from twilio.com/console
            auth_token = configdata['communication']['twilio']['auth_token']
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                     body=message_body,
                     status_callback=status_callback,
                     from_='whatsapp:'+from_,
                     to='whatsapp:'+to,
                 )
        return(message.sid)

    except ConnectionError as e:
        print("Error sending message:", e)
