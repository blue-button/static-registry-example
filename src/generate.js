var jwcrypto = require("jwcrypto");
var async = require("async");
var fs = require("fs");
var path = require("path");
var registry = require("../.well-known/bb/registry.json");
var apps = require("../.well-known/bb/apps.json");

var kid = "main-sample-key-"+new Date().toISOString().substr(0,10);

// jscrypto doesn't automatically register its algs -- 
// but requiring an alg has the side effect of registering it...
require("./node_modules/jwcrypto/lib/algs/rs");

jwcrypto.generateKeypair({
  algorithm: 'RS',
  keysize: 256
}, function(err, keypair) {

  var pubkey = keypair.publicKey.toSimpleObject();

  fs.writeFileSync(
    __dirname + "/../generated/public_key.jwks",
    JSON.stringify({
      keys: [
        {
          kty: "RSA",
          n: pubkey.n,
          e: pubkey.e,
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
      kid: kid,
      fixed_registration_parameters: app.fixed_registration_parameters
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
