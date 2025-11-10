import { getAvailability } from "@/flags";
import { useState } from "react";
import { useInterval } from "./use-interval";




export const useAvailable = () => {

  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const available = await getAvailability();

      setIsAvailable(available);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useInterval(() => {
    fetchAvailability();
  }, 10000);
  return [isAvailable, loading]
}
