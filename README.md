# Time-ticker

A tool for managing synchronised regular changes across an app

## Planned features

(subject to change as I work out what it should actually look like)

[] subscribe to ticker
[] unsubscribe from ticker
[] change time period of ticker
[] run multiple tickers simultaneously

## Planned architecture

(also subject to change)

* There is a store of functions to be called each cycle - initially an array, later an object containing all the functions keyed with ids to enable handling of multiple ticks
* the ticker will cycle round every x milliseconds and run every function in the store
* the user can use a subscribe function to add a function to the store so it is called every cycle starting from the next one.
* the user can use an unsubscribe function to remove a function from the store so it is no longer called during a cycle.