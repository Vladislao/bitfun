const add = (mask, flags) => {
  if (mask === undefined || mask === null) mask = 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc | f, mask);
};

const remove = (mask, flags) => {
  if (mask === undefined || mask === null) return 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc & ~f, mask);
};

const fromArray = flags => add(0, flags);

const toArray = mask => {
  if (mask === undefined || mask === null) return [];

  return mask
    .toString(2)
    .split("")
    .reverse()
    .reduce((acc, v) => {
      acc.push(v * Math.pow(2, acc.length));
      return acc;
    }, [])
    .filter(v => v);
};

const equals = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return mask === comparable;
};

const includes = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return (mask & comparable) === comparable;
};

const excludes = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  return !includes(mask, flags);
};

const noneOf = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  if (mask === 0 && comparable === 0) return false;
  return (mask & comparable) === 0;
};

exports.add = add;
exports.remove = remove;
exports.fromArray = fromArray;
exports.toArray = toArray;
exports.equals = equals;
exports.includes = includes;
exports.excludes = excludes;
exports.noneOf = noneOf;
