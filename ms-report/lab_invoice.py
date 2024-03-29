import mysql.connector
import json
from mysql.connector import Error
import json
import datetime
from datetime import date, timedelta
from dateutil.relativedelta import *
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
        
        sql = "SELECT * FROM lab_invoice"
        result = cursor.execute(sql)
        records = cursor.fetchall()

        totalcost =[]
        due_amount=[]
        discount_amt = []
        advance = []
        keys = []   
        cash_collection = []
        card_collection = []    
        days = 5
        for i in range(days):
            iday = datetime.date.today() - datetime.timedelta(days=i)
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0
            cash =0
            card =0
            temp_key =''
            for row in records:
                if(iday == row[2]):
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
                    
                    if(row[3]==1):
                        cash = cash+row[9]
                    else:
                        card = card + row[9]
            temp_key = iday.strftime('%A')        
            totalcost.append(str(totalcost_temp))
            cash_collection.append(str(cash))
            card_collection.append(str(card))
            due_amount.append(str(due_amount_temp))
            discount_amt.append(str(discount_amt_temp))
            advance.append(str(advance_temp))
            keys.append(temp_key)

        day_dict = dict([('cash',cash_collection),('card',card_collection),('totalcost',totalcost), ('due_amount',due_amount)
                , ('discount_amt',discount_amt), ('advance',advance),('keys',keys)])

        totalcost =[]
        due_amount=[]
        discount_amt = []
        advance = []       
        months = 5
        keys = []
        cash_collection = []
        card_collection = []    
        for i in range(months):
            imonth = datetime.datetime.today().month - i
            year = datetime.datetime.today().year
            totalcost_temp = 0
            due_amount_temp = 0
            discount_amt_temp = 0
            advance_temp = 0
            cash =0
            card =0
            temp_month = ''
            for row in records:
                if(imonth == row[2].month and year == row[2].year):
                    if(row[3]==1):
                        cash = cash+row[9]
                    else:
                        card = card + row[9]
                    totalcost_temp = totalcost_temp + row[4]
                    due_amount_temp = due_amount_temp + row[8]
                    discount_amt_temp = discount_amt_temp + row[7]
                    advance_temp = advance_temp + row[9]
            month = datetime.datetime.now() - relativedelta(months=i)
            temp_key = month.strftime('%B')
            cash_collection.append(str(cash))
            card_collection.append(str(card))
            totalcost.append(str(totalcost_temp))
            due_amount.append(str(due_amount_temp))
            discount_amt.append(str(discount_amt_temp))
            advance.append(str(advance_temp))
            keys.append(temp_key)
           # keys.append()
        month_dict = dict([('cash',cash_collection),('card',card_collection),('totalcost',totalcost), ('due_amount',due_amount)
                , ('discount_amt',discount_amt), ('advance',advance), ('keys',keys)])


        totalcost =[]
        due_amount=[]
        discount_amt = []
        advance = []  
        financial_years = []    
        cash_collection = []
        card_collection = []     
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
            totalcost.append(str(totalcost_temp))
            due_amount.append(str(due_amount_temp))
            discount_amt.append(str(discount_amt_temp))
            advance.append(str(advance_temp))
            financial_years.append(str(iyear)+'-'+str(iyear+1))

        years_dict = dict([('totalcost',totalcost), ('due_amount',due_amount)
                , ('discount_amt',discount_amt), ('advance',advance), ('key',financial_years)])

        data_dict = dict ([('days',day_dict),('months',month_dict),('years',years_dict)])

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