# Destination Pages

This folder is to contain the body text for destination pages in markdown.

## New Pages

When creating a new page please take the following into account:

- Create a new markdown page.
    - The title should be the name of the destination in lower case
    and with hyphens instead of spaces.
    - Use the ```.md``` file extention.

- You can fill the page with any markdown you like.

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

## Why Markdown?

Markdown is a very simple way of writing web content.

- It is easy to read;
- It is easy to add things like images and links; and
- It is easy to learn.

If you want to learn more about writing markdown have a look at these resources:

- GitHub's [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
    - The markdown renderer we use is based on the same one as GitHub's
- [The Markdown Guide](https://www.markdownguide.org/)
    - explains in more detail what markdown is and why it is good.