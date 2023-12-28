import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/restaurantListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

describe("Search functionality test cases", () => {

  beforeAll(() => { 
    // Jest gives access to this method. It takes a callback function and can be used to run/do something before running all tests
    // console.log("Before All");
  })

  beforeEach(() => { 
    //  Jest gives access to this method. It takes a callback function and can be used to run/do something before running each test
    // console.log("Before Each");
  })

  afterAll(() => {
    // console.log("After all");
  })

  afterEach(() => {
    // console.log("After each");
  })

  test("Should search restautant list for cafe text input", async () => {
    await act(async () =>
      // wrap component inside act() if there are state updates in the Component.
      // act() returns a promise, so async await. And takes a callback function which also an async function
  
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    ); // here error will be thrown because we've used fetch function(super power of browser) for aysnc api fetch operation. But JS DOM(browser-like env) doesn't have this power.
  
    const resCardsBeforeSearch = screen.getAllByTestId("resCard"); // we've given data-tesid as resCard in Restaurant card component to use it like this here
    expect(resCardsBeforeSearch.length).toBe(9);
  
    const searchButton = screen.getByRole("button", { name: "Search" });
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: { value: "cafe" } }); // this line inputs cafe in the search input box
    expect(searchButton).toBeInTheDocument();
  
    fireEvent.click(searchButton);
  
    const resCardsAfterSearch = screen.getAllByTestId("resCard");
    expect(resCardsAfterSearch.length).toBe(3);
  });
  
  test("Should render top listed restaurants", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );
  
    const cardsBeforeFilter = screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(9);
  
    const topRatedButton = screen.getByRole("button", {name: "Top Rated Restaurants"});
    expect(topRatedButton).toBeInTheDocument();
  
    fireEvent.click(topRatedButton);
    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(3);
  });
  
})
