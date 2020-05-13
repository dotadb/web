import React, { FunctionComponent } from 'react'

import { Item } from '../types'

interface Props {
  item: Item
}

export const ItemCard: FunctionComponent<Props> = ({ item }) => (
  <article className="flex flex-col md:flex-row md:items-center">
    <img
      className="bg-gray-900 rounded w-40 md:w-auto md:h-20 mb-4 md:mb-0 md:mr-8"
      src={item.image ?? '/img/items/null.png'}
    />
    <div className="flex-1">
      <div className="text-xl font-medium text-red-500">{item.name}</div>
      {item.lore && <div className="mt-2 text-white text-sm">{item.lore}</div>}
    </div>
  </article>
)
