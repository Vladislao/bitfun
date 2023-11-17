export type Mask = number | null | undefined;
export type Flags = number | number[];

const add = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) mask = 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc | f, mask);
};

const remove = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) return 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc & ~f, mask);
};

const fromArray = (flags: Flags) => add(0, flags);

const toArray = (mask: Mask) => {
  if (mask === undefined || mask === null) return [];

  return mask
    .toString(2)
    .split("")
    .reverse()
    .reduce<number[]>((acc, v) => {
      acc.push(+v * Math.pow(2, acc.length));
      return acc;
    }, [])
    .filter((v) => v);
};

const equals = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return mask === comparable;
};

const includes = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return (mask & comparable) === comparable;
};

const excludes = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) return false;
  return !includes(mask, flags);
};

const noneOf = (mask: Mask, flags: Flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  if (mask === 0 && comparable === 0) return false;
  return (mask & comparable) === 0;
};

export { add, remove, fromArray, toArray, equals, includes, excludes, noneOf };
