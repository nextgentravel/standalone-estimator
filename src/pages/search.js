/* src/pages/search.js */
import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import 'url-search-params-polyfill';
import { useQueryParam, StringParam } from "use-query-params";

import { useIntl } from 'react-intl';

function escapeRegExp(str) {
  return str.replace(/[-s/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const Highlighted = ({text = '', highlight = ''}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi')
  const parts = text.split(regex)
  return (
    <span>
       {parts.filter(part => part).map((part, i) => (
           regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
       ))}
   </span>
  )
}

// We can access the results of the page GraphQL query via the data props
const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const intl = useIntl()
  const langKey = intl.locale;

  // LunrIndex is available via page query
  let lunr = typeof window !== `undefined` ? window.__LUNR__[langKey] : '';
  const { store } = lunr
  // Lunr in action here
  const index = lunr.index
  let [results, setResults] = useState([]);
  let [fuzzy, setFuzzy] = useState(false);
  let [correctedTerms, setCorrectedTerms] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useQueryParam('q', StringParam)

  const processSearchResult = (results) => {
    return results = results.map((result) => {
      let terms = Object.keys(result.metadata);
      let displayExcerpt = '';
      let positions = [];

      positions.sort((a, b) => {
        return a - b;
      });

      let corrected = [];

      terms.forEach(term => {
        if (corrected.indexOf(term) === -1) corrected.push(term);
      });

      setCorrectedTerms(corrected)

      let c = result.content;
      displayExcerpt = `${c}`

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
    console.log('r!!!???')
    try {
      let r = processSearchResult(search(searchQuery, false));
      console.log('First result:', r)
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
      <main className="container" id="main-content">
        {searchQuery ? <h2 className="font-weight-bold">Search Results</h2> : <h2 className="font-weight-bold">What are you looking for?</h2>}
        <div className="p-1">
          {!fuzzy &&
            <>
              <p className="font-weight-bold mt-2 mb-5">{results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
            </>
          }
          {fuzzy &&
            <>
              <p className="font-weight-bold mt-2 mb-2">{results.length} result{results.length !== 1 ? 's' : ''} for "{correctedTerms.join(', ')}"</p>
              {results.length > 0 && <p className="font-italic text-secondary mb-5">Search instead for <a href="#!" onClick={() => { searchInstead(searchQuery) }}>{searchQuery}</a>.</p>}
            </>
          }
          {results.length ? (
              results.map((result, index) => {
                console.log(result);
                return (
                  <React.Fragment key={result.slug}>
                    <article className={index === 0 ? 'card border-dark p-3 mb-5': 'mb-5'}>
                      {index === 0 && <p className="text-secondary">Best Match</p>}
                      <h3>
                        <Link to={`/${langKey}/${result.parent_page}`}>
                          {result.title || result.slug}
                        </Link>
                      </h3>
                      <Highlighted text={result.displayExcerpt} highlight={searchQuery}/>
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
  }
`
