import dotenv from 'dotenv';

dotenv.config()

export default { 
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI
}
