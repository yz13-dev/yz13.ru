"use server"
import { createClient } from "@yz13/flags";



const client = createClient({ appId: "yz13" });


export const getAvailability = async () => client.get<boolean>("available-for-work");
