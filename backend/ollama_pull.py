import ollama

def pull_model(model_name):
    client = ollama.Client()
    client.pull(model_name)

if __name__ == "__main__":
    pull_model("llama3.2")