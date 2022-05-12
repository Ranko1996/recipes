import React from 'react'
import Veggie from '../components/Veggie'
import Popular from '../components/Popular'
import { motion } from 'framer-motion'
import Search from '../components/Search'
import Category from '../components/Category'

const Home = () => {
  return (
    <>
      <Search />
      <Category />
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
          <Veggie />
          <Popular />
      </motion.div>
      </>
  )
}

export default Home