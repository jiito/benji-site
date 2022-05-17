import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <nav>
        <div className={styles.navLinks}>
          <a href="/about">about</a>
          <a href="/projects">projects</a>
          <a href="/writing">writing</a>
          <a href="/art">art</a>
        </div>
      </nav>
      <h1>Benjamin Allan-Rahill</h1>
    </div>
  )
}

export default Home
