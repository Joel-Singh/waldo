import { allMaps } from "../util/constants";

export default function runTestsWithAllMaps(testsCallback) {
  describe.each(allMaps)("for %s,", (mapName) => testsCallback(mapName));
}
