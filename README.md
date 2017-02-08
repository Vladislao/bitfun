# bitfun
Functions for manipulating bitmasks as numbers. 

## Instalation

```javascript
npm i bitfun -S
```

## How to play

```javascript
import * as bitfun from 'bitfun';

...
const mask = bitfun.add(1, [1,2]) // mask equlas 3
...
```

> \- But i don't like using numbers!  
> \- Easy

```javascript
import * as bitfun from 'bitfun';

const rights = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  EXECUTE: 4
};

...
if (bitfun.includes(user.rights, [rights.READ, rights.WRITE])) {
...
```
You can put constants to separate file and import them as you wish.

## Examples

Just look through [tests](./index.test.js). They are simple and covers most of use cases.

## API

* fromArray - get some
* add - add bits to existing map
* remove - remove bits from existing map
* equlas - returns true if mask includes only specified bits
* includes - returns true if mask includes all of the specified bits
* excludes - returns true if mask includes some or none of the specified bits
* noneOf - returns true if mask includes none of the specified bits

## Testing

```javascript
npm test
```
