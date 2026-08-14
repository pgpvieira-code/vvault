---
sidebar_position: 2
---
# Google Chrome Extension

VVault is not on the Chrome Web Store yet. Until it is, install it manually.
The same package works for Brave and Opera, which use Chrome extensions.

## Install from a release

1. Download `vvault-browser-extension-<version>-chrome.zip` from the
   [releases page](https://github.com/pgpvieira-code/vvault/releases)
2. Unpack it into a folder you will keep — Chrome loads the extension from that folder on every
   start, so deleting it uninstalls the extension
3. Open `chrome://extensions`
4. Turn on **Developer mode**
5. Click **Load unpacked** and select the unpacked folder

The extension points at `https://app.vvault.com.br` by default. To use your own instance, change the
server address in the extension's settings.

## Build from Source
If you wish to install the extension from source instead, see the [build-from-source](build-from-source.md) documentation. This will allow you to make changes to the extension and/or to use a specific version of the extension.
