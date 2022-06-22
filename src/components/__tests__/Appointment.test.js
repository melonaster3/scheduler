import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

describe("Appointment", () => {
    it("renders without crashing", () => {
      render(<Appointment />);
    });
  
it("renders header prop", () => {
    const { getByText } = render(  <header className="appointment__time">
    <h4 className="text--semi-bold">5pm</h4>
    <hr className="appointment__separator" />
  </header>);
    expect(getByText("5pm")).toBeInTheDocument();
  });

 


  });