1. JavaScript Runtime Environments
JavaScript is a single-threaded, dynamically typed, prototype-based language. While the core language syntax and logic remain constant across environments, the runtime environment defines the host objects and APIs available to your code.
+-----------------------------------------------------------------------+
|                       JavaScript Engine Core                          |
|  (Call Stack, Heap Memory, Garbage Collector, Event Loop Execution)   |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+-------------------------------+   +-----------------------------------+
|        Browser Runtime        |   |           Node.js Runtime         |
+-------------------------------+   +-----------------------------------+
|  - DOM API (document)         |   |  - File System API (fs)           |
|  - Window Object (window)     |   |  - Process Control (process)      |
|  - Web Storage (localStorage) |   |  - Module Systems (require/import)|
|  - Fetch API                  |   |  - Operating System (os)          |
+-------------------------------+   +-----------------------------------+

 * Single-Threaded Execution: JavaScript executes code on a single main thread using a single Call Stack. It processes one operation at a time. Concurrency is handled asynchronously via the Event Loop, non-blocking I/O, and Web/C++ APIs provided by the hosting environment.
 * Dynamic Typing: Variables are not bound to a specific type; values are. A single variable can hold a string, then a number, then an object during runtime.
 * Host Environment Globals:
   * Browser: Exposes the window global object, document for HTML DOM manipulation, localStorage/sessionStorage, and UI-related APIs.
   * Node.js: Exposes the global object, process (environment details and process control), Buffer (binary data handling), and native modules like fs (file system) and path.
   * Interoperability: Global host APIs from one runtime do not exist in the other. For instance, calling window in Node.js or require('fs') in a browser will throw a ReferenceError.
2. Variable Declarations: var, let, and const
JavaScript variable declarations differ in scope, hoist behaviors, re-declaration rules, and mutability.
| Feature | var | let | const |
|---|---|---|---|
| Scope | Function Scope | Block Scope | Block Scope |
| Re-declaration | Allowed in same scope | Throws SyntaxError | Throws SyntaxError |
| Re-assignment | Allowed | Allowed | Throws TypeError |
| Initialization | Defaults to undefined | Must execute line | Must execute line |
| TDZ Access | Returns undefined | Throws ReferenceError | Throws ReferenceError |
Scoping Mechanics
 * Function Scope (var): Variables declared with var are constrained only by the nearest enclosing function. They ignore block boundaries like if, for, or while blocks, leaking into the outer function or global scope.
 * Block Scope (let/const): Variables declared with let or const are bound to the immediate pair of curly braces {} containing them.
if (true) {
  var leakyVar = "I leak outside this block";
  let scopedLet = "I am trapped in this block";
}

console.log(leakyVar); // "I leak outside this block"
console.log(scopedLet); // ReferenceError: scopedLet is not defined

Mutation vs. Reassignment
 * Reassignment: Changing the variable's reference pointer to point to a new memory address (e.g., x = 5). const explicitly forbids reassignment.
 * Mutation: Modifying the internal contents or properties of a data structure without changing its reference pointer. const does not protect against object/array property mutations.
const user = { name: "Alice" };
user.name = "Bob"; // Permitted: Mutating an internal property

const list = [1, 2];
list.push(3); // Permitted: Mutating array contents

user = { name: "Charlie" }; // TypeError: Assignment to constant variable.

The setTimeout Loop Mechanics
When using var inside a loop with asynchronous callbacks, every callback retains a reference to the same single variable binding in memory:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Outputs: 3, 3, 3

Step-by-step breakdown:
 * The for loop executes synchronously. var i is updated on the same memory reference: 0 \rightarrow 1 \rightarrow 2 \rightarrow 3.
 * The loop finishes. i sits at 3.
 * The asynchronous setTimeout callbacks trigger later. They look up i, resolved via scope chain lookup to the single var i binding, reading 3 three times.
Fixing this with let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Outputs: 0, 1, 2

let creates a new binding per iteration block. Each callback closes over its own distinct iteration-scoped i variable in memory.
3. Hoisting & The Temporal Dead Zone (TDZ)
Hoisting is JavaScript's compile-phase behavior where variable, function, and class declarations are registered in memory before code execution begins.
Compilation and Execution Phases
 * Compilation Phase: The engine parses the code, constructs the scope hierarchy, and registers variable names and function signatures in memory.
 * Execution Phase: The engine runs the code line-by-line, assigning values and executing function calls.
Compilation Phase: Registers 'a' (var), 'b' (let), 'myFunc' (Declaration)
---------------------------------------------------------------------
Execution Phase:   01: console.log(a) -> outputs undefined
                   02: var a = 10     -> 'a' is assigned 10
                   03: console.log(b) -> TDZ! ReferenceError thrown

var Hoisting
Variables declared with var are hoisted to the top of their function/global scope and automatically initialized with undefined. Accessing them prior to initialization yields undefined.
let and const Hoisting (The TDZ)
let and const declarations are also hoisted, but they remain uninitialized. The region of execution from the start of the block until the engine reaches the initialization line is known as the Temporal Dead Zone (TDZ). Accessing a variable while it resides in the TDZ throws a ReferenceError.
{
  // --- Start of Block Scope / Start of TDZ for 'value' ---
  console.log(value); // ReferenceError: Cannot access 'value' before initialization
  
  let value = 42; 
  // --- End of TDZ for 'value' ---
  
  console.log(value); // 42
}

Function Declarations vs. Function Expressions
 * Function Declarations: Fully hoisted (both identifier and implementation body). They can be safely invoked before their literal line appearance in the file.
 * Function Expressions: Only the variable declaration is hoisted, not the function assignment.
   * If defined via var, the variable hoists as undefined. Calling it before the assignment line throws a TypeError: myFunc is not a function.
   * If defined via let/const, the variable sits in the TDZ. Calling it throws a ReferenceError.
hoistedFunction(); // Executes successfully

function hoistedFunction() {
  console.log("Fully hoisted!");
}

expressionFunction(); // TypeError: expressionFunction is not a function

var expressionFunction = function() {
  console.log("Not hoisted!");
};

REPL vs. Script Evaluation
In standard JS files, the engine parses entire files or module scripts simultaneously, building complete scopes before running execution steps. In Read-Eval-Print Loops (REPLs) like Node's console, statements are evaluated line-by-line independently. Testing single-block behaviors (such as TDZ or hoisting) in a REPL often requires grouping the statement into a single execution block via an Immediately Invoked Function Expression (IIFE) or explicit { } block so the code parses as one unit.
4. Operators, Conditionals, and Control Flow
Equality: Strict (===) vs. Loose (==)
 * Strict Equality (=== / !==): Evaluates equality without implicit type coercion. Returns true only if both value and type match.
 * Loose Equality (== / !=): Performs implicit type coercion using abstract equality algorithms before comparison. This introduces non-intuitive edge cases and security bugs (e.g., "" == 0 is true, null == undefined is true, [ ] == false is true). Standard practice dictates strict equality everywhere.
Short-Circuit Logical Operators
&& and || do not produce strict boolean values. They return the actual value of one of their operands based on short-circuit evaluation:
 * Logical AND (&&): Evaluates operands left to right. Returns the first falsy value it encounters. If all values are truthy, returns the last value.
 * Logical OR (||): Evaluates operands left to right. Returns the first truthy value it encounters. If all values are falsy, returns the last value.
let result1 = "Cat" && "Dog"; // "Dog" (First is truthy, returns second)
let result2 = 0 && "Hello";   // 0 (First is falsy, short-circuits immediately)

let result3 = "" || "Default"; // "Default" (First is falsy, evaluates second)
let result4 = "User" || "Guest"; // "User" (First is truthy, short-circuits)

Falsy Values in JavaScript
There are precisely 8 falsy values in JavaScript:
 * false
 * 0 (and -0, 0n)
 * "" (empty string)
 * null
 * undefined
 * NaN
The Nullish Coalescing Operator (??)
?? provides fallback default handling, but unlike ||, it triggers only when the left-hand operand evaluates strictly to null or undefined. It preserves valid falsy data like 0, false, or "".
const config = {
  volume: 0,
  title: ""
};

// Logical OR overwrites valid falsy data:
const vol1 = config.volume || 50; // 50 (0 is falsy!)
const title1 = config.title || "Untitled"; // "Untitled" ("" is falsy!)

// Nullish Coalescing preserves valid falsy data:
const vol2 = config.volume ?? 50; // 0
const title2 = config.title ?? "Untitled"; // ""

// Chain expression evaluation:
const val = null ?? undefined ?? 0 ?? "fallback";
// 1. null is nullish -> moves to next
// 2. undefined is nullish -> moves to next
// 3. 0 is NOT nullish -> short-circuits and returns 0

Loop Interruptability: forEach vs for Loops
 * Array .forEach(): Higher-order function that executes a passed callback on every array item. It ignores standard control-flow interrupt statements (break or continue). A return inside a forEach callback acts like a continue in a standard loop; it simply exits the current callback invocation early and continues with the next element. forEach always returns undefined.
 * Standard Loops (for, for...of): imperative structures that retain full control flow. Executing break halts loop iteration entirely; continue skips immediately to the next loop iteration.
5. Functions, Arguments, and Default Parameters
Functions in JavaScript are first-class objects—they can be assigned to variables, passed as arguments, and returned from other functions.
Regular Functions vs. Arrow Functions
Arrow functions (() => {}) introduce concise syntax, but they differ fundamentally from regular functions (function() {}):
 * this Binding: Regular functions compute their this dynamically based on the call-site. Arrow functions lack a this binding; they close over and lexically capture the this value of their enclosing execution scope.
 * arguments Object: Regular functions possess a local pseudo-array arguments object containing all passed parameters. Arrow functions do not have an arguments object. Referencing arguments inside an arrow function causes a scope lookup, referencing an outer scope's arguments or throwing a ReferenceError.
 * Constructor Ability: Regular functions can act as constructors via the new operator. Arrow functions throw a TypeError if invoked with new because they lack an internal [[Construct]] method and prototype object.
function RegularFunc() {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
}
RegularFunc(1, 2);

const ArrowFunc = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};
ArrowFunc(1, 2);

Default Parameters Execution Mechanics
Default parameters trigger if and only if an argument is undefined (or omitted). Passing explicit null does not trigger default assignments, because null is an explicit assignment of type object.
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

greet(undefined); // "Hello, Guest" (Triggers default)
greet();          // "Hello, Guest" (Triggers default)
greet(null);      // "Hello, null"  (Does NOT trigger default)

Rest Parameters (...args)
Rest parameters collect any remaining individual arguments into a true Array instance.
 * Unlike the legacy arguments object (which is array-like, lacking array methods like .map() or .filter()), rest parameters provide access to all standard array prototypes.
 * Rest parameters work inside both arrow functions and regular functions.
 * Rest parameters must be the final parameter in a function's parameter list.
const multiply = (factor, ...numbers) => {
  // 'numbers' is a real Array instance
  return numbers.map(num => num * factor);
};

multiply(2, 10, 20, 30); // [20, 40, 60]

6. The this Keyword Mechanics
The value of this inside a function is dynamic and calculated strictly at invocation time (call site), rather than definition time—with the explicit exception of arrow functions.
How was the function called?
+-----------------------------------------------------------------+
| Invoked with 'new'?               --> 'this' = newly created obj|
| Explicit binding (call/apply/bind)--> 'this' = explicit target  |
| Called as method (obj.func())     --> 'this' = object before dot|
| Standalone invocation (func())    --> 'this' = undefined/global |
| Arrow Function                    --> 'this' = lexical outer    |
+-----------------------------------------------------------------+

Rule 1: Method Call (Implicit Binding)
When a function is called as a property on an object, this evaluates to the object preceding the dot ..
const user = {
  name: "Alice",
  getName() {
    return this.name;
  }
};

user.getName(); // 'this' is user object -> Returns "Alice"

Rule 2: Standalone Function Invocation (Default Binding)
When a function is called standalone (without a context object):
 * Strict Mode ("use strict";): this defaults to undefined.
 * Sloppy Mode (Default in Node REPL / CommonJS): this defaults to the global target (window in browsers, global in Node.js).
 * Common Trap (Lost Context): Extracting a method to a standalone variable separates the method from its host object.
const detachedGetName = user.getName;
detachedGetName(); 
// Sloppy mode -> returns undefined (or window.name/global.name)
// Strict mode -> TypeError: Cannot read property 'name' of undefined

Rule 3: Lexical Binding (Arrow Functions)
Arrow functions ignore all call-site dynamic binding rules. Instead, they capture the this value of their enclosing scope at instantiation time.
const timer = {
  name: "Timer Task",
  start() {
    // Arrow function captures 'this' from start() context (which is 'timer')
    setTimeout(() => {
      console.log(this.name); // "Timer Task"
    }, 100);
  }
};
timer.start();

Rule 4: Constructor Calls (new Operator)
When a function is called with the new keyword:
 * A fresh, plain JavaScript object {} is allocated in memory.
 * The function's internal this context is bound to this new object.
 * The new object's internal prototype (__proto__) is linked to the function's .prototype object.
 * The function executes. If it does not explicitly return its own object, it implicitly returns this.
The instanceof Operator
The instanceof operator tests whether the .prototype property of a constructor function appears anywhere along the prototype chain of an object.
function Person(name) {
  this.name = name;
}

const alice = new Person("Alice");

console.log(alice instanceof Person); // true
// Checks if Person.prototype is in alice's prototype chain (__proto__)

7. DOM Manipulation and Styling Paradigms
The Document Object Model (DOM) represents the structure of an HTML document as an in-memory tree of nodes.
Querying Elements
 * document.querySelector(selector): Accepts any valid CSS selector string (e.g., #id, .class, div > p). Returns the first matching Element node or null if no matches are found.
 * document.querySelectorAll(selector): Returns a static NodeList containing all matching element nodes.
   * Note: A NodeList is array-like; it supports .forEach(), but lacks methods like .map() or .filter(). It can be converted into a true array via Array.from(nodeList) or using the spread operator [...nodeList].
Content Manipulation: textContent vs innerHTML
 * element.textContent: Reads or sets the plain text content of an element and its descendants. It treats assigned strings purely as text data, skipping the HTML parser. This guarantees protection against Cross-Site Scripting (XSS) injection attacks when rendering dynamic string inputs.
 * element.innerHTML: Reads or parses raw HTML markup strings. Setting innerHTML causes the browser's HTML parser to process and render any elements inside the input string.
   * XSS Hazard: Assigning unvalidated, user-controlled input directly to innerHTML allows attackers to inject malicious execution scripts.
const userInput = "<img src='x' onerror='alert(\"Hacked!\")'>";

// Safe: Renders code as harmless plain text on screen
element.textContent = userInput; 

// Dangerous: Executes arbitrary inline script handler
element.innerHTML = userInput; 

CSS Style Management: Inline Styles vs Class Lists
 * Inline Style Assignment (element.style.color = "blue"): Directly modifies the element's individual HTML style="" attribute.
   * Disadvantages: Creates high CSS specificity that overrides external stylesheets, tightly couples presentation with application logic, and prevents clean style reuse.
 * Class List API (classList): The standard, decoupled approach to state-driven styling. Logic toggles visual states by altering class names, while actual visual presentations remain in CSS files.
   * element.classList.add("active") — Adds one or more classes.
   * element.classList.remove("active") — Removes one or more classes.
   * element.classList.toggle("active") — Adds the class if absent; removes it if present.
   * element.classList.contains("active") — Returns true or false based on class presence.
<!-- HTML -->
<button id="themeToggle" class="btn">Toggle Theme</button>

/* CSS */
.btn { background-color: #eee; color: #333; }
.btn.dark-mode { background-color: #333; color: #fff; }

// JavaScript
const button = document.querySelector("#themeToggle");

button.addEventListener("click", () => {
  // Drives presentation state changes safely via class toggling
  button.classList.toggle("dark-mode");
});

