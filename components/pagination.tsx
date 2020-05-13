import { range } from 'lodash'
import React, { FunctionComponent } from 'react'

interface Props {
  current: number
  total: number

  onChange(page: number): void
}

export const Pagination: FunctionComponent<Props> = ({
  current,
  onChange,
  total
}) => (
  <div className="flex items-center -ml-2 -mb-2 mt-6 flex-wrap">
    {range(1, total).map((page, index) => (
      <button
        className={`w-auto bg-transparent py-2 px-4 m-2 hover:bg-red-800 ${
          current === page ? 'bg-gray-800' : 'bg-gray-900'
        }`}
        key={index}
        onClick={() => onChange(page)}>
        {page}
      </button>
    ))}
  </div>
)
