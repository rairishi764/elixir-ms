import mysql.connector
import json
from mysql.connector import Error
import json
import datetime
from datetime import date, timedelta
import json
def data():
    data = {}
    try:
        with open('../config.json') as json_file:
            configdata = json.load(json_file)

        connection = mysql.connector.connect(host=configdata['db']['server'],
                                         database=configdata['db']['db'],
                                         user=configdata['db']['user'],
                                         password=configdata['db']['password'])

        cursor = connection.cursor()
        
        sql = "SELECT * FROM consultation_invoice"
        result = cursor.execute(sql)
        records = cursor.fetchall()

        sql = "SELECT * FROM consultant"
        result = cursor.execute(sql)
        consultants = cursor.fetchall()

        consultant_share = []
        center_share = []
        keys = []       
        days = 5
        for i in range(days):
            iday = datetime.date.today() - datetime.timedelta(days=i)
            consultant_share_temp = 0
            center_share_temp = 0
            temp_key =''
            for row in records:
                #print(iday)
                #print(row[2])
                if(iday == row[2]):
                    for obj in consultants:
                        #print (str(row[5]))
                        json_data = json.dumps(row[5])  
                        #print(json_data[1])
                        #print(row[4])
        return 'Hello'            

    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()