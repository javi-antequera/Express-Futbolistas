'use strict';


let express = require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser'),
    app = express();

    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    
    require('dotenv').config();
    let port=process.env.PORT||3000;
    
    app.use(express.static(__dirname+'/public/'));
    app.set('view engine', 'ejs')
    app.set('views', __dirname+'/views/')

app.use('/', require('./01rutas/router/futbolista'));

app
    .use((req,res) => {
        res.status(404).render('404', {
            titulo: 'Error 404',
            descripcion: 'Page Not Found'
        })
    })

    .listen(port)

console.log('Iniciando Express en el puerto 4000')

const uri=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tzpk8sl.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    {useNewUrlParser:true,useUnifiedTopology:true}
)
    .then(()=>console.log('Base de datos conectada'))
    .catch(e=>console.log(e))