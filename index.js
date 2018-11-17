const express = require( `express` );
const mongoose = require( `mongoose` );
const path = require( `path` );

const app = express();
const port = require( `./config/server` ).port;
const configDb = require( `./config/database` );

mongoose.Promise = global.Promise;
mongoose.connect( configDb.uri, { useNewUrlParser: true }, (err) => {
    if(err) {
        console.log( `Could not connect to database: `, err );
    } else {
        console.log( `Connected to database: ` + configDb.db );  
    }
} );

app.use( express.static( path.join( __dirname, `/client/dist` ) ) );

app.get( `*`, (req, res) => {
    res.sendFile( path.join( __dirname, `/client/dist/client/index.html` ) );
} );

app.listen( port, () => {
    console.log( `Server started on port ${port}...` );
} );