let express = require('express');
let app = express();
let port = process.env.port || 3001;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alamshahana13:admin@cluster0.bc1euoc.mongodb.net/?retryWrites=true&w=majority";
let collection;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('routes'));


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        collection = client.db().collection('Cat');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

function insertCat(cat, callback) {
    collection.insertOne(cat, callback);
}

function getAllCats(callback) {
    collection.find({}).toArray(callback);
}

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/api/cat', (req, res) => {
    let cat = req.body;
    console.log(cat);
    insertCat(cat, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' });
        }
    });
});

app.get('/api/cats', (req, res) => {
    getAllCats((err, result) => {
        console.log(result);
        if (!err)
            res.json({ statusCode: 200, data: result, message: 'success' })
        else
            res.json({ error: err })
    });
});

app.listen(port, () => {
    console.log('express server started');
    runDB().catch(console.dir);
});