import { users, url } from "./Mock";
import { doSignIn } from "./Utils";

describe('Inventory - Products', () => {
   beforeEach(() => {
      cy.visit(url);

      doSignIn(users.standard_user);
   });

   it('Should not continue checkout with invalid delivery information (First Name and Last Name)', () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible').click();
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();
    cy.get('[data-test="firstName"]').type('123');
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: First name cannot have numbers');
    cy.get('[data-test="lastName"]').type('123');
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: Last name cannot have numbers');
   });

   it('Should not continue checkout with invalid delivery information (Zip/Postal Code)', () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible').click();
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();
    cy.get('[data-test="postalCode"]').type('abc');
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Error: Zip/Postal Code cannot contain letters');
   });
})