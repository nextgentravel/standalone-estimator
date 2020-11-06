const linkResolver = ({ node, key, value }) => doc => {
    if (doc.type === "event") {
      return `/events/${doc.uid}`
    }
    if (doc.type === "page") {
      return `/${doc.uid}`
    }  
    return `/${doc.uid}`
  }
  
  module.exports = linkResolver