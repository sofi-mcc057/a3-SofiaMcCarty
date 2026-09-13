require( 'dotenv' ).config()

const express = require("express"),
      { MongoClient, ObjectId } = require("mongodb"),
      app = express()

app.use( express.static( "public" ) )
app.use( express.json() )

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.HOST}`


console.log( 'uri:', uri )
const client = new MongoClient( uri )

let collection = null

async function run() {
    console.log("before connect")
  await client.connect()
  console.log("after connect")
  collection = await client.db("admin").collection("test")

  // route to get all docs
  app.get("/docs", async (req, res) => {
    if (collection !== null) {
      const docs = await collection.find({}).toArray()
      res.json( docs )
    }
  })
}

app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
  })

app.post( '/submit', async (req,res) => {
  console.log(req.body)
    const result = await collection.insertOne( req.body )
    res.json( result )

})


app.listen(3000)