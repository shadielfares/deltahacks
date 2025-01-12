from rag import ask

question = ('patient is suffering from Dry skin, Itchy skin, Skin rash, Bumps on your skin, '
            'Thick, leathery patches of skin, Flaky, scaly or crusty skin, Swelling. based on your medical knowledge'
            ' and the patient\'s medical history, what is the diagnosis and recommended treatment?')
id = '034e9e3b-2def-4559-bb2a-7850888ae060'

response = ask(prompt=question, patient_id=id)
print(response)