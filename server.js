const express = require ('express'),
    app = express()
    entries = []

    // const middleware_post = ( req, res, next ) => {
    //     let dataString = ''
      
    //     req.on( 'data', function( data ) {
    //       dataString += data 
    //     })
    //     req.on( 'end', function() {
    //       const json = JSON.parse( dataString )
    //       entries.push( json )
      
    //       // add a 'json' field to our request object
    //       // this field will be available in any additional
    //       // routes or middleware.
    //       req.json = JSON.stringify( entries )
      
    //       // advance to next middleware or route
    //       next()
    //     })
    //   }
const logger = (req,res,next) => {
    console.log('url:', req.url)
    next()
}
app.use(logger)
app.use(express.static('public'))
app.use(express.json())
// app.post('/submit', middleware_post)

app.post('/submit', (req, res) => {
    entries.push(req.body)
    console.log(req.body)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(entries))
})
app.listen(process.env.PORT || 3000)