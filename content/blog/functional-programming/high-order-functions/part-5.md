---
title: 'Functional Programming — High-Order Functions (Part 5)'
date: '2019-10-22T01:00:00+02:00'
description: ''
---

Vous l'aviez peut-être remarqué, mais cette fonction `filterUsers` peut en fait être utilisée pour n'importe quel type de collection, puisque c'est nous qui contrôlons le tableau en entrée et le prédicat !

En voici une version générique :

```js
// (a[], (a -> Boolean)) -> a[]
function filter(list, pred) {
  const result = [];
  for (const item of list) {
    if (pred(item)) {
      result.push(item);
    }
  }
  return result;
}

const result = filter([1, 2, 3, 4], i => i % 2 === 0);
```

Très utile, n'est-ce pas ? Tellement utile que JavaScript possède déjà cette fonction [sur le prototype de `Array`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter).

Voici l'exemple précédent, mais utilisant la fonction native JavaScript.

```js
const result = [1, 2, 3, 4].filter(i => i % 2 === 0);
```

Il existe d'autres fonctions d'ordre supérieur sur le prototype d'`Array`:

- `map` : transforme une collection de type `a` en collection de type `b`.

```js
// (a[], (a -> b)) -> b[]
function map(list, trans) {
  const result = [];
  for (const item of list) {
    result.push(trans(item));
  }
  return result;
}
```

- `reduce` : transforme une collection de type `a` en **une** valeur de type `b`. Peut être vu comme un accumulateur.

```js
// (a[], ((b, a) -> b), b) -> b
function reduce(list, reducer, initialValue) {
  let result = initialValue;
  for (const item of list) {
    result = reducer(result, item);
  }
  return result;
}
```
