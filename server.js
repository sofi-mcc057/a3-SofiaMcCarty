// const http = require( 'http' ),
//       fs   = require( 'fs' ),
//       // IMPORTANT: you must run `npm install` in the directory for this assignment
//       // to install the mime library if you're testing this on your local machine.
//       // On Render, make sure `npm install` is your build command.
//       mime = require( 'mime' ),
//       dir  = 'public/',
//       port = 3000

// const appdata = [
//   // { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
//   // { 'model': 'honda', 'year': 2004, 'mpg': 30 },
//   // { 'model': 'ford', 'year': 1987, 'mpg': 14} 
// ]

// const server = http.createServer( function( request,response ) {
//   if( request.method === 'GET' ) {
//     handleGet( request, response )    
//   }else if( request.method === 'POST' ){
//     handlePost( request, response ) 
//   } else if (request.method === 'DELETE'){
//     handleDelete(request, response)
//   }
// })

// const handleGet = function( request, response ) {
//   const filename = dir + request.url.slice( 1 ) 

//   if( request.url === '/' ) {
//     sendFile( response, 'public/index.html' )
//   }else{
//     sendFile( response, filename )
//   }
// }

// const handlePost = function( request, response ) {
//   let dataString = ''

//   request.on( 'data', function( data ) {
//       dataString += data 
//   })

//   request.on( 'end', function() {
//     let object = ( JSON.parse( dataString ) )
//     if (object.gradeletter == "a"){
//       object.GPA = 4.0
//     } else if (object.gradeletter == "b"){
//       object.GPA = 3.0
//     } else if (object.gradeletter == "c"){
//       object.GPA = 2.0
//     } else if (object.gradeletter == 'd'){
//       object.GPA = 1.0
//     }
//     object.id = Date.now()
//     appdata.push(object)
//     response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })

//     response.end(JSON.stringify(appdata))
//   })
// }

// const handleDelete = function (request, response){
//   const itemid = request.url.slice(1)
//   const idNum = parseInt( itemid, 10)
//   const index = appdata.findIndex (item => item.id === idNum)
//   if (index !== -1){
//     appdata.splice(index, 1)
//     response.writeHead(200, {'Content-Type': 'text/plain '})
//     response.end( JSON.stringify(appdata))
//   }
  
// }

// const sendFile = function( response, filename ) {
//    const type = mime.getType( filename ) 

//    fs.readFile( filename, function( err, content ) {

//      // if the error = null, then we've loaded the file successfully
//      if( err === null ) {

//        // status code: https://httpstatuses.com
//        response.writeHeader( 200, { 'Content-Type': type })
//        response.end( content )

//      }else{

//        // file not found, error code 404
//        response.writeHeader( 404 )
//        response.end( '404 Error: File Not Found' )

//      }
//    })
// }

// server.listen( process.env.PORT || port )
const express = require ('express'),
    app = express()
    data = []

const logger = (req,res,next) => {
    console.log('url:', req.url)
    next()
}
app.use(logger)
// app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')))

app.use(express.static('public'))

app.post('/submit', (req, res) => {
    data.push(req.body.newData)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(data))
})
app.listen(process.env.PORT || 3000)