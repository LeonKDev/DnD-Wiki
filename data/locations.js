/* Locations.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'loc-tavern',
    type: 'location',
    title: 'The Tavern',
    summary: 'Where John met the strangers, the merchant was posting his job, and Daanster found the backpack.',
    sections: [{h: 'Linked quests', ul: ['[[quest-tavern]]', '[[quest-merchant]]', '[[quest-backpack]]']}]
  },

  {
    id: 'loc-camp',
    type: 'location',
    title: 'The Goblin Camp',
    summary: 'Found on the strangers’ map and cleared. The goblin boss and one more goblin died here, and the party looted a map to the goblin cave.',
    sections: [
      {
        h: 'Linked',
        ul: ['[[enc-camp]] was the fight.', '[[item-map]] was looted here.', '[[quest-camp]]']
      }
    ]
  },

  {
    id: 'loc-cave',
    type: 'location',
    title: 'The Goblin Cave',
    summary: 'Marked on the map looted from the goblin camp. Not visited yet.',
    sections: [{h: 'Linked', ul: ['[[item-map]] leads here.', '[[quest-cave]]']}]
  }
]);
