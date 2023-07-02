import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App } from "./interface";
import { AppStore } from "./store";
import def from "../../assets/apps/unknown.svg";

export function hotSwapAppIcon(icon: string, appId: string) {
  Log({
    msg: `Changing app icon for ${appId} to ${icon}`,
    source: "icon.ts: hotSwapAppIcon",
    level: LogLevel.info,
  });

  const appStore = get(AppStore);

  if (!Originals[appId]) Originals[appId] = `${getAppIcon(appStore[appId])}`;

  appStore[appId].info.icon = icon;

  AppStore.set(appStore);
}

export function getOriginalIcon(appId: string) {
  return Originals[appId];
}

export function resetAppIcon(appId: string) {
  Log({
    msg: `Restting icon of ${appId}`,
    source: "icon.ts: resetAppIcon",
    level: LogLevel.info,
  });

  if (!Originals[appId]) return;

  const appStore = get(AppStore);

  appStore[appId].info.icon = Originals[appId];

  AppStore.set(appStore);
  
  delete Originals[appId];
}

export function getAppIcon(app: App): string {
  if (!app.info.builtin) return def;

  return app.info.icon;
}

const Originals: { [key: string]: string } = {};
