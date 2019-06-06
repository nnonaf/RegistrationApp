var { set, omit, get, forEach, split, reduce, map, indexOf, first, isNumber, isString, isArray, isObject, replace } = require('lodash');


// var filterArray = (data, condition, props, others) => {
//   return map(data, (d) => filterProperties(d, condition, props, others));
// }


var filterProperties = (data, condition, props, others) => {
  if (!data) {
    return data;
  }

  if (isNumber(data)) {
    return data;
  }

  if (isString(data)) {
    return data;
  }

  if (isArray(data)) {
    return filterArray(data, condition, props, others);
  }

  if (isObject(data)) {
    return filterObject(data, condition, props, others);
  }

  return data;
}

module.exports = {
 
  filterProperties: (data, condition, props = ['password','documents'], others = ['password']) => {
    try {
      if (data && data._doc) {
        data = data._doc;
      }
      else if (first(data) && first(data)._doc) {
        data = map(data, (d) => d._doc);
      }
      return filterProperties(JSON.parse(JSON.stringify(data)), condition, props, others);
    } catch (error) {
      return data;
    }
  },

}