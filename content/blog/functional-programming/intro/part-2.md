---
title: 'Functional Programming — Introduction (Part 2)'
date: '2019-10-21T20:10:00+02:00'
description: ''
---

Il y a quelques concepts indispensables à connaitre avant de commencer.

## Immutabilité

Une variable immuable est une variable qui ne doit pas changer après sa définition. C'est surtout pertinent pour les objets, et les collections car les primitives sont généralement manipulées par valeur.

Pour faire muter une variable immuable, il faut d'abord en faire une copie, puis transformer cette copie.

L'intérêt est d'éviter les effets de bord lorsqu'une valeur est utilisée dans différents traitements et de garder tous les états d'une valeur dans le temps pour pouvoir rejouer des traitements ou revenir à un état précédent.

Quelques moyens d'adopter ce comportement en JavaScript :

- Utiliser `const` pour repérer les réassignations grâce à un transpileur / éditeur.
  - marche très bien avec les types primitifs mais n'empêche pas le contenu des objets complexes d'être réassigné
- Lors de manipulation d'objets ou de collections
  - faire une [copie superficielle](https://fr.wikipedia.org/wiki/Copie_d%27un_objet#Copie_superficielle) (_shallow copy_) par [décomposition](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Syntaxe_d%C3%A9composition) (_spreading_)
  - utiliser [`Object.freeze`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/freeze). Attention, cette technique, comme la décomposition, ne gèle que **superficiellement**.
  - faire une copie profonde (_deep copy_). très efficace mais peut consommer beaucoup de ressources en fonction de la taille de l'objet.

Ce sont les techniques _superficielles_ qui sont le plus souvent utilisées, il faut néanmoins être très vigilant avec.

```js
const user = { tri: 'JAV', address: { street: 'rue du moulin' } };
const userCopy = { ...user, tri: 'FOO' };
// userCopy = { tri: 'FOO', address: { street: 'rue du moulin' }}
// ici, la propriété "address" de user et userCopy pointe toujours
// vers le même objet en mémoire
```

## Pureté / Idempotence

Une fonction pure est une fonction qui remplit les critères suivants :

- Pour les mêmes valeurs d'entrée, elle retournera toujours le même résultat
  - pas de dépendance à des variables globales ou non locales
- Elle n'a pas d'effets de bord
  - pas d'appel à une base de donnée
  - pas de mutation de variables globales / non locales

La pureté apporte plusieurs bénéfices :

- Reproductibilité
- Très facile a tester unitairement
- Encourage un découpage en petites unités de traitement
