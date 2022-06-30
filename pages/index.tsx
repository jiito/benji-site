import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/Layout'

const Home: NextPage = () => {
    return (
        <Layout>
            <img
                src="/blue_balls.png"
                height="100px"
                style={{ objectFit: 'cover' }}
            />
            <h3>Featured projects</h3>
            <ul>
                <li> Raytracer </li>
                <li> MiddVentures Club </li>
            </ul>
        </Layout>
    )
}

export default Home
