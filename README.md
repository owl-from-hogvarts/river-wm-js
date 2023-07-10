# river-wm-js

Provides object model to configure `river-wm` in declarative fashion.

## Configuration

> Note: see more usage info in `src/example.ts`

Instance of `River` class holds configuration. It is not instantly applied.

### Keybindings

Keybindings are grouped by modes. There are two special modes defined for you: `normal` and `lock`. They are set up by assigning an array of `KeyBinding<FeatureSet>` to `DEFAULT_MODE` and `LOCK_MODE` respectively. `FeatureSet` is generic parameter (and type safety feature of this package) that specify, which capabilities (actions/commands) you allowed to use. This defines the set of available implementations for your config. As of now, just use `FullFeatures` type. In future though, different setting [appliers](#apply) (i.e. implementations) may provide slightly different capabilities.

### Custom modes
You may also wish to define your own modes. To accomplish this, create an `SwitchableMode` instance and configure it to your liking. Provide it *unique* name (`normal` and `locked` are reserved!), provide it with mode *from which* your's new mode will be accessible. It is possible to specify, array of modes. Then You will be able to access your freshly defined mode from any of them. In case of array provided, exiting mode would result 

## Apply

> CONFIGURATION IS APPLIED **ONLY AFTER YOU CALL** `apply()` on `RiverctlExecuter` instance

To apply configuration, you need to choose applier implementation. By now, only `RiverctlExecuter` implementation is supported. It will generate and run `riverctl` commands for you. 

If demand will be high enough, implementation interacting with river directly via wayland may be made.

## KDE tweaks

Need to setup these env vars for kde apps to respect theming settings
```
QT_QPA_PLATFORMTHEME="kde"
```

## Under the Hood
Object model is leaf of dependency tree, i.e. it **should NOT** depend on anything.

Actions may depend on object model.

Executer can depend on anything.

