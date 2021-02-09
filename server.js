const express = require('express');
const routes = require('./controllers');
const sequelize = require('sequelize');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on routes
app.use(routes);

//turn on connecion to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>console.log(`Now listening on ${PORT}`));
})