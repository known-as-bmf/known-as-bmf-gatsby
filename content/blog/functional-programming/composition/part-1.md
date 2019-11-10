---
title: 'Functional Programming — Composition (Part 1)'
date: '2019-10-22T09:00:00+02:00'
description: ''
---

Ajoutons un outil inestimable à notre arsenal : la **[composition de fonctions](https://fr.wikipedia.org/wiki/Composition_de_fonctions)**.

Commençons par un peu de mathématiques. Il existe un operateur "∘" qui permet de composer des fonctions tel que :

Pour deux fonctions `f : a -> b` et `g : b -> c` la composition `(g ∘ f)` produit une nouvelle fonction `a -> c`. En d'autres termes : `(g ∘ f)(x) = g(f(x))`.

Une implémentation naïve de cet operateur en JavaScript est :

```js
// ((b -> c), (a -> b)) -> a -> c
const compose = (g, f) => x => g(f(x));
```

Et voici comment l'utiliser :

```js
const transformation = compose(
  list => list.map(i => i * 2),
  list => list.filter(i => i < 10)
);

const result = transformation([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
```

Une tache récurrente lors de n'importe quel développement est d'appliquer plusieurs transformations à une valeur.
