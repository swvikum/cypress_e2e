class BillPayPage
{
    typePayeeName(name){
        cy.get('input[name="payee.name"]').should('be.visible').type(name)
    }
      
    typeAddress(address){
        cy.get('input[name="payee.address.street"]').type(address)
    }
    
    typeCity(city){
        cy.get('input[name="payee.address.city"]').type(city)
    }
    
    typeState(state){
        cy.get('input[name="payee.address.state"]').type(state)
    }
    
    typeZipCode(zipCode){
        cy.get('input[name="payee.address.zipCode"]').type(zipCode)
    }

    typePhoneNumber(phoneNumber){
        cy.get('input[name="payee.phoneNumber"]').type(phoneNumber)
    }

    typeToAccNo(toAccNo){
        cy.get('input[name="payee.accountNumber"]').type(toAccNo)
    }

    typeVerifyToAccNo(toAccNo){
        cy.get('input[name="verifyAccount"]').type(toAccNo)
    }

    typeAmount(amount){
        cy.get('input[name="amount"]').type(amount)
    }

    selectFromAccount(accNo){
        cy.get('select[name="fromAccountId"]').select(accNo).should('have.value', accNo);
    }

    visitBillPayPage(){
        cy.visit('/billpay.htm')
    }

    clickSendPaymentBtn(){
        cy.get('.button[type="Submit"]').click();
    }

    VerifyBillPayment(){
        cy.get('[ng-show="showResult"]>.title').should('have.text','Bill Payment Complete');
    }
    
    doBillPay(firstName, lastName, address, city, state, zipCode, phoneNumber, ssn, userName, pwd, confirmPwd){
        //cy.intercept("POST", "https://cognito-idp.ap-southeast-2.amazonaws.com/").as("submitRegistartion");

        this.typeFirstName(firstName);
        this.typeLastName(lastName);
        this.typeAddress(address);
        this.typeCity(city);
        this.typeState(state);
        this.typeZipCode(zipCode);
        this.typePhoneNumber(phoneNumber);
        this.typeSSN(ssn);
        this.typeUserName(userName);
        this.typePassword(pwd);
        this.typeConfirmPassword(confirmPwd);
        this.clickRegisterButton();

        //cy.wait('@submitRegistartion');
    }
}

export const onBillPayPage = new BillPayPage();
