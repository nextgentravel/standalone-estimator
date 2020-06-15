const fetch = require("node-fetch");
const DomParser = require('dom-parser');
const parser = new DomParser();

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const getSiteMap = async () => {
  const result = await fetch('http://localhost:8000/sitemap.xml')
    .then(response => response.text())
    .then(str => (parser.parseFromString(str, "text/xml")))
    .then(str => (str.getElementsByTagName('loc')))
    .then(str => (str.map(node => {
      return node.firstChild.text.replace('https://travel-guidebook.herokuapp.com', '')
    }))).then(result => result)
    console.log(result)
  return result
}


 module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    table(message) {
      console.table(message)
      return null
    },
    async getSiteMapTask() {
      let result = await getSiteMap()
      return result
    },
  })
}
