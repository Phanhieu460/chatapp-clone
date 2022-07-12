import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div>
     <Sidebar/>
    </div>
  )
}

export default Home
