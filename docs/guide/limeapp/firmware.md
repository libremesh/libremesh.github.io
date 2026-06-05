---
outline: deep
---

# Firmware

This screen lets you update the [LibreRouterOS](https://gitlab.com/librerouter/librerouteros/) firmware installed on the device.

[Firmware](https://en.wikipedia.org/wiki/Firmware) is the collection of small programs (software) that tell the device what to do and how. Without firmware, the device does nothing useful. For LibreRouter to keep working, there is an ongoing development effort behind it.

LibreRouterOS is based on [LibreMesh](https://libremesh.org), [OpenWrt](https://openwrt.org/), and other non-proprietary software components such as LimeApp. The project considers it important to accompany communities in co-creating their [free, community, and decentralised networks](https://conectividad.altermundi.net/documentacion/redes-libres-comunitarias-y-descentralizadas/), also through technical and development decisions. To learn more, visit the [Free Design](https://librerouter.org/es/libre-design-2/) section of the [LibreRouter](http://librerouter.org) project website.

## Updating the firmware of a LibreRouter

There are two options:

1. One-click safe update.
2. Choose a firmware image from your device.

![Firmware update options](/guide/limeapp/images/firmware_options.png)

### Things to keep in mind

- Access to this tool requires the shared administration password.
- When a new update is available, a notification appears at the top of the screen announcing it and leading to the same screens 👇
  ![New version notification](/guide/limeapp/images/firmware_notification.png)
- The update is performed safely (SafeUpgrade), and in case *something* breaks, the previous configuration is restored automatically.

## 1. One-click safe update

### Step-by-step instructions

1. Press the **Download** button.

   ![Step 1 — download](/guide/limeapp/images/firmware_step1.png)

2. Wait for the new LibreRouterOS firmware image to download. The button stays disabled until the process finishes.

   ![Step 2 — downloading](/guide/limeapp/images/firmware_step2.png)

3. Press **Upgrade to LibreRouterOS 1.5**.

   ![Step 3 — upgrade](/guide/limeapp/images/firmware_step3.png)

4. The upgrade starts. Wait until it finishes without disconnecting the LibreRouter. The estimated time is about 3 minutes.

   ![Step 4 — upgrading](/guide/limeapp/images/firmware_step4.png)

5. The upgrade is complete. LimeApp needs to be **reloaded**. If it reloads correctly, the process is going well 🙂

   ![Step 5 — reload](/guide/limeapp/images/firmware_step5.png)

6. The main LimeApp screen appears with the notification at the top. If everything looks good, confirm the upgrade. First press the **Go** button.

   ![Step 6 — go to confirm](/guide/limeapp/images/firmware_step6.png)

7. Then press **Confirm**.

   ![Step 7 — confirm](/guide/limeapp/images/firmware_step7.png)

8. The firmware of the LibreRouter has been updated successfully. To verify, open the **Status** screen of LimeApp. The firmware-version field should now read LibreRouterOS 1.5.

   ![Step 8 — done](/guide/limeapp/images/firmware_step8.png)

## 2. Choose a firmware image from your device

Use this option to upgrade from a firmware file that you have already downloaded.

1. Choose the *«Choose a firmware image from your device»* option.

   ![From file — option](/guide/limeapp/images/firmware_from_file1.png)

2. Once the file is uploaded, press **Upgrade**. The rest of the process is the same as described above.

   ![From file — upload](/guide/limeapp/images/firmware_from_file2.png)

## Something went wrong 🙁

- If LimeApp does not reload or something unexpected happens, the process is automatically reverted. Wait 10 minutes.
- If the update needs to be reverted, you can do so at step 7 above.

## More to keep in mind

- Other options and use cases exist. The [LibreRouter forum](http://foro.librerouter.org) is the place to ask, request help, and learn more. Everyone is welcome to participate!
- A companion document with instructions, recommendations, and procedures for updating community networks is being prepared. Coming soon!

---

> **Attribution.** Translated from [«Firmware»](https://conectividad.altermundi.net/documentacion/usar-limeapp1-4/un-paseo-por-el-menu-1-4/firmware/) by [AlterMundi](https://altermundi.net/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
