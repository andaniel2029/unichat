describe("Sign up new user", () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should sign up a new (unique) user and display their name in the nav', () => {
    cy.get('button').contains('Join').click();
    cy.get('form').within(() => {
      cy.get('input:first').type('Unique');
      cy.get('input').eq(1).type('User');
      cy.get('input').eq(2).type('uniqueuser@gmail.com');
      cy.get('input').eq(3).type('testing');
      cy.get('input').eq(4).type('testing');
      cy.get('button').contains('Next').click();
    })
    cy.get('button').contains('Join', { timeout: 2000 }).should('be.visible');
    cy.wait(1000);
    cy.get('div').contains('Software').click();
    cy.wait(1000);
    cy.get('button').contains('Join').click();
    cy.wait(2000);
    cy.get('p').contains('Chat Rooms');
    cy.get('p').contains('Unique');
  });
})