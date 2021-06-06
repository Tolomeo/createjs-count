import {
  createMachine,
  interpret,
  state,
  state as final,
  transition,
  reduce,
  guard,
  immediate,
  SendEvent,
} from "robot3";

export type CountContext = {
  max: number;
  next: number;
  prev: number;
};

export type CountEvent = {
  type: "count";
  number: number;
};

export const createCountState = (onChange: () => void) =>
  interpret(
    createMachine(
      "count",
      {
        count: state(
          immediate<CountContext, SendEvent>(
            "done",
            guard((ctx) => ctx.next > ctx.max),
          ),
          transition<CountContext, CountEvent>(
            "count",
            "count",
            guard((ctx, event) => event.number === ctx.next),
            reduce((ctx) => ({ ...ctx, next: ctx.next + 1, prev: ctx.next })),
          ),
        ),
        done: final(),
      },
      (): CountContext => ({
        max: 10,
        next: 1,
        prev: -1,
      }),
    ),
    onChange,
  );

export const createScreenState = (onChange: () => void) =>
  interpret(
    createMachine("menu", {
      menu: state(transition("start", "game")),
      game: state(transition("done", "over")),
      over: state(transition("restart", "game"), transition("quit", "menu")),
    }),
    onChange,
  );
