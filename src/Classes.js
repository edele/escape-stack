// @flow

import * as React from "react";
import { EscProvider, EscContext } from "./ClassesEscContext";

export default function App() {
  return (
    <div>
      <EscProvider>
        <Accordion>
          <Card />
        </Accordion>
      </EscProvider>
    </div>
  );
}

class Accordion extends React.Component<
  { children: React.Node },
  { isOpen: boolean }
> {
  static contextType = EscContext;

  onEscape = () => {
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    this.context.addListener(this.onEscape);
  }

  componentWillUnmount() {
    this.context.removeListener(this.onEscape);
  }

  state = { isOpen: false };

  render() {
    return (
      <div style={{ background: "violet" }}>
        <button
          onClick={() => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))}
        >
          uncollapse or collapse
        </button>
        {this.state.isOpen && <div>{this.props.children}</div>}
      </div>
    );
  }
}

class Card extends React.Component<{}, { selected: null | string }> {
  state = { selected: null };

  render() {
    const pumps = [
      {
        id: "1",
        name: "Nice pump",
        imageUrl: "https://i.imgur.com/3GJVznw.jpg"
      },
      {
        id: "2",
        name: "Nasty pump",
        imageUrl: "https://i.imgur.com/ifZ6EvP.jpg"
      }
    ];

    return (
      <div>
        <h3>Uncollapsed accordion content</h3>
        <ul>
          {pumps.map(p => (
            <li key={p.id}>
              <button onClick={() => this.setState({ selected: p.id })}>
                show {p.name}
              </button>
              {this.state.selected === p.id && (
                <ImagePopup
                  url={p.imageUrl}
                  alt={p.name}
                  onClose={() => this.setState({ selected: null })}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

type ImagePopupProps = { url: string, alt: string, onClose: () => void };

class ImagePopup extends React.Component<ImagePopupProps> {
  static contextType = EscContext;

  onEscape = () => {
    this.props.onClose();
  };

  componentDidMount() {
    this.context.addListener(this.onEscape);
  }

  componentWillUnmount() {
    this.context.removeListener(this.onEscape);
  }

  render() {
    const { url, alt, onClose } = this.props;

    return (
      <div className="popup">
        <img src={url} alt={alt} />
        <div style={{ color: "violet", fontStyle: "italic" }}>
          Pumpkin image. Push ESC or{" "}
          <button onClick={onClose}>click to close image</button>
        </div>
      </div>
    );
  }
}
