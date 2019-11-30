---
title: 'Functional Programming — Common functions (Part 1)'
date: '2019-10-22T08:00:00+02:00'
description: ''
---

Une des choses très intimidante quand on débute dans la programmation fonctionnelle, c'est le vocabulaire. Beaucoup de termes sembles étrangers et complexes. Essayons de les démystifier un peu.

Voici une liste de fonctions classiques et une implémentation naïve. Certaines ont déjà une implémentation en JavaScript standard, mais il est très utile d'en créer une version fonctionnelle pour la suite.

- `identity` une fonction qui prends un paramètre et le retourne tel quel. parfois appelée `id`.

```js
// a -> a
const identity = x => x;
```

- `always` une fonction qui prends une valeur en paramètre et retourne une fonction qui retournera toujours cette valeur. Parfois appelée `constant`.

```js
// a -> () -> a
const always = x => () => x;
```

- `map` applique une fonction de transformation a chaque élément d'une collection. Parfois appelée `select`.

```js
// (a -> b) -> a[] -> b[]
const map = mapFn => list => list.map(mapFn);
```

- `filter` filtre une collection avec un prédicat. Parfois appelée `where`.

```js
// (a -> Boolean) -> a[] -> a[]
const filter = filterFn => list => list.filter(filterFn);
```

- `find` trouve la première valeur dans collection qui satisfait un prédicat. Parfois appelée `first`.

```js
// (a -> Boolean) -> a[] -> a
const find = findFn => list => list.find(findFn);
```

- `any` vérifie si au moins un des élément d'une collection satisfais un prédicat. Parfois appelée `some`.

```js
// (a -> Boolean) -> a[] -> Boolean
const any = anyFn => list => list.some(anyFn);
```

- `all` vérifie si tous les éléments d'une collection satisfont un prédicat. Parfois appelée `every`.

```js
// (a -> Boolean) -> a[] -> Boolean
const all = allFn => list => list.every(allFn);
```

- `flatMap` comme `map`, applique une fonction de transformation à chaque éléments d'une collection. Cette transformation **doit** retourner une collection, qui sera concaténée a la collection finale. Parfois appelée `chain` ou `selectMany`.

```js
// (a -> b[]) -> a[] -> b[]
const flatMap = mapFn => list => list.flatMap(mapFn);

// usage
// Number[] -> Number[]
const valuePlusDouble = flatMap(value => [value, value * 2]);

const result = valuePlusDouble([1, 2, 3, 4]);
// result = [1, 2, 2, 4, 3, 6, 4, 8]
```

- `reduce` transforme une collection en une seule valeur. Chaque valeur de la collection passe dans la fonction de transformation ainsi qu'un accumulateur. La fonction de transformation doit retourner la nouvelle valeur de l'accumulateur. Le deuxième paramètre est une valeur par défaut pour l'accumulateur. Parfois appelée `aggregate`.

```js
// ((a, b) -> a) -> a -> b[]
const reduce = reduceFn => defaultValue => list => list.reduce(reduceFn, defaultValue);

// usage
// Number[] -> Number
const sum = reduce((accumulator, currentValue) => accumulator + currentValue)(0);

const result = sum([1, 2, 3, 4, 5]);
// result = 15
```
