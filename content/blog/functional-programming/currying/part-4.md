---
title: 'Functional Programming — Currying (Part 4)'
date: '2019-10-22T05:00:00+02:00'
description: ''
---

Une implémentation naïve d'un currying plus intelligent pourrait ressembler à :

```js
// (Number, Number, Number) -> Number
// (Number, Number) -> Number -> Number
// Number -> Number -> Number -> Number
const clamp = (min, max, value) => {
  if (min === undefined) {
    return clamp;
  }

  if (max === undefined) {
    return clamp.bind(null, min);
  }

  if (value === undefined) {
    return clamp.bind(null, min, max);
  }

  return Math.min(Math.max(value, min), max);
};
```

Nous utilisons ici la méthode [`Function.prototype.bind()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/bind) pour créer les fonction partielles en fonction des arguments donnés auparavant.

Avec cette implémentation, il est maintenant possible d'appeler `clamp` de toutes les manières vues précédemment.

```js
// Number -> Number -> Number
const clampedFn1 = clamp(0);
// Number -> Number
const clampedFn2 = clamp(0, 100);

const clamped1 = clamp(0)(100)(89);
// clamped1 = 89
const clamped2 = clamp(0, 100)(89);
// clamped2 = 89
const clamped3 = clamp(0)(100, 89);
// clamped3 = 89
const clamped4 = clamp(0, 100, 89);
// clamped4 = 89
```

Néanmoins la quantité de code nécessaire (et à réécrire pour chaque fonction), laisse a désirer.
