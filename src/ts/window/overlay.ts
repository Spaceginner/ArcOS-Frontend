import { get } from "svelte/store";
import { AppStore, ProcessStore } from "../applogic/store";

export function showOverlay(id: string, parentPid: number): boolean {
  const processStore = get(ProcessStore);

  if (!processStore[parentPid].overlayProcesses || !processStore[parentPid].overlayProcesses[id]) return false;

  processStore[parentPid].overlayProcesses[id].show = true;

  ProcessStore.set(processStore);
}

export function hideOverlay(id: string, parentPid: number): boolean {
  const processStore = get(ProcessStore);

  if (!processStore[parentPid].overlayProcesses || !processStore[parentPid].overlayProcesses[id]) return false;

  processStore[parentPid].overlayProcesses[id].show = false;

  ProcessStore.set(processStore);

  return true;
}
