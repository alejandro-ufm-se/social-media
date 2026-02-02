import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    dbUserName: string;
    dbPassword: string;
}

const config : Config = {
    port : Number(process.env.PORT) || 3000,
    dbUserName : process.env.DB_NAME || 'admin',
    dbPassword : process.env.DB_PASSWORD || 'admin'
};

export default config;