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
    }
  )


  cy.task('table', violationData)

  cy.task(
    'log',
    `\n\n`
  )


}

const reducedSiteMap = [
  "/",
  "/en",
  "/fr",
  "/fr/before",
  "/en/before",
  "/fr/booktravel",
  "/en/booktravel",
  "/fr/during",
  "/en/during",
  "/fr/after",
  "/en/after",
]
describe('accessibility', () => {
  reducedSiteMap.forEach(function(url) {
      it(`\n\n ${url} page should have appropriate accessibility \n\n`, () => {
          cy.visit(url).get("main").injectAxe();
          cy.checkA11y(null, null, (violations) => {
            terminalLog(violations, url)
          })
      });
  });        
});
