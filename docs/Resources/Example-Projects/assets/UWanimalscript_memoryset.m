%% Create nnp class
nnp=NNPHELPERS;

%% Memory Map
% The script will pull values from these 1F57 subindices to set the stimulation and ON/OFF timing parameters

%N7:1F57.1|uint8 => stimOnLimit
%N7:1F57.2|uint8 => stimOffLimit
%N7:1F57.3|uint8 => StimOnVals[1] % (pulse width)
%N7:1F57.4|uint8 => StimOnVals[2] % (pulse amplitude)
%N7:1F57.5|uint8 => freq

%% Write Memory to Change Variables
% Run this section to set values for stimulation parameters in the non-volatile memory in the power module
% these commands set and allow the script to proxy those typical commands in a repititive, automated way instead of using a matlab request everytime. 
% For example, the script internally calculates the period using the frequency value and sets the Sync period itself (not by using the setSync MATLAB API command)

% set stimOnLimit value. Example uint8(10) for 10 seconds of continous stimulation
nnp.write(7, '1F57', 1, uint8(10), 'uint8');
% set stimOffLimit value. Example uint8(120) for 120 seconds of stimulation turned off
nnp.write(7, '1F57', 2, uint8(120), 'uint8');
% set pulse width value. Example: uint(200) for 200microsecond pulse width
nnp.write(7, '1F57', 3, uint8(200), 'uint8');
% set pulse amplitude value.  Example uint8(50) for 5.0 milliAmps
nnp.write(7, '1F57', 4, uint8(50), 'uint8');
% set frequency value
nnp.write(7, '1F57', 5, uint8(25), 'uint8');
% save the object dictionary for the power module across resets
nnp.saveOD(7);

%% Read Memory to Check Variables were entered
% read stimOnLimit value
nnp.read(7, '1F57', 1, 'uint8')
% read stimOffLimit value
nnp.read(7, '1F57', 2, 'uint8')
% read pulse width value
nnp.read(7, '1F57', 3, 'uint8')
% read pulse amplitude value
nnp.read(7, '1F57', 4, 'uint8')
% read frequency value
nnp.read(7, '1F57', 5, 'uint8')

%% Debug script
% edit UWanimalscript.nnpscript in Notepad++ and use scriptedit(nnp) to assemble, download, and debug
scriptedit(nnp);
% script scheduler should be set to 1000ms to sync each count with 1 second.
% make sure Script File Paths under the Script Library tab is set correctly to point to your local .nnpscript file

%% Start Script
nnp.nmt(7,'8D', 1); % Start Script
%% Stop Script
nnp.nmt(7,'AE', 1); % Stop Script
nnp.nmt(7,'A7'); % Reset global variables
nnp.enterWaiting;
nnp.networkOff;
