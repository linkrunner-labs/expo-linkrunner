import { ConfigPlugin, withInfoPlist } from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'

import { LinkrunnerConfiguration } from '../type/configuration'

const withConfiguration_iOS: ConfigPlugin<LinkrunnerConfiguration> = (
    expoConfig: ExpoConfig,
    configuration?: LinkrunnerConfiguration,
): ExpoConfig => {

    if (configuration?.debug) {
        console.log('ExpoLinkrunner: Applying iOS configuration')
    }

    const userTrackingMessage = configuration?.userTrackingPermission || 
        "This identifier will be used to deliver personalized ads to you."

    expoConfig = withInfoPlist(expoConfig, expoConfig => {

        // Add tracking description from configuration or default only when disable idfa is false
        if (!expoConfig.modResults.NSUserTrackingUsageDescription && !configuration?.disableIdfa) {
            expoConfig.modResults.NSUserTrackingUsageDescription = userTrackingMessage
        }

        // Add SKAN configuration
        if(!expoConfig.modResults.NSAdvertisingAttributionReportEndpoint) {
            expoConfig.modResults.NSAdvertisingAttributionReportEndpoint = 'https://linkrunner-skan.com'
        }
        if(!expoConfig.modResults.AttributionCopyEndpoint) {
            expoConfig.modResults.AttributionCopyEndpoint = 'https://linkrunner-skan.com'
        }

        // Meta anonymous ID collection is on by default, so only an explicit opt-out is
        // written. Expo apps cannot edit Info.plist by hand, hence the plugin option.
        if (configuration?.collectMetaAnonymousId === false) {
            expoConfig.modResults.LinkrunnerMetaAnonymousIdCollectionEnabled = false
        }

        return expoConfig
    })


    // // add the plugin only if disableIdfa is false
    // if(!configuration?.disableIdfa){
    //     // Automatically apply expo-tracking-transparency plugin
    //     expoConfig = withPlugins(expoConfig, [
    //         [
    //             'expo-tracking-transparency',
    //             {
    //                 userTrackingPermission: userTrackingMessage,
    //             }
    //         ]
    //     ])
    // }

    return expoConfig
}

export { withConfiguration_iOS } 