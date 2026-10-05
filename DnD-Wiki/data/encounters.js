/* Encounters the party has fought. status is "Done" or "Upcoming". Prep for upcoming ones lives in the DM folder.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'enc-wagon',
    type: 'encounter',
    parent: 'chap-goblin',
    title: 'The Cart on the Road',
    status: 'Done',
    summary: 'Three goblins at an abandoned merchant’s cart, with no merchant in sight. The party killed two and one fled.',
    sections: [
      {
        h: 'Outcome',
        p: [
          'The third goblin ran when its ally was killed. The party saw which direction it went, but headed to the tavern instead.'
        ]
      },
      {h: 'Creatures', ul: ['[[cr-goblin]] x3']},
      {h: 'Linked', ul: ['[[chap-goblin]]']}
    ]
  },

  {
    id: 'enc-camp',
    type: 'encounter',
    title: 'The Goblin Camp Fight',
    status: 'Done',
    summary: 'The party found the camp and killed the goblin boss and one more goblin.',
    sections: [
      {h: 'Outcome', p: ['Looted [[item-map]]. The strangers were not there.']},
      {h: 'Where', ul: ['[[loc-camp]]']}
    ]
  }
]);
