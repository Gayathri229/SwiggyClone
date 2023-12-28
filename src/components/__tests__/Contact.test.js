import { render,screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page test cases", () => {
    test("Should load Contact component", () => {

        //Rendering
        //Will be rendered to the JSDOM
        render(<Contact/>);
    
        //Querying
        //gets all the headings from the rendered screen
        const heading = screen.getByRole("heading"); // getBy always means one/single occurrence
    
        //Assertion
        expect(heading).toBeInTheDocument();
    
    })
    
    
    test("Should load button in Contact component", () => {
    
        render(<Contact/>);
    
        const button = screen.getByRole("button"); 
    
        expect(button).toBeInTheDocument();
    
    })
    
    
    test("Should load input name in Contact component", () => {
    
        render(<Contact/>);
    
        const inputName = screen.getByPlaceholderText("name"); 
    
        expect(inputName).toBeInTheDocument();
    
    })
    
    test("Should load 2 input boxes in Contact component", () => {
        render(<Contact/>);
        const inputBoxes = screen.getAllByRole("textbox"); //getAll... returns all the occurrences
        expect(inputBoxes.length).toBe(2);
        expect(inputBoxes.length).not.toBe(3);
        // console.log(inputBoxes);
    })
})
