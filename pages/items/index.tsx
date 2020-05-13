import { compact, sortBy, startCase, uniq } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { algolia } from '../../lib'
import { Item } from '../../types'

interface Props {
  items: Item[]
  neutral: Item[]
  sources: string[]
  tiers: number[]
}

const Items: NextPage<Props> = ({ items, neutral, sources, tiers }) => (
  <>
    <Head>
      <title>Items / Dota</title>
    </Head>

    <main>
      <h1 className="font-medium text-4xl">Items</h1>
      {sources.map((source, index) => (
        <section className="mt-8" key={index}>
          <h2 className="font-medium text-2xl text-red-500 mb-4">
            {startCase(source)}
          </h2>
          <div className="flex flex-wrap -m-4">
            {items
              .filter(({ quality }) => quality === source)
              .map((item, index) => (
                <Link href={`/items/${item.slug}`} key={index}>
                  <a
                    className="m-4 w-item-sm md:w-item-md group relative"
                    style={{
                      zIndex: 100 - index
                    }}>
                    <img
                      className="bg-gray-900 rounded w-full z-0"
                      src={item.image}
                    />
                    <div
                      className="hidden overflow-hidden md:block -ml-4 -mb-4 text-white absolute z-10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
                      style={{
                        bottom: '100%',
                        left: '100%',
                        width: 'max-content'
                      }}>
                      <span className="block bg-gray-900 text-sm px-3 py-2 rounded">
                        {item.name}
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
          </div>
        </section>
      ))}
      <section className="mt-8">
        <h2 className="font-medium text-2xl text-red-500 -mb-4">Neutral</h2>
        {tiers.map((tier, index) => (
          <div className="" key={index}>
            <h3 className="font-medium text-xl text-white mt-8 mb-4">
              Tier {tier}
            </h3>
            <div className="flex flex-wrap -m-4">
              {neutral
                .filter((item) => item.tier === tier)
                .map((item, index) => (
                  <Link href={`/items/${item.slug}`} key={index}>
                    <a
                      className="m-4 w-item-sm md:w-item-md group relative"
                      style={{
                        zIndex: 100 - index
                      }}>
                      <img
                        className="bg-gray-900 rounded w-full z-0"
                        src={item.image}
                      />
                      <div
                        className="hidden overflow-hidden md:block -ml-4 -mb-4 text-white absolute z-10 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
                        style={{
                          bottom: '100%',
                          left: '100%',
                          width: 'max-content'
                        }}>
                        <span className="block bg-gray-900 text-sm px-3 py-2 rounded">
                          {item.name}
                        </span>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  </>
)

export async function getStaticProps() {
  const data = await algolia.items()

  const items = data.filter(
    ({ slug }) =>
      !/river_painter|recipe_|_2|_roshan|_single|mutation_/i.test(slug)
  )

  const sources = sortBy(uniq(compact(items.map(({ quality }) => quality))))

  const neutral = items.filter(({ tier }) => tier)

  const tiers = [1, 2, 3, 4, 5]

  return {
    props: {
      items: items.filter(({ tier }) => !tier),
      neutral,
      sources,
      tiers
    }
  }
}

export default Items
