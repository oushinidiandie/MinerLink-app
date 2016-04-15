var crypto = require('crypto');

var secret = '81d261d0-6bd3-43e1-b100-0d9f3c951733';

var sha256 = function(username,key,nonce) {
    var hash = crypto.createHmac('sha256', secret)
        .update(username + key + nonce)
        .digest('hex');
    console.log(hash);
    return hash;
};

exports.sha256 = sha256;