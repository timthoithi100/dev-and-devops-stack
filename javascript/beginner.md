# JavaScript — Beginner

## 1. JavaScript Runtime Environments

JavaScript is a single-threaded, dynamically typed, prototype-based language. The language specification (ECMAScript) defines syntax and core mechanics, but JavaScript cannot execute without a host environment.

```
    ECMAScript (Core Language: Syntax, Types, Objects, Functions)
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
 Browser Host                                      Node.js Host
 (window, document, DOM APIs, fetch)               (global, process, require, fs)
```

- **Single-Threaded Mechanics:** JS executes one instruction at a time on a single thread, using an Event Loop to delegate blocking work (timers, network calls, file access) to the host system.
- **Core language vs. host globals:** `Array`, `Object`, `Math`, `JSON` exist everywhere. Host globals do not cross platforms:
  - **Browser:** `window`, `document`, DOM APIs, `fetch`, `localStorage`
  - **Node.js:** `global`, `process`, `require`/`module`, `fs`, `path`, `http`

```js
console.log(typeof window);  // "object" in browser, "undefined" in Node
console.log(typeof require); // "function" in Node, "undefined" in browser
```

---

## 2. Variable Declarations: `var`, `let`, `const`

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block `{}` | Block `{}` |
| Hoisting | Hoisted, initialized `undefined` | Hoisted, uninitialized (TDZ) | Hoisted, uninitialized (TDZ) |
| Re-declaration | Allowed | `SyntaxError` | `SyntaxError` |
| Re-assignment | Allowed | Allowed | `TypeError` |

```js
// Block scope vs. function scope
if (true) {
  var functionScoped = "leaks out of blocks";
  let blockScoped = "trapped inside this block";
}
console.log(functionScoped); // works
console.log(blockScoped);    // ReferenceError

// Mutation vs. reassignment
const user = { name: "Alice" };
user.name = "Bob";            // OK — mutating, not reassigning
user = { name: "Charlie" };   // TypeError
```

**Closure preview — the `setTimeout` loop:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3 — one shared `i` binding for the whole loop

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// 0, 1, 2 — a fresh `j` binding created per iteration
```

---

## 3. Hoisting & the Temporal Dead Zone (TDZ)

Before execution, the engine registers all declarations in the current scope.

- **`var`:** memory allocated, initialized to `undefined` immediately.
- **`let`/`const`:** memory allocated, left uninitialized. The gap between scope entry and the declaration line is the **TDZ** — accessing the variable there throws `ReferenceError`.

```js
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

**Function declarations vs. expressions:**

```js
sayHello(); // works — fully hoisted (name + body)
function sayHello() { console.log("Hello"); }

sayGoodbye(); // TypeError: not a function
var sayGoodbye = function() { console.log("Goodbye"); };
```

**Node REPL edge case:** the REPL parses and runs line-by-line, so hoisting can't be observed across separate entries. Wrap the block in an IIFE so it's parsed as one unit:

```js
(() => {
  console.log(x); // undefined
  var x = 100;
})();
```

---

## 4. Operators, Equality, Conditionals, Loops

**Equality:**

```js
0 == "0"            // true  — coercion
0 === "0"           // false — different types
null == undefined   // true  — special-cased
null === undefined  // false
```

**`&&` / `||` / `??` return values, not booleans:**

- Falsy values: `false, 0, -0, 0n, "", null, undefined, NaN`
- `&&` → returns the first falsy value, or the last value if all are truthy
- `||` → returns the first truthy value, or the last value if all are falsy
- `??` → returns the right side only if the left is `null`/`undefined` (ignores other falsy values)

```js
"Cat" && "Dog"  // "Dog"
""    && "Dog"  // ""
""    || "Dog"  // "Dog"

const count = 0;
count || 10  // 10 — 0 is falsy
count ?? 10  // 0  — 0 is not nullish

null ?? undefined ?? 0 ?? "fallback"  // 0
```

**`for`/`for...of` vs. `forEach`:**

- `for`/`for...of` can be interrupted with `break`/`continue`, and support `await`.
- `forEach` always returns `undefined` (doesn't build an array like `map`), and cannot be broken early — a `return` inside its callback just skips to the next element.

---

## 5. Functions, Parameters, and Arguments

**Default parameters** trigger only on `undefined` (explicit or omitted) — not `null`, `false`, `0`, or `""`:

```js
function greet(name = "Guest") { console.log(`Hello, ${name}`); }

greet();          // "Hello, Guest"
greet(undefined); // "Hello, Guest"
greet(null);      // "Hello, null"
greet("");        // "Hello, "
```

**Rest parameters vs. the legacy `arguments` object:**

```js
// Legacy
function legacySum() {
  console.log(Array.isArray(arguments)); // false — array-like, not a real array
  return Array.prototype.slice.call(arguments).reduce((a, c) => a + c, 0);
}

// Modern
const modernSum = (...args) => {
  console.log(Array.isArray(args)); // true
  return args.reduce((a, c) => a + c, 0);
};
```

Arrow functions have **no own `arguments`** at all — referencing it directly inside one throws `ReferenceError: arguments is not defined`, which is exactly why rest parameters are the standard replacement.

Arrow functions also can't be used as constructors, and don't get their own `this` (see next section).

---

## 6. The `this` Keyword

`this` is bound dynamically at the **call site**, not where the function is written — with arrow functions as the one deliberate exception.

```
                     Called with 'new'?
                            │
                   ┌────────┴────────┐
                  YES                NO
                   │                 │
          this = new instance   Is it an arrow function?
                                     │
                            ┌────────┴────────┐
                          YES                NO
                            │                 │
                this = outer lexical    Called as obj.method()?
                    context                    │
                                       ┌────────┴────────┐
                                     YES                NO
                                       │                 │
                              this = obj        Plain call:
                                                Strict  → undefined
                                                Sloppy  → global/window
```

**The four binding rules:**
1. **Implicit (method call):** `this` = the object before the dot
2. **Explicit (`call`/`apply`/`bind`):** `this` set directly (Advanced topic)
3. **`new` binding:** `this` = the newly constructed instance
4. **Default/plain invocation:** `undefined` in strict mode, global object in sloppy mode (Node REPL and CommonJS are sloppy by default)

```js
function showThis() { console.log(this); }
const user = { name: "Alice", showThis };

user.showThis();              // { name: "Alice", ... } — method binding
const standalone = user.showThis;
standalone();                 // undefined (strict) or global object (sloppy)

const obj = {
  name: "Bob",
  delayedGreet() {
    setTimeout(() => {
      console.log(`Hi, I am ${this.name}`); // arrow inherits `this` from delayedGreet
    }, 100);
  }
};
obj.delayedGreet(); // "Hi, I am Bob"
```

---

## 7. DOM Manipulation

**Selection:**

```js
document.querySelector("#submit-btn");    // first match, or null
document.querySelectorAll(".card");       // static NodeList of all matches
```

**Content — `innerHTML` vs. `textContent`:**

```js
const userInput = "<script>alert('hacked')</script>";

element.innerHTML = userInput;   // UNSAFE — parses as real HTML, XSS risk
element.textContent = userInput; // SAFE — rendered as literal text, auto-escaped
```

**Styling — classes over inline styles:**

Setting `element.style.x` directly creates inline styles that override stylesheets and scatter presentation logic across two languages. The standard pattern: CSS owns appearance, JS only toggles which class is applied.

```js
const modal = document.querySelector(".modal");

modal.classList.add("active");
modal.classList.remove("hidden");
modal.classList.toggle("is-open");

if (modal.classList.contains("active")) {
  console.log("Modal is currently visible.");
}
```
