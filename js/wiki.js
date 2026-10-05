/* Shared namespace. Data files add their entries here. */
var WIKI = {
  entries: [],
  events: [],
  add: function (list) { Array.prototype.push.apply(this.entries, list); },
  addEvents: function (list) { Array.prototype.push.apply(this.events, list); }
};
