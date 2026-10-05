/* Chapters: the big arcs of the campaign. Quests join a chapter with  parent: 'chap-id'.
   status is "Active" or "Resolved". open: true means more quests are still to come, so the progress bar shows an open end instead of a total. Progress on the home page counts the resolved quests inside the chapter.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'chap-goblin',
    type: 'chapter',
    title: 'Chapter 1: The Goblin Threat',
    status: 'Active',
    open: true,
    summary: 'Goblins are active on the road, and the party follows the trail to find where they come from.',
    sections: []
  }
]);
