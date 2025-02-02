import { users, url } from "./Mock";

describe('Inventory - Login', () => {
    it('Should login with valid credentials', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.contains('Products');
    });
    

    it('Should login with valid credentials and do logout', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.standard_user.username);
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.contains('Products');

      cy.get('[id="react-burger-menu-btn"]').click();
      cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();

      cy.url().should('eql', url);
    });


    it('Should not login with invalid credentials', () => {
      cy.visit(url);
      
      cy.get('[data-test="username"]').type('test');
      cy.get('[data-test="password"]').type(users.standard_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });


    it('Should not allow "locked_out_user" do sign in', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.locked_out_user.username);
      cy.get('[data-test="password"]').type(users.locked_out_user.password);
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]').should('be.visible').and('contain','Epic sadface: Sorry, this user has been locked out.');
    });


    it('Should login with "performance_glitch_user" and wait the products page loads', () => {
      cy.visit(url);

      cy.get('[data-test="username"]').type(users.performance_glitch_user.username);
      cy.get('[data-test="password"]').type(users.performance_glitch_user.password);
      cy.get('[data-test="login-button"]').click();
 
      cy.get('[data-test="inventory-list"]').should('be.visible');
    });

  })