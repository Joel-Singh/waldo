import { distance } from "mathjs";
import { flattenedCharacterInformation } from "./constants";

export default function isCharacterAtPosition(uniqueIdentifier, pos, withinDistance = 0) {
  const charPos = flattenedCharacterInformation.find(
    (character) => character.uniqueIdentifier === uniqueIdentifier,
  );

  return (
    distance([pos.x, pos.y], [charPos.coords.x, charPos.coords.y]) <=
    withinDistance
  );
}
