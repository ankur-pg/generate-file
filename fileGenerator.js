import json2xls from 'json2xls'
import fs from 'fs'
import User from './model/user.js'
import Excel from 'exceljs'

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

const mergeData = async () => {
  // Retrieve data from each schema
  const data1 = await Schema1.find().lean()
  const data2 = await Schema2.find().lean()
  const data3 = await Schema3.find().lean()

  // Combine the data into a single array
  const combinedData = [...data1, ...data2, ...data3]

  // Create a new workbook
  const workbook = new Excel.Workbook()

  // Add a new worksheet
  const worksheet = workbook.addWorksheet('My Data')

  // Write the data to the worksheet
  worksheet.addRows(combinedData)

  // Save the workbook
  await workbook.xlsx.writeFile('output.xlsx')
}

const mergeData_v2 = async () => {
  // Retrieve data from each schema
  const data1 = await Schema1.find().lean()
  const data2 = await Schema2.find().lean()
  const data3 = await Schema3.find().lean()

  // Combine the data into a single array of objects
  const combinedData = []
  for (let i = 0; i < data1.length; i++) {
    const row = { ...data1[i] }
    Object.assign(row, data2[i], data3[i])
    combinedData.push(row)
  }

  // Create a new workbook
  const workbook = new Excel.Workbook()

  // Add a new worksheet
  const worksheet = workbook.addWorksheet('My Data')

  // Write the headers to the worksheet
  worksheet.addRow(['Field A', 'Field B', 'Field C', 'Field D1', 'Field D2', 'Field D3'])

  // Write the data to the worksheet
  combinedData.forEach(row => {
    worksheet.addRow([row.fieldA, row.fieldB, row.fieldC, row.fieldD1, row.fieldD2, row.fieldD3])
  })

  // Save the workbook
  await workbook.xlsx.writeFile('output.xlsx')
}