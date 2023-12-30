/// <reference types="cypress" />

class TransferFundsPage {

    visitTransferFundsPage(){
        cy.visit('/transfer.htm');
    }
  
    typeTransferAmount(amount){
        cy.get('input#amount').should('have.value', '').type(amount);
    }

    selectFromAccNumber(accNumber){
        cy.get('#fromAccountId').select(accNumber).should('have.value', accNumber);
    }

    selectToAccNumber(accNumber){
        cy.get('#toAccountId').then(($select) => {
            // Get the options excluding the option with accountNumber
            const optionsWithoutAccountNumber = $select.find('option:not(:contains(accNumber))');

            // Select the first option from the filtered list
            const newValueToSelect = optionsWithoutAccountNumber.eq(0).val();

            // Perform the selection
             cy.get('#toAccountId').select(newValueToSelect).should('have.value', newValueToSelect);
    }) 
    }

    clickTransferBtn(){
        cy.get("input.button").should("be.enabled").click();
    }

    verifySuccessTransfer(){
        cy.get(".title").should("contain.text", "Transfer Complete!");
    }

  }
  
  export const onTransferFundsPage = new TransferFundsPage();
  