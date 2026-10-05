# The Road to the Demon King: campaign wiki

A static website: no framework and no server. Players open it, the DM unlocks private notes with a password.

## Two folders

```
Projects/
  DnD-Wiki/       this project, goes to GitHub
  DnD-Wiki-DM/    private DM notes, stays on your computer
```

**Never put `DnD-Wiki-DM` inside this project or upload it.** If your repository is public, everything in it can be read by anyone. The DM notes only reach the repo in encrypted form (`data/dm-payload.js`).

## What is where

```
index.html          page shell and the order scripts load in
css/tokens.css      colors and fonts (change the look here)
css/style.css       layout and components
data/config.js      entry types and the "level 2 pending" line
data/quests.js      one file per entry type, all visible to players
data/npcs.js
data/characters.js
data/locations.js
data/encounters.js
data/creatures.js
data/items.js
data/history.js     what happened, oldest first
data/dm-payload.js  GENERATED, encrypted DM notes. Do not edit.
js/                 the engine (you rarely need to touch it)
tools/              build-dm.js and check.js
```

## Run it

Open `index.html` in a browser, or use the Live Server extension in VS Code. Nothing to install for that.

## Add something

Open the right file in `data/` and add an entry to the list. Link to any other entry with `[[entry-id]]`.

```js
{
  id: 'npc-innkeeper',
  type: 'npc',
  title: 'Marta the Innkeeper',
  sub: 'Runs the tavern',
  summary: 'Knows everyone in town. Mentioned the [[quest-tavern]] strangers paid in advance.',
  sections: [
    {h: 'Linked', ul: ['[[loc-tavern]]']}
  ]
}
```

Fields: `id` (unique, lowercase with dashes), `type` (see `data/config.js`), `title`, optional `sub`, `summary`, `status`, `sections`, `parent` (quests only). A section is `{h: 'Heading', p: ['paragraph'], ul: ['bullet']}`.

Part of a bigger questline: give the quest `parent: 'quest-goblin'`. It then shows on the parent's page as a part, and the parent's timeline includes its history lines.

History line (`data/history.js`):

```js
{id: 'ev10', who: 'Party', quest: 'quest-cave', text: 'Reached the cave entrance. See [[loc-cave]].'}
```

Resolve a quest by changing `status: 'Active'` to `status: 'Resolved'`.

## DM notes

Edit the files in `DnD-Wiki-DM`:

- `extras.js` adds DM-only sections to public entries (key = the public entry's id).
- `entries.js` holds entries that exist only for the DM.

Then, inside this project:

```
npm run build
```

It asks for the password twice, encrypts the DM folder into `data/dm-payload.js`, and proves it can open it again. Commit and push the changed `dm-payload.js`. It needs Node.js (nodejs.org). Use the same password every time, or the old one stops working.

Do not edit `dm-payload.js` by hand. One stray line break breaks the lock.

## Check your work

```
npm run check
```

Finds broken `[[links]]`, duplicate ids, wrong statuses, and public text that links to a DM-only entry (players would see a blank).

## Publish

Commit and push. GitHub Pages serves `index.html` from the repository root.

## Safety notes

- Anyone can read everything in `data/` except `dm-payload.js`. Do not put secrets there.
- The lock is only as strong as the password. Use several unrelated words. People with the page can try guesses as fast as their computer allows.
- Changing the password means running `npm run build` again.
