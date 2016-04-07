var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rp = require('request-promise');
var errors = require('request-promise/errors');
var ejs = require('ejs');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.engine('html',ejs.__express);
app.set('view engine', 'html');
//app.set("view engine", "ejs");
app.use(express.static('public'));
app.set("view options", {
    "layout": false
});

app.get('/tables', function(req, res) {

    var gets = {
        uri: 'https://www.minerlink.com/test/miners',
        qs: {
            limit: '10',
            offset: '0'
        },
        headers: {
            
        }
    };

    var post_response = ""

    rp(gets)
        .then(function(argument) {
            post_response += argument;
            res.render("tables", {
                jss: JSON.parse(post_response)
            });
        })
        .catch(function(err) {
            console.log('err:' + errors);
        });
})



var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})