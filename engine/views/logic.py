import json
from uuid import uuid4
from datetime import datetime, timedelta

def fetch_questions(subj):
    '''opens the json question and return a dictionary'''
    try:
        with open(f'{subj}.json', 'r') as f:
            questions = json.load(f)
            for question in questions:
                question['options'].append(question['answer'])
            questions_id = str(uuid4())
            start_time = str(datetime.now().timestamp())
            end_time = str((datetime.now() + timedelta(minutes=10)).timestamp() * 1000)
            response = {
                "questionId": questions_id,
                "allQuestions": questions,
                "startTime": start_time,
                "endTime": end_time,
                "subject": "Nursing",
                "academicClass": "anonymous"
            }
            return response
    except FileNotFoundError:
        return {"error": "questions.json not found"}
    except json.JSONDecodeError:
        return {"error": "Error decoding questions.json"}
    

def calc_score(exam_data=[]):
    """returns the scrore from exam data"""
    score = 0
    for question in exam_data:
        try:
            if question['selectedOption'] == question['answer']:
                score += 1
        except Exception:
            pass
    return f"{str(score)} of {len(exam_data)}"