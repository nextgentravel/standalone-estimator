/* src/pages/search.js */
import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { Index } from "lunr"
import Layout from "../components/layout"
import SEO from "../components/seo"
import 'url-search-params-polyfill';
import { useQueryParam, StringParam } from "use-query-params";

// We can access the results of the page GraphQL query via the data props
const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title  
  // LunrIndex is available via page query
  const { store } = data.LunrIndex
  // Lunr in action here
  const index = Index.load(data.LunrIndex.index)
  let [results, setResults] = useState([]);
  let [fuzzy, setFuzzy] = useState(false);
  let [correctedTerms, setCorrectedTerms] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useQueryParam('q', StringParam)

  const processSearchResult = (results) => {
    return results = results.map((result) => {
      let terms = Object.keys(result.metadata);
      let displayExcerpt = '';
      let foundInContent = false;
      let foundInTags = false;
      let positions = [];
    
      terms.forEach(term => {
        if ('content' in result.metadata[term]) {
          positions.push(result.metadata[term].content.position[0][0]);
          foundInContent = true;
        }
        if ('tags' in result.metadata[term]) {
          foundInTags = true;
        }
      })
  
      positions.sort((a, b) => {
        return a - b;
      });

      let corrected = [];

      terms.forEach(term => {
        if (foundInTags) {
          let start = result.metadata[term].tags.position[0][0];
          term = result.tags.substring(start, result.tags.length)
        }

        if (corrected.indexOf(term) === -1) corrected.push(term);
      });

      setCorrectedTerms(corrected)
  
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
        displayExcerpt = `${highlightedExcerpt.trim()}`
      } else if (foundInTags) {
        let c = result.content;
        displayExcerpt = c.substring(0, 200);
        displayExcerpt = `<p class="lead">Suggestion based on <em>${searchQuery}</em></p>${displayExcerpt.trim()}...`
      }
  
      return {
        displayExcerpt,
        ...result,
        terms,
      }
    })
  }

  const search = (q, fuzzy) => {
    let query = fuzzy ? `${searchQuery}~2` : q;
    return index.search(query).map(({ ref, matchData }) => {
      return {
        slug: ref,
        metadata: matchData.metadata,
        ...store[ref],
      }
    })
  };

  useEffect(() => {
    setResults([]);
    setFuzzy(false);
    setCorrectedTerms([]);
    try {
      let r = processSearchResult(search(searchQuery, false));
      if (r.length === 0) {
        r = processSearchResult(search(searchQuery, true));
        if (r.length > 0) setFuzzy(true);
      }
      setResults(r);
    } catch (error) {
      // console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const searchInstead = (q) => {
    setFuzzy(false);
    let r = processSearchResult(search(searchQuery, false));
    setResults(r);
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Search results" />
      <main className="container px-5 py-2" id="main-content">
        {searchQuery ? <h1 className="font-weight-bold">Search Results</h1> : <h1 className="font-weight-bold">What are you looking for?</h1>}
        <div className="p-1">
          {!fuzzy &&
            <>
              <p className="font-weight-bold text-secondary mt-2 mb-5">{results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
            </>
          }
          {fuzzy &&
            <>
              <p className="font-weight-bold text-secondary mt-2 mb-2">{results.length} result{results.length !== 1 ? 's' : ''} for "{correctedTerms.join(', ')}"</p>
              {results.length > 0 && <p className="font-italic text-secondary mb-5">Search instead for <a href="#" onClick={() => { searchInstead(searchQuery) }}>{searchQuery}</a>.</p>}
            </>
          }
          {results.length ? (
              results.map((result, index) => {
              return (
                <React.Fragment key={result.slug}>
                  <article className={index === 0 ? 'card border-dark p-3 mb-5': 'mb-5'}>
                    {index === 0 && <p className="text-secondary">Best Match</p>}
                    <h5>
                      <Link to={result.slug}>
                        {result.title || result.slug}
                      </Link>
                    </h5>
                    <p dangerouslySetInnerHTML={{__html: result.displayExcerpt}}></p>
                  </article>
                </React.Fragment>
              )
              })
          ) : (
              <p>No results were found for {searchQuery}.</p>
          )}
        </div>
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