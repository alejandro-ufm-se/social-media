import express from 'express';


const app: express.Application = express();
const port: number = 3000;


// app.METHOD(PATH, HANDLER)
app.get('/', (_req, _res) => {
    // TODO: code
    _res.send('Hello World!');
})

app.post('/login', (_req, _res) => {
    let email: any = _req.query.email;
    let password: any = _req.query.password;
    console.log(email);
    console.log(password);

    _res.send(`Received email ${email} and password ${password}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})