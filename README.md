# BB+ Sample Registry (static site w/ generator)

## Registry root URL
https://pilots.fhir.me

## Discovery endpoints

### Registry discovery
https://pilots.fhir.me/.well-known/bb/registry.json

### App discovery
https://pilots.fhir.me/.well-known/bb/apps.json

### Provider discovery
https://pilots.fhir.me/.well-known/bb/providers.json

## Public key (linked from `registry.json`)
https://pilots.fhir.me/generated/public_jwks.json

## Registration JWTs (for demonstration only)
https://pilots.fhir.me/generated/private/secret_registration_tokens.json

(These would be secret -- never public -- in a real registry...)


# Regenerating `/generated` files

```
cd src
npm install
node generate.js # optionally --generate-keys
```
