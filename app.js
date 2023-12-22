const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

const staticpath = path.join(__dirname, "./public");
app.use(express.static(staticpath));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', { activePage: 'home' })
})
app.get('/latest_news', (req, res) => {
    res.render('latest_news', { activePage: 'latest_news' })
})
app.get('/all_blog', (req, res) => {
    res.render('all_blog', { activePage: 'all_blog' })
})
app.get('/contact', (req, res) => {
    res.render('contact', { activePage: 'contact' })
})
app.get('/login', (req, res) => {
    res.render('login', { activePage: 'login' })
})
app.get('/register', (req, res) => {
    res.render('register', { activePage: 'register' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
