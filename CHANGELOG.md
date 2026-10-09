# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.5.1] - 2026-10-10

- Raised the `rn-linkrunner` peer dependency to `^3.2.1`. In `rn-linkrunner` 3.2.0, `getAttributionData()` returned no `gaid` or `idfa` on Android. 3.2.1 fixes that, and both keys are now `null` when unavailable on Android and iOS. Run a native rebuild (`npx expo prebuild` or an EAS build) after upgrading.

## [3.5.0] - 2026-10-09

- Raised the `rn-linkrunner` peer dependency to `^3.2.0`. That release returns `gaid` and `idfa` from `getAttributionData()`: the advertising identifiers Linkrunner recorded the install with, or null when unavailable. It bundles native Android SDK 4.2.0 and iOS SDK 4.2.0. Run a native rebuild (`npx expo prebuild` or an EAS build) after upgrading.

## [3.4.1] - 2026-10-06

- Fixed 3.4.0 being published without its compiled `build/` folder, which made `expo prebuild` and EAS builds fail with `PluginError: Failed to resolve plugin for module "expo-linkrunner"`. Please upgrade from 3.4.0.
- Added the `src/index.ts` entry that `main` (`build/index.js`) points to. It was only on an unmerged branch.
- `npm publish` now always cleans and rebuilds first, and fails if `build/index.js` is missing.
- Stopped publishing the local `.claude/` folder.

## [3.4.0] - 2026-10-04

- Raised the `rn-linkrunner` peer dependency to `^3.1.1`. That release bundles native Android SDK 4.1.1, where `enablePIIHashing(true)` actually hashes `name`, `email` and `phone` on Android (before, they were sent in plain text while iOS sent SHA-256 hashes). The old `^2.6.0` range also excluded every 3.x release.

## [3.3.0] - 2025-12-17

- Upgraded `rn-linkrunner` version to support apple search ads attribution.

## [3.2.1] - 2025-09-25

### Added
- Added `disableIdfa` configuration to the iOS plugin. When enabled, `NSUserTracking` is not added to the `Info.plist`, ensuring IDFA is not collected.

### Removed
- Removed `expo-tracking-transparency` from dependencies.
