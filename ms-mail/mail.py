import smtplib
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl
import json


def sendmail(mail):
    with open('../config.json') as json_file:
        configdata = json.load(json_file)
    sender_email = configdata['client']['invoicemail']
    receiver_email = mail.get('receiver')
    password = configdata['client']['invoicemailpwd']
    message = MIMEMultipart("alternative")
    message["Subject"] = mail.get('subject')
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    text = mail.get('mailtxt')
    html = mail.get('mailbody')

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)
    
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(sender_email, password)
        server.sendmail(sender_email,receiver_email, message.as_string())
        server.close()
        print ('Email sent!')
            
    except Exception as inst:
        print(type(inst))    # the exception instance
        print(inst.args)     # arguments stored in .args
        print(inst)   

