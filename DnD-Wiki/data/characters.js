/* Player characters. note: PENDING shows the "level 2 choices pending" line under the stat block. Remove it once a sheet is final.
   Link to any entry from any text with [[entry-id]]. Everything here is visible to players. */
WIKI.add([
  {
    id: 'char-daanster',
    type: 'character',
    title: 'Daanster',
    sub: 'Elf (Drow) Sorcerer 2 · Folk Hero · Chaotic Good',
    note: PENDING,
    stat: {
      pc: true,
      core: 'AC 10 · HP 10 · Speed 30 ft · Darkvision 120 ft',
      abil: 'STR 9 (-1) · DEX 10 (+0) · CON 11 (+0) · INT 14 (+2) · WIS 13 (+1) · CHA 16 (+3)',
      groups: [
        [
          {n: 'Cantrips', t: 'Light, Control Flames, Frostbite, Minor Illusion, Dancing Lights.'},
          {n: '1st level (3 slots)', t: 'Magic Missile, Thunderwave.'}
        ]
      ]
    }
  },

  {
    id: 'char-piama',
    type: 'character',
    title: 'Piama',
    sub: 'Tiefling Druid 2 · Noble · Neutral Good',
    note: PENDING,
    stat: {
      pc: true,
      core: 'AC 11 · HP 17 · Speed 30 ft · Darkvision 60 ft · Fire resistance',
      abil: 'STR 15 (+2) · DEX 7 (-2) · CON 14 (+2) · INT 14 (+2) · WIS 18 (+4) · CHA 9 (-1)',
      groups: [
        [
          {n: 'Cantrips', t: 'Druidcraft, Produce Flame, Fire Bolt, Thaumaturgy, Elementalism.'},
          {
            n: '1st level (3 slots)',
            t: 'Wide prepared list including Healing Word, Entangle, Faerie Fire and Cure Wounds.'
          }
        ]
      ]
    }
  },

  {
    id: 'char-john',
    type: 'character',
    title: 'John Lockwood',
    sub: 'Variant Human Fighter 2 · Soldier · Lawful Evil',
    note: PENDING,
    stat: {
      pc: true,
      core: 'AC 16 · HP 14 · Speed 30 ft',
      abil: 'STR 18 (+4) · DEX 14 (+2) · CON 9 (-1) · INT 11 (+0) · WIS 12 (+1) · CHA 11 (+0)',
      groups: [
        [
          {n: 'Weapon Mastery', t: 'Glaive (Graze), Halberd (Cleave), Shortsword (Vex).'},
          {
            n: 'Savage Attacker',
            t: 'Once per turn, roll weapon damage twice and use either result.'
          }
        ]
      ]
    }
  }
]);
