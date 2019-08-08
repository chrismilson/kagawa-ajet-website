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
  'Naoshima',
  // 'Sakaide',
  // 'Sanuki',
  // 'Shodoshima',
  // 'Takamatsu',
  'Zentsuji'
].map(p => ({
  name: p,
  path: p.toLowerCase().replace(/ /g, '-'),
  md: require('./pages/' + p.toLowerCase().replace(/ /g, '-') + '.md'),
  thumbnail: thumbs[p.toLowerCase().split(' ').map((word, i) => {
    return i === 0 ? word : word.charAt(0).toUpperCase() + word.substr(1)
  }).join('')]
}))
