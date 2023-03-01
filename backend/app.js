import express from 'express';
import cors from 'cors';
import './sqlConnect';
import { login,getLoginStatus , logout } from './services/login';
import { signup } from './services/signup';
import { getCustomers , removeCustomer , addCustomer,editCustomer , getIsDeleted , Restore} from './services/customers';


const session = require('express-session');

const app = express();

app.use(session({
    secret: 'my-secret',
    name: 'mySession',
    resave: false,
    saveUninitialized: false,
}));

app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
}));

app.use(express.json());

app.listen(3000, () => {
    console.log('listening on 3000');
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

function authGurd(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.post('/signup', signup);
app.post('/login', login);
app.get('/login', getLoginStatus);
app.get('/logout', logout);
app.get('/customers', authGurd, getCustomers);
app.delete('/DeletCustomer/:id', authGurd, removeCustomer);
app.post('/customer/add', authGurd, addCustomer);
app.post('/editCustomer/edit', authGurd, editCustomer);
app.get('/getIsDeleted', authGurd, getIsDeleted);
app.get('/Restore/:id', authGurd, Restore);
