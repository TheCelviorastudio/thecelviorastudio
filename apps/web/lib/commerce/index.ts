import { localProvider } from "./local";
import type { CommerceProvider } from "./provider";

export const commerce: CommerceProvider = localProvider;

export * from "./types";
