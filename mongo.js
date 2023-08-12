const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const url =
  //   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
  `mongodb+srv://keatonyoputra:${password}@cluster0.604j94n.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})
const Person = mongoose.model("Person", personSchema)

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const inputName = process.argv[3]
  const inputNumber = process.argv[4]
  const person = new Person({
    name: inputName,
    number: inputNumber,
    // id: Math.floor(Math.random() * 100000) + 1,
  })

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
