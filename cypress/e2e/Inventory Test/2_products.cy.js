import { users, url } from './Mock';
import { doSignIn } from './Utils';

describe('Inventory - Products', () => {
  beforeEach(() => {
    cy.visit(url);

    doSignIn(users.standard_user);
  });

  it('Should see the product details and add to cart', () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible').click();
    cy.get('[data-test="inventory-item-desc"]').should('be.visible');
    cy.get('[data-test="add-to-cart"]').should('be.visible').click();
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', '1');

  });

  it('Should sort products by price properly (high to low)', () => {
    cy.get('[data-test="product-sort-container"]').should('be.visible').select('hilo');
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const pricesArray = [...$prices].map(price =>
        parseFloat(price.innerText.replace('$', ''))
      );

      const isSorted = pricesArray.every((price, index) => {
        if (index === 0) return true;
        return price <= pricesArray[index -1];
      });

      expect(isSorted).to.be.true;
    });
  });

  it('Should sort products by price properly (low to high)', () => {
    cy.get('[data-test="product-sort-container"]').should('be.visible').select('lohi');
    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const pricesArray = [...$prices].map(price =>
        parseFloat(price.innerText.replace('$', ''))
      );

      const isSorted = pricesArray.every((price, index) => {
        if (index === 0) return true;
        return price >= pricesArray[index -1];
      });

      expect(isSorted).to.be.true;
    });
  });
});
