import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'

import { LinkrunnerConfiguration } from '../type/configuration'

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
    if (!configuration?.privacyMode) {
        return expoConfig
    }

    if (configuration?.debug) {
        console.log('ExpoLinkrunner: privacyMode is on, removing the AD_ID permission on Android')
    }

    return withAndroidManifest(expoConfig, (config) => {
        config.modResults = removeAdIdPermission(config.modResults)
        return config
    })
}

export { withConfiguration_Android }
