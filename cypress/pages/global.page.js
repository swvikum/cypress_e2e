/// <reference types="cypress" />

class GlobalPage {

  getHeaderWelcome() {
    return cy.get('.smallText');
  }

  getHeaderSignup() {
    return cy.get('[data-testid="global-login-link"]');
  }

  visitHomePage() {
    cy.visit('/');
    cy.wait(0);
  }

  verifyGlobalHomeBtn(){
    cy.get('.home > a').should('be.visible').click();
    cy.url().should('include', 'index.htm');
  }

  verifyGlobalAboutUsBtn(){
    cy.get('.aboutus > a').should('be.visible').click();
    cy.url().should('include', 'about.htm');
  }

  verifyGlobalContactBtn(){
    cy.get('.contact > a').should('be.visible').click();
    cy.url().should('include', 'contact.htm');
  }

  verifyLeftMenuAboutLink(){
    cy.get('.leftmenu [href="about\\.htm"]').should('be.visible').click();
    cy.url().should('include', 'about.htm');
  }

  logOut() {
    cy.get("a").contains("Log Out").click();
  }
}

export const onGlobalPage = new GlobalPage();
