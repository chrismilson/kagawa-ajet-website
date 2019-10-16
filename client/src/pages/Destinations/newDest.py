import os, sys

def newFolder (place):
  dir = f'./{place.lower()}'
  os.mkdir(dir)
  imagesFolder(dir)
  return [dir, f'{dir}/{place.lower()}']

def imagesFolder(dir):
  os.mkdir(dir + '/images')
  f = open(dir + '/images/index.js', 'w')
  f.write(
"""var exp = {}
;[
  // { name: '<image name>', file: '<relative image path>' }
].forEach(img => {
  try {
    exp[img.name] = require(img.file)
  } catch (e) {
    console.error('Could not load image:', img.name, 'from', img.file)
  }
})

module.exports = exp
"""
  )
  f.close()

def newMD (place):
  file = newFolder(place)[1]
  f = open(file + '.md', 'w')
  f.write(
"""# This is a template

Good luck making a new destination page!
"""
  )
  f.close()

def newReact(place):
  dir = newFolder(place)[0]
  f = open(dir + '/index.js', 'w')
  f.write(
f"""import React from 'react'

function {place} (props) {{
  return (
    <div className="Destination {place}">
      <h1>{place}</h1>
      <p>This is a template.</p>
    </div>
  )
}}

export default {place}
"""
  )
  f.close()

# if (sys.argv[1].lower() == 'react'):
#   newReact(sys.argv[2])
# else:
newMD(sys.argv[1])

