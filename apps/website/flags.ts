"use server";
import { createClient } from "@yz13/flags";

const client = createClient({ appId: "yz13" });

export const getAvailability = async () =>
  client.get<boolean>("available-for-work");

export const showMiniApps = async () => client.get<boolean>("show-mini-apps");

export const showResources = async () => client.get<boolean>("show-resources");
