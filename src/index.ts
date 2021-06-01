import App from "./app";
import "./styles.css";

const init = () => {
  const stage = App.getDOMStage();
  return new App(stage).initialise();
};

document.addEventListener("DOMContentLoaded", init);
