import { Platform } from 'react-native';

/**
 * AppInfo class which contains information about the application version
 * and default server URLs.
 */
export class AppInfo {
  /**
   * The current mobile app version. This should be updated with each release of the mobile app.
   */
  public static readonly VERSION = '0.31.0-alpha';

  /**
   * The API version to send to the server (base semver without stage suffixes).
   * Apple app store requires semver format without stage suffixes.
   */
  public static readonly API_VERSION = (() => {
    return AppInfo.VERSION.split('-')[0];
  })();

  /**
   * The client name to use in the X-AliasVault-Client header.
   * Detects the specific browser being used.
   */
  public static readonly CLIENT_NAME = (() : 'ios' | 'android' | 'app' => {
    const os = Platform.OS;

    if (os === 'ios') {
      return 'ios';
    }

    if (os === 'android') {
      return 'android';
    }

    return 'app';
  })();

  /**
   * The default VVault client URL.
   */
  public static readonly DEFAULT_CLIENT_URL = 'https://app.vvault.com.br';

  /**
   * The default VVault web API URL.
   */
  public static readonly DEFAULT_API_URL = 'https://app.vvault.com.br/api';

  /**
   * The URL of the public source repository.
   *
   * Surfaced in the settings screen to satisfy AGPL-3.0: users who receive this app are entitled
   * to its corresponding source. The repository must stay public and in sync with what is
   * published to the app stores.
   */
  public static readonly SOURCE_CODE_URL = 'https://github.com/pgpvieira-code/vvault';

  /**
   * Prevent instantiation of this utility class
   */
  private constructor() {}
}
