console.log("Hola mundo!!")

function square(number){
    return number * number
}

var my_number = 5

console.log(square(my_number) + " is " + my_number + " squared!")

num_to_square = prompt("Enter a number, and check for the result in the browser console!")

console.log("The square of " + num_to_square + " is " + square(num_to_square))

console.log("the last two lines printed to the console use a function called square!")