import React from 'react'
import * as thumbs from './thumbs'

export default [
  'Ayagawa',
  'Kanonji'
  // 'Kotohira',
  // 'Manno',
  // 'Marugame',
  // 'Mitoyo',
  // 'Naoshima',
  // 'Sakaide',
  // 'Sanuki',
  // 'Shodoshima',
  // 'Takamatsu',
  // 'Zentsuji'
].map(p => ({
  name: p,
  md: require('./pages/' + p.toLowerCase().replace(' ', '-') + '.md'),
  thumbnail: thumbs[p.toLowerCase().replace(' ', '-')]
}))
