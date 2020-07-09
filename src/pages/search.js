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
    results = index.search(q).map(({ ref, matchData }) => {
      return {
        slug: ref,
        metadata: matchData.metadata,
        ...store[ref],
      }
    })
  } catch (error) {
    console.log(error)
  }

  results = results.map((result) => {
    let positions = [];
    let terms = Object.keys(result.metadata);
    terms.forEach(term => {
      positions.push(result.metadata[term].content.position[0][0]);
    })

    positions.sort((a, b) => {
      return a - b;
    });

    let firstInstance = positions[0]
    let c = result.content;
    let excerpt = c.substring(firstInstance - 20, firstInstance + 200);
    let firstSpace = excerpt.indexOf(' ');
    let excerptTruncated = excerpt.substring(firstSpace, excerpt.length);
    let highlightedExcerpt = excerptTruncated;
    terms.forEach(term => {
      let replace = term;
      let re = new RegExp(replace, 'gi');
      highlightedExcerpt = highlightedExcerpt.replace(re, `<strong>${term}</strong>`);
    });
    highlightedExcerpt = `...${highlightedExcerpt.trim()}...`
    return {
      highlightedExcerpt,
      ...result,
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Search results" />
      <main className="container mt-3">
        {q ? <h1>Search results</h1> : <h1>What are you looking for?</h1>}
        <hr className="mb-5" />
        <SearchForm initialQuery={q} />
        <h2 className="mt-4 mb-4">{results.length} search results for "{q}"</h2>
        {results.length ? (
            results.map(result => {
            return (
              <>
                <article key={result.slug}>
                  <h3>
                    <Link to={result.slug}>
                      {result.title || result.slug}
                    </Link>
                  </h3>
                  <p dangerouslySetInnerHTML={{__html: result.highlightedExcerpt}}></p>
                </article>
                <hr />
              </>
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