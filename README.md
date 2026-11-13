# Linkrunner Expo Plugin

An Expo plugin for integrating Linkrunner functionality into your Expo applications.

## Documentation

For setup instructions, usage examples, and API reference, please visit:

[Linkrunner Expo Plugin Documentation](https://docs.linkrunner.io/sdk/expo/installation)

## Privacy mode

For apps directed at children (COPPA, Apple Kids Category, Google Play Families), turn on privacy mode in two places.

In `app.json`, set the plugin option:

```json
{
  "expo": {
    "plugins": [["expo-linkrunner", { "privacyMode": true }]]
  }
}
```

With `privacyMode: true`, the plugin does not add `NSUserTrackingUsageDescription` or the SKAdNetwork keys on iOS, and removes the `com.google.android.gms.permission.AD_ID` permission on Android.

At runtime, pass `privacyMode` as the last argument of `init` from `rn-linkrunner`:

```ts
import linkrunner from "rn-linkrunner";

await linkrunner.init("YOUR_PROJECT_TOKEN", undefined, undefined, undefined, false, true);
```

The SDK then stops collecting device-level identifiers (GAID, App Set ID, Android ID, IDFA, IDFV) and never shows the ATT prompt. The SDK stores the value: `true` stays on across launches until you call `init` with `false`. Leaving it out keeps the stored value.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Linkrunner Private Limited
