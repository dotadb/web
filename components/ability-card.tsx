import React, { FunctionComponent } from 'react'

import { Ability } from '../types'

interface Props {
  ability: Ability
  full?: boolean
}

export const AbilityCard: FunctionComponent<Props> = ({ ability, full }) => {
  if (full) {
    return (
      <>
        <AbilityCard ability={ability} />
        <div className="mt-4 flex flex-col md:flex-row">
          <div className="flex-1">
            {ability.manacost && (
              <div className="flex items-center mt-2">
                <span className="text-gray-600 flex-1">MANA COST</span>
                <span className="ml-4 text-white font-medium text-right">
                  {typeof ability.manacost === 'string'
                    ? ability.manacost
                    : ability.manacost.join(' / ')}
                </span>
              </div>
            )}
            {ability.cooldown && (
              <div className="flex items-center mt-2">
                <span className="text-gray-600 flex-1">COOLDOWN</span>
                <span className="ml-4 text-white font-medium text-right">
                  {typeof ability.cooldown === 'string'
                    ? ability.cooldown
                    : ability.cooldown.join(' / ')}
                </span>
              </div>
            )}
            {ability.behavior && (
              <div className="flex items-center mt-2">
                <span className="text-gray-600 flex-1">BEHAVIOR</span>
                <span className="ml-4 text-white font-medium text-right">
                  {typeof ability.behavior === 'string'
                    ? ability.behavior
                    : ability.behavior.map((behavior, index) => (
                        <div key={index}>{behavior}</div>
                      ))}
                </span>
              </div>
            )}
            {ability.damageType && (
              <div className="flex items-center mt-2">
                <span className="text-gray-600 flex-1">DAMAGE TYPE</span>
                <span className="ml-4 text-white font-medium">
                  {ability.damageType}
                </span>
              </div>
            )}
            {ability.damage && (
              <div className="flex items-center mt-2">
                <span className="text-gray-600 flex-1">DAMAGE</span>
                <span className="ml-4 text-white font-medium">
                  {ability.damage}
                </span>
              </div>
            )}
            <div className="flex items-center mt-2">
              <span className="text-gray-600 flex-1">PIERCES THROUGH BKB</span>
              <span className="ml-4 text-white font-medium">
                {ability.piercesThroughBkb ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div className="md:ml-6 flex-1">
            {ability.attributes.map((attribute, index) => (
              <div className="flex items-center mt-2" key={index}>
                <span className="text-gray-600 flex-1">{attribute.label}</span>
                <span className="text-white font-medium ml-4">
                  {typeof attribute.value === 'string'
                    ? attribute.value
                    : attribute.value.join(' / ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <article className="flex flex-col md:flex-row md:items-center">
      <img
        className="bg-gray-900 rounded w-32 md:w-auto md:h-20 mb-4 md:mb-0 md:mr-8"
        src={ability.image ?? '/img/abilities/null.png'}
      />
      <div className="flex-1">
        <div className="text-xl font-medium text-red-500">{ability.name}</div>
        {ability.description && (
          <div className="mt-2 text-white text-sm">{ability.description}</div>
        )}
        {ability.lore && (
          <div className="mt-2 text-gray-500 text-xs">{ability.lore}</div>
        )}
      </div>
    </article>
  )
}
