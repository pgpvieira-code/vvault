---
sidebar_position: 1
---
# Firefox Extension

VVault is not on Firefox Add-ons yet. Until it is, install it manually.

## Install from a release

1. Download `vvault-browser-extension-<version>-firefox.zip` from the
   [releases page](https://github.com/pgpvieira-code/vvault/releases) and unpack it
2. Open `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on**
4. Select the `manifest.json` file inside the unpacked folder

A temporary add-on is **removed when Firefox closes**. That is a limitation of installing an unsigned
extension, not of VVault — it goes away once the add-on is published and signed.

The extension points at `https://app.vvault.com.br` by default. To use your own instance, change the
server address in the extension's settings.

## Build from Source
If you wish to install the extension from source instead, see the [build-from-source](build-from-source.md) documentation. This will allow you to make changes to the extension and/or to use a specific version of the extension.
