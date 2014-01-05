# Ember Responsive Area

This is a very simple component for [Ember.js](http://emberjs.com/) that avoids rendering invisible areas of a responsive layout.

This component should only be used in areas that are visible depending on the window size.

## Usage

You can wrap the content of an area that will be visible depending on the window size. The `responsive-area` component must be inside the element that will be invisible.

```handlebars
<div class='hidden-phone'>
  {{#responsive-area}}
    My content
  {{/responsive-area}}
</div>
```

You also can extend a view with `EmberResponsiveArea.Mixin`.

```javascript
// This view will render only when it is visible.
MyView = Ember.View.extend(EmberResponsiveArea.Mixin);
```

## How it works

When the component is loaded it checks if the element is visible. If it's visible, the component will render the area inside it. If the element is invisible, it will listen to the window resize event to check the element visibility after the window is resized.

