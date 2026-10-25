const nums = [1, 2, 3, 4, 5, 6];

// Using map to create a new array with each number doubled
const doubled = nums.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(nums); // [1, 2, 3, 4]

// Using filter to create a new array with only even numbers
const evenNums = nums.filter(num => num % 2 === 0);
console.log(evenNums); // [2, 4, 6]

// Using reduce to calculate the sum of all numbers in the array
const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 21

const words = ["a", "bb", "ccc"];

// Using reduce to calculate the total length of all words in the array
const totalLength = words.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0);
console.log(totalLength); // 6

// Using reduce to group numbers into even and odd
const grouped = [1, 2, 3, 4, 5, 6].reduce((accumulator, currentValue) => {
  const key = currentValue % 2 === 0 ? 'even' : 'odd';
  accumulator[key].push(currentValue);
  return accumulator;
}, { even: [], odd: [] });
console.log(grouped); // { even: [2, 4, 6], odd: [1, 3, 5] }

// Using find to locate a specific user in an array of objects
const users = [{ id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Charlie' }];
const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: 'Bob' }
console.log(users.find(user => user.id === 4)); // undefined

// Using some and every to check conditions on the array
console.log(nums.some(num => num > 5)); // true
console.log(nums.every(num => num > 0)); // true
console.log(nums.some(num => num > 9)); // false
console.log(nums.every(num => num > 3)); // false

const orders = [
  { id: 1, total: 100, paid: true },
  { id: 2, total: 200, paid: false },
  { id: 3, total: 150, paid: true }
];

// Using filter and reduce together to calculate the total of paid orders
const paidTotal = orders
  .filter(order => order.paid)
  .reduce((acc, order) => acc + order.total, 0);
console.log(paidTotal); // 250