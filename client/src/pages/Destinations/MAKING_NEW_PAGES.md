## Creating New Destination Pages

When creating a new page please take the following into account:

- The page should have its own sub-directory in this directory.

- The page should be in 
[Markdown](https://en.wikipedia.org/wiki/Markdown) or be a node module that 
default exports a react component.

- If you are making a markdown page, there is a small script to set up a 
    boilerplate for you. Just run
    ```bash
        python3 newDest.py <destination-name>
    ```
    from the Destinations directory.

## Markdown

Please abide by these guidelines when creating destination pages:

- Do not exceed a line width of 80 characters.

- When using images, do not use external images (they are disabled).
  
  To add an image:
  1. Save the image to the `images` directory for the page you want to add the 
    image to.
  2. Open the `index.js` file in the `images` directory and add a new entry to
    the `module.exports` object. The new entry should be of the form
    ```js
        '<readable-name>': require('./<file-name>.<file-extension>')
    ```
    Where the `<readable-name>` is the name used in the markdown to reference 
    the image and the `<file-name>` and `<file-extension>` are the values of 
    the saved image.
    
    *e.g.*

    I want to add a picture of Marugame Juu Juu to the Marugame page;
    I find the image and save it to `marugame/images/juu-juu.jpg`;
    I change the `index.js` file to look like
    ```js
        module.exports = {
            'juu-juu': require('./juu-juu.jpg')
        }
    ```
    In the `marugame.md` page I can then do 
    ```md
        # Juu Juu-kun is Awesome!

        ![Image of Juu Juu](juu-juu)

        .
        .  more content...
        .
    ```
    and then the image will appear when the site is rendered!

### Thumbnails 

If you create a new page, you must also add a thumbnail. the thumbnail should 
have the same name as the destination and have the `.jpeg` file extension.

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