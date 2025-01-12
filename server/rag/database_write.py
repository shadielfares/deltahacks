from rag import vector_store, loadCSV
import os

data_dir = 'data'

for file_name in os.listdir(data_dir):
    file_path = os.path.join(data_dir, file_name)
    if os.path.isfile(file_path):
        loadCSV(file_path)

# if not vector_store._index.describe_index_stats()["total_vector_count"]:
#     print("The vector store is empty.")
# else:
#     print("The vector store is not empty.")

vector_store._index.delete(delete_all=True)
print("All data inside the vector store has been deleted.")