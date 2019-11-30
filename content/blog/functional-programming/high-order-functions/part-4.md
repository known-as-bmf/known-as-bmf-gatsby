---
title: 'Functional Programming — High-Order Functions (Part 4)'
date: '2019-10-22T00:00:00+02:00'
description: ''
---

Utilisons la magie des fonctions d'ordre supérieur !

Essayons d'extraire la condition de la partie précédente dans une fonction :

```js
// user -> Boolean
const olderThan18AndSubscribed = user => user.age >= 18 && user.subscribed === true;
```

On appelle ce genre de fonction (vérifiant une condition sur ses paramètres d'entrée) un **prédicat**.

Bien, maintenant il suffit de trouver un moyen d'appliquer cette fonction pour chaque utilisateur. Réutilisons le code que nous avons produit précédemment avec quelques modifications :

```js
// (user[], (user -> Boolean)) -> user[]
function filterUsers(users, condition) {
  const result = [];
  for (const user of users) {
    if (condition(user)) {
      result.push(user);
    }
  }
  return result;
}

const result = filterUsers(users, olderThan18AndSubscribed);
```

Il est aussi possible de filtrer "à la volée" en utilisant une fonction anonyme :

```js
const result = filterUsers(users, user => user.age > 55);
```

Pas mal, hein ?
