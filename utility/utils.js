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

module.exports = { titleCase };
