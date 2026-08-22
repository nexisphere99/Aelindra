/* ================================================================
   AELINDRA   MASTER SCRIPT
   Custom macros, sidebar updaters, utility functions
   ================================================================ */

/* --- SIDEBAR MENU BUTTON HANDLERS ---
   StoryInterface.tw is injected into the DOM as raw HTML (via
   jQuery, at story init) - it is NOT run through SugarCube's
   Wikifier/macro engine, so <<...>> macro syntax typed directly
   into StoryInterface.tw never executes; the browser's own HTML
   parser sees it first and mangles it (especially macros whose
   name doubles as a real tag, like <<button>>, since the parser
   tries to open an actual <button> element from the raw text).
   So the sidebar menu buttons stay plain onclick="" attributes,
   and go through these window-scoped wrapper functions instead
   - this file runs in SugarCube's user-script context, where UI/
   Engine/etc. ARE valid identifiers, and each wrapper attaches
   itself to window so a plain onclick="" (which runs in the
   page's ordinary global scope, where UI itself is NOT defined)
   can still reach them. */
window.aelindraSaves = function () {
  UI.buildSaves();
  UI.saves();
};

window.aelindraSettings = function () {
  UI.settings();
};

window.aelindraRestart = function () {
  UI.restart();
};

/* --- HISTORY NAV (Back/Forward) ---
   Engine.backward()/forward() are the same Engine API methods
   SugarCube's own default UI-bar history controls call - this
   reproduces that behavior in our custom nav bar. Wrapped in
   try/catch rather than a manual history-length guard, since both
   methods are documented to already no-op at the history boundary
   in normal use; the catch is just a safety net against a stray
   error reaching the console on an edge case. */
window.aelindraBack = function () {
  try { Engine.backward(); } catch (e) { /* nothing earlier to go back to */ }
};

window.aelindraForward = function () {
  try { Engine.forward(); } catch (e) { /* nothing later to go forward to */ }
};

/* --- MOBILE SIDEBAR DRAWERS ---
   Below the CSS breakpoint (see stylesheet.css), #sidebar-left and
   #sidebar-right leave the document flow and become off-canvas
   drawers toggled by the .mobile-open class. Above the breakpoint
   these are harmless no-ops - the sidebars are always visible there
   and the CSS for .mobile-open doesn't apply. */
window.aelindraToggleSidebar = function (side) {
  var target = document.getElementById(side === 'left' ? 'sidebar-left' : 'sidebar-right');
  if (!target) return;
  var opening = !target.classList.contains('mobile-open');
  aelindraCloseSidebars();
  if (opening) {
    target.classList.add('mobile-open');
    document.body.classList.add('mobile-sidebar-active');
  }
};

window.aelindraCloseSidebars = function () {
  var left = document.getElementById('sidebar-left');
  var right = document.getElementById('sidebar-right');
  if (left) left.classList.remove('mobile-open');
  if (right) right.classList.remove('mobile-open');
  document.body.classList.remove('mobile-sidebar-active');
};

/* Auto-close an open drawer when the player follows a link to a new
   passage, so it never sits open over content it doesn't apply to.
   :passagestart is a jQuery custom event SugarCube fires on every
   passage transition - jQuery is guaranteed loaded by this point,
   since it's what powers passage rendering in the first place. */
jQuery(document).on(':passagestart', function () {
  aelindraCloseSidebars();
});

/* ================================================================
   <<locationImage>> / <<npcPortrait>>   native macros
   ------------------------------------------------------------
   These used to be <<widget>>s (src/ui/widgets.tw) that built an
   <img> tag as HTML text   first via a backtick naked expression,
   then via <<print>> string concatenation. Both proved unreliable:
   backticks inside a literal HTML attribute in a widget body don't
   get reliably re-evaluated by the Wikifier, and <<print>>'s output
   went through markup escaping instead of rendering as a real tag.
   Defining them as genuine JS macros sidesteps all of that: the
   <img> element is built with document.createElement and appended
   straight to this.output (the macro's designated render target),
   so nothing ever passes through an HTML-as-text/escaping step.
   ================================================================ */
Macro.add('locationImage', {
  // Usage: <<locationImage "training_yard" "Training Yard">>
  handler: function () {
    var slug = this.args[0];
    var altText = this.args[1] || '';

    var wrap = document.createElement('div');
    wrap.className = 'loc-image';

    var img = document.createElement('img');
    img.src = 'assets/images/locations/' + slug + '.png';
    img.alt = altText;
    img.onerror = function () {
      wrap.style.display = 'none';
    };

    wrap.appendChild(img);
    this.output.appendChild(wrap);
  }
});

Macro.add('npcPortrait', {
  // Usage: <<npcPortrait "marta" "Marta">>
  handler: function () {
    var slug = this.args[0];
    var altText = this.args[1] || '';

    var img = document.createElement('img');
    img.className = 'npc-portrait-inline';
    img.src = 'assets/images/npcs/' + slug + '.png';
    img.alt = altText;
    img.onerror = function () {
      img.style.display = 'none';
    };

    this.output.appendChild(img);
  }
});

/* --- DAY NUMBER FORMATTER ---
   $dayNumber is negative before the Rite (Day -2, Day -1) and zero
   on the day itself - meaningful for comparisons in code, but a
   bare minus sign reads as a typo/error to a player, not "before
   the story's Day 0". Used anywhere a day number is shown to the
   player: the left sidebar (below) and each day hub's own <h2>
   (e.g. day-2_hub.tw), via <<print formatDayNumber($dayNumber)>>. */
window.formatDayNumber = function (n) {
  if (n < 0) {
    var days = Math.abs(n);
    return days + (days === 1 ? ' Day Before' : ' Days Before');
  }
  if (n === 0) return 'The Day Of';
  return 'Day ' + n;
};

/* --- SIDEBAR UPDATE (called by PassageHeader on every passage render) --- */
window.updateSidebars = function () {
  var sv = State.variables;

  /* --- LEFT SIDEBAR --- */

  // Day & Time
  var dayEl = document.getElementById('day-display');
  var timeEl = document.getElementById('time-display');
  if (dayEl) {
    dayEl.textContent = formatDayNumber(sv.dayNumber) + '   ' + sv.dayLabel;
  }
  if (timeEl) timeEl.textContent = sv.timeSlot;

  // Resource Bars
  updateBar('energy', sv.energy);
  updateBar('stress', sv.stress);
  updateBar('arousal', sv.arousal);

  // Show arousal bar only after transformation
  var arousalWrap = document.getElementById('arousal-bar-container');
  if (arousalWrap) arousalWrap.style.display = sv.dayNumber >= 1 ? '' : 'none';

  // Stat List
  var statList = document.getElementById('stat-list');
  if (statList) {
    statList.innerHTML = buildStatRow('GRA', 'Grace', sv.statGRA)
      + buildStatRow('AUT', 'Authority', sv.statAUT)
      + buildStatRow('ALL', 'Allure', sv.statALL)
      + buildStatRow('PRO', 'Prowess', sv.statPRO)
      + buildStatRow('WIS', 'Wisdom', sv.statWIS)
      + buildStatRow('RES', 'Resolve', sv.statRES)
      // FEM only exists post-transformation - hidden before Day 1
      // the same way the arousal bar is hidden before Day 1 below.
      + (sv.dayNumber >= 1 ? buildStatRow('FEM', 'Femininity', sv.statFEM) : '');
  }

  // Objectives
  renderObjectives(sv.objectives);

  // Gold
  var goldVal = document.getElementById('gold-val');
  if (goldVal) goldVal.textContent = sv.gold;

  /* --- RIGHT SIDEBAR --- */

  // Portrait
  var img = document.getElementById('mc-portrait-img');
  if (img) img.src = 'assets/images/portraits/' + sv.mcPortrait + '.png';

  // Name & Title
  var nameEl = document.getElementById('mc-name');
  var titleEl = document.getElementById('mc-title');
  if (nameEl) nameEl.textContent = sv.mcName;
  if (titleEl) titleEl.textContent = sv.mcTitle;

  // Body Stats
  var bodyBlock = document.getElementById('body-status-block');
  if (bodyBlock) bodyBlock.style.display = sv.bodyStatusVisible ? '' : 'none';
  setTextById('bs-height', sv.mcHeight);
  setTextById('bs-bust', sv.mcBust);
  setTextById('bs-waist', sv.mcWaist);
  setTextById('bs-hips', sv.mcHips);
  setTextById('bs-sensitivity', sv.mcSensitivity);

  // Outfit
  var outfitBlock = document.getElementById('outfit-block');
  if (outfitBlock) outfitBlock.style.display = sv.wardrobeUnlocked ? '' : 'none';
  setTextById('current-outfit', sv.currentOutfit);

  // Relationships
  var relBlock = document.getElementById('relationship-block');
  if (relBlock) relBlock.style.display = sv.relationshipsVisible ? '' : 'none';
};

/* --- HELPERS --- */

function updateBar(id, val) {
  var bar = document.getElementById(id + '-bar');
  var valEl = document.getElementById(id + '-val');
  if (bar) bar.style.width = Math.max(0, Math.min(100, val)) + '%';
  if (valEl) valEl.textContent = Math.round(val);
}

function buildStatRow(abbr, name, val) {
  var cls = val > 0 ? ' highlight' : '';
  return '<div class="stat-row">'
    + '<span class="stat-label">' + abbr + '   ' + name + '</span>'
    + '<span class="stat-value' + cls + '">' + val + '</span>'
    + '</div>';
}

function setTextById(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || ' ';
}

function renderObjectives(objs) {
  var mainList = document.getElementById('obj-main-list');
  var sideList = document.getElementById('obj-side-list');
  if (!mainList || !sideList) return;
  mainList.innerHTML = '';
  sideList.innerHTML = '';
  objs.forEach(function (o) {
    var li = document.createElement('li');
    li.textContent = o.text;
    if (o.type === 'MAIN') mainList.appendChild(li);
    else sideList.appendChild(li);
  });
}

/* --- STAT TOAST NOTIFICATION --- */
window.showStatToast = function (text, negative) {
  var toast = document.createElement('div');
  toast.className = 'stat-toast' + (negative ? ' negative' : '');
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(function () { toast.remove(); }, 2500);
};


/* ================================================================
   MC PORTRAIT MANAGER
   Call <<updatePortrait>> after events that change appearance
   ================================================================ */

window.getPortraitForState = function () {
  var sv = State.variables;

  /* Pre-transformation: male Edrin */
  if (sv.dayNumber <= 0) {
    if (sv.stress > 60) return 'edrin_stressed';
    return 'edrin_default';
  }

  /* Post-transformation: path-dependent */
  var prefix = sv.gamePath === 'futa' ? 'aelindra_futa_' : 'aelindra_';

  if (sv.dayNumber <= 3)  return prefix + 'day1';
  if (sv.dayNumber <= 7)  return prefix + 'day3';
  if (sv.dayNumber <= 14) return prefix + 'day7';
  if (sv.dayNumber <= 30) return prefix + 'day7';
  if (sv.dayNumber <= 60) return prefix + 'day30';
  if (sv.dayNumber <= 90) return prefix + 'day60';
  if (sv.dayNumber <= 119) return prefix + 'day90';
  return prefix + 'day120';
};


/* ================================================================
   PORTRAIT FALLBACK
   Shows a styled placeholder if the portrait image file
   doesn't exist yet (art not produced for that state).
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var img = document.getElementById('mc-portrait-img');
  if (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      var frame = document.getElementById('mc-portrait-border');
      if (frame) {
        frame.innerHTML = '<div class="portrait-placeholder">'
          + '<div class="placeholder-silhouette"></div>'
          + '<p class="placeholder-text">' + (State.variables.mcName || 'Edrin') + '</p>'
          + '</div>';
      }
    });
  }
});
