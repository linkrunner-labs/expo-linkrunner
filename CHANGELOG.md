# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.4.0] - 2026-07-27

- Upgraded `rn-linkrunner` to `^3.1.0`, adding support for Google Integrated Conversion Measurement (ICM).
- This crosses a major version of `rn-linkrunner`: the previous `^2.6.0` range could not resolve the 3.x line, so Expo had been holding at 2.x. Review the `rn-linkrunner` 3.0.0 notes when upgrading.
- iOS builds now pull `GoogleAdsOnDeviceConversion` transitively. Verify that `expo prebuild` resolves it and that `-ObjC` and `-lc++` reach your app target.

## [3.3.0] - 2025-12-17

- Upgraded `rn-linkrunner` version to support apple search ads attribution.

## [3.2.1] - 2025-09-25

### Added
- Added `disableIdfa` configuration to the iOS plugin. When enabled, `NSUserTracking` is not added to the `Info.plist`, ensuring IDFA is not collected.

### Removed
- Removed `expo-tracking-transparency` from dependencies.
