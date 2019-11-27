---
title: 'Functional Programming — High-Order Functions (Part 3)'
date: '2019-10-21T23:00:00+02:00'
description: ''
---

Vous l'attendiez, la demande d'évolution est arrivée !

Le nouveau besoin est de pouvoir aussi filtrer la liste d'utilisateurs pour trouver ceux dont l'âge est supérieur ou égal à 30 ans.

Faisons donc évoluer notre fonction de filtrage :

```js
// (user[], Number) -> user[]
function olderThan(users, age) {
  const result = [];
  for (const user of users) {
    if (user.age >= age) {
      result.push(user);
    }
  }
  return result;
}

const result18 = olderThan(users, 18);
const result30 = olderThan(users, 30);
```

Dans le lot de nouvelles fonctionnalités, il y a aussi besoin de filtrer les utilisateurs abonnés ou non. Et pire encore, le marketing souhaite connaitre les utilisateurs majeurs **et** abonnés.

Construisons une deuxième fonction :

```js
// (user[], Boolean) -> user[]
function subscribed(users, sub) {
  const result = [];
  for (const user of users) {
    if (user.subscribed === sub) {
      result.push(user);
    }
  }
  return result;
}

const result = subscribed(olderThan(users, 18), true);
```

Cette approche fonctionne mais a quelques inconvénients :

- Il y a deux parcours de tableau
- Dès la prochaine évolution, il faudra encore une fonction de filtre supplémentaire.
- Le code est moyennement lisible

Pour résoudre les deux premiers points, il faudrait trouver un moyen de passer la condition `user.age >= 18 && user.subscribed === true` directement à la fonction de filtre.
