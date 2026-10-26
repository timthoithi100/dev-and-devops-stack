// Destructuring values out of an object
const user = { name: "Tim", age: 25, role: "developer" };
const { name: userName, age: userAge } = user;
console.log(userName); // Output: Tim
console.log(userAge); // Output: 25

// Nested destructuring
const response = {
    data: { id: 1, profile: { email: "tim@example.com" } },
};
const { data: { profile: { email } } } = response;
console.log(email); // Output: tim@example.com

// Destructuring in function parameters
function greet({ name, role }) {
    console.log(`${name} is a ${role}`);
}
greet(user); // Output: Tim is a developer

// Using spread operator to create a new object
const updated = { ...user, age: 26 };
console.log(updated); // Output: { name: 'Tim', age: 26, role: 'developer' }
console.log(user); // Output: { name: 'Tim', age: 25, role: 'developer' } (original object remains unchanged)

// Merging objects using spread operator
const merged = { ...user, ...{ age: 30, city: "Nairobi" } };
console.log(merged); // Output: { name: 'Tim', age: 30, role: 'developer', city: 'Nairobi' }

// Spread operator creates a shallow copy of the object
const original = { name: "Tim", address: { city: "Nairobi" } };
const copy = { ...original };
copy.address.city = "Mombasa";
console.log(original.address.city); // Output: Mombasa (shallow copy, nested objects are still referenced)

// Object methods (Object.entries creates an array of key-value pairs from an object, allowing use of array methods like map, filter, and reduce)
console.log(Object.keys(user)); // Output: [ 'name', 'age', 'role' ]
console.log(Object.values(user)); // Output: [ 'Tim', 25, 'developer' ]
console.log(Object.entries(user)); // Output: [ [ 'name', 'Tim' ], [ 'age', 25 ], [ 'role', 'developer' ] ]

// Iterating over Object.entries using forEach
Object.entries(user).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// Example - Using Object.entries with map to create a summary string
const product = { name: "Laptop", price: 1000, inStock: true };
const { name, ...rest } = product;
const summary = Object.entries(product).map(([key, value]) => `${key}: ${value}`).join(", ");

console.log(name);
console.log(rest);
console.log(summary);
// Output:
// Laptop
// { price: 1000, inStock: true }
// name: Laptop, price: 1000, inStock: true