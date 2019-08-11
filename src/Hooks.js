// @flow

import * as React from "react";

export default function App() {
  return (
    <div>
      <Accordion>
        <Card />
      </Accordion>
    </div>
  );
}

function Accordion({ children }) {
  const [isOpen, setOpen] = React.useState(false);

  useEscape(() => setOpen(false), "accordion");

  return (
    <div style={{ background: "violet" }}>
      <button onClick={() => setOpen(x => !x)}>uncollapse or collapse</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

function Card() {
  const [selected, setSelected] = React.useState(null);

  function onClose() {
    setSelected(null);
  }

  const pumps = [
    { id: "1", name: "Nice pump", imageUrl: "https://i.imgur.com/3GJVznw.jpg" },
    { id: "2", name: "Nasty pump", imageUrl: "https://i.imgur.com/ifZ6EvP.jpg" }
  ];

  return (
    <div>
      <h3>Uncollapsed accordion content</h3>
      <ul>
        {pumps.map(p => (
          <li key={p.id}>
            <button onClick={() => setSelected(p.id)}>show {p.name}</button>
            {selected === p.id && (
              <ImagePopup url={p.imageUrl} alt={p.name} onClose={onClose} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ImagePopupProps = { url: string, alt: string, onClose: () => void };

function ImagePopup({ url, alt, onClose }: ImagePopupProps) {
  useEscape(() => onClose(), "popup");

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

// ************** //

// TODO: fix bug if hook is used outside of target
// TODO: move to context?
// TODO: does it make sense to use several instances via different context providers?

const globalEscapeListenersStack = [];
const namesStack = [];

document.addEventListener("keyup", keyListener);

function keyListener(event: KeyboardEvent) {
  if (event.key === "Escape") {
    const lastHandler =
      globalEscapeListenersStack[globalEscapeListenersStack.length - 1];
    lastHandler && lastHandler();

    namesStack.pop();
  }
}

function useEscape(onEscape, name) {
  React.useEffect(() => {
    globalEscapeListenersStack.push(onEscape);

    return () => {
      globalEscapeListenersStack.pop();
    };
  }, [onEscape]);
}
