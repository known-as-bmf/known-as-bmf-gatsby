---
title: 'Functional Programming — Currying (Part 2)'
date: '2019-10-22T03:00:00+02:00'
description: ''
---

Réécrivons les fonctions `mult` at `add` différemment pour rendre ce code expressif et moins verbeux.

```js
// Number -> Number -> Number
const mult = a => b => a * b;
// Number -> Number -> Number
const add = a => b => a + b;
```

Nous avons transformé les fonctions pour qu'elles acceptent leurs paramètres les uns après les autres, en retournant des fonctions "temporaires" entre chaque. C'est ce qu'on appelle le **currying**.

Elles sont utilisable ainsi :

```js
const four = add(2)(2);
```

Il est maintenant possible de réécrire `plusTen`, `plusFifty`, `twoTimes` et `tenTimes` ainsi :

```js
// Number -> Number
const plusTen = add(10);
// Number -> Number
const plusFifty = add(50);
// Number -> Number
const twoTimes = mult(2);
// Number -> Number
const tenTimes = mult(10);
```

Ici, nous "pré-remplissons" la valeur du paramètre `a` pour créer une nouvelle fonction qui attends le deuxième paramètre `b`. C'est l'**application partielle** des paramètres.

Nous n'avons même plus besoin de déclarer ces fonctions, nous pouvons directement écrire :

```js
const result = arr
  .map(mult(10))
  .map(add(50))
  .map(mult(2))
  .map(add(10));
```

Expressif et concis 😎.
