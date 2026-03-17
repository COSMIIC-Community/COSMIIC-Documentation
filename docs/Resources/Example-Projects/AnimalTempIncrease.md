---
sidebar_position: 1
---

# Increasing Temperature Limit for Animal Test

Adjust temperature operating thresholds to account for animal model body heat

---

## Overview

The COSMIIC System's human use considers a temperature limit of 40 degrees Celsius to ensure comfort for implant recipients. The actions of typical operation and charging can lead to a temperature increase in the PM, so there are two implemented safety features to make sure that the device does not exceed the temperature limit. When the PM thermistor reads out 40 Celsius, (1) the PM disallows network functionality, effectively shutting off stim and record features, and (2) the charger disallows further charging. Some animals have a body heat near 40 Celsius thus the temperature limit shut-off features could interfere with typical functioning and interrupt experimental protocol.

### Contributors

- University of Wisconsin Lab: Kip Ludwig, Brandon Coventry
- University of Michigan Lab: Tim Bruns, Sonia Bhaskaran, Mark Nissen
- COSMIIC team: Joris Lambrecht, Chris Rexroth, Jerry Ukwela

---

## Modifications

The goal was to change the operating temperature thresholds to a temperature that would be above the typical body heat of ovine and porcine animal models. To implement an all-encompassing increase of the temperature limit, both the firmware of the PM application and Wireless Link (Smart Charger) had to be altered.

### Design Thinking

PM firmware: The max temperature is defined in `app/runcanserver.c` as `#define MAX_CASE_TEMPERATURE`. The succeeding value was changed from 400 to 430. The value is in units of 0.1 degree Celsius. This is the only value that needed to be changed in the PM. In this same file, `checkCaseTemperature()` uses this value in a logic statement to determine if the network should be set to Wait mode and then turn the Network OFF. If the PM's thermistor reads a value over the limit three consecutive times, the network is shut down. We were first able to confirm this feature by toggling a potentiometer on the thermistor input on the benchtop development kit while monitoring values on the pmtest.mlapp in NNP-API. Then we used the NNP-API commands to set `networkOn()`, heat the human version of the PM to 43 degrees Celsius on a hot plate, and use `getNetworkStatus()` to confirm that the network turned OFF (ans=0).

Wireless Link (Smart Charger) firmware: The temperature warnings and error values are defined in `wirelesslink/src/charger.c` as `#define PM_GOOD_TEMP`, `#define PM_WARN_TEMP`, and `#define PM_MAX_TEMP`. We increased each value by 30, matching `PM_MAX_TEMP` to the `MAX_CASE_TEMPERATURE` in the PM firmware at the value of 430. After building the Wireless Link project with the `#define WL_IN_CHARGER` in `wirelesslink/src/cmdhandler.h` to orient the firmware for use in the Smart Charger, we confirmed the feature by heating the PM on a hot plate while charging with the Smart Charger. Warning icons changed at the new temperature thresholds and charging stopped at 43 degrees Celsius, reading "Error: PM Temperature Limit."

### Forks of Repository

This firmware is a fork of the main PM application. The PM firmware was built using IAR and was flashed wirelessly to the PM using the `pmbootloader.mlapp` in the NNP-API repository.

This firmware is a fork of the main Wireless Link application. The build is conducted with the WL_IN_CHARGER option and was flashed over serial to the Wireless Link using the directions here: [Wireless-Link#serial-recovery-and-device-firmware-update-mode-usb-dfu-mode](/Externals/Wireless-Link#serial-recovery-and-device-firmware-update-mode-usb-dfu-mode)

---

## Attributions

Supported by the NIH SPARC HORNET program, the Case Western Reserve University team is funded by main award U41NS129436-03, the University of Michigan team is funded by subaward U41NS129436-02S3, and the University of Wisconsin team is funded by subaward U41NS129436-02S4.