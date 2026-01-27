import express from 'express';
import userRoutes from './routes/user-routes.js';


const app: express.Application = express();
const port: number = 3000;

app.use(express.json())


// app.METHOD(PATH, HANDLER)
app.get('/', (uno, _res) => {
    // TODO: code
    _res.send('Hello World!');
})

interface LoginModel {
    email: string;
    password: string;
    name: string;
}

// Query params example
app.post('/login', (_req, _res) => {
    let email: any = _req.query.email;
    let password: any = _req.query.password;
    console.log(email);
    console.log(password);

    _res.send(`Received email ${email} and password ${password}`);
})

// Body example
app.post('/v2/login', (_req, _res) => {
    let body: LoginModel = _req.body;

    let email: string = body['email'];
    let password: string = body['password'];
    let name: string = body['name'];

    _res.send(`Received email ${email} and password ${password}, my name is ${name}`);
})

// Path params example
app.get('/name/:example', (_req, _res) => {
    console.log(_req.params);
    _res.send(`Hi my name is ${_req.params.example}`);
})

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})