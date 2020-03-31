function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  str = str.join(' ');
  let resultStr = '';
  for (let j = 0; j < str.length; j++) {
    if (str[j - 1] === '/' || str[j - 1] === '-' || str[j - 1] === '(') {
      let letter = str[j];
      let newletter = letter.toUpperCase();
      resultStr += newletter;
    } else {
      resultStr += str[j];
    }
  }
  return resultStr;
}

function upperCase(str) {
  let strArr = str.split(' ');
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i][0].toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join(' ');
}

function removeDuplicates(arr) {
  const result = arr.reduce((acc, current) => {
    const duplicates = acc.find(dog => {
      return dog.key === current.key;
    });
    if (!duplicates) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return result;
}

module.exports = { titleCase, upperCase, removeDuplicates };
