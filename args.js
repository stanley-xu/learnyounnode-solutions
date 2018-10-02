/**
 * This program sums all arguments and returns it to stdout
 */

let sum = 0;
for (let i = 2; i < process.argv.length; i++) {
    // note: we need to coerce process.argv since those are strings
    // either use Number(arg) or +arg
    sum += +process.argv[i];
}
console.log(sum);