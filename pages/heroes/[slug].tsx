import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { AbilityCard } from '../../components/ability-card'
import { algolia } from '../../lib'
import { Hero } from '../../types'

interface Props {
  hero: Hero
}

const PrimaryAttribute = () => (
  <img
    className="absolute pointer-events-none ml-4 mt-4"
    src="/img/attributes/primary.png"
    style={{
      left: -3,
      top: -3
    }}
  />
)

const Home: NextPage<Props> = ({ hero }) => (
  <>
    <Head>
      <title>{hero.name} / Heroes / Dota</title>
    </Head>

    <main>
      <h1 className="font-medium text-4xl">{hero.name}</h1>
      <h2 className="text-red-500 font-medium text-2xl mt-8">Overview</h2>
      <section className="overflow-hidden mt-4">
        <figure className="mb-4 md:ml-4 md:float-right">
          <img className="rounded w-full md:w-auto" src={hero.image} />
        </figure>
        <div className="md:-my-2">
          {hero.lore.map((line, index) => (
            <p className="my-2" key={index}>
              {line}
            </p>
          ))}
        </div>
      </section>
      <h2 className="text-red-500 font-medium text-2xl mt-8">Attributes</h2>
      <section className="mt-4">
        <table>
          <tbody>
            <tr>
              <td className="relative">
                <img src="/img/attributes/agi.png" />
                {hero.attributes.primary === 'agi' && <PrimaryAttribute />}
              </td>
              <td>
                {hero.attributes.agi.base} + {hero.attributes.agi.gain}
              </td>
              <td>
                <img className="mx-auto" src="/img/attributes/attack.png" />
              </td>
              <td>
                {hero.stats.attack.min} - {hero.stats.attack.max}
              </td>
            </tr>
            <tr>
              <td className="relative">
                <img src="/img/attributes/str.png" />
                {hero.attributes.primary === 'str' && <PrimaryAttribute />}
              </td>
              <td>
                {hero.attributes.str.base} + {hero.attributes.str.gain}
              </td>
              <td>
                <img className="mx-auto" src="/img/attributes/speed.png" />
              </td>
              <td>{hero.stats.movement.speed}</td>
            </tr>
            <tr>
              <td className="relative">
                <img src="/img/attributes/int.png" />
                {hero.attributes.primary === 'int' && <PrimaryAttribute />}
              </td>
              <td>
                {hero.attributes.int.base} + {hero.attributes.int.gain}
              </td>
              <td>
                <img className="mx-auto" src="/img/attributes/defense.png" />
              </td>
              <td>{hero.stats.armor.base}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2 className="text-red-500 font-medium text-2xl mt-8">Stats</h2>
      <section className="mt-4">
        <table>
          <tbody>
            <tr>
              <th>Attack type</th>
              <td>{hero.stats.attack.type.toUpperCase()}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Attack range</th>
              <td>{hero.stats.attack.range}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Attack rate</th>
              <td>{hero.stats.attack.rate}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Projectile speed</th>
              <td>{hero.stats.attack.projectileSpeed}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Magic resistance</th>
              <td>{hero.stats.armor.magicResistance}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Base health</th>
              <td>{hero.stats.health.base}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Health regen</th>
              <td>{hero.stats.health.regen}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Base mana</th>
              <td>{hero.stats.mana.base}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Mana regen</th>
              <td>{hero.stats.mana.regen}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Turn rate</th>
              <td>{hero.stats.movement.turnRate}</td>
            </tr>
            <tr className="border-t border-black">
              <th>Legs</th>
              <td>{hero.stats.movement.legs}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2 className="text-red-500 font-medium text-2xl mt-8">Abilities</h2>
      <section className="-mt-4">
        {hero.abilities.map((ability, index) => (
          <div className="mt-8" key={index}>
            <AbilityCard ability={ability} full />
          </div>
        ))}
      </section>
      <h2 className="text-red-500 font-medium text-2xl mt-8">Talents</h2>
      <section>
        {[4, 3, 2, 1].map((level, index) => {
          const talents = hero.talents.filter(
            (talent) => talent.level === level
          )

          return (
            <div className="flex items-center justify-center mt-4" key={index}>
              <div className="flex-1 text-right">{talents[0].name}</div>
              <div className="h-12 w-12 border-2 border-gray-900 flex items-center justify-center rounded-full mx-4 font-semibold text-center">
                {level * 5 + 5}
              </div>
              <div className="flex-1 text-left">{talents[1].name}</div>
            </div>
          )
        })}
      </section>
    </main>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug }
}) => {
  const hero = await algolia.hero(slug as string)

  return {
    props: {
      hero
    }
  }
}

export default Home
