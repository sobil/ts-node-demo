# TS as a goto shell scripting language


## How

Using `ts-node` will do runtime precompilation and just work 


## Why?

- It's probably the language you are most familiar coding with?
- Using it within an existing TS project means you can use existing utils
- Can potentially be abstracted for testing

## Why not?

- Outside of a JS/TS project means installing global dependencies and other pain
- Somethings just don't need that much boiler plate
- You want to manipulate shell state.

## Demo

Authenticate to an AWS account in your parent shell

```
yarn
yarn build 
yarn deploy
```