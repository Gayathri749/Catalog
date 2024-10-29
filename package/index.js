const express = require("express");  
const bodyParser = require("body-parser");  
const bigInt = require("big-integer");  
const morgan = require("morgan");  

const app = express();  
const PORT = 3000;  

app.use(bodyParser.json());  
app.use(morgan("dev"))

// Function to decode a number from a given base  
function decodeValue(base, value) {  
    return value.split('').reverse().reduce((acc, digit, index) => {  
        return acc.add(bigInt(digit, 10).multiply(bigInt(base).pow(index))); // Convert digit to base 10 and calculate the power  
    }, bigInt(0));  
}    

// Lagrange interpolation to find the constant term of the polynomial  
function lagrangeInterpolation(points) {  
    const k = points.length;  
    let c = bigInt(0); // This will hold the constant term f(0)  

    for (let i = 0; i < k; i++) {  
        let x_i = points[i][0]; // x-coordinate  
        let y_i = points[i][1]; // y-coordinate  

        // Calculate the Lagrange basis polynomial  
        let L_i = bigInt(1);  
        for (let j = 0; j < k; j++) {  
            if (i !== j) {  
                L_i = L_i.multiply(bigInt(0).subtract(bigInt(points[j][0]))).divide(bigInt(x_i).subtract(bigInt(points[j][0])));  
            }  
        }  
        c = c.add(L_i.multiply(y_i));  
    }  
    return c; // Return secret without modulo since we're dealing with positive integers  
}  
