var jwcrypto = require("jwcrypto");
var async = require("async");
var fs = require("fs");
var path = require("path");
var registry = require("../.well-known/bb/registry.json");
var apps = require("../.well-known/bb/apps.json");
var kid = "main-sample-key-"+new Date().toISOString().substr(0,10);
var BigInteger = require("./node_modules/jwcrypto/libs/all").BigInteger;

// jscrypto doesn't automatically register its algs -- 
// but requiring an alg has the side effect of registering it...
require("./node_modules/jwcrypto/lib/algs/rs");

jwcrypto.generateKeypair({
  algorithm: 'RS',
  keysize: 256 // --> 2048 bit RSA key!
}, function(err, keypair) {

  fs.writeFileSync(
    __dirname + "/../generated/public_jwks.json",
    JSON.stringify({
      keys: [
        {
          kty: "RSA",
          n: keypair.rsa.n.toBase64(),
          e: new BigInteger(keypair.rsa.e.toString(), 10).toBase64(),
          alg: "RS256",
          kid: kid
        }
      ]
    }, null, 2)
  );

  var app_jwts = {

  };

  async.each(apps, function(app, callback){
    var prereg_jwt_claims = {
      iss: registry.url,
      sub: app.url,
      iat: new Date().getTime(),
      kid: kid
    }; 

    jwcrypto.sign(
      prereg_jwt_claims,
      keypair.secretKey,
      function(err, jws) {
        app_jwts[app.url] = {
          registration_jwt: jws,
          "claims (included just for human readability)": prereg_jwt_claims
        };
        callback(null);
      });
  }, function(err){
    fs.writeFileSync(
      __dirname+"/../generated/private/secret_registration_tokens.json",
      JSON.stringify(app_jwts, null, 2)
    );
  });
});
