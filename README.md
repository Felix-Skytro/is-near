
## Disclaimer  
I (**Skytro // Felix**) do **not** own this code in any way!  

I only fixed the script to work properly with modern versions of JavaScript.  
The original repository by [pazguille](https://github.com/pazguille) hasn't been updated in **over 10 years**,  
so I decided it would be best to fork the repo and apply the necessary fixes there.  

**Huge thanks to pazguille!** Your work made my job much easier—big shoutout to you! ❤️  


# is-near

Calculates if the mouse position is near to a given element.

It's cross-browser compatible:
- Chrome
- Firefox
- Opera
- Safari
- IE9
- IE8
- IE7

## Installation

    $ component install pazguille/is-near

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version:
```html
<script src="is-near.js"></script>
```

## How-to

```js
var isNear = require('is-near'),
    box = document.getElementById('box');

document.addEventListener('mousemove', function () {
    var near = isNear(box, 50);

    if (near) {

        if (near === 'inside') {
            box.style.backgroundColor = '#8e44ad';
            box.innerHTML = 'Inside';
        } else {
            box.style.backgroundColor = '#2ecc71';
            box.innerHTML = 'Yes';
        }

    } else {
        box.style.backgroundColor = '#c0392b';
        box.innerHTML = 'No';
    }
});
```

## API

### isNear(element, [distance])
Calculates if the mouse position is near to a given `element`. Returns a boolean value (`true` or `false`) or string (`inside`).
- `element` - A given DOMElement.
- `distance` [optional] - Minimum distance (in pixels) between the `element` and mouse position.

```js
isNear(someElement, 20);
```

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille) Licensed under the MIT license.
