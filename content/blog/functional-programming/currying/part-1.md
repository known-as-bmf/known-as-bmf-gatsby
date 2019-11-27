---
title: 'Functional Programming — Currying (Part 1)'
date: '2019-10-22T02:00:00+02:00'
description: ''
---

Deux autres concepts très importants dans le paradigme fonctionnel sont le **currying** et l'**application partielle**.

Voici un problème très simple qui illustrera ces concepts : nous avons une liste d'entiers.

```js
const arr = [1, 2, 3, 2, 4, 6, 5, 8];
```

Nous souhaitons multiplier tous les éléments par `10`. Créons une fonction pour simplifier le travail.

```js
// (Number, Number) -> Number
const mult = (a, b) => a * b;
```

Pour effectuer la transformation, utilisons la fonction `map` vue dans la partie sur les fonctions d'ordre supérieur.

```js
const result = arr.map(i => mult(10, i));
// result = [10, 20, 30, 20, 40, 60, 50, 80]
```

On peut rendre le code plus expressif en créant une fonction qui multiplie par `10`.

```js
// Number -> Number
const tenTimes = b => mult(10, b);

const result = arr.map(tenTimes);
```

Malheureusement, s'il faut enchainer plusieurs traitements, le code nécessaire croît assez rapidement.

```js
// (Number, Number) -> Number
const add = (a, b) => a + b;

// Number -> Number
const plusTen = b => add(10, b);
// Number -> Number
const plusFifty = b => add(50, b);
// Number -> Number
const twoTimes = b => mult(2, b);

const result = arr
  .map(tenTimes)
  .map(plusFifty)
  .map(twoTimes)
  .map(plusTen);
```

Essayons de garder un code expressif et de réduire la quantité de code à écrire.
