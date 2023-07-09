Need to setup these env vars for kde apps to respect settings
```
QT_QPA_PLATFORMTHEME="kde"
```

Object model is leaf of dependency tree, i.e. it **should NOT** depend on anything.

Actions may depend on object model.

Executer can depend on anything.