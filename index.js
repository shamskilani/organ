const fs = require('fs');
const csv = require('csv-parser');

// Function to process the orders from a CSV file
function processOrdersFromFile(filePath) {
    const orders = [];
  
    // Read the CSV file and process each order
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        orders.push(data);
      })
      .on('end', () => {
        // Process each order and generate the output
        orders.forEach((order) => {
          console.log(order.organ);
        });
      });
  }
  
  // Process orders from the provided CSV file
  processOrdersFromFile('orders_example.csv');