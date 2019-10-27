---
title: 'Functional Programming — High-Order Functions (Part 2)'
date: '2019-10-21T22:00:00+02:00'
description: ''
---

Pour illustrer l'intérêt des fonctions d'ordre supérieur, essayons de résoudre un problème classique de manipulation de collection.

Prenons la collection ci-dessous :

```js
const users = [
  { name: 'Foo', age: 25, subscribed: true },
  { name: 'Bar', age: 43, subscribed: false },
  { name: 'Baz', age: 16, subscribed: true },
  { name: 'Qux', age: 12, subscribed: false },
  { name: 'Garply', age: 32, subscribed: false },
  { name: 'Waldo', age: 28, subscribed: true },
  { name: 'Plugh', age: 10, subscribed: false },
];
```

Notre besoin fonctionnel requiert de filtrer cette liste et de trouver les utilisateurs dont l'âge est supérieur ou égal à 18 ans.

L'implémentation naïve est:

```js
const result = [];
for (const user of users) {
  if (user.age >= 18) {
    result.push(user);
  }
}
// result contient la liste des utilisateurs filtrés
```

Cette fonctionnalité se retrouve plus tard utilisée à plusieurs endroits de notre application et est donc extraite dans une fonction.

```js
// user[] -> user[]
function olderThan18(users) {
  const result = [];
  for (const user of users) {
    if (user.age >= 18) {
      result.push(user);
    }
  }
  return result;
}

const result = olderThan18(users);
// result contient la liste des utilisateurs filtrés
```

Parfait ! Le besoin est rempli, jusqu'à la prochaine demande d'évolution...
