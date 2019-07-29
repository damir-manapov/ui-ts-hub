/**
 * TEST ONLY FEATURE
 * @param {number} from
 * @param {number} to
 */
function getRandomValueFromTo(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}

/**
 * TEST ONLY FEATURE
 * @param {any[]} entities
 * @returns {any}
 */
function getRandomEntity<T>(entities: T[]) {
  return entities[getRandomValueFromTo(0, entities.length)];
}

export { getRandomEntity, getRandomValueFromTo };
