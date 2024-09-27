import { useEffect } from "react";
import "./home.css";

export function Home() {

  useEffect(() => {
    document.body.style.setProperty("background", "linear-gradient(#0007, #0000), #123")

    return () => {
      document.body.style.removeProperty("background");
    }
  }, []);

  return (
    <div className="firework-container">
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
    </div>
  )
}
