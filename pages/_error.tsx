import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Error: NextPage = () => (
  <>
    <Head>
      <title>Error / Dota</title>
    </Head>

    <main>
      <h1 className="text-5xl font-semibold">Error</h1>
      <p>Something went wrong. Please try again later.</p>
    </main>
  </>
)

export default Error
