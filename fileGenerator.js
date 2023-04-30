import json2xls from 'json2xls'
import fs from 'fs'
import User from './model/user.js'

export const generateFile = async () => {
  console.log('generating file')
  // insert a user into the database
  // const user = new User({ name: 'John', email: 'r@a.com' })
  // await user.save()
  const users = await User.find({})
  console.log(users)
  // generate excel file and store it in the root directory
  // map the users array to an array of objects with only the name and email properties
  const usersWithOnlyNameAndEmail = users.map(user => {
    return {
      name: user.name,
      email: user.email
    }
  })
  // convert the array of objects to an excel file and store it in the root directory
  // the file will be named 'users.xlsx'
  // the file will have two columns: name and email
  const xls = await json2xls(usersWithOnlyNameAndEmail)
  fs.writeFileSync('users.xlsx', xls, 'binary')
  console.log('file generated')
}
