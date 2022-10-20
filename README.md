# react-url-slugify

![Build status](https://github.com/foridpathan/react-url-slugify/workflows/tests/badge.svg)
[![Dependencies](https://github.com/foridpathan/react-url-slugify)](https://github.com/foridpathan/react-url-slugify)

Generate slug using React URL Slugify with Unicode supported.

## Usage

### `slugify(node[, options])`

- `node` String, Number, Fragment, Array of nodes
- `options` Object (optional)
  - `delimiter` String (default is `'-'`)
  - `prefix` String (default is `''`)
  - `keyword` String (default is `false`)
  - `number` String (default is `false`)
  
## Examples

```tsx
import slugify from 'react-url-slugify';

slugify('something I want to test');
// -> "something-i-want-to-test"

slugify(<span>Yes it works like that too</span>);
// -> "yes-it-works-like-that-too"

slugify(
  <>
    <span>and</span>
    <span>with</span>
    <span>fragments or arrays</span>
  </>
);
// -> "and-with-fragments-or-arrays"

slugify(<h3>আমার সোনার বাংলা আমি তোমায় ভালোবাসি</h3>, { delimiter: '_' });
// -> আমার_সোনার_বাংলা_আমি_তোমায়_ভালোবাসি
// -> user-content_creme_brulee_receipe
```
