//lib
const express = require('express')
const links = require('./links')
const cors = require('cors')

//const
const app = express();
const port = 3001;

app.use(cors())
links.links(app);

app.listen(port, () => {
    console.log(`Port ${port} is open`)
})