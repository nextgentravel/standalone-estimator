/* src/pages/search.js */
import React from "react"
import { Link, graphql } from "gatsby"
import { Index } from "lunr"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchForm from "../components/search-form"

// We can access the results of the page GraphQL query via the data props
const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  
  // We can read what follows the ?q= here
  // URLSearchParams provides a native way to get URL params
  // location.search.slice(1) gets rid of the "?" 
  const params = new URLSearchParams(location.search.slice(1))
  const q = params.get("q") || ""
  
  // LunrIndex is available via page query
  const { store } = data.LunrIndex
  // Lunr in action here
  const index = Index.load(data.LunrIndex.index)
  let results = []

  try {
    // Search is a lunr method
    results = index.search(q).map(({ ref, matchData }) => {
      return {
        slug: ref,
        positions: matchData.metadata[q].content.position,
        ...store[ref],
      }
    })
  } catch (error) {
    console.log(error)
  }

  console.log('results', results)

  results = results.map((result) => {
    console.log('result.positions', result.positions)
    let highlightedContent = 'test'
    
    //   console.log('highlightedContent', highlightedContent)
    return {
    highlightedContent,
        ...result,
    }
  })

  console.log('results after highlight', results)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Search results" />
      <main className="container mt-3">
        {q ? <h1>Search results</h1> : <h1>What are you looking for?</h1>}
        <SearchForm initialQuery={q} />
        {results.length ? (
            results.map(result => {
            return (
                <article key={result.slug}>
                <h2>
                    <Link to={result.slug}>
                        {result.title || result.slug}
                    </Link>
                </h2>
                <p dangerouslySetInnerHTML={{__html: result.highlightedContent}}></p>
                </article>
            )
            })
        ) : (
            <p>No results were found for {q}.</p>
        )}
      </main>
    </Layout>
  )
}

export default SearchPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    LunrIndex
  }
`