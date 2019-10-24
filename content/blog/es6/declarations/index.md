---
title: 'ES6 — Déclarations'
date: '2019-10-21T20:00:00+02:00'
description: ''
---

Il existe trois mots clés de déclaration de variable en ES6: `const`, `let` et `var`. Il est aussi possible de déclarer une variable sans mot clé, ce qui en fera une variable globale.

## Cheat sheet

|                | Doit être assignée à la déclaration | Peut être réaffectée | Pollue le scope global (_e.g._: `Window`) | Portée de la variable | Peut être utilisée avant sa déclaration |
| -------------- | ----------------------------------- | -------------------- | ----------------------------------------- | --------------------- | --------------------------------------- |
| `const`        | ✅                                  | ❌                   | ❌                                        | bloc                  | ❌ (`ReferenceError`)                   |
| `let`          | ❌                                  | ✅                   | ❌                                        | bloc                  | ❌ (`ReferenceError`)                   |
| `var`          | ❌                                  | ✅                   | ✅                                        | fonction              | ✅ (mais `undefined`)                   |
| _sans mot clé_ | ✅                                  | ✅                   | ✅                                        | globale               | ❌ (`ReferenceError`)                   |

- **Doit être assignée à la déclaration** : la variable a déclarée doit-elle être assignée immédiatement ?
- **Peut être réaffecté** : la variable peut elle être réaffecté après avoir été déclarée ?
- **Pollue le scope global (_e.g._: `Window`)** : lorsque la variable est déclarée hors d'un bloc (_top-level_), va-t-elle polluer l'objet global (typiquement, `Window` dans un browser) ?
- **Portée de la variable** : la portée de la variable après sa déclaration lorsqu'elle est déclarée dans une fonction.
  - **bloc** : visible uniquement dans le bloc dans lequel la variable est déclarée et dans ses sous-blocs.
  - **fonction** : visible dans toute la fonction, même si déclarée dans un sous-bloc
- **Peut être utilisée avant sa déclaration** : est-il possible d'utiliser la variable avant qu'elle soit déclarée
