describe('/signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });
  
    it('should have route /signup', () => {
      cy.location('pathname').should('eq', '/signup');
    });
  
    describe('navbar component', () => {
      it('should have text to log in', () => {
        cy.get(`[cyid="navbar-header"]`).should('have.text', 'You need to log in');
      });
    });
  
    describe('signup component', () => {
      it('should have signup form', () => {
        cy.get(`[cyid="signup-form"]`).should('exist');
      });
  
      it('should signup', () => {
        cy.get(`[cyid="signup-form-user-name"]`).type('1222222222');
        cy.get(`[cyid="signup-form-user-password"]`).type('33333');
  
        cy.get(`[cyid="signup-form-signup-btn"]`).click();
  
        cy.location('pathname').should('eq', '/signup');
  
        cy.get(`[cyid="navbar-header"]`).should('have.text', 'You need to log in');
      });
  
      it('should have login link', () => {
        cy.get('[cyid="login-link"]').should('exist');
      });
  
      it('should redirect on login link click', () => {
        cy.get('[cyid="login-link"]').click();
        cy.location('pathname').should('eq', '/login');
      });
    });
  });
  