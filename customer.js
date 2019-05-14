var mysql = require("mysql");
var inquirer = require("inquirer");

//var express = require('express');
//var app = express();

var Socket = require('net').Socket;

var socket = new Socket();

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon",

    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"

});


// Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


// Display all of the products and their info 
connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;

    for (var i = 0; i < result.length; i++) {
        console.log("ID: " + result[i].item_id + " | " + "Product: " + result[i].product_name + " | "
            + "Department: " + result[i].department_name + " | " + "Price: " + result[i].price + " | " + "QTY: " + result[i].stock_quantity);
        console.log('---------------------------------------------------------------------------------------------')

    }
    
    //var askforID = function () {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "\nEnter the ID of the item you'd like to purchase:"},
    {
        name: "quantity",
        type: "input",
        message: "\nEnter the quantity of the item you'd like to purchase: "
    }]).then(function(value){
           // validate: (value) => {
                if (!NaN && value.itemID > 0 && value.itemID < 13) {
                    //console.log("\nIt got this far");
                    //var itemID = value;
                    connection.query("SELECT * from products WHERE ?",{item_id:parseInt(value.itemID)}, function (err, result) {
                        //console.log("Result: "+JSON.stringify(result));
                        //console.log("ID: " + result[0].item_id + " | " + "Product: " + result[0].product_name + " | "
                            //+ "Department: " + result[0].department_name + " | " + "Price: " + result[0].price + " | " + "QTY: " + result[0].stock_quantity)
                         
                        if(result[0].stock_quantity >= parseInt(value.quantity)){
                            var temp = result[0].stock_quantity - parseInt(value.quantity)
                           // console.log(temp);

                            connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:temp},{item_id:parseInt(value.itemID)}], function(error,q_data){
                                var price = result[0].price * parseInt(value.quantity);
                                console.log("\n You have purchased " + parseInt(value.quantity) + " " + [result[0].product_name] + "s for a total cost of $" + price);

                                console.log("\nNew quantity in stock: " + temp);

                                connection.end();
                               // console.log("ID: " + result[0].item_id + " | " + "Product: " + result[0].product_name + " | "
                               // + "Department: " + result[0].department_name + " | " + "Price: " + result[0].price + " | " + "New QTY: " + temp);
                            });
                        }
                        else{
                            console.log("\nSorry! Insufficient quantity!");
                            connection.end();
                        }
                    
                })
                
    
               }
               else {
                      console.log("\nSorry, that is not an item number!");
                      connection.end();
                }
                // connection.end();
                

        });
    
       
    })




