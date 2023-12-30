class SignUpPage
{
    typeFirstName(firstName){
        cy.get('#customer\\.firstName').should('be.visible').type(firstName)
    }
    
    typeLastName(lastName){
        cy.get('#customer\\.lastName').type(lastName)
    }
    
    typeAddress(address){
        cy.get('#customer\\.address\\.street').type(address)
    }
    
    typeCity(city){
        cy.get('#customer\\.address\\.city').type(city)
    }
    
    typeState(state){
        cy.get('#customer\\.address\\.state').type(state)
    }
    
    typeZipCode(zipCode){
        cy.get('#customer\\.address\\.zipCode').type(zipCode)
    }

    typePhoneNumber(phoneNumber){
        cy.get('#customer\\.phoneNumber').type(phoneNumber)
    }

    typeSSN(ssn){
        cy.get('#customer\\.ssn').type(ssn)
    }

    typeUserName(userName){
        cy.get('#customer\\.username').type(userName)
    }

    typePassword(pwd){
        cy.get('#customer\\.password').type(pwd)
    }

    typeConfirmPassword(confirmPwd){
        cy.get('#repeatedPassword').type(confirmPwd)
    }

    clickRegisterButton(){
        // cy.findByTestId("submit-signup").click();
        cy.get('[value="Register"]').click();
    }

    visitSignupPage(){
        cy.visit('/register.htm')
    }
    
    doSignUp(firstName, lastName, address, city, state, zipCode, phoneNumber, ssn, userName, pwd, confirmPwd){
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

export const onSignUpPage = new SignUpPage();
