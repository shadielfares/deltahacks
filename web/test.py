def test_query():
    query = "example query"
    result = query_data(query)
    print(result)

def query_data(query):
    # ...existing code or logic to process the query...
    return {"result": "This is a mock result for the query: " + query}

if __name__ == '__main__':
    test_query()
