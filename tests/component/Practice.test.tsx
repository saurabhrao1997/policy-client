import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Practice from "../../src/component/Practice";

describe("Practice page",()=>{
  it("first test",()=>{
    const addSpy = vi.spyOn(window,"addEventListener");
    const removeSpy = vi.spyOn(window,"removeEventListener");
   const consoleSpy = vi.spyOn(console,"log").mockImplementation(()=>{})
  const {unmount} =  render(<Practice/>)
    expect(addSpy).toHaveBeenLastCalledWith("resize",expect.any(Function))
    window.dispatchEvent(new Event("resize"))
    expect(consoleSpy).toHaveBeenCalledWith("resized")
    unmount()
    expect(removeSpy).toHaveBeenLastCalledWith("resize",expect.any(Function))
    vi.resetAllMocks()

  })
})



