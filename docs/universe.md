<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [ancestries][1]
    *   [ancestries][2]
*   [belts][3]
    *   [beltInfo][4]
        *   [Parameters][5]
*   [bloodlines][6]
    *   [bloodlines][7]
*   [bulk][8]
    *   [idsToNames][9]
        *   [Parameters][10]
    *   [namesToIDs][11]
        *   [Parameters][12]
*   [categories][13]
    *   [categories][14]
    *   [categoryInfo][15]
        *   [Parameters][16]
*   [constellations][17]
    *   [constellationInfo][18]
        *   [Parameters][19]
    *   [constellations][20]
*   [factions][21]
    *   [factions][22]
*   [graphics][23]
    *   [graphicInfo][24]
        *   [Parameters][25]
    *   [graphics][26]
*   [groups][27]
    *   [groupInfo][28]
        *   [Parameters][29]
    *   [groups][30]
*   [moons][31]
    *   [moonsInfo][32]
        *   [Parameters][33]
*   [planets][34]
    *   [planetInfo][35]
        *   [Parameters][36]
*   [races][37]
    *   [races][38]
*   [regions][39]
    *   [regionInfo][40]
        *   [Parameters][41]
    *   [regions][42]
*   [stargates][43]
    *   [stargateInfo][44]
        *   [Parameters][45]
*   [stars][46]
    *   [starInfo][47]
        *   [Parameters][48]
*   [stations][49]
    *   [stationInfo][50]
        *   [Parameters][51]
*   [structures][52]
    *   [structures][53]
    *   [structureInfo][54]
        *   [Parameters][55]
*   [systems][56]
    *   [systemInfo][57]
        *   [Parameters][58]
    *   [systemJumps][59]
    *   [systemKills][60]
    *   [systems][61]
*   [types][62]
    *   [typeInfo][63]
        *   [Parameters][64]
    *   [types][65]

## ancestries

### ancestries

Get all character ancestries.

Returns **[Promise][66]<[array][67]>**&#x20;

## belts

### beltInfo

Get information on an asteroid belt.

#### Parameters

*   `beltID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## bloodlines

### bloodlines

Get a list of bloodlines.

Returns **[Promise][66]<[object][69]>**&#x20;

## bulk

### idsToNames

Resolve a set of IDs to names and categories.
Supported ID’s for resolving are:
Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions

#### Parameters

*   `IDs` **\[[number][68]]**&#x20;

Returns **[Promise][66]<[array][67]>**&#x20;

### namesToIDs

Resolve a set of names to IDs in the following categories:
agents, alliances, characters, constellations, corporations factions, inventory\_types, regions, stations, and systems.
Only exact matches will be returned. All names searched for are cached for 12 hours.

#### Parameters

*   `names` **\[[string][70]]**&#x20;

Returns **[Promise][66]<[array][67]>**&#x20;

## categories

### categories

Get a list of item categories.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

### categoryInfo

Get information on an item category.

#### Parameters

*   `categoryID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## constellations

### constellationInfo

Get information on a constellation.

#### Parameters

*   `constellationID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### constellations

Get a list of constellations.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

## factions

### factions

Get a list of factions.

Returns **[Promise][66]<[object][69]>**&#x20;

## graphics

### graphicInfo

Get information on a graphic.

#### Parameters

*   `graphicID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### graphics

Get a list of graphics.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

## groups

### groupInfo

Get information on an item group.

#### Parameters

*   `groupID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### groups

Get a list of item groups.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

## moons

### moonsInfo

Get information on a moon.

#### Parameters

*   `moonID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## planets

### planetInfo

Get information on a planet.

#### Parameters

*   `planetID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## races

### races

Get a list of character races.

Returns **[Promise][66]<[object][69]>**&#x20;

## regions

### regionInfo

Get information on a region.

#### Parameters

*   `regionID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### regions

Get a list of regions.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

## stargates

### stargateInfo

Get information on a stargate.

#### Parameters

*   `stargateID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## stars

### starInfo

Get information on a star.

#### Parameters

*   `starID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## stations

### stationInfo

Get information on a station.

#### Parameters

*   `stationID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

## structures

### structures

List all public structures.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

### structureInfo

Get structure information.

#### Parameters

*   `structureID` **[number][68]**&#x20;

Returns **any** information on requested structure if you are on the ACL. Otherwise, returns “Forbidden” for all inputs.

## systems

### systemInfo

Get information on a solar system.

#### Parameters

*   `systemID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### systemJumps

Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header,
excluding wormhole space. Only systems with jumps will be listed.

Returns **[Promise][66]<[object][69]>**&#x20;

### systemKills

Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header,
excluding wormhole space. Only systems with kills will be listed.

Returns **[Promise][66]<[object][69]>**&#x20;

### systems

Get a list of solar systems.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

## types

### typeInfo

Get information on a type.

#### Parameters

*   `typeID` **[number][68]**&#x20;

Returns **[Promise][66]<[object][69]>**&#x20;

### types

Get a list of type ids.

Returns **[Promise][66]<\[[number][68]]>**&#x20;

[1]: #ancestries

[2]: #ancestries-1

[3]: #belts

[4]: #beltinfo

[5]: #parameters

[6]: #bloodlines

[7]: #bloodlines-1

[8]: #bulk

[9]: #idstonames

[10]: #parameters-1

[11]: #namestoids

[12]: #parameters-2

[13]: #categories

[14]: #categories-1

[15]: #categoryinfo

[16]: #parameters-3

[17]: #constellations

[18]: #constellationinfo

[19]: #parameters-4

[20]: #constellations-1

[21]: #factions

[22]: #factions-1

[23]: #graphics

[24]: #graphicinfo

[25]: #parameters-5

[26]: #graphics-1

[27]: #groups

[28]: #groupinfo

[29]: #parameters-6

[30]: #groups-1

[31]: #moons

[32]: #moonsinfo

[33]: #parameters-7

[34]: #planets

[35]: #planetinfo

[36]: #parameters-8

[37]: #races

[38]: #races-1

[39]: #regions

[40]: #regioninfo

[41]: #parameters-9

[42]: #regions-1

[43]: #stargates

[44]: #stargateinfo

[45]: #parameters-10

[46]: #stars

[47]: #starinfo

[48]: #parameters-11

[49]: #stations

[50]: #stationinfo

[51]: #parameters-12

[52]: #structures

[53]: #structures-1

[54]: #structureinfo

[55]: #parameters-13

[56]: #systems

[57]: #systeminfo

[58]: #parameters-14

[59]: #systemjumps

[60]: #systemkills

[61]: #systems-1

[62]: #types

[63]: #typeinfo

[64]: #parameters-15

[65]: #types-1

[66]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[67]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[68]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[70]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
