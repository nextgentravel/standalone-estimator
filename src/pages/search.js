/* src/pages/search.js */
import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { Index } from "lunr"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchForm from "../components/search-form"
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
        displayExcerpt = `...${highlightedExcerpt.trim()}...`
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
      <main className="container mt-3" id="main-content">
        {searchQuery ? <h1>Search results</h1> : <h1>What are you looking for?</h1>}
        <hr className="mb-5" />
        <SearchForm initialQuery={searchQuery} placement="page" />
        {!fuzzy &&
          <>
            <h2 className="mt-4 mb-4">{results.length} search result{results.length !== 1 ? 's' : ''} for "{searchQuery}"</h2>
          </>
        }
        {fuzzy &&
          <>
            <h2 className="mt-4 mb-4">{results.length} search result{results.length !== 1 ? 's' : ''} for "{correctedTerms.join(', ')}"</h2>
            {results.length > 0 && <p className="lead mb-1">Showing results for <u>{correctedTerms.join(', ')}</u>.</p>}
            {results.length > 0 && <p className="lead"><small>Search instead for <a href="#" onClick={() => { searchInstead(searchQuery) }}>{searchQuery}</a>.</small></p>}
          </>
        }
        {results.length ? (
            results.map((result, index) => {
            return (
              <React.Fragment key={result.slug}>
                <article className={index === 0 ? 'card p-3': ''}>
                  {index === 0 && <p className="lead">Recommended</p>}
                  <h3>
                    <Link to={result.slug}>
                      {result.title || result.slug}
                    </Link>
                  </h3>
                  <p dangerouslySetInnerHTML={{__html: result.displayExcerpt}}></p>
                </article>
                {index !== 0 && <hr />}
              </React.Fragment>
            )
            })
        ) : (
            <p>No results were found for {searchQuery}.</p>
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