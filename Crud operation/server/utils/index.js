const { endianness } = require("os");

const Buffer = require("buffer").Buffer;
// const lodash = require("lodash");
// const _ = require("lodash");

const { shuffle } = require("lodash");
const { count } = require("console");
const getKeysAndValuesFromReqBody = (reqBody) => {
  let keys = [],
    values = [];

  for (let key in reqBody) {
    keys.push(key);
    values.push(reqBody[key]);
  }
  //method2 but need iteration 2 times
  // const keys = Object.keys[reqBody];
  // const values = Object.values[reqBody];

  //method3 but need iteration 2 times
  // const objectArray = Object.entries(reqBody);
  // objectArray.forEach(([key, value]) => {
  //     // console.log(key); // 'one'
  //     // console.log(value); // 1
  //     keys.push(key);
  //     values.push(values);
  // })

  // keys need to be passed as comma separated string thus converting array to string
  keys = keys.join();
  return { keys, values };
};

const getUpdateSrtingFromReqBody = (reqBody) => {
  let updateString = "";
  // for (let key in reqBody) {
  //     updateString += `${key} = '${reqBody[key]}',`;
  // }
  for (let key in reqBody) {
    if (typeof reqBody[key] == "string") {
      updateString += `${key} = '${reqBody[key]}',`;
    } else {
      updateString += `${key} = ${reqBody[key]},`;
    }
  }
  // console.log(updateString);
  updateString = updateString.substr(0, updateString.length - 1);
  console.log("updateString- dynamic stmt-----", updateString);
  return updateString;
};

// const getUpdateSrtingFromReqBody = (reqBody) => {
//     let keys = [], values = [];

//     console.log(reqBody);
//     const objectArray = Object.entries(reqBody);
//     objectArray.forEach(([key, value]) => {
//         keys.push(key);
//         values.push(value);
//     })
//     console.log(keys, values);

//     let updateString ='';
//      for(let i=0; i< keys.length; i++){
//         updateString = updateString.concat(keys[i], ' = ', "'" ,values[i], "'" );
//         i == (keys.length -1) ? updateString.concat(' ') : updateString = updateString.concat(', ');
//     }
//     return updateString;
// };

//it will take the buffer Array of image stored in db and converts back to base64String
const convertImageBufferToBase64 = (bufferArray) => {
  if (bufferArray) {
    // console.log(
    //   "Utils.Index.js->convertImageBufferToBase64-> bufferArray.data---:",
    //   bufferArray.data
    // );
    // const image = Buffer.from(bufferArray);
    //   console.log("Utils.Index.js->convertImageBufferToBase64-> image---:", image);

    // we need to use specific format of the string which is base64
    return bufferArray.toString("base64");
  } else {
    return "";
  }
};

const getPaginatedData = (unPaginatedData = [], startIndex = 0, endIndex) => {
  const result = [];

  if (endIndex > unPaginatedData.length || !endIndex) {
    endIndex = unPaginatedData.length - 1;
  }
  for (let i = startIndex; i <= endIndex; i++) {
    result.push(unPaginatedData[i]);
  }
  return result;
};

const getSortedData = (unsortedData = [], key, sortOrder) => {
  // unsortedData = shuffle(unsortedData);
  unsortedData.sort((a, b) => {
    // Use toUpperCase() to ignore character casing
    const field1Value =
      typeof a[key] == "string" ? a[key].toUpperCase() : a[key];
    const field2Value =
      typeof b[key] == "string" ? b[key].toUpperCase() : b[key];
    // console.log("utils.js->getSortedData->field1Value", field1Value);
    // console.log("utils.js->getSortedData->field2Value", field2Value);
    let comparison = 0;
    if (field1Value > field2Value) {
      comparison = sortOrder == "asc" ? 1 : -1;
    } else if (field1Value < field2Value) {
      comparison = sortOrder == "asc" ? -1 : 1;
    }
    return comparison;
  });
  return unsortedData;
};

/* 
Input:
  [
    {id:1, name:'Hindi'},
    {id:2, name:'English'},
    ...
  ] 
Output:
  [
    {id:1, name:'Hindi', count: 4},
    {id:2, name:'English', count: 5},
    ...
  ]  
*/
const getSummarizedData = (rowData = [], key) => {
  const finalObject = {},
    finalArray = [];

  for (let i = 0; i < rowData.length; i++) {
    let updatingValue = rowData[i][key];

    if (finalObject[updatingValue]) {
      finalObject[updatingValue] += 1;
    } else {
      finalObject[updatingValue] = 1;
    }
  }

  for (let k in finalObject) {
    finalArray.push({ name: k, value: finalObject[k] });
  }
  return finalArray;
};

module.exports = {
  getKeysAndValuesFromReqBody,
  getUpdateSrtingFromReqBody,
  convertImageBufferToBase64,
  getPaginatedData,
  getSortedData,
  getSummarizedData,
};
