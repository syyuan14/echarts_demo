var fs = require('fs');
var path = require("path");
var express = require('express');
var multer = require('multer');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var { readFile1, readFile2 } = require("./utils/readFile");
var {postData} = require("./utils/postData");



var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

//app.set('view cache', true);



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        //console.log(req.body.date);
        //date = req.body.date;
        //console.log(req)
        
        var singfileArray = file.originalname.split('.');
        var fileExtension = singfileArray[singfileArray.length - 1];



        cb(null, singfileArray[0] + '-' + date + "." + fileExtension);

        //console.log(file);

    }
})

var upload = multer({
    storage: storage
})

// 文件上传
app.post('/upload', upload.single("logo"), function (req, res, next) {
    //console.log(req.file.path);
    //console.log(readFile1(req.file.path))
    postData(req.file.path) //向后台发送数据
    
    res.send({
        "status": "上传成功"
    });

});
// 表单页面
app.get('/index', function (req, res, next) {
    
    //获取传进的日期
    date = req.query.date || "2020-11-01";
    //读取upload 文件夹下的所有上传文件
    const dirInfo = fs.readdirSync("./upload/").filter((item)=>item.endsWith(`${date}.xlsx`));
    let data = {
        files: dirInfo,
        date
    }
    //console.log(data)
    //res.send({"s":"dvs"})
    
    res.render("form.ejs", data);
});

//获取上传文件列表
app.get('/file', function (req, res, next) {

    //读取upload文件下上传的文件
    const dirInfo = fs.readdirSync("./upload/").filter((item)=>item.endsWith("xlsx"));
    //console.log(dirInfo)
    let pageNum = 5
    let pageSum = Math.ceil(dirInfo.length / pageNum);

    let pageIndex = Math.floor((req.query.pageIndex || 1));
    
    let list = dirInfo.slice((pageIndex - 1) * pageNum, pageIndex * pageNum);
    var data = {
        files: list,
        pageIndex,
        pageSum,
    }
    res.render("filelist.ejs", data);
});

//下载页面
app.get('/download', function (req, res) {
    // var file = './upload/0-2020-03-09.jpg';
    //console.log(req.query.name)

    let fileName = req.query.name;
    let filePath = `./upload/${fileName}`;

    console.log(filePath)
    fs.exists(filePath, function (exists) {
        if (exists) {
            console.log("文件存在")
            res.download(filePath);
            // res.send({
            //     "status": "下载成功"
            // })
            
        }
        if (!exists) {
            res.send({
                "status": "文件不存在"
            })
            console.log("文件不存在")
        }
    })


});

app.listen(3000, () => { console.log("Example app listening on port 3000") });