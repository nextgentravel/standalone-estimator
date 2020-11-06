const linkResolver = ({ node, key, value }) => doc => {
    console.log('doc.type', doc.type);
    if (doc.type === "travel_step") {
      console.log('doc.data.belongs_to.uid', doc.data.belongs_to.uid)
      return `/en/${doc.data.belongs_to.uid}`
    }
    if (doc.type === "travel_section") {
      return `/en/${doc.uid}`
    }  
    return `/en/${doc.uid}`
  }
  
  module.exports = linkResolver