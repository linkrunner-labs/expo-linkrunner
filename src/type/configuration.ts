export type LinkrunnerConfiguration = {
    /** Enable debug mode (optional) */
    debug?: boolean
    /** Custom message for user tracking permission (iOS) */
    userTrackingPermission?: string
    /** Disable IDFA tracking (optional) */
    disableIdfa?: boolean
    /**
     * Collect the Meta (Facebook) SDK's anonymous ID and send it with your events, so Meta
     * can match them to the same device it already knows from its own SDK.
     *
     * On by default, and a no-op in apps without the Meta SDK. Set this to `false` to turn
     * the lookup off: the plugin then writes the opt-out flag into `AndroidManifest.xml` and
     * `Info.plist`, which Expo apps cannot edit by hand.
     */
    collectMetaAnonymousId?: boolean
}
