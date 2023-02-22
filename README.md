# Flask and ag-Grid Transaction App

This is a simple Flask application that displays transaction information using ag-Grid.

  

## Getting Started

### Prerequisites

 - Python 3.6 or later
 - Flask
 - Sqlite3
 - ag-Grid Community Edition

### Installation

 - Clone the repository
  - Install the dependencies by running `pip install -r requirements.txt`
  - Run the Flask app by running `flask run`
  - Open a web browser and go to http://localhost:5000

### Features
 - Display transaction information in a table using ag-Grid
 - Use of ag-Grid features like sorting, filtering, and pagination
 
### File Structure 
- `app.py` - Flask application code
- `templates/index.html` - HTML template file
- `static/js/main.js` - JavaScript file for ag-Grid configuration and customization
- `data/payments.db` - SQLite database file containing transaction data