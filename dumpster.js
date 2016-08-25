;(function() {

(global === undefined ? window : global).createStore = function(...reducers) {

  const states = [];
  const listeners = [];
  const history = [];

  /**
   * Call the listeners with the current state
   */
  const _notify = function(self) {
    const state = states[states.length - 1];

    listeners.forEach(listener => {
      listener.call(self, state);
    });   
  };

  return {

    /**
     * Subscribe a listener function
     */
    subscribe(listener) {
      listeners.push(listener);
    },

    /**
     * Dispatch an action, which passes the current
     * state from reducer to reducer, pushes the resulting
     * state and notifies all subscribers
     */
    dispatch(action) {
      const state = reducers.reduce(
        (carry, reducer) => reducer(carry, action), 
        states[states.length - 1]
      );
      
      states.push(state);
      _notify(this);
    },

    /**
     * Get the current state
     */
    get() {
      return states[states.length - 1];
    },

    /**
     * Undo the last action
     *
     * Optionally suppress notifying the listeners
     * to prevent nested dispatch loops
     */
    undo(notify = true) {

      if (!states.length) return;

      history.push(states.pop());
      
      if (notify) _notify(this);
    },

    /**
     * Redo the last undone action
     */
    redo(notify = true) {

      if (!history.length) return;

      states.push(history.pop());

      if (notify) _notify(this);
    }
  };
};

})();
