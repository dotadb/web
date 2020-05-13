import React, { FunctionComponent } from 'react'

import { Hero } from '../types'

interface Props {
  hero: Hero
}

export const HeroCard: FunctionComponent<Props> = ({ hero }) => (
  <article className="flex flex-col md:flex-row md:items-center">
    <img
      className="bg-gray-900 rounded w-full md:w-auto md:h-20 mb-4 md:mb-0 md:mr-8"
      src={hero.image}
    />
    <div className="flex-1">
      <div className="flex items-center text-xl font-medium text-red-500">
        {hero.name}
        <img
          alt={hero.attributes.primary}
          className="h-6 w-6 ml-4"
          src={`/img/attributes/${hero.attributes.primary}.png`}
        />
      </div>
      <div className="my-2 text-white text-sm">{hero.hype}</div>
      <div className="text-gray-500 text-sm">{hero.roles.join(', ')}</div>
    </div>
  </article>
)
