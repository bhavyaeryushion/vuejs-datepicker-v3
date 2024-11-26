(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vuejsDatepicker = factory(global.vue));
})(this, (function (vue) { 'use strict';

  class Language {
    constructor(language, months, monthsAbbr, days) {
      this.language = language;
      this.months = months;
      this.monthsAbbr = monthsAbbr;
      this.days = days;
      this.rtl = false;
      this.ymd = false;
      this.yearSuffix = '';
    }
    get language() {
      return this._language;
    }
    set language(language) {
      if (typeof language !== 'string') {
        throw new TypeError('Language must be a string');
      }
      this._language = language;
    }
    get months() {
      return this._months;
    }
    set months(months) {
      if (months.length !== 12) {
        throw new RangeError(`There must be 12 months for ${this.language} language`);
      }
      this._months = months;
    }
    get monthsAbbr() {
      return this._monthsAbbr;
    }
    set monthsAbbr(monthsAbbr) {
      if (monthsAbbr.length !== 12) {
        throw new RangeError(`There must be 12 abbreviated months for ${this.language} language`);
      }
      this._monthsAbbr = monthsAbbr;
    }
    get days() {
      return this._days;
    }
    set days(days) {
      if (days.length !== 7) {
        throw new RangeError(`There must be 7 days for ${this.language} language`);
      }
      this._days = days;
    }
  }

  var en = new Language('English', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

  const utils = {
    /**
     * @type {Boolean}
     */
    useUtc: false,
    /**
     * Returns the full year, using UTC or not
     * @param {Date} date
     */
    getFullYear(date) {
      return this.useUtc ? date.getUTCFullYear() : date.getFullYear();
    },
    /**
     * Returns the month, using UTC or not
     * @param {Date} date
     */
    getMonth(date) {
      return this.useUtc ? date.getUTCMonth() : date.getMonth();
    },
    /**
     * Returns the date, using UTC or not
     * @param {Date} date
     */
    getDate(date) {
      return this.useUtc ? date.getUTCDate() : date.getDate();
    },
    /**
     * Returns the day, using UTC or not
     * @param {Date} date
     */
    getDay(date) {
      return this.useUtc ? date.getUTCDay() : date.getDay();
    },
    /**
     * Returns the hours, using UTC or not
     * @param {Date} date
     */
    getHours(date) {
      return this.useUtc ? date.getUTCHours() : date.getHours();
    },
    /**
     * Returns the minutes, using UTC or not
     * @param {Date} date
     */
    getMinutes(date) {
      return this.useUtc ? date.getUTCMinutes() : date.getMinutes();
    },
    /**
     * Sets the full year, using UTC or not
     * @param {Date} date
     */
    setFullYear(date, value, useUtc) {
      return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
    },
    /**
     * Sets the month, using UTC or not
     * @param {Date} date
     */
    setMonth(date, value, useUtc) {
      return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value);
    },
    /**
     * Sets the date, using UTC or not
     * @param {Date} date
     * @param {Number} value
     */
    setDate(date, value, useUtc) {
      return this.useUtc ? date.setUTCDate(value) : date.setDate(value);
    },
    /**
     * Check if date1 is equivalent to date2, without comparing the time
     * @see https://stackoverflow.com/a/6202196/4455925
     * @param {Date} date1
     * @param {Date} date2
     */
    compareDates(date1, date2) {
      const d1 = new Date(date1.getTime());
      const d2 = new Date(date2.getTime());
      if (this.useUtc) {
        d1.setUTCHours(0, 0, 0, 0);
        d2.setUTCHours(0, 0, 0, 0);
      } else {
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
      }
      return d1.getTime() === d2.getTime();
    },
    /**
     * Validates a date object
     * @param {Date} date - an object instantiated with the new Date constructor
     * @return {Boolean}
     */
    isValidDate(date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return false;
      }
      return !isNaN(date.getTime());
    },
    /**
     * Return abbreviated week day name
     * @param {Date}
     * @param {Array}
     * @return {String}
     */
    getDayNameAbbr(date, days) {
      if (typeof date !== 'object') {
        throw TypeError('Invalid Type');
      }
      return days[this.getDay(date)];
    },
    /**
     * Return name of the month
     * @param {Number|Date}
     * @param {Array}
     * @return {String}
     */
    getMonthName(month, months) {
      if (!months) {
        throw Error('missing 2nd parameter Months array');
      }
      if (typeof month === 'object') {
        return months[this.getMonth(month)];
      }
      if (typeof month === 'number') {
        return months[month];
      }
      throw TypeError('Invalid type');
    },
    /**
     * Return an abbreviated version of the month
     * @param {Number|Date}
     * @return {String}
     */
    getMonthNameAbbr(month, monthsAbbr) {
      if (!monthsAbbr) {
        throw Error('missing 2nd paramter Months array');
      }
      if (typeof month === 'object') {
        return monthsAbbr[this.getMonth(month)];
      }
      if (typeof month === 'number') {
        return monthsAbbr[month];
      }
      throw TypeError('Invalid type');
    },
    /**
     * Alternative get total number of days in month
     * @param {Number} year
     * @param {Number} m
     * @return {Number}
     */
    daysInMonth(year, month) {
      return /8|3|5|10/.test(month) ? 30 : month === 1 ? !(year % 4) && year % 100 || !(year % 400) ? 29 : 28 : 31;
    },
    /**
     * Get nth suffix for date
     * @param {Number} day
     * @return {String}
     */
    getNthSuffix(day) {
      switch (day) {
        case 1:
        case 21:
        case 31:
          return 'st';
        case 2:
        case 22:
          return 'nd';
        case 3:
        case 23:
          return 'rd';
        default:
          return 'th';
      }
    },
    /**
     * Formats date object
     * @param {Date}
     * @param {String}
     * @param {Object}
     * @return {String}
     */
    formatDate(date, format, translation) {
      translation = !translation ? en : translation;
      let year = this.getFullYear(date);
      let month = this.getMonth(date) + 1;
      let day = this.getDate(date);
      let str = format.replace(/dd/, ('0' + day).slice(-2)).replace(/d/, day).replace(/yyyy/, year).replace(/yy/, String(year).slice(2)).replace(/MMMM/, this.getMonthName(this.getMonth(date), translation.months)).replace(/MMM/, this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr)).replace(/MM/, ('0' + month).slice(-2)).replace(/M(?!a|ä|e)/, month).replace(/su/, this.getNthSuffix(this.getDate(date))).replace(/D(?!e|é|i)/, this.getDayNameAbbr(date, translation.days));
      return str;
    },
    /**
     * Creates an array of dates for each day in between two dates.
     * @param {Date} start
     * @param {Date} end
     * @return {Array}
     */
    createDateArray(start, end) {
      let dates = [];
      while (start <= end) {
        dates.push(new Date(start));
        start = this.setDate(new Date(start), this.getDate(new Date(start)) + 1);
      }
      return dates;
    },
    /**
     * method used as a prop validator for input values
     * @param {*} val
     * @return {Boolean}
     */
    validateDateInput(val) {
      return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number';
    }
  };
  const makeDateUtils = useUtc => ({
    ...utils,
    useUtc
  });
  var utils$1 = {
    ...utils
  };

  var script$4 = {
    props: {
      selectedDate: Date,
      resetTypedDate: [Date],
      format: [String, Function],
      translation: Object,
      inline: Boolean,
      id: String,
      name: String,
      refName: String,
      openDate: Date,
      placeholder: String,
      inputClass: [String, Object, Array],
      clearButton: Boolean,
      clearButtonIcon: String,
      calendarButton: Boolean,
      calendarButtonIcon: String,
      calendarButtonIconContent: String,
      disabled: Boolean,
      required: Boolean,
      typeable: Boolean,
      bootstrapStyling: Boolean,
      useUtc: Boolean
    },
    data () {
      const constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        input: null,
        typedDate: false,
        utils: constructedDateUtils
      }
    },
    computed: {
      formattedValue () {
        if (!this.selectedDate) {
          return null
        }
        if (this.typedDate) {
          return this.typedDate
        }
        return typeof this.format === 'function'
          ? this.format(this.selectedDate)
          : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation)
      },

      computedInputClass () {
        if (this.bootstrapStyling) {
          if (typeof this.inputClass === 'string') {
            return [this.inputClass, 'form-control'].join(' ')
          }
          return {'form-control': true, ...this.inputClass}
        }
        return this.inputClass
      }
    },
    watch: {
      resetTypedDate () {
        this.typedDate = false;
      }
    },
    methods: {
      showCalendar () {
        this.$emit('showCalendar');
      },
      /**
       * Attempt to parse a typed date
       * @param {Event} event
       */
      parseTypedDate (event) {
        // close calendar if escape or enter are pressed
        if ([
          27, // escape
          13 // enter
        ].includes(event.keyCode)) {
          this.input.blur();
        }

        if (this.typeable) {
          const typedDate = Date.parse(this.input.value);
          if (!isNaN(typedDate)) {
            this.typedDate = this.input.value;
            this.$emit('typedDate', new Date(this.typedDate));
          }
        }
      },
      /**
       * nullify the typed date to defer to regular formatting
       * called once the input is blurred
       */
      inputBlurred () {
        if (this.typeable && isNaN(Date.parse(this.input.value))) {
          this.clearDate();
          this.input.value = null;
          this.typedDate = null;
        }

        this.$emit('closeCalendar');
      },
      /**
       * emit a clearDate event
       */
      clearDate () {
        this.$emit('clearDate');
      }
    },
    mounted () {
      this.input = this.$el.querySelector('input');
    }
  }

  ;

  const _hoisted_1$3 = { key: 0 };
  const _hoisted_2 = ["type", "name", "id", "value", "open-date", "placeholder", "clear-button", "disabled", "required", "readonly"];
  const _hoisted_3 = { key: 0 };

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass({'input-group' : $props.bootstrapStyling})
    }, [
      vue.createCommentVNode(" Calendar Button "),
      ($props.calendarButton)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(["vdp-datepicker__calendar-button", {'input-group-prepend' : $props.bootstrapStyling}]),
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.showCalendar && $options.showCalendar(...args))),
            style: vue.normalizeStyle({'cursor:not-allowed;' : $props.disabled})
          }, [
            vue.createElementVNode("span", {
              class: vue.normalizeClass({'input-group-text' : $props.bootstrapStyling})
            }, [
              vue.createElementVNode("i", {
                class: vue.normalizeClass($props.calendarButtonIcon)
              }, [
                vue.createTextVNode(vue.toDisplayString($props.calendarButtonIconContent) + " ", 1 /* TEXT */),
                (!$props.calendarButtonIcon)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$3, "…"))
                  : vue.createCommentVNode("v-if", true)
              ], 2 /* CLASS */)
            ], 2 /* CLASS */)
          ], 6 /* CLASS, STYLE */))
        : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" Input "),
      vue.createElementVNode("input", {
        type: $props.inline ? 'hidden' : 'text',
        class: vue.normalizeClass($options.computedInputClass),
        name: $props.name,
        ref: $props.refName,
        id: $props.id,
        value: $options.formattedValue,
        "open-date": $props.openDate,
        placeholder: $props.placeholder,
        "clear-button": $props.clearButton,
        disabled: $props.disabled,
        required: $props.required,
        readonly: !$props.typeable,
        onClick: _cache[1] || (_cache[1] = (...args) => ($options.showCalendar && $options.showCalendar(...args))),
        onKeyup: _cache[2] || (_cache[2] = (...args) => ($options.parseTypedDate && $options.parseTypedDate(...args))),
        onBlur: _cache[3] || (_cache[3] = (...args) => ($options.inputBlurred && $options.inputBlurred(...args))),
        autocomplete: "off"
      }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2),
      vue.createCommentVNode(" Clear Button "),
      ($props.clearButton && $props.selectedDate)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: vue.normalizeClass(["vdp-datepicker__clear-button", {'input-group-append' : $props.bootstrapStyling}]),
            onClick: _cache[4] || (_cache[4] = $event => ($options.clearDate()))
          }, [
            vue.createElementVNode("span", {
              class: vue.normalizeClass({'input-group-text' : $props.bootstrapStyling})
            }, [
              vue.createElementVNode("i", {
                class: vue.normalizeClass($props.clearButtonIcon)
              }, [
                (!$props.clearButtonIcon)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, "×"))
                  : vue.createCommentVNode("v-if", true)
              ], 2 /* CLASS */)
            ], 2 /* CLASS */)
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "afterDateInput")
    ], 2 /* CLASS */))
  }

  script$4.render = render$4;
  script$4.__file = "src/components/DateInput.vue";

  var script$3 = {
    props: {
      showDayView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      fullMonthName: Boolean,
      allowedToShowView: Function,
      dayCellContent: {
        type: Function,
        default: day => day.date
      },
      disabledDates: Object,
      highlighted: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      mondayFirst: Boolean,
      useUtc: Boolean
    },
    data () {
      const constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    computed: {
      /**
       * Returns an array of day names
       * @return {String[]}
       */
      daysOfWeek () {
        if (this.mondayFirst) {
          const tempDays = this.translation.days.slice();
          tempDays.push(tempDays.shift());
          return tempDays
        }
        return this.translation.days
      },
      /**
       * Returns the day number of the week less one for the first of the current month
       * Used to show amount of empty cells before the first in the day calendar layout
       * @return {Number}
       */
      blankDays () {
        const d = this.pageDate;
        let dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
          : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
        if (this.mondayFirst) {
          return this.utils.getDay(dObj) > 0 ? this.utils.getDay(dObj) - 1 : 6
        }
        return this.utils.getDay(dObj)
      },
      /**
       * @return {Object[]}
       */
      days () {
        const d = this.pageDate;
        let days = [];
        // set up a new date object to the beginning of the current 'page'
        let dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1))
          : new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes());
        let daysInMonth = this.utils.daysInMonth(this.utils.getFullYear(dObj), this.utils.getMonth(dObj));
        for (let i = 0; i < daysInMonth; i++) {
          days.push({
            date: this.utils.getDate(dObj),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedDate(dObj),
            isDisabled: this.isDisabledDate(dObj),
            isHighlighted: this.isHighlightedDate(dObj),
            isHighlightStart: this.isHighlightStart(dObj),
            isHighlightEnd: this.isHighlightEnd(dObj),
            isToday: this.utils.compareDates(dObj, new Date()),
            isWeekend: this.utils.getDay(dObj) === 0 || this.utils.getDay(dObj) === 6,
            isSaturday: this.utils.getDay(dObj) === 6,
            isSunday: this.utils.getDay(dObj) === 0
          });
          this.utils.setDate(dObj, this.utils.getDate(dObj) + 1);
        }
        return days
      },
      /**
       * Gets the name of the month the current page is on
       * @return {String}
       */
      currMonthName () {
        const monthName = this.fullMonthName ? this.translation.months : this.translation.monthsAbbr;
        return this.utils.getMonthNameAbbr(this.utils.getMonth(this.pageDate), monthName)
      },
      /**
       * Gets the name of the year that current page is on
       * @return {Number}
       */
      currYearName () {
        const yearSuffix = this.translation.yearSuffix;
        return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`
      },
      /**
       * Is this translation using year/month/day format?
       * @return {Boolean}
       */
      isYmd () {
        return this.translation.ymd && this.translation.ymd === true
      },
      /**
       * Is the left hand navigation button disabled?
       * @return {Boolean}
       */
      isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextMonthDisabled(this.pageTimestamp)
          : this.isPreviousMonthDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation button disabled?
       * @return {Boolean}
       */
      isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousMonthDisabled(this.pageTimestamp)
          : this.isNextMonthDisabled(this.pageTimestamp)
      }
    },
    methods: {
      selectDate (date) {
        if (date.isDisabled) {
          this.$emit('selectedDisabled', date);
          return false
        }
        this.$emit('selectDate', date);
      },
      /**
       * @return {Number}
       */
      getPageMonth () {
        return this.utils.getMonth(this.pageDate)
      },
      /**
       * Emit an event to show the month picker
       */
      showMonthCalendar () {
        this.$emit('showMonthCalendar');
      },
      /**
       * Change the page month
       * @param {Number} incrementBy
       */
      changeMonth (incrementBy) {
        let date = this.pageDate;
        this.utils.setMonth(date, this.utils.getMonth(date) + incrementBy);
        this.$emit('changedMonth', date);
      },
      /**
       * Decrement the page month
       */
      previousMonth () {
        if (!this.isPreviousMonthDisabled()) {
          this.changeMonth(-1);
        }
      },
      /**
       * Is the previous month disabled?
       * @return {Boolean}
       */
      isPreviousMonthDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        let d = this.pageDate;
        return this.utils.getMonth(this.disabledDates.to) >= this.utils.getMonth(d) &&
          this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(d)
      },
      /**
       * Increment the current page month
       */
      nextMonth () {
        if (!this.isNextMonthDisabled()) {
          this.changeMonth(+1);
        }
      },
      /**
       * Is the next month disabled?
       * @return {Boolean}
       */
      isNextMonthDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        let d = this.pageDate;
        return this.utils.getMonth(this.disabledDates.from) <= this.utils.getMonth(d) &&
          this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(d)
      },
      /**
       * Whether a day is selected
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedDate (dObj) {
        return this.selectedDate && this.utils.compareDates(this.selectedDate, dObj)
      },
      /**
       * Whether a day is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledDate (date) {
        let disabledDates = false;

        if (typeof this.disabledDates === 'undefined') {
          return false
        }

        if (typeof this.disabledDates.dates !== 'undefined') {
          this.disabledDates.dates.forEach((d) => {
            if (this.utils.compareDates(date, d)) {
              disabledDates = true;
              return true
            }
          });
        }
        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to && date < this.disabledDates.to) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from && date > this.disabledDates.from) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.ranges !== 'undefined') {
          this.disabledDates.ranges.forEach((range) => {
            if (typeof range.from !== 'undefined' && range.from && typeof range.to !== 'undefined' && range.to) {
              if (date < range.to && date > range.from) {
                disabledDates = true;
                return true
              }
            }
          });
        }
        if (typeof this.disabledDates.days !== 'undefined' && this.disabledDates.days.indexOf(this.utils.getDay(date)) !== -1) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.daysOfMonth !== 'undefined' && this.disabledDates.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
          disabledDates = true;
        }
        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }
        return disabledDates
      },
      /**
       * Whether a day is highlighted (only if it is not disabled already except when highlighted.includeDisabled is true)
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightedDate (date) {
        if (!(this.highlighted && this.highlighted.includeDisabled) && this.isDisabledDate(date)) {
          return false
        }

        let highlighted = false;

        if (typeof this.highlighted === 'undefined') {
          return false
        }

        if (typeof this.highlighted.dates !== 'undefined') {
          this.highlighted.dates.forEach((d) => {
            if (this.utils.compareDates(date, d)) {
              highlighted = true;
              return true
            }
          });
        }

        if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
          highlighted = date >= this.highlighted.from && date <= this.highlighted.to;
        }

        if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(this.utils.getDay(date)) !== -1) {
          highlighted = true;
        }

        if (typeof this.highlighted.daysOfMonth !== 'undefined' && this.highlighted.daysOfMonth.indexOf(this.utils.getDate(date)) !== -1) {
          highlighted = true;
        }

        if (typeof this.highlighted.customPredictor === 'function' && this.highlighted.customPredictor(date)) {
          highlighted = true;
        }

        return highlighted
      },
      dayClasses (day) {
        return {
          'selected': day.isSelected,
          'disabled': day.isDisabled,
          'highlighted': day.isHighlighted,
          'today': day.isToday,
          'weekend': day.isWeekend,
          'sat': day.isSaturday,
          'sun': day.isSunday,
          'highlight-start': day.isHighlightStart,
          'highlight-end': day.isHighlightEnd
        }
      },
      /**
       * Whether a day is highlighted and it is the first date
       * in the highlighted range of dates
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightStart (date) {
        return this.isHighlightedDate(date) &&
          (this.highlighted.from instanceof Date) &&
          (this.utils.getFullYear(this.highlighted.from) === this.utils.getFullYear(date)) &&
          (this.utils.getMonth(this.highlighted.from) === this.utils.getMonth(date)) &&
          (this.utils.getDate(this.highlighted.from) === this.utils.getDate(date))
      },
      /**
       * Whether a day is highlighted and it is the first date
       * in the highlighted range of dates
       * @param {Date}
       * @return {Boolean}
       */
      isHighlightEnd (date) {
        return this.isHighlightedDate(date) &&
          (this.highlighted.to instanceof Date) &&
          (this.utils.getFullYear(this.highlighted.to) === this.utils.getFullYear(date)) &&
          (this.utils.getMonth(this.highlighted.to) === this.utils.getMonth(date)) &&
          (this.utils.getDate(this.highlighted.to) === this.utils.getDate(date))
      },
      /**
       * Helper
       * @param  {mixed}  prop
       * @return {Boolean}
       */
      isDefined (prop) {
        return typeof prop !== 'undefined' && prop
      }
    }
  }

  ;

  const _hoisted_1$2 = ["innerHTML", "onClick"];

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
      style: vue.normalizeStyle($props.calendarStyle),
      onMousedown: _cache[3] || (_cache[3] = vue.withModifiers(() => {}, ["prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "beforeCalendarHeader"),
      vue.createElementVNode("header", null, [
        vue.createElementVNode("span", {
          onClick: _cache[0] || (_cache[0] = $event => ($props.isRtl ? $options.nextMonth() : $options.previousMonth())),
          class: vue.normalizeClass(["prev", {'disabled': $options.isLeftNavDisabled}])
        }, "<", 2 /* CLASS */),
        vue.createElementVNode("span", {
          class: vue.normalizeClass(["day__month_btn", $props.allowedToShowView('month') ? 'up' : '']),
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.showMonthCalendar && $options.showMonthCalendar(...args)))
        }, vue.toDisplayString($options.isYmd ? $options.currYearName : $options.currMonthName) + " " + vue.toDisplayString($options.isYmd ? $options.currMonthName : $options.currYearName), 3 /* TEXT, CLASS */),
        vue.createElementVNode("span", {
          onClick: _cache[2] || (_cache[2] = $event => ($props.isRtl ? $options.previousMonth() : $options.nextMonth())),
          class: vue.normalizeClass(["next", {'disabled': $options.isRightNavDisabled}])
        }, ">", 2 /* CLASS */)
      ]),
      vue.createElementVNode("div", {
        class: vue.normalizeClass($props.isRtl ? 'flex-rtl' : '')
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.daysOfWeek, (d) => {
          return (vue.openBlock(), vue.createElementBlock("span", {
            class: "cell day-header",
            key: d.timestamp
          }, vue.toDisplayString(d), 1 /* TEXT */))
        }), 128 /* KEYED_FRAGMENT */)),
        ($options.blankDays > 0)
          ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($options.blankDays, (d) => {
              return (vue.openBlock(), vue.createElementBlock("span", {
                class: "cell day blank",
                key: d.timestamp
              }))
            }), 128 /* KEYED_FRAGMENT */))
          : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode("\n      "),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.days, (day) => {
          return (vue.openBlock(), vue.createElementBlock("span", {
            class: vue.normalizeClass(["cell day", $options.dayClasses(day)]),
            key: day.timestamp,
            innerHTML: $props.dayCellContent(day),
            onClick: $event => ($options.selectDate(day))
          }, null, 10 /* CLASS, PROPS */, _hoisted_1$2))
        }), 128 /* KEYED_FRAGMENT */))
      ], 2 /* CLASS */)
    ], 38 /* CLASS, STYLE, NEED_HYDRATION */)), [
      [vue.vShow, $props.showDayView]
    ])
  }

  script$3.render = render$3;
  script$3.__file = "src/components/PickerDay.vue";

  var script$2 = {
    props: {
      showMonthView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      disabledDates: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      allowedToShowView: Function,
      useUtc: Boolean
    },
    data () {
      const constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    computed: {
      months () {
        const d = this.pageDate;
        let months = [];
        // set up a new date object to the beginning of the current 'page'
        let dObj = this.useUtc
          ? new Date(Date.UTC(d.getUTCFullYear(), 0, d.getUTCDate()))
          : new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes());
        for (let i = 0; i < 12; i++) {
          months.push({
            month: this.utils.getMonthName(i, this.translation.months),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedMonth(dObj),
            isDisabled: this.isDisabledMonth(dObj)
          });
          this.utils.setMonth(dObj, this.utils.getMonth(dObj) + 1);
        }
        return months
      },
      /**
       * Get year name on current page.
       * @return {String}
       */
      pageYearName () {
        const yearSuffix = this.translation.yearSuffix;
        return `${this.utils.getFullYear(this.pageDate)}${yearSuffix}`
      },
      /**
       * Is the left hand navigation disabled
       * @return {Boolean}
       */
      isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextYearDisabled(this.pageTimestamp)
          : this.isPreviousYearDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation disabled
       * @return {Boolean}
       */
      isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousYearDisabled(this.pageTimestamp)
          : this.isNextYearDisabled(this.pageTimestamp)
      }
    },
    methods: {
      /**
       * Emits a selectMonth event
       * @param {Object} month
       */
      selectMonth (month) {
        if (month.isDisabled) {
          return false
        }
        this.$emit('selectMonth', month);
      },
      /**
       * Changes the year up or down
       * @param {Number} incrementBy
       */
      changeYear (incrementBy) {
        let date = this.pageDate;
        this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
        this.$emit('changedYear', date);
      },
      /**
       * Decrements the year
       */
      previousYear () {
        if (!this.isPreviousYearDisabled()) {
          this.changeYear(-1);
        }
      },
      /**
       * Checks if the previous year is disabled or not
       * @return {Boolean}
       */
      isPreviousYearDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        return this.utils.getFullYear(this.disabledDates.to) >= this.utils.getFullYear(this.pageDate)
      },
      /**
       * Increments the year
       */
      nextYear () {
        if (!this.isNextYearDisabled()) {
          this.changeYear(1);
        }
      },
      /**
       * Checks if the next year is disabled or not
       * @return {Boolean}
       */
      isNextYearDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        return this.utils.getFullYear(this.disabledDates.from) <= this.utils.getFullYear(this.pageDate)
      },
      /**
       * Emits an event that shows the year calendar
       */
      showYearCalendar () {
        this.$emit('showYearCalendar');
      },
      /**
       * Whether the selected date is in this month
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedMonth (date) {
        return (this.selectedDate &&
          this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date) &&
          this.utils.getMonth(this.selectedDate) === this.utils.getMonth(date))
      },
      /**
       * Whether a month is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledMonth (date) {
        let disabledDates = false;

        if (typeof this.disabledDates === 'undefined') {
          return false
        }

        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
          if (
            (this.utils.getMonth(date) < this.utils.getMonth(this.disabledDates.to) && this.utils.getFullYear(date) <= this.utils.getFullYear(this.disabledDates.to)) ||
            this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)
          ) {
            disabledDates = true;
          }
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
          if (
            (this.utils.getMonth(date) > this.utils.getMonth(this.disabledDates.from) && this.utils.getFullYear(date) >= this.utils.getFullYear(this.disabledDates.from)) ||
            this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)
          ) {
            disabledDates = true;
          }
        }

        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }
        return disabledDates
      }
    }
  }

  ;

  const _hoisted_1$1 = ["onClick"];

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
      style: vue.normalizeStyle($props.calendarStyle),
      onMousedown: _cache[3] || (_cache[3] = vue.withModifiers(() => {}, ["prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "beforeCalendarHeader"),
      vue.createElementVNode("header", null, [
        vue.createElementVNode("span", {
          onClick: _cache[0] || (_cache[0] = $event => ($props.isRtl ? $options.nextYear() : $options.previousYear())),
          class: vue.normalizeClass(["prev", {'disabled': $options.isLeftNavDisabled}])
        }, "<", 2 /* CLASS */),
        vue.createElementVNode("span", {
          class: vue.normalizeClass(["month__year_btn", $props.allowedToShowView('year') ? 'up' : '']),
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.showYearCalendar && $options.showYearCalendar(...args)))
        }, vue.toDisplayString($options.pageYearName), 3 /* TEXT, CLASS */),
        vue.createElementVNode("span", {
          onClick: _cache[2] || (_cache[2] = $event => ($props.isRtl ? $options.previousYear() : $options.nextYear())),
          class: vue.normalizeClass(["next", {'disabled': $options.isRightNavDisabled}])
        }, ">", 2 /* CLASS */)
      ]),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.months, (month) => {
        return (vue.openBlock(), vue.createElementBlock("span", {
          class: vue.normalizeClass(["cell month", {'selected': month.isSelected, 'disabled': month.isDisabled}]),
          key: month.timestamp,
          onClick: vue.withModifiers($event => ($options.selectMonth(month)), ["stop"])
        }, vue.toDisplayString(month.month), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$1))
      }), 128 /* KEYED_FRAGMENT */))
    ], 38 /* CLASS, STYLE, NEED_HYDRATION */)), [
      [vue.vShow, $props.showMonthView]
    ])
  }

  script$2.render = render$2;
  script$2.__file = "src/components/PickerMonth.vue";

  var script$1 = {
    props: {
      showYearView: Boolean,
      selectedDate: Date,
      pageDate: Date,
      pageTimestamp: Number,
      disabledDates: Object,
      highlighted: Object,
      calendarClass: [String, Object, Array],
      calendarStyle: Object,
      translation: Object,
      isRtl: Boolean,
      allowedToShowView: Function,
      useUtc: Boolean
    },
    computed: {
      years () {
        const d = this.pageDate;
        let years = [];
        // set up a new date object to the beginning of the current 'page'7
        let dObj = this.useUtc
          ? new Date(Date.UTC(Math.floor(d.getUTCFullYear() / 10) * 10, d.getUTCMonth(), d.getUTCDate()))
          : new Date(Math.floor(d.getFullYear() / 10) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
        for (let i = 0; i < 10; i++) {
          years.push({
            year: this.utils.getFullYear(dObj),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedYear(dObj),
            isDisabled: this.isDisabledYear(dObj)
          });
          this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1);
        }
        return years
      },
      /**
       * @return {String}
       */
      getPageDecade () {
        const decadeStart = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10;
        const decadeEnd = decadeStart + 9;
        const yearSuffix = this.translation.yearSuffix;
        return `${decadeStart} - ${decadeEnd}${yearSuffix}`
      },
      /**
       * Is the left hand navigation button disabled?
       * @return {Boolean}
       */
      isLeftNavDisabled () {
        return this.isRtl
          ? this.isNextDecadeDisabled(this.pageTimestamp)
          : this.isPreviousDecadeDisabled(this.pageTimestamp)
      },
      /**
       * Is the right hand navigation button disabled?
       * @return {Boolean}
       */
      isRightNavDisabled () {
        return this.isRtl
          ? this.isPreviousDecadeDisabled(this.pageTimestamp)
          : this.isNextDecadeDisabled(this.pageTimestamp)
      }
    },
    data () {
      const constructedDateUtils = makeDateUtils(this.useUtc);
      return {
        utils: constructedDateUtils
      }
    },
    methods: {
      selectYear (year) {
        if (year.isDisabled) {
          return false
        }
        this.$emit('selectYear', year);
      },
      changeYear (incrementBy) {
        let date = this.pageDate;
        this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy);
        this.$emit('changedDecade', date);
      },
      previousDecade () {
        if (this.isPreviousDecadeDisabled()) {
          return false
        }
        this.changeYear(-10);
      },
      isPreviousDecadeDisabled () {
        if (!this.disabledDates || !this.disabledDates.to) {
          return false
        }
        const disabledYear = this.utils.getFullYear(this.disabledDates.to);
        const lastYearInPreviousPage = Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10 - 1;
        return disabledYear > lastYearInPreviousPage
      },
      nextDecade () {
        if (this.isNextDecadeDisabled()) {
          return false
        }
        this.changeYear(10);
      },
      isNextDecadeDisabled () {
        if (!this.disabledDates || !this.disabledDates.from) {
          return false
        }
        const disabledYear = this.utils.getFullYear(this.disabledDates.from);
        const firstYearInNextPage = Math.ceil(this.utils.getFullYear(this.pageDate) / 10) * 10;
        return disabledYear < firstYearInNextPage
      },

      /**
       * Whether the selected date is in this year
       * @param {Date}
       * @return {Boolean}
       */
      isSelectedYear (date) {
        return this.selectedDate && this.utils.getFullYear(this.selectedDate) === this.utils.getFullYear(date)
      },
      /**
       * Whether a year is disabled
       * @param {Date}
       * @return {Boolean}
       */
      isDisabledYear (date) {
        let disabledDates = false;
        if (typeof this.disabledDates === 'undefined' || !this.disabledDates) {
          return false
        }

        if (typeof this.disabledDates.to !== 'undefined' && this.disabledDates.to) {
          if (this.utils.getFullYear(date) < this.utils.getFullYear(this.disabledDates.to)) {
            disabledDates = true;
          }
        }
        if (typeof this.disabledDates.from !== 'undefined' && this.disabledDates.from) {
          if (this.utils.getFullYear(date) > this.utils.getFullYear(this.disabledDates.from)) {
            disabledDates = true;
          }
        }

        if (typeof this.disabledDates.customPredictor === 'function' && this.disabledDates.customPredictor(date)) {
          disabledDates = true;
        }

        return disabledDates
      }
    }
  }

  ;

  const _hoisted_1 = ["onClick"];

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass([$props.calendarClass, 'vdp-datepicker__calendar']),
      style: vue.normalizeStyle($props.calendarStyle),
      onMousedown: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "beforeCalendarHeader"),
      vue.createElementVNode("header", null, [
        vue.createElementVNode("span", {
          onClick: _cache[0] || (_cache[0] = $event => ($props.isRtl ? $options.nextDecade() : $options.previousDecade())),
          class: vue.normalizeClass(["prev", {'disabled': $options.isLeftNavDisabled}])
        }, "<", 2 /* CLASS */),
        vue.createElementVNode("span", null, vue.toDisplayString($options.getPageDecade), 1 /* TEXT */),
        vue.createElementVNode("span", {
          onClick: _cache[1] || (_cache[1] = $event => ($props.isRtl ? $options.previousDecade() : $options.nextDecade())),
          class: vue.normalizeClass(["next", {'disabled': $options.isRightNavDisabled}])
        }, ">", 2 /* CLASS */)
      ]),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.years, (year) => {
        return (vue.openBlock(), vue.createElementBlock("span", {
          class: vue.normalizeClass(["cell year", { 'selected': year.isSelected, 'disabled': year.isDisabled }]),
          key: year.timestamp,
          onClick: vue.withModifiers($event => ($options.selectYear(year)), ["stop"])
        }, vue.toDisplayString(year.year), 11 /* TEXT, CLASS, PROPS */, _hoisted_1))
      }), 128 /* KEYED_FRAGMENT */))
    ], 38 /* CLASS, STYLE, NEED_HYDRATION */)), [
      [vue.vShow, $props.showYearView]
    ])
  }

  script$1.render = render$1;
  script$1.__file = "src/components/PickerYear.vue";

  var script = {
    components: {
      DateInput: script$4,
      PickerDay: script$3,
      PickerMonth: script$2,
      PickerYear: script$1
    },
    props: {
      modelValue: {
        validator: val => utils$1.validateDateInput(val)
      },
      name: String,
      refName: String,
      id: String,
      format: {
        type: [String, Function],
        default: 'dd MMM yyyy'
      },
      language: {
        type: Object,
        default: () => en
      },
      openDate: {
        validator: val => utils$1.validateDateInput(val)
      },
      dayCellContent: Function,
      fullMonthName: Boolean,
      disabledDates: Object,
      highlighted: Object,
      placeholder: String,
      inline: Boolean,
      calendarClass: [String, Object, Array],
      inputClass: [String, Object, Array],
      wrapperClass: [String, Object, Array],
      mondayFirst: Boolean,
      clearButton: Boolean,
      clearButtonIcon: String,
      calendarButton: Boolean,
      calendarButtonIcon: String,
      calendarButtonIconContent: String,
      bootstrapStyling: Boolean,
      initialView: String,
      disabled: Boolean,
      required: Boolean,
      typeable: Boolean,
      useUtc: Boolean,
      minimumView: {
        type: String,
        default: 'day'
      },
      maximumView: {
        type: String,
        default: 'year'
      }
    },
    data () {
      const startDate = this.openDate ? new Date(this.openDate) : new Date();
      const constructedDateUtils = makeDateUtils(this.useUtc);
      const pageTimestamp = constructedDateUtils.setDate(startDate, 1);
      return {
        /*
         * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
         * This represents the first day of the current viewing month
         * {Number}
         */
        pageTimestamp,
        /*
         * Selected Date
         * {Date}
         */
        selectedDate: null,
        /*
         * Flags to show calendar views
         * {Boolean}
         */
        showDayView: false,
        showMonthView: false,
        showYearView: false,
        /*
         * Positioning
         */
        calendarHeight: 0,
        resetTypedDate: new Date(),
        utils: constructedDateUtils
      }
    },
    watch: {
      modelValue (value) {
        this.setValue(value);
      },
      openDate () {
        this.setPageDate();
      },
      initialView () {
        this.setInitialView();
      }
    },
    computed: {
      computedInitialView () {
        if (!this.initialView) {
          return this.minimumView
        }

        return this.initialView
      },
      pageDate () {
        return new Date(this.pageTimestamp)
      },

      translation () {
        return this.language
      },

      calendarStyle () {
        return {
          position: this.isInline ? 'static' : undefined
        }
      },
      isOpen () {
        return this.showDayView || this.showMonthView || this.showYearView
      },
      isInline () {
        return !!this.inline
      },
      isRtl () {
        return this.translation.rtl === true
      }
    },
    methods: {
      /**
       * Called in the event that the user navigates to date pages and
       * closes the picker without selecting a date.
       */
      resetDefaultPageDate () {
        if (this.selectedDate === null) {
          this.setPageDate();
          return
        }
        this.setPageDate(this.selectedDate);
      },
      /**
       * Effectively a toggle to show/hide the calendar
       * @return {mixed}
       */
      showCalendar () {
        if (this.disabled || this.isInline) {
          return false
        }
        if (this.isOpen) {
          return this.close(true)
        }
        this.setInitialView();
      },
      /**
       * Sets the initial picker page view: day, month or year
       */
      setInitialView () {
        const initialView = this.computedInitialView;
        if (!this.allowedToShowView(initialView)) {
          throw new Error(`initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`)
        }
        switch (initialView) {
          case 'year':
            this.showYearCalendar();
            break
          case 'month':
            this.showMonthCalendar();
            break
          default:
            this.showDayCalendar();
            break
        }
      },
      /**
       * Are we allowed to show a specific picker view?
       * @param {String} view
       * @return {Boolean}
       */
      allowedToShowView (view) {
        const views = ['day', 'month', 'year'];
        const minimumViewIndex = views.indexOf(this.minimumView);
        const maximumViewIndex = views.indexOf(this.maximumView);
        const viewIndex = views.indexOf(view);

        return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
      },
      /**
       * Show the day picker
       * @return {Boolean}
       */
      showDayCalendar () {
        if (!this.allowedToShowView('day')) {
          return false
        }
        this.close();
        this.showDayView = true;
        return true
      },
      /**
       * Show the month picker
       * @return {Boolean}
       */
      showMonthCalendar () {
        if (!this.allowedToShowView('month')) {
          return false
        }
        this.close();
        this.showMonthView = true;
        return true
      },
      /**
       * Show the year picker
       * @return {Boolean}
       */
      showYearCalendar () {
        if (!this.allowedToShowView('year')) {
          return false
        }
        this.close();
        this.showYearView = true;
        return true
      },
      /**
       * Set the selected date
       * @param {Number} timestamp
       */
      setDate (timestamp) {
        const date = new Date(timestamp);
        this.selectedDate = date;
        this.setPageDate(date);
        this.$emit('selected', date);
        this.$emit('update:modelValue', date);
      },
      /**
       * Clear the selected date
       */
      clearDate () {
        this.selectedDate = null;
        this.setPageDate();
        this.$emit('selected', null);
        this.$emit('update:modelValue', null);
        this.$emit('cleared');
      },
      /**
       * @param {Object} date
       */
      selectDate (date) {
        this.setDate(date.timestamp);
        if (!this.isInline) {
          this.close(true);
        }
        this.resetTypedDate = new Date();
      },
      /**
       * @param {Object} date
       */
      selectDisabledDate (date) {
        this.$emit('selectedDisabled', date);
      },
      /**
       * @param {Object} month
       */
      selectMonth (month) {
        const date = new Date(month.timestamp);
        if (this.allowedToShowView('day')) {
          this.setPageDate(date);
          this.$emit('changedMonth', month);
          this.showDayCalendar();
        } else {
          this.selectDate(month);
        }
      },
      /**
       * @param {Object} year
       */
      selectYear (year) {
        const date = new Date(year.timestamp);
        if (this.allowedToShowView('month')) {
          this.setPageDate(date);
          this.$emit('changedYear', year);
          this.showMonthCalendar();
        } else {
          this.selectDate(year);
        }
      },
      /**
       * Set the datepicker value
       * @param {Date|String|Number|null} date
       */
      setValue (date) {
        if (typeof date === 'string' || typeof date === 'number') {
          let parsed = new Date(date);
          date = isNaN(parsed.valueOf()) ? null : parsed;
        }
        if (!date) {
          this.setPageDate();
          this.selectedDate = null;
          return
        }
        this.selectedDate = date;
        this.setPageDate(date);
      },
      /**
       * Sets the date that the calendar should open on
       */
      setPageDate (date) {
        if (!date) {
          if (this.openDate) {
            date = new Date(this.openDate);
          } else {
            date = new Date();
          }
        }
        this.pageTimestamp = this.utils.setDate(new Date(date), 1);
      },
      /**
       * Handles a month change from the day picker
       */
      handleChangedMonthFromDayPicker (date) {
        this.setPageDate(date);
        this.$emit('changedMonth', date);
      },
      /**
       * Set the date from a typedDate event
       */
      setTypedDate (date) {
        this.setDate(date.getTime());
      },
      /**
       * Close all calendar layers
       * @param {Boolean} emitEvent - emit close event
       */
      close (emitEvent) {
        this.showDayView = this.showMonthView = this.showYearView = false;
        if (!this.isInline) {
          if (emitEvent) {
            this.$emit('closed');
          }
          document.removeEventListener('click', this.clickOutside, false);
        }
      },
      /**
       * Initiate the component
       */
      init () {
        if (this.modelValue) {
          this.setValue(this.modelValue);
        }
        if (this.isInline) {
          this.setInitialView();
        }
      }
    },
    mounted () {
      this.init();
    }
  }

  ;

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_date_input = vue.resolveComponent("date-input");
    const _component_picker_day = vue.resolveComponent("picker-day");
    const _component_picker_month = vue.resolveComponent("picker-month");
    const _component_picker_year = vue.resolveComponent("picker-year");

    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["vdp-datepicker", [$props.wrapperClass, $options.isRtl ? 'rtl' : '']])
    }, [
      vue.createVNode(_component_date_input, {
        selectedDate: $data.selectedDate,
        resetTypedDate: $data.resetTypedDate,
        format: $props.format,
        translation: $options.translation,
        inline: $props.inline,
        id: $props.id,
        name: $props.name,
        refName: $props.refName,
        openDate: $props.openDate,
        placeholder: $props.placeholder,
        inputClass: $props.inputClass,
        typeable: $props.typeable,
        clearButton: $props.clearButton,
        clearButtonIcon: $props.clearButtonIcon,
        calendarButton: $props.calendarButton,
        calendarButtonIcon: $props.calendarButtonIcon,
        calendarButtonIconContent: $props.calendarButtonIconContent,
        disabled: $props.disabled,
        required: $props.required,
        bootstrapStyling: $props.bootstrapStyling,
        "use-utc": $props.useUtc,
        onShowCalendar: $options.showCalendar,
        onCloseCalendar: $options.close,
        onTypedDate: $options.setTypedDate,
        onClearDate: $options.clearDate
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "afterDateInput", { slot: "afterDateInput" })
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["selectedDate", "resetTypedDate", "format", "translation", "inline", "id", "name", "refName", "openDate", "placeholder", "inputClass", "typeable", "clearButton", "clearButtonIcon", "calendarButton", "calendarButtonIcon", "calendarButtonIconContent", "disabled", "required", "bootstrapStyling", "use-utc", "onShowCalendar", "onCloseCalendar", "onTypedDate", "onClearDate"]),
      vue.createCommentVNode(" Day View "),
      ($options.allowedToShowView('day'))
        ? (vue.openBlock(), vue.createBlock(_component_picker_day, {
            key: 0,
            pageDate: $options.pageDate,
            selectedDate: $data.selectedDate,
            showDayView: $data.showDayView,
            fullMonthName: $props.fullMonthName,
            allowedToShowView: $options.allowedToShowView,
            disabledDates: $props.disabledDates,
            highlighted: $props.highlighted,
            calendarClass: $props.calendarClass,
            calendarStyle: $options.calendarStyle,
            translation: $options.translation,
            pageTimestamp: $data.pageTimestamp,
            isRtl: $options.isRtl,
            mondayFirst: $props.mondayFirst,
            dayCellContent: $props.dayCellContent,
            "use-utc": $props.useUtc,
            onChangedMonth: $options.handleChangedMonthFromDayPicker,
            onSelectDate: $options.selectDate,
            onShowMonthCalendar: $options.showMonthCalendar,
            onSelectedDisabled: $options.selectDisabledDate
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "beforeCalendarHeader", { slot: "beforeCalendarHeader" })
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["pageDate", "selectedDate", "showDayView", "fullMonthName", "allowedToShowView", "disabledDates", "highlighted", "calendarClass", "calendarStyle", "translation", "pageTimestamp", "isRtl", "mondayFirst", "dayCellContent", "use-utc", "onChangedMonth", "onSelectDate", "onShowMonthCalendar", "onSelectedDisabled"]))
        : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" Month View "),
      ($options.allowedToShowView('month'))
        ? (vue.openBlock(), vue.createBlock(_component_picker_month, {
            key: 1,
            pageDate: $options.pageDate,
            selectedDate: $data.selectedDate,
            showMonthView: $data.showMonthView,
            allowedToShowView: $options.allowedToShowView,
            disabledDates: $props.disabledDates,
            calendarClass: $props.calendarClass,
            calendarStyle: $options.calendarStyle,
            translation: $options.translation,
            isRtl: $options.isRtl,
            "use-utc": $props.useUtc,
            onSelectMonth: $options.selectMonth,
            onShowYearCalendar: $options.showYearCalendar,
            onChangedYear: $options.setPageDate
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "beforeCalendarHeader", { slot: "beforeCalendarHeader" })
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["pageDate", "selectedDate", "showMonthView", "allowedToShowView", "disabledDates", "calendarClass", "calendarStyle", "translation", "isRtl", "use-utc", "onSelectMonth", "onShowYearCalendar", "onChangedYear"]))
        : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(" Year View "),
      ($options.allowedToShowView('year'))
        ? (vue.openBlock(), vue.createBlock(_component_picker_year, {
            key: 2,
            pageDate: $options.pageDate,
            selectedDate: $data.selectedDate,
            showYearView: $data.showYearView,
            allowedToShowView: $options.allowedToShowView,
            disabledDates: $props.disabledDates,
            calendarClass: $props.calendarClass,
            calendarStyle: $options.calendarStyle,
            translation: $options.translation,
            isRtl: $options.isRtl,
            "use-utc": $props.useUtc,
            onSelectYear: $options.selectYear,
            onChangedDecade: $options.setPageDate
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "beforeCalendarHeader", { slot: "beforeCalendarHeader" })
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["pageDate", "selectedDate", "showYearView", "allowedToShowView", "disabledDates", "calendarClass", "calendarStyle", "translation", "isRtl", "use-utc", "onSelectYear", "onChangedDecade"]))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */))
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".rtl {\n  direction: rtl;\n}\n.vdp-datepicker {\n  position: relative;\n  text-align: left;\n}\n.vdp-datepicker * {\n  box-sizing: border-box;\n}\n.vdp-datepicker__calendar {\n  position: absolute;\n  z-index: 100;\n  background: #fff;\n  width: 300px;\n  border: 1px solid #ccc;\n}\n.vdp-datepicker__calendar header {\n  display: block;\n  line-height: 40px;\n}\n.vdp-datepicker__calendar header span {\n  display: inline-block;\n  text-align: center;\n  width: 71.42857142857143%;\n  float: left;\n}\n.vdp-datepicker__calendar header .prev,\n.vdp-datepicker__calendar header .next {\n  width: 14.285714285714286%;\n  float: left;\n  text-indent: -10000px;\n  position: relative;\n}\n.vdp-datepicker__calendar header .prev:after,\n.vdp-datepicker__calendar header .next:after {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  border: 6px solid transparent;\n}\n.vdp-datepicker__calendar header .prev:after {\n  border-right: 10px solid #000;\n  margin-left: -5px;\n}\n.vdp-datepicker__calendar header .prev.disabled:after {\n  border-right: 10px solid #ddd;\n}\n.vdp-datepicker__calendar header .next:after {\n  border-left: 10px solid #000;\n  margin-left: 5px;\n}\n.vdp-datepicker__calendar header .next.disabled:after {\n  border-left: 10px solid #ddd;\n}\n.vdp-datepicker__calendar header .prev:not(.disabled),\n.vdp-datepicker__calendar header .next:not(.disabled),\n.vdp-datepicker__calendar header .up:not(.disabled) {\n  cursor: pointer;\n}\n.vdp-datepicker__calendar header .prev:not(.disabled):hover,\n.vdp-datepicker__calendar header .next:not(.disabled):hover,\n.vdp-datepicker__calendar header .up:not(.disabled):hover {\n  background: #eee;\n}\n.vdp-datepicker__calendar .disabled {\n  color: #ddd;\n  cursor: default;\n}\n.vdp-datepicker__calendar .flex-rtl {\n  display: flex;\n  width: inherit;\n  flex-wrap: wrap;\n}\n.vdp-datepicker__calendar .cell {\n  display: inline-block;\n  padding: 0 5px;\n  width: 14.285714285714286%;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n  vertical-align: middle;\n  border: 1px solid transparent;\n}\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {\n  cursor: pointer;\n}\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,\n.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {\n  border: 1px solid #4bd;\n}\n.vdp-datepicker__calendar .cell.selected {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.selected:hover {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.selected.highlighted {\n  background: #4bd;\n}\n.vdp-datepicker__calendar .cell.highlighted {\n  background: #cae5ed;\n}\n.vdp-datepicker__calendar .cell.highlighted.disabled {\n  color: #a3a3a3;\n}\n.vdp-datepicker__calendar .cell.grey {\n  color: #888;\n}\n.vdp-datepicker__calendar .cell.grey:hover {\n  background: inherit;\n}\n.vdp-datepicker__calendar .cell.day-header {\n  font-size: 75%;\n  white-space: nowrap;\n  cursor: inherit;\n}\n.vdp-datepicker__calendar .cell.day-header:hover {\n  background: inherit;\n}\n.vdp-datepicker__calendar .month,\n.vdp-datepicker__calendar .year {\n  width: 33.333%;\n}\n.vdp-datepicker__clear-button,\n.vdp-datepicker__calendar-button {\n  cursor: pointer;\n  font-style: normal;\n}\n.vdp-datepicker__clear-button.disabled,\n.vdp-datepicker__calendar-button.disabled {\n  color: #999;\n  cursor: default;\n}\n";
  styleInject(css_248z);

  script.render = render;
  script.__file = "src/components/Datepicker.vue";

  return script;

}));
