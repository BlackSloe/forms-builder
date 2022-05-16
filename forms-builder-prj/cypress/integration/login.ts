describe('/', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to login page if not logged in', () => {
    cy.location('pathname').should('eq', '/login');
  });

  describe('navbar component', () => {
    it('should have text to log in', () => {
      cy.get(`[cyid="navbar-header"]`).should('have.text', 'You need to log in');
    });
  });

  describe('login component', () => {
    it('should have login form', () => {
      cy.get(`[cyid="login-form"]`).should('exist');
    });

    it('should not login on non-existing user', () => {
      cy.get(`[cyid="login-form-user-name"]`).type('1222222222');
      cy.get(`[cyid="login-form-user-password"]`).type('33333');

      cy.get(`[cyid="login-form-login-btn"]`).click();

      cy.location('pathname').should('eq', '/login');

      cy.get(`[cyid="navbar-header"]`).should('have.text', 'You need to log in');
    });

    it('should login successfully and go to homepage', () => {
      cy.get(`[cyid="login-form-user-name"]`).type('qwerty');
      cy.get(`[cyid="login-form-user-password"]`).type('qwerty');

      cy.get(`[cyid="login-form-login-btn"]`).click();

      cy.location('pathname').should('eq', '/homepage');

      cy.get(`[cyid="navbar-header"]`).should('have.text', 'Hello, qwerty');
    });

    it('should have register link', () => {
      cy.get('[cyid="signup-link"]').should('exist');
    });

    it('should redirect on signup link click', () => {
      cy.get('[cyid="signup-link"]').click();
      cy.location('pathname').should('eq', '/signup');
    });
  });
});
