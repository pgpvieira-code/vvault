---
sidebar_position: 3
---
# Microsoft Edge Extension

VVault is not on Edge Add-ons yet. Until it is, install it manually.

## Install from a release

1. Download `vvault-browser-extension-<version>-edge.zip` from the
   [releases page](https://github.com/pgpvieira-code/vvault/releases)
2. Unpack it into a folder you will keep — Edge loads the extension from that folder on every start,
   so deleting it uninstalls the extension
3. Open `edge://extensions`
4. Turn on **Developer mode**
5. Click **Load unpacked** and select the unpacked folder

The extension points at `https://app.vvault.com.br` by default. To use your own instance, change the
server address in the extension's settings.

## Build from Source
If you wish to install the extension from source instead, see the [build-from-source](build-from-source.md) documentation. This will allow you to make changes to the extension and/or to use a specific version of the extension.
