// Plain objects and arrays cover most cases, but they have real limitations:
// object keys are always coerced to strings,
// and checking “does this array already contain X” with includes() is O(n) for every check. 
// Map and Set were added in ES6 specifically to solve these.

// Map is a collection of key-value pairs where keys can be any value, including objects and functions.
const scores = new Map();
scores.set("Alice", 10);
scores.set(42, "the answer"); // Numbers can be keys
objKey = { id: 1 };
scores.set(objKey, 20); // Objects as keys are allowed
scores.set(true, "yes"); // Boolean keys are also allowed

// Getting values from a Map is done with the .get() method, and checking for existence is done with .has().
console.log(scores.get("Alice")); // 10
console.log(scores.get(42)); // "the answer"
console.log(scores.has("Alice")); // true
console.log(scores.has(42)); // true
console.log(scores.size); // 4 - Map has a .size property that tells you how many entries it contains, not just .length like arrays do

const obj = {};
obj[42] = "the answer";
console.log(obj); // { '42': 'the answer' } - Object keys are always coerced to strings, so the number 42 becomes the string "42"

// Iterating over a Map
for (const [key, value] of scores) {
  console.log(key, value);
}
// or
scores.forEach((value, key) => console.log(key, value)); // value comes first in the callback, unlike in arrays

// Set is a collection of unique values. It can be used to store any type of value, whether primitive or object references.
const ids = new Set([1, 2, 2, 3, 3, 3]);
console.log(ids); // Set { 1, 2, 3 } - Sets automatically remove duplicates
console.log(ids.has(2)); // true
console.log(ids.size); // 3
ids.add(4);
console.log(ids); // Set { 1, 2, 3, 4 }
ids.delete(4);
console.log(ids); // Set { 1, 2, 3 }

// You can also use a Set to remove duplicates from an array:
const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3, 4]

// Need and use cases for each data structure:

// Keys are always strings, need JSON serialization - Object
// Keys can be any type, frequent add/remove, need .size - Map
// Ordered list, duplicates OK - Array
// Unique values only, fast .has() checks - Set

// Example - Note the new Map([...]) constructor syntax here,
// it takes an array of [key, value] pairs,
// [...inventory] (spreading a Map) works the same way in reverse,
// giving you back an array of pairs you can run filter on directly.

const inventory = new Map([
    ["apple", 50],
    ["banana", 30],
    ["orange", 25]
]);
inventory.set("apple", inventory.get("apple") + 10); // Increase apple stock by 10
const lowStock = [...inventory].filter(([item, quantity]) => quantity < 30).map(([item]) => item);

console.log(inventory.get("apple")); // Output: 60
console.log(lowStock); // Output: [ 'orange' ]