/// <reference types="cypress" />

class AccountOverviewPage {

    verifyAccountOverviewPage(){
        cy.get('.title').should('have.text','Accounts Overview');
    }
  
    checkAccountBalance(accNumber){
        let text;
        cy.get('a.ng-binding').each(($e1, index, $list) => {

            text=$e1.text()
            cy.log(`Row Account Number: ${text} and Account Number ${accNumber}`);
            if(text.includes(accNumber)){     
                cy.get("tr > td:nth-of-type(2)").eq(index).then(function(balance)
                {
                 const priceText=   balance.text()
                 expect(priceText).to.equal('$100.00')
                })
            }
        
        }) 
    }

  }
  
  export const onAccountOverviewPage = new AccountOverviewPage();
  