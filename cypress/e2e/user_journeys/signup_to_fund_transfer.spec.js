import { onHomePage } from "../../pages/home.page";
import { onSignUpPage } from "../../pages/signup.page";
import { onLoginPage } from "../../pages/login.page";
import { onGlobalPage } from "../../pages/global.page";
import { onAccountOpenPage } from "../../pages/account.open.page";
import { onAccountOverviewPage } from "../../pages/account.overview.page";
import { onTransferFundsPage } from "../../pages/transfer.funds.page";
import { onBillPayPage } from "../../pages/bill.pay.page";

describe("Verify Signup to Fund Transfer User Journey", () => {
  let accountNumber;
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

  it("sign up with unique username", () => {
    cy.log(regoData.firstName);
    onSignUpPage.visitSignupPage();
    onSignUpPage.doSignUp(
      regoData.firstName,
      regoData.lastName,
      regoData.address,
      regoData.city,
      regoData.state,
      regoData.zipCode,
      regoData.phone,
      regoData.ssn,
      userName,
      regoData.password,
      regoData.password
    );
    onHomePage.checkSuccessRegisterText(regoData.SIGNUP_SUCCESS_MESSAGE);
  });

  it("login with latest signup user", () => {
    onLoginPage.visitLoginPage();
    onLoginPage.verifyLoginPage();
    onLoginPage.doLogin(userName, regoData.password);
    onHomePage.checkSuccessLoginTest(regoData.LOGIN_SUCCESS_MESSAGE);
  });

  it("Verify Global Navigation Bar working as expected", () => {
    onHomePage.visitHomePage();
    onGlobalPage.verifyGlobalHomeBtn();
    onGlobalPage.verifyGlobalAboutUsBtn();
    onGlobalPage.verifyGlobalContactBtn();

    onGlobalPage.verifyLeftMenuAboutLink();
  });

  it("5. verify creation saving account", () => {
    onHomePage.visitHomePage();
    onLoginPage.doLogin(userName, regoData.password);
    onHomePage.clickOpenAccountLink();
    onAccountOpenPage.verifyOpenAccountPage();
    onAccountOpenPage.selectAccountType("SAVINGS");
    //cy.get('#type').select('SAVINGS').should('have.value','1');
    //cy.get('#fromAccountId').select(0);
    onAccountOpenPage.clickOpenAccountBtn();
    cy.wait(2000);
    onAccountOpenPage.captureNewAccountId().then((capturedNumber) => {
      accountNumber = capturedNumber;
    });
    cy.log(`Captured Account Number: ${accountNumber}`);
  });

  it("6. verify account overview page", () => {
    onHomePage.visitHomePage();
    onLoginPage.doLogin(userName, regoData.password);
    onHomePage.clickAccountOverviewLink();
    onAccountOverviewPage.verifyAccountOverviewPage();
    onAccountOverviewPage.checkAccountBalance(accountNumber);
  });

  it("7. verify transfering money amoung the accounts", () => {
    //let accountNumber = "15120";
    onHomePage.visitHomePage();
    onLoginPage.doLogin(userName, regoData.password);
    onTransferFundsPage.visitTransferFundsPage();
    cy.wait(2000);
    onTransferFundsPage.typeTransferAmount(10);
    cy.log(`From Account Number: ${accountNumber}`);
    onTransferFundsPage.selectFromAccNumber(accountNumber);
    onTransferFundsPage.selectToAccNumber(accountNumber);
    onTransferFundsPage.clickTransferBtn();
    onTransferFundsPage.verifySuccessTransfer();
  });

  it("8. verify bill payments with created account", () => {
    //let accountNumber = "15120";
    onHomePage.visitHomePage();
    onLoginPage.doLogin(userName, regoData.password);
    onBillPayPage.visitBillPayPage();
    onBillPayPage.doBillPay(
      billPayData.payeeName,
      billPayData.address,
      billPayData.city,
      billPayData.state,
      billPayData.zipCode,
      billPayData.phone,
      billPayData.toAccNumber,
      billPayData.amount,
      accountNumber
    );
    onBillPayPage.VerifyBillPayment();
  });

  it("9. Verify Transaction Search API call", () => {
    //let accountNumber = "13899";
    cy.searchTransactions(userName, accountNumber);
  });
});
