---
title: 'Functional Programming — Composition (Part 2)'
date: '2019-10-22T10:00:00+02:00'
description: ''
---

Reprenons l'exemple précédent :

```js
const transformation = compose(
  list => list.map(i => i * 2),
  list => list.filter(i => i < 10)
);
```

Il est possible d'utiliser les fonctions que nous avons énoncées dans la partie `Common functions` :

```js
const transformation = compose(
  list => map(i => i * 2, list),
  list => filter(i => i < 10, list)
);
```

De plus, si celles-ci sont curriées comme vu dans la partie `Currying`, nous pouvons encore plus réduire le code :

```js
const transformation = compose(
  map(i => i * 2),
  filter(i => i < 10)
);
```

Ici, les appels à `filter` et `map` vont chacun retourner une fonction attendant une liste en entrée et retournant une nouvelle liste "transformée".

Les bénéfices de la programmation fonctionnelle deviennent flagrants : code **beaucoup plus court** et **expressif**. Certains trouvent même le code produit par la composition et l'application partielle élégant.
