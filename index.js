const fs = require('fs');
const csv = require('csv-parser');

// Base Organ class
class Organ {
    constructor(type, price) {
      this.type = type;
      this.price = price;
    }
  
    purchase(cash) {
        let purchasedQuantity=Math.floor(cash / this.price);
        if (Number.isInteger(purchasedQuantity) && purchasedQuantity>0){
            return purchasedQuantity;
        }
        else{
            return 0;
        }
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
  
  // Organ Factory
class OrganFactory {
    static createOrgan(type, price) {
      switch (type.toLowerCase()) {
        case 'heart':
          return new Heart(price);
        case 'liver':
          return new Liver(price);
        case 'lung':
          return new Lung(price);
        default:
          throw new Error(`Invalid organ type: ${type}`);
      }
    }
  }

// Function to process a single order
function processOrder(order) {
    const { organ, cash, price, bonus_ratio } = order;
  
    // Create the organ instance using the factory
    const organInstance = OrganFactory.createOrgan(organ, price);
  
    // Purchase organs based on the available cash
    let purchasedQuantity = organInstance.purchase(cash);
  
    // Calculate the bonus quantities based on the purchased quantity and bonus ratio
    let bonusOrgans = {};
    let bonusQuantity= Math.floor(purchasedQuantity/bonus_ratio);
    if(!Number.isInteger(bonusQuantity) || bonusQuantity<0){
       bonusQuantity=0;
    }
    switch (organ.toLowerCase()) {
      case 'heart':      
          purchasedQuantity=bonusQuantity+purchasedQuantity;
          bonusOrgans['lung'] = 0;
          bonusOrgans['liver'] = 0;      
        break;
      case 'liver':
        
          bonusOrgans['lung'] = bonusQuantity;
          bonusOrgans['heart'] = 0;
        
        break;
      case 'lung':
       
          bonusOrgans['liver'] = bonusQuantity;
          bonusOrgans['heart'] = bonusQuantity;
       
        break;
      default:
        break;
    }
  
    // Generate the output string
    let output = `${organ} ${purchasedQuantity}`;
    for (const bonusOrgan in bonusOrgans) {
      output += `, ${bonusOrgan} ${bonusOrgans[bonusOrgan]}`;
    }
  
    return output;
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
            const output = processOrder(order);
            console.log(output);
        });
      });
  }
  
  // Process orders from the provided CSV file
  processOrdersFromFile('orders_example.csv');

  module.exports = {
    Organ,
    OrganFactory,
    Heart,
    Liver,
    Lung,
    processOrder,
    processOrdersFromFile
  };