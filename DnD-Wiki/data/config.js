/* Site settings. Everything in data/ is public. Private notes live in the DM folder. */
var TYPES = {
  chapter: {label: 'Chapters', one: 'Chapter', list: 'list-chapters'},
  quest: {label: 'Quests', one: 'Quest', list: 'list-quests'},
  npc: {label: 'NPCs', one: 'NPC', list: 'list-npcs'},
  character: {label: 'Characters', one: 'Player character', list: 'list-characters'},
  location: {label: 'Locations', one: 'Location', list: 'list-locations'},
  encounter: {label: 'Encounters', one: 'Encounter', list: 'list-encounters'},
  creature: {label: 'Creatures', one: 'Creature', list: 'list-creatures'},
  item: {label: 'Items', one: 'Item', list: 'list-items'},
  note: {label: 'DM Notes', one: 'DM note', list: 'list-notes'}
};

var PENDING = 'Level 2 choices are still being made. HP, spells and features will update once they are chosen.';
