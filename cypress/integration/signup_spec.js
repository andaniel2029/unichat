/* eslint-disable no-undef */
describe('User authentication', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should sign up a new (unique) user and display their name in the nav', () => {
    cy.get('button').contains('Join').click();
    cy.get('form').within(() => {
      cy.get('input:first').type('Shadee');
      cy.get('input').eq(1).type('Merhi');
      cy.get('input').eq(2).type('shadmerhi5@gmail.com');
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
    cy.get('p').contains('Shadee');
  })

  it('should not allow an existing user to sign up', () => {
    cy.get('button').contains('Logout').click();
    cy.get('button').contains('Join').click();
    cy.get('form').within(() => {
      cy.get('input:first').type('Shadee');
      cy.get('input').eq(1).type('Merhi');
      cy.get('input').eq(2).type('shadmerhi5@gmail.com');
      cy.get('input').eq(3).type('testing');
      cy.get('input').eq(4).type('testing');
      cy.get('button').contains('Next').click();
      cy.wait(1000);
    })
    cy.get('p').contains('The email address is already in use by another account.');
  })

  it('should log an existing user in', () => {
    cy.get('button').contains('Login').click();
    cy.get('form').within(() => {
      cy.get('input').eq(0).type('shadmerhi5@gmail.com');
      cy.get('input').eq(1).type('testing');
      cy.get('button').contains('Login').click();
      cy.wait(1500);
    })
    cy.get('p').contains('Chat Rooms');
  })
})