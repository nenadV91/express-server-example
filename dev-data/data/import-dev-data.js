require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection succesfull!'));

// Read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfully loaded!');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

// Delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data succesfull deleted!');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
