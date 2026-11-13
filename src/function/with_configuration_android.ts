import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'

import { LinkrunnerConfiguration } from '../type/configuration'

/** Opt-out flag read by the Linkrunner Android SDK (io.linkrunner:android-sdk 5.1.0+). */
const META_ANONYMOUS_ID_FLAG = 'io.linkrunner.sdk.MetaAnonymousIdCollectionEnabled'

const withConfiguration_Android: ConfigPlugin<LinkrunnerConfiguration> = (
    expoConfig: ExpoConfig,
    configuration?: LinkrunnerConfiguration,
): ExpoConfig => {
    // Collection is on by default, so only an explicit opt-out needs a manifest entry.
    if (configuration?.collectMetaAnonymousId !== false) {
        return expoConfig
    }

    if (configuration?.debug) {
        console.log('ExpoLinkrunner: Disabling Meta anonymous ID collection (Android)')
    }

    return withAndroidManifest(expoConfig, config => {
        const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults)

        AndroidConfig.Manifest.addMetaDataItemToMainApplication(
            mainApplication,
            META_ANONYMOUS_ID_FLAG,
            'false',
        )

        return config
    })
}

export { withConfiguration_Android }
