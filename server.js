const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
const app = express();
const port=3000;
mongoose.connect('mongodb://localhost:27017/coderone_feedback',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('mongoDb connected'))
.catch((err)=>console.log(err));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('views'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});
app.post('/submit-feedback',async(req,res)=>
{
    const feedback=new Feedback({
        name:req.body.name,
        contactNumber:req.body.contactNumber,
        email:req.body.email,
        feedback:req.body.feedback
    });
    try{
        await feedback.save();
        console.log('feedback is save successfully');
        res.send(`
            <html>
                <head>
                    <title>feedback submitted</title>
                </head>
                <body>
                    <h1>Thank You</h1>
                    <p>Your feedback has been submitted successfully</p>
                    <a href="/">Go back to form</a>
                </body>
            </html>
        `);
    }
    catch(err){
        console.log('error saving feedback',err);
        res.status(500).send('there was an error in submitting ypou feedback');
    }
});
app.listen(port,()=>
{
    console.log(`server is running on http://localhost:${port}`);

});


