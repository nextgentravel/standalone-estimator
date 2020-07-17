/* src/pages/search.js */
import React from "react"
import { Link, graphql } from "gatsby"
import { Index } from "lunr"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchForm from "../components/search-form"
import 'url-search-params-polyfill';
import { FaQuestionSign } from 'react-icons/fa';

// We can access the results of the page GraphQL query via the data props
const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  let fuzzy = false;
  let correctedTerms = [];
  // We can read what follows the ?q= here
  // URLSearchParams provides a native way to get URL params
  // location.search.slice(1) gets rid of the "?" 
  const params = new URLSearchParams(location.search.slice(1))
  const q = params.get("q")
  
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
    if (results.length === 0) {
      fuzzy = true;
      results = index.search(`${q}~2`).map(({ ref, matchData }) => {
        return {
          slug: ref,
          metadata: matchData.metadata,
          ...store[ref],
        }
      });
    }
  } catch (error) {
    console.log(error)
  }

  let allTerms = []

  results = results.map((result) => {
    let terms = Object.keys(result.metadata);
    let displayExcerpt = '';
    let foundInContent = false;
    let foundInTags = false;
    let positions = [];

    if (fuzzy) {
      terms.forEach(term => {
        if (foundInTags) {
          let start = result.metadata[term].tags.position[0][0];
          term = result.tags.substring(start, result.tags.length)
        }

        correctedTerms.indexOf(term) === -1 ? correctedTerms.push(term) : console.log('exists!');
      });
    }

    console.log(results)

    terms.forEach(term => {
      if ('content' in result.metadata[term]) {
        positions.push(result.metadata[term].content.position[0][0]);
        foundInContent = true;
      }
      if ('tags' in result.metadata[term]) {
        foundInTags = true;
      }
      allTerms.push(term);
    })

    positions.sort((a, b) => {
      return a - b;
    });


    if (foundInContent) {
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
      displayExcerpt = `...${highlightedExcerpt.trim()}...`
    } else if (foundInTags) {
      let split = result.tags.split(': ')
      let c = result.content;
      displayExcerpt = c.substring(0, 200);
      displayExcerpt = `<p class="lead">Suggestion based on <em>${split[0]}</em></p>${displayExcerpt.trim()}...`
    }

    return {
      displayExcerpt,
      ...result,
      terms,
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Search results" />
      <main className="container mt-3" id="main-content">
        {q ? <h1>Search results</h1> : <h1>What are you looking for?</h1>}
        <hr className="mb-5" />
        <SearchForm initialQuery={q} placement="page" />
        {!fuzzy &&
          <>
            <h2 className="mt-4 mb-4">{results.length} search result{results.length > 1 ? 's' : ''} for "{q}"</h2>
          </>
        }
        {fuzzy &&
          <>
            <h2 className="mt-4 mb-4">0 search result{results.length > 1 ? 's' : ''} for "{q}"</h2>
            <p className="lead">Did you mean <em>{correctedTerms}</em>?</p>
          </>
        }
        {results.length ? (
            results.map(result => {
            return (
              <React.Fragment key={result.slug}>
                <article>
                  <h3>
                    <Link to={result.slug}>
                      {result.title || result.slug}
                    </Link>
                  </h3>
                  <p dangerouslySetInnerHTML={{__html: result.displayExcerpt}}></p>
                </article>
                <hr />
              </React.Fragment>
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