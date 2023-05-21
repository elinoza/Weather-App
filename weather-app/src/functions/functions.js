export const capitalizeFirstLetter=(string)=>{
    let newArr=string.split(" ").map((elem=>elem.charAt(0).toUpperCase()+elem.slice(1)))
    return newArr.join(" ")
  }
 export const celToFah = (cel) => {
    return ((cel * 9) / 5 + 32).toFixed(0);
  };