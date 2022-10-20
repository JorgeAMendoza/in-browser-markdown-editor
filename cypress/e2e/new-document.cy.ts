/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('creating a new document from inital welcome page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="saveDocumentButton"]').as('saveDocumentButton');
    cy.get('[data-testid="newDocumentButton"]').as('newDocumentButton');
  });

  it('discard the welcome page document and move to new document', () => {
    cy.get('@menuButton').click();
    cy.get('@newDocumentButton').click();

    cy.get('[data-testid="modalPrompt"]');
    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'discard new document');
    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('[data-testid="modalPrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.value', 'new-document.md');
  });

  it('save welcome.md, discard the saved document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('@newDocumentButton').click();

    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'discard changes');

    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('[data-testid="modalPrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.value', 'new-document.md');
  });
});
