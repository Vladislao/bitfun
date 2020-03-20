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

## API

#### bitfun.fromArray(array)

- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Number\>_ Bitmask.

Creates a new bitmask from specified array.

```javascript
> bitfun.fromArray([1,2])    01,10
< 3                          11
```

```javascript
> bitfun.fromArray([1,2,3])    01,10,11
< 3                            11
```

#### bitfun.toArray(mask)

- **mask** _\<Number\>_ Bitmask.
- Returns: _\<Array\<Number\>\>_ Array of flags.

Creates array of flags from specified bitmask.

```javascript
> bitfun.toArray(3)         11
< [1,2]                     01,10
```

```javascript
> bitfun.toArray(5)         101
< [1,4]                     01,100
```

```javascript
> bitfun.toArray(0)
< []
```

#### bitfun.add(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Number\>_ New bitmask.

Adds bits to an existing bitmask.

```javascript
> bitfun.add(2, [1])        10 | 01
< 3                         11
```

```javascript
> bitfun.add(3, [1,2,3])    11 | 01,10,11
< 3                         11
```

#### bitfun.remove(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Number\>_ New bitmask.

Removes bits from an existing bitmask.

```javascript
> bitfun.remove(2, [1])       10 | 01
< 2                           10
```

```javascript
> bitfun.remove(3, [1,2,3])   11 | 01,10,11
< 0                           00
```

#### bitfun.equals(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Boolean\>_ Match.

Returns true if mask includes only specified bits.

```javascript
> bitfun.equals(2, [1])      10 | 01
< false                      10 | 01
```

```javascript
> bitfun.equals(2, [1, 2])   10 | 01,10
< false                      10 | 11
```

```javascript
> bitfun.equals(3, [1])      11 | 01
< false                      11 | 01
```

```javascript
> bitfun.equals(3, [1,2])    11 | 01,10
< true                       11 | 11
```

#### bitfun.includes(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Boolean\>_ Match.

Returns true if mask includes all of the specified bits.

```javascript
> bitfun.includes(2, [1])      10 | 01
< false                        10 | 01
```

```javascript
> bitfun.includes(2, [1,2])    10 | 01,10
< false                        10 | 11
```

```javascript
> bitfun.includes(3, [1])      11 | 01
< true                         11 | 01
```

```javascript
> bitfun.includes(3, [1,2])    11 | 01,10
< true                         11 | 11
```

#### bitfun.excludes(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Boolean\>_ Match.

Returns true if mask includes some or none of the specified bits.

```javascript
> bitfun.excludes(2, [1])      10 | 01
< true                         10 | 01
```

```javascript
> bitfun.excludes(2, [1,2])    10 | 01,10
< true                         10 | 11
```

```javascript
> bitfun.excludes(3, [1])      11 | 01
< false                        11 | 01
```

```javascript
> bitfun.excludes(3, [1,2])    11 | 01,10
< false                        11 | 11
```

#### bitfun.noneOf(mask, array)

- **mask** _\<Number\>_ Bitmask.
- **array** _\<Array\<Number\>\>_ Array of flags.
- Returns: _\<Boolean\>_ Match.

Returns true if mask includes none of the specified bits.

```javascript
> bitfun.noneOf(2, [1])      10 | 01
< true                       10 | 01
```

```javascript
> bitfun.noneOf(2, [1,2])    10 | 01,10
< false                      10 | 11
```

```javascript
> bitfun.noneOf(3, [1])      11 | 01
< false                      11 | 01
```

```javascript
> bitfun.noneOf(3, [1,2])    11 | 01,10
< false                      11 | 11
```

## Testing

```javascript
npm test
```
