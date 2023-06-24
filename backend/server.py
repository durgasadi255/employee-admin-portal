import tornado.ioloop
import tornado.web
import mysql.connector
import decimal
import json

# MySQL database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'durgasadi@123',
    'database': 'employee-db',
}

# Connect to the MySQL database
db_conn = mysql.connector.connect(**db_config)
db_cursor = db_conn.cursor()

# Custom JSON encoder to handle Decimal serialization
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super().default(o)

# Tornado request handlers
class EmployeeHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type')
        self.set_header('Access-Control-Allow-Methods', 'GET, POST, DELETE')

    def options(self, employee_id=None):
        # Respond to preflight requests
        self.set_status(204)
        self.finish()

    def get(self):
        db_cursor.execute('SELECT * FROM employee')
        employees = []
        for (emp_id, emp_name, emp_position) in db_cursor:
            employees.append({
                'EmpId': emp_id,
                'EmpName': emp_name,
                'EmpPosition': emp_position,
            })
        self.write(json.dumps({'employees': employees}, cls=DecimalEncoder))

    def post(self):
        request_data = json.loads(self.request.body)
        emp_id = request_data.get('EmpId')
        emp_name = request_data.get('EmpName')
        emp_position = request_data.get('EmpPosition')
        
        query = 'INSERT INTO employee (EmpId, EmpName, EmpPosition) VALUES (%s, %s, %s)'
        db_cursor.execute(query, (emp_id, emp_name, emp_position))
        db_conn.commit()
        self.write({'message': 'Employee added successfully'})

    def delete(self, employee_id):
        query = 'DELETE FROM employee WHERE EmpId = %s'
        db_cursor.execute(query, (employee_id,))
        db_conn.commit()
        self.write({'message': f'Employee {employee_id} deleted successfully'})

def make_app():
    return tornado.web.Application([
        (r'/api/employees/([0-9]+)', EmployeeHandler),
        (r'/api/employees', EmployeeHandler),
    ])

if __name__ == '__main__':
    app = make_app()
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
