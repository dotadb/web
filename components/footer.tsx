import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => (
  <footer className="m-8 text-sm text-gray-700 flex flex-col justify-between md:flex-row">
    <div>
      <p className="mt-2">
        Built by{' '}
        <a
          className="text-gray-600"
          href="https://steamcommunity.com/id/mildpanda"
          rel="noopener noreferrer"
          target="_blank">
          mildpanda
        </a>
      </p>
      <p className="mt-2">
        Code on{' '}
        <a
          className="text-gray-600"
          href="https://github.com/dotadb"
          rel="noopener noreferrer"
          target="_blank">
          GitHub
        </a>
      </p>
    </div>
    <div className="mt-4 md:mt-0">
      <a
        className="flex items-center"
        href="https://algolia.com"
        rel="noopener noreferrer"
        target="_blank">
        <span className="text-gray-700">Powered by </span>
        <img className="h-6 w-6 ml-2" src="/img/algolia.svg" />
      </a>
    </div>
  </footer>
)
