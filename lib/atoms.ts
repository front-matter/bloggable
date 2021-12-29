import { atomWithHash } from "jotai/utils"

export const queryAtom = atomWithHash("query", "*")
export const pageAtom = atomWithHash("page", 1)
export const tagAtom = atomWithHash("tag", null)
