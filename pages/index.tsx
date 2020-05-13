import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { Results } from '../components'
import { algolia } from '../lib'
import { SearchResults } from '../types'

interface Props {
  query: string
  results: SearchResults
}

const Home: NextPage<Props> = ({ query, results }) => {
  const { replace } = useRouter()

  return (
    <>
      <Head>
        <title>Search / Dota</title>
      </Head>

      <main>
        {!query && <p className="mb-4">Start typing to search.</p>}
        <input
          autoFocus
          defaultValue={query}
          onChange={(event) => replace(`/?query=${event.target.value}`)}
          placeholder="Search"
          type="search"
        />
        {results && <Results results={results} />}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { query }
}) => {
  if (query) {
    const results = await algolia.search(query as string)

    return {
      props: {
        query,
        results
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
