import ollama

def query_model(model_name, query):
    client = ollama.Client()
    response = client.chat(model=model_name, messages=[{'role': 'user', 'content': query}])
    return response['message']['content']