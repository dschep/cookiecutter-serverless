'use strict';
var fetch = require('node-fetch');

module.exports.starLogger = (event, context, callback) => {
  fetch(`https://api.github.com/repos/${process.env.repo}`)
    .then((resp) => resp.json())
    .then((json) => fetch(`${process.env.phantUrl}/input/${process.env.phantPublicKey}?private_key=${process.env.phantPrivateKey}&stars=${json.stargazers_count}`))
    .then((resp) => callback(null, {statusCode: 200, body: resp.text()}))
    .catch((err) => callback(err, null));
};
