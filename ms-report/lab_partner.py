import mysql.connector
import json
from mysql.connector import Error
import json
import datetime
from datetime import date, timedelta
from dateutil.relativedelta import *
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
        
        sql = "SELECT * FROM lab_invoice"
        result = cursor.execute(sql)
        records = cursor.fetchall()

        sql = "SELECT * FROM lab_partner"
        result = cursor.execute(sql)
        consultants = cursor.fetchall()

        days = 5
        j=0
        consultant_list =[]
        data = []
        day=[]
        month_data =[]
        year_data = []
        data ={}
        for consultant in consultants:
            consultant_share = []
            center_share = []          
            doc_dict = {}
            consultant_name = ''
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
                            if(consultant[1]==obj1['partner']):
                                consultant_name = obj1['partner']
                                consultant_share_day = consultant_share_day+obj1['partner_share_value']
                            else:
                                continue                      
                keys.append(str(iday.strftime('%A')))
                consultant_share.append(consultant_share_day)
            doc_dict = dict([('share',consultant_share), ('keys',keys),('partner',consultant[1])])
            day.append(doc_dict)
            

        months = 3
        doc_dict = {}
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
                            if(consultant[1]==obj1['partner']):
                                consultant_share_month=consultant_share_month+obj1['partner_share_value']
                            else:
                                continue

                imonth = datetime.datetime.today().month - i
                month = datetime.datetime.now() - relativedelta(months=i)
                temp_key = month.strftime('%B')
                keys.append(str(temp_key))
                consultant_share.append(consultant_share_month)
            doc_dict = dict([('share',consultant_share), ('keys',keys),('partner',consultant[1])])
            month_data.append(doc_dict)
            
        #print(consultants)
        financial_years =[]
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
                            if(consultant[1]==obj1['partner']):
                                consultant_share_month=consultant_share_month+obj1['partner_share_value']
                            else:
                                continue
                imonth = datetime.datetime.today().month - i
                financial_years.append(str(iyear)+'-'+str(iyear+1))
                keys.append(str(iyear)+'-'+str(iyear+1))
                consultant_share.append(consultant_share_month)
            doc_dict = dict([('share',consultant_share), ('keys',keys),('partner',consultant[1])])
            year_data.append(doc_dict)

        data = dict([('day',day),('month',month_data),('year',year_data)])
        return data            

    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()