// Destructuring values out of an object
const user = { name: "Tim", age: 25, role: "developer" };
const { name: userName, age: userAge } = user;
console.log(userName); // Output: Tim
console.log(userAge); // Output: 25

// Nested destructuring
const response = {
    data: {id: 1, profile: { email: "tim@example.com" }},
};
const { data: { profile: { email } } } = response;
console.log(email); // Output: tim@example.com

// Destructuring in function parameters
function greet({ name, role }) {
    console.log(`${name} is a ${role}`);
}
greet(user); // Output: Tim is a developer

// Using spread operator to create a new object
const updated = {...user, age: 26};
console.log(updated); // Output: { name: 'Tim', age: 26, role: 'developer' }
console.log(user); // Output: { name: 'Tim', age: 25, role: 'developer' } (original object remains unchanged)

