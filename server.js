const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoSchema = require('./routes/schemaMongo');
const router = express.Router();
const path = require('path');
mongoose.set('useCreateIndex', true);
const pass = "uitest@123";
// mongodb://<dbuser>:<dbpassword>@ds139427.mlab.com:39427/uitest
mongoose.connect("mongodb://uitest:uitest123@ds139427.mlab.com:39427/uitest", { useNewUrlParser: true });


app.use(bodyParser.json());
app.use('/api', router);
app.use(cors());


/**
 * @author : Arul
 * @date : 19/06/19
 * @url : 
 * @desc : get data based on pagination
 * @method : 
 * @body : 
 * @response : 
 */
app.get('/getDataByPage', (req, res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    mongoSchema.find({},{},query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "error": false, "message": data };
        }
        res.json(response);
    });
});
/**
 * @author : Arul
 * @date : 19/06/19
 * @url : 
 * @desc : adding random data in to database
 * @method : 
 * @body : 
 * @response : 
 */
app.get('/add', (req, res) => {
    let a = "Rear Window";
    let b = "Family Pot";
    let c = "The Birds";
    let a1 = "poster2.jpg";
    let b1 = "poster5.jpg";
    let c1 = "poster1.jpg";
    for(let i=0;i<100;i++){
        let name1;
        let name2;
        console.log((i%5),(i%3));
        if(i!=0 && (i%5)==0){
            name1 = b;
            name2 = b1;
        }
        else if(i!=0 && (i%3)==0){
            name1 = a;
            name2 = a1;
        }else{
                name1 = c;
                name2 = c1;
        }
        let newUser = new mongoSchema({
            'name': name1,
            'poster-image': name2
        });
        console.log(i)
        mongoSchema.addUser(newUser, (err, user) => {
            if (err) {
                console.log(err);
                // res.json({ success: false, msg: "failed to register user" });
            } else {
                // res.json({ success: true, msg: "User Rigisterd Successfully" });
                if(i==99){
                    res.json({ success: true, msg: "User Rigisterd Successfully" });
                }
            }
        });
    }

})

/**
 * @author : Arul
 * @date : 19/06/19
 * @url : 
 * @desc : search api ..
 * @method : 
 * @body : 
 * @response : 
 */
app.get('/search', (req, res) => {
    let a = "Rear Window";
    let b = "Family Pot";
    let c = "The Birds";
    let newUser = new mongoSchema({
        'name': "The Birds",
        'poster-image': "poster1.jpg"
    });
    mongoSchema.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "failed to register user" });
        } else {
            res.json({ success: true, msg: "User Rigisterd Successfully" });
        }
    });
})

// app.get('/',(err,data)=>{
//     console.log("came")
// })
//on connection 
mongoose.connection.on('connected', () => {
    console.log('connected to databse ' + "mongodb uitest");
});

//on error
mongoose.connection.on('error', (err) => {
    console.log(' database error' + err);
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(4001, () => {
    console.log("serve started.:-", +"4000")
});
//mongodb://<dbuser>:<dbpassword>@ds139427.mlab.com:39427/uitest