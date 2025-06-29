import { createHypertuneAdapter } from "@flags-sdk/hypertune";
import type { Identify } from "flags";
import { dedupe, flag } from "flags/next";
import {
  type Context,
  createSource,
  vercelFlagDefinitions as flagDefinitions,
  flagFallbacks,
  type RootFlagValues,
} from "./generated/hypertune";

const identify: Identify<Context> = dedupe(
  async ({ headers, cookies }) => {
    return {
      environment: process.env.NODE_ENV as "development" | "production" | "test",
      user: { id: "1", name: "Test User", email: "hi@test.com" },
    };
  },
);

const hypertuneAdapter = createHypertuneAdapter<
  RootFlagValues,
  Context
>({
  createSource,
  flagFallbacks,
  flagDefinitions,
  identify,
});

export const availableForWork = flag<boolean>(hypertuneAdapter.declarations.availableForWork)

export const showEventForm = flag<boolean>(hypertuneAdapter.declarations.showEventForm)

export const showLinkToCalendar = flag<boolean>(hypertuneAdapter.declarations.showLinkToCalendar)

export const getMainEmail = flag<string>(hypertuneAdapter.declarations.primaryEmail)

export const getSecondaryEmail = flag<string>(hypertuneAdapter.declarations.secondaryEmail)

// export const callToAction = flag(hypertuneAdapter.declarations.callToAction)
