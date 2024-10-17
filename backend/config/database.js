const mongoose = require('mongoose');

const connectDatabase = () => {
    const localDB = 'mongodb://localhost:27017/instagram'; // Replace 'your_database_name' with the actual name of your database

    mongoose.connect(localDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose Connected to Local Database");
    }).catch((error) => {
        console.error("Database connection error: ", error);
    });
}

module.exports = connectDatabase;
