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
  let transferAmount = "10";

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

  it("Verify Signup with Unique Username", () => {
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

  it("Verify Login with latest signup user", () => {
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

  it("5. Verify Saving Account creation", () => {
    cy.login(userName);
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

  it("6. Verify Account Overview page", () => {
    cy.login(userName);
    onHomePage.clickAccountOverviewLink();
    onAccountOverviewPage.verifyAccountOverviewPage();
    onAccountOverviewPage.checkAccountBalance(accountNumber);
  });

  it("7.Verify transfering money existing acccount", () => {
    //let accountNumber = "15120";
    cy.login(userName);
    onTransferFundsPage.visitTransferFundsPage();
    cy.wait(2000);
    onTransferFundsPage.typeTransferAmount(transferAmount);
    cy.log(`From Account Number: ${accountNumber}`);
    onTransferFundsPage.selectFromAccNumber(accountNumber);
    onTransferFundsPage.selectToAccNumber(accountNumber);
    onTransferFundsPage.clickTransferBtn();
    onTransferFundsPage.verifySuccessTransfer();
  });

  it("8. Verify Bill  Payments to third-party account", () => {
    //let accountNumber = "15120";
    cy.login(userName);
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
    cy.searchTransactionsAPI(userName, accountNumber, transferAmount);
  });
});
