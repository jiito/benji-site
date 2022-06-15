import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className="main">
            <div className="construction">
                🚧 This page is currently under construction 🚧
            </div>
            <h1>Benjamin Allan-Rahill</h1>
            <div className="nav">
                <Link href="/work">
                    <span> work </span>
                </Link>
                <Link href="https://github.com/jiito">
                    <span> dev </span>
                </Link>

                <Link href="https://words.benji.ar">
                    <span> writing</span>
                </Link>
            </div>
        </div>
    )
}

export default Home
