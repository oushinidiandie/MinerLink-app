var merge = require('merge');
var rp = require('request-promise');
var crypto = require('../../config/sha256');
module.exports = {
  login: function(req, res) {
    res.render("login", '');
  },
  validate: function(req, res) {
    console.log("Cookies: ", req.cookies);　
    if (!req.cookies.validate) {　
      res.redirect('/');
    } else {　　
      res.send("验证");
    }
  },
  loginValidate: function(req, res, next) {
    console.log('loginValidate');

    var username = req.query.first_name.toString();
    var password = req.query.last_name.toString();
    var nonce = new Date().getTime();
    //var nonce = '1460691764176';
    var key = "baf2fd61-5c68-425f-8497-bd55aebb7cfa";
    var hash = crypto.sha256(username, key, nonce).toUpperCase().toString();
    console.log('username : ' + username + ', password : ' + password + ', nonce : ' + nonce + ', key : ' + key + ', hash : ' + hash);

    var gets = {
      uri: 'https://walletuser.bitmain.com/users_center/outer/client.html',
      qs: {
        json: JSON.stringify({
          "version": "1",
          "key": key,
          "nonce": nonce,
          "method": "login",
          "email": username,
          "data": {
            "password": password
          },
          "signature": hash
        })
      },
      headers: {

      },
      json: true
    };

  var post_response = ""
    rp(gets)
      .then(function(argument) {
        post_response += argument;
        console.log('get_response:' + JSON.stringify(argument));
        console.log('email:' + argument.data.email);
        if (argument.code == '0') {
          res.setHeader('Set-Cookie', 'validate='+argument.data.ticket);
          res.render("tables", {
                jss: argument
            });
        } else {
          res.render("login", '');
        }
      })
      .catch(function(err) {
        console.log('err:' + errors);
      });
  }
};