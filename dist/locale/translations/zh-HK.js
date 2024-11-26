!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):((t="undefined"!=typeof globalThis?globalThis:t||self)["vdp_translation_zh-HK"]=t["vdp_translation_zh-HK"]||{},t["vdp_translation_zh-HK"].js=e())}(this,(function(){"use strict";const t=new class{constructor(t,e,n,s){this.language=t,this.months=e,this.monthsAbbr=n,this.days=s,this.rtl=!1,this.ymd=!1,this.yearSuffix=""}get language(){return this._language}set language(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t}get months(){return this._months}set months(t){if(12!==t.length)throw new RangeError(`There must be 12 months for ${this.language} language`);this._months=t}get monthsAbbr(){return this._monthsAbbr}set monthsAbbr(t){if(12!==t.length)throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);this._monthsAbbr=t}get days(){return this._days}set days(t){if(7!==t.length)throw new RangeError(`There must be 7 days for ${this.language} language`);this._days=t}}("Chinese_HK",["壹月","贰月","叁月","肆月","伍月","陆月","柒月","捌月","玖月","拾月","拾壹月","拾贰月"],["壹月","贰月","叁月","肆月","伍月","陆月","柒月","捌月","玖月","拾月","拾壹月","拾贰月"],["日","壹","贰","叁","肆","伍","陆"]);return t.yearSuffix="年",t}));