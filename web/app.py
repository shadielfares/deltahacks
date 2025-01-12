from flask import Flask, request, jsonify
import rag

app = Flask(__name__)

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query')
    if not query_text:
        return jsonify({'error': 'No query provided'}), 400

    result = rag.query_data(query_text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
