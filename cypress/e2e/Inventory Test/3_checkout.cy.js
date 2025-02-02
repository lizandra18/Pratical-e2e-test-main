import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe("Inventory - Products", () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);    
  });

  it("Should do checkout with the correct flow", () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible').click();
    cy.get('[data-test="add-to-cart"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();  
    cy.get('[data-test="firstName"]').type('User');
    cy.get('[data-test="lastName"]').type('Test');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="finish"]').should('be.visible').click();
    cy.get('[data-test="title"]').should('be.visible').and('contain', 'Complete!');
    cy.get('[data-test="pony-express"]').should('be.visible');
    cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!');
    cy.get('[data-test="complete-text"]').should('be.visible').and('contain','Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    cy.get('[data-test="back-to-products"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it.only("Should select some products, go to cart, and go back to continue shopping", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', '1');
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', '2');
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', '3');
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]').should('be.visible');
    cy.get('[data-test="continue-shopping"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible');
  });

  it("Should not continue checkout with empty delivery information", () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible').click();
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
    cy.get('[data-test="checkout"]').should('be.visible').click(); 
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: First Name is required');
  });
});