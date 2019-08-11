// @flow

import * as React from "react";

type EscListener = () => void;

// TODO: throw when used outside EscProvider
export const EscContext = React.createContext<{
  addListener: EscListener => void,
  removeListener: EscListener => void
}>({ addListener: () => {}, removeListener: () => {} });

export class EscProvider extends React.Component<
  { children: React.Node },
  { listeners: (() => void)[] }
> {
  state = { listeners: [] };

  keyListener = () => {
    const listener = this.state.listeners[this.state.listeners.length - 1];

    if (listener) {
      listener();
    }
  };

  componentDidMount() {
    document.addEventListener("keyup", this.keyListener);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.keyListener);
  }

  addListener = (listener: () => void) => {
    this.setState(({ listeners }) => ({
      listeners: [...listeners, listener]
    }));
  };

  removeListener = (listener: () => void) => {
    this.setState(({ listeners }) => ({
      listeners: listeners.filter(x => x !== listener)
    }));
  };

  render() {
    return (
      <EscContext.Provider
        value={{
          addListener: this.addListener,
          removeListener: this.removeListener
        }}
      >
        {this.props.children}
      </EscContext.Provider>
    );
  }
}
