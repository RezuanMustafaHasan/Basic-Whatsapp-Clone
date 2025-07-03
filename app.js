const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./models/listing');
const path = require('path');

/* For live update */
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// Create a LiveReload server
const liveReloadServer = livereload.createServer();

// Watch for changes in these directories
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.watch(path.join(__dirname, 'public'));

// Ping the browser when the server starts
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
    liveReloadServer.refresh("/listings/new");
    liveReloadServer.refresh("/listings");
    liveReloadServer.refresh("/listings/:id");
    liveReloadServer.refresh("/listings/:id/edit");
  }, 100);
});

// Inject LiveReload script into the page
app.use(connectLiveReload());
/*Live Update code ends here */

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch(err=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
    res.send('Hi, I am root');
});

app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs',{allListings});
});

app.get('/listings/new', (req, res) => { //This should be written before the /listings/:id route
    console.log("New Listing Page");
    res.render('listings/new.ejs');
});


app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
});

app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.image.url = req.body.listing.image;
    newListing.image.filename = req.body.listing.title;
    await newListing.save();
    res.redirect('/listings');
});

app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
});

app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    req.body.listing.image = {
        url: req.body.listing.image,
        filename: req.body.listing.title
    };
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
