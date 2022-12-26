import { AppManager } from "./apps/AppManager";
import { AppPoker } from "./apps/AppPoke";
import { ErrorCreator } from "./apps/ErrorCreator";
import { Exit } from "./apps/Exit";
import { SettingsApp } from "./apps/settings";
import { TestApp } from "./apps/testApp";
import { UITester } from "./apps/testApp2";
import { openWindow } from "./events";
import type { App } from "./interface";
import { loadWindow } from "./load";
import { updateStores } from "./store";

export const DefaultApps: { [key: string]: App } = {
  testapp: TestApp,
  appman: AppManager,
  apppoker: AppPoker,
  uitester: UITester,
  exit: Exit,
  errcre: ErrorCreator,
  settings: SettingsApp,
};

export async function importDefault(open = false) {
  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    await loadWindow(entries[i][0], entries[i][1]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
