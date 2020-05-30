$(function () {

  const placeholder =
    `
# Markdown converter on the fly!
## Here are some examples what you can do here

**Type some markdown and it will get transformed automatically:**

***Inline code*** - \`<div></div>\`

***Even block of code:***
\`\`\`
<div>
  <p>Hello World!!!</p>
</div>
\`\`\`

***Unordered list:***
- First item
- Second item
- Third item

***Blockquote:***
> It is an awesome app

***Image:***
![Just a random picture](https://source.unsplash.com/random/300x300)

*Check out this [link](https://www.markdownguide.org/cheat-sheet/) for a great markdown cheatsheet*

# Press "Clear" button on top and give a try
`;

  const $editor = $('#editor');
  const $preview = $('#preview');
  const $btn = $('#btn');
  // Variable to be used for configuration of Marked library
  const renderer = new marked.Renderer();

  // Process the text with Marked Library
  function convert(markdown) {
    return marked(markdown, { renderer: renderer });
  }

  // Dispose the converted markdown into previewer
  function dispose(text) {
    $preview.html(text);
  }

  // Configure how links render (Injecting target="_blank" attribute)
  renderer.link = (href, title, text) => {
    return `<a target="_blank" href="${href}" title="${title}">${text}</a>`;
  }

  // Parse line breaks as <br>
  marked.setOptions({
    breaks: true
  });

  // Event listener for the value of the editor's textarea
  $editor.on('keyup', () => {
    let output = convert($editor.val());
    dispose(output);
  });

  // Event listener for the 'CLEAR' button
  $btn.on('click', () => {
    $editor.val('');
    $preview.text('');
  });

  // Display the placeholder when user visits the page
  $editor.val(placeholder);
  dispose(convert($editor.val()));

});