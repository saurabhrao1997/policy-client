import { useEffect } from "react";

export default function Practice() {
  useEffect(() => {
    const handleResize = () => {
      console.log("resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <h1>Resize Component</h1>;
}