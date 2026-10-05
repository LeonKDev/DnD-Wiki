/* Items.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'item-backpack',
    type: 'item',
    title: 'The Unclaimed Backpack',
    summary: 'Contains 2 potions and 10 gold. Found in the tavern, no owner found, kept by Daanster.',
    sections: [{h: 'Linked', ul: ['[[quest-backpack]]', '[[loc-tavern]]', '[[char-daanster]]']}]
  },

  {
    id: 'item-map',
    type: 'item',
    title: 'Map to the Goblin Cave',
    summary: 'Looted from the goblin camp.',
    sections: [
      {
        h: 'Linked',
        ul: ['[[loc-camp]] is where it was found.', '[[loc-cave]] is where it leads.', '[[quest-cave]]']
      }
    ]
  }
]);
