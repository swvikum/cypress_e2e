/// <reference types="cypress" />

class AccountOpenPage {


    verifyOpenAccountPage(){
        cy.get('.title').should('have.text','Open New Account');
    }
  
    selectAccountType(accountType){
        cy.get('#type').select(accountType).should('have.value', accountType === 'SAVINGS' ? '1' : '0');
    }

    clickOpenAccountBtn(){
        cy.wait(2000);
        //cy.get('input').should('be.enabled').type('{enter}');
        cy.get('input').should('be.enabled').click({force:true});
    }

    captureNewAccountId() {
        return cy.get('#newAccountId').invoke('text').then((accountIdText) => {
          let accountNumber = accountIdText.trim();
          cy.log(`Captured account ID: ${accountNumber}`);
          return cy.wrap(accountNumber); // Wrap the synchronous value to make it a Cypress command
        });
      }

  }
  
  export const onAccountOpenPage = new AccountOpenPage();
  