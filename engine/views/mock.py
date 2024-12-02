import json
from flask import jsonify
from views import app_views


@app_views.route('/questions', methods=['GET'])
def get_questions() -> jsonify:
    """
    Reads questions from questions.json and returns them as a JSON response.
    """
    try:
        with open('questions.json', 'r') as f:
            questions = json.load(f)  # Load the json file into a python list

            return jsonify(questions)
    except FileNotFoundError:
        return jsonify({"error": "questions.json not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error decoding questions.json"}), 500
