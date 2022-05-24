const fs = require("fs");
jest.mock('fs');
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: 3,
      name: "Erica",
      age: 21,
      favoriteAnimal: "gorilla",
    },
    {
      id: 4,
      name: "Noel",
      age: 30,
      favoriteAnimal: "bear",
    },
  ];

  const filteredAge = filterByQuery({ age: "21" }, startingZookeepers);
  const filteredName = filterByQuery({name: "Erica"}, startingZookeepers);
  const filteredFavoriteAnimal = filterByQuery({favoriteAnimal: "bear"}, startingZookeepers);

  expect(filteredAge.length).toEqual(1);
  expect(filteredName.length).toEqual(1);
  expect(filteredFavoriteAnimal.length).toEqual(1);
});

test("find zookeeper by id", () => {
  const startingZookeepers = [
    {
      id: 3,
      name: "Erica",
      age: 21,
      favoriteAnimal: "gorilla",
    },
    {
      id: 4,
      name: "Noel",
      age: 30,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById(3, startingZookeepers);

  expect(result.name).toBe("Erica");
});

test("validates favorite zookeeper", () => {
  const zookeeper = {
    id: 3,
    name: "Erica",
    age: 21,
    favoriteAnimal: "gorilla",
  };

  const invalidZookeeper = {
    id: "abcd",
    name: "Erica",
    age: "gorilla",
    favoriteAnimal: "omnivore",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
