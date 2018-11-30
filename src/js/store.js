const counter = function counter(state, action) {
  const currentState = state || 0;
  switch (action) {
    case 'INCREMENT': {
      return state + 1;
    }
    case 'DECREMENT': {
      return state - 1;
    }
    default:
      return currentState;
  }
};

class Store {
  constructor(mid) {
    this.middlewares = mid || [];
    this.subscribers = [];
    this.prevState = {};
    this.state = {};
    this.state = this.reduce(this.state, {});

    if (this.middlewares.length > 0) {
      this.dispatch = this.combineMiddlewares();
    }
  }

  getState() {
    return this.state;
  }

  getPrevState() {
    return this.prevState;
  }

  dispatch(action) {
    this.prevState = this.state;
    this.state = this.reduce(this.state, action);
    this.notifySubscribers();

    return action;
  }

  combineMiddlewares() {
    const self = this;
    let { dispatch } = this;

    const middlewaresAPI = {
      getState: this.getState.bind(this),
      dispatch: action => dispatch.call(self, action),
    };

    // Inject store proxy into all middleware
    const chain = this.middlewares.map(middlewares => middlewares(middlewaresAPI));

    // Init reduceRight with middlewareAPI.dispatch as initial value
    dispatch = chain.reduceRight((composed, fn) => fn(composed), dispatch.bind(this));

    return dispatch;
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notifySubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.prevState, this.state);
    });
  }
}

Store.prototype.reduce = function reduce(state, action) {
  return {
    counter: counter(state.counter, action),
  };
};

window.Store = Store;
export { Store as default };
