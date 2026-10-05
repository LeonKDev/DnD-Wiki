/* History, oldest first. quest: attaches the line to a quest's timeline.
   who: 'Party' or a character name. Visible to players, so write neutral facts. */
WIKI.addEvents([
  {
    id: 'ev1',
    who: 'Party',
    quest: 'chap-goblin',
    text: 'Found a merchant’s cart on the road with no merchant in sight and three goblins. Killed two. The third fled when its ally fell, and the party saw which way it went. See [[enc-wagon]].'
  },

  {
    id: 'ev2',
    who: 'John',
    quest: 'quest-camp',
    text: 'Walked up to two strangers in the tavern and drank a beer with them. They had a map of the goblin camp on the table and were talking about clearing it. See [[npc-strangers]].'
  },

  {
    id: 'ev3',
    who: 'Daanster',
    quest: 'quest-backpack',
    text: 'Found an unclaimed backpack (2 potions, 10 gold) in the tavern. Asked around, no owner came forward, and kept it. See [[item-backpack]].'
  },

  {
    id: 'ev4',
    who: 'Piama',
    quest: 'quest-merchant',
    text: 'Went to collect the reward from the merchant, who was posting a job to recover his cart that the party had already recovered. A Charisma check failed, a fight broke out and no reward was paid. See [[npc-merchant]].'
  },

  {
    id: 'ev5',
    who: 'Party',
    quest: 'quest-camp',
    text: 'Decided to head to the goblin camp first, since John knew where it was before the strangers went.'
  },

  {
    id: 'ev6',
    who: 'Party',
    quest: 'quest-camp',
    text: 'Found and cleared the Goblin Camp, killing the goblin boss and one more goblin. See [[enc-camp]].'
  },

  {
    id: 'ev7',
    who: 'Party',
    quest: 'quest-camp',
    text: 'Reached level 2 after defeating the goblin boss.'
  },

  {
    id: 'ev8',
    who: 'Party',
    quest: 'quest-cave',
    text: 'Looted a map to a goblin cave from the camp. See [[item-map]].'
  },

  {
    id: 'ev9',
    who: 'Party',
    quest: 'quest-camp',
    text: 'No sign of the two strangers at the camp.'
  }
]);
