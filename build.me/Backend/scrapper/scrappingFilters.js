// Filter out items WITHOUT filterName: filterStr
function itemFilter(itemArr, filterName, filterStr) {
  try {
    return itemArr.filter((item) => item[filterName].includes(filterStr));
  } catch (err) {
    return err;
  }
}

// Filter out items WITH filterName: filterStr
function itemExcludes(itemArr, filterName, filterStr) {
  try {
    return itemArr.filter((item) => !item[filterName].includes(filterStr));
  } catch (err) {
    return err;
  }
}

function itemLimit(itemArr, max) {
  return itemArr.slice(0, max);
}

module.exports = { itemFilter, itemExcludes, itemLimit };
