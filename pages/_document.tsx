import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class Doc extends Document {
  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
