import React from 'react'
import MDPage from '../../../components/MDPage'

var mdPages = {}

;[
  'transport'
].forEach(p => {
  const dir = './' + p + '/'
  mdPages[p] = <MDPage
    fName={require(dir + p + '.md')}
    images={require(dir + 'images')}
  />
})

export default mdPages
