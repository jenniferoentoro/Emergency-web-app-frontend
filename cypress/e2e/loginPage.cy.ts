import loginPage from "./pages/loginPage";

describe('Login Page', () => {

  beforeEach(() => {
    loginPage.navigateTo();
  });

  it('should display the login form', () => {
    loginPage.getLoginForm().should('be.visible');
  });

  it('should have the correct form fields', () => {
    loginPage.getUsernameInput().should('exist');
    loginPage.getPasswordInput().should('exist');
    loginPage.getLoginButton().should('exist');
  });

  it('should show error message for invalid login', () => {
    loginPage.fillLoginForm('invalid_username', 'invalid_password');
    loginPage.submitLoginForm();
    cy.get('.swal2-popup').should('exist');
  cy.get('.swal2-popup').should('contain.text', 'Invalid username or password');
  });
  

  it('should navigate to the home page on successful login', () => {
    loginPage.fillLoginForm('c14200152', 'jenjen123');
    loginPage.submitLoginForm();
  
    cy.url().should(url => {
      expect(url).to.include('http://localhost:5173/home');
    });
  });
  
  
});
