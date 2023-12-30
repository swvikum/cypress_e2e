/// <reference types="cypress" />

class HomePage {
  getSearchField() {
    return cy.get("[data-testid=input]");
  }

  getStartedBtn() {
    return cy.get("[type=submit]");
  }

  logOut() {
    cy.get("a").contains("Log Out").click();
  }

  visitHomePage() {
    cy.visit("/index.htm");
    cy.wait(1000);
  }

  clickRegisterBtn() {
    cy.get('[href="register.htm"]').click().wait(1000);
  }

  clickForgotPasswordLink() {
    cy.get('[href="lookup.htm"]').click({ force: true });
  }

  clickOpenAccountLink() {
    cy.get('[href="/parabank/openaccount.htm"]').should('be.visible').click();
  }

  clickAccountOverviewLink() {
    cy.get('[href="/parabank/overview.htm"]').should('be.visible').click();
  }

  checkSuccessRegisterText(text){
    cy.get('div#rightPanel p').should('contain.text', text);
  }

  checkSuccessLoginTest(text){
    cy.wait(2000);
    cy.get('p > b').should('contain.text', text);
  }
}

export const onHomePage = new HomePage();
