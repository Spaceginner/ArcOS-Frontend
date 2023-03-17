import { get } from "svelte/store";
import { focusedWindowId } from "../applogic/store";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";

export class ArcTermInput {
  private lockInput = false;
  target: HTMLDivElement;
  env: ArcTermEnv;
  term: ArcTerm;
  current: HTMLInputElement;

  constructor(t: HTMLDivElement, e: ArcTermEnv, T: ArcTerm) {
    this.target = t;
    this.env = e;
    this.term = T;

    this.commandLoop();
  }

  public commandLoop() {
    setInterval(() => {
      if (this.lockInput) return;

      this.lock();

      this.term.util.writeLine("\n");

      this.target.append(this.createPrompt());
    });
  }

  public lock() {
    this.lockInput = true;
  }

  public unlock() {
    this.lockInput = false;
  }

  public createPrompt() {
    if (this.current) this.current.disabled = true;

    const wrap = document.createElement("div");
    const prompt = document.createElement("div");
    const input = document.createElement("input");

    wrap.className = "prompt";

    prompt.className = "str";
    prompt.innerText = `${this.term.path || ""} ${this.env.prompt}`;

    input.id = `input#${Math.floor(Math.random() * 1e9)}`;
    input.addEventListener("keydown", (e) => this.processInputEvent(e, input));

    this.current = input;

    wrap.append(prompt, input);

    setTimeout(() => {
      if (get(focusedWindowId) == this.term.app.id) input.focus();
    });

    return wrap;
  }

  private processInputEvent(e: KeyboardEvent, input: HTMLInputElement) {
    const key = e.key.toLowerCase();
    const args = input.value.split(" ");
    const cmd = args[0];

    args.shift();

    if (key == "enter") this.term.evaluate(cmd, args);
  }
}
