import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'

import { LinkrunnerConfiguration } from '../type/configuration'

/** Opt-out flag read by the Linkrunner Android SDK (io.linkrunner:android-sdk 5.2.0+). */
const META_ANONYMOUS_ID_FLAG = 'io.linkrunner.sdk.MetaAnonymousIdCollectionEnabled'

const AD_ID_PERMISSION = 'com.google.android.gms.permission.AD_ID'
const TOOLS_NAMESPACE = 'http://schemas.android.com/tools'

type ManifestPermission = {
    $: { 'android:name': string; 'tools:node'?: string }
}

// Marks AD_ID as removed so the manifest merger drops the permission that
// Linkrunner and Google Play services declare.
const removeAdIdPermission = (
    androidManifest: AndroidConfig.Manifest.AndroidManifest,
): AndroidConfig.Manifest.AndroidManifest => {
    const manifest = androidManifest.manifest
    manifest.$ = { ...manifest.$, 'xmlns:tools': manifest.$['xmlns:tools'] ?? TOOLS_NAMESPACE }

    const permissions = (manifest['uses-permission'] ?? []) as ManifestPermission[]
    const existing = permissions.find((permission) => permission.$?.['android:name'] === AD_ID_PERMISSION)
    if (existing) {
        existing.$['tools:node'] = 'remove'
    } else {
        permissions.push({ $: { 'android:name': AD_ID_PERMISSION, 'tools:node': 'remove' } })
    }
    manifest['uses-permission'] = permissions as AndroidConfig.Manifest.ManifestUsesPermission[]

    return androidManifest
}

const withConfiguration_Android: ConfigPlugin<LinkrunnerConfiguration> = (
    expoConfig: ExpoConfig,
    configuration?: LinkrunnerConfiguration,
): ExpoConfig => {
    const privacyMode = configuration?.privacyMode === true
    // Collection is on by default, so only an explicit opt-out needs a manifest entry.
    const disableMetaAnonymousId = configuration?.collectMetaAnonymousId === false

    if (!privacyMode && !disableMetaAnonymousId) {
        return expoConfig
    }

    if (configuration?.debug) {
        if (privacyMode) {
            console.log('ExpoLinkrunner: privacyMode is on, removing the AD_ID permission on Android')
        }
        if (disableMetaAnonymousId) {
            console.log('ExpoLinkrunner: Disabling Meta anonymous ID collection (Android)')
        }
    }

    return withAndroidManifest(expoConfig, (config) => {
        if (privacyMode) {
            config.modResults = removeAdIdPermission(config.modResults)
        }

        if (disableMetaAnonymousId) {
            const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults)
            AndroidConfig.Manifest.addMetaDataItemToMainApplication(
                mainApplication,
                META_ANONYMOUS_ID_FLAG,
                'false',
            )
        }

        return config
    })
}

export { withConfiguration_Android }
