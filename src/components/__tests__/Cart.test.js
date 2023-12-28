import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_DATA from "../mocks/resMenuMock.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

test("Should load Restaurant Menu Component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Soups (10)");
  fireEvent.click(accordionHeader);
  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(10);

  expect(screen.getByText("Cart - (0 items)")).toBeInTheDocument();
});

test("Cart in Header should get updated on clicking Add Button in Menu Component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Soups (10)");
  fireEvent.click(accordionHeader);
  // const foodItems = screen.getAllByTestId("foodItems");

  const addButtons = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addButtons[0]);
  expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();
});

test("Cart in Header should get updated on when adding more item from Menu Component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Soups (10)");
  fireEvent.click(accordionHeader);
  // const foodItems = screen.getAllByTestId("foodItems");

  const addButtons = screen.getAllByRole("button", { name: "Add +" });
  // fireEvent.click(addButtons[0]);
  fireEvent.click(addButtons[1]);

  expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();
});

test("Cart should get updated with added items", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  //   const accordionHeader = screen.getByText("Soups (10)");
  //   fireEvent.click(accordionHeader);

  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(2);
});

test("Clear Cart should clear items in cart", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Soups (10)");
  fireEvent.click(accordionHeader);

  const clearCart = screen.getByRole("button", { name: "Clear Cart" });
  expect(clearCart).toBeInTheDocument();

  fireEvent.click(clearCart);
  expect(screen.getAllByTestId("foodItems").length).toBe(10);
  expect(screen.getByText("Cart is empty. Add items to the cart!")).toBeInTheDocument();
});
