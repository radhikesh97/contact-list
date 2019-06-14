const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));  
//Middleware1
/*app.use(function(req,res,next){
    req.myName = "Radhikesh";
    //console.log("Middleware 1");
    next();
});

//Middleware2
app.use(function(req,res,next){
    console.log("From  middleware 2:",req.myName);
    //console.log("Middleware 2");
    next();
});*/

var contactList = [
    {
        name : "radhikesh",
        phone : "7985535247"
    },
    {
        name: "sunil",
        phone: "9044376474"
    },
    {
        name: "prabha",
        phone: "9044376474"
    }
]

app.get('/',function(req,res){
    //console.log("From route:",req.myName);
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in finding contacts");
            return;
        }
        return res.render('home',{
            title: 'Hello!!',
            contact_list: contacts
        });
    });


    /*return res.render('home', {
        title: 'Hello!!',
        contact_list: contactList
    });*/

    // res.send('<h1>Yup!</h1>');
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: 'Practice with EJS!'
    });
});

app.post('/create-contact',function(req,res){
    
    //console.log(req.body);
    
    
    
    //contactList.push(req.body);
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating contact!");
            return;
        }
        console.log("*******",newContact);
        return res.redirect('back');
    });

    
    //return res.redirect('back');
    //return res.redirect('/practice');
});

//for deleting a contact

app.get('/delete-contact', function(req,res){
    console.log(req.query);
    //get query from url
    // let phone = req.query.phone;

    //get id
    let id = req.query.id;

    // using this id delete entry from database

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            cocnsole.log("Error in deleting");
            return;
        }
        return res.redirect('back');
    });

    /*let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex !=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');*/
});

app.listen(port, function(err){ 
    if(err){
        console.log('Error!',err);
    }
    console.log("Express server up and running on port: ",port);
});