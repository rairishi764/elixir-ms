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

        days = 5
        for consultant in consultants:
            print('###############')
            consultant_share = []
            center_share = []
            keys = []       
            consultant_share_val = 0

            for i in range(days):
                iday = datetime.date.today() - datetime.timedelta(days=i)
                consultant_share_day = 0
                center_share_temp = 0
                for row in records:
                    if(iday == row[2]):
                        json_data =json.loads(row[5])
                        for obj1 in json_data:
                            if(consultant[0]==obj1['consultant_name']):
                                consultant_share_day=consultant_share_day+obj1['center_share_value']
                            else:
                                print('')
                keys.append(str(iday))
                consultant_share.append(consultant_share_day)
            print(consultant[0])
            print(keys)
            print(consultant_share)
    
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