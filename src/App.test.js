// @flow

import * as React from "react";
import Classes from "./Classes";
import Hooks from "./Hooks";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const caseGroups = [
  { App: Classes, name: "classes" },
  { App: Hooks, name: "hooks" }
];

caseGroups.forEach(({ App, name }) => {
  test(name + ": shows pumps", () => {
    const { container, clickAccordion } = renderApp();

    expect(container).not.toHaveTextContent(/uncollapsed accordion content/i);

    clickAccordion();

    expect(container).toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(name + ": shows and hides pumps via mouse click", () => {
    const { container, clickAccordion } = renderApp();

    clickAccordion();
    clickAccordion();

    expect(container).not.toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(name + ": hides pumps via escape key", () => {
    const { container, clickAccordion, pressEsc } = renderApp();

    clickAccordion();
    pressEsc();

    expect(container).not.toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(name + ": shows image", () => {
    const { container, openImage } = renderApp();

    openImage();

    expect(container).toHaveTextContent(/pumpkin image/i);
  });

  test(name + ": hides image via escape key", () => {
    const { container, openImage, pressEsc } = renderApp();

    openImage();
    pressEsc();

    expect(container).not.toHaveTextContent(/pumpkin image/i);
  });

  test(name + ": accordion is still open when image is closed", () => {
    const { container, openImage, pressEsc } = renderApp();

    openImage();
    pressEsc();

    expect(container).toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(name + ": accordion is hidden when escape pressed twice", () => {
    const { container, openImage, pressEsc } = renderApp();

    openImage();
    pressEsc();
    pressEsc();

    expect(container).not.toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(
    name + ": several times accordion is hidden when escape pressed twice",
    () => {
      const { container, openImage, pressEsc } = renderApp();
      const TIMES = 5;

      for (let i = 0; i < TIMES; i++) {
        openImage();
        pressEsc();
        pressEsc();

        expect(container).not.toHaveTextContent(
          /uncollapsed accordion content/i
        );
      }
    }
  );

  test(name + ": image is hidden via click", () => {
    const { container, openImage, closeImageViaClick } = renderApp();

    openImage();
    closeImageViaClick();

    expect(container).not.toHaveTextContent(/pumpkin image/i);
    expect(container).toHaveTextContent(/uncollapsed accordion content/i);
  });

  test(
    name + ": accordion is closed on esc when image was hidden via click",
    () => {
      const {
        container,
        openImage,
        pressEsc,
        closeImageViaClick
      } = renderApp();

      openImage();
      closeImageViaClick();
      pressEsc();

      expect(container).not.toHaveTextContent(/uncollapsed accordion content/i);
    }
  );

  function renderApp() {
    const utils = render(<App />);

    utils.pressEsc = () => {
      fireEvent.keyUp(utils.container, { key: "Escape" });
    };

    utils.clickAccordion = () => {
      fireEvent.click(utils.getByText(/uncollapse or collapse/i));
    };

    utils.closeImageViaClick = () => {
      fireEvent.click(utils.getByText(/click to close image/i));
    };

    utils.openImage = () => {
      fireEvent.click(utils.getByText(/uncollapse or collapse/i));
      fireEvent.click(utils.getByText(/show nice pump/i));
    };

    return utils;
  }
});
