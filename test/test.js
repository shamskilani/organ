const assert = require('assert');
const {Lung,Liver,Heart, Organ, OrganFactory, processOrder,processOrdersFromFile } = require('../index.js');


describe('Organ', () => {
    describe('purchase', () => {
      it('should calculate the correct quantity of organs to purchase', () => {
        const organ = new Organ('Heart', 1000);
        assert.strictEqual(organ.purchase(3000), 3); // 3000 / 1000 = 3
      });
    });
  });

  describe('OrganFactory', () => {
    describe('createOrgan', () => {
      it('should create a Heart organ', () => {
        const heart = OrganFactory.createOrgan('heart', 1000);
        assert.strictEqual(heart.type, 'Heart');
        assert.strictEqual(heart.price, 1000);
      }); 
    });
  });

  

describe('processOrder', () => {
  it('should return the correct output for a heart order with no bonus organs', () => {
    const order = {
      organ: 'heart',
      cash: 1000,
      price: 500,
      bonus_ratio: 2
    };
    const expectedOutput = 'heart 3, lung 0, liver 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for a liver order with bonus lungs', () => {
    const order = {
      organ: 'liver',
      cash: 2000,
      price: 1000,
      bonus_ratio: 2
    };
    const expectedOutput = 'liver 2, lung 1, heart 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for a lung order with bonus livers and hearts', () => {
    const order = {
      organ: 'lung',
      cash: 3000,
      price: 1500,
      bonus_ratio: 3
    };
    const expectedOutput = 'lung 2, liver 0, heart 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an unknown organ type', () => {
    const order = {
      organ: 'unknown',
      cash: 1000,
      price: 500,
      bonus_ratio: 2
    };
    assert.throws(() => processOrder(order), Error);
  });

  it('should return the correct output for an order with zero cash', () => {
    const order = {
      organ: 'heart',
      cash: 0,
      price: 500,
      bonus_ratio: 2
    };
    const expectedOutput = 'heart 0, lung 0, liver 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an order with zero price', () => {
    const order = {
      organ: 'heart',
      cash: 1000,
      price: 0,
      bonus_ratio: 2
    };
    const expectedOutput = 'heart 0, lung 0, liver 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an order with zero bonus ratio', () => {
    const order = {
      organ: 'liver',
      cash: 2000,
      price: 1000,
      bonus_ratio: 0
    };
    const expectedOutput = 'liver 2, lung 0, heart 0';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an order with negative cash', () => {
    const order = {
      organ: 'heart',
      cash: -1000,
      price: 500,
      bonus_ratio: 2
    };
    const expectedOutput = '';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an order with negative price', () => {
    const order = {
      organ: 'heart',
      cash: 1000,
      price: -500,
      bonus_ratio: 2
    };
    const expectedOutput = '';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });

  it('should return the correct output for an order with negative bonus ratio', () => {
    const order = {
      organ: 'lung',
      cash: 3000,
      price: 1500,
      bonus_ratio: -3
    };
    const expectedOutput = '';
    const output = processOrder(order);
    assert.strictEqual(output, expectedOutput);
  });
});

  
  
  
