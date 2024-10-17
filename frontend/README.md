# Panic-PWA

A simple web app to play Panic At The Dojo. This contains all the required content for a player to get started and keep track of all their tokens during the game.

Where DnD tries to run a few different modes of play (combat, social, exploration), PatD focuses almost entirely on combat. This project is an aid for running games and simplifying the setup, since I couldn't find a Roll20 or Foundry module for it.

Get the source book on [DriveThruRPG](https://www.drivethrurpg.com/en/product/247607/panic-at-the-dojo).

Feature checklist:

- [x] in-game health/stats/token tracking
- [x] Stances and selected character options
- [x] List of basic actions
- [x] State stored in URL
- [x] Visual UI pass (my eyes hurt)
- [x] Director-side character sheets (Stooges, Warriors, and Bosses)
- [x] it's hosted somewhere semi-permanently
- [ ] ~Installable PWA~

Missing features (so far):

- Skills. I only run this system as combat encounters so I haven't bothered with the non-combat `Skill` part of the system
- Correctly restricted character creation options. Boss archetypes in particular require that a certain style is used, but this isn't enforced.
- Alternate rules (e.g. endless stooges)
- overarching DM tools, like a round/turn tracker

## Patch'd Up, soon to be Second Strike

The ruleset has had a substantial overhaul through a series of patches. There's a /v2/ of the application in development.
Reach out if you want to get involved! I am `Nubuscu` on most platforms

Feature wishlist, things to do:

- [ ] A level-by-level character builder, like [pathbuilder](https://pathbuilder2e.com) does for Pathfinder 2e
- [ ] Update/rewrite the descriptions
- [ ] Roughly the same UI/layout as v1
- [ ] reconsider url as state if it gets too long. Maybe plaintext or through a shortener
- [ ] keep track of cinematic weight (to set max hp/shield)
- [ ] make token categories clearer, update help text
