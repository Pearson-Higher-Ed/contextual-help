# contextual-help [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/contextual-help.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/contextual-help) [![Coverage Status](https://coveralls.io/repos/Pearson-Higher-Ed/contextual-help/badge.svg?branch=master&service=github)](https://coveralls.io/github/Pearson-Higher-Ed/contextual-help?branch=master)

## Notice

This current version of Contextual-Help (v2+) is using the new ElementsSDK (v1+) version, which is a breaking change due to Pearson rebranding. [Latest drawer rebranding styles](http://pearson-higher-ed.github.io/design/c/drawer/) and [latest con-help rebranding styles](http://pearson-higher-ed.github.io/design/c/contextual-help/) and [running demo](http://pearson-higher-ed.github.io/contextual-help/).

### Icons

The new ElementsSDK uses an svg sprite for icons. Normally the sprite can remain in your code directory the way images and fonts do, except that IE 11 and some Android webkit-based browsers won't show the icons that way. Instead, including the actual sprite on the page will allow these browsers to work. You have the choice of either:

* manually adding the sprite (found in `/icons/`) in your HTML (ideally as the first child of the &lt;body&gt; element)
* use the example JavaScript found in the demo's `index.html`

The advantage of the script is it allows caching of the (currently) 84kb-sized sprite.

## How to Consume in an Application

Platform requirements: npm 2+ and the [Elements SDK](https://www.npmjs.com/package/pearson-elements)

	> npm i --save @pearson-components/contextual-help

### Integration with @pearson-components/app-header

Most commonly, contextual-help is used with the app-header component, which emits the `oAppHeader.help.toggle` event when the Help link is clicked. Contextual-help, when initialized, will automatically check for app-header in the DOM, and it will then add the app-header event listener.

To successfully integrate with app-header, **initialize the app-header first**, and then initialize contextual-help next as described below. The order of the app-header and contextual-help drawer in the HTML doesn't matter; **it's the initialization order that matters**.

### Script Include (Preferred)

The JavaScript bundle is available in /node_modules/@pearson-components/contextual-help/build/dist.contextual-help.js.

Add the following script include to your web page:

```html
<script src="path/to/dist.contextual-help.js"></script>
```

Additionally if an application is not using NPM to consume the contextual-help component, the code can be included via a CDN.

```html
<script src="https://unpkg.com/@pearson-components/contextual-help@2.2.4/build/dist.contextual-help.js"></script>
```

Initialize contextual-help in your JavaScript (after app-header initialization):

```js
document.dispatchEvent(new CustomEvent('o.InitContextualHelp'));
```

The config property options are outlined further down in this README.

### CommonJS

This method requires a web dependency bundler, such as webpack or browserify.

After installing the component from npm:

```js
var ContextualHelp = require('@pearson-components/contextual-help');
ContextualHelp.init();
```

## Example Configuration

Start by adding a list of help topics to display, via configuration script element.

```html
<script type="application/json" data-o-contextual-help-config>
  {
    "helpTopics": [
      "console/student/freetrial",
      "console/student/studentresources",
      "console/student/contactsupport"
    ]
  }
</script>
```

This gives contextual-help something to load.  The topics list is presented in order and the values are derived from the path of the files at http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a in the /Out/ directory without the language code.  The language code can be set dynamically in this component and its addition to the fetch URL is managed for you.

Do not include the filename extension in the list of configured topics.

This module will automatically inject and initialize itself on the page, with an ID of 'o-contextual-help-drawer'.  The object itself will then be added on to the same element as .oContextualHelp.  So, to access the object after it's initialized, simply use the following.

```js
document.getElementById('o-contextual-help-drawer').oContextualHelp;
```

## Initialization

This module will initialize when o.InitContextualHelp fires.  It can be manually initialized with the static `init()` method.

## API

### Methods

`open()`

Opens the drawer.

`close()`

Closes the drawer.

`toggle()`

Toggles the current state of the drawer.

`setLanguage(langCode)`

Sets the internal member variable for use in fetching content.  Default is 'en-us'. Other acceptable parameters are 'es' and 'fr'.

`openHelpTopic(topicId)`

Directly opens the help contents to a specific topic.  This will bypass the list and is also used internally to go from the help topic list to the help topic contents.

`addTopics(topic || [topic, topic, ...])`

Add a topic or topics to the internal array of topics to display in the list.

`removeTopics(topic || [topic, topic, ...])`

Remove a topic or topics to the internal array of topics to display in the list.

`removeAllTopics()`

Empty the internal help topic array.

`getTopics()`

Returns the internal help topic array.

### Events

Refer to the [drawer](https://github.com/Pearson-Higher-Ed/drawer) documentation for the supported events.  Be aware that IE 11 does not support `CustomEvent`. If you want to use `CustomEvent` (as seen in `demo.js`), you will need to add the CustomEvent polyfill script to your HTML page:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent"></script>
```


```js
document.getElementById('o-contextual-help-drawer').addEventListener('oDrawer.open', function (e) {
  // Do something
});
```

### How do I debug?

Source maps are enabled for the webpack dev server. Using **Chrome dev tools** - open the "Sources" tab, navigate to `top/webpack://./`, and you will find the original source files for which you can set breakpoints in Chrome's debugger.

## Accessibility

### Keyboard focus

Refer to the [drawer](https://github.com/Pearson-Higher-Ed/drawer) documentation for accessibility on the drawer element. The drawer takes care of managing focus as the drawer is opened and closed, assuming all the links or buttons which trigger the drawer have a `data-open`, `data-close`, or `data-toggle` attribute and that is set to the string "drawer".

In contextual-help, there are at least 2 layers inside: one listing the help topics, and one with dedicated topic information. Only focusable elements within the visible layer should be reachable with keyboard focus and by assistive tech (AT) such as screen readers. When another layer slides into view, the now-invisible layer should no longer be available to keyboard or AT, and keyboard focus will move to the new layer.

When the default contextual-help (topics list) is opened, focus will be on the "Close Help" button. When a specific topic is opened, focus will be on the "Back to Help Topics" button. Focus will cycle through only the visible layer. If the specific-topic layer was triggered by clicking on a help topic from within contextual help, then clicking "Back to Help Topics" will bring keyboard focus back to that topic. Otherwise, focus moves to the "Close Help" button.

### Heading order

In the main topics list section, the phrase "Help Topics" is an h2 element. The name of each topic in the topics list is an h3 element.

In the specific-topic section, the name of the topic is an h2 element. Any headings inside the topic should be an h3 or smaller, starting with h3 for the main subtopics. They should not jump to h4, h5, or h6, but follow good content heading structure.

### Accordions/disclosure widgets

In order to include an accordion or disclosure widget inside content, the following must be included for it to work correctly:
The div surrounding all the content which has the accordions must have a class of `o-contextual-help__accordion`. This tells JavaScript to run the accordion function.

The path of the icon might be different for you locally. If the icon doesn't appear, check the path.

The clickable elements which reveal/hide the content must be buttons, however these buttons likely make sense to be inside headings if the clickable text is heading text. Example:

```
<div class="o-contextual-help__accordion">
<h3>
  <button class="o-disclosure pe-label pe-label--bold" aria-controls="...an id here..." aria-expanded="false">
    <svg aria-hidden="true" focusable="false" class="pe-icon--pivot-close-18">
      <use xlink:href="#pivot-close-18"></use>
    </svg>
    Heading Text Here
  </button>
</h3>

...

<div id="...an id here..." class="o-panel--closed">Hidden content here...</div>

...

</div>
```

The id of the div must be unique on the page and match the `aria-controls` attribute of its button and must have a class of either "o-panel--closed" (if it is default hidden) or "o-panel--opened" if it is by default open (if this is the case, the associated button above must have its `aria-expanded` attribute set to "true").

When the button is clicked and the matching div becomes visible, focus remains on the button, the button's `aria-expanded` attribute turns to "true" and the class name of the hidden content becomes `o-panel--opened`.

## Contributions

Please review the [guidelines](https://github.com/Pearson-Higher-Ed/docs/blob/master/origami-contributions.md) for contributing before getting started.

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
