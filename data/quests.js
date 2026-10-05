/* Quests. status is "Active" or "Resolved". To make a quest part of a bigger questline, add  parent: 'quest-id'.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'quest-goblin',
    type: 'quest',
    title: 'The Goblin Threat',
    status: 'Active',
    summary: 'End the goblin threat. The trail so far: a cart on the road, two strangers and a map in the tavern, a cleared camp, and now a map to the goblin cave.',
    sections: []
  },

  {
    id: 'quest-cart',
    type: 'quest',
    parent: 'quest-goblin',
    title: 'The Cart on the Road',
    status: 'Resolved',
    summary: 'Deal with the goblins at an abandoned merchant’s cart on the road.',
    sections: [
      {
        h: 'Where it connects',
        ul: [
          '[[enc-wagon]] was the fight.',
          '[[npc-merchant]] later posted a job in the tavern to recover the cart.'
        ]
      }
    ]
  },

  {
    id: 'quest-tavern',
    type: 'quest',
    parent: 'quest-goblin',
    title: 'The Tavern Strangers',
    status: 'Active',
    summary: 'Find the goblin camp. Two strangers in the tavern were planning to clear it, with a map of its location on their table. The party has not seen them since.',
    sections: [
      {
        h: 'Where it connects',
        ul: ['[[npc-strangers]] are the people involved.', '[[loc-tavern]] is where they were met.']
      }
    ]
  },

  {
    id: 'quest-merchant',
    type: 'quest',
    title: 'The Merchant’s Reward',
    status: 'Active',
    summary: 'Collect the reward for recovering the merchant’s cart. He was posting the job in the tavern, but the party had already done it.',
    sections: [
      {
        h: 'Where it connects',
        ul: ['[[npc-merchant]] owes the reward.', '[[quest-cart]] is where the cart was recovered.']
      }
    ]
  },

  {
    id: 'quest-camp',
    type: 'quest',
    parent: 'quest-goblin',
    title: 'The Goblin Camp',
    status: 'Resolved',
    summary: 'Clear the goblin camp the strangers had mapped. The party killed the goblin boss and one more goblin.',
    sections: [
      {
        h: 'Where it connects',
        ul: [
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
    parent: 'quest-goblin',
    title: 'The Trail to the Cave',
    status: 'Active',
    summary: 'Follow the looted map to the goblin cave. Not visited yet.',
    sections: [{h: 'Where it connects', ul: ['[[item-map]] shows the way.', '[[loc-cave]] is the place.']}]
  },

  {
    id: 'quest-backpack',
    type: 'quest',
    title: 'The Backpack',
    status: 'Active',
    summary: 'Find out who the backpack found in the tavern belongs to. Nobody has claimed it, so Daanster kept it.',
    sections: [
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
