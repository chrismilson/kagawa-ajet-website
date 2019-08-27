import * as thumbs from './thumbs'

import * as images from './images'
export { images }

export default [
  'Ayagawa - 綾川',
  'Kanonji - 観音寺',
  'Kotohira - 琴平',
  'Mannō - 満農',
  'Marugame - 丸亀',
  'Mitoyo - 三豊',
  'Naoshima - 直島',
  // 'Sakaide - 坂出',
  // 'Sanuki - 讃岐',
  // 'Shodoshima - 小豆島',
  // 'Takamatsu - 高松',
  'Zentsuji - 善通寺'
].map(name => {
  var place = name.split(/ - /)[0]

  return {
    name: name,
    path: place.toLowerCase().replace(/ /g, '-'),
    md: require('./pages/' + place.toLowerCase().replace(/ /g, '-') + '.md'),
    thumbnail: thumbs[place.toLowerCase().split(' ').map((word, i) => {
      return i === 0 ? word : word.charAt(0).toUpperCase() + word.substr(1)
    }).join('')]
  }
})
