import sqlite3
import random

# create connection to database
conn = sqlite3.connect('payments.db')

# create payments table
conn.execute('''CREATE TABLE payments
            (ID INT PRIMARY KEY NOT NULL,
            Date TEXT NOT NULL,
            Gross_Amount INT NOT NULL,
            Status TEXT NOT NULL,
            Customer TEXT NOT NULL,
            Swifter_id TEXT NOT NULL,
            External_id TEXT NOT NULL,
            Source TEXT NOT NULL);''')

# generate and insert data
for i in range(150):
    payment = {
        "date": f"2022-02-{random.randint(1, 28):02d}T{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d}",
        "gross_amount": random.randint(500, 5000),
        "status": random.choice(['authorized', 'initiated', 'successful', 'returned', 'canceled']),
        "customer": f"{random.choice(['Eren Yeager', 'Mikasa Ackerman', 'Levi Ackerman', 'Armin Arlert'])}",
        "swifter_id": f"{random.randint(1000, 9999)}{random.choice(['WS', 'WM', 'LS', 'LM'])}",
        "external_id": f"T{random.randint(100, 999)}S{random.randint(100, 999)}",
        "source": random.choice(["ecommerce", "pos", "mobile"])
    }
    query = f'''INSERT INTO payments (ID, Date, Gross_Amount, Status, Customer, Swifter_id, External_id, Source)
            VALUES ({i+1}, '{payment["date"]}', {payment["gross_amount"]}, '{payment["status"]}', '{payment["customer"]}', '{payment["swifter_id"]}', '{payment["external_id"]}', '{payment["source"]}');'''
    conn.execute(query)

# commit changes and close connection
conn.commit()
conn.close()
