var mysql = require("mysql");
var inquirer = require("inquirer");

//var express = require('express');
//var app = express();

var Socket = require('net').Socket;

var socket = new Socket();

var choices;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
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
})

var selectAction = function () {
    // User is prompted to select desired action from displayed list
    inquirer.prompt([
        {
            message: "\nWhat would you like to do?",
            type: "list",
            name: "action",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Remove Product from Inventory", "Exit Manager Module"]
        }
    ]).then(function (answers) {
        switch (answers.action) {
            // If user selects View Products for Sale, go to the viewProducts function
            case "View Products for Sale":
                viewProducts();
                break;

            // If user selects View Low Inventory, go to the viewLowInventory function
            case "View Low Inventory":
                viewLowInventory();
                break;

            // If user selects Add to Inventory, go to addToInventory function    
            case "Add to Inventory":
                addToInventory();
                break;

            // If user selects Add New Product, go to addNewProduct function    
            case "Add New Product":
                addNewProduct();
                break;

            // If user selects Remove Product from Inventory, go to removeProduct function 
            // case "Remove Product from Inventory":
            //   removeProduct();
            // break;

            // Allows user to exit module     
            case "Exit Manager Module":
                connection.end();
                break;
        }
    })
}

selectAction();

// Displays list of all available products.
var viewProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log("\nID: " + result[i].item_id + " | " + "Product: " + result[i].product_name + " | "
                + "Department: " + result[i].department_name + " | " + "Price: " + result[i].price + " | " + "QTY: " + result[i].stock_quantity);
            console.log('---------------------------------------------------------------------------------------------')
        }
        // Go back to action menu
        selectAction();
    })
}

// Display low inventory items (less than 5 in stock)
var viewLowInventory = function () {
    var query = "Select * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++)
            console.log("\nID: " + result[i].item_id + " | " + "Product: " + result[i].product_name + " | "
                + "Department: " + result[i].department_name + " | " + "Price: " + result[i].price + " | " + "QTY: " + result[i].stock_quantity);
        console.log('---------------------------------------------------------------------------------------------\n')
        selectAction();
    })
    // Go back to action menu

};

var addToInventory = function () {
    // Ask user for item ID
    inquirer.prompt([{
        message: "\nWhat is the item ID of the product you'd like to restock?",
        type: "input",
        name: "itemID",
    },
    // Ask user quantity of the item to add
    {
        message: "\nHow many of the item would you like to restock?",
        type: "input",
        name: "quantity",
    }]).then(function (answer) {
        var query = "SELECT * from products WHERE item_id = ?";
        connection.query(query, [parseInt(answer.itemID)], function (err, result) {
            if (err) throw err;
            // Variable that holds quantity user entered
            var addedQuant = parseInt(answer.quantity);
            // Old quantity plus quantity user entered
            var tempQuant = result[0].stock_quantity + addedQuant;
            console.log("\nYou have added " + addedQuant + " " + result[0].product_name + "'s.");
            console.log("\nNew quantity in stock: " + tempQuant);

            // Updates stock for selected product in database.
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: tempQuant
            }, {
                item_id: answer.product_ID
            }], function (err, res) {
                if (err) {
                    throw err;
                } else {

                    // Lets manager select new action.
                    selectAction();
                }
            });
        })
    })
}

var addNewProduct = function () {
    inquirer.prompt([
        {
            message: "\nWhat is the product you'd like to add?",
            type: "input",
            name: "prodName",
        },
        {
            message: "\nWhich department does the product belong in?",
            type: "list",
            name: "prodDept",
            choices: ["Books", "Housewares", "Jewelry", "Sports Equipment"]
        },
        {
            message: "\nWhat is the product's price (in dollars)?",
            type: "input",
            name: "prodPrice",
        },
        {
            message: "\nWhat is the quantity of the new product?",
            type: "input",
            name: "prodQuant"
        }
    ]).then(function (answer) {
        var p = parseInt(answer.prodPrice);
        var q = parseInt(answer.prodQuant);

        //  var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (answer.prodName, answer.prodDept, p , q)";

        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [answer.prodName, answer.prodDept, p, q], function (err, result) {
            if (err) throw err;
            console.log("Inside query");

            console.log("\nThe product you have added is: Product: " + answer.prodName + " | " + "Department: " + answer.prodDept + "Price: " + answer.prodPrice + " | " + "QTY: " + answer.prodQuant + "\n");
            selectAction();
        })
    })

}

/* var removeProduct = function() {
    inquirer.prompt ([
        {
        message: "\nWhat is the item ID of the item you'd like to remove?",
        type: "input",
        name: "itemID",
        }
    ]).then(function (answer) {
        var itemID = answer.itemID;
        var query = ('DELETE * from products WHERE item_ID = itemID')
            console.log(itemID);
            console.log("Inside query");
            connection.query(query, function (err) {
                if (err) throw err;
            selectAction();
            })

})

}*/