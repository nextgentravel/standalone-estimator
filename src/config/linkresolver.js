const linkResolver = ({ node, key, value }) => doc => {
    if (doc.type === "event") {
      return `/events/${doc.uid}`
    }
    if (doc.type === "travel_step") {
      return `/en/${doc.data.belongs_to.uid}`
    }
    if (doc.type === "travel_section") {
      return `/en/${doc.uid}`
    }  
    return `/en/${doc.uid}`
  }
  
  module.exports = linkResolver