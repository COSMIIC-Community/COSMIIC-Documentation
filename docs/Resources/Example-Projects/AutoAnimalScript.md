---
sidebar_position: 2
---

# Automated Script for Animal Test

Toggle stim on and off in a predetermined pattern for 24/7 experiment

---

## Overview

The University of Wisconsin is seeking to study the effect of electrical stimulation on encapsulation of the electrode placed on the vagus nerve. They had been using the benchtop development kit in acute, percutaneous studies. To move to a fully implanted chronic study, they began using the human version of the system. Their experiment requires constant electrical stimulation to alternate ON and OFF for long periods of time. Additionally, their animal lab setup does not allow computers, meaning a laptop running the NNP-API in Matlab and a Wireless Link cannot be brought into the lab. The external interface limitations and repetitive nature of the stimulation points towards using the [**scripts layer**](/Getting-Started/Step2-Network#module-firmware) to implement automated task handling.

### Contributors

- University of Wisconsin Lab: Kip Ludwig, Brandon Coventry
- COSMIIC team: Joris Lambrecht, Chris Rexroth, Jerry Ukwela

---

## Modifications

The goal was to create a script that would administer stimulation across defined ON and OFF periods of 10 seconds and 120 seconds, respectively. Another important aspect was the ability to adjust the stimulation parameters.

### Design Thinking

The script establishes a global variable `count` that is maintained across script runs. To baseline the timing, we set the Script Scheduler to 1000ms and increment `count` by 1 each script run. This means 1 second will pass every script run and we can track. This allowed us to set uint8 variables for time limits based in seconds.

If values for stimulation parameters were set to stack variables in the script, the script would have to be assembled and downloaded to the PM every time. Instead, to keep the team's ability to flexibly change stimulation parameters without needing to interact with the script file, we placed values into a common memory index 1F57. 1F57 is a non-volatile memory section that can be saved across system boots using the saveOD(node) NNP-API command. This is separate from 1F53 which acts as a sort of RAM and cannot be maintained across system boots. 

We created a small memory map of `uint8` values at the first subindices of 1F57 that get moved into global variables. These values can be altered using the nnp.write() NNP-API command and altered values will come into use after the script is reset. This organization of value subindices is mirrored in the .m file for setting the values as well as the .nnpscript file.

```matlab
%N7:1F57.1|uint8 => stimOnLimit
%N7:1F57.2|uint8 => stimOffLimit
%N7:1F57.3|uint8 => StimOnVals[1] % (pulse width)
%N7:1F57.4|uint8 => StimOnVals[2] % (pulse amplitude)
%N7:1F57.5|uint8 => freq
```

### Forks of Repository

This project used the common firmware fork for animal temperature increase, same as [the previous example](./AnimalTempIncrease.md). The PM firmware version is the same and the script is loaded into the PM's memory using the scriptedit() NNP-API command.

The following files were generated or updated to implement the script.
- .m script for manipulating and checking 1F57 index in Object Dictionary. Place this file [**UWanimalscript_memoryset.m**](./assets/UWanimalscript_memoryset.m) in `NNP-API/` to start the script, edit protocol values and stop the script from running.
- .nnpscript files for script source code. Place this file [**UWanimalscript.nnpscript**](./assets/UWanimalscript.nnpscript) in `NNP-API/apps/scripting/Example Scripts/` and use `scriptedit(nnp)` to download and debug the script.
- .mat file (updated). Place this updated library file [**examples_library.mat**](./assets/examples_library.mat) in `NNP-API/apps/scripting/Example Scripts/` and use `scriptedit(nnp)` to change file paths to point to the relevant .nnpscript file path.

---

## Attributions

Supported by the NIH SPARC HORNET program, the Case Western Reserve University team is funded by main award U41NS129436-03 and the University of Wisconsin team is funded by subaward U41NS129436-02S4.