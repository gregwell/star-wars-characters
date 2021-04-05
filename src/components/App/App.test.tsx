import { render } from "@testing-library/react";
import App from "./App";
import MockIntersectionObserver from './__mock__/MockIntersectionObserver';

window.IntersectionObserver = MockIntersectionObserver;

it("renders without crashing", () => {
    render(<App />);
  });