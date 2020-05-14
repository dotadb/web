import Link from 'next/link'
import React, { FunctionComponent } from 'react'

import { SearchResults } from '../types'
import { HeroCard } from './hero-card'
import { ItemCard } from './item-card'

interface Props {
  results: SearchResults
}

export const Results: FunctionComponent<Props> = ({
  results: { heroes, items }
}) => (
  <section className="mt-8 flex flex-col">
    {heroes.length > 0 && <h2 className="font-medium text-3xl">Heroes</h2>}
    {heroes.map((hero, index) => (
      <Link href={`/heroes/${hero.slug}`} key={index}>
        <a className="mt-8">
          <HeroCard hero={hero} />
        </a>
      </Link>
    ))}
    {items.length > 0 && <h2 className="font-medium text-3xl mt-8">Items</h2>}
    {items.map((item, index) => (
      <Link href={`/items/${item.slug}`} key={index}>
        <a className="mt-8">
          <ItemCard item={item} />
        </a>
      </Link>
    ))}
    {heroes.length === 0 && items.length === 0 && <p>Nothing found.</p>}
  </section>
)
