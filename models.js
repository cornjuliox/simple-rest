const sequelize = require('sequelize');

let db = new sequelize('testdb', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'testdb.db'
});

// names, attributes, optionsss
const User = db.define('User', {
    firstName: sequelize.STRING,
    lastName: sequelize.STRING 
});

User.sync()
    .then( () => {
        console.log('Pretty sure this means the table was created.');
    } )
    .catch( err => {
        console.log('Yeah something went wrong: ', err);
    } )

// is this how you do it?
exports.User = User;
