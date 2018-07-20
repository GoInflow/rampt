# RAMPT — Revised AMP Templates
Script to lazy load images inspired by Google AMP technology

## Motivation
Google AMP is great but it is too strict and it is difficult to implement on existing sites. RAMPT speeds up your load time but it is easier to implement.

## Installation
Insert the content of rampt.min.html file in the head tag of your site and insert the following script above the closing body tag

```html
<script>
  setup_rampt_imgs();
</script>
```

## Usage
1. Replace **img** tags with **rampt-img**
2. Add **width** and **height** attributes
3. Add a **layout** attribute, the following options are options are available:
   - **fixed**: Doesn't resize the image
   - **responsive**: Resize images to fit their container, width and height attributes do not need to match the exact width and height, the script just need that values to calculate the aspect ratio
   
## Browser Support
This script uses Intersection Observer API, which is available on [some browsers only] (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) To use it on more browsers you can insert a [Intersection Observer polyfill] (https://github.com/w3c/IntersectionObserver) above the RAMPT script tag
   
## Additional steps
This script improves image loading but to optimize the site additional steps are necessary. Please visit our [blog post] (https://www.goinflow.com/amp-mobile-pagespeed-score/) for more information 
   
## License
MIT © [Inflow] (https://www.goinflow.com)
