# dumpster
Another simple state container, mostly for fun.

## Sample Usage
```javascript
const reducer = function(state = 0, action) {

  switch (action) {

    case 'INCREMENT':
      return state + 1;

    case 'DECREMENT':
      return state - 1;

    default:
      return state;
  }
};

const resetter = function(state = 0, action) {

  switch (action) {

    case 'RESET':
      return 0;

    default:
      return state;
  } 
};

const listener = function(state) {

  console.log(state);

  if (state > 2) this.dispatch('RESET');
};

const dumpster = createStore(reducer, resetter);

dumpster.subscribe(listener);

dumpster.dispatch('INCREMENT'); // 1
dumpster.dispatch('INCREMENT'); // 2
dumpster.dispatch('INCREMENT'); // 3
                                // 0
```

##License
MIT
