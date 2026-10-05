/* Quests. status is "Active" or "Resolved". To put a quest in a chapter, add  parent: 'chap-id'.
   summary = what the quest was when the party took it on. What happened goes in history.js and the Outcome section.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'quest-camp',
    type: 'quest',
    parent: 'chap-goblin',
    title: 'The Goblin Camp',
    status: 'Resolved',
    summary: 'Two strangers in the tavern were planning to clear a goblin camp, with a map of where it is on their table. The party decided to get there first.',
    sections: [
      {
        h: 'Outcome',
        p: ['Cleared. The goblin boss and one more goblin died, and the party looted a map to the goblin cave.']
      },
      {
        h: 'Where it connects',
        ul: [
          '[[npc-strangers]] had the map.',
          '[[loc-tavern]] is where they were met.',
          '[[loc-camp]] is the place.',
          '[[enc-camp]] was the fight.',
          '[[item-map]] was looted here.'
        ]
      }
    ]
  },

  {
    id: 'quest-cave',
    type: 'quest',
    parent: 'chap-goblin',
    title: 'The Goblin Cave',
    status: 'Active',
    summary: 'The map looted at the camp marks a goblin cave. The party sets out to follow it.',
    sections: [{h: 'Where it connects', ul: ['[[item-map]] shows the way.', '[[loc-cave]] is the place.']}]
  },

  {
    id: 'quest-merchant',
    type: 'quest',
    title: 'The Merchant’s Reward',
    status: 'Active',
    summary: 'The merchant is offering a reward for recovering his cart, a job the party had already done.',
    sections: [
      {
        h: 'Where it connects',
        ul: ['[[npc-merchant]] owes the reward.', '[[enc-wagon]] is where the cart was recovered.']
      }
    ]
  },

  {
    id: 'quest-backpack',
    type: 'quest',
    title: 'The Backpack',
    status: 'Active',
    summary: 'A backpack was left behind in the tavern. Find out who it belongs to.',
    sections: [
      {h: 'So far', p: ['Nobody has claimed it, so Daanster kept it.']},
      {
        h: 'Where it connects',
        ul: [
          '[[item-backpack]] is the backpack and its contents.',
          '[[loc-tavern]] is where it was found.'
        ]
      }
    ]
  }
]);
