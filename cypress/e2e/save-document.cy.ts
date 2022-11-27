/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />
import createSaveDate from '../../src/utils/create-save-data';

describe('saving document with no local storage saves', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="saveDocumentButton"]').as('saveDocumentButton');
  });

  it('document list should be empty', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 0);
  });

  it('saving the inital welcome.md document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .find('li:first-of-type')
      .find('h4')
      .should('contain.text', 'welcome.md');
  });

  it('creating new document and saving', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .find('li:first-of-type')
      .find('h4')
      .should('contain.text', 'new-doc.md');
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
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="saveDocumentButton"]').as('saveDocumentButton');
    cy.get('[data-testid="documentName"]').as('documentNameInput');
    cy.get('[data-testid="newDocumentButton"]').as('newDocumentButton');
  });

  it('document list should contain one item', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
  });

  it('saving the initial welcome.md document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 2);
  });

  it('change name and conflict with document in local storage, cancel save', () => {
    cy.get('@documentNameInput').type('{selectAll}{backspace} my-doc.md');
    cy.get('@documentSaveButton').click();

    cy.get('@modalPrompt')
      .find('h2')
      .should('contain.text', 'document already exist');

    cy.get('@modalPrompt').find('button:nth-last-of-type(1)').click();
    cy.get('@modalPrompt').should('not.exist');

    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .find('div p')
      .should('contain.text', '01 January 2022');
  });

  it('change name and conflict with document in local storage, confirm overwrite', () => {
    cy.get('@documentNameInput').type('{selectAll}{backspace} my-doc.md');
    cy.get('@documentSaveButton').click();

    cy.get('@modalPrompt')
      .find('h2')
      .should('contain.text', 'document already exist');

    cy.get('@modalPrompt').find('button:nth-last-of-type(2)').click();
    cy.get('@modalPrompt').should('not.exist');

    cy.get('@documentNameInput').should('contain.value', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);

    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .find('div p')
      .should('contain.text', createSaveDate(new Date(0)));
  });

  it('saving a new document', () => {
    cy.get('@newDocumentButton').click();
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-testid="documentList"]').children().should('have.length', 2);
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('new-document.md')
      .find('div p')
      .should('contain.text', createSaveDate(new Date(0)));
  });
});
