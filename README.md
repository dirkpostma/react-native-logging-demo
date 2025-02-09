# react native logging demo

This repo aims to explore logging possibilities in React Native. Several ideas:

- filterable by feature, identified by folder
- automatic determine filepath where log line was produced:
  - extract info from new Error().stack?
  - in dev mode: output from metro bundler?
  - in release mode: use source maps? `npx expo export --dump-sourcemap`
- flexible, easy exapndable transports, similar to how winston does it
  - console
  - asyncstorage (rotated)
  - filesystem (rotated)
  - external services e.g. datadog, sentry etc.



## Use Stack trace


Dev mode stack line:
```
Error
    at onPress (http://192.168.2.20:8081/app/(tabs)/explore.bundle//&platform=ios&hot=false&transform.engine=hermes&transform.bytecode=1&transform.routerRoot=app&unstable_transformProfile=hermes-stable&dev=true&minify=false&modulesOnly=true&runModule=false&shallow=true:43:47)
```


```
import { SourceMap } from '@expo/source-map';

async function getOriginalPosition(sourceMapUrl, line, column) {
  const sourceMap = await fetch(sourceMapUrl).then(r => r.json());
  const map = await SourceMap.fromJSON(sourceMap);
  return map.getOriginalPosition(line, column);
}
```