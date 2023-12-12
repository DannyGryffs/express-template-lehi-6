import express from "express";
import nunjucks from "nunjucks"
import lodash from "lodash"


const app = express();

const COMPLIMENTS = [
    'awesome',
    'terrific',
    'fantastic',
    'neato',
    'fantabulous',
    'wowza',
    'brilliant',
    'ducky',
    'coolio',
    'incredible',
    'wonderful',
    'smashing',
    'lovely',
  ];


  app.use(express.urlencoded({extended: false}));
  nunjucks.configure("views", {
    autoescape: true,
    express: app
  })

  //DATA
  
  app.get('/hello', (req, res) => {
      res.send('Hello!');
    });
    
    //Need Endpoint for this \/
    app.get('/users/:username', (req, res) => {
      res.send(`Info page for user ${req.params.username}`);
    })

    app.post('/fav-number', (req, res) => {
      const favNumber = req.body.favNumber;
      console.log('Saving favorite number to the database...');
      res.send(`Your favorite number is ${favNumber}.`);
    });

  //TEMPLATES



  app.get("/", (req, res) => {
    res.render("home.html");
  });

  app.get("/form", (req, res) => {
    res.render("form.html");
  });

  app.get("/welcome", (req, res) => {
    const person = req.query.person;
    res.render("welcome.html.njk", { person })
  })


  app.get('/number-form', (req, res) => {
    res.render("number-form.html");
  });

  app.get('/template-demo', (req, res) => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    res.render('template-demo.html', {
      date: formattedDate,
    });
  });

  app.get('/greet', (req, res) => {
    const person = req.query.person;
    const randomCompliments = lodash.sampleSize(COMPLIMENTS, 3);
  
    res.render('greet.html.njk', {
      name: person,
      compliments: wantsCompliments? randomCompliments: []
    });
  });

  app.get("base", (req, res) => {
    res.render("base.html.njk");
  });

  app.get("inherit", (req, res) => {
    res.render("inherit.html.njk");
  });


app.listen(8000, () => console.log("Server cruising on port 8000!"));