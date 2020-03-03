var fs = require('fs');
var express = require('express');
var multer = require('multer')

var app = express();
//var upload = multer({ dest: 'upload/' });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        var singfileArray = file.originalname.split('.');
        var fileExtension = singfileArray[singfileArray.length - 1];
        cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
        console.log(file);
    }
})

var upload = multer({
    storage: storage
})

// 文件上传
app.post('/upload', upload.single("logo"), function (req, res, next) {
    res.send({
        "status": "success"
    })
});

app.get('/form', function (req, res, next) {
    var form = fs.readFileSync('./form.html', { encoding: 'utf8' });
    res.send(form);
});

app.listen(3000, () => { console.log("Example app listening on port 3000") });