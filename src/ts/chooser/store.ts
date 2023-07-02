import { get, writable } from "svelte/store";
import type { ArcFile, Params } from "../api/interface";
import { AppStore, ProcessStore } from "../applogic/store";
import type { ChooseDialogTargets } from "./interface";

export const chooseTargets: ChooseDialogTargets = writable<Params>({});

export function setTargetFile(id: number, file: ArcFile): boolean {
  const targets = get(chooseTargets);
  const targetId = targets[id];

  const processStore = get(ProcessStore);

  let index = null;

  for (const strI in processStore) {
    const i = parseInt(strI);
    if (processStore[i].id == targetId) index = i;
  }

  if (index == null) return false;

  processStore[index].openedFile = file;

  const processEvents = processStore[index].app.events;
  if (processEvents && processEvents.openFile)
    processEvents.openFile(processStore[index].id);

  delete processStore[index].overlayProcesses[id];

  ProcessStore.set(processStore);

  delete targets[id];

  chooseTargets.set(targets);

  return true;
}

export function getChooserTarget(id: string): string | false {
  const targets = get(chooseTargets);

  return targets[id] || false;
}

export function assignTarget(pid: number, targetPid: number): boolean {
  const targets = get(chooseTargets);

  if (targets[pid]) return false;

  targets[pid] = targetPid;

  chooseTargets.set(targets);

  return true;
}
