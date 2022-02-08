import type { NextPage } from 'next'

import { PublicLayout } from '../components/layouts';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <PublicLayout>
      <div>Hello index page</div>
    </PublicLayout>
  )
}

export default Home
