const { User } = require('../models');

const userData = [
 {
     username: 'User1',
     email: 'user1@mail.com',
     password: 'password'
 },
 {
    username: 'User2',
    email: 'user2@mail.com',
    password: 'password'
 },
 {
    username: 'User3',
    email: 'user3@mail.com',
    password: 'password'
 }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
