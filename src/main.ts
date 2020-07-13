// import * as express from 'express';
import * as express from 'express'
// import { Application } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose'


import { usersRouter } from '../routes/users';
import { questionRouter } from '../routes/questions';
import { settingsRouter } from '../routes/settings';

const MONGO_URI = 'mongodb+srv://armen:armen123@cluster0-0mngn.mongodb.net/examapp?retryWrites=true&w=majority'

// without class version //
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conected to MongoDB')
  })
  .catch(() => {
    console.log('Conection failed')
  })

// cors //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
    next()
  })
/////////

app.use('/api/user', usersRouter);
app.use('/api/questions', questionRouter)
app.use('/api/settings', settingsRouter)


app.listen(3000, () => {
    console.log('server started on port 3000')
})
//////////////////////




// with class version //
// class App {
//     public app: Application;

//     constructor() {}

//     createServer() {
//         this.app = express()
//     }

//     appSetUse() {
//         this.app.use(cors());
//         this.app.use(bodyParser.json())
//     }

//     setHeaders() {
//         this.app.use((req, res, next) => {
//             res.setHeader('Access-Control-Allow-Origin', '*')
//             res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//             res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
//             next()
//           })
//     }

//     appRequests() {
//         this.app.use('/users', usersRouter)
//     }

//     startServer() {
//         this.app.listen(3000, () => {
//             console.log('server started on port 3000')
//         })
//     }

//     start() {
//         this.createServer();
//         this.appSetUse();
//         this.setHeaders();
//         this.appRequests()
//         this.startServer();
//     }

// }

// const app = new App()

// app.start()
////////////////////////////
