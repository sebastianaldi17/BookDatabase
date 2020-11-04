const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

let books = JSON.parse(fs.readFileSync('db.json'))
let highestID = books[books.length - 1].id

app.use(express.json())

app.post('/', (req, res) => {
    let newBook = req.body
    if(typeof newBook.name == 'undefined' || typeof newBook.author == 'undefined' || newBook.name == '' || newBook.author == '' || Object.keys(newBook).length != 2) {
        res.status(400)
        return res.send('Invalid book object!')
    }
    highestID += 1
    newBook.id = highestID
    books.push(newBook)
    let toSave = JSON.stringify(books, null, 2)
    fs.writeFile('db.json', toSave, (err) => {
        if(err) throw err
    })
    console.log(`Book ${newBook.name} with ID ${newBook.id} has been added.`)
    res.send('Book added to database.')
})

app.get('/', (req, res) => {
    res.send(books)
})

app.put('/:id', (req, res) => {
    let newBook = req.body
    if(typeof newBook.name == 'undefined' || typeof newBook.author == 'undefined' || newBook.name == '' || newBook.author == '' || Object.keys(newBook).length != 2) {
        res.status(400)
        return res.send('Invalid book object')
    }
    let id = parseInt(req.params.id)
    let updatedBook = req.body
    updatedBook.id = id
    let index = books.findIndex(x => x.id === id)
    if(index === -1) {
        res.status(400)
        return res.send("ID not found!")
    }
    books[index] = updatedBook
    let toSave = JSON.stringify(books, null, 2)
    fs.writeFile('db.json', toSave, (err) => {
        if(err) throw err
    })
    console.log(`Book with ID ${id} has been updated.`)
    res.send(`Book with ID ${id} has been updated.`)
})

app.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let index = books.findIndex(x => x.id === id)
    if(index === -1) {
        res.status(400)
        return res.send("ID not found!")
    }
    books = books.filter(x => x.id != id)
    let toSave = JSON.stringify(books, null, 2)
    fs.writeFile('db.json', toSave, (err) => {
        if(err) throw err
    })
    console.log(`Book with ID ${id} has been deleted.`)
    res.send(`Book with ID ${id} has been deleted.`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} \n`)
    console.log('Current books in the database are:')
    books.forEach(book => {
        console.log(`${book.name} by ${book.author} with ID ${book.id}`)
    })
})