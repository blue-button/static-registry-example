# BB+ Sample Registry (static site w/ generator)

## Registry root URL
https://bbplus-static-registry.aws.af.cm

## Discovery endpoints

### Registry discovery
https://bbplus-static-registry.aws.af.cm/.well-known/bb/registry.json

### App discovery
https://bbplus-static-registry.aws.af.cm/.well-known/bb/apps.json

### Provider discovery
https://bbplus-static-registry.aws.af.cm/.well-known/bb/providers.json

## Public key (linked from `registry.json`)
https://bbplus-static-registry.aws.af.cm/generated/public_jwks.json

## Registration JWTs (for demonstration only)
https://bbplus-static-registry.aws.af.cm/generated/private/secret_registration_tokens.json

(These would be secret -- never public -- in a real registry...)


# Regenerating `/generated` files

```
cd src
npm install
node generate.js
```
