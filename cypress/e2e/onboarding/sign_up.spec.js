import { onHomePage } from "../../pages/home.page";
import { onSignUpPage } from "../../pages/signup.page";
import { onLoginPage } from "../../pages/login.page";
import { onGlobalPage } from "../../pages/global.page";
import { onAccountOpenPage } from "../../pages/account.open.page";
import { onAccountOverviewPage } from "../../pages/account.overview.page";
import { onTransferFundsPage } from "../../pages/transfer.funds.page";
import { onBillPayPage } from "../../pages/bill.pay.page";

describe("Verify User Signup", () => {

  let userName;
  let regoData;
  let billPayData;

  before(() => {
    cy.fixture("userSignup.json").then((data) => {
      regoData = data;
    });

    cy.fixture("billPayments.json").then((data) => {
      billPayData = data;
    });

    cy.generateUniqueUsername().then((uniqueUsername) => {
      userName = uniqueUsername;
      cy.log(`Generated unique username: ${userName}`);
    });
  });

  it("Verify Signup with correct required fileds", () => {
    cy.log(regoData.firstName);

    onSignUpPage.visitSignupPage();
    onSignUpPage.typeFirstName(regoData.firstName);
    onSignUpPage.typeLastName(regoData.lastName);
    onSignUpPage.typeAddress(regoData.address);
    onSignUpPage.typeCity(regoData.city);
    onSignUpPage.typeState(regoData.state);
    onSignUpPage.typeZipCode(regoData.zipCode);
    onSignUpPage.typePhoneNumber(regoData.phone);
    onSignUpPage.typeSSN(regoData.ssn);
    onSignUpPage.typeUserName(userName);
    onSignUpPage.typePassword(regoData.password);
    onSignUpPage.typeConfirmPassword(regoData.password);
    onSignUpPage.clickRegisterButton();

    onHomePage.checkSuccessRegisterText(regoData.SIGNUP_SUCCESS_MESSAGE);
  });

  it("Verify Signing-up with exiting username gives correct error", () => {
    cy.log(regoData.firstName);

    onSignUpPage.visitSignupPage();
    onSignUpPage.typeFirstName(regoData.firstName);
    onSignUpPage.typeLastName(regoData.lastName);
    onSignUpPage.typeAddress(regoData.address);
    onSignUpPage.typeCity(regoData.city);
    onSignUpPage.typeState(regoData.state);
    onSignUpPage.typeZipCode(regoData.zipCode);
    onSignUpPage.typePhoneNumber(regoData.phone);
    onSignUpPage.typeSSN(regoData.ssn);
    onSignUpPage.typeUserName(userName);
    onSignUpPage.typePassword(regoData.password);
    onSignUpPage.typeConfirmPassword(regoData.password);
    onSignUpPage.clickRegisterButton();

    onSignUpPage.checkErrMsgExistingUser(regoData.EXISTINGUSER_ERR_MESSAGE);
  });

  it("Login with Latest Signup User", () => {
    onLoginPage.visitLoginPage();
    onLoginPage.verifyLoginPage();
    onLoginPage.doLogin(userName, regoData.password);
    onHomePage.checkSuccessLoginTest(regoData.LOGIN_SUCCESS_MESSAGE);
  });

  
});
