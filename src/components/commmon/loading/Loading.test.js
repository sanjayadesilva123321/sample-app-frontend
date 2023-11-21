/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  test("should render a loading spinner and message", () => {
    render(<Loading />);
    
    // Find the loading indicator by data-testid
    const loadingIndicator = screen.getByTestId("component-loading");
    
    // Find the spinner by its role and animation type
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner-output");

    // Find the loading message by its text content
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
    
    // Ensure the loading indicator contains both the spinner and the message
    expect(loadingIndicator).toContainElement(spinner);
    expect(loadingIndicator).toContainElement(loadingMessage);
  });
});