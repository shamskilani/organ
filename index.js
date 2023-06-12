const fs = require('fs');
const csv = require('csv-parser');

// Base Organ class
class Organ {
    constructor(type, price) {
      this.type = type;
      this.price = price;
    }
  
    purchase(cash) {
      return Math.floor(cash / this.price);
    }
  }
  
  // Organ subclasses
  class Heart extends Organ {
    constructor(price) {
      super('Heart', price);
    }
  }
  
  class Liver extends Organ {
    constructor(price) {
      super('Liver', price);
    }
  }
  
  class Lung extends Organ {
    constructor(price) {
      super('Lung', price);
    }
  }
  

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