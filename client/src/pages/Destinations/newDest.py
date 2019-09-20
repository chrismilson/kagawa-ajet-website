import os, sys

def newDest (place):
  dir = './' + place
  file = dir + '/' + place
  os.mkdir(dir)
  f = open(file + '.md', 'w')
  f.write(
"""# This is a template

Good luck making a new destination page!
"""
  )
  f.close()
  os.mkdir(dir + '/images')
  f = open(dir + '/images/index.js', 'w')
  f.write(
"""module.exports = {

}
"""
  )
  f.close()

  # f = open(f"./{place.lower()}.js", "w")
  # f.write(f"import React from 'react'\n")
  # f.write(f"import Destination from '../Destination'\n")
  # f.write(f"import thumbnail from './thumbs/{place.lower()}.jpeg'\n\n")
  # f.write(f"var {place.lower()} = {{\n")
  # f.write(f"  name: '{place}',\n")
  # f.write(f"  thumbnail: thumbnail,\n")
  # f.write(f"  content: (\n    <Destination />\n  )\n")
  # f.write("}\n\n")
  # f.write(f"export default {place.lower()}\n")
  # f.close()

  # print(f"export {{ default as {place} }} from './{place.lower()}'")

  # print(f"import {place.lower()} from './{place.lower()}'")

  # print(f"{{ name: '{place}', md: {place.lower()}, thumbnail: thumbs.{place.lower()} }}")

newDest(sys.argv[1])

