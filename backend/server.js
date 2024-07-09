const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const dotenv = require('dotenv');
const connectToMongo = require('./db/connectToMongo')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);





app.listen(PORT,()=>{
    connectToMongo();
    console.log(`server up and running ${PORT}`)
});