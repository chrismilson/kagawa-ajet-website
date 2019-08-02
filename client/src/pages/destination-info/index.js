import * as thumbs from './thumbs'

import * as images from './images'
export { images }

export default [
  'Ayagawa',
  'Kanonji',
  'Kotohira',
  'Mannō',
  'Marugame',
  'Mitoyo',
  // 'Naoshima',
  // 'Sakaide',
  // 'Sanuki',
  // 'Shodoshima',
  // 'Takamatsu',
  'Zentsuji'
].map(p => ({
  name: p,
  md: require('./pages/' + p.toLowerCase().replace(' ', '-') + '.md'),
  thumbnail: thumbs[p.toLowerCase().replace(' ', '-')]
}))
