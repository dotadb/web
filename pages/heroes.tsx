import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Pagination } from '../components'
import { HeroCard } from '../components/hero-card'
import { algolia } from '../lib'
import { Hero } from '../types'

interface Props {
  current: number
  heroes: Hero[]
  pages: number
}

const Home: NextPage<Props> = ({ current, heroes, pages }) => {
  const { replace } = useRouter()

  return (
    <>
      <Head>
        <title>Heroes / Dota</title>
      </Head>

      <main>
        <h1 className="font-medium text-4xl">Heroes</h1>
        {heroes.map((hero, index) => (
          <Link href={`/heroes/${hero.slug}`} key={index}>
            <a className="mt-8">
              <HeroCard hero={hero} />
            </a>
          </Link>
        ))}
        <Pagination
          current={current}
          onChange={(page) => {
            window.scrollTo({
              behavior: 'smooth',
              top: 0
            })

            replace(`/heroes?page=${page}`)
          }}
          total={pages}
        />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page }
}) => {
  const { current, heroes, pages } = await algolia.heroes(
    Number(page ? Number(page) : 1)
  )

  return {
    props: {
      current,
      heroes,
      pages
    }
  }
}

export default Home
