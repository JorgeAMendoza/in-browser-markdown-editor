/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('testing markdown syntax', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="previewTextArea"]').as('previewTextArea');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('@markdownTextArea').focus().type('{selectAll}{backspace}');
  });

  it('headings rendered', () => {
    cy.get('@markdownTextArea').type('# Heading one{enter}');
    cy.get('@markdownTextArea').type('## Heading two{enter}');
    cy.get('@markdownTextArea').type('### Heading three{enter}');
    cy.get('@markdownTextArea').type('#### Heading four{enter}');
    cy.get('@markdownTextArea').type('##### Heading five{enter}');
    cy.get('@markdownTextArea').type('###### Heading six{enter}');

    cy.get('@previewTextArea').find('h1').should('contain.text', 'Heading one');
    cy.get('@previewTextArea').find('h2').should('contain.text', 'Heading two');
    cy.get('@previewTextArea')
      .find('h3')
      .should('contain.text', 'Heading three');
    cy.get('@previewTextArea')
      .find('h4')
      .should('contain.text', 'Heading four');
    cy.get('@previewTextArea')
      .find('h5')
      .should('contain.text', 'Heading five');
    cy.get('@previewTextArea').find('h6').should('contain.text', 'Heading six');
  });

  it('paragraphs rendered', () => {
    cy.get('@markdownTextArea').type(
      'I really like using markdown.{enter}{enter}'
    );
    cy.get('@markdownTextArea').type('I love using it with my GitHub Repos!');

    cy.get('@previewTextArea')
      .find('p:nth-child(1)')
      .should('contain.text', 'I really like using markdown');
    cy.get('@previewTextArea')
      .find('p:nth-child(2)')
      .should('contain.text', 'I love using it with my GitHub Repos!');
  });

  it('linebreak rendered', () => {
    cy.get('@markdownTextArea').type(
      'Creating a line break  {enter}the line break should be right here'
    );
    cy.get('@previewTextArea').find('br');
  });

  it('bold text rendered', () => {
    cy.get('@markdownTextArea').type('Creating bold text **here**');
    cy.get('@previewTextArea')
      .find('p')
      .find('strong')
      .should('contain.text', 'here');
  });

  it('italic text rendered', () => {
    cy.get('@markdownTextArea').type('Creating italic text *here*');
    cy.get('@previewTextArea')
      .find('p')
      .find('em')
      .should('contain.text', 'here');
  });

  it('bold and italic text rendered', () => {
    cy.get('@markdownTextArea').type(
      'Creating bold and italic text ***here***'
    );
    cy.get('@previewTextArea')
      .find('p')
      .find('em')
      .find('strong')
      .should('contain.text', 'here');
  });

  it('ordered list rendered', () => {
    cy.get('@markdownTextArea').type('1. First item{enter}');
    cy.get('@markdownTextArea').type('2. Second item{enter}');
    cy.get('@markdownTextArea').type('3. Third item');

    cy.get('@previewTextArea').find('ol').children().should('have.length', 3);
    cy.get('@previewTextArea')
      .find('ol')
      .find('li:nth-of-type(1)')
      .should('contain.text', 'First item');
  });

  it('unordered list rendered', () => {
    cy.get('@markdownTextArea').type('- First item{enter}');
    cy.get('@markdownTextArea').type('- Second item{enter}');
    cy.get('@markdownTextArea').type('- Third item');

    cy.get('@previewTextArea').find('ul').children().should('have.length', 3);
    cy.get('@previewTextArea')
      .find('ul')
      .find('li:nth-of-type(1)')
      .should('contain.text', 'First item');
  });

  it('ordered list inside of unordered list rendered', () => {
    cy.get('@markdownTextArea').type('- First item{enter}');
    cy.get('@markdownTextArea').type('- Second Item{enter}');
    cy.get('@markdownTextArea').type('    1. First numbered item{enter}');
    cy.get('@markdownTextArea').type('- Third item');

    cy.get('@previewTextArea').find('ul').children().should('have.length', 3);
    cy.get('@previewTextArea')
      .find('ul li > ol')
      .children()
      .should('have.length', 1);
    cy.get('@previewTextArea')
      .find('ul li > ol')
      .find('li')
      .should('contain.text', 'First numbered item');
  });

  it('blockquote rendered', () => {
    cy.get('@markdownTextArea').type(
      '> This is the first line in a blockquote{enter}'
    );
    cy.get('@markdownTextArea').type('>{enter}');
    cy.get('@markdownTextArea').type(
      '> This is the second line in the blockquote'
    );
    cy.get('@previewTextArea')
      .find('blockquote')
      .children()
      .should('have.length', 2);
    cy.get('@previewTextArea')
      .find('blockquote')
      .find('p:nth-of-type(1)')
      .should('contain.text', 'This is the first line in a blockquote');
    cy.get('@previewTextArea')
      .find('blockquote')
      .find('p:nth-of-type(2)')
      .should('contain.text', 'This is the second line in the blockquote');
  });

  it('codeblock rendered', () => {
    cy.get('@markdownTextArea').type('    This is some codeblock text');
    cy.get('@previewTextArea')
      .find('code')
      .should('contain.text', 'This is some codeblock text');
  });

  it('horizontal line rendered', () => {
    cy.get('@markdownTextArea').type('Line before the horizontal line{enter}');
    cy.get('@markdownTextArea').type('{enter}');
    cy.get('@markdownTextArea').type('***');

    cy.get('@previewTextArea').find('hr');
  });

  it('link rendered', () => {
    cy.get('@markdownTextArea').type(
      'My favorite website is [Youtube](https://youtube.com/)'
    );

    cy.get('@previewTextArea')
      .find('p')
      .find('a')
      .should('contain.text', 'Youtube');
    cy.get('@previewTextArea')
      .find('p')
      .find('a')
      .should('have.attr', 'href')
      .should('not.be.empty')
      .and('contain', 'https://youtube.com/');
  });

  it('image rendered', () => {
    cy.get('@markdownTextArea').type(
      '![Tux, the Linux mascot](https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1280px-Tux.svg.png)'
    );
    cy.get('@previewTextArea').find('img');
    cy.get('@previewTextArea')
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1280px-Tux.svg.png'
      );
    cy.get('@previewTextArea')
      .find('img')
      .should('have.attr', 'alt', 'Tux, the Linux mascot');
  });
});
