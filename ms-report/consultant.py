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
        j=0
        for consultant in consultants:
           # print('###############')
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
            day_dict = dict([('dayshare',consultant_share), ('daykeys',keys)])
            consultant = consultant +(day_dict,)
            consultants[j] = consultant
            j=j+1
        #print(consultants)

        months = 3
        j=0
        for consultant in consultants:
           # print('###############')
            consultant_share = []
            center_share = []
            keys = []       
            consultant_share_val = 0
            for i in range(days):
                imonth = datetime.datetime.today().month - i
                year = datetime.datetime.today().year
                consultant_share_month = 0
                center_share_temp = 0
                month = ''
                for row in records:
                    if(imonth == row[2].month and year == row[2].year):
                        json_data =json.loads(row[5])
                        for obj1 in json_data:
                            if(consultant[0]==obj1['consultant_name']):
                                consultant_share_month=consultant_share_month+obj1['center_share_value']
                            else:
                                print('')
                imonth = datetime.datetime.today().month - i
                keys.append(str(imonth))
                consultant_share.append(consultant_share_month)
            day_dict = dict([('monthshare',consultant_share), ('keys',keys)])
            consultant = consultant +(day_dict,)
            consultants[j] = consultant
            j=j+1
        #print(consultants)

        years = 3
        j=0
        for consultant in consultants:
           # print('###############')
            consultant_share = []
            center_share = []
            keys = []       
            consultant_share_val = 0
            for i in range(years):
                iyear = datetime.datetime.today().year - i
                year = datetime.datetime.today().year
                consultant_share_month = 0
                center_share_temp = 0
                month = ''
                for row in records:
                    if((iyear == row[2].year and row[2].month>4) or (iyear+1 == row[2].year and row[2].month<4)):
                        json_data =json.loads(row[5])
                        for obj1 in json_data:
                            if(consultant[0]==obj1['consultant_name']):
                                consultant_share_month=consultant_share_month+obj1['center_share_value']
                            else:
                                print('')
                #imonth = datetime.datetime.today().month - i
                #financial_years.append(str(iyear)+'-'+str(iyear+1))
                keys.append(str(iyear)+'-'+str(iyear+1))
                consultant_share.append(consultant_share_month)
            day_dict = dict([('yearshare',consultant_share), ('keys',keys)])
            consultant = consultant +(day_dict,)
            consultants[j] = consultant
            j=j+1
        #print(consultants)
        
        return consultants            

    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()