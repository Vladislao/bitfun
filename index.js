const add = exports.add = (mask, flags) => {
  if (mask === undefined || mask === null) mask = 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc | f, mask);
};

const remove = exports.remove = (mask, flags) => {
  if (mask === undefined || mask === null) return 0;
  const flagsArr = Array.isArray(flags) ? flags : [flags];
  return flagsArr.reduce((acc, f) => acc & ~f, mask);
};

const fromArray = exports.fromArray = (flags) => add(0, flags);

const equals = exports.equals = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return mask === comparable;
};

const includes = exports.includes = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  return ((mask & comparable) === comparable);
};

const excludes = exports.excludes = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  return !includes(mask, flags);
};

const noneOf = exports.noneOf = (mask, flags) => {
  if (mask === undefined || mask === null) return false;
  const comparable = fromArray(flags);
  if (mask === 0 && comparable === 0) return false;
  return ((mask & comparable) === 0);
};
