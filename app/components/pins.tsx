import { getPinsV1PinsRecommendations } from "@yz13/api";
import PinsGrid from "./pins/pins-grid";

export default async function () {
    const pins = await getPinsV1PinsRecommendations();

    return <PinsGrid pins={pins} />;
}
