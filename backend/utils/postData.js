const fetch = require('node-fetch');
let { readFile1, readFile2 } = require('./readFile');
var path = require("path");
var fs = require("fs");

//用readFile2读取的文件
var file2 = ["广西外资企业和外贸企业复工情况表", "广西建筑业项目和房地产企业复工情况表"];

function post(url, data) {
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




function postData(filePath) {
        
        //console.log(filePath.split(/[\/|.|-]/))
        let key = filePath.split(/[\/|.|-]/)[1];
        console.log(key)

        if (file2.indexOf(key) === -1) {
            // 上传可以用readFile1读取的文件
            new Promise(function (resolve) {
                if (readFile1(filePath)) {
                    resolve(readFile1(filePath));
                }

            }).then((res) => {
                console.log("*******************")
                //console.log(res)
                data = {
                    "data": res,
                    // "key": String(dirs.indexOf(item)),
                    key,//使用文件名
                }
                console.log(encodeURI("http://47.94.216.106/api/test?key=" + key));
                // //console.log(key)
                post(encodeURI("http://47.94.216.106/api/test?key=" + key), data).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
        else if (file2.indexOf(key) !== -1) {
            // 上传可以用readFile2读取的文件
            new Promise(function (resolve) {
                if (readFile2(filePath)) {
                    resolve(readFile2(filePath));
                }

            }).then((res) => {
                console.log("*******************")
                //console.log(res);
                data = {
                    "data": res,
                    // "key": String(dirs.indexOf(item)),
                    key,//使用文件名
                }
                //console.log(key)
                console.log(encodeURI("http://47.94.216.106/api/test?key=" + key));
                post(encodeURI("http://47.94.216.106/api/test?key=" + key), data).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    
}




module.exports ={
    postData
}