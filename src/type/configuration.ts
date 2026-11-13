export type LinkrunnerConfiguration = {
    /** Enable debug mode (optional) */
    debug?: boolean
    /** Custom message for user tracking permission (iOS) */
    userTrackingPermission?: string
    /** Disable IDFA tracking (optional) */
    disableIdfa?: boolean
    /**
     * Privacy mode for apps directed at children (optional).
     * When true, the plugin does not add `NSUserTrackingUsageDescription` on iOS and
     * removes the `com.google.android.gms.permission.AD_ID` permission on Android.
     * Also pass `privacyMode: true` to `linkrunner.init` at runtime.
     */
    privacyMode?: boolean
}
