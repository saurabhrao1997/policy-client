// import { fireEvent, screen } from "@testing-library/dom";
// import { render } from "@testing-library/react";
// import { describe, expect, it } from "vitest";
// import Practice from "../../src/component/Practice";

import { screen } from "@testing-library/dom";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import Practice, { Button, useCounter } from "../../src/component/Practice";

describe("group list",()=>{
  it("testing intial",()=>{
    render(<Practice/>)
    expect(screen.getByText("Practice")).toBeInTheDocument();
  });
  it("checking props",()=>{
      render(<Practice show={false}/>);
      expect(screen.getByText(/signup/)).toBeInTheDocument()
  })

  it("checking update props",()=>{
    render(<Practice show={true}/>)
    expect(screen.getByText(/login/)).toBeInTheDocument()
  })

  it("initial state",async()=>{
    render(<Practice/>)
    let input = screen.getByLabelText(/Email/i)
  await   userEvent.type(input,"saurabh@gmail.com")   
     expect(input).toHaveValue("saurabh@gmail.com")
  });

  it("check onClick function",async()=>{
    let onClick = vi.fn()
    render(<Button onClick={onClick}/>);
    
   await userEvent.click(screen.getByText("click"))
   expect(onClick).toHaveBeenCalledOnce()

  });

  it("use custom hook testing",()=>{
    const {result} = renderHook(()=>  useCounter())

    expect(result.current.timer).toBe(0)
     
    act(()=>{
      result.current.increment()
    })

    expect(result.current.timer).toBe(1)
  })

  it("checking useEfect",async()=>{

    render(<Practice/>)
    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("prasad")).toBeInTheDocument()

  })



})
