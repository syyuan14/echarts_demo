const fetch = require('node-fetch');
let { readFile1, readFile2 } = require('./readFile');
var path = require("path");
var fs = require("fs");


var options = {
    url: 'http://47.94.216.106/api/test?key=234'
};

// fetch('http://47.94.216.106/api/test?key=234')
//     .then(res => res.text())
//     .then(body => console.log(body));

// console.log(readFile1("./excels/广西规模以上服务业企业复工情况表.xlsx"))

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    }).then(response => response.json()) // parses response to JSON
}



var pathName = "./excels/";
var file2 = ["广西外资企业和外贸企业复工情况表.xlsx", "广西建筑业项目和房地产企业复工情况表.xlsx"];


fs.readdir(pathName, function (err, files) {
    var dirs = [];

    (function iterator(i) {
        if (i == files.length) {
            //dirs.shift()
            for (let item of dirs) {
                //console.log(item)
                if (file2.indexOf(item) === -1) {
                    // 上传可以用readFile1读取的文件
                    new Promise(function (resolve) {
                        if (readFile1(pathName + item)) {
                            resolve(readFile1(pathName + item));
                        }

                    }).then((res) => {
                        console.log("*******************")
                        console.log(item)
                        data = {
                            "data": res,
                            "key": String(dirs.indexOf(item)),
                            // "key":item.split(".")[0],//使用文件名
                        }
                        //console.log(encodeURI("http://47.94.216.106/api/test?key="+item.split(".")[0]));
                        postData(encodeURI("http://47.94.216.106/api/test?key=" + String(dirs.indexOf(item))), data).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                else if (file2.indexOf(item) !== -1) {
                    // 上传可以用readFile2读取的文件
                    new Promise(function (resolve) {
                        if (readFile2(pathName + item)) {
                            resolve(readFile2(pathName + item));
                        }

                    }).then((res) => {
                        console.log("*******************")
                        console.log(item)
                        data = {
                            "data": res,
                            "key": String(dirs.indexOf(item)),
                            // "key":item.split(".")[0],//使用文件名
                        }
                        //console.log(encodeURI("http://47.94.216.106/api/test?key="+item.split(".")[0]));
                        postData(encodeURI("http://47.94.216.106/api/test?key=" + String(dirs.indexOf(item))), data).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
            return;
        }
        fs.stat(path.join(pathName, files[i]), function (err, data) {
            if (data.isFile()) {
                dirs.push(files[i]);
            }
            iterator(i + 1);
        });
    })(0);
});


