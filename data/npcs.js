/* NPCs.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'npc-strangers',
    type: 'npc',
    title: 'The Two Strangers',
    sub: 'Met in the tavern',
    summary: 'Planning to clear the goblin camp, with a map of it on their table. John drank a beer with them. The party has not seen them since.',
    sections: []
  },

  {
    id: 'npc-merchant',
    type: 'npc',
    title: 'The Merchant',
    sub: 'Posting a job in the tavern',
    summary: 'Was posting a job to recover his cart, which the party had already recovered. A fight broke out when the party tried to collect the reward, and he paid nothing.',
    sections: [{h: 'Status', p: ['Reward unpaid. See [[quest-merchant]].']}]
  }
]);
