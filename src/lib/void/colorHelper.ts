import chalk from "chalk";
import RGBAColor from "../class/RGBAColor";

function getChalkDisplay(message:string,currentValue:RGBAColor) {
    return chalk.rgb(currentValue.getSingle(currentValue.r),currentValue.getSingle(currentValue.g),currentValue.getSingle(currentValue.b))(message);
}

export {
    getChalkDisplay
}