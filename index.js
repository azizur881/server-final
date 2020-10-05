const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteer:454077aA@cluster0.44y2k.mongodb.net/volunteer?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const group = client.db("volunteer").collection("data");
  console.log('successfully connected');
  app.post('/addVolunteer' ,(req , res)=>{
    const newVolunteer = req.body
    group.insertOne(newVolunteer)
    .then(result=>{
      res.send(result.insertedCount > 0)
    })
    console.log(newVolunteer);
  })
});


app.get('/',  (req, res) => {
    res.send('hello world')
  })
  
  app.listen(5000 ,()=>console.log('listening 5000'))