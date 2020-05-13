import '../assets/global.scss'

import App from 'next/app'
import React from 'react'

import { Footer, Header } from '../components'

export default class Dota extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
    )
  }
}
