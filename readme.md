## Synopsis

Simple set of functions that I wrote whilst working on redux applications to help with common use cases while maintaining immutability with in your reducers.

## Code Example

Import into file:

```js
  import { immutableMerge } from 'immutable-helpers';
```

Usage example:

```js
  case FETCH_EVENTS_SUCCESS:
    return immutableMerge(state, { list: action.payload, pending: false });
```

## Motivation

I found while writing Redux applications reducers soon looked messy returning objects, spreading other objects into them and the same with arrays. This is just an attempt to stop having to write that stuff over and over. This is a personal project for my specific uses cases and is in no way an attempt to say this is the way things should be done. If you have large, nested data sets then you should be using normalizr.

## Installation

  ```js
    npm i immutable-helpers --save
  ```

## API Reference

  ```js
  // takes 2 arrays and returns a single array
  immutableConcat(array1, array2)
  ```

  ```js
  // takes the array and an item to add, returns a single array
  immutablePush(array1, item)
  ```

  ```js
  // takes the array and the index of the item to remove, returns a single array
  immutableRemove(array1, 4)
  ```

  ```js
  // merges 2 objects, returns a single object
  immutableMerge(obj1, obj2)
  ```

  ```js
  // merges an array of objects, returns a single object
  immutableMergeMany([obj1, obj2, obj3, obj4, obj5])
  ```

  ```js
  /// takes the array, object and (optional) key returns a new array with object updated
  immutableUpdateObjectByKey(array, obj, key)
  ```
And thats it!!

## Tests

To run the tests:

  ```js
  npm i
  npm run test
  ```

## Contributors

If you want to contribute or comment raise a PR or just get in touch.
Add unit tests for any new or changed functionality. Lint and test your code.

## License

MIT
