---
title: 'Functional Programming — Currying (Part 5)'
date: '2019-10-22T06:00:00+02:00'
description: ''
---

Remédions à ça !

Tout d'abord, un peu de vocabulaire : l'**[arité](https://fr.wikipedia.org/wiki/Arit%C3%A9)** d'une fonction. L'arité d'une fonction est le nombre de paramètres qu'attends une fonction.

En JavaScript, il est possible de trouver l'arité d'une fonction en appelant la propriété `length` de cette fonction.

```js
// (Number, Number) -> Number
const add = (a, b) => a + b;

const arity = add.length;
// arity = 2
```

Néanmoins, les paramètres optionnels d'une fonction ne rentrerons pas dans le calcul de l'arité.

```js
// (Number, Number, Number?) -> Number
const add = (a, b, c = 0) => a + b + c;

const arity = add.length;
// arity = 2
```

Pour une curryfication correcte, il est nécessaire de connaitre le nombre d'arguments d'une fonction pour savoir lorsqu'elle peut être appelée.

Et maintenant, le saint Graal du currying :

```js
const curry = (fn, arity = fn.length, ...args) => {
  if (arity <= args.length) {
    return fn(...args);
  }
  return curry.bind(null, fn, arity, ...args);
};
```

C'est une fonction d'ordre supérieur qui prends une fonction et en retourne une version curriée. Quelques explications sur ce code qui peut paraître compliqué :

- les arguments :
  - `fn` la fonction à currier
  - `arity` l'arité de la fonction. Il n'est pas requis et a comme valeur par défaut `fn.length`.
  - `...args` une liste d'arguments à passer a `fn`
- le corps :
  - si les arguments passés dans `...args` sont assez nombreux pour satisfaire l'arité voulue, on appelle `fn`
  - sinon, une version de curry déjà partiellement appliquée avec `fn`, `arity` et les arguments précédemment donnés est retournée
