# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.3.0] - 2025-17-25

- Upgraded `rn-linkrunner` version to support apple search ads attribution.

## [3.2.1] - 2025-09-25

### Added
- Added `disableIdfa` configuration to the iOS plugin. When enabled, `NSUserTracking` is not added to the `Info.plist`, ensuring IDFA is not collected.

### Removed
- Removed `expo-tracking-transparency` from dependencies.
