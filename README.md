# jquery-paginate
jquery.paginate.js adds a simple pagination to a container and its child elements. 
##How to use
**1. Add jQuery and jquery.paginate.js to your page**
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="src/jquery.paginate.js"></script>
```
**2. Add jquery.paginate.css (optional)**
```html
<link rel="stylesheet" href="src/jquery.paginate.css" />
```
**3. Initialize the plugin**
```html
<script>
  $(foo).paginate({ 'perPage': 5 });
</script>
```

##Options
###perPage (integer)
Definies how many items are displayed per page.
###autoScroll (boolean)
If activated pagination links will trigger an animations, that smoothly scrolls to the top of the definied container.
###scope (string/element)
Definies which child elements will be targeted for the pagination (default: all).
**Example** 
```javascript
$(foo).paginate({ 'scope': $('li') }); //targets all li elements in foo
```
###paginatePosition (array)
Defines where the pagination will be placed.<br/> 
**top**: for above the container.<br/>
**bottom**: for below the container.


##Methods
###switchPage(pageNumber)
#####Description:
Jumps to page definied by parameter 'pageNumber'.

#####Usage:
```javascript
$(foo).data('paginate').switchPage(pageNumber)
$(foo).data('paginate').switchPage('next') //next page
$(foo).data('paginate').switchPage('prev') //previous page
```
#####Parameter:

**pageNumber** (integer): the index of the page you want the pagination to jump. You may also use **'prev'** and **'next'** instead of an integer to navigate to the previous or next page.

###kill()
#####Description:
Remove plugin from element

#####Usage:
```javascript
$(foo).data('paginate').kill()
```
##License
jquery.paginate.js is licensed under the MIT license. (http://opensource.org/licenses/MIT)
