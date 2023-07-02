import { get } from "svelte/store";
import { ProcessStore } from "./store";

let nextPID = 0;
let nextEPID = 0;

export function generatePID(): number {
    return ++nextPID;
}

export function generateEPID(): number {
    return ++nextEPID;
}

export function getPID(id: string): number | null {
    const processes = Object.entries(get(ProcessStore));

    for (let i = 0; i < processes.length; i++) {
        const process = processes[i][1]
        if (process.app.id == id) return process.id;
    }

    return null;
}
