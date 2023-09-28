import createCharacter from "../createCharacter";

test("Character creator utility function", () => {
  const characters = [
    createCharacter(
      "Jeff displayName",
      "Jeff uniqueIdentifier",
      "placeholder image 1"
    ),
    createCharacter(
      "Jane displayName",
      "Jane uniqueIdentifier",
      "placeholder image 2"
    ),
    createCharacter(
      "Jeffrey displayName",
      "Jeffrey uniqueIdentifier",
      "placeholder image 3"
    ),
  ];

  expect(characters).toMatchInlineSnapshot(`
Array [
  Object {
    "displayName": "Jeff displayName",
    "img": "placeholder image 1",
    "uniqueIdentifier": "Jeff uniqueIdentifier",
  },
  Object {
    "displayName": "Jane displayName",
    "img": "placeholder image 2",
    "uniqueIdentifier": "Jane uniqueIdentifier",
  },
  Object {
    "displayName": "Jeffrey displayName",
    "img": "placeholder image 3",
    "uniqueIdentifier": "Jeffrey uniqueIdentifier",
  },
]
`);
});
