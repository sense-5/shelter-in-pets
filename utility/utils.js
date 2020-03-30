function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  str = str.join(" ");
  let resultStr = "";
  for (let j = 0; j < str.length; j++) {
    if (str[j - 1] === "/" || str[j - 1] === "-" || str[j - 1] === "(") {
      let letter = str[j];
      let newletter = letter.toUpperCase();
      resultStr += newletter;
    } else {
      resultStr += str[j];
    }
  }
  return resultStr;
}

function redoPhoneNum(string) {
  if (string === null) {
    return "000000000";
  } else {
    let final = "";
    for (let i = 0; i < string.length; i++) {
      let letter = string[i];
      if (
        letter !== "(" &&
        letter !== ")" &&
        letter !== " " &&
        letter !== "-"
      ) {
        final += letter;
      }
    }
    return final;
  }
}

function redoCity(string) {
  let final = "";
  for (let i = 0; i < string.length; i++) {
    let letter = string[i];
    if (letter !== " ") {
      final += letter;
    } else {
      final += "+";
    }
  }
  return final;
}

module.exports = { titleCase, redoPhoneNum, redoCity };
