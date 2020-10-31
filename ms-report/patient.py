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
        
        sql = "SELECT * FROM patient"
        result = cursor.execute(sql)
        records = cursor.fetchall()

        new_patient =[] 
        keys =[]
        days = 5
        for i in range(days):
            iday = datetime.date.today() - datetime.timedelta(days=i)
            new_patient_temp = 0
            temp_key =''
            for row in records:
                if(iday == row[10]):
                    new_patient_temp = new_patient_temp + 1
                temp_key = iday.strftime('%A')
                    
            new_patient.append(str(new_patient_temp))
            keys.append(temp_key)

        day_dict = dict([('new_patient',new_patient),('keys',keys)])
        
        new_patient =[]
        months = 5
        keys = []
        for i in range(months):
            imonth = datetime.datetime.today().month - i
            year = datetime.datetime.today().year
            new_patient_temp = 0
            temp_key =''
            
            for row in records:
                if(imonth == row[10].month and year == row[10].year):
                    new_patient_temp = new_patient_temp + 1
                    
                month = datetime.datetime.now() - relativedelta(months=i)
                temp_key = month.strftime('%B')
            new_patient.append(str(new_patient_temp))
            keys.append(str(temp_key))
            # keys.append()
        month_dict = dict([('new_patient',new_patient), ('keys',keys)])

        new_patient =[]
        financial_years = []     
        years = 5
        for i in range(years):
            iyear = datetime.datetime.today().year - i
            new_patient_temp = 0
            financial_year = 0

            for row in records:
                if((iyear == row[10].year and row[10].month>4) or (iyear+1 == row[10].year and row[10].month<4)):
                    new_patient_temp = new_patient_temp + 1
                    
            new_patient.append(str(new_patient_temp))
            financial_years.append(str(iyear)+'-'+str(iyear+1))

        years_dict = dict([('new_patient',new_patient), ('key',financial_years)])

        data_dict = dict ([('days',day_dict),('months',month_dict),('years',years_dict)])
        #print(data_dict)
        return (data_dict)
       
    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()