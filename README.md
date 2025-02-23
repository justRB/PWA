# My Project - PWA Vue.js

## 📌 Description du projet

**My Project** est une application web progressive (PWA) développée avec Vue.js. Cette application exploite plusieurs fonctionnalités natives des appareils mobiles et navigateurs modernes, comme la caméra, la géolocalisation, les appels téléphoniques, la gestion de la batterie, les vibrations et un système de chat.

L'objectif de ce projet est de démontrer comment une PWA peut intégrer des fonctionnalités avancées tout en restant accessible depuis un navigateur sans nécessiter d'installation spécifique.

## 🚀 Installation et mise en route

### 1️⃣ Prérequis
- [Node.js](https://nodejs.org/) installé sur votre machine
- [Vue CLI](https://cli.vuejs.org/) (facultatif mais recommandé)

### 2️⃣ Installation des dépendances
Clonez le projet et installez les dépendances :
```bash
npm install
```

### 3️⃣ Lancement du serveur de développement
Pour démarrer l'application en mode développement :
```bash
npm run serve
```
L'application sera accessible sur `http://localhost:8080/` (par défaut).

### 4️⃣ Compilation pour la production
Si vous souhaitez générer les fichiers optimisés pour la production :
```bash
npm run build
```

### 5️⃣ Linter et correction automatique
```bash
npm run lint
```

## 🌟 Fonctionnalités

### 📸 Caméra
- Accès à la caméra de l'utilisateur pour capturer des photos
- Stockage de la photo localement
- Notification après la capture d'une image

### 🌍 Géolocalisation
- Récupération des coordonnées GPS de l'utilisateur
- Affichage de la position sur une carte interactive avec Leaflet

### 📞 Appels téléphoniques
- Interface permettant de saisir un numéro et d'initier un appel
- Vérification et nettoyage du format du numéro avant l'appel

### 🔋 Niveau de batterie
- Affichage en temps réel du niveau de batterie
- Indication de l'état de charge (en charge ou non)

### 📳 Vibration
- Déclenchement manuel d'une vibration sur l'appareil
- Arrêt de la vibration via un bouton
- Gestion de la compatibilité avec le navigateur

### 💬 Chat
- Non fonctionnel :/

## 🛠 Configuration supplémentaire
Pour plus d'informations sur la configuration avancée, consultez la documentation officielle de Vue.js : [Configuration Reference](https://cli.vuejs.org/config/).

## 📄 Licence
Ce projet est sous licence MIT. Vous êtes libre de le modifier et de le redistribuer sous les termes de cette licence.

---

