from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newshelf'
    CORS(app)
    return app

app = create_app()
db = SQLAlchemy(app)

class Login(db.Model):
    Username = db.Column(db.String(200), primary_key=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_no = db.Column(db.Integer)

class Item_Details(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(200), nullable=False)
    item_image  = db.Column(db.String(600),nullable = False)
    prod_desc = db.Column(db.String(500))
    owner_uname = db.Column(db.String(200),nullable = False)
    qty = db.Column(db.Integer)

class Request_Details(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_uname = db.Column(db.String(200),nullable = False)
    item = db.Column(db.String(200), nullable=False)
    prod_desc = db.Column(db.String(500))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        """new_login = Login(Username="John", password="xyz", phone_no="9126791417")
        db.session.add(new_login)
        db.session.commit()
        app.run(debug=True)"""
    
@app.route('/login', methods=['POST'])
def authorize_login():
    data = request.get_json()
    uname = data.get("Username")
    pwd = data.get("password")

    u_auth = Login.query.filter_by(Username=uname).first()
    p_auth = Login.query.filter_by(password = pwd).first()

    if u_auth and p_auth:
        return jsonify({'message': "Login Authenticated"})
    else:
        return jsonify({'message': "Login Failed"})
    
@app.route('/create-item', methods=['POST'])
def create_item():
    data = request.get_json()

    new_item = Item_Details(
        item=data.get('item'),
        item_image=data.get('item_image'),
        prod_desc=data.get('prod_desc'),
        owner_uname=data.get('owner_uname'),
        qty = data.get('qty')
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify({'message': "Item created successfully"})

@app.route('/create-item', methods=['PUT'])
def update_phone():
    data = request.get_json()
    owner_uname = data.get('owner_uname')
    phone_no = data.get('phone_no')
    owner = Login.query.filter_by(Username=owner_uname).first()

    owner.phone_no = phone_no
    db.session.commit()
    return jsonify({'message': 'Phone number updated successfully'})

@app.route('/home', methods=['GET'])
def display():
    items = Item_Details.query.all()
    item_list = [{'id': item.id, 'item': item.item, 'item_image': item.item_image, 'prod_desc':item.prod_desc, 'owner_uname':item.owner_uname, 'qty':item.qty} for item in items]
    return jsonify({'items': item_list})

@app.route('/delete-item', methods=['DELETE'])
def delete():
    data = request.get_json()
    item_name = data.get('item')
    item = Item_Details.query.filter_by(item=item_name).first()
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully'})

@app.route('/request-item', methods=['POST'])
def request_item():
    data = request.get_json()
    new_request_item = Request_Details(
        item = data.get('item'),
        prod_desc=data.get('prod_desc'),
        user_uname=data.get('user_uname')
    )

    db.session.add(new_request_item)
    db.session.commit()

    return jsonify({'message': "Request created successfully"})

@app.route('/request-item', methods=['PUT'])
def update_phone_user():
    data = request.get_json()
    user_uname = data.get('user_uname')
    phone_no = data.get('phone_no')
    user = Login.query.filter_by(Username=user_uname).first()

    user.phone_no = phone_no
    db.session.commit()
    return jsonify({'message': 'Phone number updated successfully'})

@app.route('/delete-request', methods=['DELETE'])
def delete_request():
    data = request.get_json()
    item_name = data.get('item')
    item = Request_Details.query.filter_by(item=item_name).first()
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Request deleted successfully'})

@app.route('/get-request-item', methods=['GET'])
def get_request_item():
    requests = Request_Details.query.all()
    request_list = [{'id': request.id, 'uname': request.user_uname, 'item': request.item, 'prod_desc':request.prod_desc} for request in requests]
    return jsonify({'requests': request_list})


if __name__ == "__main__":
    app.run(debug=True)
