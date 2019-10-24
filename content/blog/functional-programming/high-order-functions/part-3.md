---
title: 'Functional Programming — High-Order Functions (Part 3)'
date: '2019-10-21T20:00:00+02:00'
description: ''
---

Vous l'attendiez, la demande d'évolution est arrivée !

Le nouveau besoin est de pouvoir aussi filtrer la liste d'utilisateurs pour trouver ceux dont l'âge est supérieur ou égal à 30 ans.

Faisons donc évoluer notre fonction de filtrage:

```js
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
