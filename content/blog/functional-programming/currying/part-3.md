---
title: 'Functional Programming — Currying (Part 3)'
date: '2019-10-22T04:00:00+02:00'
description: ''
---

Le currying vu dans la partie précédente est très puissant mais a quand même quelques inconvénients. Imaginons une fonction ayant trois paramètres :

```js
// Number -> Number -> Number -> Number
const clamp = min => max => value => Math.min(Math.max(value, min), max);
```

Utiliser cette fonction sur une collection devient un peu bancal car il faut passer tous les arguments un par un.

```js
const clamped = [0, 2, 5, 1, 3].map(clamp(0)(2));
// clamped = [0, 2, 2, 1, 2]
```

L'utilisation en tant que fonction classique est tout aussi bancal :

```js
const clamped = clamp(0)(100)(89);
// clamped = 89
```

Il serait plus lisible de pouvoir partiellement appliquer la fonction avec autant d'arguments que nous souhaitons, et d'appeler la fonction une fois que tous les arguments sont remplis, comme ceci :

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

Nous allons voir comment faire ça dans la partie suivante.
