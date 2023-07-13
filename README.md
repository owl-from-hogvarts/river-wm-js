# river-wm-js

Provides neat, dependency free object model to configure `river-wm` in declarative fashion with pleasure :wink:.

## Configuration

> Note: see more usage info in `src/example.ts`

Instance of `River` class holds the configuration. Configuration is not instantly [applied](#apply)

### Keybindings

> Keybindings bind *shortcut* to an *action*.

Keybindings are grouped by modes. Keybindings are *defined* by instantiating `KeyBinding<FeatureSet>`. `FeatureSet` is generic parameter (and type safety feature of this package) that specify, which capabilities (actions/commands) you may use. This defines the set of available features for your config. As of now, just use `RiverctlFeatures` type. In future though, different setting [appliers](#apply) (i.e. implementations) may provide slightly different capabilities.

### Custom modes
You may also wish to define your own modes. To accomplish this, create an `SwitchableMode` or `EnterableMode` instance and configure it to your liking. Provide it *unique* name (`normal` and `locked` are reserved!), provide it with mode (array of modes for `EnterableMode`) *from which* your's new mode will be accessible. 

`SwitchableMode` will configure for you keybinding to *enter* the mode from `fallbackMode`, and *exit* from your mode back to `fallbackMode`. Works like toggle! 

`EnterableMode` setups keybinding *only to enter* the mode from all of the specified modes. To switch to other modes (i.e. *exit* mode), you should make them enterable too. You may want to make `DEFAULT_MODE` enterable from `ALL`. Thus you will be able to enter it from any other mode.

For more advance setup use `EnterModeAction` with appropriate keybindings or file an issue for me to implement feature.

## Apply

> CONFIGURATION IS APPLIED **ONLY AFTER YOU CALL** `apply()` on `RiverctlExecuter` instance

To apply configuration, you need to choose applier implementation. By now, only `RiverctlExecuter` implementation is supported. It will generate and run `riverctl` commands for you. 

If demand will be high enough, implementation interacting with river directly via wayland may be made.

## KDE tweaks

Need to setup these env vars for kde apps to respect theming settings
```
QT_QPA_PLATFORMTHEME="kde"
```


