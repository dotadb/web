import algoliasearch from 'algoliasearch/lite'

import { Hero, SearchResults } from '../types'

class Algolia {
  client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_APP_KEY
  )

  async search(query: string): Promise<SearchResults> {
    const {
      results: [abilities, heroes, items]
    } = await this.client.search([
      {
        indexName: 'abilities',
        params: {
          hitsPerPage: 5
        },
        query
      },
      {
        indexName: 'heroes',
        params: {
          hitsPerPage: 5
        },
        query
      },
      {
        indexName: 'items',
        params: {
          hitsPerPage: 5
        },
        query
      }
    ])

    return ({
      abilities: abilities.hits,
      heroes: heroes.hits,
      items: items.hits
    } as unknown) as SearchResults
  }

  async heroes(
    page = 0
  ): Promise<{
    current: number
    heroes: Hero[]
    pages: number
  }> {
    const {
      results: [heroes]
    } = await this.client.search<Hero>([
      {
        indexName: 'heroes',
        params: {
          page: page - 1
        }
      }
    ])

    return {
      current: heroes.page + 1,
      heroes: heroes.hits,
      pages: heroes.nbPages + 1
    }
  }

  async hero(slug: string): Promise<Hero> {
    const {
      results: [heroes]
    } = await this.client.search<Hero>([
      {
        indexName: 'heroes',
        params: {
          query: slug
        }
      }
    ])

    const hero = heroes.hits.find((hero) => hero.slug === slug)

    if (!hero) {
      throw new Error('Hero not found')
    }

    return hero
  }
}

export const algolia = new Algolia()
