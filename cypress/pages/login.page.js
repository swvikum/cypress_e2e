/// <reference types="cypress" />

class LoginPage {
  username() {
    return cy.get('input[name="username"]').should("be.visible");
  }
  password() {
    return cy.get('input[name="password"]').should("be.visible");
  }
  loginBtn() {
    return cy.get('[value="Log In"]');
  }
  registerBtn() {
    return cy.get('[href="register.htm"]');
  }
  forgotPwdLink() {
    return cy.get('[href="lookup.htm"]');
  }

  visitLoginPage() {
    cy.visit("/index.htm");
  }

  verifyLoginPage() {
    cy.get("div#leftPanel > h2").should("have.text", "Customer Login");
  }

  typeUsername(userName) {
    cy.wait(2000);
    this.username().focus().type(userName);
  }

  typePassword(pwd) {
    this.password().type(pwd);
  }

  clickSubmit() {
    this.loginBtn().click();
  }

  doLogin(userName, pwd) {
    this.typeUsername(userName);
    this.typePassword(pwd);
    this.clickSubmit();
    return cy;
  }
}

export const onLoginPage = new LoginPage();
