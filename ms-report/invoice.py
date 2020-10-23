import mysql.connector
import json
from mysql.connector import Error
import json
import datetime
from datetime import date, timedelta
import json
def data():
    lab_categorylist =[]
    data = {}
    try:
        with open('../config.json') as json_file:
            configdata = json.load(json_file)

        connection = mysql.connector.connect(host=configdata['db']['server'],
                                         database=configdata['db']['db'],
                                         user=configdata['db']['user'],
                                         password=configdata['db']['password'])

        cursor = connection.cursor()
        
        sql = """SELECT * FROM lab_invoice"""
        result = cursor.execute(sql)
        records = cursor.fetchall()

        days_totalcost =[]
        days_due_amount=[]
        days_discount_amt = []
        days_advance = []       
        days = 5
        for i in range(days):
            iday = datetime.date.today() - datetime.timedelta(days=i)
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0

            for row in records:
                if(iday == row[2]):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            days_totalcost.append(totalcost_temp)
            days_due_amount.append(due_amount_temp)
            days_discount_amt.append(discount_amt_temp)
            days_advance.append(advance_temp)

        day_dict = dict([('totalcost',days_totalcost), ('due_amount',days_due_amount)
                , ('discount_amt',days_discount_amt), ('advance',days_advance)])

        months_totalcost =[]
        months_due_amount=[]
        months_discount_amt = []
        months_advance = []       
        months = 5
        for i in range(months):
            imonth = datetime.datetime.today().month - i
            year = datetime.datetime.today().year
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0

            for row in records:
                if(imonth == row[2].month and year == row[2].year):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            months_totalcost.append(totalcost_temp)
            months_due_amount.append(due_amount_temp)
            months_discount_amt.append(discount_amt_temp)
            months_advance.append(advance_temp)

        month_dict = dict([('totalcost',months_totalcost), ('due_amount',months_due_amount)
                , ('discount_amt',months_discount_amt), ('advance',months_advance)])


        years_totalcost =[]
        years_due_amount=[]
        years_discount_amt = []
        years_advance = []  
        financial_years = []     
        years = 5
        for i in range(years):
            iyear = datetime.datetime.today().year - i
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0
            financial_year = 0

            for row in records:
                if((iyear == row[2].year and row[2].month>4) or (iyear+1 == row[2].year and row[2].month<4)):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            years_totalcost.append(totalcost_temp)
            years_due_amount.append(due_amount_temp)
            years_discount_amt.append(discount_amt_temp)
            years_advance.append(advance_temp)
            financial_years.append(str(iyear)+'-'+str(iyear+1))

        years_dict = dict([('totalcost',years_totalcost), ('due_amount',years_due_amount)
                , ('discount_amt',years_discount_amt), ('advance',years_advance), ('key',financial_years)])


        data_dict = dict ([('days',day_dict),('months',month_dict),('years',years_dict)])
        print(data_dict)
    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()