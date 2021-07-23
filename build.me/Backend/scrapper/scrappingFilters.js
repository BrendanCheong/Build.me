// Filter out items WITHOUT filterName: filterStr
function itemFilter(itemArr, filterName, filterStr) {
  try {
    return itemArr.filter((item) => item[filterName].includes(filterStr));
  } catch (err) {
    return err;
  }
}

// Filter out items WITH filterName: filterStr
function itemExcludes(itemArr, filterName, filterArr) {
  try {
    let Arr = [];
    for (let item of itemArr) {
      let truth = true;
      for (let filterItem of filterArr) {
        const check = item[filterName].toLowerCase();
        if (check.includes(filterItem)) {
          truth = false;
          break;
        }
      }
      if (truth) {
        Arr.push(item);
      }
    }
    return Arr;
  } catch (err) {
    return err;
  }
}

function itemLimit(itemArr, max) {
  return itemArr.slice(0, max);
}

module.exports = { itemFilter, itemExcludes, itemLimit };
