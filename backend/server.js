require('dotenv').config();
const path= require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

mongoose
	.connect(process.env.MongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {})
	.catch((err) => console.log(err));


const port = process.env.PORT || 8080;


app.listen(port,()=>console.log(`Server started at ${port}`));
app.use('/api/posts',require('./routes/post'));
app.use('/api/signin',require('./routes/signin'));
app.use('/api/signup',require('./routes/signup'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/admin',require('./routes/admin'))

app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

// app.use(express.static(__dirname + '/public/'));


// app.use('/api/signup', require('./routes/register'));
// app.use('/api/signin', require('./routes/login'));
// app.use('/api/user', require('./routes/user'));
// app.use('/api/posts', require('./routes/post'));

// app.use('/api/admin', require('./routes/admin'));
