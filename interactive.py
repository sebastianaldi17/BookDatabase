import requests
import json
print("Performing CRUD operations with python and express.")
print("Please make sure app.js is running (run the command `node app.js`)\n")
print("1: GET (get a list of existing books)")
print("2: POST (add a new book to the library)")
print("3: PUT (update existing book)")
print("4: DELETE (delete a book from the library)\n")
protocol, id, name, author = '', '', '', ''
while protocol.isdigit() == False:
    protocol = input("Send which HTTP request? ")
protocol = int(protocol)
if protocol == 1:
    books = requests.get("http://localhost:3000").json()
    print("\nThe current books in the database are:")
    for book in books:
        print("{} by {}, with ID {}".format(book["name"], book["author"], book["id"]))
elif protocol == 2:
    while name == '':
        name = input("\nEnter book title: ")
    while author == '':
        author = input("Enter book author: ")
    book = {
        "name": name,
        "author": author
    }
    res = requests.post("http://localhost:3000", json=book)
    print("Request returned code", res.status_code)
elif protocol == 3:
    while id == '':
        id = input("\nEnter book ID to update: ")
    while name == '':
        name = input("Enter book title: ")
    while author == '':
        author = input("Enter book author: ")
    book = {
        "name": name,
        "author": author
    }
    res = requests.put("http://localhost:3000/" + id, json=book)
    print("Request returned code", res.status_code)
elif protocol == 4:
    while id == '':
        id = input("\nEnter book ID to delete: ")
    res = requests.delete("http://localhost:3000/" + id)
    print("Request returned code", res.status_code)
else:
    print("Invalid number, terminating program.")
