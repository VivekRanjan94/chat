const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const session = require('express-session')
const app = express()
const User = require('./user')
const http = require('http')

const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

// var MongoStore = require('connect-mongo')(session)
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  'mongodb+srv://vivekranjan:z&c$YXFpEqGp5M8q@cluster0.23ysu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Mongoose Is Connected')
  }
)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  })
)
app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
app.use(cookieParser('secretcode'))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.send('No User Exists')
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send(user)
        // console.log(req.user)
      })
    }
  })(req, res, next)
})
app.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err
    if (doc) res.send('User Already Exists')
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      })
      await newUser.save()
      res.send(newUser)
    }
  })
})
app.get('/user', (req, res) => {
  User.findOne({ _id: req.query.id }, (err, user) => {
    if (err) {
      throw err
    }
    res.status(200).send(user)
  })
  // The req.user stores the entire user that has been authenticated inside of it.
})
//----------------------------------------- END OF ROUTES---------------------------------------------------

io.on('connection', (socket) => {
  const id = socket.handshake.query.id

  socket.join(id)
})

//Start Server
server.listen(5000, () => {
  console.log('Server Has Started on port 5000...')
})
