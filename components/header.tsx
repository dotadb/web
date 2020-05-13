import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => {
  const { asPath } = useRouter()

  const path = asPath.split('?')[0]

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between m-8">
      <Link href="/">
        <a className="flex items-center">
          <img className="h-12 w-12" src="/img/dota.svg" />
        </a>
      </Link>
      <nav className="mt-6 md:mt-0">
        <Link href="/">
          <a className={`${path === '/' ? 'text-white' : ''}`}>Search</a>
        </Link>
        <Link href="/heroes">
          <a
            className={`ml-4 ${
              path.indexOf('/heroes') === 0 ? 'text-white' : ''
            }`}>
            Heroes
          </a>
        </Link>
        <Link href="/items">
          <a
            className={`ml-4 ${
              path.indexOf('/items') === 0 ? 'text-white' : ''
            }`}>
            Items
          </a>
        </Link>
        <Link href="/abilities">
          <a
            className={`ml-4 ${
              path.indexOf('/abilities') === 0 ? 'text-white' : ''
            }`}>
            Abilities
          </a>
        </Link>
      </nav>
    </header>
  )
}
