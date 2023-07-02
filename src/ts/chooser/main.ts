import { get } from "svelte/store";
import { ProcessStore } from "../applogic/store";
import { generateChooserOverlayProcess } from "./data";
import { assignTarget } from "./store";

export function showOpenFileDialog(targetPid: number) {
  const processStore = get(ProcessStore);

  const overlay = generateChooserOverlayProcess();

  assignTarget(overlay.id, targetPid);

  if (!processStore[targetPid].overlayProcesses) processStore[targetPid].overlayProcesses = {};

  processStore[targetPid].overlayProcesses[overlay.id] = overlay;

  ProcessStore.set(processStore);
}
