import express from 'express';
import userRoutes from './routes/user-routes.js';
import config from './config/config.js';
import type { Request, Response, NextFunction } from 'express';


const app: express.Application = express();
const port: number = config.port;

app.use(express.json())

app.use((_req, _res, _next) => {
    console.log(`Time ${Date.now()}!`);
    console.log('Hello from the app level middleware');
    _next();
}, 
(_req, _res, _next) => {
    console.log(`Hola! desde el segundo middleware ${Date.now()}!`);
    _next();
}
);


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


// Error Middleware
app.use((_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
    console.error(_err.stack);
    _res.status(500).send(_err.message);
});


app.listen(port, () => {
    console.log(config.dbUserName);
    console.log(config.dbPassword);
    console.log(`Example app listening on port ${port}`);
})