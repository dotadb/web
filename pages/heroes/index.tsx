import { sortBy, uniq } from 'lodash'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import { algolia } from '../../lib'
import { Hero } from '../../types'

interface Props {
  heroes: Hero[]
  roles: string[]
}

const Heroes: NextPage<Props> = ({ heroes, roles }) => {
  const [role, setRole] = useState('All')

  return (
    <>
      <Head>
        <title>Heroes / Dota</title>
      </Head>

      <main>
        <h1 className="font-medium text-4xl">Heroes</h1>
        <header className="-m-2 mt-6 flex flex-wrap items-start">
          {['All', ...roles].map((item, index) => (
            <button
              className={`w-auto text-white m-2 p-3 font-medium leading-none ${
                item === role ? 'bg-red-700' : 'bg-gray-800'
              }`}
              key={index}
              onClick={() => setRole(item)}>
              {item}
            </button>
          ))}
        </header>
        {['str', 'agi', 'int'].map((attribute, index) => (
          <section className="mt-8" key={index}>
            <h2 className="font-medium text-2xl text-red-500 mb-4">
              {attribute === 'str'
                ? 'Strength'
                : attribute === 'agi'
                ? 'Agility'
                : 'Intelligence'}
            </h2>
            <div className="flex flex-wrap -m-4">
              {heroes
                .filter((hero) =>
                  role === 'All' ? true : hero.roles.includes(role)
                )
                .filter((hero) => hero.attributes.primary === attribute)
                .map((hero, index) => (
                  <Link href={`/heroes/${hero.slug}`} key={index}>
                    <a
                      className="m-4 w-hero-sm md:w-hero-md group"
                      style={{
                        zIndex: 100 - index
                      }}>
                      <img
                        className="bg-gray-900 rounded w-full z-0"
                        src={hero.image}
                      />
                      <div
                        className="hidden md:block -ml-4 -mb-4 text-white absolute z-10 bg-gray-900 text-sm px-3 py-2 rounded opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
                        style={{
                          bottom: '100%',
                          left: '100%',
                          width: 'max-content'
                        }}>
                        <span>{hero.name}</span>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const heroes = await algolia.heroes()

  const roles = sortBy(uniq(heroes.map(({ roles }) => roles).flat()))

  return {
    props: {
      heroes,
      roles
    }
  }
}

export default Heroes
