// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("searchTransactions", (userName, accNo) => {
  cy.request({
    method: "GET",
    url: `http://localhost:8080/parabank/services_proxy/bank/accounts/${accNo}/transactions/amount/10`,
    auth: {
      username: userName,
      password: "Test@123",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).length.to.be.greaterThan(0);
    cy.log(JSON.stringify(response.body));
  });
});

Cypress.Commands.add("generateUniqueUsername", () => {

  //let timestamp = new Date().getTime();
  let randomString = Math.random().toString(36).substring(7);
  let uniqueUsername = `autotester${randomString}`;
  cy.log(`unique username: ${uniqueUsername}`);
  return cy.wrap(uniqueUsername);
});
