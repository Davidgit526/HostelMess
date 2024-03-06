const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trail';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    Hostel.find({})
      .then(hostels => {
        console.log('Hostel:', hostels);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
    });

    
const hostelSchema = new mongoose.Schema({
  name: String,
  branch: String,
  month: String,
  int: Number,
  year: String,
});

const Hostel = mongoose.model('Hostel', hostelSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const { name, branch, year, month, amount } = req.body;

  const newHostel = new Hostel({
    name,
    branch,
    month,
    amount,
    year,
  });

  newHostel.save()
    .then((savedHostel) => {
      console.log('Data saved:', savedHostel);
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Hostel Mess Application</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background: url('https://th.bing.com/th/id/OIP.rSwMsgCAMv0VVtlZQsU3FQAAAA?rs=1&pid=ImgDetMain');
                background-size: cover;
                display: flex; 
                align-items: center;
                justify-content: center;
                height: 100vh;
              }

              .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              h1 {
                color: #1e88e5;
              }

              .info-box {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 15px;
                margin-top: 20px;
              }

              .info-box p {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank you for providing your information</h1>
              <div class="info-box">
                <p><strong>Student Name:</strong> ${name}</p>
                <p><strong>Branch:</strong> ${branch}</p>
                <p><strong>Year:</strong> ${year}</p>
                <p><strong>Month:</strong> ${month}</p>
                <p><strong>Mess Ammount:</strong> ${amount}</p>
            </div>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Hostel Mess Application listening on port ${PORT}`);
}); 