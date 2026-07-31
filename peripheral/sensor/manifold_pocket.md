---
sidebar_position: 1
description: "Manifold Pocket Scanner: fitting, capture planning, specifications and software."
---

# Manifold Pocket Scanner

<Split ratio="wide-narrow">

<div>

A compact handheld 3D capture unit, combining a **40-line LiDAR** with **dual global-shutter fisheye cameras** for colourised point clouds. At 560 g and roughly the size of a hand, it is carried rather than mounted, and is used alongside a robot deployment rather than on the robot.

The usual reasons to reach for it: capturing a site before deploying a robot into it, producing a reference map to check an autonomously built one against, or recording as-built geometry where sending a robot is not practical.

Capture is previewed live and edited in the field through the MindCloud GO app; MindCloud on Windows handles the heavier processing.

This page does not repeat or replace Manifold's documentation — the manuals below are the reference for operating it.

</div>

<Figure
  src={require('../img/manifold/pocket.png').default}
  alt="Manifold Pocket handheld 3D scanner"
  size="hero" />

</Split>

## Fitting it

Nothing to fit — it is handheld and battery-powered. What constrains a session:

| | |
| --- | --- |
| **Battery life** | About 2 hours |
| **Weight** | 560 g (main unit) |
| **Dimensions** | 115 × 110 × 83 mm (main unit) |

Two hours is the practical planning unit. A site needing longer than that has to be split into sessions, so decide where the seams fall before you start rather than after the battery goes.

## Key information

### Related resources

| Resource | What it is | Where |
| --- | --- | --- |
| MindCloud GO manual | Operating the scanner and the field app | [PDF](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EXVPAz1fy0dEmuplUSErgX8BZrLj6EK2IC621P0m_sSpow?e=cWhO5P) |
| MindCloud manual | Desktop processing | [PDF](https://tangrobot.sharepoint.com/:b:/s/Public-Outgoing/EQCjHhhVamtNuHzNLNt-J1oBzEU-H3OIJ6Gbclk3GRVqZA?e=avRo4H) |
| MindCloud GO | Field app — live preview and on-the-fly edits | [Android APK](https://www.manifoldtech.cloud/download/?file=MindCloudGo_0.3.0.apk) |
| MindCloud | Desktop processing application | [Windows](https://www.manifoldtech.cloud/download/?file=MindCloud_0.1.9.exe) |

### Specifications

Unlike most product pages here the sensor figures are kept in full, because they determine whether a capture will work before you travel to the site — which is not something to discover on arrival.

| | |
| --- | --- |
| LiDAR | 40 lines, 905 nm |
| Range | Up to 40 m at 10 % reflectivity · 70 m at 80 % reflectivity |
| Point rate | 200,000 points/s (first return) |
| Frame rate | 10 Hz |
| Cameras | 2 × 5 MP global-shutter fisheye, true colour |
| Battery life | About 2 hours |
| Dimensions | 115 × 110 × 83 mm (main unit) |
| Weight | 560 g (main unit) |

:::note Range depends on what you are scanning, not only how far away it is

The two range figures are the same sensor against different surfaces. Dark, matte or
wet materials sit near the 10 % end and will fall short of 40 m; bright painted walls
and signage sit near the 80 % end. Plan around the lower figure for outdoor and
industrial sites rather than the headline one.

:::

## Troubleshooting & FAQ

### Coverage is patchy on dark surfaces

Expected — see the note above. Dark and matte materials return far less light, so effective range drops well below the headline figure. Work closer to them.

For fault and alarm codes, see [Fault codes](/support/fault-codes). General questions are answered on the [Support FAQ](/support/faq).

## Support

Collect the serial number and the app and firmware versions before raising a ticket — [Before you contact us](/support/before-you-contact-us) lists what helps.

- [Support centre](/support/intro) — all support resources
- [Identify your product](/support/identify-your-product) — where to find the serial number
- [Warranty and RMA](/support/warranty-and-rma) — repairs, replacements and returns
