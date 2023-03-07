import createCharacter from "../createCharacter";

test("Character creator utility function", () => {
  const characters = [
    createCharacter(
      "Jeff displayName",
      "Jeff databaseName",
      "placeholder image 1"
    ),
    createCharacter(
      "Jane displayName",
      "Jane databaseName",
      "placeholder image 2"
    ),
    createCharacter(
      "Jeffrey displayName",
      "Jeffrey databaseName",
      "placeholder image 3"
    ),
  ];

  expect(characters).toMatchInlineSnapshot(`
Array [
  Object {
    "databaseName": "Jeff databaseName",
    "displayName": "Jeff displayName",
    "img": "placeholder image 1",
  },
  Object {
    "databaseName": "Jane databaseName",
    "displayName": "Jane displayName",
    "img": "placeholder image 2",
  },
  Object {
    "databaseName": "Jeffrey databaseName",
    "displayName": "Jeffrey displayName",
    "img": "placeholder image 3",
  },
]
`);
});
