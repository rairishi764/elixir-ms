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
        records_lab_invoice = cursor.fetchall()

        sql = """SELECT * FROM consultation_invoice"""
        result = cursor.execute(sql)
        records_consult_invoice = cursor.fetchall()

        days_totalcost =[]
        days_due_amount=[]
        days_discount_amt = []
        days_advance = []       
        days = 5
        for i in range(days):
            #print(i)
            iday = datetime.date.today() - datetime.timedelta(days=i)
            #print(iday)
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0

            for row in records_lab_invoice:
                #json_data = json.loads(row[2])
                #print(json_data)
                if(iday == row[2]):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
                    #print(iday)
            days_totalcost.append(totalcost_temp)
            days_due_amount.append(due_amount_temp)
            days_discount_amt.append(discount_amt_temp)
            days_advance.append(advance_temp)

            #print(days_totalcost)
            #print(days_advance)
            #print(days_discount_amt)
            #print(days_due_amount)


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

            for row in records_lab_invoice:
                if(imonth == row[2].month and year == row[2].year):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            months_totalcost.append(totalcost_temp)
            months_due_amount.append(due_amount_temp)
            months_discount_amt.append(discount_amt_temp)
            months_advance.append(advance_temp)

            print(months_totalcost)
            print(months_advance)
            print(months_discount_amt)
            print(months_due_amount)




        years_totalcost =[]
        years_due_amount=[]
        years_discount_amt = []
        years_advance = []       
        years = 5
        for i in range(years):
            iyear = datetime.datetime.today().year - i
            #year = datetime.datetime.today().year
            print(iyear)
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0

            for row in records_lab_invoice:
                if(imonth == row[2].month):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            months_totalcost.append(totalcost_temp)
            months_due_amount.append(due_amount_temp)
            months_discount_amt.append(discount_amt_temp)
            months_advance.append(advance_temp)

            print(months_totalcost)
            print(months_advance)
            print(months_discount_amt)
            print(months_due_amount)



    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            #return json_data   

data()