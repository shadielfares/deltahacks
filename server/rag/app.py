from flask import Flask, request, jsonify
from rag import prompt  # Replace with the actual module name where the `prompt` function is defined

app = Flask(__name__)

@app.route('/api/prompt', methods=['GET'])
def get_prompt_response():
    # Retrieve query parameters
    prompt_text = request.args.get('prompt')
    patient_id = request.args.get('patient_id')

    # Check if required parameters are provided
    if not prompt_text or not patient_id:
        return jsonify({
            "error": "Missing required parameters. 'prompt' and 'patient_id' are required."
        }), 400

    try:
        # Call the prompt function
        response = prompt(prompt_text, patient_id)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({
            "error": "An error occurred while processing the request.",
            "details": str(e)
        }), 500


if __name__ == '__main__':
    # Run the Flask app on localhost and port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)