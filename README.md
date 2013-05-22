# BB+ Sample Registry (static site w/ generator)

## Registry root URL
http://blue-button.github.io/static-registry-example

## Discovery endpoints

### Registry discovery
http://blue-button.github.io/static-registry-example/.well-known/bb/registry.json

### App discovery
http://blue-button.github.io/static-registry-example/.well-known/bb/apps.json

### Provider discovery
http://blue-button.github.io/static-registry-example/.well-known/bb/providers.json

## Public key (linked from `registry.json`)
http://blue-button.github.io/static-registry-example/.well-known/bb/apps.json

## Registration JWTs (for demonstration only)
http://blue-button.github.io/static-registry-example/generated/private/secret_registration_tokens.json
These would be secret (not public) in real life...


# Regenerating `/generated` files

```
cd src
npm install
node generate.js
```
