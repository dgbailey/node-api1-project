// implement your API here
const express = require('express');
const userRoutes = require('./Controllers/userRoutes');




//configurations
const cors = require('cors');
const port = '8000';
const s = express();

s.use(express.json())//teach the server to read json from the req body  
s.use(cors());
s.use('/users',userRoutes);

/* client side code
fetch('http:localhost:8000/users',{'method':'GET'}).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
*/



s.listen(port, () => console.log(`listening on port ${port}`))



