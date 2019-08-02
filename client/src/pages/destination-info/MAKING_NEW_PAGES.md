# Destination Pages

This folder is to contain the body text for destination pages in markdown.

## New Pages

When creating a new page please take the following into account:

- The page should be kept in the ```pages``` folder in this directory.

- The page should be written in 
[Markdown](https://en.wikipedia.org/wiki/Markdown).

    - The title should be the name of the destination in lower case and with 
    hyphens instead of spaces.
    - Use the ```.md``` file extention.

- Please do not exceed a line width of 80 characters.

- in the ```index.js``` file located in this directory, please update the list
    of  place names with the name of the new place.

    - Use proper capitalisation and spaces.

The data will be loaded onto the page dynamically, so after updating the 
```index.js```  file, the website will do the rest.

### Thumbnails 

If you create a new page, please also include a thumbnail for the page in the
thumbs folder.

There is another ```index.js``` page in the thumbs folder, so please update that
with the new information as well, following the formatting of the other
thumbnails.

### Images

If you want to add a local image to a destination page, please follow these 
steps.

- Prefix the path with ```local:``` and store the image somewhere easy to 
    understand in the images folder.

- The path following ```local:``` should start as if we were in the 
    ```/images``` folder.

- When adding files to the images folder, pay attention to the ```index.js```
    files in each location.

    - When adding a new photo, you must update all of these index files so that 
    the website knows where to get the photo when it loads.

### Example

Lets suppose we have a ```.jpg``` picture of Marugame Castle that we want to add 
to the Marugame page. 

- First, we will make a new folder in ```images``` called ```marugame```.

- Then we will name the photo ```marugame-castle.jpg``` and put it in the folder 
    we just created.

- Since we made a new file, we need to update the ```index.js``` files in each 
    directory.

- We will make a new ```index.js``` file in the ```marugame``` folder 
    containing 
    ```js
        export { default as castle } from './marugame-castle.jpg'
    ```
    ***Note:*** Javascript names cannot have hyphens in them. **(This is the 
    name that we will use in the Markdown)**. 

- We also need to export the ```marugame``` folder, so for ```index.js```
    in the images folder we will add 
    ```js
        import * as marugame from './marugame'
    ```
    and add ```marugame``` to the comma separated list of exports at the bottom.

- Now that the image will be imported by the react app, we can use the custom
    syntax for local files and in the ```marugame.md``` page we will use
    ```md
        ![Marugame Castle](local:marugame/castle)
    ```
    ***Note:*** The address for the picture uses ```castle``` - corresponding 
    to the use of 
    ```js
        export { default as castle }
    ```
    in the ```/marugame/index.js``` file.

Sometimes markdown will wrap the image in a paragraph, so it will not behave 
with CSS. Please be careful.

## Why Markdown?

Markdown is a very simple way of writing web content.

- It is easy to read;
- It is easy to add things like images and links; and
- It is easy to learn.

If you want to learn more about writing markdown have a look at these resources:

- GitHub's [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
    guide
    - The markdown renderer we use is based on the same one as GitHub's
- [The Markdown Guide](https://www.markdownguide.org/)
    - explains in more detail what markdown is and why it is good.