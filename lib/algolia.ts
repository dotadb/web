import algoliasearch from 'algoliasearch/lite'

import { Hero, Item, SearchResults } from '../types'

class Algolia {
  client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_APP_KEY
  )

  async search(query: string): Promise<SearchResults> {
    const {
      results: [heroes, items]
    } = await this.client.search([
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
      heroes: heroes.hits,
      items: items.hits
    } as unknown) as SearchResults
  }

  async heroes(): Promise<Hero[]> {
    const {
      results: [heroes]
    } = await this.client.search<Hero>([
      {
        indexName: 'heroes',
        params: {
          hitsPerPage: 500
        }
      }
    ])

    return heroes.hits
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

  async items(): Promise<Item[]> {
    const {
      results: [items]
    } = await this.client.search<Item>([
      {
        indexName: 'items',
        params: {
          hitsPerPage: 500
        }
      }
    ])

    return items.hits
  }
}

export const algolia = new Algolia()
