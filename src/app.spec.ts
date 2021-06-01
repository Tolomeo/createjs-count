import App from "./app";

jest.mock("./config", () => ({
  stage: "#stage",
  width: 400,
  height: 900,
  framerate: 60,
}));

describe("App", () => {
  const { innerWidth, innerHeight } = window;

  afterAll(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: innerWidth });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: innerHeight });
  });

  test("static getDOMStage", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "stage";
    document.body.appendChild(canvas);

    const DOMStage = App.getDOMStage();

    expect(DOMStage).toBe(canvas);

    document.body.removeChild(canvas);
  });

  test("static getStageScale", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 3840 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 2160 });

    expect(App.getStageScale()).toBe(2.4);

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1920 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 1080 });

    expect(App.getStageScale()).toBe(1.2);

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 768 });

    expect(App.getStageScale()).toBe(0.8533333333333334);
  });
});
