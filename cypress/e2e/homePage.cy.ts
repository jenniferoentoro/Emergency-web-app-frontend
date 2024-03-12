
describe("HomePage", () => {
  it("should render homepage then display content", () => {
    // Visit the homepage
    cy.visit("http://localhost:5173/");

  });

  it("should navigate to login page when Sign In button is clicked", () => {
    // Visit the homepage
    cy.visit("http://localhost:5173/");

    // Click on the Sign In button
    cy.contains("Sign In").click({ force: true });

    // Check if the URL has changed to the login page
    cy.url().should("include", "/login");
  });

  it("should navigate to register page when Sign Up button is clicked", () => {
    // Visit the homepage
    cy.visit("http://localhost:5173/");

    // Click on the Sign Up button
    cy.contains("Sign Up").click({ force: true });

   
  });
});
