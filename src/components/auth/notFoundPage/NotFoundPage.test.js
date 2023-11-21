import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

import NotFoundPage from "./NotFoundPage";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("NotFoundPage Component", () => {
    render(<NotFoundPage/>);
    test("Home component should be available", () => {
        const component = screen.getByTestId("component-page-not-found");
        expect(component).toBeInTheDocument();
    });

    test("renders the component with the correct text", () => {
        render(<NotFoundPage/>);
        const title = screen.getByText("Page Not Found");
        const message = screen.getByText(
            "Sorry, the page you are looking for does not exist."
        );
        const goBackButton = screen.getByTestId("go-back-button");

        expect(title).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(goBackButton).toBeInTheDocument();
    });

    test('clicking the "Go Back" button triggers navigation', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
        render(<NotFoundPage/>);
        const goBackButton = screen.getByTestId("go-back-button");

        fireEvent.click(goBackButton);

        expect(navigate).toHaveBeenCalledWith(-1);
    });
});
