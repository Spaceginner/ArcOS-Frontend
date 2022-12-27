import AppManagerSvelte from "../../../lib/Apps/AppManager.svelte";
import type { App } from "../interface";
import logo from "../../../assets/apps/appmanager.svg";

export const AppManager: App = {
  info: {
    name: "Application Manager",
    description: "Manage Open Apps",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 600, h: 500 },
  pos: { x: 30, y: 40 },
  minSize: { w: 600, h: 500 },
  maxSize: { w: 600, h: 500 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: AppManagerSvelte,
  glass: false,
};