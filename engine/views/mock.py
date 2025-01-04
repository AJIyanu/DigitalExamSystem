import random
import json
from datetime import datetime
from uuid import uuid4
from flask import request
from flask import jsonify
from views import app_views


@app_views.route('/questions', methods=['GET'])
def get_questions() -> jsonify:
    """
    Reads questions from questions.json and returns them as a JSON response.
    """
    try:
        with open('questions.json', 'r') as f:
            questions = json.load(f)
            for question in questions:
                question['options'].append(question['answer'])
            response = {
                "questionId": str(uuid4),
                "allQuestions": questions,
                "startTime": str(datetime.now),
                "endTime": "0489450",
                "subject": "Nursing",
                "academicClass": "anonymous"
            }

            return jsonify(response)
    except FileNotFoundError:
        return jsonify({"error": "questions.json not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding questions.json"}), 500


@app_views.route('/scheduledexams', methods=['GET'])
def get_scheduled_exams() -> jsonify:
    """
    Reads scheduled exams from scheduledexams.json and returns them as a JSON response.
    """
    try:
        with open('scheduledexams.json', 'r') as f:
            scheduled_exams = json.load(f)

            return jsonify(scheduled_exams)
    except FileNotFoundError:
        return jsonify({"error": "scheduledexams.json not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding scheduledexams.json"}), 500

@app_views.route('/users', methods=['GET', 'POST'])
def create_get_users() -> jsonify:
    """POST method creates a new user and returns userID

       GET method returns all users
    """
    if request.method == "GET":
        if 'userName' in request.args:
            try:
                with open('users.json', 'r') as f:
                    users = json.load(f)
                    for user in users:
                        if user['userName'] == request.args['userName']:
                            return jsonify(user)
                    return jsonify({'error': 'user does not exist'}), 404
            except FileNotFoundError:
                return jsonify({'error': 'users.json not found'}), 404
            except json.JSONDecodeError:
                return jsonify({'error': 'file decode error'}), 500
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
                return jsonify(users)
        except FileNotFoundError:
            return jsonify({"error": "no users found"})
        except json.JSONDecodeError:
            return jsonify({'error': "file decode error"})
    elif request.method == "POST":
        try:
            with open('users.json', 'r+') as f:
                try:
                    users = json.load(f)
                except json.JSONDecodeError:
                    users = []
                new_user = request.get_json()
                for user in users:
                    if new_user.get('userName') == user.get('userName'):
                        return jsonify({'error': 'username must be unique'})
                # from uuid import uuid4
                user_id = uuid4()
                new_user['userId'] = str(user_id)
                new_user['profilePicture'] = f'https://randomuser.me/api/portraits/men/{random.randint(0, 200)}.jpg'
                new_user['examHistory'] = []
                users.append(new_user)
                f.seek(0)
                json.dump(users, f, indent=4)
                f.truncate()
                return jsonify({'userId': str(user_id), 'userName': new_user.get('userName')})
        except FileNotFoundError:
            with open('users.json', 'w') as f:
                new_user = request.get_json()
                # from uuid import uuid4
                user_id = uuid4()
                new_user['userId'] = str(user_id)
                json.dump([new_user], f, indent=4)
                return jsonify({'userId': str(user_id)})
        except json.JSONDecodeError:
            return jsonify({'error': "file decode error"}), 500
    
@app_views.route('/users/<id>', methods=['GET', 'PUT'])
def get_update_user(id):
    if request.method == "GET":
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
                for user in users:
                    if user['userId'] == id or user['userName'] == id:
                        return jsonify(user)
                return jsonify({'error': 'user does not exist'}), 404
        except FileNotFoundError:
            return jsonify({'error': 'users.json not found'}), 404
        except json.JSONDecodeError:
            return jsonify({'error': 'file decode error'}), 500
    elif request.method == "PUT":
        try:
            with open('users.json', 'r+') as f:
                users = json.load(f)
                for user in users:
                    if user['userId'] == id:
                        update = request.get_json()
                        for key, value in update.items():
                            if key != 'userName':
                                user[key] = value
                        f.seek(0)
                        json.dump(users, f, indent=4)
                        f.truncate()
                        return jsonify({'message': f'user {id} has been updated with {update}'})
                return jsonify({'error': 'user does not exist'}), 404
        except FileNotFoundError:
            return jsonify({'error': 'users.json not found'}), 404
        except json.JSONDecodeError:
            return jsonify({'error': 'file decode error'}), 500
