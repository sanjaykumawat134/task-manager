const calculateTip = (total,percentage)=>{
const tip = total*percentage;
return total+tip;
}

const farenheightToCelsius = (temp)=>{
    return (temp - 32)/1.8;
}

const celsiusToFarenheights = (temp)=>{
    return (temp * 1.8) + 32;
}

module.exports ={
    calculateTip,
    farenheightToCelsius,
    celsiusToFarenheights
}