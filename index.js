const express = require('express');
const app = express();

//mongodb+srv://<username>:<password>@aliwate.cuziqf3.mongodb.net/?retryWrites=true&w=majority&appName=aliwate
//username: ustp
//pass: user1234
mongoose.connect('mongodb+srv://<username>:<password>@aliwate.cuziqf3.mongodb.net/?retryWrites=true&w=majority&appName=aliwate').
then(()=>{
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});


// const employ = {
//     employee: [
//         {id: 1, name: 'Alejandro'},
//         {id: 2, name: 'Martin'},
//         {id: 3, name: 'Denis'},
//         {id: 4, name: 'Castro'}
//         ]};

const EmployeeRoute = require('./Routes/Employee.route');
app.use(('/employee'), EmployeeRoute);

const UserRoute =require( './Routes/Users.route')  ;
app.use(( '/user' ), UserRoute)

//Error if wrong endpoint
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Middleware Express Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
