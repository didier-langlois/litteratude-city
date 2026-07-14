# Moteur de la Cité — RC3

Ce dossier est prêt à être placé dans le dossier `cite/` du dépôt `litteratude-online`.

## Contenu

- `index.html` : point d'entrée de la Cité
- `css/style.css` : identité visuelle
- `js/app.js` : moteur de navigation
- `data/districts.json` : contenus des quartiers
- `images/` : carte, lampe, Flaubert et McKay
- `audio/` : premières voix de Flaubert
- `videos/` : emplacement réservé aux deux clips

## Important pour les vidéos

Les vidéos n'ont pas été incluses dans ce paquet afin de conserver un téléchargement léger et compatible avec GitHub.

- `biographie-flaubert-720.mp4` : environ 99 Mo
- `flaubert-le-voyageur.mp4` : environ 229 Mo

Consultez `videos/flaubert/AJOUTER_LES_VIDEOS_ICI.txt`.

## Test local

Le moteur charge `data/districts.json`. Certains navigateurs bloquent ce chargement lorsqu'on double-clique simplement sur `index.html`.

Sur GitHub Pages, cela fonctionne normalement. En local, on peut lancer un petit serveur depuis le dossier `cite` :

```bash
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.
