/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />
import createSaveDate from '../../src/utils/create-save-date';

describe('switching documents', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setLocalStorage(
      'savedMarkdown',
      JSON.stringify({
        'my-doc.md': {
          documentMarkdown: 'this is a saved document',
          date: '01 January 2022',
        },
      })
    );
    cy.get('[data-cy="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-cy="previewTextArea"]').as('previewText');
    cy.get('[data-cy="documentName"]').as('documentNameInput');
    cy.get('[data-cy="menuButton"]').as('menuButton');
    cy.get('[data-cy="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-cy="saveDocumentButton"]').as('saveDocumentButton');
  });

  it('switch from welcome.md document, cancel switch', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').find('li').contains('my-doc.md').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document');

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(1)').click();
    cy.get('[data-cy="modalPrompt"]').should('not.exist');
    cy.get('@documentNameInput').should('contain.value', 'welcome.md');
  });

  it('switch from welcome.md document, discard the new document', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').find('li').contains('my-doc.md').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document');

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();
    cy.get('[data-cy="modalPrompt"]').should('not.exist');

    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
  });

  it('switch document, edit document and save', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').find('li').contains('my-doc.md').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document');

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('@menuButton').click();
    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
    cy.get('@markdownTextArea').type(
      '{selectAll}{backspace}The document has been edited'
    );
    cy.get('@menuButton').click();
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
    cy.get('[data-cy="documentList"]').find('li').contains('my-doc.md');

    cy.get('[data-cy="documentList"]')
      .find('li')
      .should('contain.text', createSaveDate(new Date()));
  });

  it('create new saved document, switch to my-doc.md', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-cy="documentList"]').children().should('have.length', 2);
    cy.get('[data-cy="documentList"]').find('li').contains('my-doc.md').click();
    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard changes');
    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('[data-cy="modalPrompt"]').should('not.exist');
    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
  });
});
