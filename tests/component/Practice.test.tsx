
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Practice from "../../src/component/Practice";

describe("testing Practice pege render or not",()=>{
  it("check page render or not",()=>{
     render(<Practice/>);
  expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Enter task/i)).toBeInTheDocument();
  expect(screen.getByRole("button",{name:/Add Task/i})).toBeInTheDocument()

  })

  it("now add tack in list items",async()=>{
    render(<Practice/>);
    let input = screen.getByPlaceholderText("Enter task");
    let button = screen.getByRole("button");
    await userEvent.type(input,"pawan");
    await userEvent.click(button);
    expect(await  screen.findByText("pawan")).toBeInTheDocument();
  })

  
  it("nnow delete task",async()=>{
    render(<Practice/>);
    let input = screen.getByPlaceholderText("Enter task");
    let button = screen.getByRole("button");
    await userEvent.type(input,"pawan");
    await userEvent.click(button);
    expect(await  screen.findByText("pawan")).toBeInTheDocument();
    let deleteButton = screen.getByRole("button",{name:"Delete"});
    await userEvent.click(deleteButton)
        expect(screen.queryByText("pawan")).not.toBeInTheDocument();

  })
 
})



