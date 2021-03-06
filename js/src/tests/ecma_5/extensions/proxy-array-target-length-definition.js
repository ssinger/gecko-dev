/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */

var gTestfile = 'proxy-array-target-length-definition.js';
var BUGNUMBER = 905947;
var summary =
  "Redefining an array's |length| property when redefining the |length| " +
  "property on a proxy with an array as target";

print(BUGNUMBER + ": " + summary);

/**************
 * BEGIN TEST *
 **************/

var arr = [];
var p = new Proxy(arr, {});

// This really should throw a TypeError, but we're buggy just yet, and this
// silently does nothing.
Object.defineProperty(p, "length", { value: 17, configurable: true });

// Same here.
Object.defineProperty(p, "length", { value: 42, enumerable: true });

// But at least we can check the property went unchanged.
var pd = Object.getOwnPropertyDescriptor(p, "length");
assertEq(pd.value, 0);
assertEq(pd.writable, true);
assertEq(pd.enumerable, false);
assertEq(pd.configurable, false);

var ad = Object.getOwnPropertyDescriptor(arr, "length");
assertEq(ad.value, 0);
assertEq(ad.writable, true);
assertEq(ad.enumerable, false);
assertEq(ad.configurable, false);

/******************************************************************************/

if (typeof reportCompare === "function")
  reportCompare(true, true);

print("Tests complete");
