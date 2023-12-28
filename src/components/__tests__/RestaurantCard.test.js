import { render, screen } from "@testing-library/react"
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard"
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

// Enzyme.configure({ adapter: new Adapter() })

test("Should render Restaurant Card component with props data", () => {
    render(<RestaurantCard resData={MOCK_DATA}/>);
    const restaurantName = screen.getByText("The Rameshwaram Cafe");
    expect(restaurantName).toBeInTheDocument();
})

test("Should render Restaurant Card with Promoted label", () => {
    const PromotedLabel = withPromotedLabel(RestaurantCard);

    render(<PromotedLabel resData={MOCK_DATA}/>);
    const promotedLabel = screen.getByText("Promoted");
    expect(promotedLabel).toBeInTheDocument();
})