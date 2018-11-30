var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "127.0.0.1",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

  connection.connect(function(err){
      if(err){
          console.log("Error: "+err);
      }
      console.log("connected as id "+ connection.threadId);
      displayProducts();
  });

  function displayProducts(){
      console.log("Items available for sale");

      connection.query("SELECT * FROM product", function(err, res){
        if(err){
            console.log("Error: "+err);
        }

        var table = new Table({
            head: ['Item_Id', 'Item_name','Department Name','Price','Stock Quantity']
        });

        for(var i=0;i<res.length;i++){
            var arr_val = [];
            for(var key in res[i]){
                arr_val.push(res[i][key]);
            }
            table.push(arr_val);
        }
         
        console.log(table.toString());
        placeOder();
      });
  }

function placeOder(){
    inquirer.prompt([{name: "id",
    type: "input",
    message: "Please enter the ID of an item:"
    },
    {
        name: "quantity",
        type: "input",
        message: "How many quantity you would like to buy?"
    }
    ]).then(function(answer){
        var temp = "SELECT stock_quantity, price FROM product WHERE ?"
        var id = parseInt(answer.id);

        connection.query(temp,{item_id:id},function(err, data){
            if(err){
                console.log(err)
            }

           if(data[0].stock_quantity >= parseInt(answer.stock_quantity)){
                var q = data[0].stock_quantity - parseInt(answer.quantity);

                connection.query("UPDATE product SET ? WHERE ?", [{stock_quantity:q},{item_id:id}], function(err, q_update){
                    if(err){
                        console.log(err);
                    }
                    var price = data[0].price * parseInt(answer.quantity);
                    console.log("Total price: "+price);
                });
           }

           else{
               console.log("Sorry!!! Insufficient quantity");
           }

           connection.end();   
        });
    });


}