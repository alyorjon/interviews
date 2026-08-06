# 💛 JavaScript Full-Stack Guide — 100 Real-World Interview Questions & Theory
### Ikki tilli qo'llanma / Bilingual Guide (English 🇬🇧 & O'zbek 🇺🇿)

> **Mavzular / Topics:**  
> - 🟢 **Part 1: Basic JavaScript & Core Syntax** (Data types, Scopes, Closures, Promises, Async/Await, Event Loop, DOM, ES6+)  
> - 🟩 **Part 2: Backend Development** (Node.js Core, Express.js Middleware, NestJS Architecture, REST APIs, Microservices, Prisma/TypeORM)  
> - ⚛️ **Part 3: Modern Frontend** (React.js Core & Hooks, Vite Build System, Next.js App Router, Server Components, SSR/SSG/ISR)

---

# 📚 CHUQUR NAZARIYA VA ARXITEKTURA / COMPREHENSIVE THEORY

---

## 1. 🟢 JavaScript Core & Execution Mechanism
JavaScript — bu bir oqimli (single-threaded), interpretatsiya qilinadigan, dinamik tipli dasturlash tili. U **Event Loop** va **Asynchronous Non-blocking I/O** (V8 Engine) mexanizmi orqali ko'p vazifalilikni amalga oshiradi.
- **Event Loop & Call Stack:** Call Stack sinxron kodlarni bajaradi. Asinxron operatsiyalar (Timer, Network) Web API / Node APIs ga o'tkaziladi. Yakunlangach **Microtask Queue** (Promises) va **Macrotask Queue** (`setTimeout`, `setInterval`) orqali Call Stack ga qaytariladi.
- **Closures:** Funksiya o'zining yaratilish o me rimidagi (Lexical Scope) o'zgaruvchilarni eslab qolish qobiliyati.
- **Prototypes & Inheritance:** JS ob'ektlari `__proto__` prototip zanjiri orqali meros oladi.

---

## 2. 🟩 Backend: Node.js, Express.js & NestJS Architecture
- **Node.js:** Chrome V8 va Libuv kutubxonasi asosidagi JavaScript runtime environment. Libuv Event Loop va Thread Pool (4 ta standart thread) orqali I/O operatsiyalarini asinxron bajaradi.
- **Express.js:** Yengil va minimalistik web freymvork. U **Middleware Chain** (so'rovlarni ketma-ket qayta ishlash zanjiri) tamoyiliga tayonadi.
- **NestJS:** Angular me'morchiligidan ilhomlangan, TypeScript bazasidagi enterprise freymvork. U **Dependency Injection (DI)**, **Modules**, **Controllers**, **Services/Providers**, **Guards** (auth), **Interceptors** va **Pipes** (validation) me'morchiligiga ega.

---

## 3. ⚛️ Frontend: React.js, Vite & Next.js App Router
- **React.js:** UI qurish uchun deklarativ kutubxona. U **Virtual DOM** va **Reconciliation Algorithm (React Fiber)** orqali faqat o'zgargan komponentlarni real DOM ga qayta chizadi.
- **Vite:** Esbuild va Native ES Modules (ESM) ga asoslangan o o tda tezkor zamonaviy frontend build tool (Webpack ga nisbatan 10-100x tezroq HMR).
- **Next.js 14+ (App Router):** React Server Components (RSC) asosidagi Full-Stack framework. U **SSR** (Server-Side Rendering), **SSG** (Static Site Generation), **ISR** (Incremental Static Regeneration) va **Streaming** imkoniyatlarini beradi.

---

# 🟢 PART 1: JAVASCRIPT CORE & SYNTAX (Q1 – Q35)

---

## 1. JavaScript'da Event Loop qanday ishlaydi va Microtask vs Macrotask farqi nima? / How Event Loop works in JS (Microtasks vs Macrotasks)

**EN:** JavaScript runs single-threaded using Call Stack. Asynchronous callbacks are queued:
- **Microtask Queue:** Promises (`.then`, `await`), `queueMicrotask`, `MutationObserver`. Has higher priority (executes immediately after current stack before render).
- **Macrotask Queue:** `setTimeout`, `setInterval`, `setImmediate`, I/O operations.

**UZB:** JavaScript bir oqimda ishlaydi. Asinxron vazifalar navbatga qo'yiladi:
- **Microtask Queue:** Promises (`.then`, `await`), `queueMicrotask`. Yuqori ustunlikka ega (Call Stack bo'shashi bilan darhol bajariladi).
- **Macrotask Queue:** `setTimeout`, `setInterval`, `setImmediate`, I/O amallari.

```javascript
console.log("1"); // Sinxron
setTimeout(() => console.log("2"), 0); // Macrotask
Promise.resolve().then(() => console.log("3")); // Microtask
console.log("4"); // Sinxron

// Natija / Output: 1, 4, 3, 2
```

---

## 2. `var`, `let` va `const` o'rtasidagi asosiy farqlar (Hoisting & Scope) / Differences between `var`, `let`, and `const`

| Xususiyat / Property | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function Scope | Block Scope (`{}`) | Block Scope (`{}`) |
| Hoisting | Ha (`undefined` beradi) | Ha (Temporal Dead Zone - TDZ) | Ha (Temporal Dead Zone - TDZ) |
| Re-declaration | ✅ Mumkin | ❌ Xatolik | ❌ Xatolik |
| Re-assignment | ✅ Mumkin | ✅ Mumkin | ❌ Taqiqlangan (O'zgarmas) |

```javascript
// Temporal Dead Zone (TDZ) misoli
console.log(a); // undefined (var hoisted)
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization (TDZ)
let b = 10;
```

---

## 3. Closure nima va u amalda qanday ishlatiladi? / What is a Closure and practical use cases?

**EN:** A closure is a function bundled together with references to its surrounding lexical environment, allowing an inner function to access an outer function's scope even after the outer function has returned.

**UZB:** Closure — tashqi funksiya bajarilib bo'lingandan keyin ham inner (ichki) funksiyaning o'zi yaratilgan tashqi doiradagi (lexical scope) o'zgaruvchilarni eslab qolishi.

```javascript
function createCounter() {
    let count = 0; // Private variable encapsulated by closure
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue());   // 2
```

---

## 4. `this` kalit so'zi JavaScript'da qanday aniqlanadi va Arrow Function'dagi `this` farqi? / How `this` works in JS & Arrow Functions

**EN:** In regular functions, `this` is dynamically bound based on how the function is called. Arrow functions do not have their own `this`; they inherit `this` lexically from the enclosing scope.

**UZB:** Oddiy funksiyalarda `this` chaqirilish usuliga qarab dinamik anlanadi. Arrow (`() => {}`) funksiyalarda shaxsiy `this` bo'lmaydi, u `this` ni o'zining tashqi doirasidan (lexical scope) meros oladi.

```javascript
const obj = {
    name: "Alyorjon",
    regularFunc: function() {
        console.log("Regular:", this.name); // Alyorjon
    },
    arrowFunc: () => {
        console.log("Arrow:", this.name); // undefined (Global window/module scope)
    }
};

obj.regularFunc();
obj.arrowFunc();
```

---

## 5. Promises, `async/await` va Error Handling (`try/catch`) / Promises and Async/Await Syntax

```javascript
// Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data loaded!"), 1000);
    });
};

// Async / Await with Error Handling
async function main() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.error("Xato yuz berdi:", error);
    }
}
main();
```

---

## 6. JavaScript'da Deep Clone va Shallow Clone farqi va `structuredClone()` / Deep vs Shallow Copy in JS

**EN:** Shallow copy (`{...obj}`, `Object.assign()`) copies top-level properties but references nested objects. `structuredClone()` creates a native deep copy of nested objects without external libraries.

**UZB:** Sayoz nusxalash (`{...obj}`) faqat yuqori qatlamni nusxalaydi. `structuredClone()` esa ichma-ich ob'ektlarni ham to'liq mustaqil chuqur nusxalaydi.

```javascript
const original = { a: 1, nested: { b: 2 } };

const shallow = { ...original };
const deep = structuredClone(original);

original.nested.b = 99;

console.log(shallow.nested.b); // 99 (sayoz nusxa o'zgardi!)
console.log(deep.nested.b);    // 2 (chuqur nusxa o'zgarmadi ✅)
```

---

## 7–35. Additional JS Core Questions: Prototypes, Prototype Chain, `bind`, `call`, `apply`, Modules (ESM vs CJS), Map/Set/WeakMap/WeakSet, Symbol type, Generator Functions, Debounce & Throttle functions implementation, Proxy & Reflect API, Service Workers.

---

# 🟩 PART 2: BACKEND — NODE.JS, EXPRESS.JS & NESTJS (Q36 – Q70)

---

## 36. Node.js Event-Driven Architecture va Libuv Thread Pool qanday ishlaydi? / Node.js Architecture & Libuv Thread Pool

**EN:** Node.js executes JS code on a single thread via V8. Expensive I/O, file system operations, and crypto functions are delegated to the **Libuv Thread Pool** (default 4 threads), preventing main thread blockage.

**UZB:** Node.js V8 dvigateli orqali JS kodini bitta oqimda bajaradi. Og'ir fayl operatsiyalari va kriptografiya esa Libuv Thread Pool ga (standart 4 ta thread) o'tkazilib, asosiy oqim bloklanishining oldi olinadi.

---

## 37. Express.js Middleware Chain va `next()` funksiyasi vazifasi / Express.js Middleware Concept

**EN:** Middlewares are functions executing sequentially during the HTTP request-response cycle. Calling `next()` passes control to the next middleware in line.

**UZB:** Middleware so'rov-javob siklida ketma-ket bajariladigan funksiyalardir. `next()` funksiyasi boshqaruvni keyingi middleware ga uzatadi.

```javascript
const express = require('express');
const app = express();

// Custom Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Unauthorized!" });
    req.user = { id: 1, name: "Ali" };
    next(); // Pass to next handler
};

app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ message: `Salom, ${req.user.name}` });
});
```

---

## 38. NestJS Dependency Injection (DI) va Provider'lar qanday ishlaydi? / NestJS Dependency Injection

**EN:** NestJS uses IoC (Inversion of Control) container to instantiate and inject services into controllers automatically using `@Injectable()` decorator and constructor injection.

**UZB:** NestJS IoC konteyneri yordamida servislarni `@Injectable()` dekoratori va konstruktor orqali controller'larga avtomatik biriktiradi (inject qiladi).

```typescript
// users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers() {
        return [{ id: 1, name: 'Alyorjon' }];
    }
}

// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.getUsers();
    }
}
```

---

## 39. NestJS Guards, Interceptors, Pipes va Exception Filters tartibi / NestJS Request Lifecycle Execution Order

**EN:** NestJS request execution lifecycle order:
1. **Middleware** -> 2. **Guards** (Auth/Permissions) -> 3. **Interceptors** (Before) -> 4. **Pipes** (Validation/Transformation) -> 5. **Controller Handler** -> 6. **Interceptors** (After response) -> 7. **Exception Filters** (Error formatting).

**UZB:** NestJS so'rov bajarilish tartibi:
1. Middleware -> 2. Guards (Autentifikatsiya) -> 3. Interceptors (Oldin) -> 4. Pipes (Validatsiya) -> 5. Controller -> 6. Interceptors (Keyin) -> 7. Exception Filters (Xatolarni formatlash).

---

## 40. Prisma ORM vs TypeORM va Database Migrations / Prisma vs TypeORM Comparison

| Xususiyat / Feature | Prisma ORM | TypeORM |
|---|---|---|
| Schema Ta'rifi | Auto-generated Type-safe DSL (`schema.prisma`) | Class Decorators (`@Entity()`, `@Column()`) |
| Type Safety | 100% Auto-generated TypeScript types | Qo'lda yoziladigan decorator tiplari |
| Query Engine | Rust-based binary engine | Pure JS/TS engine |
| Query Usuli | `prisma.user.findMany()` | Repository Pattern (`repo.find()`) |

```typescript
// Prisma Query Example
const users = await prisma.user.findMany({
    where: { age: { gte: 18 } },
    include: { posts: true }
});
```

---

## 41–70. Additional Backend Questions: Node.js Streams (`fs.createReadStream`), Cluster Module, Worker Threads, Express Error Handling Middleware, JWT Auth flow, NestJS Modules & Dynamic Modules, DTO Validation with `class-validator`, Microservices with RabbitMQ/Kafka in NestJS, WebSockets with Socket.io/Nest Gateway, Rate Limiting & Helmet security, Microservices API Gateway pattern.

---

# ⚛️ PART 3: MODERN FRONTEND — REACT.JS, VITE & NEXT.JS (Q71 – Q100)

---

## 71. React Virtual DOM va Reconciliation Algorithm (React Fiber) qanday ishlaydi? / React Virtual DOM & Fiber Algorithm

**EN:** React maintains an in-memory Virtual DOM tree. On state changes, React creates a new Virtual DOM tree, performs a diffing algorithm via React Fiber, and batch-updates only the changed real DOM elements efficiently.

**UZB:** React xotirada Virtual DOM daraxtini saqlaydi. State o'zgarganda yangi Virtual DOM yaratib, React Fiber algoritmi orqali faqat o'zgargan qismlarnigina real DOM da yangilaydi (reconcile qiladi).

---

## 72. React Asosiy Hook'lar (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`) / Core React Hooks

```jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const inputRef = useRef(null);

    // useEffect for side-effects (API fetch)
    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [userId]);

    // useMemo for heavy calculations
    const expensiveCalculation = useMemo(() => {
        return user ? user.score * 100 : 0;
    }, [user]);

    // useCallback for memoized function reference
    const handleClick = useCallback(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>Focus Input</button>
            <p>Score: {expensiveCalculation}</p>
        </div>
    );
}
```

---

## 73. Vite build tool va Webpack o'rtasidagi asosiy farq nimada? / Why Vite is faster than Webpack

**EN:** Webpack bundles the entire app before serving during development. Vite leverages Native ES Modules (ESM) in modern browsers and uses Esbuild (written in Go) for pre-bundling dependencies, serving source code on-demand instantly (10-100x faster HMR).

**UZB:** Webpack dev rejimida ishga tushishdan oldin butun loyihani birlashtiradi (bundle qiladi). Vite esa zamonaviy brauzerlarning Native ESM imkoniyatidan va Go tilida yozilgan Esbuild utilitasidan foydalanib kodingizni lahzalarda (HMR) yuklab beradi.

---

## 74. Next.js 14 App Router: React Server Components (RSC) vs Client Components (`'use client'`) / Server vs Client Components

**EN:**
- **Server Components (Default):** Render on the server only. Zero JS sent to the bundle, direct access to database/backend, highly secure.
- **Client Components (`'use client'`):** Render on server and hydrate on client. Required for interactivity (`useState`, `useEffect`, onClick handlers).

**UZB:**
- **Server Components (Standart):** Faqat serverda render bo'ladi. Brauzerga ortiqcha JS yubormaydi, MB ga to'g'ridan-to'g'ri ulanadi.
- **Client Components (`'use client'`):** Brauzerda interaktivlik (`useState`, `useEffect`, hodisalar) uchun ishlatiladi.

```tsx
// app/users/page.tsx (Server Component)
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
    const users = await prisma.user.findMany(); // Direct DB query on server!
    return (
        <div>
            <h1>Users List</h1>
            <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
        </div>
    );
}
```

---

## 75. Next.js Data Fetching: SSR, SSG, ISR va Streaming (`Suspense`) / Rendering Strategies in Next.js

| Strategiya / Strategy | Bajarilish Joyi & Vaqti | Qo'llanilishi / Use Case |
|---|---|---|
| **SSR (Server-Side Rendering)** | Har bir so'rov kelganda serverda | Dinamik shaxsiy kabinetlar |
| **SSG (Static Site Generation)** | Build vaqtida 1 marta | Bloglar, Hujjatlar |
| **ISR (Incremental Static Recache)** | Vaqt bo'yicha orqada yangilanadi (`revalidate: 60`) | E-Commerce mahsulotlar katalogi |
| **Streaming & Suspense** | Komponentlar tayyor bo'lishi bilan uzatiladi | Sekin yuklanuvchi bloklar |

---

## 76–100. Additional Frontend Questions: Custom Hooks creation, Context API vs Zustand/Redux Toolkit, React Query (TanStack Query) caching, Code Splitting (`React.lazy`), React 18 Concurrent Features (`useTransition`, `useDeferredValue`), Next.js Middleware, Next.js Server Actions, Image Optimization in Next.js, SEO Best Practices & Metadata API.

---

*Prepared by | Tayyorlagan: Alyorjon*  
*Sources | Manbalar: JavaScript.info, Node.js Docs, NestJS Docs, React Docs, Next.js Docs*
