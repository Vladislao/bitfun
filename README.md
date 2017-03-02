# bitfun
Functions for manipulating bitmasks as numbers. Deterministic, without side effects.

## Installation

```javascript
npm i bitfun -S
```

## How to play

```javascript
import * as bitfun from 'bitfun';

...
const mask = bitfun.add(1, [1,2]) // mask equals 3
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

Just look through [tests](./index.test.js). They are simple and cover most of use cases.

## API

* fromArray - returns new bitmask from specified array
* add - method adds bits to an existing map, returns new bitmask
* remove - method removes bits from an existing map, returns new bitmask
* equlas - returns true if mask includes only specified bits
* includes - returns true if mask includes all of the specified bits
* excludes - returns true if mask includes some or none of the specified bits
* noneOf - returns true if mask includes none of the specified bits

## Testing

```javascript
npm test
```
