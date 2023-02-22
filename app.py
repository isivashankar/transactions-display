from flask import Flask, render_template,g,  redirect, jsonify, request
import sqlite3

app = Flask(__name__)
DATABASE = 'payments.db'

# Create a connection to the database
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/transactions', methods=[ 'GET'])
def get_transactions():
    db = get_db()
    cursor = db.execute('SELECT date,gross_amount,status, customer, swifter_id, external_id, source  FROM payments')
    transactions = [{'date': row[0], 'gross_amount': row[1], 'status': row[2], 'customer': row[3], 'swifter_id': row[4], 'external_id': row[5], 'source': row[6]} for row in cursor.fetchall()]
    return jsonify(transactions)

if __name__ == "__main__":
    app.run(debug=True)