!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e="undefined"!=typeof globalThis?globalThis:e||self).vdp_translation_de=e.vdp_translation_de||{},e.vdp_translation_de.js=t())}(this,(function(){"use strict";return new class{constructor(e,t,n,r){this.language=e,this.months=t,this.monthsAbbr=n,this.days=r,this.rtl=!1,this.ymd=!1,this.yearSuffix=""}get language(){return this._language}set language(e){if("string"!=typeof e)throw new TypeError("Language must be a string");this._language=e}get months(){return this._months}set months(e){if(12!==e.length)throw new RangeError(`There must be 12 months for ${this.language} language`);this._months=e}get monthsAbbr(){return this._monthsAbbr}set monthsAbbr(e){if(12!==e.length)throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);this._monthsAbbr=e}get days(){return this._days}set days(e){if(7!==e.length)throw new RangeError(`There must be 7 days for ${this.language} language`);this._days=e}}("German",["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."])}));
