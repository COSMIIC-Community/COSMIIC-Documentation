---
sidebar_position: 1
---

# Development Kits Overview

The basics of what an dev kit is and how you can use it

---

## Overview

A COSMIIC System dev kit is essential for you to test new features in software and firmware, scope unique module orientations, or possibly create new modules. The dev kit is a custom-oriented system sitting on your benchtop that mirrors the function of an implantable COSMIIC System. Kits are essential for you to advance a project from (1) idea &rarr; (2) benchtop testing &rarr; (3) animal testing &rarr; (4) clinical feasibility. The open source COSMIIC System and dev kit give you the power and flexibility you need to develop your neuromodulation concepts.

---

## Structure

Let's get our vocabulary consistent: a **development kit** consists of one or more **development boards**. A **development board** represents the circuitry and function of one of the implantable module types&mdash;either the PM, PG4, or BP2 module. These boards can be stacked on top of each other, and with built-in network jumpers, are connected on the same physical network. Your stack of boards, or **kit** is based on the function you require (# of stim channels, # of recording channels). For example, if you need 8 channels of stimulation and 2 channels of recording, your kit should be assembled with a PM module, two PG4 modules, and one BP2 module. 

The current design of development boards has two assembled components&mdash;a **frame board** and a **module circuit board**. **Frame board** is our term, akin to breakout board or board shield, for an extra interface to the main circuit that provides supplemental interfaces with a consistent form factor. The **module circuit board** is the miniature, enclosure-ready design that can also be used in implantable modules. Fixing a delicate **module circuit board** onto the **frame board** allows for easier handling on your benchtop and adds ports and points for diagnostic interaction.
