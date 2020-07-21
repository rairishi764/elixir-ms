import mysql.connector
import json
from mysql.connector import Error
import json
import datetime
from datetime import date, timedelta

def dashboard():
    try:
        connection = mysql.connector.connect(host='localhost',
                                         database='elixir',
                                         user='root',
                                         password='')
        sql = """SELECT * FROM lab_invoice WHERE (month(CURRENT_DATE)= month(date))"""
        cursor = connection.cursor()
        result = cursor.execute(sql)
        records = cursor.fetchall()
        
        total_price=0
        discount_amt=0
        due_amt=0
        advance=0
        cash_collection=0
        card_collection=0

        day_total_price=0
        day_discount_amt=0
        day_due_amt=0
        day_advance=0
        day_cash_collection=0
        day_card_collection=0

        day_total_price_1=0
        day_discount_amt_1=0
        day_due_amt_1=0
        day_advance_1=0
        day_cash_collection_1=0
        day_card_collection_1=0


        day_total_price_2=0
        day_discount_amt_2=0
        day_due_amt_2=0
        day_advance_2=0
        day_cash_collection_2=0
        day_card_collection_2=0



        week_total_price=0
        week_discount_amt=0
        week_due_amt=0
        week_advance=0
        week_cash_collection=0
        week_card_collection=0
        
        week_total_price=0
        week_discount_amt=0
        week_due_amt=0
        week_advance=0
        week_cash_collection=0
        week_card_collection=0


        week_total_price_1=0
        week_discount_amt_1=0
        week_due_amt_1=0
        week_advance_1=0
        week_cash_collection_1=0
        week_card_collection_1=0

        week_total_price_2=0
        week_discount_amt_2=0
        week_due_amt_2=0
        week_advance_2=0
        week_cash_collection_2=0
        week_card_collection_2=0

        week_total_price_3=0
        week_discount_amt_3=0
        week_due_amt_3=0
        week_advance_3=0
        week_cash_collection_3=0
        week_card_collection_3=0


        print(" Total number of rows is: ", cursor.rowcount)
        print("\n Printing record")
        data = {}
        for row in records:
            total_price=total_price+row[4]
            discount_amt=discount_amt+row[7]
            due_amt=due_amt+row[8]
            advance=advance+row[9]
            if row[3]==1:
                #print("cash pay")
                cash_collection=cash_collection+row[4]

            if row[3]==2:
                card_collection=card_collection+row[4]
                #print("card pay")

            #print ("DATE:"+str(row[2].isocalendar()[1]))
            
            if(row[2].isocalendar()[1]==date.today().isocalendar()[1]):
                week_total_price=week_total_price+row[4]
                week_discount_amt=week_discount_amt+row[7]
                week_due_amt=week_due_amt+row[8]
                week_advance=week_advance+row[9]
                if row[3]==1:
                    week_cash_collection=week_cash_collection+row[4]

                if row[3]==2:
                    week_card_collection=week_card_collection+row[4]
                    

            if(row[2].isocalendar()[1]==date.today().isocalendar()[1]-1):
                week_total_price_1=week_total_price_1+row[4]
                week_discount_amt_1=week_discount_amt_1+row[7]
                week_due_amt_1=week_due_amt_1+row[8]
                week_advance_1=week_advance_1+row[9]
                if row[3]==1:
                    week_cash_collection_1=week_cash_collection_1+row[4]

                if row[3]==2:
                    week_card_collection_1=week_card_collection_1+row[4]
                    
            
            if(row[2].isocalendar()[1]==date.today().isocalendar()[1]-2):
                #print(row[2].isocalendar()[1])
                week_total_price_2=week_total_price_2+row[4]
                week_discount_amt_2=week_discount_amt_2+row[7]
                week_due_amt_2=week_due_amt_2+row[8]
                week_advance_2=week_advance_2+row[9]
                if row[3]==1:
                    week_cash_collection_2=week_cash_collection_2+row[4]

                if row[3]==2:
                    week_card_collection_2=week_card_collection_2+row[4]
                    


            if(row[2].isocalendar()[1]==date.today().isocalendar()[1]-3):
                week_total_price_3=week_total_price_3+row[4]
                week_discount_amt_3=week_discount_amt_3+row[7]
                week_due_amt_3=week_due_amt_3+row[8]
                week_advance_3=week_advance_3+row[9]
                if row[3]==1:
                    week_cash_collection_3=week_cash_collection_3+row[4]

                if row[3]==2:
                    week_card_collection_3=week_card_collection_3+row[4]
                    
            
            if(row[2]==date.today()):
                day_total_price=day_total_price+row[4]
                day_discount_amt=day_discount_amt+row[7]
                day_due_amt=day_due_amt+row[8]
                day_advance=day_advance+row[9]
                if row[3]==1:
                    day_cash_collection=day_cash_collection+row[4]

                if row[3]==2:
                    day_card_collection=day_card_collection+row[4]
                    

            
            if(row[2]==date.today()- timedelta(days = 1)):
                day_total_price_1=day_total_price_1+row[4]
                day_discount_amt_1=day_discount_amt_1+row[7]
                day_due_amt_1=day_due_amt_1+row[8]
                day_advance_1=day_advance_1+row[9]
                if row[3]==1:
                    day_cash_collection_1=day_cash_collection_1+row[4]

                if row[3]==2:
                    day_card_collection_1=day_card_collection_1+row[4]
                
            
            if(row[2]==date.today()- timedelta(days = 2)):
                day_total_price_2=day_total_price_2+row[4]
                day_discount_amt_2=day_discount_amt_2+row[7]
                day_due_amt_2=day_due_amt_2+row[8]
                day_advance_2=day_advance_2+row[9]
                if row[3]==1:
                    day_cash_collection_2=day_cash_collection_2+row[4]

                if row[3]==2:
                    day_card_collection_2=day_card_collection_2+row[4]
            


        data['month_total_revenue'] = str(total_price)    
        data["month_discount_amt"]= str(discount_amt)
        data["month_due_amt"]= str(due_amt)
        data["month_advance"]= str(advance)
        data["month_cash_collection"]=str(cash_collection)
        data["month_card_collection"]=str(card_collection)

        data['week_total_revenue'] = str(week_total_price)    
        data["week_discount_amt"]= str(week_discount_amt)
        data["week_due_amt"]= str(week_due_amt)
        data["week_advance"]= str(week_advance)
        data["week_cash_collection"]=str(week_cash_collection)
        data["week_card_collection"]=str(week_card_collection)

        data['week_total_revenue_1'] = str(week_total_price_1)    
        data["week_discount_amt_1"]= str(week_discount_amt_1)
        data["week_due_amt_1"]= str(week_due_amt_1)
        data["week_advance_1"]= str(week_advance_1)
        data["week_cash_collection_1"]=str(week_cash_collection_1)
        data["week_card_collection_1"]=str(week_card_collection_1)

        data['week_total_revenue_2'] = str(week_total_price_2)    
        data["week_discount_amt_2"]= str(week_discount_amt_2)
        data["week_due_amt_2"]= str(week_due_amt_2)
        data["week_advance_2"]= str(week_advance_2)
        data["week_cash_collection_2"]=str(week_cash_collection_2)
        data["week_card_collection_2"]=str(week_card_collection_2)

        data['week_total_revenue_3'] = str(week_total_price_3)    
        data["week_discount_amt_3"]= str(week_discount_amt_3)
        data["week_due_amt_3"]= str(week_due_amt_3)
        data["week_advance_3"]= str(week_advance_3)
        data["week_cash_collection_3"]=str(week_cash_collection_3)
        data["week_card_collection_3"]=str(week_card_collection_3)


        data['day_total_revenue'] = str(day_total_price)    
        data["day_discount_amt"]= str(day_discount_amt)
        data["day_due_amt"]= str(day_due_amt)
        data["day_advance"]= str(day_advance)
        data["day_cash_collection"]=str(day_cash_collection)
        data["day_card_collection"]=str(day_card_collection)


        data['day_total_revenue_1'] = str(day_total_price_1)    
        data["day_discount_amt_1"]= str(day_discount_amt_1)
        data["day_due_amt_1"]= str(day_due_amt_1)
        data["day_advance_1"]= str(day_advance_1)
        data["day_cash_collection_1"]=str(day_cash_collection_1)
        data["day_card_collection_1"]=str(day_card_collection_1)

        data['day_total_revenue_2'] = str(day_total_price_2)    
        data["day_discount_amt_2"]= str(day_discount_amt_2)
        data["day_due_amt_2"]= str(day_due_amt_2)
        data["day_advance_2"]= str(day_advance_2)
        data["day_cash_collection_2"]=str(day_cash_collection_2)
        data["day_card_collection_2"]=str(day_card_collection_2)

        json_data = json.dumps(data)    

    except Error as e:
        print("Error reading data from MySQL table", e)
    finally:
        if (connection.is_connected()):
            connection.close()
            cursor.close()
            print("MySQL connection is closed")
            return json_data   

dashboard()