

function terminalLog(violations, url) {

  cy.task(
    'log',
    `\n\n ${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected \n at URL ${url}`
  )

  const violationData = violations.map(violation => {
    console.log('##', violation)
    let id = violation.id;
    let impact = violation.impact;
    let description = violation.description;
    let nodes = violation.nodes;
    let nodeString = ''
    nodes.forEach((node, index) => {
      index === 0 ? nodeString = node.html : nodeString = nodeString + ', ' + node.html
    })
    return {
      id,
      impact,
      description,
      nodes: nodes.length,
      tags: nodeString
    }
  })


  cy.task('table', violationData)

  cy.task(
    'log',
    `\n\n`
  )
}

describe('accessibility', function () {
  const siteMap = ['en','fr']
  // change back to require('../../sitemap.json')
  it('has imported sitemap', function () {
    expect(siteMap).to.be.an('array')
  })

  siteMap.forEach(url => {
    it(`\n\n ${url} page should have appropriate accessibility \n\n`, () => {
      cy.visit(url).get("main").injectAxe();
      cy.checkA11y(null, null, (violations) => {
        terminalLog(violations, url)
      })
    });

    it(`\n\n display a load spinner when start is clicked \n\n`, () => {
      const departDate = Cypress.moment().add(1, 'day').format('YYYY-MM-DD')
      const returnDate = Cypress.moment().add(5, 'day').format('YYYY-MM-DD')

      cy.get('#origin').type('ottaw{downarrow}{enter}')
      cy.get('#destination').type('calga{downarrow}{enter}')
      cy.get('#departureDate').type(`${departDate}`)
      cy.get('#returnDate').type(`${returnDate}`)
      cy.get('button').first().click()
      cy.get('.fa-spin').should('be.visible')
    });

    it(`\n\n Expanded page should have appropriate accessibility \n\n`, () => {
      cy.get('#transportation_container', {timeout:15000}).should('be.visible');
      cy.get("main").injectAxe();
      cy.checkA11y(null, null, (violations) => {
        terminalLog(violations, url)
      })
    });

    it(`\n\n should pass accessibility tests on flight modal \n\n`, () => {
      url === 'fr' ? cy.get('select').eq(1).select('Vol') : cy.get('select').eq(1).select('Flight')
      cy.get('.transportation-message>span').eq(1).children().click()
      cy.checkA11y(null, null, (violations) => {
        terminalLog(violations, url)
      })
    });

  });
});
