import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Header component Test cases", () => {
  test("Should load Header Component with Login button", () => {
    render(
      //JSDOM doesn't understand redux as its not JSX, so we provide the Store to the Header
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button");
    // const loginButton = screen.getByText("Login"); //We can either getByRole or getByText, but text is not a good option
    expect(loginButton).toBeInTheDocument();
  });

  test("Should load Header Component with Login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"}); // If there are multiple buttons, but we want specific button with name login we can pass extra parameters like this
    expect(loginButton).toBeInTheDocument();
  });

  test("Should render Header Component with Cart 0 items button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText("Cart - (0 items)");
    expect(cartItems).toBeInTheDocument();
  });

  test("Should render Header Component with Cart items button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cartItems = screen.getByText(/Cart/); // we can use Regex as well if we want to match irrespective of no.of items
    expect(cartItems).toBeInTheDocument();
  });

  test("Should render Header Component with Logout button when clicked on Login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});
    fireEvent.click(loginButton); // we can fire events like this, here we've fired click event
    const logoutButton = screen.getByRole("button", {name: "Logout"});
    expect(logoutButton).toBeInTheDocument();
  });
});
