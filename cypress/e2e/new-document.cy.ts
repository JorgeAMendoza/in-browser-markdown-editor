/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('creating a new document from inital welcome page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-cy="documentName"]').as('documentNameInput');
    cy.get('[data-cy="menuButton"]').as('menuButton');
    cy.get('[data-cy="saveDocumentButton"]').as('saveDocumentButton');
    cy.get('[data-cy="newDocumentButton"]').as('newDocumentButton');
  });

  it('discard the welcome page document and move to new document', () => {
    cy.get('@menuButton').click();
    cy.get('@newDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document');
    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('[data-cy="modalPrompt"]').should('not.exist');
    cy.get('@documentNameInput').should('contain.value', 'new-document.md');
  });

  it('save welcome.md, discard the saved document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('@newDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard changes');

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('[data-cy="modalPrompt"]').should('not.exist');
    cy.get('@documentNameInput').should('contain.value', 'new-document.md');
  });

  it('invalid document name, modal appears', () => {
    cy.get('@documentNameInput').type('{selectAll}{backspace}bad-name.m');
    cy.get('@saveDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Invalid document name');
    cy.get('[data-cy="modalPrompt"]').find('button').click();
    cy.get('[data-cy="modalPrompt"]').should('not.exist');
  });
});
