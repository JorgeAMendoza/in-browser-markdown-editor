/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />
import createSaveDate from '../../src/utils/create-save-date';

describe('saving document with no local storage saves', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="menuButton"]').as('menuButton');
    cy.get('[data-cy="saveDocumentButton"]').as('saveDocumentButton');
  });

  it('document list should be empty', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').should('not.exist');
  });

  it('saving the inital welcome.md document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .find('h4')
      .should('contain.text', 'welcome.md');
  });

  it('creating new document and saving', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="newDocumentButton"]').click();

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .find('h4')
      .should('contain.text', 'new-document.md');
  });
});

describe('saving document with document in local storage', () => {
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
    cy.get('[data-cy="menuButton"]').as('menuButton');
    cy.get('[data-cy="saveDocumentButton"]').as('saveDocumentButton');
    cy.get('[data-cy="documentName"]').as('documentNameInput');
    cy.get('[data-cy="newDocumentButton"]').as('newDocumentButton');
  });

  it('document list should contain one item', () => {
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
  });

  it('saving the initial welcome.md document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').children().should('have.length', 2);
  });

  it('change name and conflict with document in local storage, cancel save', () => {
    cy.get('@documentNameInput').type('{selectAll}{backspace}my-doc.md');
    cy.get('@saveDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Duplicate document');

    cy.get('[data-cy="modalPrompt"]').find('button:nth-of-type(1)').click();
    cy.get('[data-cy="modalPrompt"]').should('not.exist');

    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .contains('my-doc.md');

    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .should('contain.text', '01 January 2022');
  });

  it('change name and conflict with document in local storage, confirm overwrite', () => {
    cy.get('@documentNameInput').type('{selectAll}{backspace}my-doc.md');
    cy.get('@saveDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .as('modalPrompt')
      .find('h3')
      .should('contain.text', 'Duplicate document');

    cy.get('@modalPrompt').find('button:nth-last-of-type(1)').click();
    cy.get('@modalPrompt').should('not.exist');

    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').children().should('have.length', 1);

    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .contains('my-doc.md');

    cy.get('[data-cy="documentList"]')
      .find('li:first-of-type')
      .should('contain.text', createSaveDate(new Date()));
  });

  it('saving a new document', () => {
    cy.get('@menuButton').click();
    cy.get('@newDocumentButton').click();

    cy.get('[data-cy="modalPrompt"]')
      .as('modalPrompt')
      .find('h3')
      .should('contain.text', 'Discard new document');

    cy.get('@modalPrompt').find('button:nth-of-type(2)').click();

    cy.get('[data-cy="documentList"]').children().should('have.length', 1);
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('[data-cy="documentList"]').find('li').contains('new-document.md');
  });
});
