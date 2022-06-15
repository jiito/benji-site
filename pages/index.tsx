import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    return (
        <div className="main">
            <div className="construction">
                🚧 This page is currently under construction 🚧
            </div>
            <h1>Benjamin Allan-Rahill</h1>
            <div className="nav">
                <span> work </span>
                <span> dev</span>
                <span> writing</span>
                <span> art</span>
            </div>

            <div>
                <a href="https://crossmint.io">
                    <h5> Crossmint </h5>
                </a>
                <span>The fastest way to buy NFTs</span>
            </div>
            <div>
                <a href="https://pallet.com">
                    <h5> Pallet </h5>
                </a>
            </div>
        </div>
    )
}

export default Home
