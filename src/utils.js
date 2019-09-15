const chalk = require('chalk');

const getTimefromUnixTimestamp = (unixTimestamp) => {    
    let date = new Date(unixTimestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
};

const chalkInfo = (str) => chalk.blue.underline(str);

const chalkError = (str) => chalk.red.inverse(str);

module.exports ={
    getTimefromUnixTimestamp,
    chalkInfo,
    chalkError,
}