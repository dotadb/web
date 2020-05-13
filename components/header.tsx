import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => {
  const { asPath } = useRouter()

  const path = asPath.split('?')[0]

  const NavLink = ({ label, link }: { label: string; link: string }) => (
    <Link href={link}>
      <a
        className={`ml-4 p-3 rounded font-medium leading-none ${
          path.indexOf(link) === 0 ? 'text-white bg-red-500' : ''
        }`}>
        {label}
      </a>
    </Link>
  )

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between m-8">
      <Link href="/">
        <a className="flex items-center">
          <img className="h-12 w-12" src="/img/dota.svg" />
        </a>
      </Link>
      <nav className="flex -ml-4 mt-8 md:mt-0">
        <NavLink label="Heroes" link="/heroes" />
        <NavLink label="Items" link="/items" />
      </nav>
    </header>
  )
}
