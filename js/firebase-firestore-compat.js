!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(require("@firebase/app-compat"), require("@firebase/app"))
    : "function" == typeof define && define.amd
    ? define(["@firebase/app-compat", "@firebase/app"], t)
    : t(
        (e = "undefined" != typeof globalThis ? globalThis : e || self)
          .firebase,
        e.firebase.INTERNAL.modularAPIs
      );
})(this, function (Uf, Bf) {
  "use strict";
  try {
    !function () {
      function e(e) {
        return e && "object" == typeof e && "default" in e ? e : { default: e };
      }
      var l,
        t = e(Uf);
      function n(t) {
        const n = [];
        let r = 0;
        for (let s = 0; s < t.length; s++) {
          let e = t.charCodeAt(s);
          e < 128
            ? (n[r++] = e)
            : (e < 2048
                ? (n[r++] = (e >> 6) | 192)
                : (55296 == (64512 & e) &&
                  s + 1 < t.length &&
                  56320 == (64512 & t.charCodeAt(s + 1))
                    ? ((e =
                        65536 +
                        ((1023 & e) << 10) +
                        (1023 & t.charCodeAt(++s))),
                      (n[r++] = (e >> 18) | 240),
                      (n[r++] = ((e >> 12) & 63) | 128))
                    : (n[r++] = (e >> 12) | 224),
                  (n[r++] = ((e >> 6) & 63) | 128)),
              (n[r++] = (63 & e) | 128));
        }
        return n;
      }
      const r = {
          byteToCharMap_: null,
          charToByteMap_: null,
          byteToCharMapWebSafe_: null,
          charToByteMapWebSafe_: null,
          ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
          },
          get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
          },
          HAS_NATIVE_SUPPORT: "function" == typeof atob,
          encodeByteArray(n, e) {
            if (!Array.isArray(n))
              throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            var r = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
            const s = [];
            for (let c = 0; c < n.length; c += 3) {
              var i = n[c],
                a = c + 1 < n.length,
                o = a ? n[c + 1] : 0,
                u = c + 2 < n.length,
                h = u ? n[c + 2] : 0;
              let e = ((15 & o) << 2) | (h >> 6),
                t = 63 & h;
              u || ((t = 64), a || (e = 64)),
                s.push(r[i >> 2], r[((3 & i) << 4) | (o >> 4)], r[e], r[t]);
            }
            return s.join("");
          },
          encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? btoa(e)
              : this.encodeByteArray(n(e), t);
          },
          decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t
              ? atob(e)
              : (function (e) {
                  const t = [];
                  let n = 0,
                    r = 0;
                  for (; n < e.length; ) {
                    var s,
                      i,
                      a = e[n++];
                    a < 128
                      ? (t[r++] = String.fromCharCode(a))
                      : 191 < a && a < 224
                      ? ((s = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((31 & a) << 6) | (63 & s)
                        )))
                      : 239 < a && a < 365
                      ? ((i =
                          (((7 & a) << 18) |
                            ((63 & e[n++]) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++])) -
                          65536),
                        (t[r++] = String.fromCharCode(55296 + (i >> 10))),
                        (t[r++] = String.fromCharCode(56320 + (1023 & i))))
                      : ((s = e[n++]),
                        (i = e[n++]),
                        (t[r++] = String.fromCharCode(
                          ((15 & a) << 12) | ((63 & s) << 6) | (63 & i)
                        )));
                  }
                  return t.join("");
                })(this.decodeStringToByteArray(e, t));
          },
          decodeStringToByteArray(e, t) {
            this.init_();
            var n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
            const r = [];
            for (let u = 0; u < e.length; ) {
              var s = n[e.charAt(u++)],
                i = u < e.length ? n[e.charAt(u)] : 0;
              ++u;
              var a = u < e.length ? n[e.charAt(u)] : 64;
              ++u;
              var o = u < e.length ? n[e.charAt(u)] : 64;
              if ((++u, null == s || null == i || null == a || null == o))
                throw Error();
              r.push((s << 2) | (i >> 4)),
                64 !== a &&
                  (r.push(((i << 4) & 240) | (a >> 2)),
                  64 !== o && r.push(((a << 6) & 192) | o));
            }
            return r;
          },
          init_() {
            if (!this.byteToCharMap_) {
              (this.byteToCharMap_ = {}),
                (this.charToByteMap_ = {}),
                (this.byteToCharMapWebSafe_ = {}),
                (this.charToByteMapWebSafe_ = {});
              for (let e = 0; e < this.ENCODED_VALS.length; e++)
                (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                  (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                  (this.byteToCharMapWebSafe_[e] =
                    this.ENCODED_VALS_WEBSAFE.charAt(e)),
                  (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] =
                    e),
                  e >= this.ENCODED_VALS_BASE.length &&
                    ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
                      e),
                    (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
                      e));
            }
          },
        },
        a = function (e) {
          return (
            (e = e), (t = n(e)), r.encodeByteArray(t, !0).replace(/\./g, "")
          );
          var t;
        };
      function f() {
        return "undefined" != typeof navigator &&
          "string" == typeof navigator.userAgent
          ? navigator.userAgent
          : "";
      }
      function s() {
        return (
          !(function () {
            try {
              return (
                "[object process]" ===
                Object.prototype.toString.call(global.process)
              );
            } catch (e) {
              return;
            }
          })() &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
        );
      }
      class o extends Error {
        constructor(e, t, n) {
          super(t),
            (this.code = e),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, o.prototype),
            Error.captureStackTrace &&
              Error.captureStackTrace(this, i.prototype.create);
        }
      }
      class i {
        constructor(e, t, n) {
          (this.service = e), (this.serviceName = t), (this.errors = n);
        }
        create(e, ...t) {
          var r,
            n = t[0] || {},
            s = `${this.service}/${e}`,
            i = this.errors[e],
            i = i
              ? ((r = n),
                i.replace(u, (e, t) => {
                  var n = r[t];
                  return null != n ? String(n) : `<${t}?>`;
                }))
              : "Error",
            i = `${this.serviceName}: ${i} (${s}).`;
          return new o(s, i, n);
        }
      }
      const u = /\{\$([^}]+)}/g;
      function m(e) {
        return e && e._delegate ? e._delegate : e;
      }
      class h {
        constructor(e, t, n) {
          (this.name = e),
            (this.instanceFactory = t),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
        }
        setInstantiationMode(e) {
          return (this.instantiationMode = e), this;
        }
        setMultipleInstances(e) {
          return (this.multipleInstances = e), this;
        }
        setServiceProps(e) {
          return (this.serviceProps = e), this;
        }
        setInstanceCreatedCallback(e) {
          return (this.onInstanceCreated = e), this;
        }
      }
      ((Kl = l = l || {})[(Kl.DEBUG = 0)] = "DEBUG"),
        (Kl[(Kl.VERBOSE = 1)] = "VERBOSE"),
        (Kl[(Kl.INFO = 2)] = "INFO"),
        (Kl[(Kl.WARN = 3)] = "WARN"),
        (Kl[(Kl.ERROR = 4)] = "ERROR"),
        (Kl[(Kl.SILENT = 5)] = "SILENT");
      const c = {
          debug: l.DEBUG,
          verbose: l.VERBOSE,
          info: l.INFO,
          warn: l.WARN,
          error: l.ERROR,
          silent: l.SILENT,
        },
        d = l.INFO,
        g = {
          [l.DEBUG]: "log",
          [l.VERBOSE]: "log",
          [l.INFO]: "info",
          [l.WARN]: "warn",
          [l.ERROR]: "error",
        },
        p = (e, t, ...n) => {
          if (!(t < e.logLevel)) {
            var r = new Date().toISOString(),
              s = g[t];
            if (!s)
              throw new Error(
                `Attempted to log a message with an invalid logType (value: ${t})`
              );
            console[s](`[${r}]  ${e.name}:`, ...n);
          }
        };
      var y,
        v =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        w = {},
        b = v || self;
      function I() {}
      function E(e) {
        var t = typeof e;
        return (
          "array" ==
            (t =
              "object" != t
                ? t
                : e
                ? Array.isArray(e)
                  ? "array"
                  : t
                : "null") ||
          ("object" == t && "number" == typeof e.length)
        );
      }
      function T(e) {
        var t = typeof e;
        return ("object" == t && null != e) || "function" == t;
      }
      var _ = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
        S = 0;
      function A(e, t, n) {
        return e.call.apply(e.bind, arguments);
      }
      function D(t, n, e) {
        if (!t) throw Error();
        if (2 < arguments.length) {
          var r = Array.prototype.slice.call(arguments, 2);
          return function () {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, r), t.apply(n, e);
          };
        }
        return function () {
          return t.apply(n, arguments);
        };
      }
      function x(e, t, n) {
        return (x =
          Function.prototype.bind &&
          -1 != Function.prototype.bind.toString().indexOf("native code")
            ? A
            : D).apply(null, arguments);
      }
      function N(t) {
        var n = Array.prototype.slice.call(arguments, 1);
        return function () {
          var e = n.slice();
          return e.push.apply(e, arguments), t.apply(this, e);
        };
      }
      function C(e, i) {
        function t() {}
        (t.prototype = i.prototype),
          (e.Z = i.prototype),
          (e.prototype = new t()),
          ((e.prototype.constructor = e).Vb = function (e, t, n) {
            for (
              var r = Array(arguments.length - 2), s = 2;
              s < arguments.length;
              s++
            )
              r[s - 2] = arguments[s];
            return i.prototype[t].apply(e, r);
          });
      }
      function k() {
        (this.s = this.s), (this.o = this.o);
      }
      var R = {};
      (k.prototype.s = !1),
        (k.prototype.na = function () {
          var e, t;
          !this.s &&
            ((this.s = !0), this.M(), 0) &&
            ((t = this),
            (e =
              (Object.prototype.hasOwnProperty.call(t, _) && t[_]) ||
              (t[_] = ++S)),
            delete R[e]);
        }),
        (k.prototype.M = function () {
          if (this.o) for (; this.o.length; ) this.o.shift()();
        });
      const M = Array.prototype.indexOf
          ? function (e, t) {
              return Array.prototype.indexOf.call(e, t, void 0);
            }
          : function (e, t) {
              if ("string" == typeof e)
                return "string" != typeof t || 1 != t.length
                  ? -1
                  : e.indexOf(t, 0);
              for (let n = 0; n < e.length; n++)
                if (n in e && e[n] === t) return n;
              return -1;
            },
        L = Array.prototype.forEach
          ? function (e, t, n) {
              Array.prototype.forEach.call(e, t, n);
            }
          : function (e, t, n) {
              var r = e.length,
                s = "string" == typeof e ? e.split("") : e;
              for (let i = 0; i < r; i++) i in s && t.call(n, s[i], i, e);
            };
      function V() {
        return Array.prototype.concat.apply([], arguments);
      }
      function O(t) {
        var n = t.length;
        if (0 < n) {
          const r = Array(n);
          for (let e = 0; e < n; e++) r[e] = t[e];
          return r;
        }
        return [];
      }
      function P(e) {
        return /^[\s\xa0]*$/.test(e);
      }
      var F,
        q = String.prototype.trim
          ? function (e) {
              return e.trim();
            }
          : function (e) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1];
            };
      function U(e, t) {
        return -1 != e.indexOf(t);
      }
      function B(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      e: {
        var G = b.navigator;
        if (G) {
          G = G.userAgent;
          if (G) {
            F = G;
            break e;
          }
        }
        F = "";
      }
      function j(e, t, n) {
        for (const r in e) t.call(n, e[r], r, e);
      }
      function K(e) {
        const t = {};
        for (const n in e) t[n] = e[n];
        return t;
      }
      var $ =
        "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
          " "
        );
      function z(t) {
        let n, r;
        for (let s = 1; s < arguments.length; s++) {
          for (n in (r = arguments[s])) t[n] = r[n];
          for (let e = 0; e < $.length; e++)
            (n = $[e]),
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
      }
      function W(e) {
        return W[" "](e), e;
      }
      W[" "] = I;
      var H,
        Q = U(F, "Opera"),
        Y = U(F, "Trident") || U(F, "MSIE"),
        X = U(F, "Edge"),
        J = X || Y,
        Z =
          U(F, "Gecko") &&
          !(U(F.toLowerCase(), "webkit") && !U(F, "Edge")) &&
          !(U(F, "Trident") || U(F, "MSIE")) &&
          !U(F, "Edge"),
        ee = U(F.toLowerCase(), "webkit") && !U(F, "Edge");
      function te() {
        var e = b.document;
        return e ? e.documentMode : void 0;
      }
      e: {
        var ne = "",
          re =
            ((re = F),
            Z
              ? /rv:([^\);]+)(\)|;)/.exec(re)
              : X
              ? /Edge\/([\d\.]+)/.exec(re)
              : Y
              ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(re)
              : ee
              ? /WebKit\/(\S+)/.exec(re)
              : Q
              ? /(?:Version)[ \/]?(\S+)/.exec(re)
              : void 0);
        if ((re && (ne = re ? re[1] : ""), Y)) {
          re = te();
          if (null != re && re > parseFloat(ne)) {
            H = String(re);
            break e;
          }
        }
        H = ne;
      }
      var se = {};
      function ie() {
        return (
          (e = function () {
            let e = 0;
            var t = q(String(H)).split("."),
              n = q("9").split("."),
              r = Math.max(t.length, n.length);
            for (let a = 0; 0 == e && a < r; a++)
              for (
                var s = t[a] || "", i = n[a] || "";
                (s = /(\d*)(\D*)(.*)/.exec(s) || ["", "", "", ""]),
                  (i = /(\d*)(\D*)(.*)/.exec(i) || ["", "", "", ""]),
                  (0 != s[0].length || 0 != i[0].length) &&
                    ((e =
                      B(
                        0 == s[1].length ? 0 : parseInt(s[1], 10),
                        0 == i[1].length ? 0 : parseInt(i[1], 10)
                      ) ||
                      B(0 == s[2].length, 0 == i[2].length) ||
                      B(s[2], i[2])),
                    (s = s[3]),
                    (i = i[3]),
                    0 == e);

              );
            return 0 <= e;
          }),
          (t = se),
          Object.prototype.hasOwnProperty.call(t, 9) ? t[9] : (t[9] = e(9))
        );
        var e, t;
      }
      var ae = (b.document && Y && (te() || parseInt(H, 10))) || void 0,
        oe = (function () {
          if (!b.addEventListener || !Object.defineProperty) return !1;
          var e = !1,
            t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
          try {
            b.addEventListener("test", I, t),
              b.removeEventListener("test", I, t);
          } catch (e) {}
          return e;
        })();
      function ue(e, t) {
        (this.type = e),
          (this.g = this.target = t),
          (this.defaultPrevented = !1);
      }
      function he(e, t) {
        if (
          (ue.call(this, e ? e.type : ""),
          (this.relatedTarget = this.g = this.target = null),
          (this.button =
            this.screenY =
            this.screenX =
            this.clientY =
            this.clientX =
              0),
          (this.key = ""),
          (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
          (this.state = null),
          (this.pointerId = 0),
          (this.pointerType = ""),
          (this.i = null),
          e)
        ) {
          var n = (this.type = e.type),
            r =
              e.changedTouches && e.changedTouches.length
                ? e.changedTouches[0]
                : null;
          if (
            ((this.target = e.target || e.srcElement),
            (this.g = t),
            (t = e.relatedTarget))
          ) {
            if (Z) {
              e: {
                try {
                  W(t.nodeName);
                  var s = !0;
                  break e;
                } catch (e) {}
                s = !1;
              }
              s || (t = null);
            }
          } else
            "mouseover" == n
              ? (t = e.fromElement)
              : "mouseout" == n && (t = e.toElement);
          (this.relatedTarget = t),
            r
              ? ((this.clientX = void 0 !== r.clientX ? r.clientX : r.pageX),
                (this.clientY = void 0 !== r.clientY ? r.clientY : r.pageY),
                (this.screenX = r.screenX || 0),
                (this.screenY = r.screenY || 0))
              : ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
                (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
                (this.screenX = e.screenX || 0),
                (this.screenY = e.screenY || 0)),
            (this.button = e.button),
            (this.key = e.key || ""),
            (this.ctrlKey = e.ctrlKey),
            (this.altKey = e.altKey),
            (this.shiftKey = e.shiftKey),
            (this.metaKey = e.metaKey),
            (this.pointerId = e.pointerId || 0),
            (this.pointerType =
              "string" == typeof e.pointerType
                ? e.pointerType
                : ce[e.pointerType] || ""),
            (this.state = e.state),
            (this.i = e).defaultPrevented && he.Z.h.call(this);
        }
      }
      (ue.prototype.h = function () {
        this.defaultPrevented = !0;
      }),
        C(he, ue);
      var ce = { 2: "touch", 3: "pen", 4: "mouse" };
      he.prototype.h = function () {
        he.Z.h.call(this);
        var e = this.i;
        e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
      };
      var le = "closure_listenable_" + ((1e6 * Math.random()) | 0),
        de = 0;
      function fe(e, t, n, r, s) {
        (this.listener = e),
          (this.proxy = null),
          (this.src = t),
          (this.type = n),
          (this.capture = !!r),
          (this.ia = s),
          (this.key = ++de),
          (this.ca = this.fa = !1);
      }
      function ge(e) {
        (e.ca = !0),
          (e.listener = null),
          (e.proxy = null),
          (e.src = null),
          (e.ia = null);
      }
      function me(e) {
        (this.src = e), (this.g = {}), (this.h = 0);
      }
      function pe(e, t) {
        var n,
          r,
          s,
          i = t.type;
        i in e.g &&
          ((n = e.g[i]),
          (s = 0 <= (r = M(n, t))) && Array.prototype.splice.call(n, r, 1),
          s && (ge(t), 0 == e.g[i].length && (delete e.g[i], e.h--)));
      }
      function ye(e, t, n, r) {
        for (var s = 0; s < e.length; ++s) {
          var i = e[s];
          if (!i.ca && i.listener == t && i.capture == !!n && i.ia == r)
            return s;
        }
        return -1;
      }
      me.prototype.add = function (e, t, n, r, s) {
        var i = e.toString();
        (e = this.g[i]) || ((e = this.g[i] = []), this.h++);
        var a = ye(e, t, r, s);
        return (
          -1 < a
            ? ((t = e[a]), n || (t.fa = !1))
            : (((t = new fe(t, this.src, i, !!r, s)).fa = n), e.push(t)),
          t
        );
      };
      var ve = "closure_lm_" + ((1e6 * Math.random()) | 0),
        we = {};
      function be(e, t, n, r, s) {
        if (r && r.once)
          return (function e(t, n, r, s, i) {
            if (Array.isArray(n)) {
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
              return null;
            }
            r = De(r);
            return t && t[le]
              ? t.O(n, r, T(s) ? !!s.capture : !!s, i)
              : Ie(t, n, r, !0, s, i);
          })(e, t, n, r, s);
        if (Array.isArray(t)) {
          for (var i = 0; i < t.length; i++) be(e, t[i], n, r, s);
          return null;
        }
        return (
          (n = De(n)),
          e && e[le]
            ? e.N(t, n, T(r) ? !!r.capture : !!r, s)
            : Ie(e, t, n, !1, r, s)
        );
      }
      function Ie(e, t, n, r, s, i) {
        if (!t) throw Error("Invalid event type");
        var a,
          o = T(s) ? !!s.capture : !!s,
          u = Se(e);
        if ((u || (e[ve] = u = new me(e)), (n = u.add(t, n, r, o, i)).proxy))
          return n;
        if (
          ((a = _e),
          (r = function e(t) {
            return a.call(e.src, e.listener, t);
          }),
          ((n.proxy = r).src = e),
          (r.listener = n),
          e.addEventListener)
        )
          void 0 === (s = !oe ? o : s) && (s = !1),
            e.addEventListener(t.toString(), r, s);
        else if (e.attachEvent) e.attachEvent(Te(t.toString()), r);
        else {
          if (!e.addListener || !e.removeListener)
            throw Error("addEventListener and attachEvent are unavailable.");
          e.addListener(r);
        }
        return n;
      }
      function Ee(e) {
        var t, n, r;
        "number" != typeof e &&
          e &&
          !e.ca &&
          ((t = e.src) && t[le]
            ? pe(t.i, e)
            : ((n = e.type),
              (r = e.proxy),
              t.removeEventListener
                ? t.removeEventListener(n, r, e.capture)
                : t.detachEvent
                ? t.detachEvent(Te(n), r)
                : t.addListener && t.removeListener && t.removeListener(r),
              (n = Se(t))
                ? (pe(n, e), 0 == n.h && ((n.src = null), (t[ve] = null)))
                : ge(e)));
      }
      function Te(e) {
        return e in we ? we[e] : (we[e] = "on" + e);
      }
      function _e(e, t) {
        var n, r;
        return (e =
          !!e.ca ||
          ((t = new he(t, this)),
          (n = e.listener),
          (r = e.ia || e.src),
          e.fa && Ee(e),
          n.call(r, t)));
      }
      function Se(e) {
        return (e = e[ve]) instanceof me ? e : null;
      }
      var Ae = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
      function De(t) {
        return "function" == typeof t
          ? t
          : (t[Ae] ||
              (t[Ae] = function (e) {
                return t.handleEvent(e);
              }),
            t[Ae]);
      }
      function xe() {
        k.call(this), (this.i = new me(this)), ((this.P = this).I = null);
      }
      function Ne(e, t) {
        var n,
          r = e.I;
        if (r) for (n = []; r; r = r.I) n.push(r);
        if (
          ((e = e.P),
          (r = t.type || t),
          "string" == typeof t
            ? (t = new ue(t, e))
            : t instanceof ue
            ? (t.target = t.target || e)
            : ((a = t), z((t = new ue(r, e)), a)),
          (a = !0),
          n)
        )
          for (var s = n.length - 1; 0 <= s; s--)
            var i = (t.g = n[s]), a = Ce(i, r, !0, t) && a;
        if (
          ((a = Ce((i = t.g = e), r, !0, t) && a),
          (a = Ce(i, r, !1, t) && a),
          n)
        )
          for (s = 0; s < n.length; s++)
            a = Ce((i = t.g = n[s]), r, !1, t) && a;
      }
      function Ce(e, t, n, r) {
        if (!(t = e.i.g[String(t)])) return !0;
        t = t.concat();
        for (var s = !0, i = 0; i < t.length; ++i) {
          var a,
            o,
            u = t[i];
          u &&
            !u.ca &&
            u.capture == n &&
            ((a = u.listener),
            (o = u.ia || u.src),
            u.fa && pe(e.i, u),
            (s = !1 !== a.call(o, r) && s));
        }
        return s && !r.defaultPrevented;
      }
      C(xe, k),
        (xe.prototype[le] = !0),
        (xe.prototype.removeEventListener = function (e, t, n, r) {
          !(function e(t, n, r, s, i) {
            if (Array.isArray(n))
              for (var a = 0; a < n.length; a++) e(t, n[a], r, s, i);
            else
              (s = T(s) ? !!s.capture : !!s),
                (r = De(r)),
                t && t[le]
                  ? ((t = t.i),
                    (n = String(n).toString()) in t.g &&
                      -1 < (r = ye((a = t.g[n]), r, s, i)) &&
                      (ge(a[r]),
                      Array.prototype.splice.call(a, r, 1),
                      0 == a.length && (delete t.g[n], t.h--)))
                  : (t = t && Se(t)) &&
                    ((n = t.g[n.toString()]),
                    (r =
                      (t = -1) < (t = n ? ye(n, r, s, i) : t) ? n[t] : null) &&
                      Ee(r));
          })(this, e, t, n, r);
        }),
        (xe.prototype.M = function () {
          if ((xe.Z.M.call(this), this.i)) {
            var e,
              t = this.i;
            for (e in t.g) {
              for (var n = t.g[e], r = 0; r < n.length; r++) ge(n[r]);
              delete t.g[e], t.h--;
            }
          }
          this.I = null;
        }),
        (xe.prototype.N = function (e, t, n, r) {
          return this.i.add(String(e), t, !1, n, r);
        }),
        (xe.prototype.O = function (e, t, n, r) {
          return this.i.add(String(e), t, !0, n, r);
        });
      var ke = b.JSON.stringify;
      var Re,
        Me = new (class {
          constructor(e, t) {
            (this.i = e), (this.j = t), (this.h = 0), (this.g = null);
          }
          get() {
            let e;
            return (
              0 < this.h
                ? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
                : (e = this.i()),
              e
            );
          }
        })(
          () => new Le(),
          (e) => e.reset()
        );
      class Le {
        constructor() {
          this.next = this.g = this.h = null;
        }
        set(e, t) {
          (this.h = e), (this.g = t), (this.next = null);
        }
        reset() {
          this.next = this.g = this.h = null;
        }
      }
      function Ve(e, t) {
        var n;
        Re ||
          ((n = b.Promise.resolve(void 0)),
          (Re = function () {
            n.then(Fe);
          })),
          Oe || (Re(), (Oe = !0)),
          Pe.add(e, t);
      }
      var Oe = !1,
        Pe = new (class {
          constructor() {
            this.h = this.g = null;
          }
          add(e, t) {
            const n = Me.get();
            n.set(e, t),
              this.h ? (this.h.next = n) : (this.g = n),
              (this.h = n);
          }
        })();
      function Fe() {
        for (
          var e;
          (e = (function () {
            var e = Pe;
            let t = null;
            return (
              e.g &&
                ((t = e.g),
                (e.g = e.g.next),
                e.g || (e.h = null),
                (t.next = null)),
              t
            );
          })());

        ) {
          try {
            e.h.call(e.g);
          } catch (e) {
            !(function (e) {
              b.setTimeout(() => {
                throw e;
              }, 0);
            })(e);
          }
          var t = Me;
          t.j(e), t.h < 100 && (t.h++, (e.next = t.g), (t.g = e));
        }
        Oe = !1;
      }
      function qe(e, t) {
        xe.call(this),
          (this.h = e || 1),
          (this.g = t || b),
          (this.j = x(this.kb, this)),
          (this.l = Date.now());
      }
      function Ue(e) {
        (e.da = !1), e.S && (e.g.clearTimeout(e.S), (e.S = null));
      }
      function Be(e, t, n) {
        if ("function" == typeof e) n && (e = x(e, n));
        else {
          if (!e || "function" != typeof e.handleEvent)
            throw Error("Invalid listener argument");
          e = x(e.handleEvent, e);
        }
        return 2147483647 < Number(t) ? -1 : b.setTimeout(e, t || 0);
      }
      C(qe, xe),
        ((y = qe.prototype).da = !1),
        (y.S = null),
        (y.kb = function () {
          var e;
          this.da &&
            (0 < (e = Date.now() - this.l) && e < 0.8 * this.h
              ? (this.S = this.g.setTimeout(this.j, this.h - e))
              : (this.S && (this.g.clearTimeout(this.S), (this.S = null)),
                Ne(this, "tick"),
                this.da && (Ue(this), this.start())));
        }),
        (y.start = function () {
          (this.da = !0),
            this.S ||
              ((this.S = this.g.setTimeout(this.j, this.h)),
              (this.l = Date.now()));
        }),
        (y.M = function () {
          qe.Z.M.call(this), Ue(this), delete this.g;
        });
      class Ge extends k {
        constructor(e, t) {
          super(),
            (this.m = e),
            (this.j = t),
            (this.h = null),
            (this.i = !1),
            (this.g = null);
        }
        l(e) {
          (this.h = arguments),
            this.g
              ? (this.i = !0)
              : (function e(t) {
                  t.g = Be(() => {
                    (t.g = null), t.i && ((t.i = !1), e(t));
                  }, t.j);
                  var n = t.h;
                  (t.h = null), t.m.apply(null, n);
                })(this);
        }
        M() {
          super.M(),
            this.g &&
              (b.clearTimeout(this.g),
              (this.g = null),
              (this.i = !1),
              (this.h = null));
        }
      }
      function je(e) {
        k.call(this), (this.h = e), (this.g = {});
      }
      C(je, k);
      var Ke = [];
      function $e(e, t, n, r) {
        Array.isArray(n) || (n && (Ke[0] = n.toString()), (n = Ke));
        for (var s = 0; s < n.length; s++) {
          var i = be(t, n[s], r || e.handleEvent, !1, e.h || e);
          if (!i) break;
          e.g[i.key] = i;
        }
      }
      function ze(e) {
        j(
          e.g,
          function (e, t) {
            this.g.hasOwnProperty(t) && Ee(e);
          },
          e
        ),
          (e.g = {});
      }
      function We() {
        this.g = !0;
      }
      function He(e, t, n, r) {
        e.info(function () {
          return (
            "XMLHTTP TEXT (" +
            t +
            "): " +
            (function (e, t) {
              if (!e.g) return t;
              if (!t) return null;
              try {
                var n = JSON.parse(t);
                if (n)
                  for (e = 0; e < n.length; e++)
                    if (Array.isArray(n[e])) {
                      var r = n[e];
                      if (!(r.length < 2)) {
                        var s = r[1];
                        if (Array.isArray(s) && !(s.length < 1)) {
                          var i = s[0];
                          if ("noop" != i && "stop" != i && "close" != i)
                            for (var a = 1; a < s.length; a++) s[a] = "";
                        }
                      }
                    }
                return ke(n);
              } catch (e) {
                return t;
              }
            })(e, n) +
            (r ? " " + r : "")
          );
        });
      }
      (je.prototype.M = function () {
        je.Z.M.call(this), ze(this);
      }),
        (je.prototype.handleEvent = function () {
          throw Error("EventHandler.handleEvent not implemented");
        }),
        (We.prototype.Aa = function () {
          this.g = !1;
        }),
        (We.prototype.info = function () {});
      var Qe = {},
        Ye = null;
      function Xe() {
        return (Ye = Ye || new xe());
      }
      function Je(e) {
        ue.call(this, Qe.Ma, e);
      }
      function Ze() {
        var e = Xe();
        Ne(e, new Je(e));
      }
      function et(e, t) {
        ue.call(this, Qe.STAT_EVENT, e), (this.stat = t);
      }
      function tt(e) {
        var t = Xe();
        Ne(t, new et(t, e));
      }
      function nt(e, t) {
        ue.call(this, Qe.Na, e), (this.size = t);
      }
      function rt(e, t) {
        if ("function" != typeof e)
          throw Error("Fn must not be null and must be a function");
        return b.setTimeout(function () {
          e();
        }, t);
      }
      (Qe.Ma = "serverreachability"),
        C(Je, ue),
        (Qe.STAT_EVENT = "statevent"),
        C(et, ue),
        (Qe.Na = "timingevent"),
        C(nt, ue);
      var st = {
          NO_ERROR: 0,
          lb: 1,
          yb: 2,
          xb: 3,
          sb: 4,
          wb: 5,
          zb: 6,
          Ja: 7,
          TIMEOUT: 8,
          Cb: 9,
        },
        it = {
          qb: "complete",
          Mb: "success",
          Ka: "error",
          Ja: "abort",
          Eb: "ready",
          Fb: "readystatechange",
          TIMEOUT: "timeout",
          Ab: "incrementaldata",
          Db: "progress",
          tb: "downloadprogress",
          Ub: "uploadprogress",
        };
      function at() {}
      function ot(e) {
        return e.h || (e.h = e.i());
      }
      function ut() {}
      at.prototype.h = null;
      v = { OPEN: "a", pb: "b", Ka: "c", Bb: "d" };
      function ht() {
        ue.call(this, "d");
      }
      function ct() {
        ue.call(this, "c");
      }
      function lt() {}
      function dt(e, t, n, r) {
        (this.l = e),
          (this.j = t),
          (this.m = n),
          (this.X = r || 1),
          (this.V = new je(this)),
          (this.P = mt),
          (this.W = new qe((e = J ? 125 : void 0))),
          (this.H = null),
          (this.i = !1),
          (this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null),
          (this.D = []),
          (this.g = null),
          (this.C = 0),
          (this.o = this.u = null),
          (this.N = -1),
          (this.I = !1),
          (this.O = 0),
          (this.L = null),
          (this.aa = this.J = this.$ = this.U = !1),
          (this.h = new ft());
      }
      function ft() {
        (this.i = null), (this.g = ""), (this.h = !1);
      }
      C(ht, ue),
        C(ct, ue),
        C(lt, at),
        (lt.prototype.g = function () {
          return new XMLHttpRequest();
        }),
        (lt.prototype.i = function () {
          return {};
        });
      var gt = new lt(),
        mt = 45e3,
        pt = {},
        yt = {};
      function vt(e, t, n) {
        (e.K = 1), (e.v = Ut(Lt(t))), (e.s = n), (e.U = !0), wt(e, null);
      }
      function wt(e, t) {
        (e.F = Date.now()), Et(e), (e.A = Lt(e.v));
        var a,
          o,
          u,
          h,
          c,
          l,
          n = e.A,
          r = e.X;
        Array.isArray(r) || (r = [String(r)]),
          Zt(n.h, "t", r),
          (e.C = 0),
          (n = e.l.H),
          (e.h = new ft()),
          (e.g = er(e.l, n ? t : null, !e.s)),
          0 < e.O && (e.L = new Ge(x(e.Ia, e, e.g), e.O)),
          $e(e.V, e.g, "readystatechange", e.gb),
          (t = e.H ? K(e.H) : {}),
          e.s
            ? (e.u || (e.u = "POST"),
              (t["Content-Type"] = "application/x-www-form-urlencoded"),
              e.g.ea(e.A, e.u, e.s, t))
            : ((e.u = "GET"), e.g.ea(e.A, e.u, null, t)),
          Ze(),
          (a = e.j),
          (o = e.u),
          (u = e.A),
          (h = e.m),
          (c = e.X),
          (l = e.s),
          a.info(function () {
            if (a.g)
              if (l)
                for (var e = "", t = l.split("&"), n = 0; n < t.length; n++) {
                  var r,
                    s,
                    i = t[n].split("=");
                  1 < i.length &&
                    ((r = i[0]),
                    (i = i[1]),
                    (e =
                      2 <= (s = r.split("_")).length && "type" == s[1]
                        ? e + (r + "=") + i + "&"
                        : e + (r + "=redacted&")));
                }
              else e = null;
            else e = l;
            return (
              "XMLHTTP REQ (" +
              h +
              ") [attempt " +
              c +
              "]: " +
              o +
              "\n" +
              u +
              "\n" +
              e
            );
          });
      }
      function bt(e) {
        return e.g && "GET" == e.u && 2 != e.K && e.l.Ba;
      }
      function It(e, t, n) {
        let r = !0,
          s;
        for (; !e.I && e.C < n.length; ) {
          if (
            ((s =
              ((a = n),
              (u = o = void 0),
              (o = (i = e).C),
              -1 == (u = a.indexOf("\n", o))
                ? yt
                : ((o = Number(a.substring(o, u))),
                  isNaN(o)
                    ? pt
                    : (u += 1) + o > a.length
                    ? yt
                    : ((a = a.substr(u, o)), (i.C = u + o), a)))),
            s == yt)
          ) {
            4 == t && ((e.o = 4), tt(14), (r = !1)),
              He(e.j, e.m, null, "[Incomplete Response]");
            break;
          }
          if (s == pt) {
            (e.o = 4), tt(15), He(e.j, e.m, n, "[Invalid Chunk]"), (r = !1);
            break;
          }
          He(e.j, e.m, s, null), Dt(e, s);
        }
        var i, a, o, u;
        bt(e) && s != yt && s != pt && ((e.h.g = ""), (e.C = 0)),
          4 != t || 0 != n.length || e.h.h || ((e.o = 1), tt(16), (r = !1)),
          (e.i = e.i && r),
          r
            ? 0 < n.length &&
              !e.aa &&
              ((e.aa = !0),
              (t = e.l).g == e &&
                t.$ &&
                !t.L &&
                (t.h.info(
                  "Great, no buffering proxy detected. Bytes received: " +
                    n.length
                ),
                zn(t),
                (t.L = !0),
                tt(11)))
            : (He(e.j, e.m, n, "[Invalid Chunked Response]"), At(e), St(e));
      }
      function Et(e) {
        (e.Y = Date.now() + e.P), Tt(e, e.P);
      }
      function Tt(e, t) {
        if (null != e.B) throw Error("WatchDog timer not null");
        e.B = rt(x(e.eb, e), t);
      }
      function _t(e) {
        e.B && (b.clearTimeout(e.B), (e.B = null));
      }
      function St(e) {
        0 == e.l.G || e.I || Qn(e.l, e);
      }
      function At(e) {
        _t(e);
        var t = e.L;
        t && "function" == typeof t.na && t.na(),
          (e.L = null),
          Ue(e.W),
          ze(e.V),
          e.g && ((t = e.g), (e.g = null), t.abort(), t.na());
      }
      function Dt(e, t) {
        try {
          var n = e.l;
          if (0 != n.G && (n.g == e || on(n.i, e)))
            if (((n.I = e.N), !e.J && on(n.i, e) && 3 == n.G)) {
              try {
                var r = n.Ca.g.parse(t);
              } catch (e) {
                r = null;
              }
              if (Array.isArray(r) && 3 == r.length) {
                var s = r;
                if (0 == s[0]) {
                  e: if (!n.u) {
                    if (n.g) {
                      if (!(n.g.F + 3e3 < e.F)) break e;
                      Hn(n), Pn(n);
                    }
                    $n(n), tt(18);
                  }
                } else
                  (n.ta = s[1]),
                    0 < n.ta - n.U &&
                      s[2] < 37500 &&
                      n.N &&
                      0 == n.A &&
                      !n.v &&
                      (n.v = rt(x(n.ab, n), 6e3));
                if (an(n.i) <= 1 && n.ka) {
                  try {
                    n.ka();
                  } catch (e) {}
                  n.ka = void 0;
                }
              } else Xn(n, 11);
            } else if (((!e.J && n.g != e) || Hn(n), !P(t)))
              for (s = n.Ca.g.parse(t), t = 0; t < s.length; t++) {
                var i = s[t];
                if (((n.U = i[0]), (i = i[1]), 2 == n.G))
                  if ("c" == i[0]) {
                    (n.J = i[1]), (n.la = i[2]);
                    var a = i[3];
                    null != a && ((n.ma = a), n.h.info("VER=" + n.ma));
                    var o = i[4];
                    null != o && ((n.za = o), n.h.info("SVER=" + n.za));
                    var u,
                      h,
                      c,
                      l = i[5];
                    null != l &&
                      "number" == typeof l &&
                      0 < l &&
                      ((r = 1.5 * l),
                      (n.K = r),
                      n.h.info("backChannelRequestTimeoutMs_=" + r)),
                      (r = n);
                    const m = e.g;
                    m &&
                      (!(u = m.g
                        ? m.g.getResponseHeader("X-Client-Wire-Protocol")
                        : null) ||
                        (!(h = r.i).g &&
                          (U(u, "spdy") || U(u, "quic") || U(u, "h2")) &&
                          ((h.j = h.l),
                          (h.g = new Set()),
                          h.h && (un(h, h.h), (h.h = null)))),
                      !r.D ||
                        ((c = m.g
                          ? m.g.getResponseHeader("X-HTTP-Session-Id")
                          : null) &&
                          ((r.sa = c), qt(r.F, r.D, c)))),
                      (n.G = 3),
                      n.j && n.j.xa(),
                      n.$ &&
                        ((n.O = Date.now() - e.F),
                        n.h.info("Handshake RTT: " + n.O + "ms"));
                    var d,
                      f,
                      g = e;
                    ((r = n).oa = Zn(r, r.H ? r.la : null, r.W)),
                      g.J
                        ? (hn(r.i, g),
                          (d = g),
                          (f = r.K) && d.setTimeout(f),
                          d.B && (_t(d), Et(d)),
                          (r.g = g))
                        : Kn(r),
                      0 < n.l.length && Un(n);
                  } else ("stop" != i[0] && "close" != i[0]) || Xn(n, 7);
                else
                  3 == n.G &&
                    ("stop" == i[0] || "close" == i[0]
                      ? "stop" == i[0]
                        ? Xn(n, 7)
                        : On(n)
                      : "noop" != i[0] && n.j && n.j.wa(i),
                    (n.A = 0));
              }
          Ze();
        } catch (e) {}
      }
      function xt(e, t) {
        if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
        else if (E(e) || "string" == typeof e) L(e, t, void 0);
        else {
          if (e.T && "function" == typeof e.T) var n = e.T();
          else if (e.R && "function" == typeof e.R) n = void 0;
          else if (E(e) || "string" == typeof e)
            for (var n = [], r = e.length, s = 0; s < r; s++) n.push(s);
          else for (s in ((n = []), (r = 0), e)) n[r++] = s;
          for (
            var s = (r = (function (e) {
                if (e.R && "function" == typeof e.R) return e.R();
                if ("string" == typeof e) return e.split("");
                if (E(e)) {
                  for (var t = [], n = e.length, r = 0; r < n; r++)
                    t.push(e[r]);
                  return t;
                }
                for (r in ((t = []), (n = 0), e)) t[n++] = e[r];
                return t;
              })(e)).length,
              i = 0;
            i < s;
            i++
          )
            t.call(void 0, r[i], n && n[i], e);
        }
      }
      function Nt(e, t) {
        (this.h = {}), (this.g = []), (this.i = 0);
        var n = arguments.length;
        if (1 < n) {
          if (n % 2) throw Error("Uneven number of arguments");
          for (var r = 0; r < n; r += 2)
            this.set(arguments[r], arguments[r + 1]);
        } else if (e)
          if (e instanceof Nt)
            for (n = e.T(), r = 0; r < n.length; r++)
              this.set(n[r], e.get(n[r]));
          else for (r in e) this.set(r, e[r]);
      }
      function Ct(e) {
        if (e.i != e.g.length) {
          for (var t = 0, n = 0; t < e.g.length; ) {
            var r = e.g[t];
            kt(e.h, r) && (e.g[n++] = r), t++;
          }
          e.g.length = n;
        }
        if (e.i != e.g.length) {
          for (var s = {}, n = (t = 0); t < e.g.length; )
            kt(s, (r = e.g[t])) || (s[(e.g[n++] = r)] = 1), t++;
          e.g.length = n;
        }
      }
      function kt(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      ((y = dt.prototype).setTimeout = function (e) {
        this.P = e;
      }),
        (y.gb = function (e) {
          e = e.target;
          const t = this.L;
          t && 3 == kn(e) ? t.l() : this.Ia(e);
        }),
        (y.Ia = function (e) {
          try {
            if (e == this.g)
              e: {
                var t = kn(this.g),
                  n = this.g.Da();
                this.g.ba();
                if (
                  !(t < 3) &&
                  (3 != t ||
                    J ||
                    (this.g && (this.h.h || this.g.ga() || Rn(this.g))))
                ) {
                  this.I || 4 != t || 7 == n || Ze(), _t(this);
                  var r = this.g.ba();
                  this.N = r;
                  t: if (bt(this)) {
                    var s = Rn(this.g);
                    e = "";
                    var i = s.length,
                      a = 4 == kn(this.g);
                    if (!this.h.i) {
                      if ("undefined" == typeof TextDecoder) {
                        At(this), St(this);
                        var o = "";
                        break t;
                      }
                      this.h.i = new b.TextDecoder();
                    }
                    for (n = 0; n < i; n++)
                      (this.h.h = !0),
                        (e += this.h.i.decode(s[n], {
                          stream: a && n == i - 1,
                        }));
                    s.splice(0, i),
                      (this.h.g += e),
                      (this.C = 0),
                      (o = this.h.g);
                  } else o = this.g.ga();
                  if (
                    ((this.i = 200 == r),
                    (l = this.j),
                    (d = this.u),
                    (f = this.A),
                    (g = this.m),
                    (m = this.X),
                    (p = t),
                    (y = r),
                    l.info(function () {
                      return (
                        "XMLHTTP RESP (" +
                        g +
                        ") [ attempt " +
                        m +
                        "]: " +
                        d +
                        "\n" +
                        f +
                        "\n" +
                        p +
                        " " +
                        y
                      );
                    }),
                    this.i)
                  ) {
                    if (this.$ && !this.J) {
                      t: {
                        if (this.g) {
                          var u,
                            h = this.g;
                          if (
                            (u = h.g
                              ? h.g.getResponseHeader("X-HTTP-Initial-Response")
                              : null) &&
                            !P(u)
                          ) {
                            var c = u;
                            break t;
                          }
                        }
                        c = null;
                      }
                      if (!(r = c)) {
                        (this.i = !1), (this.o = 3), tt(12), At(this), St(this);
                        break e;
                      }
                      He(
                        this.j,
                        this.m,
                        r,
                        "Initial handshake response via X-HTTP-Initial-Response"
                      ),
                        (this.J = !0),
                        Dt(this, r);
                    }
                    this.U
                      ? (It(this, t, o),
                        J &&
                          this.i &&
                          3 == t &&
                          ($e(this.V, this.W, "tick", this.fb), this.W.start()))
                      : (He(this.j, this.m, o, null), Dt(this, o)),
                      4 == t && At(this),
                      this.i &&
                        !this.I &&
                        (4 == t ? Qn(this.l, this) : ((this.i = !1), Et(this)));
                  } else
                    400 == r && 0 < o.indexOf("Unknown SID")
                      ? ((this.o = 3), tt(12))
                      : ((this.o = 0), tt(13)),
                      At(this),
                      St(this);
                }
              }
          } catch (e) {}
          var l, d, f, g, m, p, y;
        }),
        (y.fb = function () {
          var e, t;
          this.g &&
            ((e = kn(this.g)),
            (t = this.g.ga()),
            this.C < t.length &&
              (_t(this), It(this, e, t), this.i && 4 != e && Et(this)));
        }),
        (y.cancel = function () {
          (this.I = !0), At(this);
        }),
        (y.eb = function () {
          this.B = null;
          var e,
            t,
            n = Date.now();
          0 <= n - this.Y
            ? ((e = this.j),
              (t = this.A),
              e.info(function () {
                return "TIMEOUT: " + t;
              }),
              2 != this.K && (Ze(), tt(17)),
              At(this),
              (this.o = 2),
              St(this))
            : Tt(this, this.Y - n);
        }),
        ((y = Nt.prototype).R = function () {
          Ct(this);
          for (var e = [], t = 0; t < this.g.length; t++)
            e.push(this.h[this.g[t]]);
          return e;
        }),
        (y.T = function () {
          return Ct(this), this.g.concat();
        }),
        (y.get = function (e, t) {
          return kt(this.h, e) ? this.h[e] : t;
        }),
        (y.set = function (e, t) {
          kt(this.h, e) || (this.i++, this.g.push(e)), (this.h[e] = t);
        }),
        (y.forEach = function (e, t) {
          for (var n = this.T(), r = 0; r < n.length; r++) {
            var s = n[r],
              i = this.get(s);
            e.call(t, i, s, this);
          }
        });
      var Rt =
        /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
      function Mt(e, t) {
        var n;
        (this.i = this.s = this.j = ""),
          (this.m = null),
          (this.o = this.l = ""),
          (this.g = !1),
          e instanceof Mt
            ? ((this.g = void 0 !== t ? t : e.g),
              Vt(this, e.j),
              (this.s = e.s),
              Ot(this, e.i),
              Pt(this, e.m),
              (this.l = e.l),
              (t = e.h),
              ((n = new Qt()).i = t.i),
              t.g && ((n.g = new Nt(t.g)), (n.h = t.h)),
              Ft(this, n),
              (this.o = e.o))
            : e && (n = String(e).match(Rt))
            ? ((this.g = !!t),
              Vt(this, n[1] || "", !0),
              (this.s = Bt(n[2] || "")),
              Ot(this, n[3] || "", !0),
              Pt(this, n[4]),
              (this.l = Bt(n[5] || "", !0)),
              Ft(this, n[6] || "", !0),
              (this.o = Bt(n[7] || "")))
            : ((this.g = !!t), (this.h = new Qt(null, this.g)));
      }
      function Lt(e) {
        return new Mt(e);
      }
      function Vt(e, t, n) {
        (e.j = n ? Bt(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
      }
      function Ot(e, t, n) {
        e.i = n ? Bt(t, !0) : t;
      }
      function Pt(e, t) {
        if (t) {
          if (((t = Number(t)), isNaN(t) || t < 0))
            throw Error("Bad port number " + t);
          e.m = t;
        } else e.m = null;
      }
      function Ft(e, t, n) {
        var r, s;
        t instanceof Qt
          ? ((e.h = t),
            (r = e.h),
            (s = e.g) &&
              !r.j &&
              (Yt(r),
              (r.i = null),
              r.g.forEach(function (e, t) {
                var n = t.toLowerCase();
                t != n && (Xt(this, t), Zt(this, n, e));
              }, r)),
            (r.j = s))
          : (n || (t = Gt(t, Wt)), (e.h = new Qt(t, e.g)));
      }
      function qt(e, t, n) {
        e.h.set(t, n);
      }
      function Ut(e) {
        return (
          qt(
            e,
            "zx",
            Math.floor(2147483648 * Math.random()).toString(36) +
              Math.abs(
                Math.floor(2147483648 * Math.random()) ^ Date.now()
              ).toString(36)
          ),
          e
        );
      }
      function Bt(e, t) {
        return e
          ? t
            ? decodeURI(e.replace(/%25/g, "%2525"))
            : decodeURIComponent(e)
          : "";
      }
      function Gt(e, t, n) {
        return "string" == typeof e
          ? ((e = encodeURI(e).replace(t, jt)),
            (e = n ? e.replace(/%25([0-9a-fA-F]{2})/g, "%$1") : e))
          : null;
      }
      function jt(e) {
        return (
          "%" +
          (((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
          (15 & e).toString(16)
        );
      }
      Mt.prototype.toString = function () {
        var e = [],
          t = this.j;
        t && e.push(Gt(t, Kt, !0), ":");
        var n = this.i;
        return (
          (!n && "file" != t) ||
            (e.push("//"),
            (t = this.s) && e.push(Gt(t, Kt, !0), "@"),
            e.push(
              encodeURIComponent(String(n)).replace(
                /%25([0-9a-fA-F]{2})/g,
                "%$1"
              )
            ),
            null != (n = this.m) && e.push(":", String(n))),
          (n = this.l) &&
            (this.i && "/" != n.charAt(0) && e.push("/"),
            e.push(Gt(n, "/" == n.charAt(0) ? zt : $t, !0))),
          (n = this.h.toString()) && e.push("?", n),
          (n = this.o) && e.push("#", Gt(n, Ht)),
          e.join("")
        );
      };
      var Kt = /[#\/\?@]/g,
        $t = /[#\?:]/g,
        zt = /[#\?]/g,
        Wt = /[#\?@]/g,
        Ht = /#/g;
      function Qt(e, t) {
        (this.h = this.g = null), (this.i = e || null), (this.j = !!t);
      }
      function Yt(n) {
        n.g ||
          ((n.g = new Nt()),
          (n.h = 0),
          n.i &&
            (function (e, t) {
              if (e) {
                e = e.split("&");
                for (var n = 0; n < e.length; n++) {
                  var r,
                    s = e[n].indexOf("="),
                    i = null;
                  0 <= s
                    ? ((r = e[n].substring(0, s)), (i = e[n].substring(s + 1)))
                    : (r = e[n]),
                    t(r, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
                }
              }
            })(n.i, function (e, t) {
              n.add(decodeURIComponent(e.replace(/\+/g, " ")), t);
            }));
      }
      function Xt(e, t) {
        Yt(e),
          (t = en(e, t)),
          kt(e.g.h, t) &&
            ((e.i = null),
            (e.h -= e.g.get(t).length),
            kt((e = e.g).h, t) &&
              (delete e.h[t], e.i--, e.g.length > 2 * e.i && Ct(e)));
      }
      function Jt(e, t) {
        return Yt(e), (t = en(e, t)), kt(e.g.h, t);
      }
      function Zt(e, t, n) {
        Xt(e, t),
          0 < n.length &&
            ((e.i = null), e.g.set(en(e, t), O(n)), (e.h += n.length));
      }
      function en(e, t) {
        return (t = String(t)), (t = e.j ? t.toLowerCase() : t);
      }
      ((y = Qt.prototype).add = function (e, t) {
        Yt(this), (this.i = null), (e = en(this, e));
        var n = this.g.get(e);
        return n || this.g.set(e, (n = [])), n.push(t), (this.h += 1), this;
      }),
        (y.forEach = function (n, r) {
          Yt(this),
            this.g.forEach(function (e, t) {
              L(
                e,
                function (e) {
                  n.call(r, e, t, this);
                },
                this
              );
            }, this);
        }),
        (y.T = function () {
          Yt(this);
          for (
            var e = this.g.R(), t = this.g.T(), n = [], r = 0;
            r < t.length;
            r++
          )
            for (var s = e[r], i = 0; i < s.length; i++) n.push(t[r]);
          return n;
        }),
        (y.R = function (e) {
          Yt(this);
          var t = [];
          if ("string" == typeof e)
            Jt(this, e) && (t = V(t, this.g.get(en(this, e))));
          else {
            e = this.g.R();
            for (var n = 0; n < e.length; n++) t = V(t, e[n]);
          }
          return t;
        }),
        (y.set = function (e, t) {
          return (
            Yt(this),
            (this.i = null),
            Jt(this, (e = en(this, e))) && (this.h -= this.g.get(e).length),
            this.g.set(e, [t]),
            (this.h += 1),
            this
          );
        }),
        (y.get = function (e, t) {
          return e && 0 < (e = this.R(e)).length ? String(e[0]) : t;
        }),
        (y.toString = function () {
          if (this.i) return this.i;
          if (!this.g) return "";
          for (var e = [], t = this.g.T(), n = 0; n < t.length; n++)
            for (
              var r = t[n],
                s = encodeURIComponent(String(r)),
                r = this.R(r),
                i = 0;
              i < r.length;
              i++
            ) {
              var a = s;
              "" !== r[i] && (a += "=" + encodeURIComponent(String(r[i]))),
                e.push(a);
            }
          return (this.i = e.join("&"));
        });
      var tn = class {
        constructor(e, t) {
          (this.h = e), (this.g = t);
        }
      };
      function nn(e) {
        (this.l = e || 10),
          (e = b.PerformanceNavigationTiming
            ? 0 < (e = b.performance.getEntriesByType("navigation")).length &&
              ("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol)
            : !!(b.g && b.g.Ea && b.g.Ea() && b.g.Ea().Zb)),
          (this.j = e ? this.l : 1),
          (this.g = null),
          1 < this.j && (this.g = new Set()),
          (this.h = null),
          (this.i = []);
      }
      var rn;
      function sn(e) {
        return e.h || (e.g && e.g.size >= e.j);
      }
      function an(e) {
        return e.h ? 1 : e.g ? e.g.size : 0;
      }
      function on(e, t) {
        return e.h ? e.h == t : e.g && e.g.has(t);
      }
      function un(e, t) {
        e.g ? e.g.add(t) : (e.h = t);
      }
      function hn(e, t) {
        e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
      }
      function cn(t) {
        if (null != t.h) return t.i.concat(t.h.D);
        if (null == t.g || 0 === t.g.size) return O(t.i);
        {
          let e = t.i;
          for (const n of t.g.values()) e = e.concat(n.D);
          return e;
        }
      }
      function ln() {}
      function dn() {
        this.g = new ln();
      }
      function fn(e, t, n, r, s) {
        try {
          (t.onload = null),
            (t.onerror = null),
            (t.onabort = null),
            (t.ontimeout = null),
            s(r);
        } catch (e) {}
      }
      function gn(e) {
        (this.l = e.$b || null), (this.j = e.ib || !1);
      }
      function mn(e, t) {
        xe.call(this),
          (this.D = e),
          (this.u = t),
          (this.m = void 0),
          (this.readyState = pn),
          (this.status = 0),
          (this.responseType =
            this.responseText =
            this.response =
            this.statusText =
              ""),
          (this.onreadystatechange = null),
          (this.v = new Headers()),
          (this.h = null),
          (this.C = "GET"),
          (this.B = ""),
          (this.g = !1),
          (this.A = this.j = this.l = null);
      }
      (nn.prototype.cancel = function () {
        if (((this.i = cn(this)), this.h)) this.h.cancel(), (this.h = null);
        else if (this.g && 0 !== this.g.size) {
          for (const e of this.g.values()) e.cancel();
          this.g.clear();
        }
      }),
        (ln.prototype.stringify = function (e) {
          return b.JSON.stringify(e, void 0);
        }),
        (ln.prototype.parse = function (e) {
          return b.JSON.parse(e, void 0);
        }),
        C(gn, at),
        (gn.prototype.g = function () {
          return new mn(this.l, this.j);
        }),
        (gn.prototype.i =
          ((rn = {}),
          function () {
            return rn;
          })),
        C(mn, xe);
      var pn = 0;
      function yn(e) {
        e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e));
      }
      function vn(e) {
        (e.readyState = 4), (e.l = null), (e.j = null), (e.A = null), wn(e);
      }
      function wn(e) {
        e.onreadystatechange && e.onreadystatechange.call(e);
      }
      ((y = mn.prototype).open = function (e, t) {
        if (this.readyState != pn)
          throw (this.abort(), Error("Error reopening a connection"));
        (this.C = e), (this.B = t), (this.readyState = 1), wn(this);
      }),
        (y.send = function (e) {
          if (1 != this.readyState)
            throw (this.abort(), Error("need to call open() first. "));
          this.g = !0;
          const t = {
            headers: this.v,
            method: this.C,
            credentials: this.m,
            cache: void 0,
          };
          e && (t.body = e),
            (this.D || b)
              .fetch(new Request(this.B, t))
              .then(this.Va.bind(this), this.ha.bind(this));
        }),
        (y.abort = function () {
          (this.response = this.responseText = ""),
            (this.v = new Headers()),
            (this.status = 0),
            this.j && this.j.cancel("Request was aborted."),
            1 <= this.readyState &&
              this.g &&
              4 != this.readyState &&
              ((this.g = !1), vn(this)),
            (this.readyState = pn);
        }),
        (y.Va = function (e) {
          if (
            this.g &&
            ((this.l = e),
            this.h ||
              ((this.status = this.l.status),
              (this.statusText = this.l.statusText),
              (this.h = e.headers),
              (this.readyState = 2),
              wn(this)),
            this.g && ((this.readyState = 3), wn(this), this.g))
          )
            if ("arraybuffer" === this.responseType)
              e.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));
            else if (void 0 !== b.ReadableStream && "body" in e) {
              if (((this.j = e.body.getReader()), this.u)) {
                if (this.responseType)
                  throw Error(
                    'responseType must be empty for "streamBinaryChunks" mode responses.'
                  );
                this.response = [];
              } else
                (this.response = this.responseText = ""),
                  (this.A = new TextDecoder());
              yn(this);
            } else e.text().then(this.Ua.bind(this), this.ha.bind(this));
        }),
        (y.Sa = function (e) {
          var t;
          this.g &&
            (this.u && e.value
              ? this.response.push(e.value)
              : this.u ||
                ((t = e.value || new Uint8Array(0)),
                (t = this.A.decode(t, { stream: !e.done })) &&
                  (this.response = this.responseText += t)),
            (e.done ? vn : wn)(this),
            3 == this.readyState && yn(this));
        }),
        (y.Ua = function (e) {
          this.g && ((this.response = this.responseText = e), vn(this));
        }),
        (y.Ta = function (e) {
          this.g && ((this.response = e), vn(this));
        }),
        (y.ha = function () {
          this.g && vn(this);
        }),
        (y.setRequestHeader = function (e, t) {
          this.v.append(e, t);
        }),
        (y.getResponseHeader = function (e) {
          return (this.h && this.h.get(e.toLowerCase())) || "";
        }),
        (y.getAllResponseHeaders = function () {
          if (!this.h) return "";
          const e = [],
            t = this.h.entries();
          for (var n = t.next(); !n.done; )
            (n = n.value), e.push(n[0] + ": " + n[1]), (n = t.next());
          return e.join("\r\n");
        }),
        Object.defineProperty(mn.prototype, "withCredentials", {
          get: function () {
            return "include" === this.m;
          },
          set: function (e) {
            this.m = e ? "include" : "same-origin";
          },
        });
      var bn = b.JSON.parse;
      function In(e) {
        xe.call(this),
          (this.headers = new Nt()),
          (this.u = e || null),
          (this.h = !1),
          (this.C = this.g = null),
          (this.H = ""),
          (this.m = 0),
          (this.j = ""),
          (this.l = this.F = this.v = this.D = !1),
          (this.B = 0),
          (this.A = null),
          (this.J = En),
          (this.K = this.L = !1);
      }
      C(In, xe);
      var En = "",
        Tn = /^https?$/i,
        _n = ["POST", "PUT"];
      function Sn(e) {
        return "content-type" == e.toLowerCase();
      }
      function An(e, t) {
        (e.h = !1),
          e.g && ((e.l = !0), e.g.abort(), (e.l = !1)),
          (e.j = t),
          (e.m = 5),
          Dn(e),
          Nn(e);
      }
      function Dn(e) {
        e.D || ((e.D = !0), Ne(e, "complete"), Ne(e, "error"));
      }
      function xn(e) {
        if (e.h && void 0 !== w && (!e.C[1] || 4 != kn(e) || 2 != e.ba()))
          if (e.v && 4 == kn(e)) Be(e.Fa, 0, e);
          else if ((Ne(e, "readystatechange"), 4 == kn(e))) {
            e.h = !1;
            try {
              var t,
                n,
                r,
                s,
                i = e.ba();
              e: switch (i) {
                case 200:
                case 201:
                case 202:
                case 204:
                case 206:
                case 304:
                case 1223:
                  var a = !0;
                  break e;
                default:
                  a = !1;
              }
              if (
                ((t = a) ||
                  ((n = 0 === i) &&
                    (!(s = String(e.H).match(Rt)[1] || null) &&
                      b.self &&
                      b.self.location &&
                      (s = (r = b.self.location.protocol).substr(
                        0,
                        r.length - 1
                      )),
                    (n = !Tn.test(s ? s.toLowerCase() : ""))),
                  (t = n)),
                t)
              )
                Ne(e, "complete"), Ne(e, "success");
              else {
                e.m = 6;
                try {
                  var o = 2 < kn(e) ? e.g.statusText : "";
                } catch (e) {
                  o = "";
                }
                (e.j = o + " [" + e.ba() + "]"), Dn(e);
              }
            } finally {
              Nn(e);
            }
          }
      }
      function Nn(e, t) {
        if (e.g) {
          Cn(e);
          const n = e.g,
            r = e.C[0] ? I : null;
          (e.g = null), (e.C = null), t || Ne(e, "ready");
          try {
            n.onreadystatechange = r;
          } catch (e) {}
        }
      }
      function Cn(e) {
        e.g && e.K && (e.g.ontimeout = null),
          e.A && (b.clearTimeout(e.A), (e.A = null));
      }
      function kn(e) {
        return e.g ? e.g.readyState : 0;
      }
      function Rn(e) {
        try {
          if (!e.g) return null;
          if ("response" in e.g) return e.g.response;
          switch (e.J) {
            case En:
            case "text":
              return e.g.responseText;
            case "arraybuffer":
              if ("mozResponseArrayBuffer" in e.g)
                return e.g.mozResponseArrayBuffer;
          }
          return null;
        } catch (e) {
          return null;
        }
      }
      function Mn(e, t, n) {
        e: {
          for (r in n) {
            var r = !1;
            break e;
          }
          r = !0;
        }
        r ||
          ((n = (function (e) {
            let n = "";
            return (
              j(e, function (e, t) {
                (n += t), (n += ":"), (n += e), (n += "\r\n");
              }),
              n
            );
          })(n)),
          "string" == typeof e
            ? null != n && encodeURIComponent(String(n))
            : qt(e, t, n));
      }
      function Ln(e, t, n) {
        return (
          (n && n.internalChannelParams && n.internalChannelParams[e]) || t
        );
      }
      function Vn(e) {
        (this.za = 0),
          (this.l = []),
          (this.h = new We()),
          (this.la =
            this.oa =
            this.F =
            this.W =
            this.g =
            this.sa =
            this.D =
            this.aa =
            this.o =
            this.P =
            this.s =
              null),
          (this.Za = this.V = 0),
          (this.Xa = Ln("failFast", !1, e)),
          (this.N = this.v = this.u = this.m = this.j = null),
          (this.X = !0),
          (this.I = this.ta = this.U = -1),
          (this.Y = this.A = this.C = 0),
          (this.Pa = Ln("baseRetryDelayMs", 5e3, e)),
          (this.$a = Ln("retryDelaySeedMs", 1e4, e)),
          (this.Ya = Ln("forwardChannelMaxRetries", 2, e)),
          (this.ra = Ln("forwardChannelRequestTimeoutMs", 2e4, e)),
          (this.qa = (e && e.xmlHttpFactory) || void 0),
          (this.Ba = (e && e.Yb) || !1),
          (this.K = void 0),
          (this.H = (e && e.supportsCrossDomainXhr) || !1),
          (this.J = ""),
          (this.i = new nn(e && e.concurrentRequestLimit)),
          (this.Ca = new dn()),
          (this.ja = (e && e.fastHandshake) || !1),
          (this.Ra = (e && e.Wb) || !1),
          e && e.Aa && this.h.Aa(),
          e && e.forceLongPolling && (this.X = !1),
          (this.$ = (!this.ja && this.X && e && e.detectBufferingProxy) || !1),
          (this.ka = void 0),
          (this.O = 0),
          (this.L = !1),
          (this.B = null),
          (this.Wa = !e || !1 !== e.Xb);
      }
      function On(e) {
        var t, n;
        Fn(e),
          3 == e.G &&
            ((t = e.V++),
            qt((n = Lt(e.F)), "SID", e.J),
            qt(n, "RID", t),
            qt(n, "TYPE", "terminate"),
            Gn(e, n),
            ((t = new dt(e, e.h, t, void 0)).K = 2),
            (t.v = Ut(Lt(n))),
            (n = !1),
            !(n =
              b.navigator && b.navigator.sendBeacon
                ? b.navigator.sendBeacon(t.v.toString(), "")
                : n) &&
              b.Image &&
              ((new Image().src = t.v), (n = !0)),
            n || ((t.g = er(t.l, null)), t.g.ea(t.v)),
            (t.F = Date.now()),
            Et(t)),
          Jn(e);
      }
      function Pn(e) {
        e.g && (zn(e), e.g.cancel(), (e.g = null));
      }
      function Fn(e) {
        Pn(e),
          e.u && (b.clearTimeout(e.u), (e.u = null)),
          Hn(e),
          e.i.cancel(),
          e.m && ("number" == typeof e.m && b.clearTimeout(e.m), (e.m = null));
      }
      function qn(e, t) {
        e.l.push(new tn(e.Za++, t)), 3 == e.G && Un(e);
      }
      function Un(e) {
        sn(e.i) || e.m || ((e.m = !0), Ve(e.Ha, e), (e.C = 0));
      }
      function Bn(e, t) {
        var n = t ? t.m : e.V++,
          r = Lt(e.F);
        qt(r, "SID", e.J),
          qt(r, "RID", n),
          qt(r, "AID", e.U),
          Gn(e, r),
          e.o && e.s && Mn(r, e.o, e.s),
          (n = new dt(e, e.h, n, e.C + 1)),
          null === e.o && (n.H = e.s),
          t && (e.l = t.D.concat(e.l)),
          (t = jn(e, n, 1e3)),
          n.setTimeout(
            Math.round(0.5 * e.ra) + Math.round(0.5 * e.ra * Math.random())
          ),
          un(e.i, n),
          vt(n, r, t);
      }
      function Gn(e, n) {
        e.j &&
          xt({}, function (e, t) {
            qt(n, t, e);
          });
      }
      function jn(e, t, r) {
        r = Math.min(e.l.length, r);
        var s = e.j ? x(e.j.Oa, e.j, e) : null;
        e: {
          var i = e.l;
          let n = -1;
          for (;;) {
            const u = ["count=" + r];
            -1 == n
              ? 0 < r
                ? ((n = i[0].h), u.push("ofs=" + n))
                : (n = 0)
              : u.push("ofs=" + n);
            let e = !0;
            for (let t = 0; t < r; t++) {
              var a = i[t].h,
                o = i[t].g;
              if ((a -= n) < 0) (n = Math.max(0, i[t].h - 100)), (e = !1);
              else
                try {
                  !(function (e, r, t) {
                    const s = t || "";
                    try {
                      xt(e, function (e, t) {
                        let n = e;
                        T(e) && (n = ke(e)),
                          r.push(s + t + "=" + encodeURIComponent(n));
                      });
                    } catch (e) {
                      throw (
                        (r.push(s + "type=" + encodeURIComponent("_badmap")), e)
                      );
                    }
                  })(o, u, "req" + a + "_");
                } catch (e) {
                  s && s(o);
                }
            }
            if (e) {
              s = u.join("&");
              break e;
            }
          }
        }
        return (e = e.l.splice(0, r)), (t.D = e), s;
      }
      function Kn(e) {
        e.g || e.u || ((e.Y = 1), Ve(e.Ga, e), (e.A = 0));
      }
      function $n(e) {
        return (
          !(e.g || e.u || 3 <= e.A) &&
          (e.Y++, (e.u = rt(x(e.Ga, e), Yn(e, e.A))), e.A++, 1)
        );
      }
      function zn(e) {
        null != e.B && (b.clearTimeout(e.B), (e.B = null));
      }
      function Wn(e) {
        (e.g = new dt(e, e.h, "rpc", e.Y)),
          null === e.o && (e.g.H = e.s),
          (e.g.O = 0);
        var t = Lt(e.oa);
        qt(t, "RID", "rpc"),
          qt(t, "SID", e.J),
          qt(t, "CI", e.N ? "0" : "1"),
          qt(t, "AID", e.U),
          Gn(e, t),
          qt(t, "TYPE", "xmlhttp"),
          e.o && e.s && Mn(t, e.o, e.s),
          e.K && e.g.setTimeout(e.K);
        var n = e.g;
        (e = e.la),
          (n.K = 1),
          (n.v = Ut(Lt(t))),
          (n.s = null),
          (n.U = !0),
          wt(n, e);
      }
      function Hn(e) {
        null != e.v && (b.clearTimeout(e.v), (e.v = null));
      }
      function Qn(e, t) {
        var n,
          r,
          s,
          i = null;
        if (e.g == t) {
          Hn(e), zn(e), (e.g = null);
          var a = 2;
        } else {
          if (!on(e.i, t)) return;
          (i = t.D), hn(e.i, t), (a = 1);
        }
        if (((e.I = t.N), 0 != e.G))
          if (t.i)
            1 == a
              ? ((i = t.s ? t.s.length : 0),
                (t = Date.now() - t.F),
                (n = e.C),
                Ne((a = Xe()), new nt(a, i)),
                Un(e))
              : Kn(e);
          else if (
            3 == (n = t.o) ||
            (0 == n && 0 < e.I) ||
            ((1 != a ||
              ((s = t),
              an((r = e).i) >= r.i.j - (r.m ? 1 : 0) ||
                (r.m
                  ? ((r.l = s.D.concat(r.l)), 0)
                  : 1 == r.G ||
                    2 == r.G ||
                    r.C >= (r.Xa ? 0 : r.Ya) ||
                    ((r.m = rt(x(r.Ha, r, s), Yn(r, r.C))), r.C++, 0)))) &&
              (2 != a || !$n(e)))
          )
            switch (
              (i && 0 < i.length && ((t = e.i), (t.i = t.i.concat(i))), n)
            ) {
              case 1:
                Xn(e, 5);
                break;
              case 4:
                Xn(e, 10);
                break;
              case 3:
                Xn(e, 6);
                break;
              default:
                Xn(e, 2);
            }
      }
      function Yn(e, t) {
        let n = e.Pa + Math.floor(Math.random() * e.$a);
        return e.j || (n *= 2), n * t;
      }
      function Xn(e, t) {
        var n, r;
        e.h.info("Error code " + t),
          2 == t
            ? ((n = null),
              e.j && (n = null),
              (r = x(e.jb, e)),
              n ||
                ((n = new Mt("//www.google.com/images/cleardot.gif")),
                (b.location && "http" == b.location.protocol) || Vt(n, "https"),
                Ut(n)),
              (function (e, t) {
                var n = new We();
                if (b.Image) {
                  const r = new Image();
                  (r.onload = N(fn, n, r, "TestLoadImage: loaded", !0, t)),
                    (r.onerror = N(fn, n, r, "TestLoadImage: error", !1, t)),
                    (r.onabort = N(fn, n, r, "TestLoadImage: abort", !1, t)),
                    (r.ontimeout = N(
                      fn,
                      n,
                      r,
                      "TestLoadImage: timeout",
                      !1,
                      t
                    )),
                    b.setTimeout(function () {
                      r.ontimeout && r.ontimeout();
                    }, 1e4),
                    (r.src = e);
                } else t(!1);
              })(n.toString(), r))
            : tt(2),
          (e.G = 0),
          e.j && e.j.va(t),
          Jn(e),
          Fn(e);
      }
      function Jn(e) {
        (e.G = 0),
          (e.I = -1),
          e.j &&
            ((0 == cn(e.i).length && 0 == e.l.length) ||
              ((e.i.i.length = 0), O(e.l), (e.l.length = 0)),
            e.j.ua());
      }
      function Zn(e, t, n) {
        let r = (o = n) instanceof Mt ? Lt(o) : new Mt(o, void 0);
        var s, i, a, o, u;
        return (
          "" != r.i
            ? (t && Ot(r, t + "." + r.i), Pt(r, r.m))
            : ((u = b.location),
              (r =
                ((s = u.protocol),
                (i = t ? t + "." + u.hostname : u.hostname),
                (a = +u.port),
                (o = n),
                (u = new Mt(null, void 0)),
                s && Vt(u, s),
                i && Ot(u, i),
                a && Pt(u, a),
                o && (u.l = o),
                u))),
          e.aa &&
            j(e.aa, function (e, t) {
              qt(r, t, e);
            }),
          (t = e.D),
          (n = e.sa),
          t && n && qt(r, t, n),
          qt(r, "VER", e.ma),
          Gn(e, r),
          r
        );
      }
      function er(e, t, n) {
        if (t && !e.H)
          throw Error("Can't create secondary domain capable XhrIo object.");
        return (
          ((t =
            n && e.Ba && !e.qa ? new In(new gn({ ib: !0 })) : new In(e.qa)).L =
            e.H),
          t
        );
      }
      function tr() {}
      function nr() {
        if (Y && !(10 <= Number(ae)))
          throw Error("Environmental error: no available transport.");
      }
      function rr(e, t) {
        xe.call(this),
          (this.g = new Vn(t)),
          (this.l = e),
          (this.h = (t && t.messageUrlParams) || null),
          (e = (t && t.messageHeaders) || null),
          t &&
            t.clientProtocolHeaderRequired &&
            (e
              ? (e["X-Client-Protocol"] = "webchannel")
              : (e = { "X-Client-Protocol": "webchannel" })),
          (this.g.s = e),
          (e = (t && t.initMessageHeaders) || null),
          t &&
            t.messageContentType &&
            (e
              ? (e["X-WebChannel-Content-Type"] = t.messageContentType)
              : (e = { "X-WebChannel-Content-Type": t.messageContentType })),
          t &&
            t.ya &&
            (e
              ? (e["X-WebChannel-Client-Profile"] = t.ya)
              : (e = { "X-WebChannel-Client-Profile": t.ya })),
          (this.g.P = e),
          (e = t && t.httpHeadersOverwriteParam) && !P(e) && (this.g.o = e),
          (this.A = (t && t.supportsCrossDomainXhr) || !1),
          (this.v = (t && t.sendRawJson) || !1),
          (t = t && t.httpSessionIdParam) &&
            !P(t) &&
            ((this.g.D = t),
            null !== (e = this.h) &&
              t in e &&
              t in (e = this.h) &&
              delete e[t]),
          (this.j = new ar(this));
      }
      function sr(e) {
        ht.call(this);
        var t = e.__sm__;
        if (t) {
          e: {
            for (const n in t) {
              e = n;
              break e;
            }
            e = void 0;
          }
          (this.i = e) &&
            ((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
            (this.data = t);
        } else this.data = e;
      }
      function ir() {
        ct.call(this), (this.status = 1);
      }
      function ar(e) {
        this.g = e;
      }
      ((y = In.prototype).ea = function (e, t, n, r) {
        if (this.g)
          throw Error(
            "[goog.net.XhrIo] Object is active with another request=" +
              this.H +
              "; newUri=" +
              e
          );
        (t = t ? t.toUpperCase() : "GET"),
          (this.H = e),
          (this.j = ""),
          (this.m = 0),
          (this.D = !1),
          (this.h = !0),
          (this.g = (this.u || gt).g()),
          (this.C = this.u ? ot(this.u) : ot(gt)),
          (this.g.onreadystatechange = x(this.Fa, this));
        try {
          (this.F = !0), this.g.open(t, String(e), !0), (this.F = !1);
        } catch (e) {
          return void An(this, e);
        }
        e = n || "";
        const s = new Nt(this.headers);
        r &&
          xt(r, function (e, t) {
            s.set(t, e);
          }),
          (r = (function (t) {
            e: {
              var n = Sn,
                r = t.length,
                s = "string" == typeof t ? t.split("") : t;
              for (let e = 0; e < r; e++)
                if (e in s && n.call(void 0, s[e], e, t)) {
                  n = e;
                  break e;
                }
              n = -1;
            }
            return n < 0 ? null : "string" == typeof t ? t.charAt(n) : t[n];
          })(s.T())),
          (n = b.FormData && e instanceof b.FormData),
          0 <= M(_n, t) &&
            !r &&
            !n &&
            s.set(
              "Content-Type",
              "application/x-www-form-urlencoded;charset=utf-8"
            ),
          s.forEach(function (e, t) {
            this.g.setRequestHeader(t, e);
          }, this),
          this.J && (this.g.responseType = this.J),
          "withCredentials" in this.g &&
            this.g.withCredentials !== this.L &&
            (this.g.withCredentials = this.L);
        try {
          Cn(this),
            0 < this.B &&
              ((this.K =
                ((i = this.g),
                Y &&
                  ie() &&
                  "number" == typeof i.timeout &&
                  void 0 !== i.ontimeout))
                ? ((this.g.timeout = this.B),
                  (this.g.ontimeout = x(this.pa, this)))
                : (this.A = Be(this.pa, this.B, this))),
            (this.v = !0),
            this.g.send(e),
            (this.v = !1);
        } catch (e) {
          An(this, e);
        }
        var i;
      }),
        (y.pa = function () {
          void 0 !== w &&
            this.g &&
            ((this.j = "Timed out after " + this.B + "ms, aborting"),
            (this.m = 8),
            Ne(this, "timeout"),
            this.abort(8));
        }),
        (y.abort = function (e) {
          this.g &&
            this.h &&
            ((this.h = !1),
            (this.l = !0),
            this.g.abort(),
            (this.l = !1),
            (this.m = e || 7),
            Ne(this, "complete"),
            Ne(this, "abort"),
            Nn(this));
        }),
        (y.M = function () {
          this.g &&
            (this.h &&
              ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
            Nn(this, !0)),
            In.Z.M.call(this);
        }),
        (y.Fa = function () {
          this.s || (this.F || this.v || this.l ? xn(this) : this.cb());
        }),
        (y.cb = function () {
          xn(this);
        }),
        (y.ba = function () {
          try {
            return 2 < kn(this) ? this.g.status : -1;
          } catch (e) {
            return -1;
          }
        }),
        (y.ga = function () {
          try {
            return this.g ? this.g.responseText : "";
          } catch (e) {
            return "";
          }
        }),
        (y.Qa = function (e) {
          if (this.g) {
            var t = this.g.responseText;
            return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), bn(t);
          }
        }),
        (y.Da = function () {
          return this.m;
        }),
        (y.La = function () {
          return "string" == typeof this.j ? this.j : String(this.j);
        }),
        ((y = Vn.prototype).ma = 8),
        (y.G = 1),
        (y.hb = function (e) {
          try {
            this.h.info("Origin Trials invoked: " + e);
          } catch (e) {}
        }),
        (y.Ha = function (t) {
          if (this.m)
            if (((this.m = null), 1 == this.G)) {
              if (!t) {
                (this.V = Math.floor(1e5 * Math.random())), (t = this.V++);
                const i = new dt(this, this.h, t, void 0);
                let e = this.s;
                if (
                  (this.P && (e ? ((e = K(e)), z(e, this.P)) : (e = this.P)),
                  null === this.o && (i.H = e),
                  this.ja)
                )
                  e: {
                    for (var n = 0, r = 0; r < this.l.length; r++) {
                      var s = this.l[r];
                      if (
                        ("__data__" in s.g &&
                        "string" == typeof (s = s.g.__data__)
                          ? (s = s.length)
                          : (s = void 0),
                        void 0 === s)
                      )
                        break;
                      if (4096 < (n += s)) {
                        n = r;
                        break e;
                      }
                      if (4096 === n || r === this.l.length - 1) {
                        n = r + 1;
                        break e;
                      }
                    }
                    n = 1e3;
                  }
                else n = 1e3;
                (n = jn(this, i, n)),
                  qt((r = Lt(this.F)), "RID", t),
                  qt(r, "CVER", 22),
                  this.D && qt(r, "X-HTTP-Session-Id", this.D),
                  Gn(this, r),
                  this.o && e && Mn(r, this.o, e),
                  un(this.i, i),
                  this.Ra && qt(r, "TYPE", "init"),
                  this.ja
                    ? (qt(r, "$req", n),
                      qt(r, "SID", "null"),
                      (i.$ = !0),
                      vt(i, r, null))
                    : vt(i, r, n),
                  (this.G = 2);
              }
            } else
              3 == this.G &&
                (t
                  ? Bn(this, t)
                  : 0 == this.l.length || sn(this.i) || Bn(this));
        }),
        (y.Ga = function () {
          var e;
          (this.u = null),
            Wn(this),
            this.$ &&
              !(this.L || null == this.g || this.O <= 0) &&
              ((e = 2 * this.O),
              this.h.info("BP detection timer enabled: " + e),
              (this.B = rt(x(this.bb, this), e)));
        }),
        (y.bb = function () {
          this.B &&
            ((this.B = null),
            this.h.info("BP detection timeout reached."),
            this.h.info("Buffering proxy detected and switch to long-polling!"),
            (this.N = !1),
            (this.L = !0),
            tt(10),
            Pn(this),
            Wn(this));
        }),
        (y.ab = function () {
          null != this.v && ((this.v = null), Pn(this), $n(this), tt(19));
        }),
        (y.jb = function (e) {
          e
            ? (this.h.info("Successfully pinged google.com"), tt(2))
            : (this.h.info("Failed to ping google.com"), tt(1));
        }),
        ((y = tr.prototype).xa = function () {}),
        (y.wa = function () {}),
        (y.va = function () {}),
        (y.ua = function () {}),
        (y.Oa = function () {}),
        (nr.prototype.g = function (e, t) {
          return new rr(e, t);
        }),
        C(rr, xe),
        (rr.prototype.m = function () {
          (this.g.j = this.j), this.A && (this.g.H = !0);
          var e = this.g,
            t = this.l,
            n = this.h || void 0;
          e.Wa && (e.h.info("Origin Trials enabled."), Ve(x(e.hb, e, t))),
            tt(0),
            (e.W = t),
            (e.aa = n || {}),
            (e.N = e.X),
            (e.F = Zn(e, null, e.W)),
            Un(e);
        }),
        (rr.prototype.close = function () {
          On(this.g);
        }),
        (rr.prototype.u = function (e) {
          var t;
          "string" == typeof e
            ? (((t = {}).__data__ = e), qn(this.g, t))
            : this.v
            ? (((t = {}).__data__ = ke(e)), qn(this.g, t))
            : qn(this.g, e);
        }),
        (rr.prototype.M = function () {
          (this.g.j = null),
            delete this.j,
            On(this.g),
            delete this.g,
            rr.Z.M.call(this);
        }),
        C(sr, ht),
        C(ir, ct),
        C(ar, tr),
        (ar.prototype.xa = function () {
          Ne(this.g, "a");
        }),
        (ar.prototype.wa = function (e) {
          Ne(this.g, new sr(e));
        }),
        (ar.prototype.va = function (e) {
          Ne(this.g, new ir());
        }),
        (ar.prototype.ua = function () {
          Ne(this.g, "b");
        }),
        (nr.prototype.createWebChannel = nr.prototype.g),
        (rr.prototype.send = rr.prototype.u),
        (rr.prototype.open = rr.prototype.m),
        (st.NO_ERROR = 0),
        (st.TIMEOUT = 8),
        (st.HTTP_ERROR = 6),
        (it.COMPLETE = "complete"),
        ((ut.EventType = v).OPEN = "a"),
        (v.CLOSE = "b"),
        (v.ERROR = "c"),
        (v.MESSAGE = "d"),
        (xe.prototype.listen = xe.prototype.N),
        (In.prototype.listenOnce = In.prototype.O),
        (In.prototype.getLastError = In.prototype.La),
        (In.prototype.getLastErrorCode = In.prototype.Da),
        (In.prototype.getStatus = In.prototype.ba),
        (In.prototype.getResponseJson = In.prototype.Qa),
        (In.prototype.getResponseText = In.prototype.ga),
        (In.prototype.send = In.prototype.ea);
      var or,
        ur = Xe,
        hr = st,
        cr = it,
        lr = Qe,
        dr = 10,
        fr = 11,
        gr = gn,
        mr = ut,
        pr = In;
      const yr = "@firebase/firestore";
      class vr {
        constructor(e) {
          this.uid = e;
        }
        isAuthenticated() {
          return null != this.uid;
        }
        toKey() {
          return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(e) {
          return e.uid === this.uid;
        }
      }
      (vr.UNAUTHENTICATED = new vr(null)),
        (vr.GOOGLE_CREDENTIALS = new vr("google-credentials-uid")),
        (vr.FIRST_PARTY = new vr("first-party-uid")),
        (vr.MOCK_USER = new vr("mock-user"));
      let wr = "9.6.10";
      const br = new (class {
        constructor(e) {
          (this.name = e),
            (this._logLevel = d),
            (this._logHandler = p),
            (this._userLogHandler = null);
        }
        get logLevel() {
          return this._logLevel;
        }
        set logLevel(e) {
          if (!(e in l))
            throw new TypeError(
              `Invalid value "${e}" assigned to \`logLevel\``
            );
          this._logLevel = e;
        }
        setLogLevel(e) {
          this._logLevel = "string" == typeof e ? c[e] : e;
        }
        get logHandler() {
          return this._logHandler;
        }
        set logHandler(e) {
          if ("function" != typeof e)
            throw new TypeError(
              "Value assigned to `logHandler` must be a function"
            );
          this._logHandler = e;
        }
        get userLogHandler() {
          return this._userLogHandler;
        }
        set userLogHandler(e) {
          this._userLogHandler = e;
        }
        debug(...e) {
          this._userLogHandler && this._userLogHandler(this, l.DEBUG, ...e),
            this._logHandler(this, l.DEBUG, ...e);
        }
        log(...e) {
          this._userLogHandler && this._userLogHandler(this, l.VERBOSE, ...e),
            this._logHandler(this, l.VERBOSE, ...e);
        }
        info(...e) {
          this._userLogHandler && this._userLogHandler(this, l.INFO, ...e),
            this._logHandler(this, l.INFO, ...e);
        }
        warn(...e) {
          this._userLogHandler && this._userLogHandler(this, l.WARN, ...e),
            this._logHandler(this, l.WARN, ...e);
        }
        error(...e) {
          this._userLogHandler && this._userLogHandler(this, l.ERROR, ...e),
            this._logHandler(this, l.ERROR, ...e);
        }
      })("@firebase/firestore");
      function Ir() {
        return br.logLevel;
      }
      function Er(e, ...t) {
        var n;
        br.logLevel <= l.DEBUG &&
          ((n = t.map(Sr)), br.debug(`Firestore (${wr}): ${e}`, ...n));
      }
      function Tr(e, ...t) {
        var n;
        br.logLevel <= l.ERROR &&
          ((n = t.map(Sr)), br.error(`Firestore (${wr}): ${e}`, ...n));
      }
      function _r(e, ...t) {
        var n;
        br.logLevel <= l.WARN &&
          ((n = t.map(Sr)), br.warn(`Firestore (${wr}): ${e}`, ...n));
      }
      function Sr(t) {
        if ("string" == typeof t) return t;
        try {
          return JSON.stringify(t);
        } catch (e) {
          return t;
        }
      }
      function Ar(e = "Unexpected state") {
        var t = `FIRESTORE (${wr}) INTERNAL ASSERTION FAILED: ` + e;
        throw (Tr(t), new Error(t));
      }
      function Dr(e) {
        e || Ar();
      }
      const xr = {
        OK: "ok",
        CANCELLED: "cancelled",
        UNKNOWN: "unknown",
        INVALID_ARGUMENT: "invalid-argument",
        DEADLINE_EXCEEDED: "deadline-exceeded",
        NOT_FOUND: "not-found",
        ALREADY_EXISTS: "already-exists",
        PERMISSION_DENIED: "permission-denied",
        UNAUTHENTICATED: "unauthenticated",
        RESOURCE_EXHAUSTED: "resource-exhausted",
        FAILED_PRECONDITION: "failed-precondition",
        ABORTED: "aborted",
        OUT_OF_RANGE: "out-of-range",
        UNIMPLEMENTED: "unimplemented",
        INTERNAL: "internal",
        UNAVAILABLE: "unavailable",
        DATA_LOSS: "data-loss",
      };
      class Nr extends o {
        constructor(e, t) {
          super(e, t),
            (this.code = e),
            (this.message = t),
            (this.toString = () =>
              `${this.name}: [code=${this.code}]: ${this.message}`);
        }
      }
      class Cr {
        constructor() {
          this.promise = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          });
        }
      }
      class kr {
        constructor(e, t) {
          (this.user = t),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", `Bearer ${e}`);
        }
      }
      class Rr {
        getToken() {
          return Promise.resolve(null);
        }
        invalidateToken() {}
        start(e, t) {
          e.enqueueRetryable(() => t(vr.UNAUTHENTICATED));
        }
        shutdown() {}
      }
      class Mr {
        constructor(e) {
          (this.token = e), (this.changeListener = null);
        }
        getToken() {
          return Promise.resolve(this.token);
        }
        invalidateToken() {}
        start(e, t) {
          (this.changeListener = t),
            e.enqueueRetryable(() => t(this.token.user));
        }
        shutdown() {
          this.changeListener = null;
        }
      }
      class Lr {
        constructor(e) {
          (this.t = e),
            (this.currentUser = vr.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
        }
        start(t, n) {
          let r = this.i;
          const s = (e) =>
            this.i !== r ? ((r = this.i), n(e)) : Promise.resolve();
          let i = new Cr();
          this.o = () => {
            this.i++,
              (this.currentUser = this.u()),
              i.resolve(),
              (i = new Cr()),
              t.enqueueRetryable(() => s(this.currentUser));
          };
          const a = () => {
              const e = i;
              t.enqueueRetryable(async () => {
                await e.promise, await s(this.currentUser);
              });
            },
            o = (e) => {
              Er("FirebaseAuthCredentialsProvider", "Auth detected"),
                (this.auth = e),
                this.auth.addAuthTokenListener(this.o),
                a();
            };
          this.t.onInit((e) => o(e)),
            setTimeout(() => {
              var e;
              this.auth ||
                ((e = this.t.getImmediate({ optional: !0 }))
                  ? o(e)
                  : (Er(
                      "FirebaseAuthCredentialsProvider",
                      "Auth not yet detected"
                    ),
                    i.resolve(),
                    (i = new Cr())));
            }, 0),
            a();
        }
        getToken() {
          const t = this.i,
            e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.auth
              ? this.auth
                  .getToken(e)
                  .then((e) =>
                    this.i !== t
                      ? (Er(
                          "FirebaseAuthCredentialsProvider",
                          "getToken aborted due to token change."
                        ),
                        this.getToken())
                      : e
                      ? (Dr("string" == typeof e.accessToken),
                        new kr(e.accessToken, this.currentUser))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.auth && this.auth.removeAuthTokenListener(this.o);
        }
        u() {
          var e = this.auth && this.auth.getUid();
          return Dr(null === e || "string" == typeof e), new vr(e);
        }
      }
      class Vr {
        constructor(e, t, n) {
          (this.type = "FirstParty"),
            (this.user = vr.FIRST_PARTY),
            (this.headers = new Map()),
            this.headers.set("X-Goog-AuthUser", t);
          var r = e.auth.getAuthHeaderValueForFirstParty([]);
          r && this.headers.set("Authorization", r),
            n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
        }
      }
      class Or {
        constructor(e, t, n) {
          (this.h = e), (this.l = t), (this.m = n);
        }
        getToken() {
          return Promise.resolve(new Vr(this.h, this.l, this.m));
        }
        start(e, t) {
          e.enqueueRetryable(() => t(vr.FIRST_PARTY));
        }
        shutdown() {}
        invalidateToken() {}
      }
      class Pr {
        constructor(e) {
          (this.value = e),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            e &&
              0 < e.length &&
              this.headers.set("x-firebase-appcheck", this.value);
        }
      }
      class Fr {
        constructor(e) {
          (this.g = e),
            (this.forceRefresh = !1),
            (this.appCheck = null),
            (this.p = null);
        }
        start(t, n) {
          const r = (e) => {
            null != e.error &&
              Er(
                "FirebaseAppCheckTokenProvider",
                `Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`
              );
            var t = e.token !== this.p;
            return (
              (this.p = e.token),
              Er(
                "FirebaseAppCheckTokenProvider",
                `Received ${t ? "new" : "existing"} token.`
              ),
              t ? n(e.token) : Promise.resolve()
            );
          };
          this.o = (e) => {
            t.enqueueRetryable(() => r(e));
          };
          const s = (e) => {
            Er("FirebaseAppCheckTokenProvider", "AppCheck detected"),
              (this.appCheck = e),
              this.appCheck.addTokenListener(this.o);
          };
          this.g.onInit((e) => s(e)),
            setTimeout(() => {
              var e;
              this.appCheck ||
                ((e = this.g.getImmediate({ optional: !0 }))
                  ? s(e)
                  : Er(
                      "FirebaseAppCheckTokenProvider",
                      "AppCheck not yet detected"
                    ));
            }, 0);
        }
        getToken() {
          var e = this.forceRefresh;
          return (
            (this.forceRefresh = !1),
            this.appCheck
              ? this.appCheck
                  .getToken(e)
                  .then((e) =>
                    e
                      ? (Dr("string" == typeof e.token),
                        (this.p = e.token),
                        new Pr(e.token))
                      : null
                  )
              : Promise.resolve(null)
          );
        }
        invalidateToken() {
          this.forceRefresh = !0;
        }
        shutdown() {
          this.appCheck && this.appCheck.removeTokenListener(this.o);
        }
      }
      class qr {
        constructor(e, t) {
          (this.previousValue = e),
            t &&
              ((t.sequenceNumberHandler = (e) => this.I(e)),
              (this.T = (e) => t.writeSequenceNumber(e)));
        }
        I(e) {
          return (
            (this.previousValue = Math.max(e, this.previousValue)),
            this.previousValue
          );
        }
        next() {
          var e = ++this.previousValue;
          return this.T && this.T(e), e;
        }
      }
      qr.A = -1;
      class Ur {
        static R() {
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            n = Math.floor(256 / t.length) * t.length;
          let r = "";
          for (; r.length < 20; ) {
            var s = (function (t) {
              const n =
                  "undefined" != typeof self && (self.crypto || self.msCrypto),
                r = new Uint8Array(t);
              if (n && "function" == typeof n.getRandomValues)
                n.getRandomValues(r);
              else
                for (let e = 0; e < t; e++)
                  r[e] = Math.floor(256 * Math.random());
              return r;
            })(40);
            for (let e = 0; e < s.length; ++e)
              r.length < 20 && s[e] < n && (r += t.charAt(s[e] % t.length));
          }
          return r;
        }
      }
      function Br(e, t) {
        return e < t ? -1 : t < e ? 1 : 0;
      }
      function Gr(e, n, r) {
        return e.length === n.length && e.every((e, t) => r(e, n[t]));
      }
      function jr(e) {
        return e + "\0";
      }
      class Kr {
        constructor(e, t) {
          if (((this.seconds = e), (this.nanoseconds = t) < 0))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (1e9 <= t)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp nanoseconds out of range: " + t
            );
          if (e < -62135596800)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
          if (253402300800 <= e)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Timestamp seconds out of range: " + e
            );
        }
        static now() {
          return Kr.fromMillis(Date.now());
        }
        static fromDate(e) {
          return Kr.fromMillis(e.getTime());
        }
        static fromMillis(e) {
          var t = Math.floor(e / 1e3),
            n = Math.floor(1e6 * (e - 1e3 * t));
          return new Kr(t, n);
        }
        toDate() {
          return new Date(this.toMillis());
        }
        toMillis() {
          return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        _compareTo(e) {
          return this.seconds === e.seconds
            ? Br(this.nanoseconds, e.nanoseconds)
            : Br(this.seconds, e.seconds);
        }
        isEqual(e) {
          return (
            e.seconds === this.seconds && e.nanoseconds === this.nanoseconds
          );
        }
        toString() {
          return (
            "Timestamp(seconds=" +
            this.seconds +
            ", nanoseconds=" +
            this.nanoseconds +
            ")"
          );
        }
        toJSON() {
          return { seconds: this.seconds, nanoseconds: this.nanoseconds };
        }
        valueOf() {
          var e = this.seconds - -62135596800;
          return (
            String(e).padStart(12, "0") +
            "." +
            String(this.nanoseconds).padStart(9, "0")
          );
        }
      }
      class $r {
        constructor(e) {
          this.timestamp = e;
        }
        static fromTimestamp(e) {
          return new $r(e);
        }
        static min() {
          return new $r(new Kr(0, 0));
        }
        static max() {
          return new $r(new Kr(253402300799, 999999999));
        }
        compareTo(e) {
          return this.timestamp._compareTo(e.timestamp);
        }
        isEqual(e) {
          return this.timestamp.isEqual(e.timestamp);
        }
        toMicroseconds() {
          return (
            1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
          );
        }
        toString() {
          return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        toTimestamp() {
          return this.timestamp;
        }
      }
      function zr(e) {
        let t = 0;
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
        return t;
      }
      function Wr(e, t) {
        for (const n in e)
          Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n]);
      }
      function Hr(e) {
        for (const t in e)
          if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      class Qr {
        constructor(e, t, n) {
          void 0 === t ? (t = 0) : t > e.length && Ar(),
            void 0 === n ? (n = e.length - t) : n > e.length - t && Ar(),
            (this.segments = e),
            (this.offset = t),
            (this.len = n);
        }
        get length() {
          return this.len;
        }
        isEqual(e) {
          return 0 === Qr.comparator(this, e);
        }
        child(e) {
          const t = this.segments.slice(this.offset, this.limit());
          return (
            e instanceof Qr
              ? e.forEach((e) => {
                  t.push(e);
                })
              : t.push(e),
            this.construct(t)
          );
        }
        limit() {
          return this.offset + this.length;
        }
        popFirst(e) {
          return this.construct(
            this.segments,
            this.offset + (e = void 0 === e ? 1 : e),
            this.length - e
          );
        }
        popLast() {
          return this.construct(this.segments, this.offset, this.length - 1);
        }
        firstSegment() {
          return this.segments[this.offset];
        }
        lastSegment() {
          return this.get(this.length - 1);
        }
        get(e) {
          return this.segments[this.offset + e];
        }
        isEmpty() {
          return 0 === this.length;
        }
        isPrefixOf(e) {
          if (e.length < this.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        isImmediateParentOf(e) {
          if (this.length + 1 !== e.length) return !1;
          for (let t = 0; t < this.length; t++)
            if (this.get(t) !== e.get(t)) return !1;
          return !0;
        }
        forEach(e) {
          for (let t = this.offset, n = this.limit(); t < n; t++)
            e(this.segments[t]);
        }
        toArray() {
          return this.segments.slice(this.offset, this.limit());
        }
        static comparator(e, t) {
          const n = Math.min(e.length, t.length);
          for (let r = 0; r < n; r++) {
            const n = e.get(r),
              s = t.get(r);
            if (n < s) return -1;
            if (n > s) return 1;
          }
          return e.length < t.length ? -1 : e.length > t.length ? 1 : 0;
        }
      }
      class Yr extends Qr {
        construct(e, t, n) {
          return new Yr(e, t, n);
        }
        canonicalString() {
          return this.toArray().join("/");
        }
        toString() {
          return this.canonicalString();
        }
        static fromString(...e) {
          const t = [];
          for (const n of e) {
            if (0 <= n.indexOf("//"))
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Invalid segment (${n}). Paths must not contain // in them.`
              );
            t.push(...n.split("/").filter((e) => 0 < e.length));
          }
          return new Yr(t);
        }
        static emptyPath() {
          return new Yr([]);
        }
      }
      const Xr = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
      class Jr extends Qr {
        construct(e, t, n) {
          return new Jr(e, t, n);
        }
        static isValidIdentifier(e) {
          return Xr.test(e);
        }
        canonicalString() {
          return this.toArray()
            .map(
              (e) => (
                (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                (e = !Jr.isValidIdentifier(e) ? "`" + e + "`" : e)
              )
            )
            .join(".");
        }
        toString() {
          return this.canonicalString();
        }
        isKeyField() {
          return 1 === this.length && "__name__" === this.get(0);
        }
        static keyField() {
          return new Jr(["__name__"]);
        }
        static fromServerFormat(e) {
          const t = [];
          let n = "",
            r = 0;
          var s = () => {
            if (0 === n.length)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
              );
            t.push(n), (n = "");
          };
          let i = !1;
          for (; r < e.length; ) {
            const t = e[r];
            if ("\\" === t) {
              if (r + 1 === e.length)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  "Path has trailing escape character: " + e
                );
              const t = e[r + 1];
              if ("\\" !== t && "." !== t && "`" !== t)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  "Path has invalid escape sequence: " + e
                );
              (n += t), (r += 2);
            } else "`" === t ? (i = !i) : "." !== t || i ? (n += t) : s(), r++;
          }
          if ((s(), i))
            throw new Nr(xr.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
          return new Jr(t);
        }
        static emptyPath() {
          return new Jr([]);
        }
      }
      class Zr {
        constructor(e) {
          (this.fields = e).sort(Jr.comparator);
        }
        covers(e) {
          for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
          return !1;
        }
        isEqual(e) {
          return Gr(this.fields, e.fields, (e, t) => e.isEqual(t));
        }
      }
      class es {
        constructor(e) {
          this.binaryString = e;
        }
        static fromBase64String(e) {
          var t = atob(e);
          return new es(t);
        }
        static fromUint8Array(e) {
          var t = (function (e) {
            let t = "";
            for (let n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
            return t;
          })(e);
          return new es(t);
        }
        [Symbol.iterator]() {
          let e = 0;
          return {
            next: () =>
              e < this.binaryString.length
                ? { value: this.binaryString.charCodeAt(e++), done: !1 }
                : { value: void 0, done: !0 },
          };
        }
        toBase64() {
          return (e = this.binaryString), btoa(e);
          var e;
        }
        toUint8Array() {
          return (function (e) {
            const t = new Uint8Array(e.length);
            for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
            return t;
          })(this.binaryString);
        }
        approximateByteSize() {
          return 2 * this.binaryString.length;
        }
        compareTo(e) {
          return Br(this.binaryString, e.binaryString);
        }
        isEqual(e) {
          return this.binaryString === e.binaryString;
        }
      }
      es.EMPTY_BYTE_STRING = new es("");
      const ts = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
      function ns(t) {
        if ((Dr(!!t), "string" != typeof t))
          return { seconds: rs(t.seconds), nanos: rs(t.nanos) };
        {
          let e = 0;
          var n = ts.exec(t);
          Dr(!!n),
            n[1] &&
              ((n = ((n = n[1]) + "000000000").substr(0, 9)), (e = Number(n)));
          const r = new Date(t);
          return { seconds: Math.floor(r.getTime() / 1e3), nanos: e };
        }
      }
      function rs(e) {
        return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
      }
      function ss(e) {
        return "string" == typeof e
          ? es.fromBase64String(e)
          : es.fromUint8Array(e);
      }
      function is(e) {
        var t;
        return (
          "server_timestamp" ===
          (null ===
            (t = (
              (null === (t = null == e ? void 0 : e.mapValue) || void 0 === t
                ? void 0
                : t.fields) || {}
            ).__type__) || void 0 === t
            ? void 0
            : t.stringValue)
        );
      }
      function as(e) {
        var t = ns(e.mapValue.fields.__local_write_time__.timestampValue);
        return new Kr(t.seconds, t.nanos);
      }
      class os {
        constructor(e, t, n, r, s, i, a, o) {
          (this.databaseId = e),
            (this.appId = t),
            (this.persistenceKey = n),
            (this.host = r),
            (this.ssl = s),
            (this.forceLongPolling = i),
            (this.autoDetectLongPolling = a),
            (this.useFetchStreams = o);
        }
      }
      class us {
        constructor(e, t) {
          (this.projectId = e), (this.database = t || "(default)");
        }
        static empty() {
          return new us("", "");
        }
        get isDefaultDatabase() {
          return "(default)" === this.database;
        }
        isEqual(e) {
          return (
            e instanceof us &&
            e.projectId === this.projectId &&
            e.database === this.database
          );
        }
      }
      function hs(e) {
        return null == e;
      }
      function cs(e) {
        return 0 === e && 1 / e == -1 / 0;
      }
      function ls(e) {
        return (
          "number" == typeof e &&
          Number.isInteger(e) &&
          !cs(e) &&
          e <= Number.MAX_SAFE_INTEGER &&
          e >= Number.MIN_SAFE_INTEGER
        );
      }
      class ds {
        constructor(e) {
          this.path = e;
        }
        static fromPath(e) {
          return new ds(Yr.fromString(e));
        }
        static fromName(e) {
          return new ds(Yr.fromString(e).popFirst(5));
        }
        static empty() {
          return new ds(Yr.emptyPath());
        }
        get collectionGroup() {
          return this.path.popLast().lastSegment();
        }
        hasCollectionId(e) {
          return (
            2 <= this.path.length && this.path.get(this.path.length - 2) === e
          );
        }
        getCollectionGroup() {
          return this.path.get(this.path.length - 2);
        }
        getCollectionPath() {
          return this.path.popLast();
        }
        isEqual(e) {
          return null !== e && 0 === Yr.comparator(this.path, e.path);
        }
        toString() {
          return this.path.toString();
        }
        static comparator(e, t) {
          return Yr.comparator(e.path, t.path);
        }
        static isDocumentKey(e) {
          return e.length % 2 == 0;
        }
        static fromSegments(e) {
          return new ds(new Yr(e.slice()));
        }
      }
      const fs = {
          mapValue: { fields: { __type__: { stringValue: "__max__" } } },
        },
        gs = { nullValue: "NULL_VALUE" };
      function ms(e) {
        return "nullValue" in e
          ? 0
          : "booleanValue" in e
          ? 1
          : "integerValue" in e || "doubleValue" in e
          ? 2
          : "timestampValue" in e
          ? 3
          : "stringValue" in e
          ? 5
          : "bytesValue" in e
          ? 6
          : "referenceValue" in e
          ? 7
          : "geoPointValue" in e
          ? 8
          : "arrayValue" in e
          ? 9
          : "mapValue" in e
          ? is(e)
            ? 4
            : xs(e)
            ? 9
            : 10
          : Ar();
      }
      function ps(r, s) {
        if (r === s) return !0;
        var e,
          t,
          n = ms(r);
        if (n !== ms(s)) return !1;
        switch (n) {
          case 0:
          case 9007199254740991:
            return !0;
          case 1:
            return r.booleanValue === s.booleanValue;
          case 4:
            return as(r).isEqual(as(s));
          case 3:
            return (function (e) {
              if (
                "string" == typeof r.timestampValue &&
                "string" == typeof e.timestampValue &&
                r.timestampValue.length === e.timestampValue.length
              )
                return r.timestampValue === e.timestampValue;
              var t = ns(r.timestampValue),
                n = ns(e.timestampValue);
              return t.seconds === n.seconds && t.nanos === n.nanos;
            })(s);
          case 5:
            return r.stringValue === s.stringValue;
          case 6:
            return (t = s), ss(r.bytesValue).isEqual(ss(t.bytesValue));
          case 7:
            return r.referenceValue === s.referenceValue;
          case 8:
            return (
              (e = s),
              rs((t = r).geoPointValue.latitude) ===
                rs(e.geoPointValue.latitude) &&
                rs(t.geoPointValue.longitude) === rs(e.geoPointValue.longitude)
            );
          case 2:
            return (function (e, t) {
              if ("integerValue" in e && "integerValue" in t)
                return rs(e.integerValue) === rs(t.integerValue);
              if ("doubleValue" in e && "doubleValue" in t) {
                var n = rs(e.doubleValue),
                  r = rs(t.doubleValue);
                return n === r ? cs(n) === cs(r) : isNaN(n) && isNaN(r);
              }
              return !1;
            })(r, s);
          case 9:
            return Gr(r.arrayValue.values || [], s.arrayValue.values || [], ps);
          case 10:
            return (function (e) {
              const t = e.mapValue.fields || {},
                n = s.mapValue.fields || {};
              if (zr(t) !== zr(n)) return !1;
              for (const e in t)
                if (t.hasOwnProperty(e) && (void 0 === n[e] || !ps(t[e], n[e])))
                  return !1;
              return !0;
            })(r);
          default:
            return Ar();
        }
      }
      function ys(e, t) {
        return void 0 !== (e.values || []).find((e) => ps(e, t));
      }
      function vs(e, t) {
        if (e === t) return 0;
        var n,
          r,
          s,
          i,
          a = ms(e),
          o = ms(t);
        if (a !== o) return Br(a, o);
        switch (a) {
          case 0:
          case 9007199254740991:
            return 0;
          case 1:
            return Br(e.booleanValue, t.booleanValue);
          case 2:
            return (
              (r = t),
              (s = rs(e.integerValue || e.doubleValue)),
              (i = rs(r.integerValue || r.doubleValue)),
              s < i
                ? -1
                : i < s
                ? 1
                : s === i
                ? 0
                : isNaN(s)
                ? isNaN(i)
                  ? 0
                  : -1
                : 1
            );
          case 3:
            return ws(e.timestampValue, t.timestampValue);
          case 4:
            return ws(as(e), as(t));
          case 5:
            return Br(e.stringValue, t.stringValue);
          case 6:
            return (function (e, t) {
              const n = ss(e),
                r = ss(t);
              return n.compareTo(r);
            })(e.bytesValue, t.bytesValue);
          case 7:
            return (function (e, t) {
              var n = e.split("/"),
                r = t.split("/");
              for (let s = 0; s < n.length && s < r.length; s++) {
                const t = Br(n[s], r[s]);
                if (0 !== t) return t;
              }
              return Br(n.length, r.length);
            })(e.referenceValue, t.referenceValue);
          case 8:
            return (
              (n = e.geoPointValue),
              (r = t.geoPointValue),
              0 !== (i = Br(rs(n.latitude), rs(r.latitude)))
                ? i
                : Br(rs(n.longitude), rs(r.longitude))
            );
          case 9:
            return (function (e, t) {
              var n = e.values || [],
                r = t.values || [];
              for (let s = 0; s < n.length && s < r.length; ++s) {
                const t = vs(n[s], r[s]);
                if (t) return t;
              }
              return Br(n.length, r.length);
            })(e.arrayValue, t.arrayValue);
          case 10:
            return (function (e, t) {
              const n = e.fields || {},
                r = Object.keys(n),
                s = t.fields || {},
                i = Object.keys(s);
              r.sort(), i.sort();
              for (let o = 0; o < r.length && o < i.length; ++o) {
                const t = Br(r[o], i[o]);
                if (0 !== t) return t;
                var a = vs(n[r[o]], s[i[o]]);
                if (0 !== a) return a;
              }
              return Br(r.length, i.length);
            })(e.mapValue, t.mapValue);
          default:
            throw Ar();
        }
      }
      function ws(e, t) {
        if (
          "string" == typeof e &&
          "string" == typeof t &&
          e.length === t.length
        )
          return Br(e, t);
        var n = ns(e),
          r = ns(t),
          s = Br(n.seconds, r.seconds);
        return 0 !== s ? s : Br(n.nanos, r.nanos);
      }
      function bs(e) {
        return (function i(e) {
          return "nullValue" in e
            ? "null"
            : "booleanValue" in e
            ? "" + e.booleanValue
            : "integerValue" in e
            ? "" + e.integerValue
            : "doubleValue" in e
            ? "" + e.doubleValue
            : "timestampValue" in e
            ? (function (e) {
                const t = ns(e);
                return `time(${t.seconds},${t.nanos})`;
              })(e.timestampValue)
            : "stringValue" in e
            ? e.stringValue
            : "bytesValue" in e
            ? ss(e.bytesValue).toBase64()
            : "referenceValue" in e
            ? ((t = e.referenceValue), ds.fromName(t).toString())
            : "geoPointValue" in e
            ? `geo(${(t = e.geoPointValue).latitude},${t.longitude})`
            : "arrayValue" in e
            ? (function (e) {
                let t = "[",
                  n = !0;
                for (const r of e.values || [])
                  n ? (n = !1) : (t += ","), (t += i(r));
                return t + "]";
              })(e.arrayValue)
            : "mapValue" in e
            ? (function (e) {
                const t = Object.keys(e.fields || {}).sort();
                let n = "{",
                  r = !0;
                for (const s of t)
                  r ? (r = !1) : (n += ","), (n += `${s}:${i(e.fields[s])}`);
                return n + "}";
              })(e.mapValue)
            : Ar();
          var t;
        })(e);
      }
      function Is(e, t) {
        return {
          referenceValue: `projects/${e.projectId}/databases/${
            e.database
          }/documents/${t.path.canonicalString()}`,
        };
      }
      function Es(e) {
        return e && "integerValue" in e;
      }
      function Ts(e) {
        return !!e && "arrayValue" in e;
      }
      function _s(e) {
        return e && "nullValue" in e;
      }
      function Ss(e) {
        return e && "doubleValue" in e && isNaN(Number(e.doubleValue));
      }
      function As(e) {
        return e && "mapValue" in e;
      }
      function Ds(t) {
        if (t.geoPointValue)
          return { geoPointValue: Object.assign({}, t.geoPointValue) };
        if (t.timestampValue && "object" == typeof t.timestampValue)
          return { timestampValue: Object.assign({}, t.timestampValue) };
        if (t.mapValue) {
          const n = { mapValue: { fields: {} } };
          return (
            Wr(t.mapValue.fields, (e, t) => (n.mapValue.fields[e] = Ds(t))), n
          );
        }
        if (t.arrayValue) {
          const r = { arrayValue: { values: [] } };
          for (let e = 0; e < (t.arrayValue.values || []).length; ++e)
            r.arrayValue.values[e] = Ds(t.arrayValue.values[e]);
          return r;
        }
        return Object.assign({}, t);
      }
      function xs(e) {
        return (
          "__max__" ===
          (((e.mapValue || {}).fields || {}).__type__ || {}).stringValue
        );
      }
      function Ns(e, t) {
        return void 0 !== e && (void 0 === t || 0 < vs(e, t)) ? e : t;
      }
      function Cs(e, t) {
        return void 0 !== e && (void 0 === t || vs(e, t) < 0) ? e : t;
      }
      class ks {
        constructor(e) {
          this.value = e;
        }
        static empty() {
          return new ks({ mapValue: {} });
        }
        field(n) {
          if (n.isEmpty()) return this.value;
          {
            let e = this.value;
            for (let t = 0; t < n.length - 1; ++t)
              if (((e = (e.mapValue.fields || {})[n.get(t)]), !As(e)))
                return null;
            return (e = (e.mapValue.fields || {})[n.lastSegment()]), e || null;
          }
        }
        set(e, t) {
          this.getFieldsMap(e.popLast())[e.lastSegment()] = Ds(t);
        }
        setAll(e) {
          let n = Jr.emptyPath(),
            r = {},
            s = [];
          e.forEach((e, t) => {
            if (!n.isImmediateParentOf(t)) {
              const e = this.getFieldsMap(n);
              this.applyChanges(e, r, s), (r = {}), (s = []), (n = t.popLast());
            }
            e ? (r[t.lastSegment()] = Ds(e)) : s.push(t.lastSegment());
          });
          var t = this.getFieldsMap(n);
          this.applyChanges(t, r, s);
        }
        delete(e) {
          const t = this.field(e.popLast());
          As(t) &&
            t.mapValue.fields &&
            delete t.mapValue.fields[e.lastSegment()];
        }
        isEqual(e) {
          return ps(this.value, e.value);
        }
        getFieldsMap(t) {
          let n = this.value;
          n.mapValue.fields || (n.mapValue = { fields: {} });
          for (let r = 0; r < t.length; ++r) {
            let e = n.mapValue.fields[t.get(r)];
            (As(e) && e.mapValue.fields) ||
              ((e = { mapValue: { fields: {} } }),
              (n.mapValue.fields[t.get(r)] = e)),
              (n = e);
          }
          return n.mapValue.fields;
        }
        applyChanges(n, e, t) {
          Wr(e, (e, t) => (n[e] = t));
          for (const e of t) delete n[e];
        }
        clone() {
          return new ks(Ds(this.value));
        }
      }
      class Rs {
        constructor(e, t, n, r, s, i) {
          (this.key = e),
            (this.documentType = t),
            (this.version = n),
            (this.readTime = r),
            (this.data = s),
            (this.documentState = i);
        }
        static newInvalidDocument(e) {
          return new Rs(e, 0, $r.min(), $r.min(), ks.empty(), 0);
        }
        static newFoundDocument(e, t, n) {
          return new Rs(e, 1, t, $r.min(), n, 0);
        }
        static newNoDocument(e, t) {
          return new Rs(e, 2, t, $r.min(), ks.empty(), 0);
        }
        static newUnknownDocument(e, t) {
          return new Rs(e, 3, t, $r.min(), ks.empty(), 2);
        }
        convertToFoundDocument(e, t) {
          return (
            (this.version = e),
            (this.documentType = 1),
            (this.data = t),
            (this.documentState = 0),
            this
          );
        }
        convertToNoDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 2),
            (this.data = ks.empty()),
            (this.documentState = 0),
            this
          );
        }
        convertToUnknownDocument(e) {
          return (
            (this.version = e),
            (this.documentType = 3),
            (this.data = ks.empty()),
            (this.documentState = 2),
            this
          );
        }
        setHasCommittedMutations() {
          return (this.documentState = 2), this;
        }
        setHasLocalMutations() {
          return (this.documentState = 1), this;
        }
        setReadTime(e) {
          return (this.readTime = e), this;
        }
        get hasLocalMutations() {
          return 1 === this.documentState;
        }
        get hasCommittedMutations() {
          return 2 === this.documentState;
        }
        get hasPendingWrites() {
          return this.hasLocalMutations || this.hasCommittedMutations;
        }
        isValidDocument() {
          return 0 !== this.documentType;
        }
        isFoundDocument() {
          return 1 === this.documentType;
        }
        isNoDocument() {
          return 2 === this.documentType;
        }
        isUnknownDocument() {
          return 3 === this.documentType;
        }
        isEqual(e) {
          return (
            e instanceof Rs &&
            this.key.isEqual(e.key) &&
            this.version.isEqual(e.version) &&
            this.documentType === e.documentType &&
            this.documentState === e.documentState &&
            this.data.isEqual(e.data)
          );
        }
        mutableCopy() {
          return new Rs(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.data.clone(),
            this.documentState
          );
        }
        toString() {
          return `Document(${this.key}, ${this.version}, ${JSON.stringify(
            this.data.value
          )}, {documentType: ${this.documentType}}), {documentState: ${
            this.documentState
          }})`;
        }
      }
      class Ms {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.collectionGroup = t),
            (this.fields = n),
            (this.indexState = r);
        }
      }
      function Ls(e) {
        return e.fields.find((e) => 2 === e.kind);
      }
      function Vs(e) {
        return e.fields.filter((e) => 2 !== e.kind);
      }
      Ms.UNKNOWN_ID = -1;
      class Os {
        constructor(e, t) {
          (this.fieldPath = e), (this.kind = t);
        }
      }
      class Ps {
        constructor(e, t) {
          (this.sequenceNumber = e), (this.offset = t);
        }
        static empty() {
          return new Ps(0, qs.min());
        }
      }
      function Fs(e, t) {
        var n = e.toTimestamp().seconds,
          r = e.toTimestamp().nanoseconds + 1,
          r = $r.fromTimestamp(1e9 === r ? new Kr(n + 1, 0) : new Kr(n, r));
        return new qs(r, ds.empty(), t);
      }
      class qs {
        constructor(e, t, n) {
          (this.readTime = e),
            (this.documentKey = t),
            (this.largestBatchId = n);
        }
        static min() {
          return new qs($r.min(), ds.empty(), -1);
        }
        static max() {
          return new qs($r.max(), ds.empty(), -1);
        }
      }
      class Us {
        constructor(e, t = null, n = [], r = [], s = null, i = null, a = null) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.orderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.startAt = i),
            (this.endAt = a),
            (this.P = null);
        }
      }
      function Bs(e, t = null, n = [], r = [], s = null, i = null, a = null) {
        return new Us(e, t, n, r, s, i, a);
      }
      function Gs(e) {
        const t = e;
        if (null === t.P) {
          let e = t.path.canonicalString();
          null !== t.collectionGroup && (e += "|cg:" + t.collectionGroup),
            (e += "|f:"),
            (e += t.filters
              .map((e) => {
                return (
                  (t = e).field.canonicalString() +
                  t.op.toString() +
                  bs(t.value)
                );
                var t;
              })
              .join(",")),
            (e += "|ob:"),
            (e += t.orderBy
              .map((e) =>
                (function (e) {
                  return e.field.canonicalString() + e.dir;
                })(e)
              )
              .join(",")),
            hs(t.limit) || ((e += "|l:"), (e += t.limit)),
            t.startAt &&
              ((e += "|lb:"),
              (e += t.startAt.inclusive ? "b:" : "a:"),
              (e += t.startAt.position.map((e) => bs(e)).join(","))),
            t.endAt &&
              ((e += "|ub:"),
              (e += t.endAt.inclusive ? "a:" : "b:"),
              (e += t.endAt.position.map((e) => bs(e)).join(","))),
            (t.P = e);
        }
        return t.P;
      }
      function js(e, t) {
        if (e.limit !== t.limit) return !1;
        if (e.orderBy.length !== t.orderBy.length) return !1;
        for (let a = 0; a < e.orderBy.length; a++)
          if (
            ((n = e.orderBy[a]),
            (r = t.orderBy[a]),
            n.dir !== r.dir || !n.field.isEqual(r.field))
          )
            return !1;
        var n, r, s, i;
        if (e.filters.length !== t.filters.length) return !1;
        for (let o = 0; o < e.filters.length; o++)
          if (
            ((s = e.filters[o]),
            (i = t.filters[o]),
            s.op !== i.op || !s.field.isEqual(i.field) || !ps(s.value, i.value))
          )
            return !1;
        return (
          e.collectionGroup === t.collectionGroup &&
          !!e.path.isEqual(t.path) &&
          !!si(e.startAt, t.startAt) &&
          si(e.endAt, t.endAt)
        );
      }
      function Ks(e) {
        return (
          ds.isDocumentKey(e.path) &&
          null === e.collectionGroup &&
          0 === e.filters.length
        );
      }
      function $s(e, t) {
        return e.filters.filter((e) => e instanceof zs && e.field.isEqual(t));
      }
      class zs extends class {} {
        constructor(e, t, n) {
          super(), (this.field = e), (this.op = t), (this.value = n);
        }
        static create(e, t, n) {
          return e.isKeyField()
            ? "in" === t || "not-in" === t
              ? this.V(e, t, n)
              : new Ws(e, t, n)
            : "array-contains" === t
            ? new Xs(e, n)
            : "in" === t
            ? new Js(e, n)
            : "not-in" === t
            ? new Zs(e, n)
            : "array-contains-any" === t
            ? new ei(e, n)
            : new zs(e, t, n);
        }
        static V(e, t, n) {
          return new ("in" === t ? Hs : Qs)(e, n);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return "!=" === this.op
            ? null !== t && this.v(vs(t, this.value))
            : null !== t &&
                ms(this.value) === ms(t) &&
                this.v(vs(t, this.value));
        }
        v(e) {
          switch (this.op) {
            case "<":
              return e < 0;
            case "<=":
              return e <= 0;
            case "==":
              return 0 === e;
            case "!=":
              return 0 !== e;
            case ">":
              return 0 < e;
            case ">=":
              return 0 <= e;
            default:
              return Ar();
          }
        }
        S() {
          return 0 <= ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op);
        }
      }
      class Ws extends zs {
        constructor(e, t, n) {
          super(e, t, n), (this.key = ds.fromName(n.referenceValue));
        }
        matches(e) {
          var t = ds.comparator(e.key, this.key);
          return this.v(t);
        }
      }
      class Hs extends zs {
        constructor(e, t) {
          super(e, "in", t), (this.keys = Ys(0, t));
        }
        matches(t) {
          return this.keys.some((e) => e.isEqual(t.key));
        }
      }
      class Qs extends zs {
        constructor(e, t) {
          super(e, "not-in", t), (this.keys = Ys(0, t));
        }
        matches(t) {
          return !this.keys.some((e) => e.isEqual(t.key));
        }
      }
      function Ys(e, t) {
        var n;
        return (
          (null === (n = t.arrayValue) || void 0 === n ? void 0 : n.values) ||
          []
        ).map((e) => ds.fromName(e.referenceValue));
      }
      class Xs extends zs {
        constructor(e, t) {
          super(e, "array-contains", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return Ts(t) && ys(t.arrayValue, this.value);
        }
      }
      class Js extends zs {
        constructor(e, t) {
          super(e, "in", t);
        }
        matches(e) {
          var t = e.data.field(this.field);
          return null !== t && ys(this.value.arrayValue, t);
        }
      }
      class Zs extends zs {
        constructor(e, t) {
          super(e, "not-in", t);
        }
        matches(e) {
          if (ys(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
          var t = e.data.field(this.field);
          return null !== t && !ys(this.value.arrayValue, t);
        }
      }
      class ei extends zs {
        constructor(e, t) {
          super(e, "array-contains-any", t);
        }
        matches(e) {
          const t = e.data.field(this.field);
          return (
            !(!Ts(t) || !t.arrayValue.values) &&
            t.arrayValue.values.some((e) => ys(this.value.arrayValue, e))
          );
        }
      }
      class ti {
        constructor(e, t) {
          (this.position = e), (this.inclusive = t);
        }
      }
      class ni {
        constructor(e, t = "asc") {
          (this.field = e), (this.dir = t);
        }
      }
      function ri(e, t, n) {
        let r = 0;
        for (let s = 0; s < e.position.length; s++) {
          const i = t[s],
            a = e.position[s];
          if (
            ((r = i.field.isKeyField()
              ? ds.comparator(ds.fromName(a.referenceValue), n.key)
              : vs(a, n.data.field(i.field))),
            "desc" === i.dir && (r *= -1),
            0 !== r)
          )
            break;
        }
        return r;
      }
      function si(e, t) {
        if (null === e) return null === t;
        if (null === t) return !1;
        if (
          e.inclusive !== t.inclusive ||
          e.position.length !== t.position.length
        )
          return !1;
        for (let n = 0; n < e.position.length; n++)
          if (!ps(e.position[n], t.position[n])) return !1;
        return !0;
      }
      class ii {
        constructor(
          e,
          t = null,
          n = [],
          r = [],
          s = null,
          i = "F",
          a = null,
          o = null
        ) {
          (this.path = e),
            (this.collectionGroup = t),
            (this.explicitOrderBy = n),
            (this.filters = r),
            (this.limit = s),
            (this.limitType = i),
            (this.startAt = a),
            (this.endAt = o),
            (this.D = null),
            (this.C = null),
            this.startAt,
            this.endAt;
        }
      }
      function ai(e, t, n, r, s, i, a, o) {
        return new ii(e, t, n, r, s, i, a, o);
      }
      function oi(e) {
        return new ii(e);
      }
      function ui(e) {
        return !hs(e.limit) && "F" === e.limitType;
      }
      function hi(e) {
        return !hs(e.limit) && "L" === e.limitType;
      }
      function ci(e) {
        return 0 < e.explicitOrderBy.length ? e.explicitOrderBy[0].field : null;
      }
      function li(e) {
        for (const t of e.filters) if (t.S()) return t.field;
        return null;
      }
      function di(e) {
        return null !== e.collectionGroup;
      }
      function fi(t) {
        const n = t;
        if (null === n.D) {
          n.D = [];
          const t = li(n),
            e = ci(n);
          if (null !== t && null === e)
            t.isKeyField() || n.D.push(new ni(t)),
              n.D.push(new ni(Jr.keyField(), "asc"));
          else {
            let e = !1;
            for (const r of n.explicitOrderBy)
              n.D.push(r), r.field.isKeyField() && (e = !0);
            if (!e) {
              const t =
                0 < n.explicitOrderBy.length
                  ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir
                  : "asc";
              n.D.push(new ni(Jr.keyField(), t));
            }
          }
        }
        return n.D;
      }
      function gi(e) {
        const t = e;
        if (!t.C)
          if ("F" === t.limitType)
            t.C = Bs(
              t.path,
              t.collectionGroup,
              fi(t),
              t.filters,
              t.limit,
              t.startAt,
              t.endAt
            );
          else {
            const e = [];
            for (const s of fi(t)) {
              const t = "desc" === s.dir ? "asc" : "desc";
              e.push(new ni(s.field, t));
            }
            var n = t.endAt
                ? new ti(t.endAt.position, !t.endAt.inclusive)
                : null,
              r = t.startAt
                ? new ti(t.startAt.position, !t.startAt.inclusive)
                : null;
            t.C = Bs(t.path, t.collectionGroup, e, t.filters, t.limit, n, r);
          }
        return t.C;
      }
      function mi(e, t, n) {
        return new ii(
          e.path,
          e.collectionGroup,
          e.explicitOrderBy.slice(),
          e.filters.slice(),
          t,
          n,
          e.startAt,
          e.endAt
        );
      }
      function pi(e, t) {
        return js(gi(e), gi(t)) && e.limitType === t.limitType;
      }
      function yi(e) {
        return `${Gs(gi(e))}|lt:${e.limitType}`;
      }
      function vi(e) {
        return `Query(target=${(function (e) {
          let t = e.path.canonicalString();
          return (
            null !== e.collectionGroup &&
              (t += " collectionGroup=" + e.collectionGroup),
            0 < e.filters.length &&
              (t += `, filters: [${e.filters
                .map((e) => {
                  return `${(t = e).field.canonicalString()} ${t.op} ${bs(
                    t.value
                  )}`;
                  var t;
                })
                .join(", ")}]`),
            hs(e.limit) || (t += ", limit: " + e.limit),
            0 < e.orderBy.length &&
              (t += `, orderBy: [${e.orderBy
                .map((e) =>
                  (function (e) {
                    return `${e.field.canonicalString()} (${e.dir})`;
                  })(e)
                )
                .join(", ")}]`),
            e.startAt &&
              ((t += ", startAt: "),
              (t += e.startAt.inclusive ? "b:" : "a:"),
              (t += e.startAt.position.map((e) => bs(e)).join(","))),
            e.endAt &&
              ((t += ", endAt: "),
              (t += e.endAt.inclusive ? "a:" : "b:"),
              (t += e.endAt.position.map((e) => bs(e)).join(","))),
            `Target(${t})`
          );
        })(gi(e))}; limitType=${e.limitType})`;
      }
      function wi(n, e) {
        return (
          e.isFoundDocument() &&
          ((s = n),
          (a = (i = e).key.path),
          null !== s.collectionGroup
            ? i.key.hasCollectionId(s.collectionGroup) && s.path.isPrefixOf(a)
            : ds.isDocumentKey(s.path)
            ? s.path.isEqual(a)
            : s.path.isImmediateParentOf(a)) &&
          (function (e) {
            for (const t of n.explicitOrderBy)
              if (!t.field.isKeyField() && null === e.data.field(t.field))
                return;
            return 1;
          })(e) &&
          (function (e) {
            for (const t of n.filters) if (!t.matches(e)) return;
            return 1;
          })(e) &&
          ((s = e),
          (!(e = n).startAt ||
            ((t = e.startAt),
            (r = ri(t, fi(e), s)),
            t.inclusive ? r <= 0 : r < 0)) &&
            (!e.endAt ||
              ((t = e.endAt),
              (r = ri(t, fi(e), s)),
              t.inclusive ? 0 <= r : 0 < r)))
        );
        var t, r, s, i, a;
      }
      function bi(e) {
        return (
          e.collectionGroup ||
          (e.path.length % 2 == 1
            ? e.path.lastSegment()
            : e.path.get(e.path.length - 2))
        );
      }
      function Ii(s) {
        return (e, t) => {
          let n = !1;
          for (const r of fi(s)) {
            const s = (function (e, s, t) {
              var n = e.field.isKeyField()
                ? ds.comparator(s.key, t.key)
                : (function (e, t) {
                    var n = s.data.field(e),
                      r = t.data.field(e);
                    return null !== n && null !== r ? vs(n, r) : Ar();
                  })(e.field, t);
              switch (e.dir) {
                case "asc":
                  return n;
                case "desc":
                  return -1 * n;
                default:
                  return Ar();
              }
            })(r, e, t);
            if (0 !== s) return s;
            n = n || r.field.isKeyField();
          }
          return 0;
        };
      }
      function Ei(e, t) {
        if (e.N) {
          if (isNaN(t)) return { doubleValue: "NaN" };
          if (t === 1 / 0) return { doubleValue: "Infinity" };
          if (t === -1 / 0) return { doubleValue: "-Infinity" };
        }
        return { doubleValue: cs(t) ? "-0" : t };
      }
      function Ti(e) {
        return { integerValue: "" + e };
      }
      function _i(e, t) {
        return ls(t) ? Ti(t) : Ei(e, t);
      }
      class Si {
        constructor() {
          this._ = void 0;
        }
      }
      function Ai(e, t) {
        return e instanceof Ri
          ? Es((n = t)) || (n && "doubleValue" in n)
            ? t
            : { integerValue: 0 }
          : null;
        var n;
      }
      class Di extends Si {}
      class xi extends Si {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function Ni(e, t) {
        const n = Li(t);
        for (const t of e.elements) n.some((e) => ps(e, t)) || n.push(t);
        return { arrayValue: { values: n } };
      }
      class Ci extends Si {
        constructor(e) {
          super(), (this.elements = e);
        }
      }
      function ki(e, t) {
        let n = Li(t);
        for (const t of e.elements) n = n.filter((e) => !ps(e, t));
        return { arrayValue: { values: n } };
      }
      class Ri extends Si {
        constructor(e, t) {
          super(), (this.M = e), (this.k = t);
        }
      }
      function Mi(e) {
        return rs(e.integerValue || e.doubleValue);
      }
      function Li(e) {
        return Ts(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
      }
      class Vi {
        constructor(e, t) {
          (this.field = e), (this.transform = t);
        }
      }
      class Oi {
        constructor(e, t) {
          (this.version = e), (this.transformResults = t);
        }
      }
      class Pi {
        constructor(e, t) {
          (this.updateTime = e), (this.exists = t);
        }
        static none() {
          return new Pi();
        }
        static exists(e) {
          return new Pi(void 0, e);
        }
        static updateTime(e) {
          return new Pi(e);
        }
        get isNone() {
          return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(e) {
          return (
            this.exists === e.exists &&
            (this.updateTime
              ? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
              : !e.updateTime)
          );
        }
      }
      function Fi(e, t) {
        return void 0 !== e.updateTime
          ? t.isFoundDocument() && t.version.isEqual(e.updateTime)
          : void 0 === e.exists || e.exists === t.isFoundDocument();
      }
      class qi {}
      function Ui(e, t, n) {
        e instanceof Ki
          ? (function (e, t, n) {
              const r = e.value.clone(),
                s = Wi(e.fieldTransforms, t, n.transformResults);
              r.setAll(s),
                t
                  .convertToFoundDocument(n.version, r)
                  .setHasCommittedMutations();
            })(e, t, n)
          : e instanceof $i
          ? (function (e, t, n) {
              if (!Fi(e.precondition, t))
                return t.convertToUnknownDocument(n.version);
              const r = Wi(e.fieldTransforms, t, n.transformResults),
                s = t.data;
              s.setAll(zi(e)),
                s.setAll(r),
                t
                  .convertToFoundDocument(n.version, s)
                  .setHasCommittedMutations();
            })(e, t, n)
          : t.convertToNoDocument(n.version).setHasCommittedMutations();
      }
      function Bi(e, t, n) {
        e instanceof Ki
          ? (function (e, t, n) {
              if (Fi(e.precondition, t)) {
                const r = e.value.clone(),
                  s = Hi(e.fieldTransforms, n, t);
                r.setAll(s),
                  t.convertToFoundDocument(ji(t), r).setHasLocalMutations();
              }
            })(e, t, n)
          : e instanceof $i
          ? (function (e, t, n) {
              if (Fi(e.precondition, t)) {
                const r = Hi(e.fieldTransforms, n, t),
                  s = t.data;
                s.setAll(zi(e)),
                  s.setAll(r),
                  t.convertToFoundDocument(ji(t), s).setHasLocalMutations();
              }
            })(e, t, n)
          : ((t = t), Fi(e.precondition, t) && t.convertToNoDocument($r.min()));
      }
      function Gi(e, t) {
        return (
          e.type === t.type &&
          !!e.key.isEqual(t.key) &&
          !!e.precondition.isEqual(t.precondition) &&
          ((n = e.fieldTransforms),
          (r = t.fieldTransforms),
          !!(
            (void 0 === n && void 0 === r) ||
            (n &&
              r &&
              Gr(n, r, (e, t) =>
                (function (e, t) {
                  return (
                    e.field.isEqual(t.field) &&
                    ((e = e.transform),
                    (t = t.transform),
                    (e instanceof xi && t instanceof xi) ||
                    (e instanceof Ci && t instanceof Ci)
                      ? Gr(e.elements, t.elements, ps)
                      : e instanceof Ri && t instanceof Ri
                      ? ps(e.k, t.k)
                      : e instanceof Di && t instanceof Di)
                  );
                })(e, t)
              ))
          ) &&
            (0 === e.type
              ? e.value.isEqual(t.value)
              : 1 !== e.type ||
                (e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask))))
        );
        var n, r;
      }
      function ji(e) {
        return e.isFoundDocument() ? e.version : $r.min();
      }
      class Ki extends qi {
        constructor(e, t, n, r = []) {
          super(),
            (this.key = e),
            (this.value = t),
            (this.precondition = n),
            (this.fieldTransforms = r),
            (this.type = 0);
        }
      }
      class $i extends qi {
        constructor(e, t, n, r, s = []) {
          super(),
            (this.key = e),
            (this.data = t),
            (this.fieldMask = n),
            (this.precondition = r),
            (this.fieldTransforms = s),
            (this.type = 1);
        }
      }
      function zi(n) {
        const r = new Map();
        return (
          n.fieldMask.fields.forEach((e) => {
            var t;
            e.isEmpty() || ((t = n.data.field(e)), r.set(e, t));
          }),
          r
        );
      }
      function Wi(e, t, n) {
        const r = new Map();
        Dr(e.length === n.length);
        for (let c = 0; c < n.length; c++) {
          var s = e[c],
            i = s.transform,
            a = t.data.field(s.field);
          r.set(
            s.field,
            ((o = i),
            (u = a),
            (h = n[c]),
            o instanceof xi ? Ni(o, u) : o instanceof Ci ? ki(o, u) : h)
          );
        }
        var o, u, h;
        return r;
      }
      function Hi(e, t, n) {
        const r = new Map();
        for (const h of e) {
          const e = h.transform,
            c = n.data.field(h.field);
          r.set(
            h.field,
            ((s = e),
            (i = c),
            (a = t),
            (u = o = void 0),
            s instanceof Di
              ? (function () {
                  const e = {
                    fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: {
                        timestampValue: {
                          seconds: a.seconds,
                          nanos: a.nanoseconds,
                        },
                      },
                    },
                  };
                  return (
                    i && (e.fields.__previous_value__ = i), { mapValue: e }
                  );
                })()
              : s instanceof xi
              ? Ni(s, i)
              : s instanceof Ci
              ? ki(s, i)
              : ((o = Ai((s = s), i)),
                (u = Mi(o) + Mi(s.k)),
                Es(o) && Es(s.k) ? Ti(u) : Ei(s.M, u)))
          );
        }
        var s, i, a, o, u;
        return r;
      }
      class Qi extends qi {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 2),
            (this.fieldTransforms = []);
        }
      }
      class Yi extends qi {
        constructor(e, t) {
          super(),
            (this.key = e),
            (this.precondition = t),
            (this.type = 3),
            (this.fieldTransforms = []);
        }
      }
      class Xi {
        constructor(e) {
          this.count = e;
        }
      }
      function Ji(e) {
        switch (e) {
          default:
            return Ar(), 0;
          case xr.CANCELLED:
          case xr.UNKNOWN:
          case xr.DEADLINE_EXCEEDED:
          case xr.RESOURCE_EXHAUSTED:
          case xr.INTERNAL:
          case xr.UNAVAILABLE:
          case xr.UNAUTHENTICATED:
            return;
          case xr.INVALID_ARGUMENT:
          case xr.NOT_FOUND:
          case xr.ALREADY_EXISTS:
          case xr.PERMISSION_DENIED:
          case xr.FAILED_PRECONDITION:
          case xr.ABORTED:
          case xr.OUT_OF_RANGE:
          case xr.UNIMPLEMENTED:
          case xr.DATA_LOSS:
            return 1;
        }
      }
      function Zi(e) {
        if (void 0 === e) return Tr("GRPC error has no .code"), xr.UNKNOWN;
        switch (e) {
          case or.OK:
            return xr.OK;
          case or.CANCELLED:
            return xr.CANCELLED;
          case or.UNKNOWN:
            return xr.UNKNOWN;
          case or.DEADLINE_EXCEEDED:
            return xr.DEADLINE_EXCEEDED;
          case or.RESOURCE_EXHAUSTED:
            return xr.RESOURCE_EXHAUSTED;
          case or.INTERNAL:
            return xr.INTERNAL;
          case or.UNAVAILABLE:
            return xr.UNAVAILABLE;
          case or.UNAUTHENTICATED:
            return xr.UNAUTHENTICATED;
          case or.INVALID_ARGUMENT:
            return xr.INVALID_ARGUMENT;
          case or.NOT_FOUND:
            return xr.NOT_FOUND;
          case or.ALREADY_EXISTS:
            return xr.ALREADY_EXISTS;
          case or.PERMISSION_DENIED:
            return xr.PERMISSION_DENIED;
          case or.FAILED_PRECONDITION:
            return xr.FAILED_PRECONDITION;
          case or.ABORTED:
            return xr.ABORTED;
          case or.OUT_OF_RANGE:
            return xr.OUT_OF_RANGE;
          case or.UNIMPLEMENTED:
            return xr.UNIMPLEMENTED;
          case or.DATA_LOSS:
            return xr.DATA_LOSS;
          default:
            return Ar();
        }
      }
      ((it = or = or || {})[(it.OK = 0)] = "OK"),
        (it[(it.CANCELLED = 1)] = "CANCELLED"),
        (it[(it.UNKNOWN = 2)] = "UNKNOWN"),
        (it[(it.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
        (it[(it.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
        (it[(it.NOT_FOUND = 5)] = "NOT_FOUND"),
        (it[(it.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
        (it[(it.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
        (it[(it.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
        (it[(it.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
        (it[(it.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
        (it[(it.ABORTED = 10)] = "ABORTED"),
        (it[(it.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
        (it[(it.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
        (it[(it.INTERNAL = 13)] = "INTERNAL"),
        (it[(it.UNAVAILABLE = 14)] = "UNAVAILABLE"),
        (it[(it.DATA_LOSS = 15)] = "DATA_LOSS");
      class ea {
        constructor(e, t) {
          (this.mapKeyFn = e),
            (this.equalsFn = t),
            (this.inner = {}),
            (this.innerSize = 0);
        }
        get(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 !== n)
            for (const [t, r] of n) if (this.equalsFn(t, e)) return r;
        }
        has(e) {
          return void 0 !== this.get(e);
        }
        set(e, t) {
          const n = this.mapKeyFn(e),
            r = this.inner[n];
          if (void 0 === r)
            return (this.inner[n] = [[e, t]]), void this.innerSize++;
          for (let s = 0; s < r.length; s++)
            if (this.equalsFn(r[s][0], e)) return void (r[s] = [e, t]);
          r.push([e, t]), this.innerSize++;
        }
        delete(e) {
          const t = this.mapKeyFn(e),
            n = this.inner[t];
          if (void 0 === n) return !1;
          for (let r = 0; r < n.length; r++)
            if (this.equalsFn(n[r][0], e))
              return (
                1 === n.length ? delete this.inner[t] : n.splice(r, 1),
                this.innerSize--,
                !0
              );
          return !1;
        }
        forEach(r) {
          Wr(this.inner, (e, t) => {
            for (const [e, n] of t) r(e, n);
          });
        }
        isEmpty() {
          return Hr(this.inner);
        }
        size() {
          return this.innerSize;
        }
      }
      class ta {
        constructor(e, t) {
          (this.comparator = e), (this.root = t || ra.EMPTY);
        }
        insert(e, t) {
          return new ta(
            this.comparator,
            this.root
              .insert(e, t, this.comparator)
              .copy(null, null, ra.BLACK, null, null)
          );
        }
        remove(e) {
          return new ta(
            this.comparator,
            this.root
              .remove(e, this.comparator)
              .copy(null, null, ra.BLACK, null, null)
          );
        }
        get(e) {
          let t = this.root;
          for (; !t.isEmpty(); ) {
            var n = this.comparator(e, t.key);
            if (0 === n) return t.value;
            n < 0 ? (t = t.left) : 0 < n && (t = t.right);
          }
          return null;
        }
        indexOf(e) {
          let t = 0,
            n = this.root;
          for (; !n.isEmpty(); ) {
            var r = this.comparator(e, n.key);
            if (0 === r) return t + n.left.size;
            n = r < 0 ? n.left : ((t += n.left.size + 1), n.right);
          }
          return -1;
        }
        isEmpty() {
          return this.root.isEmpty();
        }
        get size() {
          return this.root.size;
        }
        minKey() {
          return this.root.minKey();
        }
        maxKey() {
          return this.root.maxKey();
        }
        inorderTraversal(e) {
          return this.root.inorderTraversal(e);
        }
        forEach(n) {
          this.inorderTraversal((e, t) => (n(e, t), !1));
        }
        toString() {
          const n = [];
          return (
            this.inorderTraversal((e, t) => (n.push(`${e}:${t}`), !1)),
            `{${n.join(", ")}}`
          );
        }
        reverseTraversal(e) {
          return this.root.reverseTraversal(e);
        }
        getIterator() {
          return new na(this.root, null, this.comparator, !1);
        }
        getIteratorFrom(e) {
          return new na(this.root, e, this.comparator, !1);
        }
        getReverseIterator() {
          return new na(this.root, null, this.comparator, !0);
        }
        getReverseIteratorFrom(e) {
          return new na(this.root, e, this.comparator, !0);
        }
      }
      class na {
        constructor(e, t, n, r) {
          (this.isReverse = r), (this.nodeStack = []);
          let s = 1;
          for (; !e.isEmpty(); )
            if (((s = t ? n(e.key, t) : 1), t && r && (s *= -1), s < 0))
              e = this.isReverse ? e.left : e.right;
            else {
              if (0 === s) {
                this.nodeStack.push(e);
                break;
              }
              this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
            }
        }
        getNext() {
          let e = this.nodeStack.pop();
          var t = { key: e.key, value: e.value };
          if (this.isReverse)
            for (e = e.left; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.right);
          else
            for (e = e.right; !e.isEmpty(); )
              this.nodeStack.push(e), (e = e.left);
          return t;
        }
        hasNext() {
          return 0 < this.nodeStack.length;
        }
        peek() {
          if (0 === this.nodeStack.length) return null;
          var e = this.nodeStack[this.nodeStack.length - 1];
          return { key: e.key, value: e.value };
        }
      }
      class ra {
        constructor(e, t, n, r, s) {
          (this.key = e),
            (this.value = t),
            (this.color = null != n ? n : ra.RED),
            (this.left = null != r ? r : ra.EMPTY),
            (this.right = null != s ? s : ra.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
        }
        copy(e, t, n, r, s) {
          return new ra(
            null != e ? e : this.key,
            null != t ? t : this.value,
            null != n ? n : this.color,
            null != r ? r : this.left,
            null != s ? s : this.right
          );
        }
        isEmpty() {
          return !1;
        }
        inorderTraversal(e) {
          return (
            this.left.inorderTraversal(e) ||
            e(this.key, this.value) ||
            this.right.inorderTraversal(e)
          );
        }
        reverseTraversal(e) {
          return (
            this.right.reverseTraversal(e) ||
            e(this.key, this.value) ||
            this.left.reverseTraversal(e)
          );
        }
        min() {
          return this.left.isEmpty() ? this : this.left.min();
        }
        minKey() {
          return this.min().key;
        }
        maxKey() {
          return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        insert(e, t, n) {
          let r = this;
          var s = n(e, r.key);
          return (
            (r =
              s < 0
                ? r.copy(null, null, null, r.left.insert(e, t, n), null)
                : 0 === s
                ? r.copy(null, t, null, null, null)
                : r.copy(null, null, null, null, r.right.insert(e, t, n))),
            r.fixUp()
          );
        }
        removeMin() {
          if (this.left.isEmpty()) return ra.EMPTY;
          let e = this;
          return (
            e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
            (e = e.copy(null, null, null, e.left.removeMin(), null)),
            e.fixUp()
          );
        }
        remove(e, t) {
          let n,
            r = this;
          if (t(e, r.key) < 0)
            r.left.isEmpty() ||
              r.left.isRed() ||
              r.left.left.isRed() ||
              (r = r.moveRedLeft()),
              (r = r.copy(null, null, null, r.left.remove(e, t), null));
          else {
            if (
              (r.left.isRed() && (r = r.rotateRight()),
              r.right.isEmpty() ||
                r.right.isRed() ||
                r.right.left.isRed() ||
                (r = r.moveRedRight()),
              0 === t(e, r.key))
            ) {
              if (r.right.isEmpty()) return ra.EMPTY;
              (n = r.right.min()),
                (r = r.copy(n.key, n.value, null, null, r.right.removeMin()));
            }
            r = r.copy(null, null, null, null, r.right.remove(e, t));
          }
          return r.fixUp();
        }
        isRed() {
          return this.color;
        }
        fixUp() {
          let e = this;
          return (
            e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
            e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
            e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
            e
          );
        }
        moveRedLeft() {
          let e = this.colorFlip();
          return (
            e.right.left.isRed() &&
              ((e = e.copy(null, null, null, null, e.right.rotateRight())),
              (e = e.rotateLeft()),
              (e = e.colorFlip())),
            e
          );
        }
        moveRedRight() {
          let e = this.colorFlip();
          return (
            e.left.left.isRed() && ((e = e.rotateRight()), (e = e.colorFlip())),
            e
          );
        }
        rotateLeft() {
          var e = this.copy(null, null, ra.RED, null, this.right.left);
          return this.right.copy(null, null, this.color, e, null);
        }
        rotateRight() {
          var e = this.copy(null, null, ra.RED, this.left.right, null);
          return this.left.copy(null, null, this.color, null, e);
        }
        colorFlip() {
          var e = this.left.copy(null, null, !this.left.color, null, null),
            t = this.right.copy(null, null, !this.right.color, null, null);
          return this.copy(null, null, !this.color, e, t);
        }
        checkMaxDepth() {
          var e = this.check();
          return Math.pow(2, e) <= this.size + 1;
        }
        check() {
          if (this.isRed() && this.left.isRed()) throw Ar();
          if (this.right.isRed()) throw Ar();
          var e = this.left.check();
          if (e !== this.right.check()) throw Ar();
          return e + (this.isRed() ? 0 : 1);
        }
      }
      (ra.EMPTY = null),
        (ra.RED = !0),
        (ra.BLACK = !1),
        (ra.EMPTY = new (class {
          constructor() {
            this.size = 0;
          }
          get key() {
            throw Ar();
          }
          get value() {
            throw Ar();
          }
          get color() {
            throw Ar();
          }
          get left() {
            throw Ar();
          }
          get right() {
            throw Ar();
          }
          copy(e, t, n, r, s) {
            return this;
          }
          insert(e, t, n) {
            return new ra(e, t);
          }
          remove(e, t) {
            return this;
          }
          isEmpty() {
            return !0;
          }
          inorderTraversal(e) {
            return !1;
          }
          reverseTraversal(e) {
            return !1;
          }
          minKey() {
            return null;
          }
          maxKey() {
            return null;
          }
          isRed() {
            return !1;
          }
          checkMaxDepth() {
            return !0;
          }
          check() {
            return 0;
          }
        })());
      class sa {
        constructor(e) {
          (this.comparator = e), (this.data = new ta(this.comparator));
        }
        has(e) {
          return null !== this.data.get(e);
        }
        first() {
          return this.data.minKey();
        }
        last() {
          return this.data.maxKey();
        }
        get size() {
          return this.data.size;
        }
        indexOf(e) {
          return this.data.indexOf(e);
        }
        forEach(n) {
          this.data.inorderTraversal((e, t) => (n(e), !1));
        }
        forEachInRange(e, t) {
          const n = this.data.getIteratorFrom(e[0]);
          for (; n.hasNext(); ) {
            var r = n.getNext();
            if (0 <= this.comparator(r.key, e[1])) return;
            t(r.key);
          }
        }
        forEachWhile(e, t) {
          let n;
          for (
            n =
              void 0 !== t
                ? this.data.getIteratorFrom(t)
                : this.data.getIterator();
            n.hasNext();

          )
            if (!e(n.getNext().key)) return;
        }
        firstAfterOrEqual(e) {
          const t = this.data.getIteratorFrom(e);
          return t.hasNext() ? t.getNext().key : null;
        }
        getIterator() {
          return new ia(this.data.getIterator());
        }
        getIteratorFrom(e) {
          return new ia(this.data.getIteratorFrom(e));
        }
        add(e) {
          return this.copy(this.data.remove(e).insert(e, !0));
        }
        delete(e) {
          return this.has(e) ? this.copy(this.data.remove(e)) : this;
        }
        isEmpty() {
          return this.data.isEmpty();
        }
        unionWith(e) {
          let t = this;
          return (
            t.size < e.size && ((t = e), (e = this)),
            e.forEach((e) => {
              t = t.add(e);
            }),
            t
          );
        }
        isEqual(e) {
          if (!(e instanceof sa)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.data.getIterator(),
            n = e.data.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (0 !== this.comparator(e, r)) return !1;
          }
          return !0;
        }
        toArray() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e);
            }),
            t
          );
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => t.push(e)), "SortedSet(" + t.toString() + ")"
          );
        }
        copy(e) {
          const t = new sa(this.comparator);
          return (t.data = e), t;
        }
      }
      class ia {
        constructor(e) {
          this.iter = e;
        }
        getNext() {
          return this.iter.getNext().key;
        }
        hasNext() {
          return this.iter.hasNext();
        }
      }
      function aa(e) {
        return e.hasNext() ? e.getNext() : void 0;
      }
      const oa = new ta(ds.comparator);
      const ua = new ta(ds.comparator);
      function ha() {
        return new ea(
          (e) => e.toString(),
          (e, t) => e.isEqual(t)
        );
      }
      const ca = new ta(ds.comparator),
        la = new sa(ds.comparator);
      function da(...e) {
        let t = la;
        for (const n of e) t = t.add(n);
        return t;
      }
      const fa = new sa(Br);
      class ga {
        constructor(e, t, n, r, s) {
          (this.snapshotVersion = e),
            (this.targetChanges = t),
            (this.targetMismatches = n),
            (this.documentUpdates = r),
            (this.resolvedLimboDocuments = s);
        }
        static createSynthesizedRemoteEventForCurrentChange(e, t) {
          const n = new Map();
          return (
            n.set(e, ma.createSynthesizedTargetChangeForCurrentChange(e, t)),
            new ga($r.min(), n, fa, oa, da())
          );
        }
      }
      class ma {
        constructor(e, t, n, r, s) {
          (this.resumeToken = e),
            (this.current = t),
            (this.addedDocuments = n),
            (this.modifiedDocuments = r),
            (this.removedDocuments = s);
        }
        static createSynthesizedTargetChangeForCurrentChange(e, t) {
          return new ma(es.EMPTY_BYTE_STRING, t, da(), da(), da());
        }
      }
      class pa {
        constructor(e, t, n, r) {
          (this.O = e),
            (this.removedTargetIds = t),
            (this.key = n),
            (this.F = r);
        }
      }
      class ya {
        constructor(e, t) {
          (this.targetId = e), (this.$ = t);
        }
      }
      class va {
        constructor(e, t, n = es.EMPTY_BYTE_STRING, r = null) {
          (this.state = e),
            (this.targetIds = t),
            (this.resumeToken = n),
            (this.cause = r);
        }
      }
      class wa {
        constructor() {
          (this.B = 0),
            (this.L = Ea()),
            (this.U = es.EMPTY_BYTE_STRING),
            (this.q = !1),
            (this.G = !0);
        }
        get current() {
          return this.q;
        }
        get resumeToken() {
          return this.U;
        }
        get K() {
          return 0 !== this.B;
        }
        get j() {
          return this.G;
        }
        W(e) {
          0 < e.approximateByteSize() && ((this.G = !0), (this.U = e));
        }
        H() {
          let n = da(),
            r = da(),
            s = da();
          return (
            this.L.forEach((e, t) => {
              switch (t) {
                case 0:
                  n = n.add(e);
                  break;
                case 2:
                  r = r.add(e);
                  break;
                case 1:
                  s = s.add(e);
                  break;
                default:
                  Ar();
              }
            }),
            new ma(this.U, this.q, n, r, s)
          );
        }
        J() {
          (this.G = !1), (this.L = Ea());
        }
        Y(e, t) {
          (this.G = !0), (this.L = this.L.insert(e, t));
        }
        X(e) {
          (this.G = !0), (this.L = this.L.remove(e));
        }
        Z() {
          this.B += 1;
        }
        tt() {
          --this.B;
        }
        et() {
          (this.G = !0), (this.q = !0);
        }
      }
      class ba {
        constructor(e) {
          (this.nt = e),
            (this.st = new Map()),
            (this.it = oa),
            (this.rt = Ia()),
            (this.ot = new sa(Br));
        }
        ut(e) {
          for (const t of e.O)
            e.F && e.F.isFoundDocument()
              ? this.at(t, e.F)
              : this.ct(t, e.key, e.F);
          for (const n of e.removedTargetIds) this.ct(n, e.key, e.F);
        }
        ht(n) {
          this.forEachTarget(n, (e) => {
            const t = this.lt(e);
            switch (n.state) {
              case 0:
                this.ft(e) && t.W(n.resumeToken);
                break;
              case 1:
                t.tt(), t.K || t.J(), t.W(n.resumeToken);
                break;
              case 2:
                t.tt(), t.K || this.removeTarget(e);
                break;
              case 3:
                this.ft(e) && (t.et(), t.W(n.resumeToken));
                break;
              case 4:
                this.ft(e) && (this.dt(e), t.W(n.resumeToken));
                break;
              default:
                Ar();
            }
          });
        }
        forEachTarget(e, n) {
          0 < e.targetIds.length
            ? e.targetIds.forEach(n)
            : this.st.forEach((e, t) => {
                this.ft(t) && n(t);
              });
        }
        _t(e) {
          const t = e.targetId,
            n = e.$.count,
            r = this.wt(t);
          if (r) {
            const e = r.target;
            if (Ks(e))
              if (0 === n) {
                const n = new ds(e.path);
                this.ct(t, n, Rs.newNoDocument(n, $r.min()));
              } else Dr(1 === n);
            else this.gt(t) !== n && (this.dt(t), (this.ot = this.ot.add(t)));
          }
        }
        yt(r) {
          const s = new Map();
          this.st.forEach((e, t) => {
            var n = this.wt(t);
            if (n) {
              if (e.current && Ks(n.target)) {
                const s = new ds(n.target.path);
                null !== this.it.get(s) ||
                  this.It(t, s) ||
                  this.ct(t, s, Rs.newNoDocument(s, r));
              }
              e.j && (s.set(t, e.H()), e.J());
            }
          });
          let i = da();
          this.rt.forEach((e, t) => {
            let n = !0;
            t.forEachWhile((e) => {
              var t = this.wt(e);
              return !t || 2 === t.purpose || (n = !1);
            }),
              n && (i = i.add(e));
          }),
            this.it.forEach((e, t) => t.setReadTime(r));
          var e = new ga(r, s, this.ot, this.it, i);
          return (this.it = oa), (this.rt = Ia()), (this.ot = new sa(Br)), e;
        }
        at(e, t) {
          var n;
          this.ft(e) &&
            ((n = this.It(e, t.key) ? 2 : 0),
            this.lt(e).Y(t.key, n),
            (this.it = this.it.insert(t.key, t)),
            (this.rt = this.rt.insert(t.key, this.Tt(t.key).add(e))));
        }
        ct(e, t, n) {
          if (this.ft(e)) {
            const r = this.lt(e);
            this.It(e, t) ? r.Y(t, 1) : r.X(t),
              (this.rt = this.rt.insert(t, this.Tt(t).delete(e))),
              n && (this.it = this.it.insert(t, n));
          }
        }
        removeTarget(e) {
          this.st.delete(e);
        }
        gt(e) {
          var t = this.lt(e).H();
          return (
            this.nt.getRemoteKeysForTarget(e).size +
            t.addedDocuments.size -
            t.removedDocuments.size
          );
        }
        Z(e) {
          this.lt(e).Z();
        }
        lt(e) {
          let t = this.st.get(e);
          return t || ((t = new wa()), this.st.set(e, t)), t;
        }
        Tt(e) {
          let t = this.rt.get(e);
          return t || ((t = new sa(Br)), (this.rt = this.rt.insert(e, t))), t;
        }
        ft(e) {
          var t = null !== this.wt(e);
          return (
            t || Er("WatchChangeAggregator", "Detected inactive target", e), t
          );
        }
        wt(e) {
          var t = this.st.get(e);
          return t && t.K ? null : this.nt.Et(e);
        }
        dt(t) {
          this.st.set(t, new wa()),
            this.nt.getRemoteKeysForTarget(t).forEach((e) => {
              this.ct(t, e, null);
            });
        }
        It(e, t) {
          return this.nt.getRemoteKeysForTarget(e).has(t);
        }
      }
      function Ia() {
        return new ta(ds.comparator);
      }
      function Ea() {
        return new ta(ds.comparator);
      }
      const Ta = { asc: "ASCENDING", desc: "DESCENDING" },
        _a = {
          "<": "LESS_THAN",
          "<=": "LESS_THAN_OR_EQUAL",
          ">": "GREATER_THAN",
          ">=": "GREATER_THAN_OR_EQUAL",
          "==": "EQUAL",
          "!=": "NOT_EQUAL",
          "array-contains": "ARRAY_CONTAINS",
          in: "IN",
          "not-in": "NOT_IN",
          "array-contains-any": "ARRAY_CONTAINS_ANY",
        };
      class Sa {
        constructor(e, t) {
          (this.databaseId = e), (this.N = t);
        }
      }
      function Aa(e, t) {
        return e.N
          ? `${new Date(1e3 * t.seconds)
              .toISOString()
              .replace(/\.\d*/, "")
              .replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
          : { seconds: "" + t.seconds, nanos: t.nanoseconds };
      }
      function Da(e, t) {
        return e.N ? t.toBase64() : t.toUint8Array();
      }
      function xa(e) {
        return (
          Dr(!!e), $r.fromTimestamp(((t = ns(e)), new Kr(t.seconds, t.nanos)))
        );
        var t;
      }
      function Na(e, t) {
        return (
          (e = e),
          new Yr(["projects", e.projectId, "databases", e.database])
            .child("documents")
            .child(t)
            .canonicalString()
        );
      }
      function Ca(e) {
        var t = Yr.fromString(e);
        return Dr(Ha(t)), t;
      }
      function ka(e, t) {
        return Na(e.databaseId, t.path);
      }
      function Ra(e, t) {
        const n = Ca(t);
        if (n.get(1) !== e.databaseId.projectId)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " +
              n.get(1) +
              " vs " +
              e.databaseId.projectId
          );
        if (n.get(3) !== e.databaseId.database)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " +
              n.get(3) +
              " vs " +
              e.databaseId.database
          );
        return new ds(Oa(n));
      }
      function Ma(e, t) {
        return Na(e.databaseId, t);
      }
      function La(e) {
        var t = Ca(e);
        return 4 === t.length ? Yr.emptyPath() : Oa(t);
      }
      function Va(e) {
        return new Yr([
          "projects",
          e.databaseId.projectId,
          "databases",
          e.databaseId.database,
        ]).canonicalString();
      }
      function Oa(e) {
        return Dr(4 < e.length && "documents" === e.get(4)), e.popFirst(5);
      }
      function Pa(e, t, n) {
        return { name: ka(e, t), fields: n.value.mapValue.fields };
      }
      function Fa(e, t, n) {
        const r = Ra(e, t.name),
          s = xa(t.updateTime),
          i = new ks({ mapValue: { fields: t.fields } }),
          a = Rs.newFoundDocument(r, s, i);
        return (
          n && a.setHasCommittedMutations(),
          n ? a.setHasCommittedMutations() : a
        );
      }
      function qa(e, t) {
        let n;
        if (t instanceof Ki) n = { update: Pa(e, t.key, t.value) };
        else if (t instanceof Qi) n = { delete: ka(e, t.key) };
        else if (t instanceof $i)
          n = {
            update: Pa(e, t.key, t.data),
            updateMask: (function (e) {
              const t = [];
              return (
                e.fields.forEach((e) => t.push(e.canonicalString())),
                { fieldPaths: t }
              );
            })(t.fieldMask),
          };
        else {
          if (!(t instanceof Yi)) return Ar();
          n = { verify: ka(e, t.key) };
        }
        return (
          0 < t.fieldTransforms.length &&
            (n.updateTransforms = t.fieldTransforms.map((e) =>
              (function (e) {
                var t = e.transform;
                if (t instanceof Di)
                  return {
                    fieldPath: e.field.canonicalString(),
                    setToServerValue: "REQUEST_TIME",
                  };
                if (t instanceof xi)
                  return {
                    fieldPath: e.field.canonicalString(),
                    appendMissingElements: { values: t.elements },
                  };
                if (t instanceof Ci)
                  return {
                    fieldPath: e.field.canonicalString(),
                    removeAllFromArray: { values: t.elements },
                  };
                if (t instanceof Ri)
                  return {
                    fieldPath: e.field.canonicalString(),
                    increment: t.k,
                  };
                throw Ar();
              })(e)
            )),
          t.precondition.isNone ||
            (n.currentDocument =
              void 0 !== (r = t.precondition).updateTime
                ? { updateTime: ((t = r.updateTime), Aa(e, t.toTimestamp())) }
                : void 0 !== r.exists
                ? { exists: r.exists }
                : Ar()),
          n
        );
        var r;
      }
      function Ua(t, n) {
        const e = n.currentDocument
            ? void 0 !== (s = n.currentDocument).updateTime
              ? Pi.updateTime(xa(s.updateTime))
              : void 0 !== s.exists
              ? Pi.exists(s.exists)
              : Pi.none()
            : Pi.none(),
          r = n.updateTransforms
            ? n.updateTransforms.map((e) =>
                (function (e, t) {
                  let n = null;
                  if ("setToServerValue" in t)
                    Dr("REQUEST_TIME" === t.setToServerValue), (n = new Di());
                  else if ("appendMissingElements" in t) {
                    const e = t.appendMissingElements.values || [];
                    n = new xi(e);
                  } else if ("removeAllFromArray" in t) {
                    const e = t.removeAllFromArray.values || [];
                    n = new Ci(e);
                  } else "increment" in t ? (n = new Ri(e, t.increment)) : Ar();
                  var r = Jr.fromServerFormat(t.fieldPath);
                  return new Vi(r, n);
                })(t, e)
              )
            : [];
        var s;
        if (n.update) {
          n.update.name;
          var i = Ra(t, n.update.name),
            a = new ks({ mapValue: { fields: n.update.fields } });
          if (n.updateMask) {
            const t = (function () {
              const e = n.updateMask.fieldPaths || [];
              return new Zr(e.map((e) => Jr.fromServerFormat(e)));
            })();
            return new $i(i, a, t, e, r);
          }
          return new Ki(i, a, e, r);
        }
        if (n.delete) {
          const r = Ra(t, n.delete);
          return new Qi(r, e);
        }
        if (n.verify) {
          const r = Ra(t, n.verify);
          return new Yi(r, e);
        }
        return Ar();
      }
      function Ba(e, t) {
        return { documents: [Ma(e, t.path)] };
      }
      function Ga(e, t) {
        const n = { structuredQuery: {} },
          r = t.path;
        null !== t.collectionGroup
          ? ((n.parent = Ma(e, r)),
            (n.structuredQuery.from = [
              { collectionId: t.collectionGroup, allDescendants: !0 },
            ]))
          : ((n.parent = Ma(e, r.popLast())),
            (n.structuredQuery.from = [{ collectionId: r.lastSegment() }]));
        var s = (function (e) {
          if (0 !== e.length) {
            var t = e.map((e) =>
              (function (e) {
                if ("==" === e.op) {
                  if (Ss(e.value))
                    return {
                      unaryFilter: { field: Ka(e.field), op: "IS_NAN" },
                    };
                  if (_s(e.value))
                    return {
                      unaryFilter: { field: Ka(e.field), op: "IS_NULL" },
                    };
                } else if ("!=" === e.op) {
                  if (Ss(e.value))
                    return {
                      unaryFilter: { field: Ka(e.field), op: "IS_NOT_NAN" },
                    };
                  if (_s(e.value))
                    return {
                      unaryFilter: { field: Ka(e.field), op: "IS_NOT_NULL" },
                    };
                }
                return {
                  fieldFilter: {
                    field: Ka(e.field),
                    op: ((t = e.op), _a[t]),
                    value: e.value,
                  },
                };
                var t;
              })(e)
            );
            return 1 === t.length
              ? t[0]
              : { compositeFilter: { op: "AND", filters: t } };
          }
        })(t.filters);
        s && (n.structuredQuery.where = s);
        s = (function (e) {
          if (0 !== e.length)
            return e.map((e) =>
              (function (e) {
                return { field: Ka(e.field), direction: ((e = e.dir), Ta[e]) };
              })(e)
            );
        })(t.orderBy);
        s && (n.structuredQuery.orderBy = s);
        var i,
          s = ((i = t.limit), e.N || hs(i) ? i : { value: i });
        return (
          null !== s && (n.structuredQuery.limit = s),
          t.startAt &&
            (n.structuredQuery.startAt = {
              before: (s = t.startAt).inclusive,
              values: s.position,
            }),
          t.endAt &&
            (n.structuredQuery.endAt = {
              before: !(t = t.endAt).inclusive,
              values: t.position,
            }),
          n
        );
      }
      function ja(e) {
        let t = La(e.parent);
        const n = e.structuredQuery,
          r = n.from ? n.from.length : 0;
        let s = null;
        if (0 < r) {
          Dr(1 === r);
          const g = n.from[0];
          g.allDescendants
            ? (s = g.collectionId)
            : (t = t.child(g.collectionId));
        }
        let i = [];
        n.where &&
          (i = (function t(e) {
            return e
              ? void 0 !== e.unaryFilter
                ? [Wa(e)]
                : void 0 !== e.fieldFilter
                ? [za(e)]
                : void 0 !== e.compositeFilter
                ? e.compositeFilter.filters
                    .map((e) => t(e))
                    .reduce((e, t) => e.concat(t))
                : Ar()
              : [];
          })(n.where));
        let a = [];
        n.orderBy &&
          (a = n.orderBy.map((e) =>
            (function (e) {
              return new ni(
                $a(e.field),
                (function () {
                  switch (e.direction) {
                    case "ASCENDING":
                      return "asc";
                    case "DESCENDING":
                      return "desc";
                    default:
                      return;
                  }
                })()
              );
            })(e)
          ));
        let o = null;
        var u, h, c, l;
        n.limit &&
          (o =
            ((e = n.limit),
            hs((u = "object" == typeof e ? e.value : e)) ? null : u));
        let d = null;
        n.startAt &&
          (d =
            ((h = n.startAt),
            (l = !!h.before),
            (c = h.values || []),
            new ti(c, l)));
        let f = null;
        return (
          n.endAt &&
            (f =
              ((h = n.endAt),
              (c = !h.before),
              (l = h.values || []),
              new ti(l, c))),
          ai(t, s, a, i, o, "F", d, f)
        );
      }
      function Ka(e) {
        return { fieldPath: e.canonicalString() };
      }
      function $a(e) {
        return Jr.fromServerFormat(e.fieldPath);
      }
      function za(e) {
        return zs.create(
          $a(e.fieldFilter.field),
          (function () {
            switch (e.fieldFilter.op) {
              case "EQUAL":
                return "==";
              case "NOT_EQUAL":
                return "!=";
              case "GREATER_THAN":
                return ">";
              case "GREATER_THAN_OR_EQUAL":
                return ">=";
              case "LESS_THAN":
                return "<";
              case "LESS_THAN_OR_EQUAL":
                return "<=";
              case "ARRAY_CONTAINS":
                return "array-contains";
              case "IN":
                return "in";
              case "NOT_IN":
                return "not-in";
              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any";
              default:
                return Ar();
            }
          })(),
          e.fieldFilter.value
        );
      }
      function Wa(e) {
        switch (e.unaryFilter.op) {
          case "IS_NAN":
            var t = $a(e.unaryFilter.field);
            return zs.create(t, "==", { doubleValue: NaN });
          case "IS_NULL":
            t = $a(e.unaryFilter.field);
            return zs.create(t, "==", { nullValue: "NULL_VALUE" });
          case "IS_NOT_NAN":
            var n = $a(e.unaryFilter.field);
            return zs.create(n, "!=", { doubleValue: NaN });
          case "IS_NOT_NULL":
            n = $a(e.unaryFilter.field);
            return zs.create(n, "!=", { nullValue: "NULL_VALUE" });
          default:
            return Ar();
        }
      }
      function Ha(e) {
        return (
          4 <= e.length && "projects" === e.get(0) && "databases" === e.get(2)
        );
      }
      function Qa(e) {
        let t = "";
        for (let n = 0; n < e.length; n++)
          0 < t.length && (t = Ya(t)),
            (t = (function (e, t) {
              let n = t;
              const r = e.length;
              for (let s = 0; s < r; s++) {
                const r = e.charAt(s);
                switch (r) {
                  case "\0":
                    n += "";
                    break;
                  case "":
                    n += "";
                    break;
                  default:
                    n += r;
                }
              }
              return n;
            })(e.get(n), t));
        return Ya(t);
      }
      function Ya(e) {
        return e + "";
      }
      function Xa(t) {
        const n = t.length;
        if ((Dr(2 <= n), 2 === n))
          return Dr("" === t.charAt(0) && "" === t.charAt(1)), Yr.emptyPath();
        const r = n - 2,
          s = [];
        let i = "";
        for (let a = 0; a < n; ) {
          const n = t.indexOf("", a);
          switch (((n < 0 || n > r) && Ar(), t.charAt(n + 1))) {
            case "":
              const r = t.substring(a, n);
              let e;
              0 === i.length ? (e = r) : ((i += r), (e = i), (i = "")),
                s.push(e);
              break;
            case "":
              (i += t.substring(a, n)), (i += "\0");
              break;
            case "":
              i += t.substring(a, n + 1);
              break;
            default:
              Ar();
          }
          a = n + 2;
        }
        return new Yr(s);
      }
      const Ja = ["userId", "batchId"];
      function Za(e, t) {
        return [e, Qa(t)];
      }
      function eo(e, t, n) {
        return [e, Qa(t), n];
      }
      const to = {},
        no = ["prefixPath", "collectionGroup", "readTime", "documentId"],
        ro = ["prefixPath", "collectionGroup", "documentId"],
        so = ["collectionGroup", "readTime", "prefixPath", "documentId"],
        io = ["canonicalId", "targetId"],
        ao = ["targetId", "path"],
        oo = ["path", "targetId"],
        uo = ["collectionId", "parent"],
        ho = ["indexId", "uid"],
        co = ["uid", "sequenceNumber"],
        lo = [
          "indexId",
          "uid",
          "arrayValue",
          "directionalValue",
          "documentKey",
        ],
        fo = ["indexId", "uid", "documentKey"],
        go = ["userId", "collectionPath", "documentId"],
        mo = ["userId", "collectionPath", "largestBatchId"],
        po = ["userId", "collectionGroup", "largestBatchId"],
        yo = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocuments",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
        ],
        vo = [...yo, "documentOverlays"],
        wo = [
          "mutationQueues",
          "mutations",
          "documentMutations",
          "remoteDocumentsV14",
          "targets",
          "owner",
          "targetGlobal",
          "targetDocuments",
          "clientMetadata",
          "remoteDocumentGlobal",
          "collectionParents",
          "bundles",
          "namedQueries",
          "documentOverlays",
        ],
        bo = [...wo, "indexConfiguration", "indexState", "indexEntries"],
        Io =
          "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
      class Eo {
        constructor() {
          this.onCommittedListeners = [];
        }
        addOnCommittedListener(e) {
          this.onCommittedListeners.push(e);
        }
        raiseOnCommittedEvent() {
          this.onCommittedListeners.forEach((e) => e());
        }
      }
      class To {
        constructor(e) {
          (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            e(
              (e) => {
                (this.isDone = !0),
                  (this.result = e),
                  this.nextCallback && this.nextCallback(e);
              },
              (e) => {
                (this.isDone = !0),
                  (this.error = e),
                  this.catchCallback && this.catchCallback(e);
              }
            );
        }
        catch(e) {
          return this.next(void 0, e);
        }
        next(r, s) {
          return (
            this.callbackAttached && Ar(),
            (this.callbackAttached = !0),
            this.isDone
              ? this.error
                ? this.wrapFailure(s, this.error)
                : this.wrapSuccess(r, this.result)
              : new To((t, n) => {
                  (this.nextCallback = (e) => {
                    this.wrapSuccess(r, e).next(t, n);
                  }),
                    (this.catchCallback = (e) => {
                      this.wrapFailure(s, e).next(t, n);
                    });
                })
          );
        }
        toPromise() {
          return new Promise((e, t) => {
            this.next(e, t);
          });
        }
        wrapUserFunction(e) {
          try {
            var t = e();
            return t instanceof To ? t : To.resolve(t);
          } catch (e) {
            return To.reject(e);
          }
        }
        wrapSuccess(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : To.resolve(t);
        }
        wrapFailure(e, t) {
          return e ? this.wrapUserFunction(() => e(t)) : To.reject(t);
        }
        static resolve(n) {
          return new To((e, t) => {
            e(n);
          });
        }
        static reject(n) {
          return new To((e, t) => {
            t(n);
          });
        }
        static waitFor(e) {
          return new To((t, n) => {
            let r = 0,
              s = 0,
              i = !1;
            e.forEach((e) => {
              ++r,
                e.next(
                  () => {
                    ++s, i && s === r && t();
                  },
                  (e) => n(e)
                );
            }),
              (i = !0),
              s === r && t();
          });
        }
        static or(e) {
          let t = To.resolve(!1);
          for (const n of e) t = t.next((e) => (e ? To.resolve(e) : n()));
          return t;
        }
        static forEach(e, n) {
          const r = [];
          return (
            e.forEach((e, t) => {
              r.push(n.call(this, e, t));
            }),
            this.waitFor(r)
          );
        }
      }
      class _o {
        constructor(n, e) {
          (this.action = n),
            (this.transaction = e),
            (this.aborted = !1),
            (this.At = new Cr()),
            (this.transaction.oncomplete = () => {
              this.At.resolve();
            }),
            (this.transaction.onabort = () => {
              e.error ? this.At.reject(new Do(n, e.error)) : this.At.resolve();
            }),
            (this.transaction.onerror = (e) => {
              var t = Ro(e.target.error);
              this.At.reject(new Do(n, t));
            });
        }
        static open(e, t, n, r) {
          try {
            return new _o(t, e.transaction(r, n));
          } catch (e) {
            throw new Do(t, e);
          }
        }
        get Rt() {
          return this.At.promise;
        }
        abort(e) {
          e && this.At.reject(e),
            this.aborted ||
              (Er(
                "SimpleDb",
                "Aborting transaction:",
                e ? e.message : "Client-initiated abort"
              ),
              (this.aborted = !0),
              this.transaction.abort());
        }
        bt() {
          const e = this.transaction;
          this.aborted || "function" != typeof e.commit || e.commit();
        }
        store(e) {
          var t = this.transaction.objectStore(e);
          return new No(t);
        }
      }
      class So {
        constructor(e, t, n) {
          (this.name = e),
            (this.version = t),
            (this.Pt = n),
            12.2 === So.Vt(f()) &&
              Tr(
                "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
              );
        }
        static delete(e) {
          return (
            Er("SimpleDb", "Removing database:", e),
            Co(window.indexedDB.deleteDatabase(e)).toPromise()
          );
        }
        static vt() {
          if ("object" != typeof indexedDB) return !1;
          if (So.St()) return !0;
          const e = f(),
            t = So.Vt(e),
            n = 0 < t && t < 10,
            r = So.Dt(e),
            s = 0 < r && r < 4.5;
          return !(
            0 < e.indexOf("MSIE ") ||
            0 < e.indexOf("Trident/") ||
            0 < e.indexOf("Edge/") ||
            n ||
            s
          );
        }
        static St() {
          var e;
          return (
            "undefined" != typeof process &&
            "YES" ===
              (null === (e = process.env) || void 0 === e ? void 0 : e.Ct)
          );
        }
        static xt(e, t) {
          return e.store(t);
        }
        static Vt(e) {
          const t = e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
            n = t ? t[1].split("_").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        static Dt(e) {
          const t = e.match(/Android ([\d.]+)/i),
            n = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
          return Number(n);
        }
        async Nt(i) {
          return (
            this.db ||
              (Er("SimpleDb", "Opening database:", this.name),
              (this.db = await new Promise((n, r) => {
                const s = indexedDB.open(this.name, this.version);
                (s.onsuccess = (e) => {
                  var t = e.target.result;
                  n(t);
                }),
                  (s.onblocked = () => {
                    r(
                      new Do(
                        i,
                        "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                      )
                    );
                  }),
                  (s.onerror = (e) => {
                    var t = e.target.error;
                    "VersionError" === t.name
                      ? r(
                          new Nr(
                            xr.FAILED_PRECONDITION,
                            "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                          )
                        )
                      : "InvalidStateError" === t.name
                      ? r(
                          new Nr(
                            xr.FAILED_PRECONDITION,
                            "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                              t
                          )
                        )
                      : r(new Do(i, t));
                  }),
                  (s.onupgradeneeded = (e) => {
                    Er(
                      "SimpleDb",
                      'Database "' +
                        this.name +
                        '" requires upgrade from version:',
                      e.oldVersion
                    );
                    var t = e.target.result;
                    this.Pt.kt(
                      t,
                      s.transaction,
                      e.oldVersion,
                      this.version
                    ).next(() => {
                      Er(
                        "SimpleDb",
                        "Database upgrade to version " +
                          this.version +
                          " complete"
                      );
                    });
                  });
              }))),
            this.Mt && (this.db.onversionchange = (e) => this.Mt(e)),
            this.db
          );
        }
        Ot(t) {
          (this.Mt = t), this.db && (this.db.onversionchange = (e) => t(e));
        }
        async runTransaction(e, t, n, r) {
          var s = "readonly" === t;
          let i = 0;
          for (;;) {
            ++i;
            try {
              this.db = await this.Nt(e);
              const t = _o.open(this.db, e, s ? "readonly" : "readwrite", n),
                i = r(t)
                  .next((e) => (t.bt(), e))
                  .catch((e) => (t.abort(e), To.reject(e)))
                  .toPromise();
              return i.catch(() => {}), await t.Rt, i;
            } catch (e) {
              const t = "FirebaseError" !== e.name && i < 3;
              if (
                (Er(
                  "SimpleDb",
                  "Transaction failed with error:",
                  e.message,
                  "Retrying:",
                  t
                ),
                this.close(),
                !t)
              )
                return Promise.reject(e);
            }
          }
        }
        close() {
          this.db && this.db.close(), (this.db = void 0);
        }
      }
      class Ao {
        constructor(e) {
          (this.Ft = e), (this.$t = !1), (this.Bt = null);
        }
        get isDone() {
          return this.$t;
        }
        get Lt() {
          return this.Bt;
        }
        set cursor(e) {
          this.Ft = e;
        }
        done() {
          this.$t = !0;
        }
        Ut(e) {
          this.Bt = e;
        }
        delete() {
          return Co(this.Ft.delete());
        }
      }
      class Do extends Nr {
        constructor(e, t) {
          super(xr.UNAVAILABLE, `IndexedDB transaction '${e}' failed: ${t}`),
            (this.name = "IndexedDbTransactionError");
        }
      }
      function xo(e) {
        return "IndexedDbTransactionError" === e.name;
      }
      class No {
        constructor(e) {
          this.store = e;
        }
        put(e, t) {
          let n;
          return (
            (n =
              void 0 !== t
                ? (Er("SimpleDb", "PUT", this.store.name, e, t),
                  this.store.put(t, e))
                : (Er("SimpleDb", "PUT", this.store.name, "<auto-key>", e),
                  this.store.put(e))),
            Co(n)
          );
        }
        add(e) {
          return (
            Er("SimpleDb", "ADD", this.store.name, e, e), Co(this.store.add(e))
          );
        }
        get(t) {
          return Co(this.store.get(t)).next(
            (e) => (
              Er(
                "SimpleDb",
                "GET",
                this.store.name,
                t,
                (e = void 0 === e ? null : e)
              ),
              e
            )
          );
        }
        delete(e) {
          return (
            Er("SimpleDb", "DELETE", this.store.name, e),
            Co(this.store.delete(e))
          );
        }
        count() {
          return (
            Er("SimpleDb", "COUNT", this.store.name), Co(this.store.count())
          );
        }
        qt(e, n) {
          var t = this.options(e, n);
          if (t.index || "function" != typeof this.store.getAll) {
            const e = this.cursor(t),
              n = [];
            return this.Gt(e, (e, t) => {
              n.push(t);
            }).next(() => n);
          }
          {
            const e = this.store.getAll(t.range);
            return new To((t, n) => {
              (e.onerror = (e) => {
                n(e.target.error);
              }),
                (e.onsuccess = (e) => {
                  t(e.target.result);
                });
            });
          }
        }
        Kt(e, t) {
          const r = this.store.getAll(e, null === t ? void 0 : t);
          return new To((t, n) => {
            (r.onerror = (e) => {
              n(e.target.error);
            }),
              (r.onsuccess = (e) => {
                t(e.target.result);
              });
          });
        }
        Qt(e, t) {
          Er("SimpleDb", "DELETE ALL", this.store.name);
          const n = this.options(e, t);
          n.jt = !1;
          var r = this.cursor(n);
          return this.Gt(r, (e, t, n) => n.delete());
        }
        Wt(e, t) {
          let n;
          t ? (n = e) : ((n = {}), (t = e));
          var r = this.cursor(n);
          return this.Gt(r, t);
        }
        zt(s) {
          const e = this.cursor({});
          return new To((n, r) => {
            (e.onerror = (e) => {
              var t = Ro(e.target.error);
              r(t);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                t
                  ? s(t.primaryKey, t.value).next((e) => {
                      e ? t.continue() : n();
                    })
                  : n();
              });
          });
        }
        Gt(e, i) {
          const a = [];
          return new To((s, t) => {
            (e.onerror = (e) => {
              t(e.target.error);
            }),
              (e.onsuccess = (e) => {
                const t = e.target.result;
                if (t) {
                  const n = new Ao(t),
                    r = i(t.primaryKey, t.value, n);
                  if (r instanceof To) {
                    const e = r.catch((e) => (n.done(), To.reject(e)));
                    a.push(e);
                  }
                  n.isDone
                    ? s()
                    : null === n.Lt
                    ? t.continue()
                    : t.continue(n.Lt);
                } else s();
              });
          }).next(() => To.waitFor(a));
        }
        options(e, t) {
          let n;
          return (
            void 0 !== e && ("string" == typeof e ? (n = e) : (t = e)),
            { index: n, range: t }
          );
        }
        cursor(e) {
          let t = "next";
          if ((e.reverse && (t = "prev"), e.index)) {
            const n = this.store.index(e.index);
            return e.jt
              ? n.openKeyCursor(e.range, t)
              : n.openCursor(e.range, t);
          }
          return this.store.openCursor(e.range, t);
        }
      }
      function Co(e) {
        return new To((n, r) => {
          (e.onsuccess = (e) => {
            var t = e.target.result;
            n(t);
          }),
            (e.onerror = (e) => {
              var t = Ro(e.target.error);
              r(t);
            });
        });
      }
      let ko = !1;
      function Ro(e) {
        const t = So.Vt(f());
        if (12.2 <= t && t < 13) {
          const t =
            "An internal error was encountered in the Indexed Database server";
          if (0 <= e.message.indexOf(t)) {
            const e = new Nr(
              "internal",
              `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
            );
            return (
              ko ||
                ((ko = !0),
                setTimeout(() => {
                  throw e;
                }, 0)),
              e
            );
          }
        }
        return e;
      }
      class Mo extends Eo {
        constructor(e, t) {
          super(), (this.Ht = e), (this.currentSequenceNumber = t);
        }
      }
      function Lo(e, t) {
        var n = e;
        return So.xt(n.Ht, t);
      }
      class Vo {
        constructor(e, t, n, r) {
          (this.batchId = e),
            (this.localWriteTime = t),
            (this.baseMutations = n),
            (this.mutations = r);
        }
        applyToRemoteDocument(e, t) {
          var n = t.mutationResults;
          for (let r = 0; r < this.mutations.length; r++) {
            const s = this.mutations[r];
            s.key.isEqual(e.key) && Ui(s, e, n[r]);
          }
        }
        applyToLocalView(e) {
          for (const t of this.baseMutations)
            t.key.isEqual(e.key) && Bi(t, e, this.localWriteTime);
          for (const n of this.mutations)
            n.key.isEqual(e.key) && Bi(n, e, this.localWriteTime);
        }
        applyToLocalDocumentSet(r) {
          this.mutations.forEach((e) => {
            const t = r.get(e.key),
              n = t;
            this.applyToLocalView(n),
              t.isValidDocument() || n.convertToNoDocument($r.min());
          });
        }
        keys() {
          return this.mutations.reduce((e, t) => e.add(t.key), da());
        }
        isEqual(e) {
          return (
            this.batchId === e.batchId &&
            Gr(this.mutations, e.mutations, (e, t) => Gi(e, t)) &&
            Gr(this.baseMutations, e.baseMutations, (e, t) => Gi(e, t))
          );
        }
      }
      class Oo {
        constructor(e, t, n, r) {
          (this.batch = e),
            (this.commitVersion = t),
            (this.mutationResults = n),
            (this.docVersions = r);
        }
        static from(e, t, n) {
          Dr(e.mutations.length === n.length);
          let r = ca;
          var s = e.mutations;
          for (let i = 0; i < s.length; i++)
            r = r.insert(s[i].key, n[i].version);
          return new Oo(e, t, n, r);
        }
      }
      class Po {
        constructor(e, t) {
          (this.largestBatchId = e), (this.mutation = t);
        }
        getKey() {
          return this.mutation.key;
        }
        isEqual(e) {
          return null !== e && this.mutation === e.mutation;
        }
        toString() {
          return `Overlay{\n      largestBatchId: ${
            this.largestBatchId
          },\n      mutation: ${this.mutation.toString()}\n    }`;
        }
      }
      class Fo {
        constructor(
          e,
          t,
          n,
          r,
          s = $r.min(),
          i = $r.min(),
          a = es.EMPTY_BYTE_STRING
        ) {
          (this.target = e),
            (this.targetId = t),
            (this.purpose = n),
            (this.sequenceNumber = r),
            (this.snapshotVersion = s),
            (this.lastLimboFreeSnapshotVersion = i),
            (this.resumeToken = a);
        }
        withSequenceNumber(e) {
          return new Fo(
            this.target,
            this.targetId,
            this.purpose,
            e,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken
          );
        }
        withResumeToken(e, t) {
          return new Fo(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            t,
            this.lastLimboFreeSnapshotVersion,
            e
          );
        }
        withLastLimboFreeSnapshotVersion(e) {
          return new Fo(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            e,
            this.resumeToken
          );
        }
      }
      class qo {
        constructor(e) {
          this.Jt = e;
        }
      }
      function Uo(e, t) {
        const n = t.key,
          r = {
            prefixPath: n.getCollectionPath().popLast().toArray(),
            collectionGroup: n.collectionGroup,
            documentId: n.path.lastSegment(),
            readTime: Bo(t.readTime),
            hasCommittedMutations: t.hasCommittedMutations,
          };
        if (t.isFoundDocument())
          r.document = {
            name: ka((s = e.Jt), (e = t).key),
            fields: e.data.value.mapValue.fields,
            updateTime: Aa(s, e.version.toTimestamp()),
          };
        else if (t.isNoDocument())
          r.noDocument = { path: n.path.toArray(), readTime: Go(t.version) };
        else {
          if (!t.isUnknownDocument()) return Ar();
          r.unknownDocument = {
            path: n.path.toArray(),
            version: Go(t.version),
          };
        }
        var s;
        return r;
      }
      function Bo(e) {
        var t = e.toTimestamp();
        return [t.seconds, t.nanoseconds];
      }
      function Go(e) {
        var t = e.toTimestamp();
        return { seconds: t.seconds, nanoseconds: t.nanoseconds };
      }
      function jo(e) {
        var t = new Kr(e.seconds, e.nanoseconds);
        return $r.fromTimestamp(t);
      }
      function Ko(t, e) {
        const n = (e.baseMutations || []).map((e) => Ua(t.Jt, e));
        for (let i = 0; i < e.mutations.length - 1; ++i) {
          const n = e.mutations[i];
          if (
            i + 1 < e.mutations.length &&
            void 0 !== e.mutations[i + 1].transform
          ) {
            const r = e.mutations[i + 1];
            (n.updateTransforms = r.transform.fieldTransforms),
              e.mutations.splice(i + 1, 1),
              ++i;
          }
        }
        const r = e.mutations.map((e) => Ua(t.Jt, e)),
          s = Kr.fromMillis(e.localWriteTimeMs);
        return new Vo(e.batchId, s, n, r);
      }
      function $o(e) {
        var t,
          n = jo(e.readTime),
          r =
            void 0 !== e.lastLimboFreeSnapshotVersion
              ? jo(e.lastLimboFreeSnapshotVersion)
              : $r.min();
        let s;
        return (
          (s =
            void 0 !== e.query.documents
              ? (Dr(1 === (t = e.query).documents.length),
                gi(oi(La(t.documents[0]))))
              : gi(ja(e.query))),
          new Fo(
            s,
            e.targetId,
            0,
            e.lastListenSequenceNumber,
            n,
            r,
            es.fromBase64String(e.resumeToken)
          )
        );
      }
      function zo(e, t) {
        var n = Go(t.snapshotVersion),
          r = Go(t.lastLimboFreeSnapshotVersion),
          s = (Ks(t.target) ? Ba : Ga)(e.Jt, t.target),
          i = t.resumeToken.toBase64();
        return {
          targetId: t.targetId,
          canonicalId: Gs(t.target),
          readTime: n,
          resumeToken: i,
          lastListenSequenceNumber: t.sequenceNumber,
          lastLimboFreeSnapshotVersion: r,
          query: s,
        };
      }
      function Wo(e) {
        var t = ja({ parent: e.parent, structuredQuery: e.structuredQuery });
        return "LAST" === e.limitType ? mi(t, t.limit, "L") : t;
      }
      function Ho(e, t) {
        return new Po(t.largestBatchId, Ua(e.Jt, t.overlayMutation));
      }
      function Qo(e, t) {
        var n = t.path.lastSegment();
        return [e, Qa(t.path.popLast()), n];
      }
      class Yo {
        getBundleMetadata(e, t) {
          return Xo(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  id: (t = e).bundleId,
                  createTime: jo(t.createTime),
                  version: t.version,
                };
              var t;
            });
        }
        saveBundleMetadata(e, t) {
          return Xo(e).put({
            bundleId: (n = t).id,
            createTime: Go(xa(n.createTime)),
            version: n.version,
          });
          var n;
        }
        getNamedQuery(e, t) {
          return Jo(e)
            .get(t)
            .next((e) => {
              if (e)
                return {
                  name: (t = e).name,
                  query: Wo(t.bundledQuery),
                  readTime: jo(t.readTime),
                };
              var t;
            });
        }
        saveNamedQuery(e, t) {
          return Jo(e).put({
            name: (t = t).name,
            readTime: Go(xa(t.readTime)),
            bundledQuery: t.bundledQuery,
          });
        }
      }
      function Xo(e) {
        return Lo(e, "bundles");
      }
      function Jo(e) {
        return Lo(e, "namedQueries");
      }
      class Zo {
        constructor(e, t) {
          (this.M = e), (this.userId = t);
        }
        static Yt(e, t) {
          var n = t.uid || "";
          return new Zo(e, n);
        }
        getOverlay(e, t) {
          return eu(e)
            .get(Qo(this.userId, t))
            .next((e) => (e ? Ho(this.M, e) : null));
        }
        saveOverlays(r, s, e) {
          const i = [];
          return (
            e.forEach((e, t) => {
              var n = new Po(s, t);
              i.push(this.Xt(r, n));
            }),
            To.waitFor(i)
          );
        }
        removeOverlaysForBatchId(n, e, r) {
          const t = new Set();
          e.forEach((e) => t.add(Qa(e.getCollectionPath())));
          const s = [];
          return (
            t.forEach((e) => {
              var t = IDBKeyRange.bound(
                [this.userId, e, r],
                [this.userId, e, r + 1],
                !1,
                !0
              );
              s.push(eu(n).Qt("collectionPathOverlayIndex", t));
            }),
            To.waitFor(s)
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = ha(),
            s = Qa(t),
            i = IDBKeyRange.bound(
              [this.userId, s, n],
              [this.userId, s, Number.POSITIVE_INFINITY],
              !0
            );
          return eu(e)
            .qt("collectionPathOverlayIndex", i)
            .next((e) => {
              for (const t of e) {
                const e = Ho(this.M, t);
                r.set(e.getKey(), e);
              }
              return r;
            });
        }
        getOverlaysForCollectionGroup(e, t, n, s) {
          const i = ha();
          let a;
          var r = IDBKeyRange.bound(
            [this.userId, t, n],
            [this.userId, t, Number.POSITIVE_INFINITY],
            !0
          );
          return eu(e)
            .Wt(
              { index: "collectionGroupOverlayIndex", range: r },
              (e, t, n) => {
                const r = Ho(this.M, t);
                i.size() < s || r.largestBatchId === a
                  ? (i.set(r.getKey(), r), (a = r.largestBatchId))
                  : n.done();
              }
            )
            .next(() => i);
        }
        Xt(e, t) {
          return eu(e).put(
            (function (e, t, n) {
              var [, r, s] = Qo(t, n.mutation.key);
              return {
                userId: t,
                collectionPath: r,
                documentId: s,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: qa(e.Jt, n.mutation),
              };
            })(this.M, this.userId, t)
          );
        }
      }
      function eu(e) {
        return Lo(e, "documentOverlays");
      }
      class tu {
        constructor() {}
        Zt(e, t) {
          this.te(e, t), t.ee();
        }
        te(e, t) {
          var n, r;
          "nullValue" in e
            ? this.ne(t, 5)
            : "booleanValue" in e
            ? (this.ne(t, 10), t.se(e.booleanValue ? 1 : 0))
            : "integerValue" in e
            ? (this.ne(t, 15), t.se(rs(e.integerValue)))
            : "doubleValue" in e
            ? ((n = rs(e.doubleValue)),
              isNaN(n)
                ? this.ne(t, 13)
                : (this.ne(t, 15), cs(n) ? t.se(0) : t.se(n)))
            : "timestampValue" in e
            ? ((r = e.timestampValue),
              this.ne(t, 20),
              "string" == typeof r
                ? t.ie(r)
                : (t.ie(`${r.seconds || ""}`), t.se(r.nanos || 0)))
            : "stringValue" in e
            ? (this.re(e.stringValue, t), this.oe(t))
            : "bytesValue" in e
            ? (this.ne(t, 30), t.ue(ss(e.bytesValue)), this.oe(t))
            : "referenceValue" in e
            ? this.ae(e.referenceValue, t)
            : "geoPointValue" in e
            ? ((r = e.geoPointValue),
              this.ne(t, 45),
              t.se(r.latitude || 0),
              t.se(r.longitude || 0))
            : "mapValue" in e
            ? xs(e)
              ? this.ne(t, Number.MAX_SAFE_INTEGER)
              : (this.ce(e.mapValue, t), this.oe(t))
            : "arrayValue" in e
            ? (this.he(e.arrayValue, t), this.oe(t))
            : Ar();
        }
        re(e, t) {
          this.ne(t, 25), this.le(e, t);
        }
        le(e, t) {
          t.ie(e);
        }
        ce(e, t) {
          var n = e.fields || {};
          this.ne(t, 55);
          for (const e of Object.keys(n)) this.re(e, t), this.te(n[e], t);
        }
        he(e, t) {
          var n = e.values || [];
          this.ne(t, 50);
          for (const e of n) this.te(e, t);
        }
        ae(e, t) {
          this.ne(t, 37),
            ds.fromName(e).path.forEach((e) => {
              this.ne(t, 60), this.le(e, t);
            });
        }
        ne(e, t) {
          e.se(t);
        }
        oe(e) {
          e.se(2);
        }
      }
      function nu(e) {
        var t =
          64 -
          (function (e) {
            let t = 0;
            for (let r = 0; r < 8; ++r) {
              var n = (function (e) {
                if (0 === e) return 8;
                let t = 0;
                return (
                  e >> 4 == 0 && ((t += 4), (e <<= 4)),
                  e >> 6 == 0 && ((t += 2), (e <<= 2)),
                  e >> 7 == 0 && (t += 1),
                  t
                );
              })(255 & e[r]);
              if (((t += n), 8 !== n)) break;
            }
            return t;
          })(e);
        return Math.ceil(t / 8);
      }
      tu.fe = new tu();
      class ru {
        constructor() {
          (this.buffer = new Uint8Array(1024)), (this.position = 0);
        }
        de(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this._e(n.value), (n = t.next());
          this.we();
        }
        me(e) {
          const t = e[Symbol.iterator]();
          let n = t.next();
          for (; !n.done; ) this.ge(n.value), (n = t.next());
          this.ye();
        }
        pe(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this._e(e);
            else if (e < 2048)
              this._e(960 | (e >>> 6)), this._e(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this._e(480 | (e >>> 12)),
                this._e(128 | (63 & (e >>> 6))),
                this._e(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this._e(240 | (e >>> 18)),
                this._e(128 | (63 & (e >>> 12))),
                this._e(128 | (63 & (e >>> 6))),
                this._e(128 | (63 & e));
            }
          }
          this.we();
        }
        Ie(e) {
          for (const t of e) {
            const e = t.charCodeAt(0);
            if (e < 128) this.ge(e);
            else if (e < 2048)
              this.ge(960 | (e >>> 6)), this.ge(128 | (63 & e));
            else if (t < "\ud800" || "\udbff" < t)
              this.ge(480 | (e >>> 12)),
                this.ge(128 | (63 & (e >>> 6))),
                this.ge(128 | (63 & e));
            else {
              const e = t.codePointAt(0);
              this.ge(240 | (e >>> 18)),
                this.ge(128 | (63 & (e >>> 12))),
                this.ge(128 | (63 & (e >>> 6))),
                this.ge(128 | (63 & e));
            }
          }
          this.ye();
        }
        Te(e) {
          var t = this.Ee(e),
            n = nu(t);
          this.Ae(1 + n), (this.buffer[this.position++] = 255 & n);
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = 255 & t[r];
        }
        Re(e) {
          var t = this.Ee(e),
            n = nu(t);
          this.Ae(1 + n), (this.buffer[this.position++] = ~(255 & n));
          for (let r = t.length - n; r < t.length; ++r)
            this.buffer[this.position++] = ~(255 & t[r]);
        }
        be() {
          this.Pe(255), this.Pe(255);
        }
        Ve() {
          this.ve(255), this.ve(255);
        }
        reset() {
          this.position = 0;
        }
        seed(e) {
          this.Ae(e.length),
            this.buffer.set(e, this.position),
            (this.position += e.length);
        }
        Se() {
          return this.buffer.slice(0, this.position);
        }
        Ee(e) {
          const t = (function (e) {
              const t = new DataView(new ArrayBuffer(8));
              return t.setFloat64(0, e, !1), new Uint8Array(t.buffer);
            })(e),
            n = 0 != (128 & t[0]);
          t[0] ^= n ? 255 : 128;
          for (let r = 1; r < t.length; ++r) t[r] ^= n ? 255 : 0;
          return t;
        }
        _e(e) {
          var t = 255 & e;
          0 == t
            ? (this.Pe(0), this.Pe(255))
            : 255 == t
            ? (this.Pe(255), this.Pe(0))
            : this.Pe(t);
        }
        ge(e) {
          var t = 255 & e;
          0 == t
            ? (this.ve(0), this.ve(255))
            : 255 == t
            ? (this.ve(255), this.ve(0))
            : this.ve(e);
        }
        we() {
          this.Pe(0), this.Pe(1);
        }
        ye() {
          this.ve(0), this.ve(1);
        }
        Pe(e) {
          this.Ae(1), (this.buffer[this.position++] = e);
        }
        ve(e) {
          this.Ae(1), (this.buffer[this.position++] = ~e);
        }
        Ae(e) {
          var t = e + this.position;
          if (!(t <= this.buffer.length)) {
            let e = 2 * this.buffer.length;
            e < t && (e = t);
            const n = new Uint8Array(e);
            n.set(this.buffer), (this.buffer = n);
          }
        }
      }
      class su {
        constructor(e) {
          this.De = e;
        }
        ue(e) {
          this.De.de(e);
        }
        ie(e) {
          this.De.pe(e);
        }
        se(e) {
          this.De.Te(e);
        }
        ee() {
          this.De.be();
        }
      }
      class iu {
        constructor(e) {
          this.De = e;
        }
        ue(e) {
          this.De.me(e);
        }
        ie(e) {
          this.De.Ie(e);
        }
        se(e) {
          this.De.Re(e);
        }
        ee() {
          this.De.Ve();
        }
      }
      class au {
        constructor() {
          (this.De = new ru()),
            (this.Ce = new su(this.De)),
            (this.xe = new iu(this.De));
        }
        seed(e) {
          this.De.seed(e);
        }
        Ne(e) {
          return 0 === e ? this.Ce : this.xe;
        }
        Se() {
          return this.De.Se();
        }
        reset() {
          this.De.reset();
        }
      }
      class ou {
        constructor(e, t, n, r) {
          (this.indexId = e),
            (this.documentKey = t),
            (this.arrayValue = n),
            (this.directionalValue = r);
        }
        ke() {
          const e = this.directionalValue.length,
            t = 0 === e || 255 === this.directionalValue[e - 1] ? e + 1 : e,
            n = new Uint8Array(t);
          return (
            n.set(this.directionalValue, 0),
            t !== e
              ? n.set([0], this.directionalValue.length)
              : ++n[n.length - 1],
            new ou(this.indexId, this.documentKey, this.arrayValue, n)
          );
        }
      }
      function uu(e, t) {
        let n = e.indexId - t.indexId;
        return 0 !== n
          ? n
          : ((n = hu(e.arrayValue, t.arrayValue)),
            0 !== n
              ? n
              : ((n = hu(e.directionalValue, t.directionalValue)),
                0 !== n ? n : ds.comparator(e.documentKey, t.documentKey)));
      }
      function hu(e, t) {
        for (let r = 0; r < e.length && r < t.length; ++r) {
          var n = e[r] - t[r];
          if (0 != n) return n;
        }
        return e.length - t.length;
      }
      class cu {
        constructor(e) {
          (this.collectionId =
            null != e.collectionGroup
              ? e.collectionGroup
              : e.path.lastSegment()),
            (this.Me = e.orderBy),
            (this.Oe = []);
          for (const t of e.filters) {
            const e = t;
            e.S() ? (this.Fe = e) : this.Oe.push(e);
          }
        }
        $e(e) {
          var t = Ls(e);
          if (void 0 !== t && !this.Be(t)) return !1;
          var n = Vs(e);
          let r = 0,
            s = 0;
          for (; r < n.length && this.Be(n[r]); ++r);
          if (r === n.length) return !0;
          if (void 0 !== this.Fe) {
            const e = n[r];
            if (!this.Le(this.Fe, e) || !this.Ue(this.Me[s++], e)) return !1;
            ++r;
          }
          for (; r < n.length; ++r) {
            const e = n[r];
            if (s >= this.Me.length || !this.Ue(this.Me[s++], e)) return !1;
          }
          return !0;
        }
        Be(e) {
          for (const t of this.Oe) if (this.Le(t, e)) return !0;
          return !1;
        }
        Le(e, t) {
          if (void 0 === e || !e.field.isEqual(t.fieldPath)) return !1;
          var n = "array-contains" === e.op || "array-contains-any" === e.op;
          return (2 === t.kind) == n;
        }
        Ue(e, t) {
          return (
            !!e.field.isEqual(t.fieldPath) &&
            ((0 === t.kind && "asc" === e.dir) ||
              (1 === t.kind && "desc" === e.dir))
          );
        }
      }
      class lu {
        constructor() {
          this.qe = new du();
        }
        addToCollectionParentIndex(e, t) {
          return this.qe.add(t), To.resolve();
        }
        getCollectionParents(e, t) {
          return To.resolve(this.qe.getEntries(t));
        }
        addFieldIndex(e, t) {
          return To.resolve();
        }
        deleteFieldIndex(e, t) {
          return To.resolve();
        }
        getDocumentsMatchingTarget(e, t) {
          return To.resolve(null);
        }
        getFieldIndex(e, t) {
          return To.resolve(null);
        }
        getFieldIndexes(e, t) {
          return To.resolve([]);
        }
        getNextCollectionGroupToUpdate(e) {
          return To.resolve(null);
        }
        updateCollectionGroup(e, t, n) {
          return To.resolve();
        }
        updateIndexEntries(e, t) {
          return To.resolve();
        }
      }
      class du {
        constructor() {
          this.index = {};
        }
        add(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t] || new sa(Yr.comparator),
            s = !r.has(n);
          return (this.index[t] = r.add(n)), s;
        }
        has(e) {
          const t = e.lastSegment(),
            n = e.popLast(),
            r = this.index[t];
          return r && r.has(n);
        }
        getEntries(e) {
          return (this.index[e] || new sa(Yr.comparator)).toArray();
        }
      }
      const fu = new Uint8Array(0);
      class gu {
        constructor(e) {
          (this.user = e),
            (this.Ge = new du()),
            (this.Ke = new ea(
              (e) => Gs(e),
              (e, t) => js(e, t)
            )),
            (this.uid = e.uid || "");
        }
        addToCollectionParentIndex(e, t) {
          if (this.Ge.has(t)) return To.resolve();
          var n = t.lastSegment(),
            r = t.popLast();
          e.addOnCommittedListener(() => {
            this.Ge.add(t);
          });
          r = { collectionId: n, parent: Qa(r) };
          return mu(e).put(r);
        }
        getCollectionParents(e, n) {
          const r = [],
            t = IDBKeyRange.bound([n, ""], [jr(n), ""], !1, !0);
          return mu(e)
            .qt(t)
            .next((e) => {
              for (const t of e) {
                if (t.collectionId !== n) break;
                r.push(Xa(t.parent));
              }
              return r;
            });
        }
        addFieldIndex(e, t) {
          const n = yu(e),
            r = {
              indexId: t.indexId,
              collectionGroup: t.collectionGroup,
              fields: t.fields.map((e) => [
                e.fieldPath.canonicalString(),
                e.kind,
              ]),
            };
          return delete r.indexId, n.add(r).next();
        }
        deleteFieldIndex(e, t) {
          const n = yu(e),
            r = vu(e),
            s = pu(e);
          return n
            .delete(t.indexId)
            .next(() =>
              r.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            )
            .next(() =>
              s.delete(IDBKeyRange.bound([t.indexId], [t.indexId + 1], !1, !0))
            );
        }
        getDocumentsMatchingTarget(e, h) {
          const c = pu(e);
          let n = !0;
          const r = new Map();
          return To.forEach(this.Qe(h), (t) =>
            this.getFieldIndex(e, t).next((e) => {
              (n = n && !!e), r.set(t, e);
            })
          ).next(() => {
            if (n) {
              let u = da();
              return To.forEach(r, (e, t) => {
                Er(
                  "IndexedDbIndexManager",
                  `Using index ${
                    ((o = e),
                    `id=${o.indexId}|cg=${o.collectionGroup}|f=${o.fields
                      .map((e) => `${e.fieldPath}:${e.kind}`)
                      .join(",")}`)
                  } to execute ${Gs(h)}`
                );
                var n = (function (e, t) {
                    var n = Ls(t);
                    if (void 0 === n) return null;
                    for (const t of $s(e, n.fieldPath))
                      switch (t.op) {
                        case "array-contains-any":
                          return t.value.arrayValue.values || [];
                        case "array-contains":
                          return [t.value];
                      }
                    return null;
                  })(t, e),
                  r = (function (e, t) {
                    const n = new Map();
                    for (const r of Vs(t))
                      for (const t of $s(e, r.fieldPath))
                        switch (t.op) {
                          case "==":
                          case "in":
                            n.set(r.fieldPath.canonicalString(), t.value);
                            break;
                          case "not-in":
                          case "!=":
                            return (
                              n.set(r.fieldPath.canonicalString(), t.value),
                              Array.from(n.values())
                            );
                        }
                    return null;
                  })(t, e),
                  s = (function (t) {
                    const s = [];
                    let i = !0;
                    for (const o of Vs(e)) {
                      let n,
                        r = !0;
                      for (const s of $s(t, o.fieldPath)) {
                        let e,
                          t = !0;
                        switch (s.op) {
                          case "<":
                          case "<=":
                            e =
                              "nullValue" in (a = s.value)
                                ? gs
                                : "booleanValue" in a
                                ? { booleanValue: !1 }
                                : "integerValue" in a || "doubleValue" in a
                                ? { doubleValue: NaN }
                                : "timestampValue" in a
                                ? {
                                    timestampValue: {
                                      seconds: Number.MIN_SAFE_INTEGER,
                                    },
                                  }
                                : "stringValue" in a
                                ? { stringValue: "" }
                                : "bytesValue" in a
                                ? { bytesValue: "" }
                                : "referenceValue" in a
                                ? Is(us.empty(), ds.empty())
                                : "geoPointValue" in a
                                ? {
                                    geoPointValue: {
                                      latitude: -90,
                                      longitude: -180,
                                    },
                                  }
                                : "arrayValue" in a
                                ? { arrayValue: {} }
                                : "mapValue" in a
                                ? { mapValue: {} }
                                : Ar();
                            break;
                          case "==":
                          case "in":
                          case ">=":
                            e = s.value;
                            break;
                          case ">":
                            (e = s.value), (t = !1);
                            break;
                          case "!=":
                          case "not-in":
                            e = gs;
                        }
                        Ns(n, e) === e && ((n = e), (r = t));
                      }
                      if (null !== t.startAt)
                        for (let e = 0; e < t.orderBy.length; ++e)
                          if (t.orderBy[e].field.isEqual(o.fieldPath)) {
                            const i = t.startAt.position[e];
                            Ns(n, i) === i &&
                              ((n = i), (r = t.startAt.inclusive));
                            break;
                          }
                      if (void 0 === n) return null;
                      s.push(n), (i = i && r);
                    }
                    var a;
                    return new ti(s, i);
                  })(t),
                  i = (function (t) {
                    const s = [];
                    let i = !0;
                    for (const o of Vs(e)) {
                      let n,
                        r = !0;
                      for (const s of $s(t, o.fieldPath)) {
                        let e,
                          t = !0;
                        switch (s.op) {
                          case ">=":
                          case ">":
                            (e =
                              "nullValue" in (a = s.value)
                                ? { booleanValue: !1 }
                                : "booleanValue" in a
                                ? { doubleValue: NaN }
                                : "integerValue" in a || "doubleValue" in a
                                ? {
                                    timestampValue: {
                                      seconds: Number.MIN_SAFE_INTEGER,
                                    },
                                  }
                                : "timestampValue" in a
                                ? { stringValue: "" }
                                : "stringValue" in a
                                ? { bytesValue: "" }
                                : "bytesValue" in a
                                ? Is(us.empty(), ds.empty())
                                : "referenceValue" in a
                                ? {
                                    geoPointValue: {
                                      latitude: -90,
                                      longitude: -180,
                                    },
                                  }
                                : "geoPointValue" in a
                                ? { arrayValue: {} }
                                : "arrayValue" in a
                                ? { mapValue: {} }
                                : "mapValue" in a
                                ? fs
                                : Ar()),
                              (t = !1);
                            break;
                          case "==":
                          case "in":
                          case "<=":
                            e = s.value;
                            break;
                          case "<":
                            (e = s.value), (t = !1);
                            break;
                          case "!=":
                          case "not-in":
                            e = fs;
                        }
                        Cs(n, e) === e && ((n = e), (r = t));
                      }
                      if (null !== t.endAt)
                        for (let e = 0; e < t.orderBy.length; ++e)
                          if (t.orderBy[e].field.isEqual(o.fieldPath)) {
                            const i = t.endAt.position[e];
                            Cs(n, i) === i &&
                              ((n = i), (r = t.endAt.inclusive));
                            break;
                          }
                      if (void 0 === n) return null;
                      s.push(n), (i = i && r);
                    }
                    var a;
                    return new ti(s, i);
                  })(t),
                  a = this.je(e, t, s),
                  o = this.je(e, t, i),
                  r = this.We(e, t, r),
                  r = this.ze(
                    e.indexId,
                    n,
                    a,
                    !!s && s.inclusive,
                    o,
                    !!i && i.inclusive,
                    r
                  );
                return To.forEach(r, (e) =>
                  c.Kt(e, h.limit).next((e) => {
                    e.forEach((e) => {
                      u = u.add(new ds(Xa(e.documentKey)));
                    });
                  })
                );
              }).next(() => u);
            }
            return To.resolve(null);
          });
        }
        Qe(e) {
          var t;
          return (t = this.Ke.get(e)) || (this.Ke.set(e, (t = [e])), t);
        }
        ze(t, e, n, r, s, i, a) {
          const o =
              (null != e ? e.length : 1) *
              Math.max(null != n ? n.length : 1, null != s ? s.length : 1),
            u = o / (null != e ? e.length : 1),
            h = [];
          for (let c = 0; c < o; ++c) {
            const o = e ? this.He(e[c / u]) : fu,
              l = n ? this.Je(t, o, n[c % u], r) : this.Ye(t),
              d = s ? this.Xe(t, o, s[c % u], i) : this.Ye(t + 1);
            h.push(
              ...this.createRange(
                l,
                d,
                a.map((e) => this.Je(t, o, e, !0))
              )
            );
          }
          return h;
        }
        Je(e, t, n, r) {
          const s = new ou(e, ds.empty(), t, n);
          return r ? s : s.ke();
        }
        Xe(e, t, n, r) {
          const s = new ou(e, ds.empty(), t, n);
          return r ? s.ke() : s;
        }
        Ye(e) {
          return new ou(e, ds.empty(), fu, fu);
        }
        getFieldIndex(e, t) {
          const n = new cu(t),
            r =
              null != t.collectionGroup
                ? t.collectionGroup
                : t.path.lastSegment();
          return this.getFieldIndexes(e, r).next((e) => {
            const t = e.filter((e) => n.$e(e));
            return (
              t.sort((e, t) => t.fields.length - e.fields.length),
              0 < t.length ? t[0] : null
            );
          });
        }
        Ze(e, t) {
          const n = new au();
          for (const s of Vs(e)) {
            const e = t.data.field(s.fieldPath);
            if (null == e) return null;
            var r = n.Ne(s.kind);
            tu.fe.Zt(e, r);
          }
          return n.Se();
        }
        He(e) {
          const t = new au();
          return tu.fe.Zt(e, t.Ne(0)), t.Se();
        }
        We(e, t, n) {
          if (null === n) return [];
          let r = [];
          r.push(new au());
          let s = 0;
          for (const i of Vs(e)) {
            const e = n[s++];
            for (const n of r)
              if (this.tn(t, i.fieldPath) && Ts(e)) r = this.en(r, i, e);
              else {
                const t = n.Ne(i.kind);
                tu.fe.Zt(e, t);
              }
          }
          return this.nn(r);
        }
        je(e, t, n) {
          return null == n ? null : this.We(e, t, n.position);
        }
        nn(e) {
          const t = [];
          for (let n = 0; n < e.length; ++n) t[n] = e[n].Se();
          return t;
        }
        en(e, t, n) {
          const r = [...e],
            s = [];
          for (const e of n.arrayValue.values || [])
            for (const n of r) {
              const r = new au();
              r.seed(n.Se()), tu.fe.Zt(e, r.Ne(t.kind)), s.push(r);
            }
          return s;
        }
        tn(e, t) {
          return !!e.filters.find(
            (e) =>
              e instanceof zs &&
              e.field.isEqual(t) &&
              ("in" === e.op || "not-in" === e.op)
          );
        }
        getFieldIndexes(e, t) {
          const n = yu(e),
            r = vu(e);
          return (
            t ? n.qt("collectionGroupIndex", IDBKeyRange.bound(t, t)) : n.qt()
          ).next((e) => {
            const i = [];
            return To.forEach(e, (s) =>
              r.get([s.indexId, this.uid]).next((e) => {
                var t, n, r;
                i.push(
                  ((t = s),
                  (n = (e = e)
                    ? new Ps(
                        e.sequenceNumber,
                        new qs(
                          jo(e.readTime),
                          new ds(Xa(e.documentKey)),
                          e.largestBatchId
                        )
                      )
                    : Ps.empty()),
                  (r = t.fields.map(
                    ([e, t]) => new Os(Jr.fromServerFormat(e), t)
                  )),
                  new Ms(t.indexId, t.collectionGroup, r, n))
                );
              })
            ).next(() => i);
          });
        }
        getNextCollectionGroupToUpdate(e) {
          return this.getFieldIndexes(e).next((e) =>
            0 === e.length
              ? null
              : (e.sort((e, t) => {
                  var n =
                    e.indexState.sequenceNumber - t.indexState.sequenceNumber;
                  return 0 != n ? n : Br(e.collectionGroup, t.collectionGroup);
                }),
                e[0].collectionGroup)
          );
        }
        updateCollectionGroup(e, t, n) {
          const s = yu(e),
            i = vu(e);
          return this.sn(e).next((r) =>
            s.qt("collectionGroupIndex", IDBKeyRange.bound(t, t)).next((e) =>
              To.forEach(e, (e) =>
                i.put(
                  (function (e, t, n) {
                    return {
                      indexId: e,
                      uid: t.uid || "",
                      sequenceNumber: r,
                      readTime: Go(n.readTime),
                      documentKey: Qa(n.documentKey.path),
                      largestBatchId: n.largestBatchId,
                    };
                  })(e.indexId, this.user, n)
                )
              )
            )
          );
        }
        updateIndexEntries(s, e) {
          const n = new Map();
          return To.forEach(e, (t, r) => {
            var e = n.get(t.collectionGroup);
            return (
              e ? To.resolve(e) : this.getFieldIndexes(s, t.collectionGroup)
            ).next(
              (e) => (
                n.set(t.collectionGroup, e),
                To.forEach(e, (n) =>
                  this.rn(s, t, n).next((e) => {
                    var t = this.on(r, n);
                    return e.isEqual(t) ? To.resolve() : this.un(s, r, e, t);
                  })
                )
              )
            );
          });
        }
        an(e, t, n) {
          return pu(e).put({
            indexId: n.indexId,
            uid: this.uid,
            arrayValue: n.arrayValue,
            directionalValue: n.directionalValue,
            documentKey: Qa(t.key.path),
          });
        }
        cn(e, t, n) {
          return pu(e).delete([
            n.indexId,
            this.uid,
            n.arrayValue,
            n.directionalValue,
            Qa(t.key.path),
          ]);
        }
        rn(e, n, r) {
          const t = pu(e);
          let s = new sa(uu);
          return t
            .Wt(
              {
                index: "documentKeyIndex",
                range: IDBKeyRange.only([r.indexId, this.uid, Qa(n.path)]),
              },
              (e, t) => {
                s = s.add(
                  new ou(r.indexId, n, t.arrayValue, t.directionalValue)
                );
              }
            )
            .next(() => s);
        }
        on(e, t) {
          let n = new sa(uu);
          var r = this.Ze(t, e);
          if (null == r) return n;
          const s = Ls(t);
          if (null != s) {
            var i = e.data.field(s.fieldPath);
            if (Ts(i))
              for (const s of i.arrayValue.values || [])
                n = n.add(new ou(t.indexId, e.key, this.He(s), r));
          } else n = n.add(new ou(t.indexId, e.key, fu, r));
          return n;
        }
        un(t, n, h, e) {
          Er(
            "IndexedDbIndexManager",
            "Updating index entries for document '%s'",
            n.key
          );
          const r = [];
          return (
            (function (e, n, r, s) {
              var i = h.getIterator(),
                a = e.getIterator();
              let o = aa(i),
                u = aa(a);
              for (; o || u; ) {
                let e = !1,
                  t = !1;
                if (o && u) {
                  const r = n(o, u);
                  r < 0 ? (t = !0) : 0 < r && (e = !0);
                } else null != o ? (t = !0) : (e = !0);
                e
                  ? (r(u), (u = aa(a)))
                  : t
                  ? (s(o), (o = aa(i)))
                  : ((o = aa(i)), (u = aa(a)));
              }
            })(
              e,
              uu,
              (e) => {
                r.push(this.an(t, n, e));
              },
              (e) => {
                r.push(this.cn(t, n, e));
              }
            ),
            To.waitFor(r)
          );
        }
        sn(e) {
          let r = 1;
          return vu(e)
            .Wt(
              {
                index: "sequenceNumberIndex",
                reverse: !0,
                range: IDBKeyRange.upperBound([
                  this.uid,
                  Number.MAX_SAFE_INTEGER,
                ]),
              },
              (e, t, n) => {
                n.done(), (r = t.sequenceNumber + 1);
              }
            )
            .next(() => r);
        }
        createRange(e, t, n) {
          n = n
            .sort((e, t) => uu(e, t))
            .filter((e, t, n) => !t || 0 !== uu(e, n[t - 1]));
          const r = [];
          r.push(e);
          for (const s of n) {
            const n = uu(s, e),
              i = uu(s, t);
            if (0 === n) r[0] = e.ke();
            else if (0 < n && i < 0) r.push(s), r.push(s.ke());
            else if (0 < i) break;
          }
          r.push(t);
          const s = [];
          for (let a = 0; a < r.length; a += 2)
            s.push(
              IDBKeyRange.bound(
                [
                  r[a].indexId,
                  this.uid,
                  r[a].arrayValue,
                  r[a].directionalValue,
                  "",
                ],
                [
                  r[a + 1].indexId,
                  this.uid,
                  r[a + 1].arrayValue,
                  r[a + 1].directionalValue,
                  "",
                ]
              )
            );
          return s;
        }
      }
      function mu(e) {
        return Lo(e, "collectionParents");
      }
      function pu(e) {
        return Lo(e, "indexEntries");
      }
      function yu(e) {
        return Lo(e, "indexConfiguration");
      }
      function vu(e) {
        return Lo(e, "indexState");
      }
      const wu = {
        didRun: !1,
        sequenceNumbersCollected: 0,
        targetsRemoved: 0,
        documentsRemoved: 0,
      };
      class bu {
        constructor(e, t, n) {
          (this.cacheSizeCollectionThreshold = e),
            (this.percentileToCollect = t),
            (this.maximumSequenceNumbersToCollect = n);
        }
        static withCacheSize(e) {
          return new bu(
            e,
            bu.DEFAULT_COLLECTION_PERCENTILE,
            bu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
          );
        }
      }
      function Iu(e, t, n) {
        const r = e.store("mutations"),
          s = e.store("documentMutations"),
          i = [],
          a = IDBKeyRange.only(n.batchId);
        let o = 0;
        const u = r.Wt({ range: a }, (e, t, n) => (o++, n.delete()));
        i.push(
          u.next(() => {
            Dr(1 === o);
          })
        );
        const h = [];
        for (const e of n.mutations) {
          const r = eo(t, e.key.path, n.batchId);
          i.push(s.delete(r)), h.push(e.key);
        }
        return To.waitFor(i).next(() => h);
      }
      function Eu(e) {
        if (!e) return 0;
        let t;
        if (e.document) t = e.document;
        else if (e.unknownDocument) t = e.unknownDocument;
        else {
          if (!e.noDocument) throw Ar();
          t = e.noDocument;
        }
        return JSON.stringify(t).length;
      }
      (bu.DEFAULT_COLLECTION_PERCENTILE = 10),
        (bu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
        (bu.DEFAULT = new bu(
          41943040,
          bu.DEFAULT_COLLECTION_PERCENTILE,
          bu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        )),
        (bu.DISABLED = new bu(-1, 0, 0));
      class Tu {
        constructor(e, t, n, r) {
          (this.userId = e),
            (this.M = t),
            (this.indexManager = n),
            (this.referenceDelegate = r),
            (this.hn = {});
        }
        static Yt(e, t, n, r) {
          Dr("" !== e.uid);
          var s = e.isAuthenticated() ? e.uid : "";
          return new Tu(s, t, n, r);
        }
        checkEmpty(e) {
          let r = !0;
          var t = IDBKeyRange.bound(
            [this.userId, Number.NEGATIVE_INFINITY],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Su(e)
            .Wt({ index: "userMutationsIndex", range: t }, (e, t, n) => {
              (r = !1), n.done();
            })
            .next(() => r);
        }
        addMutationBatch(c, l, d, f) {
          const g = Au(c),
            m = Su(c);
          return m.add({}).next((e) => {
            Dr("number" == typeof e);
            const t = new Vo(e, l, d, f),
              n =
                ((s = this.M),
                (i = this.userId),
                (a = t),
                (o = a.baseMutations.map((e) => qa(s.Jt, e))),
                (u = a.mutations.map((e) => qa(s.Jt, e))),
                {
                  userId: i,
                  batchId: a.batchId,
                  localWriteTimeMs: a.localWriteTime.toMillis(),
                  baseMutations: o,
                  mutations: u,
                }),
              r = [];
            var s, i, a, o, u;
            let h = new sa((e, t) =>
              Br(e.canonicalString(), t.canonicalString())
            );
            for (const c of f) {
              const l = eo(this.userId, c.key.path, e);
              (h = h.add(c.key.path.popLast())),
                r.push(m.put(n)),
                r.push(g.put(l, to));
            }
            return (
              h.forEach((e) => {
                r.push(this.indexManager.addToCollectionParentIndex(c, e));
              }),
              c.addOnCommittedListener(() => {
                this.hn[e] = t.keys();
              }),
              To.waitFor(r).next(() => t)
            );
          });
        }
        lookupMutationBatch(e, t) {
          return Su(e)
            .get(t)
            .next((e) =>
              e ? (Dr(e.userId === this.userId), Ko(this.M, e)) : null
            );
        }
        ln(e, n) {
          return this.hn[n]
            ? To.resolve(this.hn[n])
            : this.lookupMutationBatch(e, n).next((e) => {
                if (e) {
                  var t = e.keys();
                  return (this.hn[n] = t);
                }
                return null;
              });
        }
        getNextMutationBatchAfterBatchId(e, t) {
          const r = t + 1,
            n = IDBKeyRange.lowerBound([this.userId, r]);
          let s = null;
          return Su(e)
            .Wt({ index: "userMutationsIndex", range: n }, (e, t, n) => {
              t.userId === this.userId &&
                (Dr(t.batchId >= r), (s = Ko(this.M, t))),
                n.done();
            })
            .next(() => s);
        }
        getHighestUnacknowledgedBatchId(e) {
          var t = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY,
          ]);
          let r = -1;
          return Su(e)
            .Wt(
              { index: "userMutationsIndex", range: t, reverse: !0 },
              (e, t, n) => {
                (r = t.batchId), n.done();
              }
            )
            .next(() => r);
        }
        getAllMutationBatches(e) {
          var t = IDBKeyRange.bound(
            [this.userId, -1],
            [this.userId, Number.POSITIVE_INFINITY]
          );
          return Su(e)
            .qt("userMutationsIndex", t)
            .next((e) => e.map((e) => Ko(this.M, e)));
        }
        getAllMutationBatchesAffectingDocumentKey(a, o) {
          const e = Za(this.userId, o.path),
            t = IDBKeyRange.lowerBound(e),
            u = [];
          return Au(a)
            .Wt({ range: t }, (e, t, n) => {
              var [r, s, i] = e,
                s = Xa(s);
              if (r === this.userId && o.path.isEqual(s))
                return Su(a)
                  .get(i)
                  .next((e) => {
                    if (!e) throw Ar();
                    Dr(e.userId === this.userId), u.push(Ko(this.M, e));
                  });
              n.done();
            })
            .next(() => u);
        }
        getAllMutationBatchesAffectingDocumentKeys(t, e) {
          let o = new sa(Br);
          const n = [];
          return (
            e.forEach((a) => {
              var e = Za(this.userId, a.path),
                e = IDBKeyRange.lowerBound(e),
                e = Au(t).Wt({ range: e }, (e, t, n) => {
                  var [r, s, i] = e,
                    s = Xa(s);
                  r === this.userId && a.path.isEqual(s)
                    ? (o = o.add(i))
                    : n.done();
                });
              n.push(e);
            }),
            To.waitFor(n).next(() => this.fn(t, o))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const a = t.path,
            o = a.length + 1,
            n = Za(this.userId, a),
            r = IDBKeyRange.lowerBound(n);
          let u = new sa(Br);
          return Au(e)
            .Wt({ range: r }, (e, t, n) => {
              var [r, s, i] = e,
                s = Xa(s);
              r === this.userId && a.isPrefixOf(s)
                ? s.length === o && (u = u.add(i))
                : n.done();
            })
            .next(() => this.fn(e, u));
        }
        fn(t, e) {
          const n = [],
            r = [];
          return (
            e.forEach((e) => {
              r.push(
                Su(t)
                  .get(e)
                  .next((e) => {
                    if (null === e) throw Ar();
                    Dr(e.userId === this.userId), n.push(Ko(this.M, e));
                  })
              );
            }),
            To.waitFor(r).next(() => n)
          );
        }
        removeMutationBatch(t, n) {
          return Iu(t.Ht, this.userId, n).next(
            (e) => (
              t.addOnCommittedListener(() => {
                this.dn(n.batchId);
              }),
              To.forEach(e, (e) =>
                this.referenceDelegate.markPotentiallyOrphaned(t, e)
              )
            )
          );
        }
        dn(e) {
          delete this.hn[e];
        }
        performConsistencyCheck(n) {
          return this.checkEmpty(n).next((e) => {
            if (!e) return To.resolve();
            var t = IDBKeyRange.lowerBound([this.userId]);
            const r = [];
            return Au(n)
              .Wt({ range: t }, (e, t, n) => {
                if (e[0] === this.userId) {
                  const t = Xa(e[1]);
                  r.push(t);
                } else n.done();
              })
              .next(() => {
                Dr(0 === r.length);
              });
          });
        }
        containsKey(e, t) {
          return _u(e, this.userId, t);
        }
        _n(e) {
          return Du(e)
            .get(this.userId)
            .next(
              (e) =>
                e || {
                  userId: this.userId,
                  lastAcknowledgedBatchId: -1,
                  lastStreamToken: "",
                }
            );
        }
      }
      function _u(e, i, t) {
        const n = Za(i, t.path),
          a = n[1],
          r = IDBKeyRange.lowerBound(n);
        let o = !1;
        return Au(e)
          .Wt({ range: r, jt: !0 }, (e, t, n) => {
            var [r, s] = e;
            r === i && s === a && (o = !0), n.done();
          })
          .next(() => o);
      }
      function Su(e) {
        return Lo(e, "mutations");
      }
      function Au(e) {
        return Lo(e, "documentMutations");
      }
      function Du(e) {
        return Lo(e, "mutationQueues");
      }
      class xu {
        constructor(e) {
          this.wn = e;
        }
        next() {
          return (this.wn += 2), this.wn;
        }
        static mn() {
          return new xu(0);
        }
        static gn() {
          return new xu(-1);
        }
      }
      class Nu {
        constructor(e, t) {
          (this.referenceDelegate = e), (this.M = t);
        }
        allocateTargetId(n) {
          return this.yn(n).next((e) => {
            const t = new xu(e.highestTargetId);
            return (
              (e.highestTargetId = t.next()),
              this.pn(n, e).next(() => e.highestTargetId)
            );
          });
        }
        getLastRemoteSnapshotVersion(e) {
          return this.yn(e).next((e) =>
            $r.fromTimestamp(
              new Kr(
                e.lastRemoteSnapshotVersion.seconds,
                e.lastRemoteSnapshotVersion.nanoseconds
              )
            )
          );
        }
        getHighestSequenceNumber(e) {
          return this.yn(e).next((e) => e.highestListenSequenceNumber);
        }
        setTargetsMetadata(t, n, r) {
          return this.yn(t).next(
            (e) => (
              (e.highestListenSequenceNumber = n),
              r && (e.lastRemoteSnapshotVersion = r.toTimestamp()),
              n > e.highestListenSequenceNumber &&
                (e.highestListenSequenceNumber = n),
              this.pn(t, e)
            )
          );
        }
        addTargetData(t, n) {
          return this.In(t, n).next(() =>
            this.yn(t).next(
              (e) => ((e.targetCount += 1), this.Tn(n, e), this.pn(t, e))
            )
          );
        }
        updateTargetData(e, t) {
          return this.In(e, t);
        }
        removeTargetData(t, e) {
          return this.removeMatchingKeysForTargetId(t, e.targetId)
            .next(() => Cu(t).delete(e.targetId))
            .next(() => this.yn(t))
            .next(
              (e) => (Dr(0 < e.targetCount), --e.targetCount, this.pn(t, e))
            );
        }
        removeTargets(r, s, i) {
          let a = 0;
          const o = [];
          return Cu(r)
            .Wt((e, t) => {
              var n = $o(t);
              n.sequenceNumber <= s &&
                null === i.get(n.targetId) &&
                (a++, o.push(this.removeTargetData(r, n)));
            })
            .next(() => To.waitFor(o))
            .next(() => a);
        }
        forEachTarget(e, r) {
          return Cu(e).Wt((e, t) => {
            var n = $o(t);
            r(n);
          });
        }
        yn(e) {
          return ku(e)
            .get("targetGlobalKey")
            .next((e) => (Dr(null !== e), e));
        }
        pn(e, t) {
          return ku(e).put("targetGlobalKey", t);
        }
        In(e, t) {
          return Cu(e).put(zo(this.M, t));
        }
        Tn(e, t) {
          let n = !1;
          return (
            e.targetId > t.highestTargetId &&
              ((t.highestTargetId = e.targetId), (n = !0)),
            e.sequenceNumber > t.highestListenSequenceNumber &&
              ((t.highestListenSequenceNumber = e.sequenceNumber), (n = !0)),
            n
          );
        }
        getTargetCount(e) {
          return this.yn(e).next((e) => e.targetCount);
        }
        getTargetData(e, s) {
          var t = Gs(s),
            t = IDBKeyRange.bound(
              [t, Number.NEGATIVE_INFINITY],
              [t, Number.POSITIVE_INFINITY]
            );
          let i = null;
          return Cu(e)
            .Wt({ range: t, index: "queryTargetsIndex" }, (e, t, n) => {
              var r = $o(t);
              js(s, r.target) && ((i = r), n.done());
            })
            .next(() => i);
        }
        addMatchingKeys(n, e, r) {
          const s = [],
            i = Ru(n);
          return (
            e.forEach((e) => {
              var t = Qa(e.path);
              s.push(i.put({ targetId: r, path: t })),
                s.push(this.referenceDelegate.addReference(n, r, e));
            }),
            To.waitFor(s)
          );
        }
        removeMatchingKeys(n, e, r) {
          const s = Ru(n);
          return To.forEach(e, (e) => {
            var t = Qa(e.path);
            return To.waitFor([
              s.delete([r, t]),
              this.referenceDelegate.removeReference(n, r, e),
            ]);
          });
        }
        removeMatchingKeysForTargetId(e, t) {
          const n = Ru(e),
            r = IDBKeyRange.bound([t], [t + 1], !1, !0);
          return n.delete(r);
        }
        getMatchingKeysForTargetId(e, t) {
          const n = IDBKeyRange.bound([t], [t + 1], !1, !0),
            r = Ru(e);
          let s = da();
          return r
            .Wt({ range: n, jt: !0 }, (e, t, n) => {
              var r = Xa(e[1]),
                r = new ds(r);
              s = s.add(r);
            })
            .next(() => s);
        }
        containsKey(e, t) {
          var n = Qa(t.path),
            n = IDBKeyRange.bound([n], [jr(n)], !1, !0);
          let r = 0;
          return Ru(e)
            .Wt(
              { index: "documentTargetsIndex", jt: !0, range: n },
              ([e], t, n) => {
                0 !== e && (r++, n.done());
              }
            )
            .next(() => 0 < r);
        }
        Et(e, t) {
          return Cu(e)
            .get(t)
            .next((e) => (e ? $o(e) : null));
        }
      }
      function Cu(e) {
        return Lo(e, "targets");
      }
      function ku(e) {
        return Lo(e, "targetGlobal");
      }
      function Ru(e) {
        return Lo(e, "targetDocuments");
      }
      async function Mu(e) {
        if (e.code !== xr.FAILED_PRECONDITION || e.message !== Io) throw e;
        Er("LocalStore", "Unexpectedly lost primary lease");
      }
      function Lu([e, t], [n, r]) {
        var s = Br(e, n);
        return 0 === s ? Br(t, r) : s;
      }
      class Vu {
        constructor(e) {
          (this.En = e), (this.buffer = new sa(Lu)), (this.An = 0);
        }
        Rn() {
          return ++this.An;
        }
        bn(e) {
          var t = [e, this.Rn()];
          if (this.buffer.size < this.En) this.buffer = this.buffer.add(t);
          else {
            const e = this.buffer.last();
            Lu(t, e) < 0 && (this.buffer = this.buffer.delete(e).add(t));
          }
        }
        get maxValue() {
          return this.buffer.last()[0];
        }
      }
      class Ou {
        constructor(e, t) {
          (this.garbageCollector = e),
            (this.asyncQueue = t),
            (this.Pn = !1),
            (this.Vn = null);
        }
        start(e) {
          -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
            this.vn(e);
        }
        stop() {
          this.Vn && (this.Vn.cancel(), (this.Vn = null));
        }
        get started() {
          return null !== this.Vn;
        }
        vn(e) {
          var t = this.Pn ? 3e5 : 6e4;
          Er("LruGarbageCollector", `Garbage collection scheduled in ${t}ms`),
            (this.Vn = this.asyncQueue.enqueueAfterDelay(
              "lru_garbage_collection",
              t,
              async () => {
                (this.Vn = null), (this.Pn = !0);
                try {
                  await e.collectGarbage(this.garbageCollector);
                } catch (e) {
                  xo(e)
                    ? Er(
                        "LruGarbageCollector",
                        "Ignoring IndexedDB error during garbage collection: ",
                        e
                      )
                    : await Mu(e);
                }
                await this.vn(e);
              }
            ));
        }
      }
      class Pu {
        constructor(e, t) {
          (this.Sn = e), (this.params = t);
        }
        calculateTargetCount(e, t) {
          return this.Sn.Dn(e).next((e) => Math.floor((t / 100) * e));
        }
        nthSequenceNumber(e, t) {
          if (0 === t) return To.resolve(qr.A);
          const n = new Vu(t);
          return this.Sn.forEachTarget(e, (e) => n.bn(e.sequenceNumber))
            .next(() => this.Sn.Cn(e, (e) => n.bn(e)))
            .next(() => n.maxValue);
        }
        removeTargets(e, t, n) {
          return this.Sn.removeTargets(e, t, n);
        }
        removeOrphanedDocuments(e, t) {
          return this.Sn.removeOrphanedDocuments(e, t);
        }
        collect(t, n) {
          return -1 === this.params.cacheSizeCollectionThreshold
            ? (Er(
                "LruGarbageCollector",
                "Garbage collection skipped; disabled"
              ),
              To.resolve(wu))
            : this.getCacheSize(t).next((e) =>
                e < this.params.cacheSizeCollectionThreshold
                  ? (Er(
                      "LruGarbageCollector",
                      `Garbage collection skipped; Cache size ${e} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
                    ),
                    wu)
                  : this.xn(t, n)
              );
        }
        getCacheSize(e) {
          return this.Sn.getCacheSize(e);
        }
        xn(t, n) {
          let r, s, i, a, o, u, h;
          const c = Date.now();
          return this.calculateTargetCount(t, this.params.percentileToCollect)
            .next(
              (e) => (
                (s =
                  e > this.params.maximumSequenceNumbersToCollect
                    ? (Er(
                        "LruGarbageCollector",
                        `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`
                      ),
                      this.params.maximumSequenceNumbersToCollect)
                    : e),
                (a = Date.now()),
                this.nthSequenceNumber(t, s)
              )
            )
            .next(
              (e) => ((r = e), (o = Date.now()), this.removeTargets(t, r, n))
            )
            .next(
              (e) => (
                (i = e), (u = Date.now()), this.removeOrphanedDocuments(t, r)
              )
            )
            .next(
              (e) => (
                (h = Date.now()),
                Ir() <= l.DEBUG &&
                  Er(
                    "LruGarbageCollector",
                    `LRU Garbage Collection\n\tCounted targets in ${
                      a - c
                    }ms\n\tDetermined least recently used ${s} in ` +
                      (o - a) +
                      "ms\n" +
                      `\tRemoved ${i} targets in ` +
                      (u - o) +
                      "ms\n" +
                      `\tRemoved ${e} documents in ` +
                      (h - u) +
                      "ms\n" +
                      `Total Duration: ${h - c}ms`
                  ),
                To.resolve({
                  didRun: !0,
                  sequenceNumbersCollected: s,
                  targetsRemoved: i,
                  documentsRemoved: e,
                })
              )
            );
        }
      }
      class Fu {
        constructor(e, t) {
          (this.db = e),
            (this.garbageCollector = ((e = this), (t = t), new Pu(e, t)));
        }
        Dn(e) {
          const n = this.Nn(e);
          return this.db
            .getTargetCache()
            .getTargetCount(e)
            .next((t) => n.next((e) => t + e));
        }
        Nn(e) {
          let t = 0;
          return this.Cn(e, (e) => {
            t++;
          }).next(() => t);
        }
        forEachTarget(e, t) {
          return this.db.getTargetCache().forEachTarget(e, t);
        }
        Cn(e, n) {
          return this.kn(e, (e, t) => n(t));
        }
        addReference(e, t, n) {
          return qu(e, n);
        }
        removeReference(e, t, n) {
          return qu(e, n);
        }
        removeTargets(e, t, n) {
          return this.db.getTargetCache().removeTargets(e, t, n);
        }
        markPotentiallyOrphaned(e, t) {
          return qu(e, t);
        }
        Mn(t, n) {
          let r = !1;
          return Du(t)
            .zt((e) => _u(t, e, n).next((e) => (e && (r = !0), To.resolve(!e))))
            .next(() => r);
        }
        removeOrphanedDocuments(n, r) {
          const s = this.db.getRemoteDocumentCache().newChangeBuffer(),
            i = [];
          let a = 0;
          return this.kn(n, (t, e) => {
            if (e <= r) {
              const r = this.Mn(n, t).next((e) => {
                if (!e)
                  return (
                    a++,
                    s
                      .getEntry(n, t)
                      .next(
                        () => (
                          s.removeEntry(t, $r.min()),
                          Ru(n).delete([0, Qa(t.path)])
                        )
                      )
                  );
              });
              i.push(r);
            }
          })
            .next(() => To.waitFor(i))
            .next(() => s.apply(n))
            .next(() => a);
        }
        removeTarget(e, t) {
          var n = t.withSequenceNumber(e.currentSequenceNumber);
          return this.db.getTargetCache().updateTargetData(e, n);
        }
        updateLimboDocument(e, t) {
          return qu(e, t);
        }
        kn(e, r) {
          const t = Ru(e);
          let s,
            i = qr.A;
          return t
            .Wt(
              { index: "documentTargetsIndex" },
              ([e], { path: t, sequenceNumber: n }) => {
                0 === e
                  ? (i !== qr.A && r(new ds(Xa(s)), i), (i = n), (s = t))
                  : (i = qr.A);
              }
            )
            .next(() => {
              i !== qr.A && r(new ds(Xa(s)), i);
            });
        }
        getCacheSize(e) {
          return this.db.getRemoteDocumentCache().getSize(e);
        }
      }
      function qu(e, t) {
        return Ru(e).put(
          ((e = e.currentSequenceNumber),
          { targetId: 0, path: Qa(t.path), sequenceNumber: e })
        );
      }
      class Uu {
        constructor() {
          (this.changes = new ea(
            (e) => e.toString(),
            (e, t) => e.isEqual(t)
          )),
            (this.changesApplied = !1);
        }
        addEntry(e) {
          this.assertNotApplied(), this.changes.set(e.key, e);
        }
        removeEntry(e, t) {
          this.assertNotApplied(),
            this.changes.set(e, Rs.newInvalidDocument(e).setReadTime(t));
        }
        getEntry(e, t) {
          this.assertNotApplied();
          var n = this.changes.get(t);
          return void 0 !== n ? To.resolve(n) : this.getFromCache(e, t);
        }
        getEntries(e, t) {
          return this.getAllFromCache(e, t);
        }
        apply(e) {
          return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(e)
          );
        }
        assertNotApplied() {}
      }
      class Bu {
        constructor(e) {
          this.M = e;
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t, n) {
          return Ku(e).put(n);
        }
        removeEntry(e, n, t) {
          return Ku(e).delete(
            (function (e) {
              const t = n.path.toArray();
              return [
                t.slice(0, t.length - 2),
                t[t.length - 2],
                Bo(e),
                t[t.length - 1],
              ];
            })(t)
          );
        }
        updateMetadata(t, n) {
          return this.getMetadata(t).next(
            (e) => ((e.byteSize += n), this.On(t, e))
          );
        }
        getEntry(e, n) {
          let r = Rs.newInvalidDocument(n);
          return Ku(e)
            .Wt(
              { index: "documentKeyIndex", range: IDBKeyRange.only($u(n)) },
              (e, t) => {
                r = this.Fn(n, t);
              }
            )
            .next(() => r);
        }
        $n(e, n) {
          let r = { size: 0, document: Rs.newInvalidDocument(n) };
          return Ku(e)
            .Wt(
              { index: "documentKeyIndex", range: IDBKeyRange.only($u(n)) },
              (e, t) => {
                r = { document: this.Fn(n, t), size: Eu(t) };
              }
            )
            .next(() => r);
        }
        getEntries(e, t) {
          let r = oa;
          return this.Bn(e, t, (e, t) => {
            var n = this.Fn(e, t);
            r = r.insert(e, n);
          }).next(() => r);
        }
        Ln(e, t) {
          let r = oa,
            s = new ta(ds.comparator);
          return this.Bn(e, t, (e, t) => {
            var n = this.Fn(e, t);
            (r = r.insert(e, n)), (s = s.insert(e, Eu(t)));
          }).next(() => ({ documents: r, Un: s }));
        }
        Bn(e, t, s) {
          if (t.isEmpty()) return To.resolve();
          let n = new sa(Wu);
          t.forEach((e) => (n = n.add(e)));
          const r = IDBKeyRange.bound($u(n.first()), $u(n.last())),
            i = n.getIterator();
          let a = i.getNext();
          return Ku(e)
            .Wt({ index: "documentKeyIndex", range: r }, (e, t, n) => {
              for (
                var r = ds.fromSegments([
                  ...t.prefixPath,
                  t.collectionGroup,
                  t.documentId,
                ]);
                a && Wu(a, r) < 0;

              )
                s(a, null), (a = i.getNext());
              a &&
                a.isEqual(r) &&
                (s(a, t), (a = i.hasNext() ? i.getNext() : null)),
                a ? n.Ut($u(a)) : n.done();
            })
            .next(() => {
              for (; a; ) s(a, null), (a = i.hasNext() ? i.getNext() : null);
            });
        }
        getAllFromCollection(e, t, n) {
          var r = [
              t.popLast().toArray(),
              t.lastSegment(),
              Bo(n.readTime),
              n.documentKey.path.isEmpty()
                ? ""
                : n.documentKey.path.lastSegment(),
            ],
            s = [
              t.popLast().toArray(),
              t.lastSegment(),
              [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
              "",
            ];
          return Ku(e)
            .qt(IDBKeyRange.bound(r, s, !0))
            .next((e) => {
              let t = oa;
              for (const n of e) {
                const e = this.Fn(
                  ds.fromSegments(
                    n.prefixPath.concat(n.collectionGroup, n.documentId)
                  ),
                  n
                );
                t = t.insert(e.key, e);
              }
              return t;
            });
        }
        getAllFromCollectionGroup(e, t, n, s) {
          let i = oa;
          var r = zu(t, n),
            a = zu(t, qs.max());
          return Ku(e)
            .Wt(
              {
                index: "collectionGroupIndex",
                range: IDBKeyRange.bound(r, a, !0),
              },
              (e, t, n) => {
                var r = this.Fn(
                  ds.fromSegments(
                    t.prefixPath.concat(t.collectionGroup, t.documentId)
                  ),
                  t
                );
                (i = i.insert(r.key, r)), i.size === s && n.done();
              }
            )
            .next(() => i);
        }
        newChangeBuffer(e) {
          return new Gu(this, !!e && e.trackRemovals);
        }
        getSize(e) {
          return this.getMetadata(e).next((e) => e.byteSize);
        }
        getMetadata(e) {
          return ju(e)
            .get("remoteDocumentGlobalKey")
            .next((e) => (Dr(!!e), e));
        }
        On(e, t) {
          return ju(e).put("remoteDocumentGlobalKey", t);
        }
        Fn(e, t) {
          if (t) {
            const e = (function (e, t) {
              let n;
              if (t.document)
                n = Fa(e.Jt, t.document, !!t.hasCommittedMutations);
              else if (t.noDocument) {
                const e = ds.fromSegments(t.noDocument.path),
                  s = jo(t.noDocument.readTime);
                (n = Rs.newNoDocument(e, s)),
                  t.hasCommittedMutations && n.setHasCommittedMutations();
              } else {
                if (!t.unknownDocument) return Ar();
                {
                  const e = ds.fromSegments(t.unknownDocument.path),
                    i = jo(t.unknownDocument.version);
                  n = Rs.newUnknownDocument(e, i);
                }
              }
              return (
                t.readTime &&
                  n.setReadTime(
                    ((t = t.readTime),
                    (r = new Kr(t[0], t[1])),
                    $r.fromTimestamp(r))
                  ),
                n
              );
              var r;
            })(this.M, t);
            if (!e.isNoDocument() || !e.version.isEqual($r.min())) return e;
          }
          return Rs.newInvalidDocument(e);
        }
      }
      class Gu extends Uu {
        constructor(e, t) {
          super(),
            (this.qn = e),
            (this.trackRemovals = t),
            (this.Gn = new ea(
              (e) => e.toString(),
              (e, t) => e.isEqual(t)
            ));
        }
        applyChanges(i) {
          const a = [];
          let o = 0,
            u = new sa((e, t) => Br(e.canonicalString(), t.canonicalString()));
          return (
            this.changes.forEach((e, t) => {
              var n = this.Gn.get(e);
              if (
                (a.push(this.qn.removeEntry(i, e, n.readTime)),
                t.isValidDocument())
              ) {
                var r = Uo(this.qn.M, t);
                u = u.add(e.path.popLast());
                var s = Eu(r);
                (o += s - n.size), a.push(this.qn.addEntry(i, e, r));
              } else if (((o -= n.size), this.trackRemovals)) {
                const o = Uo(this.qn.M, t.convertToNoDocument($r.min()));
                a.push(this.qn.addEntry(i, e, o));
              }
            }),
            u.forEach((e) => {
              a.push(this.qn.indexManager.addToCollectionParentIndex(i, e));
            }),
            a.push(this.qn.updateMetadata(i, o)),
            To.waitFor(a)
          );
        }
        getFromCache(e, t) {
          return this.qn
            .$n(e, t)
            .next(
              (e) => (
                this.Gn.set(t, { size: e.size, readTime: e.document.readTime }),
                e.document
              )
            );
        }
        getAllFromCache(e, t) {
          return this.qn.Ln(e, t).next(
            ({ documents: n, Un: e }) => (
              e.forEach((e, t) => {
                this.Gn.set(e, { size: t, readTime: n.get(e).readTime });
              }),
              n
            )
          );
        }
      }
      function ju(e) {
        return Lo(e, "remoteDocumentGlobal");
      }
      function Ku(e) {
        return Lo(e, "remoteDocumentsV14");
      }
      function $u(e) {
        const t = e.path.toArray();
        return [t.slice(0, t.length - 2), t[t.length - 2], t[t.length - 1]];
      }
      function zu(e, t) {
        const n = t.documentKey.path.toArray();
        return [
          e,
          Bo(t.readTime),
          n.slice(0, n.length - 2),
          0 < n.length ? n[n.length - 1] : "",
        ];
      }
      function Wu(e, t) {
        var n = e.path.length - t.path.length;
        return 0 != n ? n : ds.comparator(e, t);
      }
      class Hu {
        constructor(e) {
          this.M = e;
        }
        kt(t, e, n, r) {
          const s = new _o("createOrUpgrade", e);
          var i;
          n < 1 &&
            1 <= r &&
            (t.createObjectStore("owner"),
            (i = t).createObjectStore("mutationQueues", { keyPath: "userId" }),
            i
              .createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0,
              })
              .createIndex("userMutationsIndex", Ja, { unique: !0 }),
            i.createObjectStore("documentMutations"),
            Qu(t),
            t.createObjectStore("remoteDocuments"));
          let a = To.resolve();
          return (
            n < 3 &&
              3 <= r &&
              (0 !== n &&
                ((i = t).deleteObjectStore("targetDocuments"),
                i.deleteObjectStore("targets"),
                i.deleteObjectStore("targetGlobal"),
                Qu(t)),
              (a = a.next(() =>
                (function () {
                  const e = s.store("targetGlobal"),
                    t = {
                      highestTargetId: 0,
                      highestListenSequenceNumber: 0,
                      lastRemoteSnapshotVersion: $r.min().toTimestamp(),
                      targetCount: 0,
                    };
                  return e.put("targetGlobalKey", t);
                })()
              ))),
            n < 4 &&
              4 <= r &&
              (0 !== n &&
                (a = a.next(() =>
                  (function (r, s) {
                    return s
                      .store("mutations")
                      .qt()
                      .next((e) => {
                        r.deleteObjectStore("mutations"),
                          r
                            .createObjectStore("mutations", {
                              keyPath: "batchId",
                              autoIncrement: !0,
                            })
                            .createIndex("userMutationsIndex", Ja, {
                              unique: !0,
                            });
                        const t = s.store("mutations"),
                          n = e.map((e) => t.put(e));
                        return To.waitFor(n);
                      });
                  })(t, s)
                )),
              (a = a.next(() => {
                t.createObjectStore("clientMetadata", { keyPath: "clientId" });
              }))),
            n < 5 && 5 <= r && (a = a.next(() => this.Kn(s))),
            n < 6 &&
              6 <= r &&
              (a = a.next(
                () => (t.createObjectStore("remoteDocumentGlobal"), this.Qn(s))
              )),
            n < 7 && 7 <= r && (a = a.next(() => this.jn(s))),
            n < 8 && 8 <= r && (a = a.next(() => this.Wn(t, s))),
            n < 9 &&
              9 <= r &&
              (a = a.next(() => {
                var e;
                (e = t).objectStoreNames.contains("remoteDocumentChanges") &&
                  e.deleteObjectStore("remoteDocumentChanges");
              })),
            n < 10 && 10 <= r && (a = a.next(() => this.zn(s))),
            n < 11 &&
              11 <= r &&
              (a = a.next(() => {
                t.createObjectStore("bundles", { keyPath: "bundleId" }),
                  t.createObjectStore("namedQueries", { keyPath: "name" });
              })),
            n < 12 &&
              12 <= r &&
              (a = a.next(() => {
                !(function () {
                  const e = t.createObjectStore("documentOverlays", {
                    keyPath: go,
                  });
                  e.createIndex("collectionPathOverlayIndex", mo, {
                    unique: !1,
                  }),
                    e.createIndex("collectionGroupOverlayIndex", po, {
                      unique: !1,
                    });
                })();
              })),
            n < 13 &&
              13 <= r &&
              (a = a
                .next(() =>
                  (function () {
                    const e = t.createObjectStore("remoteDocumentsV14", {
                      keyPath: no,
                    });
                    e.createIndex("documentKeyIndex", ro),
                      e.createIndex("collectionGroupIndex", so);
                  })()
                )
                .next(() => this.Hn(t, s))
                .next(() => t.deleteObjectStore("remoteDocuments"))),
            n < 14 &&
              14 <= r &&
              (a = a.next(() => {
                var e;
                (e = t)
                  .createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0,
                  })
                  .createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1,
                  }),
                  e
                    .createObjectStore("indexState", { keyPath: ho })
                    .createIndex("sequenceNumberIndex", co, { unique: !1 }),
                  e
                    .createObjectStore("indexEntries", { keyPath: lo })
                    .createIndex("documentKeyIndex", fo, { unique: !1 });
              })),
            a
          );
        }
        Qn(t) {
          let n = 0;
          return t
            .store("remoteDocuments")
            .Wt((e, t) => {
              n += Eu(t);
            })
            .next(() => {
              var e = { byteSize: n };
              return t
                .store("remoteDocumentGlobal")
                .put("remoteDocumentGlobalKey", e);
            });
        }
        Kn(r) {
          const e = r.store("mutationQueues"),
            t = r.store("mutations");
          return e.qt().next((e) =>
            To.forEach(e, (n) => {
              var e = IDBKeyRange.bound(
                [n.userId, -1],
                [n.userId, n.lastAcknowledgedBatchId]
              );
              return t.qt("userMutationsIndex", e).next((e) =>
                To.forEach(e, (e) => {
                  Dr(e.userId === n.userId);
                  var t = Ko(this.M, e);
                  return Iu(r, n.userId, t).next(() => {});
                })
              );
            })
          );
        }
        jn(e) {
          const a = e.store("targetDocuments"),
            t = e.store("remoteDocuments");
          return e
            .store("targetGlobal")
            .get("targetGlobalKey")
            .next((s) => {
              const i = [];
              return t
                .Wt((e, t) => {
                  const n = new Yr(e),
                    r = [0, Qa(n)];
                  i.push(
                    a
                      .get(r)
                      .next((e) =>
                        e
                          ? To.resolve()
                          : ((e) =>
                              a.put({
                                targetId: 0,
                                path: Qa(e),
                                sequenceNumber: s.highestListenSequenceNumber,
                              }))(n)
                      )
                  );
                })
                .next(() => To.waitFor(i));
            });
        }
        Wn(e, t) {
          e.createObjectStore("collectionParents", { keyPath: uo });
          const n = t.store("collectionParents"),
            r = new du(),
            s = (e) => {
              if (r.add(e)) {
                const t = e.lastSegment(),
                  r = e.popLast();
                return n.put({ collectionId: t, parent: Qa(r) });
              }
            };
          return t
            .store("remoteDocuments")
            .Wt({ jt: !0 }, (e, t) => {
              const n = new Yr(e);
              return s(n.popLast());
            })
            .next(() =>
              t.store("documentMutations").Wt({ jt: !0 }, ([, e], t) => {
                const n = Xa(e);
                return s(n.popLast());
              })
            );
        }
        zn(e) {
          const r = e.store("targets");
          return r.Wt((e, t) => {
            var n = $o(t),
              n = zo(this.M, n);
            return r.put(n);
          });
        }
        Hn(e, i) {
          const t = i.store("remoteDocuments"),
            a = [];
          return t
            .Wt((e, t) => {
              const n = i.store("remoteDocumentsV14"),
                r = (
                  (s = t).document
                    ? new ds(Yr.fromString(s.document.name).popFirst(5))
                    : s.noDocument
                    ? ds.fromSegments(s.noDocument.path)
                    : s.unknownDocument
                    ? ds.fromSegments(s.unknownDocument.path)
                    : Ar()
                ).path.toArray();
              var s = {
                prefixPath: r.slice(0, r.length - 2),
                collectionGroup: r[r.length - 2],
                documentId: r[r.length - 1],
                readTime: t.readTime || [0, 0],
                unknownDocument: t.unknownDocument,
                noDocument: t.noDocument,
                document: t.document,
                hasCommittedMutations: !!t.hasCommittedMutations,
              };
              a.push(n.put(s));
            })
            .next(() => To.waitFor(a));
        }
      }
      function Qu(e) {
        e
          .createObjectStore("targetDocuments", { keyPath: ao })
          .createIndex("documentTargetsIndex", oo, { unique: !0 }),
          e
            .createObjectStore("targets", { keyPath: "targetId" })
            .createIndex("queryTargetsIndex", io, { unique: !0 }),
          e.createObjectStore("targetGlobal");
      }
      const Yu =
        "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
      class Xu {
        constructor(e, t, n, r, s, i, a, o, u, h, c = 13) {
          if (
            ((this.allowTabSynchronization = e),
            (this.persistenceKey = t),
            (this.clientId = n),
            (this.Jn = s),
            (this.window = i),
            (this.document = a),
            (this.Yn = u),
            (this.Xn = h),
            (this.Zn = c),
            (this.ts = null),
            (this.es = !1),
            (this.isPrimary = !1),
            (this.networkEnabled = !0),
            (this.ns = null),
            (this.inForeground = !1),
            (this.ss = null),
            (this.rs = null),
            (this.os = Number.NEGATIVE_INFINITY),
            (this.us = (e) => Promise.resolve()),
            !Xu.vt())
          )
            throw new Nr(
              xr.UNIMPLEMENTED,
              "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
            );
          (this.referenceDelegate = new Fu(this, r)),
            (this.cs = t + "main"),
            (this.M = new qo(o)),
            (this.hs = new So(this.cs, this.Zn, new Hu(this.M))),
            (this.ls = new Nu(this.referenceDelegate, this.M)),
            (this.fs = ((o = this.M), new Bu(o))),
            (this.ds = new Yo()),
            this.window && this.window.localStorage
              ? (this._s = this.window.localStorage)
              : ((this._s = null),
                !1 === h &&
                  Tr(
                    "IndexedDbPersistence",
                    "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
                  ));
        }
        start() {
          return this.ws()
            .then(() => {
              if (!this.isPrimary && !this.allowTabSynchronization)
                throw new Nr(xr.FAILED_PRECONDITION, Yu);
              return (
                this.gs(),
                this.ys(),
                this.ps(),
                this.runTransaction(
                  "getHighestListenSequenceNumber",
                  "readonly",
                  (e) => this.ls.getHighestSequenceNumber(e)
                )
              );
            })
            .then((e) => {
              this.ts = new qr(e, this.Yn);
            })
            .then(() => {
              this.es = !0;
            })
            .catch((e) => (this.hs && this.hs.close(), Promise.reject(e)));
        }
        Is(t) {
          return (
            (this.us = async (e) => {
              if (this.started) return t(e);
            }),
            t(this.isPrimary)
          );
        }
        setDatabaseDeletedListener(t) {
          this.hs.Ot(async (e) => {
            null === e.newVersion && (await t());
          });
        }
        setNetworkEnabled(e) {
          this.networkEnabled !== e &&
            ((this.networkEnabled = e),
            this.Jn.enqueueAndForget(async () => {
              this.started && (await this.ws());
            }));
        }
        ws() {
          return this.runTransaction(
            "updateClientMetadataAndTryBecomePrimary",
            "readwrite",
            (t) =>
              Zu(t)
                .put({
                  clientId: this.clientId,
                  updateTimeMs: Date.now(),
                  networkEnabled: this.networkEnabled,
                  inForeground: this.inForeground,
                })
                .next(() => {
                  if (this.isPrimary)
                    return this.Ts(t).next((e) => {
                      e ||
                        ((this.isPrimary = !1),
                        this.Jn.enqueueRetryable(() => this.us(!1)));
                    });
                })
                .next(() => this.Es(t))
                .next((e) =>
                  this.isPrimary && !e
                    ? this.As(t).next(() => !1)
                    : !!e && this.Rs(t).next(() => !0)
                )
          )
            .catch((e) => {
              if (xo(e))
                return (
                  Er(
                    "IndexedDbPersistence",
                    "Failed to extend owner lease: ",
                    e
                  ),
                  this.isPrimary
                );
              if (!this.allowTabSynchronization) throw e;
              return (
                Er(
                  "IndexedDbPersistence",
                  "Releasing owner lease after error during lease refresh",
                  e
                ),
                !1
              );
            })
            .then((e) => {
              this.isPrimary !== e &&
                this.Jn.enqueueRetryable(() => this.us(e)),
                (this.isPrimary = e);
            });
        }
        Ts(e) {
          return Ju(e)
            .get("owner")
            .next((e) => To.resolve(this.bs(e)));
        }
        Ps(e) {
          return Zu(e).delete(this.clientId);
        }
        async Vs() {
          if (this.isPrimary && !this.vs(this.os, 18e5)) {
            this.os = Date.now();
            var e = await this.runTransaction(
              "maybeGarbageCollectMultiClientState",
              "readwrite-primary",
              (e) => {
                const r = Lo(e, "clientMetadata");
                return r.qt().next((e) => {
                  const t = this.Ss(e, 18e5),
                    n = e.filter((e) => -1 === t.indexOf(e));
                  return To.forEach(n, (e) => r.delete(e.clientId)).next(
                    () => n
                  );
                });
              }
            ).catch(() => []);
            if (this._s)
              for (const t of e) this._s.removeItem(this.Ds(t.clientId));
          }
        }
        ps() {
          this.rs = this.Jn.enqueueAfterDelay(
            "client_metadata_refresh",
            4e3,
            () =>
              this.ws()
                .then(() => this.Vs())
                .then(() => this.ps())
          );
        }
        bs(e) {
          return !!e && e.ownerId === this.clientId;
        }
        Es(t) {
          return this.Xn
            ? To.resolve(!0)
            : Ju(t)
                .get("owner")
                .next((e) => {
                  if (
                    null !== e &&
                    this.vs(e.leaseTimestampMs, 5e3) &&
                    !this.Cs(e.ownerId)
                  ) {
                    if (this.bs(e) && this.networkEnabled) return !0;
                    if (!this.bs(e)) {
                      if (!e.allowTabSynchronization)
                        throw new Nr(xr.FAILED_PRECONDITION, Yu);
                      return !1;
                    }
                  }
                  return (
                    !(!this.networkEnabled || !this.inForeground) ||
                    Zu(t)
                      .qt()
                      .next(
                        (e) =>
                          void 0 ===
                          this.Ss(e, 5e3).find((e) => {
                            if (this.clientId !== e.clientId) {
                              var t = !this.networkEnabled && e.networkEnabled,
                                n = !this.inForeground && e.inForeground,
                                r = this.networkEnabled === e.networkEnabled;
                              if (t || (n && r)) return !0;
                            }
                            return !1;
                          })
                      )
                  );
                })
                .next(
                  (e) => (
                    this.isPrimary !== e &&
                      Er(
                        "IndexedDbPersistence",
                        `Client ${
                          e ? "is" : "is not"
                        } eligible for a primary lease.`
                      ),
                    e
                  )
                );
        }
        async shutdown() {
          (this.es = !1),
            this.xs(),
            this.rs && (this.rs.cancel(), (this.rs = null)),
            this.Ns(),
            this.ks(),
            await this.hs.runTransaction(
              "shutdown",
              "readwrite",
              ["owner", "clientMetadata"],
              (e) => {
                const t = new Mo(e, qr.A);
                return this.As(t).next(() => this.Ps(t));
              }
            ),
            this.hs.close(),
            this.Ms();
        }
        Ss(e, t) {
          return e.filter(
            (e) => this.vs(e.updateTimeMs, t) && !this.Cs(e.clientId)
          );
        }
        Os() {
          return this.runTransaction("getActiveClients", "readonly", (e) =>
            Zu(e)
              .qt()
              .next((e) => this.Ss(e, 18e5).map((e) => e.clientId))
          );
        }
        get started() {
          return this.es;
        }
        getMutationQueue(e, t) {
          return Tu.Yt(e, this.M, t, this.referenceDelegate);
        }
        getTargetCache() {
          return this.ls;
        }
        getRemoteDocumentCache() {
          return this.fs;
        }
        getIndexManager(e) {
          return new gu(e);
        }
        getDocumentOverlayCache(e) {
          return Zo.Yt(this.M, e);
        }
        getBundleCache() {
          return this.ds;
        }
        runTransaction(t, n, r) {
          Er("IndexedDbPersistence", "Starting transaction:", t);
          var e,
            s = "readonly" === n ? "readonly" : "readwrite",
            e =
              14 === (e = this.Zn)
                ? bo
                : 13 === e
                ? wo
                : 12 === e
                ? vo
                : 11 === e
                ? yo
                : void Ar();
          let i;
          return this.hs
            .runTransaction(
              t,
              s,
              e,
              (e) => (
                (i = new Mo(e, this.ts ? this.ts.next() : qr.A)),
                "readwrite-primary" === n
                  ? this.Ts(i)
                      .next((e) => !!e || this.Es(i))
                      .next((e) => {
                        if (!e)
                          throw (
                            (Tr(
                              `Failed to obtain primary lease for action '${t}'.`
                            ),
                            (this.isPrimary = !1),
                            this.Jn.enqueueRetryable(() => this.us(!1)),
                            new Nr(xr.FAILED_PRECONDITION, Io))
                          );
                        return r(i);
                      })
                      .next((e) => this.Rs(i).next(() => e))
                  : this.Fs(i).next(() => r(i))
              )
            )
            .then((e) => (i.raiseOnCommittedEvent(), e));
        }
        Fs(e) {
          return Ju(e)
            .get("owner")
            .next((e) => {
              if (
                null !== e &&
                this.vs(e.leaseTimestampMs, 5e3) &&
                !this.Cs(e.ownerId) &&
                !this.bs(e) &&
                !(
                  this.Xn ||
                  (this.allowTabSynchronization && e.allowTabSynchronization)
                )
              )
                throw new Nr(xr.FAILED_PRECONDITION, Yu);
            });
        }
        Rs(e) {
          var t = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now(),
          };
          return Ju(e).put("owner", t);
        }
        static vt() {
          return So.vt();
        }
        As(e) {
          const t = Ju(e);
          return t
            .get("owner")
            .next((e) =>
              this.bs(e)
                ? (Er("IndexedDbPersistence", "Releasing primary lease."),
                  t.delete("owner"))
                : To.resolve()
            );
        }
        vs(e, t) {
          var n = Date.now();
          return !(
            e < n - t ||
            (n < e &&
              (Tr(`Detected an update time that is in the future: ${e} > ${n}`),
              1))
          );
        }
        gs() {
          null !== this.document &&
            "function" == typeof this.document.addEventListener &&
            ((this.ss = () => {
              this.Jn.enqueueAndForget(
                () => (
                  (this.inForeground =
                    "visible" === this.document.visibilityState),
                  this.ws()
                )
              );
            }),
            this.document.addEventListener("visibilitychange", this.ss),
            (this.inForeground = "visible" === this.document.visibilityState));
        }
        Ns() {
          this.ss &&
            (this.document.removeEventListener("visibilitychange", this.ss),
            (this.ss = null));
        }
        ys() {
          var e;
          "function" ==
            typeof (null === (e = this.window) || void 0 === e
              ? void 0
              : e.addEventListener) &&
            ((this.ns = () => {
              this.xs(),
                s() &&
                  navigator.appVersion.match(/Version\/1[45]/) &&
                  this.Jn.enterRestrictedMode(!0),
                this.Jn.enqueueAndForget(() => this.shutdown());
            }),
            this.window.addEventListener("pagehide", this.ns));
        }
        ks() {
          this.ns &&
            (this.window.removeEventListener("pagehide", this.ns),
            (this.ns = null));
        }
        Cs(e) {
          var t;
          try {
            var n =
              null !==
              (null === (t = this._s) || void 0 === t
                ? void 0
                : t.getItem(this.Ds(e)));
            return (
              Er(
                "IndexedDbPersistence",
                `Client '${e}' ${n ? "is" : "is not"} zombied in LocalStorage`
              ),
              n
            );
          } catch (e) {
            return (
              Tr("IndexedDbPersistence", "Failed to get zombied client id.", e),
              !1
            );
          }
        }
        xs() {
          if (this._s)
            try {
              this._s.setItem(this.Ds(this.clientId), String(Date.now()));
            } catch (e) {
              Tr("Failed to set zombie client id.", e);
            }
        }
        Ms() {
          if (this._s)
            try {
              this._s.removeItem(this.Ds(this.clientId));
            } catch (e) {}
        }
        Ds(e) {
          return `firestore_zombie_${this.persistenceKey}_${e}`;
        }
      }
      function Ju(e) {
        return Lo(e, "owner");
      }
      function Zu(e) {
        return Lo(e, "clientMetadata");
      }
      function eh(e, t) {
        let n = e.projectId;
        return (
          e.isDefaultDatabase || (n += "." + e.database),
          "firestore/" + t + "/" + n + "/"
        );
      }
      class th {
        constructor(e, t, n) {
          (this.fs = e), (this.$s = t), (this.indexManager = n);
        }
        Bs(t, n) {
          return this.$s
            .getAllMutationBatchesAffectingDocumentKey(t, n)
            .next((e) => this.Ls(t, n, e));
        }
        Ls(e, t, n) {
          return this.fs.getEntry(e, t).next((e) => {
            for (const t of n) t.applyToLocalView(e);
            return e;
          });
        }
        Us(e, n) {
          e.forEach((e, t) => {
            for (const e of n) e.applyToLocalView(t);
          });
        }
        qs(t, e) {
          return this.fs
            .getEntries(t, e)
            .next((e) => this.Gs(t, e).next(() => e));
        }
        Gs(e, t) {
          return this.$s
            .getAllMutationBatchesAffectingDocumentKeys(e, t)
            .next((e) => this.Us(t, e));
        }
        Ks(e, t, n) {
          return (
            (r = t),
            ds.isDocumentKey(r.path) &&
            null === r.collectionGroup &&
            0 === r.filters.length
              ? this.Qs(e, t.path)
              : di(t)
              ? this.js(e, t, n)
              : this.Ws(e, t, n)
          );
          var r;
        }
        Qs(e, t) {
          return this.Bs(e, new ds(t)).next((e) => {
            let t = ua;
            return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
          });
        }
        js(r, s, i) {
          const a = s.collectionGroup;
          let o = ua;
          return this.indexManager.getCollectionParents(r, a).next((e) =>
            To.forEach(e, (e) => {
              var t,
                n =
                  ((t = s),
                  (e = e.child(a)),
                  new ii(
                    e,
                    null,
                    t.explicitOrderBy.slice(),
                    t.filters.slice(),
                    t.limit,
                    t.limitType,
                    t.startAt,
                    t.endAt
                  ));
              return this.Ws(r, n, i).next((e) => {
                e.forEach((e, t) => {
                  o = o.insert(e, t);
                });
              });
            }).next(() => o)
          );
        }
        Ws(t, n, e) {
          let s;
          return this.fs
            .getAllFromCollection(t, n.path, e)
            .next(
              (e) => (
                (s = e), this.$s.getAllMutationBatchesAffectingQuery(t, n)
              )
            )
            .next((t) => {
              for (const r of t)
                for (const t of r.mutations) {
                  var n = t.key;
                  let e = s.get(n);
                  null == e &&
                    ((e = Rs.newInvalidDocument(n)), (s = s.insert(n, e))),
                    Bi(t, e, r.localWriteTime),
                    e.isFoundDocument() || (s = s.remove(n));
                }
            })
            .next(
              () => (
                s.forEach((e, t) => {
                  wi(n, t) || (s = s.remove(e));
                }),
                s
              )
            );
        }
      }
      class nh {
        constructor(e, t, n, r) {
          (this.targetId = e),
            (this.fromCache = t),
            (this.zs = n),
            (this.Hs = r);
        }
        static Js(e, t) {
          let n = da(),
            r = da();
          for (const e of t.docChanges)
            switch (e.type) {
              case 0:
                n = n.add(e.doc.key);
                break;
              case 1:
                r = r.add(e.doc.key);
            }
          return new nh(e, t.fromCache, n, r);
        }
      }
      class rh {
        Ys(e) {
          this.Xs = e;
        }
        Ks(t, r, s, i) {
          return (0 === (e = r).filters.length &&
            null === e.limit &&
            null == e.startAt &&
            null == e.endAt &&
            (0 === e.explicitOrderBy.length ||
              (1 === e.explicitOrderBy.length &&
                e.explicitOrderBy[0].field.isKeyField()))) ||
            s.isEqual($r.min())
            ? this.Zs(t, r)
            : this.Xs.qs(t, i).next((e) => {
                const n = this.ti(r, e);
                return (ui(r) || hi(r)) && this.ei(r.limitType, n, i, s)
                  ? this.Zs(t, r)
                  : (Ir() <= l.DEBUG &&
                      Er(
                        "QueryEngine",
                        "Re-using previous result from %s to execute query: %s",
                        s.toString(),
                        vi(r)
                      ),
                    this.Xs.Ks(t, r, Fs(s, -1)).next(
                      (t) => (
                        n.forEach((e) => {
                          t = t.insert(e.key, e);
                        }),
                        t
                      )
                    ));
              });
          var e;
        }
        ti(n, e) {
          let r = new sa(Ii(n));
          return (
            e.forEach((e, t) => {
              wi(n, t) && (r = r.add(t));
            }),
            r
          );
        }
        ei(e, t, n, r) {
          if (n.size !== t.size) return !0;
          const s = "F" === e ? t.last() : t.first();
          return !!s && (s.hasPendingWrites || 0 < s.version.compareTo(r));
        }
        Zs(e, t) {
          return (
            Ir() <= l.DEBUG &&
              Er(
                "QueryEngine",
                "Using full collection scan to execute query:",
                vi(t)
              ),
            this.Xs.Ks(e, t, qs.min())
          );
        }
      }
      class sh {
        constructor(e, t, n, r) {
          (this.persistence = e),
            (this.ni = t),
            (this.M = r),
            (this.si = new ta(Br)),
            (this.ii = new ea((e) => Gs(e), js)),
            (this.ri = new Map()),
            (this.oi = e.getRemoteDocumentCache()),
            (this.ls = e.getTargetCache()),
            (this.ds = e.getBundleCache()),
            this.ui(n);
        }
        ui(e) {
          (this.indexManager = this.persistence.getIndexManager(e)),
            (this.$s = this.persistence.getMutationQueue(e, this.indexManager)),
            (this.ai = new th(this.oi, this.$s, this.indexManager)),
            this.oi.setIndexManager(this.indexManager),
            this.ni.Ys(this.ai);
        }
        collectGarbage(t) {
          return this.persistence.runTransaction(
            "Collect garbage",
            "readwrite-primary",
            (e) => t.collect(e, this.si)
          );
        }
      }
      function ih(e, t, n, r) {
        return new sh(e, t, n, r);
      }
      async function ah(e, t) {
        const a = e;
        return a.persistence.runTransaction(
          "Handle user change",
          "readonly",
          (s) => {
            let i;
            return a.$s
              .getAllMutationBatches(s)
              .next((e) => ((i = e), a.ui(t), a.$s.getAllMutationBatches(s)))
              .next((e) => {
                const t = [],
                  n = [];
                let r = da();
                for (const s of i) {
                  t.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                for (const s of e) {
                  n.push(s.batchId);
                  for (const e of s.mutations) r = r.add(e.key);
                }
                return a.ai
                  .qs(s, r)
                  .next((e) => ({
                    ci: e,
                    removedBatchIds: t,
                    addedBatchIds: n,
                  }));
              });
          }
        );
      }
      function oh(e) {
        const t = e;
        return t.persistence.runTransaction(
          "Get last remote snapshot version",
          "readonly",
          (e) => t.ls.getLastRemoteSnapshotVersion(e)
        );
      }
      function uh(e, h) {
        const c = e,
          l = h.snapshotVersion;
        let d = c.si;
        return c.persistence
          .runTransaction("Apply remote event", "readwrite-primary", (o) => {
            const e = c.oi.newChangeBuffer({ trackRemovals: !0 });
            d = c.si;
            const u = [];
            h.targetChanges.forEach((t, n) => {
              const r = d.get(n);
              if (r) {
                u.push(
                  c.ls
                    .removeMatchingKeys(o, t.removedDocuments, n)
                    .next(() => c.ls.addMatchingKeys(o, t.addedDocuments, n))
                );
                let e = r.withSequenceNumber(o.currentSequenceNumber);
                var s, i, a;
                h.targetMismatches.has(n)
                  ? (e = e
                      .withResumeToken(es.EMPTY_BYTE_STRING, $r.min())
                      .withLastLimboFreeSnapshotVersion($r.min()))
                  : 0 < t.resumeToken.approximateByteSize() &&
                    (e = e.withResumeToken(t.resumeToken, l)),
                  (d = d.insert(n, e)),
                  (s = r),
                  (i = e),
                  (a = t),
                  (0 !== s.resumeToken.approximateByteSize() &&
                    !(
                      3e8 <=
                        i.snapshotVersion.toMicroseconds() -
                          s.snapshotVersion.toMicroseconds() ||
                      0 <
                        a.addedDocuments.size +
                          a.modifiedDocuments.size +
                          a.removedDocuments.size
                    )) ||
                    u.push(c.ls.updateTargetData(o, e));
              }
            });
            let t = oa;
            if (
              (h.documentUpdates.forEach((e) => {
                h.resolvedLimboDocuments.has(e) &&
                  u.push(
                    c.persistence.referenceDelegate.updateLimboDocument(o, e)
                  );
              }),
              u.push(
                hh(o, e, h.documentUpdates).next((e) => {
                  t = e;
                })
              ),
              !l.isEqual($r.min()))
            ) {
              const h = c.ls
                .getLastRemoteSnapshotVersion(o)
                .next((e) =>
                  c.ls.setTargetsMetadata(o, o.currentSequenceNumber, l)
                );
              u.push(h);
            }
            return To.waitFor(u)
              .next(() => e.apply(o))
              .next(() => c.ai.Gs(o, t))
              .next(() => t);
          })
          .then((e) => ((c.si = d), e));
      }
      function hh(e, i, t) {
        let n = da();
        return (
          t.forEach((e) => (n = n.add(e))),
          i.getEntries(e, n).next((r) => {
            let s = oa;
            return (
              t.forEach((e, t) => {
                const n = r.get(e);
                t.isNoDocument() && t.version.isEqual($r.min())
                  ? (i.removeEntry(e, t.readTime), (s = s.insert(e, t)))
                  : !n.isValidDocument() ||
                    0 < t.version.compareTo(n.version) ||
                    (0 === t.version.compareTo(n.version) && n.hasPendingWrites)
                  ? (i.addEntry(t), (s = s.insert(e, t)))
                  : Er(
                      "LocalStore",
                      "Ignoring outdated watch update for ",
                      e,
                      ". Current version:",
                      n.version,
                      " Watch version:",
                      t.version
                    );
              }),
              s
            );
          })
        );
      }
      function ch(e, r) {
        const s = e;
        return s.persistence
          .runTransaction("Allocate target", "readwrite", (t) => {
            let n;
            return s.ls
              .getTargetData(t, r)
              .next((e) =>
                e
                  ? ((n = e), To.resolve(n))
                  : s.ls
                      .allocateTargetId(t)
                      .next(
                        (e) => (
                          (n = new Fo(r, e, 0, t.currentSequenceNumber)),
                          s.ls.addTargetData(t, n).next(() => n)
                        )
                      )
              );
          })
          .then((e) => {
            var t = s.si.get(e.targetId);
            return (
              (null === t ||
                0 < e.snapshotVersion.compareTo(t.snapshotVersion)) &&
                ((s.si = s.si.insert(e.targetId, e)), s.ii.set(r, e.targetId)),
              e
            );
          });
      }
      async function lh(e, t, n) {
        const r = e,
          s = r.si.get(t),
          i = n ? "readwrite" : "readwrite-primary";
        try {
          n ||
            (await r.persistence.runTransaction("Release target", i, (e) =>
              r.persistence.referenceDelegate.removeTarget(e, s)
            ));
        } catch (e) {
          if (!xo(e)) throw e;
          Er(
            "LocalStore",
            `Failed to update sequence numbers for target ${t}: ${e}`
          );
        }
        (r.si = r.si.remove(t)), r.ii.delete(s.target);
      }
      function dh(e, n, r) {
        const s = e;
        let i = $r.min(),
          a = da();
        return s.persistence.runTransaction("Execute query", "readonly", (t) =>
          (function (e, t, n) {
            const r = e,
              s = r.ii.get(n);
            return void 0 !== s
              ? To.resolve(r.si.get(s))
              : r.ls.getTargetData(t, n);
          })(s, t, gi(n))
            .next((e) => {
              if (e)
                return (
                  (i = e.lastLimboFreeSnapshotVersion),
                  s.ls.getMatchingKeysForTargetId(t, e.targetId).next((e) => {
                    a = e;
                  })
                );
            })
            .next(() => s.ni.Ks(t, n, r ? i : $r.min(), r ? a : da()))
            .next((e) => (mh(s, bi(n), e), { documents: e, hi: a }))
        );
      }
      function fh(e, t) {
        const n = e,
          r = n.ls,
          s = n.si.get(t);
        return s
          ? Promise.resolve(s.target)
          : n.persistence.runTransaction("Get target data", "readonly", (e) =>
              r.Et(e, t).next((e) => (e ? e.target : null))
            );
      }
      function gh(e, t) {
        const n = e,
          r = n.ri.get(t) || $r.min();
        return n.persistence
          .runTransaction("Get new document changes", "readonly", (e) =>
            n.oi.getAllFromCollectionGroup(
              e,
              t,
              Fs(r, -1),
              Number.MAX_SAFE_INTEGER
            )
          )
          .then((e) => (mh(n, t, e), e));
      }
      function mh(e, t, n) {
        let r = $r.min();
        n.forEach((e, t) => {
          0 < t.readTime.compareTo(r) && (r = t.readTime);
        }),
          e.ri.set(t, r);
      }
      class ph {
        constructor(e) {
          (this.M = e), (this._i = new Map()), (this.wi = new Map());
        }
        getBundleMetadata(e, t) {
          return To.resolve(this._i.get(t));
        }
        saveBundleMetadata(e, t) {
          return (
            this._i.set(t.id, {
              id: t.id,
              version: t.version,
              createTime: xa(t.createTime),
            }),
            To.resolve()
          );
        }
        getNamedQuery(e, t) {
          return To.resolve(this.wi.get(t));
        }
        saveNamedQuery(e, t) {
          return (
            this.wi.set(t.name, {
              name: (t = t).name,
              query: Wo(t.bundledQuery),
              readTime: xa(t.readTime),
            }),
            To.resolve()
          );
        }
      }
      class yh {
        constructor() {
          (this.overlays = new ta(ds.comparator)), (this.mi = new Map());
        }
        getOverlay(e, t) {
          return To.resolve(this.overlays.get(t));
        }
        saveOverlays(n, r, e) {
          return (
            e.forEach((e, t) => {
              this.Xt(n, r, t);
            }),
            To.resolve()
          );
        }
        removeOverlaysForBatchId(e, t, n) {
          const r = this.mi.get(n);
          return (
            void 0 !== r &&
              (r.forEach((e) => (this.overlays = this.overlays.remove(e))),
              this.mi.delete(n)),
            To.resolve()
          );
        }
        getOverlaysForCollection(e, t, n) {
          const r = ha(),
            s = t.length + 1,
            i = new ds(t.child("")),
            a = this.overlays.getIteratorFrom(i);
          for (; a.hasNext(); ) {
            const e = a.getNext().value,
              i = e.getKey();
            if (!t.isPrefixOf(i.path)) break;
            i.path.length === s && e.largestBatchId > n && r.set(e.getKey(), e);
          }
          return To.resolve(r);
        }
        getOverlaysForCollectionGroup(t, e, n, r) {
          let s = new ta((e, t) => e - t);
          const i = this.overlays.getIterator();
          for (; i.hasNext(); ) {
            const t = i.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
              let e = s.get(t.largestBatchId);
              null === e && ((e = ha()), (s = s.insert(t.largestBatchId, e))),
                e.set(t.getKey(), t);
            }
          }
          const a = ha(),
            o = s.getIterator();
          for (
            ;
            o.hasNext() &&
            (o.getNext().value.forEach((e, t) => a.set(e, t)),
            !(a.size() >= r));

          );
          return To.resolve(a);
        }
        Xt(t, n, r) {
          if (null !== r) {
            var s = this.overlays.get(r.key);
            if (null !== s) {
              const t = this.mi.get(s.largestBatchId).delete(r.key);
              this.mi.set(s.largestBatchId, t);
            }
            this.overlays = this.overlays.insert(r.key, new Po(n, r));
            let e = this.mi.get(n);
            void 0 === e && ((e = da()), this.mi.set(n, e)),
              this.mi.set(n, e.add(r.key));
          }
        }
      }
      class vh {
        constructor() {
          (this.gi = new sa(wh.yi)), (this.pi = new sa(wh.Ii));
        }
        isEmpty() {
          return this.gi.isEmpty();
        }
        addReference(e, t) {
          var n = new wh(e, t);
          (this.gi = this.gi.add(n)), (this.pi = this.pi.add(n));
        }
        Ti(e, t) {
          e.forEach((e) => this.addReference(e, t));
        }
        removeReference(e, t) {
          this.Ei(new wh(e, t));
        }
        Ai(e, t) {
          e.forEach((e) => this.removeReference(e, t));
        }
        Ri(e) {
          const t = new ds(new Yr([])),
            n = new wh(t, e),
            r = new wh(t, e + 1),
            s = [];
          return (
            this.pi.forEachInRange([n, r], (e) => {
              this.Ei(e), s.push(e.key);
            }),
            s
          );
        }
        bi() {
          this.gi.forEach((e) => this.Ei(e));
        }
        Ei(e) {
          (this.gi = this.gi.delete(e)), (this.pi = this.pi.delete(e));
        }
        Pi(e) {
          var t = new ds(new Yr([])),
            n = new wh(t, e),
            t = new wh(t, e + 1);
          let r = da();
          return (
            this.pi.forEachInRange([n, t], (e) => {
              r = r.add(e.key);
            }),
            r
          );
        }
        containsKey(e) {
          var t = new wh(e, 0),
            t = this.gi.firstAfterOrEqual(t);
          return null !== t && e.isEqual(t.key);
        }
      }
      class wh {
        constructor(e, t) {
          (this.key = e), (this.Vi = t);
        }
        static yi(e, t) {
          return ds.comparator(e.key, t.key) || Br(e.Vi, t.Vi);
        }
        static Ii(e, t) {
          return Br(e.Vi, t.Vi) || ds.comparator(e.key, t.key);
        }
      }
      class bh {
        constructor(e, t) {
          (this.indexManager = e),
            (this.referenceDelegate = t),
            (this.$s = []),
            (this.vi = 1),
            (this.Si = new sa(wh.yi));
        }
        checkEmpty(e) {
          return To.resolve(0 === this.$s.length);
        }
        addMutationBatch(e, t, n, r) {
          var s = this.vi;
          this.vi++, 0 < this.$s.length && this.$s[this.$s.length - 1];
          var i = new Vo(s, t, n, r);
          this.$s.push(i);
          for (const t of r)
            (this.Si = this.Si.add(new wh(t.key, s))),
              this.indexManager.addToCollectionParentIndex(
                e,
                t.key.path.popLast()
              );
          return To.resolve(i);
        }
        lookupMutationBatch(e, t) {
          return To.resolve(this.Di(t));
        }
        getNextMutationBatchAfterBatchId(e, t) {
          var n = this.Ci(t + 1),
            n = n < 0 ? 0 : n;
          return To.resolve(this.$s.length > n ? this.$s[n] : null);
        }
        getHighestUnacknowledgedBatchId() {
          return To.resolve(0 === this.$s.length ? -1 : this.vi - 1);
        }
        getAllMutationBatches(e) {
          return To.resolve(this.$s.slice());
        }
        getAllMutationBatchesAffectingDocumentKey(e, t) {
          const n = new wh(t, 0),
            r = new wh(t, Number.POSITIVE_INFINITY),
            s = [];
          return (
            this.Si.forEachInRange([n, r], (e) => {
              var t = this.Di(e.Vi);
              s.push(t);
            }),
            To.resolve(s)
          );
        }
        getAllMutationBatchesAffectingDocumentKeys(e, t) {
          let r = new sa(Br);
          return (
            t.forEach((e) => {
              var t = new wh(e, 0),
                n = new wh(e, Number.POSITIVE_INFINITY);
              this.Si.forEachInRange([t, n], (e) => {
                r = r.add(e.Vi);
              });
            }),
            To.resolve(this.xi(r))
          );
        }
        getAllMutationBatchesAffectingQuery(e, t) {
          const n = t.path,
            r = n.length + 1;
          let s = n;
          ds.isDocumentKey(s) || (s = s.child(""));
          var i = new wh(new ds(s), 0);
          let a = new sa(Br);
          return (
            this.Si.forEachWhile((e) => {
              var t = e.key.path;
              return (
                !!n.isPrefixOf(t) && (t.length === r && (a = a.add(e.Vi)), !0)
              );
            }, i),
            To.resolve(this.xi(a))
          );
        }
        xi(e) {
          const n = [];
          return (
            e.forEach((e) => {
              var t = this.Di(e);
              null !== t && n.push(t);
            }),
            n
          );
        }
        removeMutationBatch(n, r) {
          Dr(0 === this.Ni(r.batchId, "removed")), this.$s.shift();
          let s = this.Si;
          return To.forEach(r.mutations, (e) => {
            var t = new wh(e.key, r.batchId);
            return (
              (s = s.delete(t)),
              this.referenceDelegate.markPotentiallyOrphaned(n, e.key)
            );
          }).next(() => {
            this.Si = s;
          });
        }
        dn(e) {}
        containsKey(e, t) {
          var n = new wh(t, 0),
            n = this.Si.firstAfterOrEqual(n);
          return To.resolve(t.isEqual(n && n.key));
        }
        performConsistencyCheck(e) {
          return this.$s.length, To.resolve();
        }
        Ni(e, t) {
          return this.Ci(e);
        }
        Ci(e) {
          return 0 === this.$s.length ? 0 : e - this.$s[0].batchId;
        }
        Di(e) {
          var t = this.Ci(e);
          return t < 0 || t >= this.$s.length ? null : this.$s[t];
        }
      }
      class Ih {
        constructor(e) {
          (this.ki = e), (this.docs = new ta(ds.comparator)), (this.size = 0);
        }
        setIndexManager(e) {
          this.indexManager = e;
        }
        addEntry(e, t) {
          const n = t.key,
            r = this.docs.get(n),
            s = r ? r.size : 0,
            i = this.ki(t);
          return (
            (this.docs = this.docs.insert(n, {
              document: t.mutableCopy(),
              size: i,
            })),
            (this.size += i - s),
            this.indexManager.addToCollectionParentIndex(e, n.path.popLast())
          );
        }
        removeEntry(e) {
          var t = this.docs.get(e);
          t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
        }
        getEntry(e, t) {
          const n = this.docs.get(t);
          return To.resolve(
            n ? n.document.mutableCopy() : Rs.newInvalidDocument(t)
          );
        }
        getEntries(e, t) {
          let n = oa;
          return (
            t.forEach((e) => {
              const t = this.docs.get(e);
              n = n.insert(
                e,
                t ? t.document.mutableCopy() : Rs.newInvalidDocument(e)
              );
            }),
            To.resolve(n)
          );
        }
        getAllFromCollection(e, t, n) {
          let r = oa;
          const s = new ds(t.child("")),
            i = this.docs.getIteratorFrom(s);
          for (; i.hasNext(); ) {
            const {
              key: e,
              value: { document: s },
            } = i.getNext();
            if (!t.isPrefixOf(e.path)) break;
            e.path.length > t.length + 1 ||
              (function (e, t) {
                let n = e.readTime.compareTo(t.readTime);
                return 0 !== n
                  ? n
                  : ((n = ds.comparator(e.documentKey, t.documentKey)),
                    0 !== n ? n : Br(e.largestBatchId, t.largestBatchId));
              })(((a = s), new qs(a.readTime, a.key, -1)), n) <= 0 ||
              (r = r.insert(s.key, s.mutableCopy()));
          }
          var a;
          return To.resolve(r);
        }
        getAllFromCollectionGroup(e, t, n, r) {
          Ar();
        }
        Mi(e, t) {
          return To.forEach(this.docs, (e) => t(e));
        }
        newChangeBuffer(e) {
          return new Eh(this);
        }
        getSize(e) {
          return To.resolve(this.size);
        }
      }
      class Eh extends Uu {
        constructor(e) {
          super(), (this.qn = e);
        }
        applyChanges(n) {
          const r = [];
          return (
            this.changes.forEach((e, t) => {
              t.isValidDocument()
                ? r.push(this.qn.addEntry(n, t))
                : this.qn.removeEntry(e);
            }),
            To.waitFor(r)
          );
        }
        getFromCache(e, t) {
          return this.qn.getEntry(e, t);
        }
        getAllFromCache(e, t) {
          return this.qn.getEntries(e, t);
        }
      }
      class Th {
        constructor(e) {
          (this.persistence = e),
            (this.Oi = new ea((e) => Gs(e), js)),
            (this.lastRemoteSnapshotVersion = $r.min()),
            (this.highestTargetId = 0),
            (this.Fi = 0),
            (this.$i = new vh()),
            (this.targetCount = 0),
            (this.Bi = xu.mn());
        }
        forEachTarget(e, n) {
          return this.Oi.forEach((e, t) => n(t)), To.resolve();
        }
        getLastRemoteSnapshotVersion(e) {
          return To.resolve(this.lastRemoteSnapshotVersion);
        }
        getHighestSequenceNumber(e) {
          return To.resolve(this.Fi);
        }
        allocateTargetId(e) {
          return (
            (this.highestTargetId = this.Bi.next()),
            To.resolve(this.highestTargetId)
          );
        }
        setTargetsMetadata(e, t, n) {
          return (
            n && (this.lastRemoteSnapshotVersion = n),
            t > this.Fi && (this.Fi = t),
            To.resolve()
          );
        }
        In(e) {
          this.Oi.set(e.target, e);
          var t = e.targetId;
          t > this.highestTargetId &&
            ((this.Bi = new xu(t)), (this.highestTargetId = t)),
            e.sequenceNumber > this.Fi && (this.Fi = e.sequenceNumber);
        }
        addTargetData(e, t) {
          return this.In(t), (this.targetCount += 1), To.resolve();
        }
        updateTargetData(e, t) {
          return this.In(t), To.resolve();
        }
        removeTargetData(e, t) {
          return (
            this.Oi.delete(t.target),
            this.$i.Ri(t.targetId),
            --this.targetCount,
            To.resolve()
          );
        }
        removeTargets(n, r, s) {
          let i = 0;
          const a = [];
          return (
            this.Oi.forEach((e, t) => {
              t.sequenceNumber <= r &&
                null === s.get(t.targetId) &&
                (this.Oi.delete(e),
                a.push(this.removeMatchingKeysForTargetId(n, t.targetId)),
                i++);
            }),
            To.waitFor(a).next(() => i)
          );
        }
        getTargetCount(e) {
          return To.resolve(this.targetCount);
        }
        getTargetData(e, t) {
          var n = this.Oi.get(t) || null;
          return To.resolve(n);
        }
        addMatchingKeys(e, t, n) {
          return this.$i.Ti(t, n), To.resolve();
        }
        removeMatchingKeys(t, e, n) {
          this.$i.Ai(e, n);
          const r = this.persistence.referenceDelegate,
            s = [];
          return (
            r &&
              e.forEach((e) => {
                s.push(r.markPotentiallyOrphaned(t, e));
              }),
            To.waitFor(s)
          );
        }
        removeMatchingKeysForTargetId(e, t) {
          return this.$i.Ri(t), To.resolve();
        }
        getMatchingKeysForTargetId(e, t) {
          var n = this.$i.Pi(t);
          return To.resolve(n);
        }
        containsKey(e, t) {
          return To.resolve(this.$i.containsKey(t));
        }
      }
      class _h {
        constructor(e, t) {
          (this.Li = {}),
            (this.overlays = {}),
            (this.ts = new qr(0)),
            (this.es = !1),
            (this.es = !0),
            (this.referenceDelegate = e(this)),
            (this.ls = new Th(this)),
            (this.indexManager = new lu()),
            (this.fs = ((e = (e) => this.referenceDelegate.Ui(e)), new Ih(e))),
            (this.M = new qo(t)),
            (this.ds = new ph(this.M));
        }
        start() {
          return Promise.resolve();
        }
        shutdown() {
          return (this.es = !1), Promise.resolve();
        }
        get started() {
          return this.es;
        }
        setDatabaseDeletedListener() {}
        setNetworkEnabled() {}
        getIndexManager(e) {
          return this.indexManager;
        }
        getDocumentOverlayCache(e) {
          let t = this.overlays[e.toKey()];
          return t || ((t = new yh()), (this.overlays[e.toKey()] = t)), t;
        }
        getMutationQueue(e, t) {
          let n = this.Li[e.toKey()];
          return (
            n ||
              ((n = new bh(t, this.referenceDelegate)),
              (this.Li[e.toKey()] = n)),
            n
          );
        }
        getTargetCache() {
          return this.ls;
        }
        getRemoteDocumentCache() {
          return this.fs;
        }
        getBundleCache() {
          return this.ds;
        }
        runTransaction(e, t, n) {
          Er("MemoryPersistence", "Starting transaction:", e);
          const r = new Sh(this.ts.next());
          return (
            this.referenceDelegate.qi(),
            n(r)
              .next((e) => this.referenceDelegate.Gi(r).next(() => e))
              .toPromise()
              .then((e) => (r.raiseOnCommittedEvent(), e))
          );
        }
        Ki(t, n) {
          return To.or(
            Object.values(this.Li).map((e) => () => e.containsKey(t, n))
          );
        }
      }
      class Sh extends Eo {
        constructor(e) {
          super(), (this.currentSequenceNumber = e);
        }
      }
      class Ah {
        constructor(e) {
          (this.persistence = e), (this.Qi = new vh()), (this.ji = null);
        }
        static Wi(e) {
          return new Ah(e);
        }
        get zi() {
          if (this.ji) return this.ji;
          throw Ar();
        }
        addReference(e, t, n) {
          return (
            this.Qi.addReference(n, t),
            this.zi.delete(n.toString()),
            To.resolve()
          );
        }
        removeReference(e, t, n) {
          return (
            this.Qi.removeReference(n, t),
            this.zi.add(n.toString()),
            To.resolve()
          );
        }
        markPotentiallyOrphaned(e, t) {
          return this.zi.add(t.toString()), To.resolve();
        }
        removeTarget(e, t) {
          this.Qi.Ri(t.targetId).forEach((e) => this.zi.add(e.toString()));
          const n = this.persistence.getTargetCache();
          return n
            .getMatchingKeysForTargetId(e, t.targetId)
            .next((e) => {
              e.forEach((e) => this.zi.add(e.toString()));
            })
            .next(() => n.removeTargetData(e, t));
        }
        qi() {
          this.ji = new Set();
        }
        Gi(n) {
          const r = this.persistence.getRemoteDocumentCache().newChangeBuffer();
          return To.forEach(this.zi, (e) => {
            const t = ds.fromPath(e);
            return this.Hi(n, t).next((e) => {
              e || r.removeEntry(t, $r.min());
            });
          }).next(() => ((this.ji = null), r.apply(n)));
        }
        updateLimboDocument(e, t) {
          return this.Hi(e, t).next((e) => {
            e ? this.zi.delete(t.toString()) : this.zi.add(t.toString());
          });
        }
        Ui(e) {
          return 0;
        }
        Hi(e, t) {
          return To.or([
            () => To.resolve(this.Qi.containsKey(t)),
            () => this.persistence.getTargetCache().containsKey(e, t),
            () => this.persistence.Ki(e, t),
          ]);
        }
      }
      function Dh(e, t) {
        return `firestore_clients_${e}_${t}`;
      }
      function xh(e, t, n) {
        let r = `firestore_mutations_${e}_${n}`;
        return t.isAuthenticated() && (r += `_${t.uid}`), r;
      }
      function Nh(e, t) {
        return `firestore_targets_${e}_${t}`;
      }
      class Ch {
        constructor(e, t, n, r) {
          (this.user = e),
            (this.batchId = t),
            (this.state = n),
            (this.error = r);
        }
        static Ji(e, t, n) {
          var r = JSON.parse(n);
          let s,
            i =
              "object" == typeof r &&
              -1 !== ["pending", "acknowledged", "rejected"].indexOf(r.state) &&
              (void 0 === r.error || "object" == typeof r.error);
          return (
            i &&
              r.error &&
              ((i =
                "string" == typeof r.error.message &&
                "string" == typeof r.error.code),
              i && (s = new Nr(r.error.code, r.error.message))),
            i
              ? new Ch(e, t, r.state, s)
              : (Tr(
                  "SharedClientState",
                  `Failed to parse mutation state for ID '${t}': ${n}`
                ),
                null)
          );
        }
        Yi() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class kh {
        constructor(e, t, n) {
          (this.targetId = e), (this.state = t), (this.error = n);
        }
        static Ji(e, t) {
          var n = JSON.parse(t);
          let r,
            s =
              "object" == typeof n &&
              -1 !== ["not-current", "current", "rejected"].indexOf(n.state) &&
              (void 0 === n.error || "object" == typeof n.error);
          return (
            s &&
              n.error &&
              ((s =
                "string" == typeof n.error.message &&
                "string" == typeof n.error.code),
              s && (r = new Nr(n.error.code, n.error.message))),
            s
              ? new kh(e, n.state, r)
              : (Tr(
                  "SharedClientState",
                  `Failed to parse target state for ID '${e}': ${t}`
                ),
                null)
          );
        }
        Yi() {
          const e = { state: this.state, updateTimeMs: Date.now() };
          return (
            this.error &&
              (e.error = {
                code: this.error.code,
                message: this.error.message,
              }),
            JSON.stringify(e)
          );
        }
      }
      class Rh {
        constructor(e, t) {
          (this.clientId = e), (this.activeTargetIds = t);
        }
        static Ji(e, t) {
          var n = JSON.parse(t);
          let r = "object" == typeof n && n.activeTargetIds instanceof Array,
            s = fa;
          for (let i = 0; r && i < n.activeTargetIds.length; ++i)
            (r = ls(n.activeTargetIds[i])), (s = s.add(n.activeTargetIds[i]));
          return r
            ? new Rh(e, s)
            : (Tr(
                "SharedClientState",
                `Failed to parse client data for instance '${e}': ${t}`
              ),
              null);
        }
      }
      class Mh {
        constructor(e, t) {
          (this.clientId = e), (this.onlineState = t);
        }
        static Ji(e) {
          var t = JSON.parse(e);
          return "object" == typeof t &&
            -1 !== ["Unknown", "Online", "Offline"].indexOf(t.onlineState) &&
            "string" == typeof t.clientId
            ? new Mh(t.clientId, t.onlineState)
            : (Tr("SharedClientState", `Failed to parse online state: ${e}`),
              null);
        }
      }
      class Lh {
        constructor() {
          this.activeTargetIds = fa;
        }
        Xi(e) {
          this.activeTargetIds = this.activeTargetIds.add(e);
        }
        Zi(e) {
          this.activeTargetIds = this.activeTargetIds.delete(e);
        }
        Yi() {
          var e = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now(),
          };
          return JSON.stringify(e);
        }
      }
      class Vh {
        constructor(e, t, n, r, s) {
          (this.window = e),
            (this.Jn = t),
            (this.persistenceKey = n),
            (this.tr = r),
            (this.syncEngine = null),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null),
            (this.er = this.nr.bind(this)),
            (this.sr = new ta(Br)),
            (this.started = !1),
            (this.ir = []);
          var i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          (this.storage = this.window.localStorage),
            (this.currentUser = s),
            (this.rr = Dh(this.persistenceKey, this.tr)),
            (this.ur = `firestore_sequence_number_${this.persistenceKey}`),
            (this.sr = this.sr.insert(this.tr, new Lh())),
            (this.ar = new RegExp(`^firestore_clients_${i}_([^_]*)$`)),
            (this.cr = new RegExp(
              `^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`
            )),
            (this.hr = new RegExp(`^firestore_targets_${i}_(\\d+)$`)),
            (this.lr = `firestore_online_state_${this.persistenceKey}`),
            (this.dr = `firestore_bundle_loaded_v2_${this.persistenceKey}`),
            this.window.addEventListener("storage", this.er);
        }
        static vt(e) {
          return !(!e || !e.localStorage);
        }
        async start() {
          const e = await this.syncEngine.Os();
          for (const n of e)
            if (n !== this.tr) {
              const e = this.getItem(Dh(this.persistenceKey, n));
              var t;
              !e ||
                ((t = Rh.Ji(n, e)) &&
                  (this.sr = this.sr.insert(t.clientId, t)));
            }
          this._r();
          const n = this.storage.getItem(this.lr);
          if (n) {
            const e = this.wr(n);
            e && this.mr(e);
          }
          for (const e of this.ir) this.nr(e);
          (this.ir = []),
            this.window.addEventListener("pagehide", () => this.shutdown()),
            (this.started = !0);
        }
        writeSequenceNumber(e) {
          this.setItem(this.ur, JSON.stringify(e));
        }
        getAllActiveQueryTargets() {
          return this.gr(this.sr);
        }
        isActiveQueryTarget(n) {
          let r = !1;
          return (
            this.sr.forEach((e, t) => {
              t.activeTargetIds.has(n) && (r = !0);
            }),
            r
          );
        }
        addPendingMutation(e) {
          this.yr(e, "pending");
        }
        updateMutationState(e, t, n) {
          this.yr(e, t, n), this.pr(e);
        }
        addLocalQueryTarget(e) {
          let t = "not-current";
          var n;
          return (
            this.isActiveQueryTarget(e) &&
              (!(n = this.storage.getItem(Nh(this.persistenceKey, e))) ||
                ((n = kh.Ji(e, n)) && (t = n.state))),
            this.Ir.Xi(e),
            this._r(),
            t
          );
        }
        removeLocalQueryTarget(e) {
          this.Ir.Zi(e), this._r();
        }
        isLocalQueryTarget(e) {
          return this.Ir.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          this.removeItem(Nh(this.persistenceKey, e));
        }
        updateQueryState(e, t, n) {
          this.Tr(e, t, n);
        }
        handleUserChange(e, t, n) {
          t.forEach((e) => {
            this.pr(e);
          }),
            (this.currentUser = e),
            n.forEach((e) => {
              this.addPendingMutation(e);
            });
        }
        setOnlineState(e) {
          this.Er(e);
        }
        notifyBundleLoaded(e) {
          this.Ar(e);
        }
        shutdown() {
          this.started &&
            (this.window.removeEventListener("storage", this.er),
            this.removeItem(this.rr),
            (this.started = !1));
        }
        getItem(e) {
          var t = this.storage.getItem(e);
          return Er("SharedClientState", "READ", e, t), t;
        }
        setItem(e, t) {
          Er("SharedClientState", "SET", e, t), this.storage.setItem(e, t);
        }
        removeItem(e) {
          Er("SharedClientState", "REMOVE", e), this.storage.removeItem(e);
        }
        nr(e) {
          const s = e;
          s.storageArea === this.storage &&
            (Er("SharedClientState", "EVENT", s.key, s.newValue),
            s.key !== this.rr
              ? this.Jn.enqueueRetryable(async () => {
                  if (this.started) {
                    if (null !== s.key)
                      if (this.ar.test(s.key)) {
                        if (null == s.newValue) {
                          var e = this.Rr(s.key);
                          return this.br(e, null);
                        }
                        e = this.Pr(s.key, s.newValue);
                        if (e) return this.br(e.clientId, e);
                      } else if (this.cr.test(s.key)) {
                        if (null !== s.newValue) {
                          var t = this.Vr(s.key, s.newValue);
                          if (t) return this.vr(t);
                        }
                      } else if (this.hr.test(s.key)) {
                        if (null !== s.newValue) {
                          t = this.Sr(s.key, s.newValue);
                          if (t) return this.Dr(t);
                        }
                      } else if (s.key === this.lr) {
                        if (null !== s.newValue) {
                          var n = this.wr(s.newValue);
                          if (n) return this.mr(n);
                        }
                      } else if (s.key === this.ur) {
                        n = (function (e) {
                          let t = qr.A;
                          if (null != e)
                            try {
                              var n = JSON.parse(e);
                              Dr("number" == typeof n), (t = n);
                            } catch (e) {
                              Tr(
                                "SharedClientState",
                                "Failed to read sequence number from WebStorage",
                                e
                              );
                            }
                          return t;
                        })(s.newValue);
                        n !== qr.A && this.sequenceNumberHandler(n);
                      } else if (s.key === this.dr) {
                        const r = this.Cr(s.newValue);
                        await Promise.all(r.map((e) => this.syncEngine.Nr(e)));
                      }
                  } else this.ir.push(s);
                })
              : Tr(
                  "Received WebStorage notification for local change. Another client might have garbage-collected our state"
                ));
        }
        get Ir() {
          return this.sr.get(this.tr);
        }
        _r() {
          this.setItem(this.rr, this.Ir.Yi());
        }
        yr(e, t, n) {
          const r = new Ch(this.currentUser, e, t, n),
            s = xh(this.persistenceKey, this.currentUser, e);
          this.setItem(s, r.Yi());
        }
        pr(e) {
          var t = xh(this.persistenceKey, this.currentUser, e);
          this.removeItem(t);
        }
        Er(e) {
          var t = { clientId: this.tr, onlineState: e };
          this.storage.setItem(this.lr, JSON.stringify(t));
        }
        Tr(e, t, n) {
          const r = Nh(this.persistenceKey, e),
            s = new kh(e, t, n);
          this.setItem(r, s.Yi());
        }
        Ar(e) {
          var t = JSON.stringify(Array.from(e));
          this.setItem(this.dr, t);
        }
        Rr(e) {
          var t = this.ar.exec(e);
          return t ? t[1] : null;
        }
        Pr(e, t) {
          var n = this.Rr(e);
          return Rh.Ji(n, t);
        }
        Vr(e, t) {
          var n = this.cr.exec(e),
            r = Number(n[1]),
            n = void 0 !== n[2] ? n[2] : null;
          return Ch.Ji(new vr(n), r, t);
        }
        Sr(e, t) {
          var n = this.hr.exec(e),
            n = Number(n[1]);
          return kh.Ji(n, t);
        }
        wr(e) {
          return Mh.Ji(e);
        }
        Cr(e) {
          return JSON.parse(e);
        }
        async vr(e) {
          if (e.user.uid === this.currentUser.uid)
            return this.syncEngine.kr(e.batchId, e.state, e.error);
          Er(
            "SharedClientState",
            `Ignoring mutation for non-active user ${e.user.uid}`
          );
        }
        Dr(e) {
          return this.syncEngine.Mr(e.targetId, e.state, e.error);
        }
        br(e, t) {
          const n = t ? this.sr.insert(e, t) : this.sr.remove(e),
            r = this.gr(this.sr),
            s = this.gr(n),
            i = [],
            a = [];
          return (
            s.forEach((e) => {
              r.has(e) || i.push(e);
            }),
            r.forEach((e) => {
              s.has(e) || a.push(e);
            }),
            this.syncEngine.Or(i, a).then(() => {
              this.sr = n;
            })
          );
        }
        mr(e) {
          this.sr.get(e.clientId) && this.onlineStateHandler(e.onlineState);
        }
        gr(e) {
          let n = fa;
          return (
            e.forEach((e, t) => {
              n = n.unionWith(t.activeTargetIds);
            }),
            n
          );
        }
      }
      class Oh {
        constructor() {
          (this.Fr = new Lh()),
            (this.$r = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null);
        }
        addPendingMutation(e) {}
        updateMutationState(e, t, n) {}
        addLocalQueryTarget(e) {
          return this.Fr.Xi(e), this.$r[e] || "not-current";
        }
        updateQueryState(e, t, n) {
          this.$r[e] = t;
        }
        removeLocalQueryTarget(e) {
          this.Fr.Zi(e);
        }
        isLocalQueryTarget(e) {
          return this.Fr.activeTargetIds.has(e);
        }
        clearQueryState(e) {
          delete this.$r[e];
        }
        getAllActiveQueryTargets() {
          return this.Fr.activeTargetIds;
        }
        isActiveQueryTarget(e) {
          return this.Fr.activeTargetIds.has(e);
        }
        start() {
          return (this.Fr = new Lh()), Promise.resolve();
        }
        handleUserChange(e, t, n) {}
        setOnlineState(e) {}
        shutdown() {}
        writeSequenceNumber(e) {}
        notifyBundleLoaded(e) {}
      }
      class Ph {
        Br(e) {}
        shutdown() {}
      }
      class Fh {
        constructor() {
          (this.Lr = () => this.Ur()),
            (this.qr = () => this.Gr()),
            (this.Kr = []),
            this.Qr();
        }
        Br(e) {
          this.Kr.push(e);
        }
        shutdown() {
          window.removeEventListener("online", this.Lr),
            window.removeEventListener("offline", this.qr);
        }
        Qr() {
          window.addEventListener("online", this.Lr),
            window.addEventListener("offline", this.qr);
        }
        Ur() {
          Er("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
          for (const e of this.Kr) e(0);
        }
        Gr() {
          Er(
            "ConnectivityMonitor",
            "Network connectivity changed: UNAVAILABLE"
          );
          for (const e of this.Kr) e(1);
        }
        static vt() {
          return (
            "undefined" != typeof window &&
            void 0 !== window.addEventListener &&
            void 0 !== window.removeEventListener
          );
        }
      }
      const qh = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery",
      };
      class Uh {
        constructor(e) {
          (this.jr = e.jr), (this.Wr = e.Wr);
        }
        zr(e) {
          this.Hr = e;
        }
        Jr(e) {
          this.Yr = e;
        }
        onMessage(e) {
          this.Xr = e;
        }
        close() {
          this.Wr();
        }
        send(e) {
          this.jr(e);
        }
        Zr() {
          this.Hr();
        }
        eo(e) {
          this.Yr(e);
        }
        no(e) {
          this.Xr(e);
        }
      }
      class Bh extends class {
        constructor(e) {
          (this.databaseInfo = e), (this.databaseId = e.databaseId);
          var t = e.ssl ? "https" : "http";
          (this.so = t + "://" + e.host),
            (this.io =
              "projects/" +
              this.databaseId.projectId +
              "/databases/" +
              this.databaseId.database +
              "/documents");
        }
        ro(t, e, n, r, s) {
          const i = this.oo(t, e);
          Er("RestConnection", "Sending: ", i, n);
          var a = {};
          return (
            this.uo(a, r, s),
            this.ao(t, i, a, n).then(
              (e) => (Er("RestConnection", "Received: ", e), e),
              (e) => {
                throw (
                  (_r(
                    "RestConnection",
                    `${t} failed with error: `,
                    e,
                    "url: ",
                    i,
                    "request:",
                    n
                  ),
                  e)
                );
              }
            )
          );
        }
        co(e, t, n, r, s) {
          return this.ro(e, t, n, r, s);
        }
        uo(n, e, t) {
          (n["X-Goog-Api-Client"] = "gl-js/ fire/" + wr),
            (n["Content-Type"] = "text/plain"),
            this.databaseInfo.appId &&
              (n["X-Firebase-GMPID"] = this.databaseInfo.appId),
            e && e.headers.forEach((e, t) => (n[t] = e)),
            t && t.headers.forEach((e, t) => (n[t] = e));
        }
        oo(e, t) {
          var n = qh[e];
          return `${this.so}/v1/${t}:${n}`;
        }
      } {
        constructor(e) {
          super(e),
            (this.forceLongPolling = e.forceLongPolling),
            (this.autoDetectLongPolling = e.autoDetectLongPolling),
            (this.useFetchStreams = e.useFetchStreams);
        }
        ao(o, t, n, r) {
          return new Promise((s, i) => {
            const a = new pr();
            a.listenOnce(cr.COMPLETE, () => {
              try {
                switch (a.getLastErrorCode()) {
                  case hr.NO_ERROR:
                    var e = a.getResponseJson();
                    Er("Connection", "XHR received:", JSON.stringify(e)), s(e);
                    break;
                  case hr.TIMEOUT:
                    Er("Connection", 'RPC "' + o + '" timed out'),
                      i(new Nr(xr.DEADLINE_EXCEEDED, "Request time out"));
                    break;
                  case hr.HTTP_ERROR:
                    var t,
                      n = a.getStatus();
                    if (
                      (Er(
                        "Connection",
                        'RPC "' + o + '" failed with status:',
                        n,
                        "response text:",
                        a.getResponseText()
                      ),
                      0 < n)
                    ) {
                      const o = a.getResponseJson().error;
                      o && o.status && o.message
                        ? ((r = o.status.toLowerCase().replace(/_/g, "-")),
                          (t =
                            0 <= Object.values(xr).indexOf(r) ? r : xr.UNKNOWN),
                          i(new Nr(t, o.message)))
                        : i(
                            new Nr(
                              xr.UNKNOWN,
                              "Server responded with status " + a.getStatus()
                            )
                          );
                    } else i(new Nr(xr.UNAVAILABLE, "Connection failed."));
                    break;
                  default:
                    Ar();
                }
              } finally {
                Er("Connection", 'RPC "' + o + '" completed.');
              }
              var r;
            });
            var e = JSON.stringify(r);
            a.send(t, "POST", e, n, 15);
          });
        }
        ho(e, t, n) {
          const r = [
              this.so,
              "/",
              "google.firestore.v1.Firestore",
              "/",
              e,
              "/channel",
            ],
            s = new nr(),
            i = ur(),
            a = {
              httpSessionIdParam: "gsessionid",
              initMessageHeaders: {},
              messageUrlParams: {
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
              },
              sendRawJson: !0,
              supportsCrossDomainXhr: !0,
              internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
              forceLongPolling: this.forceLongPolling,
              detectBufferingProxy: this.autoDetectLongPolling,
            };
          this.useFetchStreams && (a.xmlHttpFactory = new gr({})),
            this.uo(a.initMessageHeaders, t, n),
            ("undefined" != typeof window &&
              (window.cordova || window.phonegap || window.PhoneGap) &&
              /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(f())) ||
              ("object" == typeof navigator &&
                "ReactNative" === navigator.product) ||
              0 <= f().indexOf("Electron/") ||
              (function () {
                const e = f();
                return 0 <= e.indexOf("MSIE ") || 0 <= e.indexOf("Trident/");
              })() ||
              0 <= f().indexOf("MSAppHost/") ||
              ("object" ==
                typeof (o =
                  "object" == typeof chrome
                    ? chrome.runtime
                    : "object" == typeof browser
                    ? browser.runtime
                    : void 0) &&
                void 0 !== o.id) ||
              (a.httpHeadersOverwriteParam = "$httpHeaders");
          var o = r.join("");
          Er("Connection", "Creating WebChannel: " + o, a);
          const u = s.createWebChannel(o, a);
          let h = !1,
            c = !1;
          const l = new Uh({
              jr: (e) => {
                c
                  ? Er(
                      "Connection",
                      "Not sending because WebChannel is closed:",
                      e
                    )
                  : (h ||
                      (Er("Connection", "Opening WebChannel transport."),
                      u.open(),
                      (h = !0)),
                    Er("Connection", "WebChannel sending:", e),
                    u.send(e));
              },
              Wr: () => u.close(),
            }),
            d = (e, t, n) => {
              e.listen(t, (e) => {
                try {
                  n(e);
                } catch (e) {
                  setTimeout(() => {
                    throw e;
                  }, 0);
                }
              });
            };
          return (
            d(u, mr.EventType.OPEN, () => {
              c || Er("Connection", "WebChannel transport opened.");
            }),
            d(u, mr.EventType.CLOSE, () => {
              c ||
                ((c = !0),
                Er("Connection", "WebChannel transport closed"),
                l.eo());
            }),
            d(u, mr.EventType.ERROR, (e) => {
              c ||
                ((c = !0),
                _r("Connection", "WebChannel transport errored:", e),
                l.eo(
                  new Nr(xr.UNAVAILABLE, "The operation could not be completed")
                ));
            }),
            d(u, mr.EventType.MESSAGE, (n) => {
              if (!c) {
                var e = n.data[0];
                Dr(!!e);
                var r =
                  e.error ||
                  (null === (r = e[0]) || void 0 === r ? void 0 : r.error);
                if (r) {
                  Er("Connection", "WebChannel received error:", r);
                  const n = r.status;
                  let e = (function (e) {
                      var t = or[e];
                      if (void 0 !== t) return Zi(t);
                    })(n),
                    t = r.message;
                  void 0 === e &&
                    ((e = xr.INTERNAL),
                    (t =
                      "Unknown error status: " +
                      n +
                      " with message " +
                      r.message)),
                    (c = !0),
                    l.eo(new Nr(e, t)),
                    u.close();
                } else Er("Connection", "WebChannel received:", e), l.no(e);
              }
            }),
            d(i, lr.STAT_EVENT, (e) => {
              e.stat === dr
                ? Er("Connection", "Detected buffering proxy")
                : e.stat === fr &&
                  Er("Connection", "Detected no buffering proxy");
            }),
            setTimeout(() => {
              l.Zr();
            }, 0),
            l
          );
        }
      }
      function Gh() {
        return "undefined" != typeof window ? window : null;
      }
      function jh() {
        return "undefined" != typeof document ? document : null;
      }
      function Kh(e) {
        return new Sa(e, !0);
      }
      class $h {
        constructor(e, t, n = 1e3, r = 1.5, s = 6e4) {
          (this.Jn = e),
            (this.timerId = t),
            (this.lo = n),
            (this.fo = r),
            (this._o = s),
            (this.wo = 0),
            (this.mo = null),
            (this.yo = Date.now()),
            this.reset();
        }
        reset() {
          this.wo = 0;
        }
        po() {
          this.wo = this._o;
        }
        Io(e) {
          this.cancel();
          var t = Math.floor(this.wo + this.To()),
            n = Math.max(0, Date.now() - this.yo),
            r = Math.max(0, t - n);
          0 < r &&
            Er(
              "ExponentialBackoff",
              `Backing off for ${r} ms (base delay: ${this.wo} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`
            ),
            (this.mo = this.Jn.enqueueAfterDelay(
              this.timerId,
              r,
              () => ((this.yo = Date.now()), e())
            )),
            (this.wo *= this.fo),
            this.wo < this.lo && (this.wo = this.lo),
            this.wo > this._o && (this.wo = this._o);
        }
        Eo() {
          null !== this.mo && (this.mo.skipDelay(), (this.mo = null));
        }
        cancel() {
          null !== this.mo && (this.mo.cancel(), (this.mo = null));
        }
        To() {
          return (Math.random() - 0.5) * this.wo;
        }
      }
      class zh {
        constructor(e, t, n, r, s, i, a, o) {
          (this.Jn = e),
            (this.Ao = n),
            (this.Ro = r),
            (this.bo = s),
            (this.authCredentialsProvider = i),
            (this.appCheckCredentialsProvider = a),
            (this.listener = o),
            (this.state = 0),
            (this.Po = 0),
            (this.Vo = null),
            (this.vo = null),
            (this.stream = null),
            (this.So = new $h(e, t));
        }
        Do() {
          return 1 === this.state || 5 === this.state || this.Co();
        }
        Co() {
          return 2 === this.state || 3 === this.state;
        }
        start() {
          4 !== this.state ? this.auth() : this.xo();
        }
        async stop() {
          this.Do() && (await this.close(0));
        }
        No() {
          (this.state = 0), this.So.reset();
        }
        ko() {
          this.Co() &&
            null === this.Vo &&
            (this.Vo = this.Jn.enqueueAfterDelay(this.Ao, 6e4, () =>
              this.Mo()
            ));
        }
        Oo(e) {
          this.Fo(), this.stream.send(e);
        }
        async Mo() {
          if (this.Co()) return this.close(0);
        }
        Fo() {
          this.Vo && (this.Vo.cancel(), (this.Vo = null));
        }
        $o() {
          this.vo && (this.vo.cancel(), (this.vo = null));
        }
        async close(e, t) {
          this.Fo(),
            this.$o(),
            this.So.cancel(),
            this.Po++,
            4 !== e
              ? this.So.reset()
              : t && t.code === xr.RESOURCE_EXHAUSTED
              ? (Tr(t.toString()),
                Tr(
                  "Using maximum backoff delay to prevent overloading the backend."
                ),
                this.So.po())
              : t &&
                t.code === xr.UNAUTHENTICATED &&
                3 !== this.state &&
                (this.authCredentialsProvider.invalidateToken(),
                this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
              (this.Bo(), this.stream.close(), (this.stream = null)),
            (this.state = e),
            await this.listener.Jr(t);
        }
        Bo() {}
        auth() {
          this.state = 1;
          const e = this.Lo(this.Po),
            n = this.Po;
          Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken(),
          ]).then(
            ([e, t]) => {
              this.Po === n && this.Uo(e, t);
            },
            (t) => {
              e(() => {
                var e = new Nr(
                  xr.UNKNOWN,
                  "Fetching auth token failed: " + t.message
                );
                return this.qo(e);
              });
            }
          );
        }
        Uo(e, t) {
          const n = this.Lo(this.Po);
          (this.stream = this.Go(e, t)),
            this.stream.zr(() => {
              n(
                () => (
                  (this.state = 2),
                  (this.vo = this.Jn.enqueueAfterDelay(
                    this.Ro,
                    1e4,
                    () => (this.Co() && (this.state = 3), Promise.resolve())
                  )),
                  this.listener.zr()
                )
              );
            }),
            this.stream.Jr((e) => {
              n(() => this.qo(e));
            }),
            this.stream.onMessage((e) => {
              n(() => this.onMessage(e));
            });
        }
        xo() {
          (this.state = 5),
            this.So.Io(async () => {
              (this.state = 0), this.start();
            });
        }
        qo(e) {
          return (
            Er("PersistentStream", `close with error: ${e}`),
            (this.stream = null),
            this.close(4, e)
          );
        }
        Lo(t) {
          return (e) => {
            this.Jn.enqueueAndForget(() =>
              this.Po === t
                ? e()
                : (Er(
                    "PersistentStream",
                    "stream callback skipped by getCloseGuardedDispatcher."
                  ),
                  Promise.resolve())
            );
          };
        }
      }
      class Wh extends zh {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "listen_stream_connection_backoff",
            "listen_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.M = s);
        }
        Go(e, t) {
          return this.bo.ho("Listen", e, t);
        }
        onMessage(e) {
          this.So.reset();
          var t = (function (e, t) {
              let n;
              if ("targetChange" in t) {
                t.targetChange;
                var r =
                    "NO_CHANGE" ===
                    (f = t.targetChange.targetChangeType || "NO_CHANGE")
                      ? 0
                      : "ADD" === f
                      ? 1
                      : "REMOVE" === f
                      ? 2
                      : "CURRENT" === f
                      ? 3
                      : "RESET" === f
                      ? 4
                      : Ar(),
                  s = t.targetChange.targetIds || [],
                  i =
                    ((f = t.targetChange.resumeToken),
                    e.N
                      ? (Dr(void 0 === f || "string" == typeof f),
                        es.fromBase64String(f || ""))
                      : (Dr(void 0 === f || f instanceof Uint8Array),
                        es.fromUint8Array(f || new Uint8Array()))),
                  a = t.targetChange.cause,
                  o =
                    a &&
                    ((o = void 0 === (f = a).code ? xr.UNKNOWN : Zi(f.code)),
                    new Nr(o, f.message || ""));
                n = new va(r, s, i, o || null);
              } else if ("documentChange" in t) {
                t.documentChange;
                var u = t.documentChange;
                u.document, u.document.name, u.document.updateTime;
                var o = Ra(e, u.document.name),
                  h = xa(u.document.updateTime),
                  c = new ks({ mapValue: { fields: u.document.fields } }),
                  h = Rs.newFoundDocument(o, h, c),
                  c = u.targetIds || [],
                  u = u.removedTargetIds || [];
                n = new pa(c, u, h.key, h);
              } else if ("documentDelete" in t) {
                t.documentDelete;
                c = t.documentDelete;
                c.document;
                (u = Ra(e, c.document)),
                  (h = c.readTime ? xa(c.readTime) : $r.min()),
                  (h = Rs.newNoDocument(u, h)),
                  (c = c.removedTargetIds || []);
                n = new pa([], c, h.key, h);
              } else if ("documentRemove" in t) {
                t.documentRemove;
                var l = t.documentRemove;
                l.document;
                var d = Ra(e, l.document),
                  l = l.removedTargetIds || [];
                n = new pa([], l, d, null);
              } else {
                if (!("filter" in t)) return Ar();
                {
                  t.filter;
                  const e = t.filter;
                  e.targetId;
                  (l = e.count || 0), (d = new Xi(l)), (l = e.targetId);
                  n = new ya(l, d);
                }
              }
              var o, f;
              return n;
            })(this.M, e),
            n = (function (e) {
              if (!("targetChange" in e)) return $r.min();
              var t = e.targetChange;
              return (!t.targetIds || !t.targetIds.length) && t.readTime
                ? xa(t.readTime)
                : $r.min();
            })(e);
          return this.listener.Ko(t, n);
        }
        Qo(e) {
          const t = {};
          (t.database = Va(this.M)),
            (t.addTarget = (function (e, t) {
              let n;
              var r = t.target;
              return (
                (n = Ks(r) ? { documents: Ba(e, r) } : { query: Ga(e, r) }),
                (n.targetId = t.targetId),
                0 < t.resumeToken.approximateByteSize()
                  ? (n.resumeToken = Da(e, t.resumeToken))
                  : 0 < t.snapshotVersion.compareTo($r.min()) &&
                    (n.readTime = Aa(e, t.snapshotVersion.toTimestamp())),
                n
              );
            })(this.M, e));
          var n,
            r,
            r =
              (this.M,
              (n = e),
              null ==
              (r = (function () {
                switch (n.purpose) {
                  case 0:
                    return null;
                  case 1:
                    return "existence-filter-mismatch";
                  case 2:
                    return "limbo-document";
                  default:
                    return Ar();
                }
              })())
                ? null
                : { "goog-listen-tags": r });
          r && (t.labels = r), this.Oo(t);
        }
        jo(e) {
          const t = {};
          (t.database = Va(this.M)), (t.removeTarget = e), this.Oo(t);
        }
      }
      class Hh extends zh {
        constructor(e, t, n, r, s, i) {
          super(
            e,
            "write_stream_connection_backoff",
            "write_stream_idle",
            "health_check_timeout",
            t,
            n,
            r,
            i
          ),
            (this.M = s),
            (this.Wo = !1);
        }
        get zo() {
          return this.Wo;
        }
        start() {
          (this.Wo = !1), (this.lastStreamToken = void 0), super.start();
        }
        Bo() {
          this.Wo && this.Ho([]);
        }
        Go(e, t) {
          return this.bo.ho("Write", e, t);
        }
        onMessage(e) {
          if (
            (Dr(!!e.streamToken),
            (this.lastStreamToken = e.streamToken),
            this.Wo)
          ) {
            this.So.reset();
            var t =
                ((r = e.writeResults),
                (s = e.commitTime),
                r && 0 < r.length
                  ? (Dr(void 0 !== s),
                    r.map((e) =>
                      (function (e, t) {
                        let n = e.updateTime ? xa(e.updateTime) : xa(t);
                        return (
                          n.isEqual($r.min()) && (n = xa(t)),
                          new Oi(n, e.transformResults || [])
                        );
                      })(e, s)
                    ))
                  : []),
              n = xa(e.commitTime);
            return this.listener.Jo(n, t);
          }
          var r, s;
          return (
            Dr(!e.writeResults || 0 === e.writeResults.length),
            (this.Wo = !0),
            this.listener.Yo()
          );
        }
        Xo() {
          const e = {};
          (e.database = Va(this.M)), this.Oo(e);
        }
        Ho(e) {
          var t = {
            streamToken: this.lastStreamToken,
            writes: e.map((e) => qa(this.M, e)),
          };
          this.Oo(t);
        }
      }
      class Qh extends class {} {
        constructor(e, t, n, r) {
          super(),
            (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.bo = n),
            (this.M = r),
            (this.Zo = !1);
        }
        tu() {
          if (this.Zo)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        ro(n, r, s) {
          return (
            this.tu(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.bo.ro(n, r, s, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === xr.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new Nr(xr.UNKNOWN, e.toString());
              })
          );
        }
        co(n, r, s) {
          return (
            this.tu(),
            Promise.all([
              this.authCredentials.getToken(),
              this.appCheckCredentials.getToken(),
            ])
              .then(([e, t]) => this.bo.co(n, r, s, e, t))
              .catch((e) => {
                throw "FirebaseError" === e.name
                  ? (e.code === xr.UNAUTHENTICATED &&
                      (this.authCredentials.invalidateToken(),
                      this.appCheckCredentials.invalidateToken()),
                    e)
                  : new Nr(xr.UNKNOWN, e.toString());
              })
          );
        }
        terminate() {
          this.Zo = !0;
        }
      }
      class Yh {
        constructor(e, t) {
          (this.asyncQueue = e),
            (this.onlineStateHandler = t),
            (this.state = "Unknown"),
            (this.eu = 0),
            (this.nu = null),
            (this.su = !0);
        }
        iu() {
          0 === this.eu &&
            (this.ru("Unknown"),
            (this.nu = this.asyncQueue.enqueueAfterDelay(
              "online_state_timeout",
              1e4,
              () => (
                (this.nu = null),
                this.ou("Backend didn't respond within 10 seconds."),
                this.ru("Offline"),
                Promise.resolve()
              )
            )));
        }
        uu(e) {
          "Online" === this.state
            ? this.ru("Unknown")
            : (this.eu++,
              1 <= this.eu &&
                (this.au(),
                this.ou(
                  `Connection failed 1 times. Most recent error: ${e.toString()}`
                ),
                this.ru("Offline")));
        }
        set(e) {
          this.au(),
            (this.eu = 0),
            "Online" === e && (this.su = !1),
            this.ru(e);
        }
        ru(e) {
          e !== this.state && ((this.state = e), this.onlineStateHandler(e));
        }
        ou(e) {
          var t = `Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
          this.su ? (Tr(t), (this.su = !1)) : Er("OnlineStateTracker", t);
        }
        au() {
          null !== this.nu && (this.nu.cancel(), (this.nu = null));
        }
      }
      class Xh {
        constructor(e, t, n, r, s) {
          (this.localStore = e),
            (this.datastore = t),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.cu = []),
            (this.hu = new Map()),
            (this.lu = new Set()),
            (this.fu = []),
            (this.du = s),
            this.du.Br((e) => {
              n.enqueueAndForget(async () => {
                ac(this) &&
                  (Er(
                    "RemoteStore",
                    "Restarting streams for network reachability change."
                  ),
                  await (async function (e) {
                    const t = e;
                    t.lu.add(4),
                      await Zh(t),
                      t._u.set("Unknown"),
                      t.lu.delete(4),
                      await Jh(t);
                  })(this));
              });
            }),
            (this._u = new Yh(n, r));
        }
      }
      async function Jh(e) {
        if (ac(e)) for (const t of e.fu) await t(!0);
      }
      async function Zh(e) {
        for (const t of e.fu) await t(!1);
      }
      function ec(e, t) {
        const n = e;
        n.hu.has(t.targetId) ||
          (n.hu.set(t.targetId, t), ic(n) ? sc(n) : mc(n).Co() && nc(n, t));
      }
      function tc(e, t) {
        const n = e,
          r = mc(n);
        n.hu.delete(t),
          r.Co() && rc(n, t),
          0 === n.hu.size && (r.Co() ? r.ko() : ac(n) && n._u.set("Unknown"));
      }
      function nc(e, t) {
        e.wu.Z(t.targetId), mc(e).Qo(t);
      }
      function rc(e, t) {
        e.wu.Z(t), mc(e).jo(t);
      }
      function sc(t) {
        (t.wu = new ba({
          getRemoteKeysForTarget: (e) =>
            t.remoteSyncer.getRemoteKeysForTarget(e),
          Et: (e) => t.hu.get(e) || null,
        })),
          mc(t).start(),
          t._u.iu();
      }
      function ic(e) {
        return ac(e) && !mc(e).Do() && 0 < e.hu.size;
      }
      function ac(e) {
        return 0 === e.lu.size;
      }
      function oc(e) {
        e.wu = void 0;
      }
      async function uc(e, t, n) {
        if (!xo(t)) throw t;
        e.lu.add(1),
          await Zh(e),
          e._u.set("Offline"),
          (n = n || (() => oh(e.localStore))),
          e.asyncQueue.enqueueRetryable(async () => {
            Er("RemoteStore", "Retrying IndexedDB access"),
              await n(),
              e.lu.delete(1),
              await Jh(e);
          });
      }
      function hc(t, n) {
        return n().catch((e) => uc(t, e, n));
      }
      async function cc(e) {
        const t = e,
          n = pc(t);
        let r = 0 < t.cu.length ? t.cu[t.cu.length - 1].batchId : -1;
        for (; ac((s = t)) && s.cu.length < 10; )
          try {
            const e = await (function (e, t) {
              const n = e;
              return n.persistence.runTransaction(
                "Get next mutation batch",
                "readonly",
                (e) => (
                  void 0 === t && (t = -1),
                  n.$s.getNextMutationBatchAfterBatchId(e, t)
                )
              );
            })(t.localStore, r);
            if (null === e) {
              0 === t.cu.length && n.ko();
              break;
            }
            (r = e.batchId),
              (function (e, t) {
                e.cu.push(t);
                const n = pc(e);
                n.Co() && n.zo && n.Ho(t.mutations);
              })(t, e);
          } catch (e) {
            await uc(t, e);
          }
        var s;
        lc(t) && dc(t);
      }
      function lc(e) {
        return ac(e) && !pc(e).Do() && 0 < e.cu.length;
      }
      function dc(e) {
        pc(e).start();
      }
      async function fc(e, t) {
        const n = e;
        n.asyncQueue.verifyOperationInProgress(),
          Er("RemoteStore", "RemoteStore received new credentials");
        var r = ac(n);
        n.lu.add(3),
          await Zh(n),
          r && n._u.set("Unknown"),
          await n.remoteSyncer.handleCredentialChange(t),
          n.lu.delete(3),
          await Jh(n);
      }
      async function gc(e, t) {
        const n = e;
        t
          ? (n.lu.delete(2), await Jh(n))
          : (n.lu.add(2), await Zh(n), n._u.set("Unknown"));
      }
      function mc(t) {
        return (
          t.mu ||
            ((t.mu = (function (e, t, n) {
              const r = e;
              return (
                r.tu(),
                new Wh(
                  t,
                  r.bo,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.M,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              zr: async function (n) {
                n.hu.forEach((e, t) => {
                  nc(n, e);
                });
              }.bind(null, t),
              Jr: async function (e, t) {
                oc(e), ic(e) ? (e._u.uu(t), sc(e)) : e._u.set("Unknown");
              }.bind(null, t),
              Ko: async function (e, r, t) {
                if (
                  (e._u.set("Online"),
                  r instanceof va && 2 === r.state && r.cause)
                )
                  try {
                    await (async function (e) {
                      var t = r.cause;
                      for (const n of r.targetIds)
                        e.hu.has(n) &&
                          (await e.remoteSyncer.rejectListen(n, t),
                          e.hu.delete(n),
                          e.wu.removeTarget(n));
                    })(e);
                  } catch (t) {
                    Er(
                      "RemoteStore",
                      "Failed to remove targets %s: %s ",
                      r.targetIds.join(","),
                      t
                    ),
                      await uc(e, t);
                  }
                else if (
                  (r instanceof pa
                    ? e.wu.ut(r)
                    : r instanceof ya
                    ? e.wu._t(r)
                    : e.wu.ht(r),
                  !t.isEqual($r.min()))
                )
                  try {
                    const r = await oh(e.localStore);
                    0 <= t.compareTo(r) &&
                      (await (function (r, s) {
                        const e = r.wu.yt(s);
                        return (
                          e.targetChanges.forEach((e, t) => {
                            if (0 < e.resumeToken.approximateByteSize()) {
                              const n = r.hu.get(t);
                              n &&
                                r.hu.set(
                                  t,
                                  n.withResumeToken(e.resumeToken, s)
                                );
                            }
                          }),
                          e.targetMismatches.forEach((e) => {
                            const t = r.hu.get(e);
                            var n;
                            t &&
                              (r.hu.set(
                                e,
                                t.withResumeToken(
                                  es.EMPTY_BYTE_STRING,
                                  t.snapshotVersion
                                )
                              ),
                              rc(r, e),
                              (n = new Fo(t.target, e, 1, t.sequenceNumber)),
                              nc(r, n));
                          }),
                          r.remoteSyncer.applyRemoteEvent(e)
                        );
                      })(e, t));
                  } catch (r) {
                    Er("RemoteStore", "Failed to raise snapshot:", r),
                      await uc(e, r);
                  }
              }.bind(null, t),
            })),
            t.fu.push(async (e) => {
              e
                ? (t.mu.No(), ic(t) ? sc(t) : t._u.set("Unknown"))
                : (await t.mu.stop(), oc(t));
            })),
          t.mu
        );
      }
      function pc(t) {
        return (
          t.gu ||
            ((t.gu = (function (e, t, n) {
              const r = e;
              return (
                r.tu(),
                new Hh(
                  t,
                  r.bo,
                  r.authCredentials,
                  r.appCheckCredentials,
                  r.M,
                  n
                )
              );
            })(t.datastore, t.asyncQueue, {
              zr: async function (e) {
                pc(e).Xo();
              }.bind(null, t),
              Jr: async function (e, t) {
                t &&
                  pc(e).zo &&
                  (await (async function (e, t) {
                    if (Ji((n = t.code)) && n !== xr.ABORTED) {
                      const n = e.cu.shift();
                      pc(e).No(),
                        await hc(e, () =>
                          e.remoteSyncer.rejectFailedWrite(n.batchId, t)
                        ),
                        await cc(e);
                    }
                    var n;
                  })(e, t)),
                  lc(e) && dc(e);
              }.bind(null, t),
              Yo: async function (e) {
                const t = pc(e);
                for (const n of e.cu) t.Ho(n.mutations);
              }.bind(null, t),
              Jo: async function (e, t, n) {
                const r = e.cu.shift(),
                  s = Oo.from(r, t, n);
                await hc(e, () => e.remoteSyncer.applySuccessfulWrite(s)),
                  await cc(e);
              }.bind(null, t),
            })),
            t.fu.push(async (e) => {
              e
                ? (t.gu.No(), await cc(t))
                : (await t.gu.stop(),
                  0 < t.cu.length &&
                    (Er(
                      "RemoteStore",
                      `Stopping write stream with ${t.cu.length} pending writes`
                    ),
                    (t.cu = [])));
            })),
          t.gu
        );
      }
      class yc {
        constructor(e, t, n, r, s) {
          (this.asyncQueue = e),
            (this.timerId = t),
            (this.targetTimeMs = n),
            (this.op = r),
            (this.removalCallback = s),
            (this.deferred = new Cr()),
            (this.then = this.deferred.promise.then.bind(
              this.deferred.promise
            )),
            this.deferred.promise.catch((e) => {});
        }
        static createAndSchedule(e, t, n, r, s) {
          const i = Date.now() + n,
            a = new yc(e, t, i, r, s);
          return a.start(n), a;
        }
        start(e) {
          this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
        }
        skipDelay() {
          return this.handleDelayElapsed();
        }
        cancel(e) {
          null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
              new Nr(xr.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))
            ));
        }
        handleDelayElapsed() {
          this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
              ? (this.clearTimeout(),
                this.op().then((e) => this.deferred.resolve(e)))
              : Promise.resolve()
          );
        }
        clearTimeout() {
          null !== this.timerHandle &&
            (this.removalCallback(this),
            clearTimeout(this.timerHandle),
            (this.timerHandle = null));
        }
      }
      function vc(e, t) {
        if ((Tr("AsyncQueue", `${t}: ${e}`), xo(e)))
          return new Nr(xr.UNAVAILABLE, `${t}: ${e}`);
        throw e;
      }
      class wc {
        constructor(n) {
          (this.comparator = n
            ? (e, t) => n(e, t) || ds.comparator(e.key, t.key)
            : (e, t) => ds.comparator(e.key, t.key)),
            (this.keyedMap = ua),
            (this.sortedSet = new ta(this.comparator));
        }
        static emptySet(e) {
          return new wc(e.comparator);
        }
        has(e) {
          return null != this.keyedMap.get(e);
        }
        get(e) {
          return this.keyedMap.get(e);
        }
        first() {
          return this.sortedSet.minKey();
        }
        last() {
          return this.sortedSet.maxKey();
        }
        isEmpty() {
          return this.sortedSet.isEmpty();
        }
        indexOf(e) {
          var t = this.keyedMap.get(e);
          return t ? this.sortedSet.indexOf(t) : -1;
        }
        get size() {
          return this.sortedSet.size;
        }
        forEach(n) {
          this.sortedSet.inorderTraversal((e, t) => (n(e), !1));
        }
        add(e) {
          const t = this.delete(e.key);
          return t.copy(
            t.keyedMap.insert(e.key, e),
            t.sortedSet.insert(e, null)
          );
        }
        delete(e) {
          var t = this.get(e);
          return t
            ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
            : this;
        }
        isEqual(e) {
          if (!(e instanceof wc)) return !1;
          if (this.size !== e.size) return !1;
          const t = this.sortedSet.getIterator(),
            n = e.sortedSet.getIterator();
          for (; t.hasNext(); ) {
            const e = t.getNext().key,
              r = n.getNext().key;
            if (!e.isEqual(r)) return !1;
          }
          return !0;
        }
        toString() {
          const t = [];
          return (
            this.forEach((e) => {
              t.push(e.toString());
            }),
            0 === t.length
              ? "DocumentSet ()"
              : "DocumentSet (\n  " + t.join("  \n") + "\n)"
          );
        }
        copy(e, t) {
          const n = new wc();
          return (
            (n.comparator = this.comparator),
            (n.keyedMap = e),
            (n.sortedSet = t),
            n
          );
        }
      }
      class bc {
        constructor() {
          this.yu = new ta(ds.comparator);
        }
        track(e) {
          var t = e.doc.key,
            n = this.yu.get(t);
          !n || (0 !== e.type && 3 === n.type)
            ? (this.yu = this.yu.insert(t, e))
            : 3 === e.type && 1 !== n.type
            ? (this.yu = this.yu.insert(t, { type: n.type, doc: e.doc }))
            : 2 === e.type && 2 === n.type
            ? (this.yu = this.yu.insert(t, { type: 2, doc: e.doc }))
            : 2 === e.type && 0 === n.type
            ? (this.yu = this.yu.insert(t, { type: 0, doc: e.doc }))
            : 1 === e.type && 0 === n.type
            ? (this.yu = this.yu.remove(t))
            : 1 === e.type && 2 === n.type
            ? (this.yu = this.yu.insert(t, { type: 1, doc: n.doc }))
            : 0 === e.type && 1 === n.type
            ? (this.yu = this.yu.insert(t, { type: 2, doc: e.doc }))
            : Ar();
        }
        pu() {
          const n = [];
          return (
            this.yu.inorderTraversal((e, t) => {
              n.push(t);
            }),
            n
          );
        }
      }
      class Ic {
        constructor(e, t, n, r, s, i, a, o) {
          (this.query = e),
            (this.docs = t),
            (this.oldDocs = n),
            (this.docChanges = r),
            (this.mutatedKeys = s),
            (this.fromCache = i),
            (this.syncStateChanged = a),
            (this.excludesMetadataChanges = o);
        }
        static fromInitialDocuments(e, t, n, r) {
          const s = [];
          return (
            t.forEach((e) => {
              s.push({ type: 0, doc: e });
            }),
            new Ic(e, t, wc.emptySet(t), s, n, r, !0, !1)
          );
        }
        get hasPendingWrites() {
          return !this.mutatedKeys.isEmpty();
        }
        isEqual(e) {
          if (
            !(
              this.fromCache === e.fromCache &&
              this.syncStateChanged === e.syncStateChanged &&
              this.mutatedKeys.isEqual(e.mutatedKeys) &&
              pi(this.query, e.query) &&
              this.docs.isEqual(e.docs) &&
              this.oldDocs.isEqual(e.oldDocs)
            )
          )
            return !1;
          const t = this.docChanges,
            n = e.docChanges;
          if (t.length !== n.length) return !1;
          for (let r = 0; r < t.length; r++)
            if (t[r].type !== n[r].type || !t[r].doc.isEqual(n[r].doc))
              return !1;
          return !0;
        }
      }
      class Ec {
        constructor() {
          (this.Iu = void 0), (this.listeners = []);
        }
      }
      class Tc {
        constructor() {
          (this.queries = new ea((e) => yi(e), pi)),
            (this.onlineState = "Unknown"),
            (this.Tu = new Set());
        }
      }
      async function _c(e, t) {
        const n = e,
          r = t.query;
        let s = !1,
          i = n.queries.get(r);
        if ((i || ((s = !0), (i = new Ec())), s))
          try {
            i.Iu = await n.onListen(r);
          } catch (e) {
            const n = vc(e, `Initialization of query '${vi(t.query)}' failed`);
            return void t.onError(n);
          }
        n.queries.set(r, i),
          i.listeners.push(t),
          t.Eu(n.onlineState),
          !i.Iu || (t.Au(i.Iu) && Ac(n));
      }
      async function Sc(e, t) {
        const n = e,
          r = t.query;
        let s = !1;
        const i = n.queries.get(r);
        if (i) {
          const e = i.listeners.indexOf(t);
          0 <= e && (i.listeners.splice(e, 1), (s = 0 === i.listeners.length));
        }
        if (s) return n.queries.delete(r), n.onUnlisten(r);
      }
      function Ac(e) {
        e.Tu.forEach((e) => {
          e.next();
        });
      }
      class Dc {
        constructor(e, t, n) {
          (this.query = e),
            (this.Ru = t),
            (this.bu = !1),
            (this.Pu = null),
            (this.onlineState = "Unknown"),
            (this.options = n || {});
        }
        Au(e) {
          if (!this.options.includeMetadataChanges) {
            const t = [];
            for (const n of e.docChanges) 3 !== n.type && t.push(n);
            e = new Ic(
              e.query,
              e.docs,
              e.oldDocs,
              t,
              e.mutatedKeys,
              e.fromCache,
              e.syncStateChanged,
              !0
            );
          }
          let t = !1;
          return (
            this.bu
              ? this.Vu(e) && (this.Ru.next(e), (t = !0))
              : this.vu(e, this.onlineState) && (this.Su(e), (t = !0)),
            (this.Pu = e),
            t
          );
        }
        onError(e) {
          this.Ru.error(e);
        }
        Eu(e) {
          this.onlineState = e;
          let t = !1;
          return (
            this.Pu &&
              !this.bu &&
              this.vu(this.Pu, e) &&
              (this.Su(this.Pu), (t = !0)),
            t
          );
        }
        vu(e, t) {
          return (
            !e.fromCache ||
            !(
              (this.options.Du && "Offline" !== t) ||
              (e.docs.isEmpty() && "Offline" !== t)
            )
          );
        }
        Vu(e) {
          if (0 < e.docChanges.length) return !0;
          var t = this.Pu && this.Pu.hasPendingWrites !== e.hasPendingWrites;
          return (
            !(!e.syncStateChanged && !t) &&
            !0 === this.options.includeMetadataChanges
          );
        }
        Su(e) {
          (e = Ic.fromInitialDocuments(
            e.query,
            e.docs,
            e.mutatedKeys,
            e.fromCache
          )),
            (this.bu = !0),
            this.Ru.next(e);
        }
      }
      class xc {
        constructor(e, t) {
          (this.payload = e), (this.byteLength = t);
        }
        Cu() {
          return "metadata" in this.payload;
        }
      }
      class Nc {
        constructor(e) {
          this.M = e;
        }
        li(e) {
          return Ra(this.M, e);
        }
        fi(e) {
          return e.metadata.exists
            ? Fa(this.M, e.document, !1)
            : Rs.newNoDocument(
                this.li(e.metadata.name),
                this.di(e.metadata.readTime)
              );
        }
        di(e) {
          return xa(e);
        }
      }
      class Cc {
        constructor(e, t, n) {
          (this.xu = e),
            (this.localStore = t),
            (this.M = n),
            (this.queries = []),
            (this.documents = []),
            (this.collectionGroups = new Set()),
            (this.progress = kc(e));
        }
        Nu(e) {
          this.progress.bytesLoaded += e.byteLength;
          let t = this.progress.documentsLoaded;
          if (e.payload.namedQuery) this.queries.push(e.payload.namedQuery);
          else if (e.payload.documentMetadata) {
            this.documents.push({ metadata: e.payload.documentMetadata }),
              e.payload.documentMetadata.exists || ++t;
            const n = Yr.fromString(e.payload.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
          } else
            e.payload.document &&
              ((this.documents[this.documents.length - 1].document =
                e.payload.document),
              ++t);
          return t !== this.progress.documentsLoaded
            ? ((this.progress.documentsLoaded = t),
              Object.assign({}, this.progress))
            : null;
        }
        ku(e) {
          const t = new Map(),
            n = new Nc(this.M);
          for (const s of e)
            if (s.metadata.queries) {
              const e = n.li(s.metadata.name);
              for (const n of s.metadata.queries) {
                var r = (t.get(n) || da()).add(e);
                t.set(n, r);
              }
            }
          return t;
        }
        async complete() {
          const e = await (async function (e, t, n, r) {
              const s = e;
              let i = da(),
                a = oa;
              for (const e of n) {
                const n = t.li(e.metadata.name);
                e.document && (i = i.add(n));
                const h = t.fi(e);
                h.setReadTime(t.di(e.metadata.readTime)), (a = a.insert(n, h));
              }
              const o = s.oi.newChangeBuffer({ trackRemovals: !0 }),
                u = await ch(
                  s,
                  ((r = r), gi(oi(Yr.fromString(`__bundle__/docs/${r}`))))
                );
              return s.persistence.runTransaction(
                "Apply bundle documents",
                "readwrite",
                (t) =>
                  hh(t, o, a)
                    .next((e) => (o.apply(t), e))
                    .next((e) =>
                      s.ls
                        .removeMatchingKeysForTargetId(t, u.targetId)
                        .next(() => s.ls.addMatchingKeys(t, i, u.targetId))
                        .next(() => s.ai.Gs(t, e))
                        .next(() => e)
                    )
              );
            })(this.localStore, new Nc(this.M), this.documents, this.xu.id),
            t = this.ku(this.documents);
          for (const e of this.queries)
            await (async function (e, n, r = da()) {
              const s = await ch(e, gi(Wo(n.bundledQuery))),
                i = e;
              return i.persistence.runTransaction(
                "Save named query",
                "readwrite",
                (e) => {
                  var t = xa(n.readTime);
                  if (0 <= s.snapshotVersion.compareTo(t))
                    return i.ds.saveNamedQuery(e, n);
                  t = s.withResumeToken(es.EMPTY_BYTE_STRING, t);
                  return (
                    (i.si = i.si.insert(t.targetId, t)),
                    i.ls
                      .updateTargetData(e, t)
                      .next(() =>
                        i.ls.removeMatchingKeysForTargetId(e, s.targetId)
                      )
                      .next(() => i.ls.addMatchingKeys(e, r, s.targetId))
                      .next(() => i.ds.saveNamedQuery(e, n))
                  );
                }
              );
            })(this.localStore, e, t.get(e.name));
          return (
            (this.progress.taskState = "Success"),
            { progress: this.progress, Mu: this.collectionGroups, Ou: e }
          );
        }
      }
      function kc(e) {
        return {
          taskState: "Running",
          documentsLoaded: 0,
          bytesLoaded: 0,
          totalDocuments: e.totalDocuments,
          totalBytes: e.totalBytes,
        };
      }
      class Rc {
        constructor(e) {
          this.key = e;
        }
      }
      class Mc {
        constructor(e) {
          this.key = e;
        }
      }
      class Lc {
        constructor(e, t) {
          (this.query = e),
            (this.Fu = t),
            (this.$u = null),
            (this.current = !1),
            (this.Bu = da()),
            (this.mutatedKeys = da()),
            (this.Lu = Ii(e)),
            (this.Uu = new wc(this.Lu));
        }
        get qu() {
          return this.Fu;
        }
        Gu(e, t) {
          const o = t ? t.Ku : new bc(),
            u = (t || this).Uu;
          let h = (t || this).mutatedKeys,
            c = u,
            l = !1;
          const d =
              ui(this.query) && u.size === this.query.limit ? u.last() : null,
            f =
              hi(this.query) && u.size === this.query.limit ? u.first() : null;
          if (
            (e.inorderTraversal((e, t) => {
              const n = u.get(e),
                r = wi(this.query, t) ? t : null,
                s = !!n && this.mutatedKeys.has(n.key),
                i =
                  !!r &&
                  (r.hasLocalMutations ||
                    (this.mutatedKeys.has(r.key) && r.hasCommittedMutations));
              let a = !1;
              n && r
                ? n.data.isEqual(r.data)
                  ? s !== i && (o.track({ type: 3, doc: r }), (a = !0))
                  : this.Qu(n, r) ||
                    (o.track({ type: 2, doc: r }),
                    (a = !0),
                    ((d && 0 < this.Lu(r, d)) || (f && this.Lu(r, f) < 0)) &&
                      (l = !0))
                : !n && r
                ? (o.track({ type: 0, doc: r }), (a = !0))
                : n &&
                  !r &&
                  (o.track({ type: 1, doc: n }),
                  (a = !0),
                  (d || f) && (l = !0)),
                a &&
                  (h = r
                    ? ((c = c.add(r)), i ? h.add(e) : h.delete(e))
                    : ((c = c.delete(e)), h.delete(e)));
            }),
            ui(this.query) || hi(this.query))
          )
            for (; c.size > this.query.limit; ) {
              const e = ui(this.query) ? c.last() : c.first();
              (c = c.delete(e.key)),
                (h = h.delete(e.key)),
                o.track({ type: 1, doc: e });
            }
          return { Uu: c, Ku: o, ei: l, mutatedKeys: h };
        }
        Qu(e, t) {
          return (
            e.hasLocalMutations &&
            t.hasCommittedMutations &&
            !t.hasLocalMutations
          );
        }
        applyChanges(e, t, n) {
          var r = this.Uu;
          (this.Uu = e.Uu), (this.mutatedKeys = e.mutatedKeys);
          const s = e.Ku.pu();
          s.sort(
            (e, t) =>
              (function (e, t) {
                var n = (e) => {
                  switch (e) {
                    case 0:
                      return 1;
                    case 2:
                    case 3:
                      return 2;
                    case 1:
                      return 0;
                    default:
                      return Ar();
                  }
                };
                return n(e) - n(t);
              })(e.type, t.type) || this.Lu(e.doc, t.doc)
          ),
            this.ju(n);
          var i = t ? this.Wu() : [],
            a = 0 === this.Bu.size && this.current ? 1 : 0,
            o = a !== this.$u;
          return (
            (this.$u = a),
            0 !== s.length || o
              ? {
                  snapshot: new Ic(
                    this.query,
                    e.Uu,
                    r,
                    s,
                    e.mutatedKeys,
                    0 == a,
                    o,
                    !1
                  ),
                  zu: i,
                }
              : { zu: i }
          );
        }
        Eu(e) {
          return this.current && "Offline" === e
            ? ((this.current = !1),
              this.applyChanges(
                {
                  Uu: this.Uu,
                  Ku: new bc(),
                  mutatedKeys: this.mutatedKeys,
                  ei: !1,
                },
                !1
              ))
            : { zu: [] };
        }
        Hu(e) {
          return (
            !this.Fu.has(e) &&
            !!this.Uu.has(e) &&
            !this.Uu.get(e).hasLocalMutations
          );
        }
        ju(e) {
          e &&
            (e.addedDocuments.forEach((e) => (this.Fu = this.Fu.add(e))),
            e.modifiedDocuments.forEach((e) => {}),
            e.removedDocuments.forEach((e) => (this.Fu = this.Fu.delete(e))),
            (this.current = e.current));
        }
        Wu() {
          if (!this.current) return [];
          const t = this.Bu;
          (this.Bu = da()),
            this.Uu.forEach((e) => {
              this.Hu(e.key) && (this.Bu = this.Bu.add(e.key));
            });
          const n = [];
          return (
            t.forEach((e) => {
              this.Bu.has(e) || n.push(new Mc(e));
            }),
            this.Bu.forEach((e) => {
              t.has(e) || n.push(new Rc(e));
            }),
            n
          );
        }
        Ju(e) {
          (this.Fu = e.hi), (this.Bu = da());
          var t = this.Gu(e.documents);
          return this.applyChanges(t, !0);
        }
        Yu() {
          return Ic.fromInitialDocuments(
            this.query,
            this.Uu,
            this.mutatedKeys,
            0 === this.$u
          );
        }
      }
      class Vc {
        constructor(e, t, n) {
          (this.query = e), (this.targetId = t), (this.view = n);
        }
      }
      class Oc {
        constructor(e) {
          (this.key = e), (this.Xu = !1);
        }
      }
      class Pc {
        constructor(e, t, n, r, s, i) {
          (this.localStore = e),
            (this.remoteStore = t),
            (this.eventManager = n),
            (this.sharedClientState = r),
            (this.currentUser = s),
            (this.maxConcurrentLimboResolutions = i),
            (this.Zu = {}),
            (this.ta = new ea((e) => yi(e), pi)),
            (this.ea = new Map()),
            (this.na = new Set()),
            (this.sa = new ta(ds.comparator)),
            (this.ia = new Map()),
            (this.ra = new vh()),
            (this.oa = {}),
            (this.ua = new Map()),
            (this.aa = xu.gn()),
            (this.onlineState = "Unknown"),
            (this.ca = void 0);
        }
        get isPrimaryClient() {
          return !0 === this.ca;
        }
      }
      async function Fc(n, e, t, r) {
        n.ha = (e, i, t) =>
          (async function (e, t, n) {
            let r = t.view.Gu(i);
            r.ei &&
              (r = await dh(e.localStore, t.query, !1).then(
                ({ documents: e }) => t.view.Gu(e, r)
              ));
            var s = n && n.targetChanges.get(t.targetId),
              s = t.view.applyChanges(r, e.isPrimaryClient, s);
            return Wc(e, t.targetId, s.zu), s.snapshot;
          })(n, e, t);
        const s = await dh(n.localStore, e, !0),
          i = new Lc(e, s.hi),
          a = i.Gu(s.documents),
          o = ma.createSynthesizedTargetChangeForCurrentChange(
            t,
            r && "Offline" !== n.onlineState
          ),
          u = i.applyChanges(a, n.isPrimaryClient, o);
        Wc(n, t, u.zu);
        var h = new Vc(e, t, i);
        return (
          n.ta.set(e, h),
          n.ea.has(t) ? n.ea.get(t).push(e) : n.ea.set(t, [e]),
          u.snapshot
        );
      }
      async function qc(e, t, n) {
        const r = el(e);
        try {
          const e = await (function (e, r) {
            const s = e,
              i = Kr.now(),
              t = r.reduce((e, t) => e.add(t.key), da());
            let a;
            return s.persistence
              .runTransaction("Locally write mutations", "readwrite", (n) =>
                s.ai.qs(n, t).next((e) => {
                  a = e;
                  const t = [];
                  for (const n of r) {
                    const r = (function (e, t) {
                      let n = null;
                      for (const r of e.fieldTransforms) {
                        const e = t.data.field(r.field),
                          s = Ai(r.transform, e || null);
                        null != s &&
                          (null == n && (n = ks.empty()), n.set(r.field, s));
                      }
                      return n || null;
                    })(n, a.get(n.key));
                    null != r &&
                      t.push(
                        new $i(
                          n.key,
                          r,
                          (function r(e) {
                            const s = [];
                            return (
                              Wr(e.fields, (e, t) => {
                                const n = new Jr([e]);
                                if (As(t)) {
                                  const e = r(t.mapValue).fields;
                                  if (0 === e.length) s.push(n);
                                  else for (const t of e) s.push(n.child(t));
                                } else s.push(n);
                              }),
                              new Zr(s)
                            );
                          })(r.value.mapValue),
                          Pi.exists(!0)
                        )
                      );
                  }
                  return s.$s.addMutationBatch(n, i, t, r);
                })
              )
              .then(
                (e) => (
                  e.applyToLocalDocumentSet(a),
                  { batchId: e.batchId, changes: a }
                )
              );
          })(r.localStore, t);
          r.sharedClientState.addPendingMutation(e.batchId),
            (function (e, t, n) {
              let r = e.oa[e.currentUser.toKey()];
              (r = r || new ta(Br)),
                (r = r.insert(t, n)),
                (e.oa[e.currentUser.toKey()] = r);
            })(r, e.batchId, n),
            await Qc(r, e.changes),
            await cc(r.remoteStore);
        } catch (e) {
          const t = vc(e, "Failed to persist write");
          n.reject(t);
        }
      }
      async function Uc(e, t) {
        const r = e;
        try {
          const e = await uh(r.localStore, t);
          t.targetChanges.forEach((e, t) => {
            const n = r.ia.get(t);
            n &&
              (Dr(
                e.addedDocuments.size +
                  e.modifiedDocuments.size +
                  e.removedDocuments.size <=
                  1
              ),
              0 < e.addedDocuments.size
                ? (n.Xu = !0)
                : 0 < e.modifiedDocuments.size
                ? Dr(n.Xu)
                : 0 < e.removedDocuments.size && (Dr(n.Xu), (n.Xu = !1)));
          }),
            await Qc(r, e, t);
        } catch (e) {
          await Mu(e);
        }
      }
      function Bc(r, s, e) {
        const t = r;
        if ((t.isPrimaryClient && 0 === e) || (!t.isPrimaryClient && 1 === e)) {
          const r = [];
          t.ta.forEach((e, t) => {
            var n = t.view.Eu(s);
            n.snapshot && r.push(n.snapshot);
          }),
            (function (e, n) {
              const t = e;
              t.onlineState = n;
              let r = !1;
              t.queries.forEach((e, t) => {
                for (const e of t.listeners) e.Eu(n) && (r = !0);
              }),
                r && Ac(t);
            })(t.eventManager, s),
            r.length && t.Zu.Ko(r),
            (t.onlineState = s),
            t.isPrimaryClient && t.sharedClientState.setOnlineState(s);
        }
      }
      async function Gc(e, t) {
        const n = e,
          r = t.batch.batchId;
        try {
          const e = await (function (e, r) {
            const s = e;
            return s.persistence.runTransaction(
              "Acknowledge batch",
              "readwrite-primary",
              (e) => {
                const t = r.batch.keys(),
                  n = s.oi.newChangeBuffer({ trackRemovals: !0 });
                return (function (e, t, r, s) {
                  const i = r.batch,
                    n = i.keys();
                  let a = To.resolve();
                  return (
                    n.forEach((n) => {
                      a = a
                        .next(() => s.getEntry(t, n))
                        .next((e) => {
                          var t = r.docVersions.get(n);
                          Dr(null !== t),
                            e.version.compareTo(t) < 0 &&
                              (i.applyToRemoteDocument(e, r),
                              e.isValidDocument() &&
                                (e.setReadTime(r.commitVersion),
                                s.addEntry(e)));
                        });
                    }),
                    a.next(() => e.$s.removeMutationBatch(t, i))
                  );
                })(s, e, r, n)
                  .next(() => n.apply(e))
                  .next(() => s.$s.performConsistencyCheck(e))
                  .next(() => s.ai.qs(e, t));
              }
            );
          })(n.localStore, t);
          Kc(n, r, null),
            jc(n, r),
            n.sharedClientState.updateMutationState(r, "acknowledged"),
            await Qc(n, e);
        } catch (e) {
          await Mu(e);
        }
      }
      function jc(e, t) {
        (e.ua.get(t) || []).forEach((e) => {
          e.resolve();
        }),
          e.ua.delete(t);
      }
      function Kc(e, t, n) {
        const r = e;
        let s = r.oa[r.currentUser.toKey()];
        if (s) {
          const e = s.get(t);
          e && (n ? e.reject(n) : e.resolve(), (s = s.remove(t))),
            (r.oa[r.currentUser.toKey()] = s);
        }
      }
      function $c(t, e, n = null) {
        t.sharedClientState.removeLocalQueryTarget(e);
        for (const r of t.ea.get(e)) t.ta.delete(r), n && t.Zu.la(r, n);
        t.ea.delete(e),
          t.isPrimaryClient &&
            t.ra.Ri(e).forEach((e) => {
              t.ra.containsKey(e) || zc(t, e);
            });
      }
      function zc(e, t) {
        e.na.delete(t.path.canonicalString());
        var n = e.sa.get(t);
        null !== n &&
          (tc(e.remoteStore, n),
          (e.sa = e.sa.remove(t)),
          e.ia.delete(n),
          Hc(e));
      }
      function Wc(e, t, n) {
        for (const r of n)
          r instanceof Rc
            ? (e.ra.addReference(r.key, t),
              (function (e, t) {
                const n = t.key,
                  r = n.path.canonicalString();
                e.sa.get(n) ||
                  e.na.has(r) ||
                  (Er("SyncEngine", "New document in limbo: " + n),
                  e.na.add(r),
                  Hc(e));
              })(e, r))
            : r instanceof Mc
            ? (Er("SyncEngine", "Document no longer in limbo: " + r.key),
              e.ra.removeReference(r.key, t),
              e.ra.containsKey(r.key) || zc(e, r.key))
            : Ar();
      }
      function Hc(e) {
        for (; 0 < e.na.size && e.sa.size < e.maxConcurrentLimboResolutions; ) {
          var t = e.na.values().next().value;
          e.na.delete(t);
          var n = new ds(Yr.fromString(t)),
            t = e.aa.next();
          e.ia.set(t, new Oc(n)),
            (e.sa = e.sa.insert(n, t)),
            ec(e.remoteStore, new Fo(gi(oi(n.path)), t, 2, qr.A));
        }
      }
      async function Qc(e, t, r) {
        const s = e,
          i = [],
          a = [],
          o = [];
        s.ta.isEmpty() ||
          (s.ta.forEach((e, n) => {
            o.push(
              s.ha(n, t, r).then((e) => {
                var t;
                e &&
                  (s.isPrimaryClient &&
                    s.sharedClientState.updateQueryState(
                      n.targetId,
                      e.fromCache ? "not-current" : "current"
                    ),
                  i.push(e),
                  (t = nh.Js(n.targetId, e)),
                  a.push(t));
              })
            );
          }),
          await Promise.all(o),
          s.Zu.Ko(i),
          await (async function (e, t) {
            const r = e;
            try {
              await r.persistence.runTransaction(
                "notifyLocalViewChanges",
                "readwrite",
                (n) =>
                  To.forEach(t, (t) =>
                    To.forEach(t.zs, (e) =>
                      r.persistence.referenceDelegate.addReference(
                        n,
                        t.targetId,
                        e
                      )
                    ).next(() =>
                      To.forEach(t.Hs, (e) =>
                        r.persistence.referenceDelegate.removeReference(
                          n,
                          t.targetId,
                          e
                        )
                      )
                    )
                  )
              );
            } catch (e) {
              if (!xo(e)) throw e;
              Er("LocalStore", "Failed to update sequence numbers: " + e);
            }
            for (const e of t) {
              const t = e.targetId;
              if (!e.fromCache) {
                const e = r.si.get(t),
                  n = e.snapshotVersion,
                  s = e.withLastLimboFreeSnapshotVersion(n);
                r.si = r.si.insert(t, s);
              }
            }
          })(s.localStore, a));
      }
      async function Yc(r, e) {
        const s = r;
        if ((Zc(s), el(s), !0 === e && !0 !== s.ca)) {
          const r = s.sharedClientState.getAllActiveQueryTargets(),
            e = await Xc(s, r.toArray());
          (s.ca = !0), await gc(s.remoteStore, !0);
          for (const r of e) ec(s.remoteStore, r);
        } else if (!1 === e && !1 !== s.ca) {
          const r = [];
          let n = Promise.resolve();
          s.ea.forEach((e, t) => {
            s.sharedClientState.isLocalQueryTarget(t)
              ? r.push(t)
              : (n = n.then(() => ($c(s, t), lh(s.localStore, t, !0)))),
              tc(s.remoteStore, t);
          }),
            await n,
            await Xc(s, r),
            (function () {
              const n = s;
              n.ia.forEach((e, t) => {
                tc(n.remoteStore, t);
              }),
                n.ra.bi(),
                (n.ia = new Map()),
                (n.sa = new ta(ds.comparator));
            })(),
            (s.ca = !1),
            await gc(s.remoteStore, !1);
        }
      }
      async function Xc(t, n) {
        const r = t,
          s = [],
          i = [];
        for (const t of n) {
          let e;
          const c = r.ea.get(t);
          if (c && 0 !== c.length) {
            e = await ch(r.localStore, gi(c[0]));
            for (const t of c) {
              const n = r.ta.get(t),
                c =
                  ((a = r),
                  (o = n),
                  (h = u = void 0),
                  (h = await dh((u = a).localStore, o.query, !0)),
                  (h = o.view.Ju(h)),
                  u.isPrimaryClient && Wc(u, o.targetId, h.zu),
                  await h);
              c.snapshot && i.push(c.snapshot);
            }
          } else {
            const c = await fh(r.localStore, t);
            (e = await ch(r.localStore, c)), await Fc(r, Jc(c), t, !1);
          }
          s.push(e);
        }
        var a, o, u, h;
        return r.Zu.Ko(i), s;
      }
      function Jc(e) {
        return ai(
          e.path,
          e.collectionGroup,
          e.orderBy,
          e.filters,
          e.limit,
          "F",
          e.startAt,
          e.endAt
        );
      }
      function Zc(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applyRemoteEvent = Uc.bind(null, t)),
          (t.remoteStore.remoteSyncer.getRemoteKeysForTarget = function (e, t) {
            const n = e,
              r = n.ia.get(t);
            if (r && r.Xu) return da().add(r.key);
            {
              let e = da();
              const r = n.ea.get(t);
              if (!r) return e;
              for (const t of r) {
                const r = n.ta.get(t);
                e = e.unionWith(r.view.qu);
              }
              return e;
            }
          }.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectListen = async function (e, t, n) {
            const r = e;
            r.sharedClientState.updateQueryState(t, "rejected", n);
            const s = r.ia.get(t),
              i = s && s.key;
            if (i) {
              let e = new ta(ds.comparator);
              e = e.insert(i, Rs.newNoDocument(i, $r.min()));
              const n = da().add(i),
                s = new ga($r.min(), new Map(), new sa(Br), e, n);
              await Uc(r, s), (r.sa = r.sa.remove(i)), r.ia.delete(t), Hc(r);
            } else
              await lh(r.localStore, t, !1)
                .then(() => $c(r, t, n))
                .catch(Mu);
          }.bind(null, t)),
          (t.Zu.Ko = function (e, t) {
            const n = e;
            let r = !1;
            for (const e of t) {
              const t = e.query,
                s = n.queries.get(t);
              if (s) {
                for (const t of s.listeners) t.Au(e) && (r = !0);
                s.Iu = e;
              }
            }
            r && Ac(n);
          }.bind(null, t.eventManager)),
          (t.Zu.la = function (e, t, n) {
            const r = e,
              s = r.queries.get(t);
            if (s) for (const e of s.listeners) e.onError(n);
            r.queries.delete(t);
          }.bind(null, t.eventManager)),
          t
        );
      }
      function el(e) {
        const t = e;
        return (
          (t.remoteStore.remoteSyncer.applySuccessfulWrite = Gc.bind(null, t)),
          (t.remoteStore.remoteSyncer.rejectFailedWrite = async function (
            e,
            t,
            n
          ) {
            const r = e;
            try {
              const e = await (function (e, r) {
                const s = e;
                return s.persistence.runTransaction(
                  "Reject batch",
                  "readwrite-primary",
                  (t) => {
                    let n;
                    return s.$s
                      .lookupMutationBatch(t, r)
                      .next(
                        (e) => (
                          Dr(null !== e),
                          (n = e.keys()),
                          s.$s.removeMutationBatch(t, e)
                        )
                      )
                      .next(() => s.$s.performConsistencyCheck(t))
                      .next(() => s.ai.qs(t, n));
                  }
                );
              })(r.localStore, t);
              Kc(r, t, n),
                jc(r, t),
                r.sharedClientState.updateMutationState(t, "rejected", n),
                await Qc(r, e);
            } catch (n) {
              await Mu(n);
            }
          }.bind(null, t)),
          t
        );
      }
      class tl {
        constructor() {
          this.synchronizeTabs = !1;
        }
        async initialize(e) {
          (this.M = Kh(e.databaseInfo.databaseId)),
            (this.sharedClientState = this.da(e)),
            (this.persistence = this._a(e)),
            await this.persistence.start(),
            (this.gcScheduler = this.wa(e)),
            (this.localStore = this.ma(e));
        }
        wa(e) {
          return null;
        }
        ma(e) {
          return ih(this.persistence, new rh(), e.initialUser, this.M);
        }
        _a(e) {
          return new _h(Ah.Wi, this.M);
        }
        da(e) {
          return new Oh();
        }
        async terminate() {
          this.gcScheduler && this.gcScheduler.stop(),
            await this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
        }
      }
      class nl extends tl {
        constructor(e, t, n) {
          super(),
            (this.ga = e),
            (this.cacheSizeBytes = t),
            (this.forceOwnership = n),
            (this.synchronizeTabs = !1);
        }
        async initialize(e) {
          await super.initialize(e),
            await this.ga.initialize(this, e),
            await el(this.ga.syncEngine),
            await cc(this.ga.remoteStore),
            await this.persistence.Is(
              () => (
                this.gcScheduler &&
                  !this.gcScheduler.started &&
                  this.gcScheduler.start(this.localStore),
                Promise.resolve()
              )
            );
        }
        ma(e) {
          return ih(this.persistence, new rh(), e.initialUser, this.M);
        }
        wa(e) {
          var t = this.persistence.referenceDelegate.garbageCollector;
          return new Ou(t, e.asyncQueue);
        }
        _a(e) {
          var t = eh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey),
            n =
              void 0 !== this.cacheSizeBytes
                ? bu.withCacheSize(this.cacheSizeBytes)
                : bu.DEFAULT;
          return new Xu(
            this.synchronizeTabs,
            t,
            e.clientId,
            n,
            e.asyncQueue,
            Gh(),
            jh(),
            this.M,
            this.sharedClientState,
            !!this.forceOwnership
          );
        }
        da(e) {
          return new Oh();
        }
      }
      class rl extends nl {
        constructor(e, t) {
          super(e, t, !1),
            (this.ga = e),
            (this.cacheSizeBytes = t),
            (this.synchronizeTabs = !0);
        }
        async initialize(e) {
          await super.initialize(e);
          var t = this.ga.syncEngine;
          this.sharedClientState instanceof Vh &&
            ((this.sharedClientState.syncEngine = {
              kr: async function (e, t, n, r) {
                var s = e,
                  i = await (function (e, n) {
                    const r = e,
                      s = r.$s;
                    return r.persistence.runTransaction(
                      "Lookup mutation documents",
                      "readonly",
                      (t) =>
                        s
                          .ln(t, n)
                          .next((e) => (e ? r.ai.qs(t, e) : To.resolve(null)))
                    );
                  })(s.localStore, t);
                null !== i
                  ? ("pending" === n
                      ? await cc(s.remoteStore)
                      : "acknowledged" === n || "rejected" === n
                      ? (Kc(s, t, r || null), jc(s, t), s.localStore.$s.dn(t))
                      : Ar(),
                    await Qc(s, i))
                  : Er(
                      "SyncEngine",
                      "Cannot apply mutation batch with id: " + t
                    );
              }.bind(null, t),
              Mr: async function (e, t, n, r) {
                const s = e;
                if (s.ca)
                  Er(
                    "SyncEngine",
                    "Ignoring unexpected query state notification."
                  );
                else {
                  var i = s.ea.get(t);
                  if (i && 0 < i.length)
                    switch (n) {
                      case "current":
                      case "not-current": {
                        const e = await gh(s.localStore, bi(i[0])),
                          r = ga.createSynthesizedRemoteEventForCurrentChange(
                            t,
                            "current" === n
                          );
                        await Qc(s, e, r);
                        break;
                      }
                      case "rejected":
                        await lh(s.localStore, t, !0), $c(s, t, r);
                        break;
                      default:
                        Ar();
                    }
                }
              }.bind(null, t),
              Or: async function (e, t, n) {
                const r = Zc(e);
                if (r.ca) {
                  for (const e of t)
                    if (r.ea.has(e))
                      Er("SyncEngine", "Adding an already active target " + e);
                    else {
                      const t = await fh(r.localStore, e),
                        n = await ch(r.localStore, t);
                      await Fc(r, Jc(t), n.targetId, !1), ec(r.remoteStore, n);
                    }
                  for (const e of n)
                    r.ea.has(e) &&
                      (await lh(r.localStore, e, !1)
                        .then(() => {
                          tc(r.remoteStore, e), $c(r, e);
                        })
                        .catch(Mu));
                }
              }.bind(null, t),
              Os: function (e) {
                return e.localStore.persistence.Os();
              }.bind(null, t),
              Nr: async function (e, t) {
                const n = e;
                return gh(n.localStore, t).then((e) => Qc(n, e));
              }.bind(null, t),
            }),
            await this.sharedClientState.start()),
            await this.persistence.Is(async (e) => {
              await Yc(this.ga.syncEngine, e),
                this.gcScheduler &&
                  (e && !this.gcScheduler.started
                    ? this.gcScheduler.start(this.localStore)
                    : e || this.gcScheduler.stop());
            });
        }
        da(e) {
          var t = Gh();
          if (!Vh.vt(t))
            throw new Nr(
              xr.UNIMPLEMENTED,
              "IndexedDB persistence is only available on platforms that support LocalStorage."
            );
          var n = eh(e.databaseInfo.databaseId, e.databaseInfo.persistenceKey);
          return new Vh(t, e.asyncQueue, n, e.clientId, e.initialUser);
        }
      }
      class sl {
        async initialize(e, t) {
          this.localStore ||
            ((this.localStore = e.localStore),
            (this.sharedClientState = e.sharedClientState),
            (this.datastore = this.createDatastore(t)),
            (this.remoteStore = this.createRemoteStore(t)),
            (this.eventManager = this.createEventManager(t)),
            (this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (e) =>
              Bc(this.syncEngine, e, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange =
              async function (e, t) {
                const n = e;
                if (!n.currentUser.isEqual(t)) {
                  Er("SyncEngine", "User change. New user:", t.toKey());
                  const r = await ah(n.localStore, t);
                  (n.currentUser = t),
                    (e = n).ua.forEach((e) => {
                      e.forEach((e) => {
                        e.reject(
                          new Nr(
                            xr.CANCELLED,
                            "'waitForPendingWrites' promise is rejected due to a user change."
                          )
                        );
                      });
                    }),
                    e.ua.clear(),
                    n.sharedClientState.handleUserChange(
                      t,
                      r.removedBatchIds,
                      r.addedBatchIds
                    ),
                    await Qc(n, r.ci);
                }
              }.bind(null, this.syncEngine)),
            await gc(this.remoteStore, this.syncEngine.isPrimaryClient));
        }
        createEventManager(e) {
          return new Tc();
        }
        createDatastore(e) {
          var t,
            n,
            r,
            s,
            i = Kh(e.databaseInfo.databaseId),
            t = ((t = e.databaseInfo), new Bh(t));
          return (
            (n = e.authCredentials),
            (r = e.appCheckCredentials),
            (s = t),
            (e = i),
            new Qh(n, r, s, e)
          );
        }
        createRemoteStore(e) {
          return (
            (t = this.localStore),
            (n = this.datastore),
            (r = e.asyncQueue),
            (s = (e) => Bc(this.syncEngine, e, 0)),
            (i = new (Fh.vt() ? Fh : Ph)()),
            new Xh(t, n, r, s, i)
          );
          var t, n, r, s, i;
        }
        createSyncEngine(e, t) {
          return (function (e, t, n, r, s, i, a) {
            const o = new Pc(e, t, n, r, s, i);
            return a && (o.ca = !0), o;
          })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            e.initialUser,
            e.maxConcurrentLimboResolutions,
            t
          );
        }
        terminate() {
          return (async function (e) {
            const t = e;
            Er("RemoteStore", "RemoteStore shutting down."),
              t.lu.add(5),
              await Zh(t),
              t.du.shutdown(),
              t._u.set("Unknown");
          })(this.remoteStore);
        }
      }
      function il(t, n = 10240) {
        let r = 0;
        return {
          async read() {
            if (r < t.byteLength) {
              var e = { value: t.slice(r, r + n), done: !1 };
              return (r += n), e;
            }
            return { done: !0 };
          },
          async cancel() {},
          releaseLock() {},
          closed: Promise.reject("unimplemented"),
        };
      }
      class al {
        constructor(e) {
          (this.observer = e), (this.muted = !1);
        }
        next(e) {
          this.observer.next && this.ya(this.observer.next, e);
        }
        error(e) {
          this.observer.error
            ? this.ya(this.observer.error, e)
            : console.error("Uncaught Error in snapshot listener:", e);
        }
        pa() {
          this.muted = !0;
        }
        ya(e, t) {
          this.muted ||
            setTimeout(() => {
              this.muted || e(t);
            }, 0);
        }
      }
      class ol {
        constructor(e, t) {
          (this.Ia = e),
            (this.M = t),
            (this.metadata = new Cr()),
            (this.buffer = new Uint8Array()),
            (this.Ta = new TextDecoder("utf-8")),
            this.Ea().then(
              (e) => {
                e && e.Cu()
                  ? this.metadata.resolve(e.payload.metadata)
                  : this.metadata.reject(
                      new Error(
                        `The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(
                          null == e ? void 0 : e.payload
                        )}`
                      )
                    );
              },
              (e) => this.metadata.reject(e)
            );
        }
        close() {
          return this.Ia.cancel();
        }
        async getMetadata() {
          return this.metadata.promise;
        }
        async fa() {
          return await this.getMetadata(), this.Ea();
        }
        async Ea() {
          var e = await this.Aa();
          if (null === e) return null;
          var t = this.Ta.decode(e),
            n = Number(t);
          isNaN(n) && this.Ra(`length string (${t}) is not valid number`);
          t = await this.ba(n);
          return new xc(JSON.parse(t), e.length + n);
        }
        Pa() {
          return this.buffer.findIndex((e) => e === "{".charCodeAt(0));
        }
        async Aa() {
          for (; this.Pa() < 0 && !(await this.Va()); );
          if (0 === this.buffer.length) return null;
          var e = this.Pa();
          e < 0 &&
            this.Ra(
              "Reached the end of bundle when a length string is expected."
            );
          var t = this.buffer.slice(0, e);
          return (this.buffer = this.buffer.slice(e)), t;
        }
        async ba(e) {
          for (; this.buffer.length < e; )
            (await this.Va()) &&
              this.Ra("Reached the end of bundle when more is expected.");
          var t = this.Ta.decode(this.buffer.slice(0, e));
          return (this.buffer = this.buffer.slice(e)), t;
        }
        Ra(e) {
          throw (this.Ia.cancel(), new Error(`Invalid bundle format: ${e}`));
        }
        async Va() {
          var e = await this.Ia.read();
          if (!e.done) {
            const t = new Uint8Array(this.buffer.length + e.value.length);
            t.set(this.buffer),
              t.set(e.value, this.buffer.length),
              (this.buffer = t);
          }
          return e.done;
        }
      }
      class ul {
        constructor(e) {
          (this.datastore = e),
            (this.readVersions = new Map()),
            (this.mutations = []),
            (this.committed = !1),
            (this.lastWriteError = null),
            (this.writtenDocs = new Set());
        }
        async lookup(e) {
          if ((this.ensureCommitNotCalled(), 0 < this.mutations.length))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Firestore transactions require all reads to be executed before all writes."
            );
          const t = await (async function (e, t) {
            const r = e,
              n = Va(r.M) + "/documents",
              s = { documents: t.map((e) => ka(r.M, e)) },
              i = await r.co("BatchGetDocuments", n, s),
              a = new Map();
            i.forEach((e) => {
              const t =
                ((n = r.M),
                "found" in (e = e)
                  ? (function (e, t) {
                      Dr(!!t.found), t.found.name, t.found.updateTime;
                      var n = Ra(e, t.found.name),
                        r = xa(t.found.updateTime),
                        s = new ks({ mapValue: { fields: t.found.fields } });
                      return Rs.newFoundDocument(n, r, s);
                    })(n, e)
                  : "missing" in e
                  ? (function (e, t) {
                      Dr(!!t.missing), Dr(!!t.readTime);
                      var n = Ra(e, t.missing),
                        r = xa(t.readTime);
                      return Rs.newNoDocument(n, r);
                    })(n, e)
                  : Ar());
              var n;
              a.set(t.key.toString(), t);
            });
            const o = [];
            return (
              t.forEach((e) => {
                var t = a.get(e.toString());
                Dr(!!t), o.push(t);
              }),
              o
            );
          })(this.datastore, e);
          return t.forEach((e) => this.recordVersion(e)), t;
        }
        set(e, t) {
          this.write(t.toMutation(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        update(e, t) {
          try {
            this.write(t.toMutation(e, this.preconditionForUpdate(e)));
          } catch (e) {
            this.lastWriteError = e;
          }
          this.writtenDocs.add(e.toString());
        }
        delete(e) {
          this.write(new Qi(e, this.precondition(e))),
            this.writtenDocs.add(e.toString());
        }
        async commit() {
          if ((this.ensureCommitNotCalled(), this.lastWriteError))
            throw this.lastWriteError;
          const t = this.readVersions;
          this.mutations.forEach((e) => {
            t.delete(e.key.toString());
          }),
            t.forEach((e, t) => {
              var n = ds.fromPath(t);
              this.mutations.push(new Yi(n, this.precondition(n)));
            }),
            await (async function (e, t) {
              const n = e,
                r = Va(n.M) + "/documents",
                s = { writes: t.map((e) => qa(n.M, e)) };
              await n.ro("Commit", r, s);
            })(this.datastore, this.mutations),
            (this.committed = !0);
        }
        recordVersion(e) {
          let t;
          if (e.isFoundDocument()) t = e.version;
          else {
            if (!e.isNoDocument()) throw Ar();
            t = $r.min();
          }
          var n = this.readVersions.get(e.key.toString());
          if (n) {
            if (!t.isEqual(n))
              throw new Nr(
                xr.ABORTED,
                "Document version changed between two reads."
              );
          } else this.readVersions.set(e.key.toString(), t);
        }
        precondition(e) {
          var t = this.readVersions.get(e.toString());
          return !this.writtenDocs.has(e.toString()) && t
            ? Pi.updateTime(t)
            : Pi.none();
        }
        preconditionForUpdate(e) {
          const t = this.readVersions.get(e.toString());
          if (this.writtenDocs.has(e.toString()) || !t) return Pi.exists(!0);
          if (t.isEqual($r.min()))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Can't update a document that doesn't exist."
            );
          return Pi.updateTime(t);
        }
        write(e) {
          this.ensureCommitNotCalled(), this.mutations.push(e);
        }
        ensureCommitNotCalled() {}
      }
      class hl {
        constructor(e, t, n, r) {
          (this.asyncQueue = e),
            (this.datastore = t),
            (this.updateFunction = n),
            (this.deferred = r),
            (this.va = 5),
            (this.So = new $h(this.asyncQueue, "transaction_retry"));
        }
        run() {
          --this.va, this.Sa();
        }
        Sa() {
          this.So.Io(async () => {
            const t = new ul(this.datastore),
              e = this.Da(t);
            e &&
              e
                .then((e) => {
                  this.asyncQueue.enqueueAndForget(() =>
                    t
                      .commit()
                      .then(() => {
                        this.deferred.resolve(e);
                      })
                      .catch((e) => {
                        this.Ca(e);
                      })
                  );
                })
                .catch((e) => {
                  this.Ca(e);
                });
          });
        }
        Da(e) {
          try {
            var t = this.updateFunction(e);
            return !hs(t) && t.catch && t.then
              ? t
              : (this.deferred.reject(
                  Error("Transaction callback must return a Promise")
                ),
                null);
          } catch (e) {
            return this.deferred.reject(e), null;
          }
        }
        Ca(e) {
          0 < this.va && this.xa(e)
            ? (--this.va,
              this.asyncQueue.enqueueAndForget(
                () => (this.Sa(), Promise.resolve())
              ))
            : this.deferred.reject(e);
        }
        xa(e) {
          if ("FirebaseError" !== e.name) return !1;
          var t = e.code;
          return "aborted" === t || "failed-precondition" === t || !Ji(t);
        }
      }
      class cl {
        constructor(e, t, n, r) {
          (this.authCredentials = e),
            (this.appCheckCredentials = t),
            (this.asyncQueue = n),
            (this.databaseInfo = r),
            (this.user = vr.UNAUTHENTICATED),
            (this.clientId = Ur.R()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(n, async (e) => {
              Er("FirestoreClient", "Received user=", e.uid),
                await this.authCredentialListener(e),
                (this.user = e);
            }),
            this.appCheckCredentials.start(
              n,
              (e) => (
                Er("FirestoreClient", "Received new app check token=", e),
                this.appCheckCredentialListener(e, this.user)
              )
            );
        }
        async getConfiguration() {
          return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
          };
        }
        setCredentialChangeListener(e) {
          this.authCredentialListener = e;
        }
        setAppCheckTokenChangeListener(e) {
          this.appCheckCredentialListener = e;
        }
        verifyNotTerminated() {
          if (this.asyncQueue.isShuttingDown)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "The client has already been terminated."
            );
        }
        terminate() {
          this.asyncQueue.enterRestrictedMode();
          const n = new Cr();
          return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
              try {
                this.onlineComponents &&
                  (await this.onlineComponents.terminate()),
                  this.offlineComponents &&
                    (await this.offlineComponents.terminate()),
                  this.authCredentials.shutdown(),
                  this.appCheckCredentials.shutdown(),
                  n.resolve();
              } catch (e) {
                var t = vc(e, "Failed to shutdown persistence");
                n.reject(t);
              }
            }),
            n.promise
          );
        }
      }
      async function ll(e, t) {
        e.asyncQueue.verifyOperationInProgress(),
          Er("FirestoreClient", "Initializing OfflineComponentProvider");
        var n = await e.getConfiguration();
        await t.initialize(n);
        let r = n.initialUser;
        e.setCredentialChangeListener(async (e) => {
          r.isEqual(e) || (await ah(t.localStore, e), (r = e));
        }),
          t.persistence.setDatabaseDeletedListener(() => e.terminate()),
          (e.offlineComponents = t);
      }
      async function dl(e, n) {
        e.asyncQueue.verifyOperationInProgress();
        var t = await fl(e);
        Er("FirestoreClient", "Initializing OnlineComponentProvider");
        var r = await e.getConfiguration();
        await n.initialize(t, r),
          e.setCredentialChangeListener((e) => fc(n.remoteStore, e)),
          e.setAppCheckTokenChangeListener((e, t) => fc(n.remoteStore, t)),
          (e.onlineComponents = n);
      }
      async function fl(e) {
        return (
          e.offlineComponents ||
            (Er("FirestoreClient", "Using default OfflineComponentProvider"),
            await ll(e, new tl())),
          e.offlineComponents
        );
      }
      async function gl(e) {
        return (
          e.onlineComponents ||
            (Er("FirestoreClient", "Using default OnlineComponentProvider"),
            await dl(e, new sl())),
          e.onlineComponents
        );
      }
      function ml(e) {
        return fl(e).then((e) => e.persistence);
      }
      function pl(e) {
        return fl(e).then((e) => e.localStore);
      }
      function yl(e) {
        return gl(e).then((e) => e.remoteStore);
      }
      function vl(e) {
        return gl(e).then((e) => e.syncEngine);
      }
      async function wl(e) {
        const t = await gl(e),
          n = t.eventManager;
        return (
          (n.onListen = async function (e, t) {
            const n = Zc(e);
            let r, s;
            const i = n.ta.get(t);
            if (i)
              (r = i.targetId),
                n.sharedClientState.addLocalQueryTarget(r),
                (s = i.view.Yu());
            else {
              const e = await ch(n.localStore, gi(t));
              n.isPrimaryClient && ec(n.remoteStore, e);
              const i = n.sharedClientState.addLocalQueryTarget(e.targetId);
              (r = e.targetId), (s = await Fc(n, t, r, "current" === i));
            }
            return s;
          }.bind(null, t.syncEngine)),
          (n.onUnlisten = async function (e, t) {
            const n = e,
              r = n.ta.get(t),
              s = n.ea.get(r.targetId);
            if (1 < s.length)
              return (
                n.ea.set(
                  r.targetId,
                  s.filter((e) => !pi(e, t))
                ),
                void n.ta.delete(t)
              );
            n.isPrimaryClient
              ? (n.sharedClientState.removeLocalQueryTarget(r.targetId),
                n.sharedClientState.isActiveQueryTarget(r.targetId) ||
                  (await lh(n.localStore, r.targetId, !1)
                    .then(() => {
                      n.sharedClientState.clearQueryState(r.targetId),
                        tc(n.remoteStore, r.targetId),
                        $c(n, r.targetId);
                    })
                    .catch(Mu)))
              : ($c(n, r.targetId), await lh(n.localStore, r.targetId, !0));
          }.bind(null, t.syncEngine)),
          n
        );
      }
      function bl(e, t, n = {}) {
        const r = new Cr();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (n, r, s, i, a) {
              const e = new al({
                  next: (e) => {
                    r.enqueueAndForget(() => Sc(n, o));
                    var t = e.docs.has(s);
                    !t && e.fromCache
                      ? a.reject(
                          new Nr(
                            xr.UNAVAILABLE,
                            "Failed to get document because the client is offline."
                          )
                        )
                      : t && e.fromCache && i && "server" === i.source
                      ? a.reject(
                          new Nr(
                            xr.UNAVAILABLE,
                            'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                          )
                        )
                      : a.resolve(e);
                  },
                  error: (e) => a.reject(e),
                }),
                o = new Dc(oi(s.path), e, {
                  includeMetadataChanges: !0,
                  Du: !0,
                });
              return _c(n, o);
            })(await wl(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function Il(e, t, n = {}) {
        const r = new Cr();
        return (
          e.asyncQueue.enqueueAndForget(async () =>
            (function (t, n, e, r, s) {
              const i = new al({
                  next: (e) => {
                    n.enqueueAndForget(() => Sc(t, a)),
                      e.fromCache && "server" === r.source
                        ? s.reject(
                            new Nr(
                              xr.UNAVAILABLE,
                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                            )
                          )
                        : s.resolve(e);
                  },
                  error: (e) => s.reject(e),
                }),
                a = new Dc(e, i, { includeMetadataChanges: !0, Du: !0 });
              return _c(t, a);
            })(await wl(e), e.asyncQueue, t, n, r)
          ),
          r.promise
        );
      }
      function El(e, t, n, r) {
        const s =
          ((n = n),
          (t = Kh(t)),
          (i = "string" == typeof n ? new TextEncoder().encode(n) : n),
          (n = (function (e) {
            if (e instanceof Uint8Array) return il(e, void 0);
            if (e instanceof ArrayBuffer) return il(new Uint8Array(e), void 0);
            if (e instanceof ReadableStream) return e.getReader();
            throw new Error(
              "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
            );
          })(i)),
          (t = t),
          new ol(n, t));
        var i;
        e.asyncQueue.enqueueAndForget(async () => {
          !(function (e, t, n) {
            const r = e;
            !(async function (t, n, r) {
              try {
                var s = await n.getMetadata();
                if (
                  await (function (e, t) {
                    const n = e,
                      r = xa(t.createTime);
                    return n.persistence
                      .runTransaction("hasNewerBundle", "readonly", (e) =>
                        n.ds.getBundleMetadata(e, t.id)
                      )
                      .then((e) => !!e && 0 <= e.createTime.compareTo(r));
                  })(t.localStore, s)
                )
                  return (
                    await n.close(),
                    r._completeWith({
                      taskState: "Success",
                      documentsLoaded: s.totalDocuments,
                      bytesLoaded: s.totalBytes,
                      totalDocuments: s.totalDocuments,
                      totalBytes: s.totalBytes,
                    }),
                    Promise.resolve(new Set())
                  );
                r._updateProgress(kc(s));
                const a = new Cc(s, t.localStore, n.M);
                let e = await n.fa();
                for (; e; ) {
                  const t = await a.Nu(e);
                  t && r._updateProgress(t), (e = await n.fa());
                }
                var i = await a.complete();
                return (
                  await Qc(t, i.Ou, void 0),
                  await (function (e, t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "Save bundle",
                      "readwrite",
                      (e) => n.ds.saveBundleMetadata(e, t)
                    );
                  })(t.localStore, s),
                  r._completeWith(i.progress),
                  Promise.resolve(i.Mu)
                );
              } catch (t) {
                return (
                  _r("SyncEngine", `Loading bundle failed with ${t}`),
                  r._failWith(t),
                  Promise.resolve(new Set())
                );
              }
            })(r, t, n).then((e) => {
              r.sharedClientState.notifyBundleLoaded(e);
            });
          })(await vl(e), s, r);
        });
      }
      const Tl = new Map();
      function _l(e, t, n) {
        if (!n)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${e}() cannot be called with an empty ${t}.`
          );
      }
      function Sl(e, t, n, r) {
        if (!0 === t && !0 === r)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `${e} and ${n} cannot be used together.`
          );
      }
      function Al(e) {
        if (!ds.isDocumentKey(e))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`
          );
      }
      function Dl(e) {
        if (ds.isDocumentKey(e))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`
          );
      }
      function xl(e) {
        if (void 0 === e) return "undefined";
        if (null === e) return "null";
        if ("string" == typeof e)
          return (
            20 < e.length && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
          );
        if ("number" == typeof e || "boolean" == typeof e) return "" + e;
        if ("object" != typeof e)
          return "function" == typeof e ? "a function" : Ar();
        if (e instanceof Array) return "an array";
        var t = (e = e).constructor ? e.constructor.name : null;
        return t ? `a custom ${t} object` : "an object";
      }
      function Nl(e, t) {
        if ((e = "_delegate" in e ? e._delegate : e) instanceof t) return e;
        if (t.name === e.constructor.name)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
          );
        var n = xl(e);
        throw new Nr(
          xr.INVALID_ARGUMENT,
          `Expected type '${t.name}', but it was: ${n}`
        );
      }
      function Cl(e, t) {
        if (t <= 0)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${e}() requires a positive number, but it was: ${t}.`
          );
      }
      class kl {
        constructor(e) {
          var t;
          if (void 0 === e.host) {
            if (void 0 !== e.ssl)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Can't provide ssl option if host option is not set"
              );
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
          } else
            (this.host = e.host),
              (this.ssl = null === (t = e.ssl) || void 0 === t || t);
          if (
            ((this.credentials = e.credentials),
            (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
            void 0 === e.cacheSizeBytes)
          )
            this.cacheSizeBytes = 41943040;
          else {
            if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "cacheSizeBytes must be at least 1048576"
              );
            this.cacheSizeBytes = e.cacheSizeBytes;
          }
          (this.experimentalForceLongPolling =
            !!e.experimentalForceLongPolling),
            (this.experimentalAutoDetectLongPolling =
              !!e.experimentalAutoDetectLongPolling),
            (this.useFetchStreams = !!e.useFetchStreams),
            Sl(
              "experimentalForceLongPolling",
              e.experimentalForceLongPolling,
              "experimentalAutoDetectLongPolling",
              e.experimentalAutoDetectLongPolling
            );
        }
        isEqual(e) {
          return (
            this.host === e.host &&
            this.ssl === e.ssl &&
            this.credentials === e.credentials &&
            this.cacheSizeBytes === e.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
              e.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
              e.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
            this.useFetchStreams === e.useFetchStreams
          );
        }
      }
      class Rl {
        constructor(e, t, n) {
          (this._authCredentials = t),
            (this._appCheckCredentials = n),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new kl({})),
            (this._settingsFrozen = !1),
            e instanceof us
              ? (this._databaseId = e)
              : ((this._app = e),
                (this._databaseId = (function (e) {
                  if (
                    !Object.prototype.hasOwnProperty.apply(e.options, [
                      "projectId",
                    ])
                  )
                    throw new Nr(
                      xr.INVALID_ARGUMENT,
                      '"projectId" not provided in firebase.initializeApp.'
                    );
                  return new us(e.options.projectId);
                })(e)));
        }
        get app() {
          if (!this._app)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._app;
        }
        get _initialized() {
          return this._settingsFrozen;
        }
        get _terminated() {
          return void 0 !== this._terminateTask;
        }
        _setSettings(e) {
          if (this._settingsFrozen)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
            );
          (this._settings = new kl(e)),
            void 0 !== e.credentials &&
              (this._authCredentials = (function (e) {
                if (!e) return new Rr();
                switch (e.type) {
                  case "gapi":
                    var t = e.client;
                    return (
                      Dr(
                        !(
                          "object" != typeof t ||
                          null === t ||
                          !t.auth ||
                          !t.auth.getAuthHeaderValueForFirstParty
                        )
                      ),
                      new Or(t, e.sessionIndex || "0", e.iamToken || null)
                    );
                  case "provider":
                    return e.client;
                  default:
                    throw new Nr(
                      xr.INVALID_ARGUMENT,
                      "makeAuthCredentialsProvider failed due to invalid credential type"
                    );
                }
              })(e.credentials));
        }
        _getSettings() {
          return this._settings;
        }
        _freezeSettings() {
          return (this._settingsFrozen = !0), this._settings;
        }
        _delete() {
          return (
            this._terminateTask || (this._terminateTask = this._terminate()),
            this._terminateTask
          );
        }
        toJSON() {
          return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings,
          };
        }
        _terminate() {
          return (
            (function (e) {
              const t = Tl.get(e);
              t &&
                (Er("ComponentProvider", "Removing Datastore"),
                Tl.delete(e),
                t.terminate());
            })(this),
            Promise.resolve()
          );
        }
      }
      function Ml(n, e, t, r = {}) {
        var s;
        const i = (n = Nl(n, Rl))._getSettings();
        if (
          ("firestore.googleapis.com" !== i.host &&
            i.host !== e &&
            _r(
              "Host has been set in both settings() and useEmulator(), emulator host will be used"
            ),
          n._setSettings(
            Object.assign(Object.assign({}, i), { host: `${e}:${t}`, ssl: !1 })
          ),
          r.mockUserToken)
        ) {
          let e, t;
          if ("string" == typeof r.mockUserToken)
            (e = r.mockUserToken), (t = vr.MOCK_USER);
          else {
            e = (function (e, t) {
              if (e.uid)
                throw new Error(
                  'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                );
              var n = t || "demo-project",
                r = e.iat || 0,
                s = e.sub || e.user_id;
              if (!s)
                throw new Error(
                  "mockUserToken must contain 'sub' or 'user_id' field!"
                );
              return (
                (s = Object.assign(
                  {
                    iss: `https://securetoken.google.com/${n}`,
                    aud: n,
                    iat: r,
                    exp: r + 3600,
                    auth_time: r,
                    sub: s,
                    user_id: s,
                    firebase: { sign_in_provider: "custom", identities: {} },
                  },
                  e
                )),
                [
                  a(JSON.stringify({ alg: "none", type: "JWT" })),
                  a(JSON.stringify(s)),
                  "",
                ].join(".")
              );
            })(
              r.mockUserToken,
              null === (s = n._app) || void 0 === s
                ? void 0
                : s.options.projectId
            );
            const i = r.mockUserToken.sub || r.mockUserToken.user_id;
            if (!i)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "mockUserToken must contain 'sub' or 'user_id' field!"
              );
            t = new vr(i);
          }
          n._authCredentials = new Mr(new kr(e, t));
        }
      }
      class Ll {
        constructor(e, t, n) {
          (this.converter = t),
            (this._key = n),
            (this.type = "document"),
            (this.firestore = e);
        }
        get _path() {
          return this._key.path;
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get path() {
          return this._key.path.canonicalString();
        }
        get parent() {
          return new Ol(
            this.firestore,
            this.converter,
            this._key.path.popLast()
          );
        }
        withConverter(e) {
          return new Ll(this.firestore, e, this._key);
        }
      }
      class Vl {
        constructor(e, t, n) {
          (this.converter = t),
            (this._query = n),
            (this.type = "query"),
            (this.firestore = e);
        }
        withConverter(e) {
          return new Vl(this.firestore, e, this._query);
        }
      }
      class Ol extends Vl {
        constructor(e, t, n) {
          super(e, t, oi(n)), (this._path = n), (this.type = "collection");
        }
        get id() {
          return this._query.path.lastSegment();
        }
        get path() {
          return this._query.path.canonicalString();
        }
        get parent() {
          const e = this._path.popLast();
          return e.isEmpty() ? null : new Ll(this.firestore, null, new ds(e));
        }
        withConverter(e) {
          return new Ol(this.firestore, e, this._path);
        }
      }
      function Pl(e, t, ...n) {
        if (((e = m(e)), _l("collection", "path", t), e instanceof Rl)) {
          var r = Yr.fromString(t, ...n);
          return Dl(r), new Ol(e, null, r);
        }
        if (!(e instanceof Ll || e instanceof Ol))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(Yr.fromString(t, ...n));
        return Dl(r), new Ol(e.firestore, null, r);
      }
      function Fl(e, t, ...n) {
        if (
          ((e = m(e)),
          _l("doc", "path", (t = 1 === arguments.length ? Ur.R() : t)),
          e instanceof Rl)
        ) {
          var r = Yr.fromString(t, ...n);
          return Al(r), new Ll(e, null, new ds(r));
        }
        if (!(e instanceof Ll || e instanceof Ol))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
          );
        r = e._path.child(Yr.fromString(t, ...n));
        return (
          Al(r),
          new Ll(e.firestore, e instanceof Ol ? e.converter : null, new ds(r))
        );
      }
      function ql(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          (e instanceof Ll || e instanceof Ol) &&
            (t instanceof Ll || t instanceof Ol) &&
            e.firestore === t.firestore &&
            e.path === t.path &&
            e.converter === t.converter
        );
      }
      function Ul(e, t) {
        return (
          (e = m(e)),
          (t = m(t)),
          e instanceof Vl &&
            t instanceof Vl &&
            e.firestore === t.firestore &&
            pi(e._query, t._query) &&
            e.converter === t.converter
        );
      }
      class Bl {
        constructor() {
          (this.Na = Promise.resolve()),
            (this.ka = []),
            (this.Ma = !1),
            (this.Oa = []),
            (this.Fa = null),
            (this.$a = !1),
            (this.Ba = !1),
            (this.La = []),
            (this.So = new $h(this, "async_queue_retry")),
            (this.Ua = () => {
              var e = jh();
              e &&
                Er(
                  "AsyncQueue",
                  "Visibility state changed to " + e.visibilityState
                ),
                this.So.Eo();
            });
          const e = jh();
          e &&
            "function" == typeof e.addEventListener &&
            e.addEventListener("visibilitychange", this.Ua);
        }
        get isShuttingDown() {
          return this.Ma;
        }
        enqueueAndForget(e) {
          this.enqueue(e);
        }
        enqueueAndForgetEvenWhileRestricted(e) {
          this.qa(), this.Ga(e);
        }
        enterRestrictedMode(e) {
          if (!this.Ma) {
            (this.Ma = !0), (this.Ba = e || !1);
            const t = jh();
            t &&
              "function" == typeof t.removeEventListener &&
              t.removeEventListener("visibilitychange", this.Ua);
          }
        }
        enqueue(e) {
          if ((this.qa(), this.Ma)) return new Promise(() => {});
          const t = new Cr();
          return this.Ga(() =>
            this.Ma && this.Ba
              ? Promise.resolve()
              : (e().then(t.resolve, t.reject), t.promise)
          ).then(() => t.promise);
        }
        enqueueRetryable(e) {
          this.enqueueAndForget(() => (this.ka.push(e), this.Ka()));
        }
        async Ka() {
          if (0 !== this.ka.length) {
            try {
              await this.ka[0](), this.ka.shift(), this.So.reset();
            } catch (e) {
              if (!xo(e)) throw e;
              Er("AsyncQueue", "Operation failed with retryable error: " + e);
            }
            0 < this.ka.length && this.So.Io(() => this.Ka());
          }
        }
        Ga(e) {
          var t = this.Na.then(
            () => (
              (this.$a = !0),
              e()
                .catch((e) => {
                  throw (
                    ((this.Fa = e),
                    (this.$a = !1),
                    Tr(
                      "INTERNAL UNHANDLED ERROR: ",
                      (function (e) {
                        let t = e.message || "";
                        return (
                          e.stack &&
                            (t = e.stack.includes(e.message)
                              ? e.stack
                              : e.message + "\n" + e.stack),
                          t
                        );
                      })(e)
                    ),
                    e)
                  );
                })
                .then((e) => ((this.$a = !1), e))
            )
          );
          return (this.Na = t);
        }
        enqueueAfterDelay(e, t, n) {
          this.qa(), -1 < this.La.indexOf(e) && (t = 0);
          var r = yc.createAndSchedule(this, e, t, n, (e) => this.Qa(e));
          return this.Oa.push(r), r;
        }
        qa() {
          this.Fa && Ar();
        }
        verifyOperationInProgress() {}
        async ja() {
          for (var e; await (e = this.Na), e !== this.Na; );
        }
        Wa(e) {
          for (const t of this.Oa) if (t.timerId === e) return !0;
          return !1;
        }
        za(t) {
          return this.ja().then(() => {
            this.Oa.sort((e, t) => e.targetTimeMs - t.targetTimeMs);
            for (const e of this.Oa)
              if ((e.skipDelay(), "all" !== t && e.timerId === t)) break;
            return this.ja();
          });
        }
        Ha(e) {
          this.La.push(e);
        }
        Qa(e) {
          var t = this.Oa.indexOf(e);
          this.Oa.splice(t, 1);
        }
      }
      function Gl(e) {
        return (function (e) {
          if ("object" == typeof e && null !== e) {
            var t = e;
            for (const e of ["next", "error", "complete"])
              if (e in t && "function" == typeof t[e]) return 1;
          }
        })(e);
      }
      class jl {
        constructor() {
          (this._progressObserver = {}),
            (this._taskCompletionResolver = new Cr()),
            (this._lastProgress = {
              taskState: "Running",
              totalBytes: 0,
              totalDocuments: 0,
              bytesLoaded: 0,
              documentsLoaded: 0,
            });
        }
        onProgress(e, t, n) {
          this._progressObserver = { next: e, error: t, complete: n };
        }
        catch(e) {
          return this._taskCompletionResolver.promise.catch(e);
        }
        then(e, t) {
          return this._taskCompletionResolver.promise.then(e, t);
        }
        _completeWith(e) {
          this._updateProgress(e),
            this._progressObserver.complete &&
              this._progressObserver.complete(),
            this._taskCompletionResolver.resolve(e);
        }
        _failWith(e) {
          (this._lastProgress.taskState = "Error"),
            this._progressObserver.next &&
              this._progressObserver.next(this._lastProgress),
            this._progressObserver.error && this._progressObserver.error(e),
            this._taskCompletionResolver.reject(e);
        }
        _updateProgress(e) {
          (this._lastProgress = e),
            this._progressObserver.next && this._progressObserver.next(e);
        }
      }
      var Kl, $l, zl;
      class Wl extends Rl {
        constructor(e, t, n) {
          super(e, t, n),
            (this.type = "firestore"),
            (this._queue = new Bl()),
            (this._persistenceKey = "name" in e ? e.name : "[DEFAULT]");
        }
        _terminate() {
          return (
            this._firestoreClient || Ql(this), this._firestoreClient.terminate()
          );
        }
      }
      function Hl(e) {
        return (
          e._firestoreClient || Ql(e),
          e._firestoreClient.verifyNotTerminated(),
          e._firestoreClient
        );
      }
      function Ql(e) {
        var t,
          n,
          r,
          s,
          i,
          a = e._freezeSettings(),
          a =
            ((n = e._databaseId),
            (r =
              (null === (t = e._app) || void 0 === t
                ? void 0
                : t.options.appId) || ""),
            (s = e._persistenceKey),
            (i = a),
            new os(
              n,
              r,
              s,
              i.host,
              i.ssl,
              i.experimentalForceLongPolling,
              i.experimentalAutoDetectLongPolling,
              i.useFetchStreams
            ));
        e._firestoreClient = new cl(
          e._authCredentials,
          e._appCheckCredentials,
          e._queue,
          a
        );
      }
      function Yl(e, n, r) {
        const s = new Cr();
        return e.asyncQueue
          .enqueue(async () => {
            try {
              await ll(e, r), await dl(e, n), s.resolve();
            } catch (e) {
              if (
                !("FirebaseError" === (t = e).name
                  ? t.code === xr.FAILED_PRECONDITION ||
                    t.code === xr.UNIMPLEMENTED
                  : !(
                      "undefined" != typeof DOMException &&
                      t instanceof DOMException
                    ) ||
                    22 === t.code ||
                    20 === t.code ||
                    11 === t.code)
              )
                throw e;
              console.warn(
                "Error enabling offline persistence. Falling back to persistence disabled: " +
                  e
              ),
                s.reject(e);
            }
            var t;
          })
          .then(() => s.promise);
      }
      function Xl(e) {
        return (function (e) {
          const t = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t) {
                const n = e;
                ac(n.remoteStore) ||
                  Er(
                    "SyncEngine",
                    "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
                  );
                try {
                  const e = await (function () {
                    const t = n.localStore;
                    return t.persistence.runTransaction(
                      "Get highest unacknowledged batch id",
                      "readonly",
                      (e) => t.$s.getHighestUnacknowledgedBatchId(e)
                    );
                  })();
                  if (-1 === e) return void t.resolve();
                  const r = n.ua.get(e) || [];
                  r.push(t), n.ua.set(e, r);
                } catch (e) {
                  const n = vc(
                    e,
                    "Initialization of waitForPendingWrites() operation failed"
                  );
                  t.reject(n);
                }
              })(await vl(e), t)
            ),
            t.promise
          );
        })(Hl((e = Nl(e, Wl))));
      }
      function Jl(e) {
        return (n = Hl((e = Nl(e, Wl)))).asyncQueue.enqueue(async () => {
          const e = await ml(n),
            t = await yl(n);
          return (
            e.setNetworkEnabled(!0),
            (function () {
              const e = t;
              return e.lu.delete(0), Jh(e);
            })()
          );
        });
        var n;
      }
      function Zl(e) {
        return (n = Hl((e = Nl(e, Wl)))).asyncQueue.enqueue(async () => {
          const e = await ml(n),
            t = await yl(n);
          return (
            e.setNetworkEnabled(!1),
            (async function () {
              const e = t;
              e.lu.add(0), await Zh(e), e._u.set("Offline");
            })()
          );
        });
        var n;
      }
      function ed(t, e) {
        return (
          (n = Hl((t = Nl(t, Wl)))),
          (r = e),
          n.asyncQueue
            .enqueue(async () =>
              (function (e, t) {
                const n = e;
                return n.persistence.runTransaction(
                  "Get named query",
                  "readonly",
                  (e) => n.ds.getNamedQuery(e, t)
                );
              })(await pl(n), r)
            )
            .then((e) => (e ? new Vl(t, null, e.query) : null))
        );
        var n, r;
      }
      function td(e) {
        if (e._initialized || e._terminated)
          throw new Nr(
            xr.FAILED_PRECONDITION,
            "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
          );
      }
      class nd {
        constructor(...e) {
          for (let t = 0; t < e.length; ++t)
            if (0 === e[t].length)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid field name at argument $(i + 1). Field names must not be empty."
              );
          this._internalPath = new Jr(e);
        }
        isEqual(e) {
          return this._internalPath.isEqual(e._internalPath);
        }
      }
      class rd {
        constructor(e) {
          this._byteString = e;
        }
        static fromBase64String(e) {
          try {
            return new rd(es.fromBase64String(e));
          } catch (e) {
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Failed to construct data from Base64 string: " + e
            );
          }
        }
        static fromUint8Array(e) {
          return new rd(es.fromUint8Array(e));
        }
        toBase64() {
          return this._byteString.toBase64();
        }
        toUint8Array() {
          return this._byteString.toUint8Array();
        }
        toString() {
          return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(e) {
          return this._byteString.isEqual(e._byteString);
        }
      }
      class sd {
        constructor(e) {
          this._methodName = e;
        }
      }
      class id {
        constructor(e, t) {
          if (!isFinite(e) || e < -90 || 90 < e)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Latitude must be a number between -90 and 90, but was: " + e
            );
          if (!isFinite(t) || t < -180 || 180 < t)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Longitude must be a number between -180 and 180, but was: " + t
            );
          (this._lat = e), (this._long = t);
        }
        get latitude() {
          return this._lat;
        }
        get longitude() {
          return this._long;
        }
        isEqual(e) {
          return this._lat === e._lat && this._long === e._long;
        }
        toJSON() {
          return { latitude: this._lat, longitude: this._long };
        }
        _compareTo(e) {
          return Br(this._lat, e._lat) || Br(this._long, e._long);
        }
      }
      const ad = /^__.*__$/;
      class od {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return null !== this.fieldMask
            ? new $i(e, this.data, this.fieldMask, t, this.fieldTransforms)
            : new Ki(e, this.data, t, this.fieldTransforms);
        }
      }
      class ud {
        constructor(e, t, n) {
          (this.data = e), (this.fieldMask = t), (this.fieldTransforms = n);
        }
        toMutation(e, t) {
          return new $i(e, this.data, this.fieldMask, t, this.fieldTransforms);
        }
      }
      function hd(e) {
        switch (e) {
          case 0:
          case 2:
          case 1:
            return 1;
          case 3:
          case 4:
            return;
          default:
            throw Ar();
        }
      }
      class cd {
        constructor(e, t, n, r, s, i) {
          (this.settings = e),
            (this.databaseId = t),
            (this.M = n),
            (this.ignoreUndefinedProperties = r),
            void 0 === s && this.Ja(),
            (this.fieldTransforms = s || []),
            (this.fieldMask = i || []);
        }
        get path() {
          return this.settings.path;
        }
        get Ya() {
          return this.settings.Ya;
        }
        Xa(e) {
          return new cd(
            Object.assign(Object.assign({}, this.settings), e),
            this.databaseId,
            this.M,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
          );
        }
        Za(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.Xa({ path: n, tc: !1 });
          return r.ec(e), r;
        }
        nc(e) {
          var t;
          const n =
              null === (t = this.path) || void 0 === t ? void 0 : t.child(e),
            r = this.Xa({ path: n, tc: !1 });
          return r.Ja(), r;
        }
        sc(e) {
          return this.Xa({ path: void 0, tc: !0 });
        }
        ic(e) {
          return Cd(
            e,
            this.settings.methodName,
            this.settings.rc || !1,
            this.path,
            this.settings.oc
          );
        }
        contains(t) {
          return (
            void 0 !== this.fieldMask.find((e) => t.isPrefixOf(e)) ||
            void 0 !== this.fieldTransforms.find((e) => t.isPrefixOf(e.field))
          );
        }
        Ja() {
          if (this.path)
            for (let e = 0; e < this.path.length; e++)
              this.ec(this.path.get(e));
        }
        ec(e) {
          if (0 === e.length)
            throw this.ic("Document fields must not be empty");
          if (hd(this.Ya) && ad.test(e))
            throw this.ic('Document fields cannot begin and end with "__"');
        }
      }
      class ld {
        constructor(e, t, n) {
          (this.databaseId = e),
            (this.ignoreUndefinedProperties = t),
            (this.M = n || Kh(e));
        }
        uc(e, t, n, r = !1) {
          return new cd(
            {
              Ya: e,
              methodName: t,
              oc: n,
              path: Jr.emptyPath(),
              tc: !1,
              rc: r,
            },
            this.databaseId,
            this.M,
            this.ignoreUndefinedProperties
          );
        }
      }
      function dd(e) {
        var t = e._freezeSettings(),
          n = Kh(e._databaseId);
        return new ld(e._databaseId, !!t.ignoreUndefinedProperties, n);
      }
      function fd(e, t, n, r, s, i = {}) {
        const a = e.uc(i.merge || i.mergeFields ? 2 : 0, t, n, s);
        Ad("Data must be an object, but it was:", a, r);
        var o = _d(r, a);
        let u, h;
        if (i.merge) (u = new Zr(a.fieldMask)), (h = a.fieldTransforms);
        else if (i.mergeFields) {
          const e = [];
          for (const r of i.mergeFields) {
            const s = Dd(t, r, n);
            if (!a.contains(s))
              throw new Nr(
                xr.INVALID_ARGUMENT,
                `Field '${s}' is specified in your field mask but missing from your input data.`
              );
            kd(e, s) || e.push(s);
          }
          (u = new Zr(e)),
            (h = a.fieldTransforms.filter((e) => u.covers(e.field)));
        } else (u = null), (h = a.fieldTransforms);
        return new od(new ks(o), u, h);
      }
      class gd extends sd {
        _toFieldTransform(e) {
          if (2 !== e.Ya)
            throw 1 === e.Ya
              ? e.ic(
                  `${this._methodName}() can only appear at the top level of your update data`
                )
              : e.ic(
                  `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
                );
          return e.fieldMask.push(e.path), null;
        }
        isEqual(e) {
          return e instanceof gd;
        }
      }
      function md(e, t, n) {
        return new cd(
          { Ya: 3, oc: t.settings.oc, methodName: e._methodName, tc: n },
          t.databaseId,
          t.M,
          t.ignoreUndefinedProperties
        );
      }
      class pd extends sd {
        _toFieldTransform(e) {
          return new Vi(e.path, new Di());
        }
        isEqual(e) {
          return e instanceof pd;
        }
      }
      class yd extends sd {
        constructor(e, t) {
          super(e), (this.ac = t);
        }
        _toFieldTransform(e) {
          const t = md(this, e, !0),
            n = this.ac.map((e) => Td(e, t)),
            r = new xi(n);
          return new Vi(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class vd extends sd {
        constructor(e, t) {
          super(e), (this.ac = t);
        }
        _toFieldTransform(e) {
          const t = md(this, e, !0),
            n = this.ac.map((e) => Td(e, t)),
            r = new Ci(n);
          return new Vi(e.path, r);
        }
        isEqual(e) {
          return this === e;
        }
      }
      class wd extends sd {
        constructor(e, t) {
          super(e), (this.cc = t);
        }
        _toFieldTransform(e) {
          var t = new Ri(e.M, _i(e.M, this.cc));
          return new Vi(e.path, t);
        }
        isEqual(e) {
          return this === e;
        }
      }
      function bd(e, s, i, t) {
        const a = e.uc(1, s, i);
        Ad("Data must be an object, but it was:", a, t);
        const o = [],
          u = ks.empty();
        Wr(t, (e, t) => {
          var n = Nd(s, e, i);
          t = m(t);
          var r = a.nc(n);
          if (t instanceof gd) o.push(n);
          else {
            const e = Td(t, r);
            null != e && (o.push(n), u.set(n, e));
          }
        });
        var n = new Zr(o);
        return new ud(u, n, a.fieldTransforms);
      }
      function Id(e, t, n, r, s, i) {
        const a = e.uc(1, t, n),
          o = [Dd(t, r, n)],
          u = [s];
        if (i.length % 2 != 0)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`
          );
        for (let f = 0; f < i.length; f += 2)
          o.push(Dd(t, i[f])), u.push(i[f + 1]);
        const h = [],
          c = ks.empty();
        for (let g = o.length - 1; 0 <= g; --g)
          if (!kd(h, o[g])) {
            const t = o[g];
            var l = m((l = u[g]));
            const r = a.nc(t);
            if (l instanceof gd) h.push(t);
            else {
              const e = Td(l, r);
              null != e && (h.push(t), c.set(t, e));
            }
          }
        var d = new Zr(h);
        return new ud(c, d, a.fieldTransforms);
      }
      function Ed(e, t, n, r = !1) {
        return Td(n, e.uc(r ? 4 : 3, t));
      }
      function Td(i, e) {
        if (Sd((i = m(i))))
          return Ad("Unsupported field value:", e, i), _d(i, e);
        if (i instanceof sd)
          return (
            (function (e, t) {
              if (!hd(t.Ya))
                throw t.ic(
                  `${e._methodName}() can only be used with update() and set()`
                );
              if (!t.path)
                throw t.ic(
                  `${e._methodName}() is not currently supported inside arrays`
                );
              var n = e._toFieldTransform(t);
              n && t.fieldTransforms.push(n);
            })(i, e),
            null
          );
        if (void 0 === i && e.ignoreUndefinedProperties) return null;
        if ((e.path && e.fieldMask.push(e.path), i instanceof Array)) {
          if (e.settings.tc && 4 !== e.Ya)
            throw e.ic("Nested arrays are not supported");
          return (function (t) {
            const n = [];
            let r = 0;
            for (const s of i) {
              let e = Td(s, t.sc(r));
              null == e && (e = { nullValue: "NULL_VALUE" }), n.push(e), r++;
            }
            return { arrayValue: { values: n } };
          })(e);
        }
        return (function (e, t) {
          if (null === (e = m(i))) return { nullValue: "NULL_VALUE" };
          if ("number" == typeof e) return _i(t.M, e);
          if ("boolean" == typeof e) return { booleanValue: e };
          if ("string" == typeof e) return { stringValue: e };
          if (e instanceof Date) {
            var n = Kr.fromDate(e);
            return { timestampValue: Aa(t.M, n) };
          }
          if (e instanceof Kr) {
            n = new Kr(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
            return { timestampValue: Aa(t.M, n) };
          }
          if (e instanceof id)
            return {
              geoPointValue: { latitude: e.latitude, longitude: e.longitude },
            };
          if (e instanceof rd) return { bytesValue: Da(t.M, e._byteString) };
          if (e instanceof Ll) {
            const r = t.databaseId,
              s = e.firestore._databaseId;
            if (!s.isEqual(r))
              throw t.ic(
                `Document reference is for database ${s.projectId}/${s.database} but should be for database ${r.projectId}/${r.database}`
              );
            return {
              referenceValue: Na(
                e.firestore._databaseId || t.databaseId,
                e._key.path
              ),
            };
          }
          throw t.ic(`Unsupported field value: ${xl(e)}`);
        })(0, e);
      }
      function _d(e, r) {
        const s = {};
        return (
          Hr(e)
            ? r.path && 0 < r.path.length && r.fieldMask.push(r.path)
            : Wr(e, (e, t) => {
                var n = Td(t, r.Za(e));
                null != n && (s[e] = n);
              }),
          { mapValue: { fields: s } }
        );
      }
      function Sd(e) {
        return !(
          "object" != typeof e ||
          null === e ||
          e instanceof Array ||
          e instanceof Date ||
          e instanceof Kr ||
          e instanceof id ||
          e instanceof rd ||
          e instanceof Ll ||
          e instanceof sd
        );
      }
      function Ad(e, t, n) {
        if (
          !Sd(n) ||
          "object" != typeof (s = n) ||
          null === s ||
          (Object.getPrototypeOf(s) !== Object.prototype &&
            null !== Object.getPrototypeOf(s))
        ) {
          var r = xl(n);
          throw "an object" === r
            ? t.ic(e + " a custom object")
            : t.ic(e + " " + r);
        }
        var s;
      }
      function Dd(e, t, n) {
        if ((t = m(t)) instanceof nd) return t._internalPath;
        if ("string" == typeof t) return Nd(e, t);
        throw Cd(
          "Field path arguments must be of type string or ",
          e,
          !1,
          void 0,
          n
        );
      }
      const xd = new RegExp("[~\\*/\\[\\]]");
      function Nd(t, n, r) {
        if (0 <= n.search(xd))
          throw Cd(
            `Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`,
            t,
            !1,
            void 0,
            r
          );
        try {
          return new nd(...n.split("."))._internalPath;
        } catch (e) {
          throw Cd(
            `Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            t,
            !1,
            void 0,
            r
          );
        }
      }
      function Cd(e, t, n, r, s) {
        var i = r && !r.isEmpty(),
          a = void 0 !== s;
        let o = `Function ${t}() called with invalid data`;
        n && (o += " (via `toFirestore()`)"), (o += ". ");
        let u = "";
        return (
          (i || a) &&
            ((u += " (found"),
            i && (u += ` in field ${r}`),
            a && (u += ` in document ${s}`),
            (u += ")")),
          new Nr(xr.INVALID_ARGUMENT, o + e + u)
        );
      }
      function kd(e, t) {
        return e.some((e) => e.isEqual(t));
      }
      class Rd {
        constructor(e, t, n, r, s) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._key = n),
            (this._document = r),
            (this._converter = s);
        }
        get id() {
          return this._key.path.lastSegment();
        }
        get ref() {
          return new Ll(this._firestore, this._converter, this._key);
        }
        exists() {
          return null !== this._document;
        }
        data() {
          if (this._document) {
            if (this._converter) {
              var e = new Md(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                null
              );
              return this._converter.fromFirestore(e);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
          }
        }
        get(e) {
          if (this._document) {
            var t = this._document.data.field(Ld("DocumentSnapshot.get", e));
            if (null !== t) return this._userDataWriter.convertValue(t);
          }
        }
      }
      class Md extends Rd {
        data() {
          return super.data();
        }
      }
      function Ld(e, t) {
        return "string" == typeof t
          ? Nd(e, t)
          : (t instanceof nd ? t : t._delegate)._internalPath;
      }
      class Vd {
        constructor(e, t) {
          (this.hasPendingWrites = e), (this.fromCache = t);
        }
        isEqual(e) {
          return (
            this.hasPendingWrites === e.hasPendingWrites &&
            this.fromCache === e.fromCache
          );
        }
      }
      class Od extends Rd {
        constructor(e, t, n, r, s, i) {
          super(e, t, n, r, i),
            (this._firestore = e),
            (this._firestoreImpl = e),
            (this.metadata = s);
        }
        exists() {
          return super.exists();
        }
        data(e = {}) {
          if (this._document) {
            if (this._converter) {
              var t = new Pd(
                this._firestore,
                this._userDataWriter,
                this._key,
                this._document,
                this.metadata,
                null
              );
              return this._converter.fromFirestore(t, e);
            }
            return this._userDataWriter.convertValue(
              this._document.data.value,
              e.serverTimestamps
            );
          }
        }
        get(e, t = {}) {
          if (this._document) {
            var n = this._document.data.field(Ld("DocumentSnapshot.get", e));
            if (null !== n)
              return this._userDataWriter.convertValue(n, t.serverTimestamps);
          }
        }
      }
      class Pd extends Od {
        data(e = {}) {
          return super.data(e);
        }
      }
      class Fd {
        constructor(e, t, n, r) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._snapshot = r),
            (this.metadata = new Vd(r.hasPendingWrites, r.fromCache)),
            (this.query = n);
        }
        get docs() {
          const t = [];
          return this.forEach((e) => t.push(e)), t;
        }
        get size() {
          return this._snapshot.docs.size;
        }
        get empty() {
          return 0 === this.size;
        }
        forEach(t, n) {
          this._snapshot.docs.forEach((e) => {
            t.call(
              n,
              new Pd(
                this._firestore,
                this._userDataWriter,
                e.key,
                e,
                new Vd(
                  this._snapshot.mutatedKeys.has(e.key),
                  this._snapshot.fromCache
                ),
                this.query.converter
              )
            );
          });
        }
        docChanges(e = {}) {
          var t = !!e.includeMetadataChanges;
          if (t && this._snapshot.excludesMetadataChanges)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
            );
          return (
            (this._cachedChanges &&
              this._cachedChangesIncludeMetadataChanges === t) ||
              ((this._cachedChanges = (function (i, t) {
                if (i._snapshot.oldDocs.isEmpty()) {
                  let t = 0;
                  return i._snapshot.docChanges.map((e) => ({
                    type: "added",
                    doc: new Pd(
                      i._firestore,
                      i._userDataWriter,
                      e.doc.key,
                      e.doc,
                      new Vd(
                        i._snapshot.mutatedKeys.has(e.doc.key),
                        i._snapshot.fromCache
                      ),
                      i.query.converter
                    ),
                    oldIndex: -1,
                    newIndex: t++,
                  }));
                }
                {
                  let s = i._snapshot.oldDocs;
                  return i._snapshot.docChanges
                    .filter((e) => t || 3 !== e.type)
                    .map((e) => {
                      var t = new Pd(
                        i._firestore,
                        i._userDataWriter,
                        e.doc.key,
                        e.doc,
                        new Vd(
                          i._snapshot.mutatedKeys.has(e.doc.key),
                          i._snapshot.fromCache
                        ),
                        i.query.converter
                      );
                      let n = -1,
                        r = -1;
                      return (
                        0 !== e.type &&
                          ((n = s.indexOf(e.doc.key)),
                          (s = s.delete(e.doc.key))),
                        1 !== e.type &&
                          ((s = s.add(e.doc)), (r = s.indexOf(e.doc.key))),
                        {
                          type: (function (e) {
                            switch (e) {
                              case 0:
                                return "added";
                              case 2:
                              case 3:
                                return "modified";
                              case 1:
                                return "removed";
                              default:
                                return Ar();
                            }
                          })(e.type),
                          doc: t,
                          oldIndex: n,
                          newIndex: r,
                        }
                      );
                    });
                }
              })(this, t)),
              (this._cachedChangesIncludeMetadataChanges = t)),
            this._cachedChanges
          );
        }
      }
      function qd(e, t) {
        return e instanceof Od && t instanceof Od
          ? e._firestore === t._firestore &&
              e._key.isEqual(t._key) &&
              (null === e._document
                ? null === t._document
                : e._document.isEqual(t._document)) &&
              e._converter === t._converter
          : e instanceof Fd &&
              t instanceof Fd &&
              e._firestore === t._firestore &&
              Ul(e.query, t.query) &&
              e.metadata.isEqual(t.metadata) &&
              e._snapshot.isEqual(t._snapshot);
      }
      function Ud(e) {
        if (hi(e) && 0 === e.explicitOrderBy.length)
          throw new Nr(
            xr.UNIMPLEMENTED,
            "limitToLast() queries require specifying at least one orderBy() clause"
          );
      }
      class Bd {}
      function Gd(e, ...t) {
        for (const n of t) e = n._apply(e);
        return e;
      }
      class jd extends Bd {
        constructor(e, t, n) {
          super(),
            (this.hc = e),
            (this.lc = t),
            (this.fc = n),
            (this.type = "where");
        }
        _apply(e) {
          var t = dd(e.firestore),
            t = (function (e, t, n, r, s, i, a) {
              let o;
              if (s.isKeyField()) {
                if ("array-contains" === i || "array-contains-any" === i)
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid Query. You can't perform '${i}' queries on documentId().`
                  );
                if ("in" === i || "not-in" === i) {
                  Yd(a, i);
                  const t = [];
                  for (const n of a) t.push(Qd(r, e, n));
                  o = { arrayValue: { values: t } };
                } else o = Qd(r, e, a);
              } else
                ("in" !== i && "not-in" !== i && "array-contains-any" !== i) ||
                  Yd(a, i),
                  (o = Ed(n, t, a, "in" === i || "not-in" === i));
              var u = zs.create(s, i, o);
              return (
                (function (e, t) {
                  if (t.S()) {
                    const r = li(e);
                    if (null !== r && !r.isEqual(t.field))
                      throw new Nr(
                        xr.INVALID_ARGUMENT,
                        `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${t.field.toString()}'`
                      );
                    var n = ci(e);
                    null !== n && Xd(0, t.field, n);
                  }
                  const r = (function (e, t) {
                    for (const n of e.filters)
                      if (0 <= t.indexOf(n.op)) return n.op;
                    return null;
                  })(
                    e,
                    (function () {
                      switch (t.op) {
                        case "!=":
                          return ["!=", "not-in"];
                        case "array-contains":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "not-in",
                          ];
                        case "in":
                          return ["array-contains-any", "in", "not-in"];
                        case "array-contains-any":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                          ];
                        case "not-in":
                          return [
                            "array-contains",
                            "array-contains-any",
                            "in",
                            "not-in",
                            "!=",
                          ];
                        default:
                          return [];
                      }
                    })()
                  );
                  if (null !== r)
                    throw r === t.op
                      ? new Nr(
                          xr.INVALID_ARGUMENT,
                          `Invalid query. You cannot use more than one '${t.op.toString()}' filter.`
                        )
                      : new Nr(
                          xr.INVALID_ARGUMENT,
                          `Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`
                        );
                })(e, u),
                u
              );
            })(
              e._query,
              "where",
              t,
              e.firestore._databaseId,
              this.hc,
              this.lc,
              this.fc
            );
          return new Vl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.filters.concat([t])),
            new ii(
              e.path,
              e.collectionGroup,
              e.explicitOrderBy.slice(),
              t,
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class Kd extends Bd {
        constructor(e, t) {
          super(), (this.hc = e), (this.dc = t), (this.type = "orderBy");
        }
        _apply(e) {
          var t = (function (e, t, n) {
            if (null !== e.startAt)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
              );
            if (null !== e.endAt)
              throw new Nr(
                xr.INVALID_ARGUMENT,
                "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
              );
            var r,
              s = new ni(t, n);
            return (
              (n = s),
              null !== ci((e = e)) ||
                (null !== (r = li(e)) && Xd(0, r, n.field)),
              s
            );
          })(e._query, this.hc, this.dc);
          return new Vl(
            e.firestore,
            e.converter,
            ((e = e._query),
            (t = e.explicitOrderBy.concat([t])),
            new ii(
              e.path,
              e.collectionGroup,
              t,
              e.filters.slice(),
              e.limit,
              e.limitType,
              e.startAt,
              e.endAt
            ))
          );
        }
      }
      class $d extends Bd {
        constructor(e, t, n) {
          super(), (this.type = e), (this._c = t), (this.wc = n);
        }
        _apply(e) {
          return new Vl(
            e.firestore,
            e.converter,
            mi(e._query, this._c, this.wc)
          );
        }
      }
      class zd extends Bd {
        constructor(e, t, n) {
          super(), (this.type = e), (this.mc = t), (this.gc = n);
        }
        _apply(e) {
          var t,
            n = Hd(e, this.type, this.mc, this.gc);
          return new Vl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new ii(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              e,
              t.endAt
            ))
          );
        }
      }
      class Wd extends Bd {
        constructor(e, t, n) {
          super(), (this.type = e), (this.mc = t), (this.gc = n);
        }
        _apply(e) {
          var t,
            n = Hd(e, this.type, this.mc, this.gc);
          return new Vl(
            e.firestore,
            e.converter,
            ((t = e._query),
            (e = n),
            new ii(
              t.path,
              t.collectionGroup,
              t.explicitOrderBy.slice(),
              t.filters.slice(),
              t.limit,
              t.limitType,
              t.startAt,
              e
            ))
          );
        }
      }
      function Hd(e, t, n, r) {
        if (((n[0] = m(n[0])), n[0] instanceof Rd))
          return (function (e, t, n, r, s) {
            if (!r)
              throw new Nr(
                xr.NOT_FOUND,
                `Can't use a DocumentSnapshot that doesn't exist for ${n}().`
              );
            const i = [];
            for (const n of fi(e))
              if (n.field.isKeyField()) i.push(Is(t, r.key));
              else {
                const e = r.data.field(n.field);
                if (is(e))
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    'Invalid query. You are trying to start or end a query using a document for which the field "' +
                      n.field +
                      '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
                  );
                if (null === e) {
                  const e = n.field.canonicalString();
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid query. You are trying to start or end a query using a document for which the field '${e}' (used as the orderBy) does not exist.`
                  );
                }
                i.push(e);
              }
            return new ti(i, s);
          })(e._query, e.firestore._databaseId, t, n[0]._document, r);
        var s = dd(e.firestore);
        return (function (e, t, n, r, s, i) {
          const a = e.explicitOrderBy;
          if (s.length > a.length)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
            );
          const o = [];
          for (let u = 0; u < s.length; u++) {
            const h = s[u];
            if (a[u].field.isKeyField()) {
              if ("string" != typeof h)
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof h}`
                );
              if (!di(e) && -1 !== h.indexOf("/"))
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${r}() must be a plain document ID, but '${h}' contains a slash.`
                );
              const n = e.path.child(Yr.fromString(h));
              if (!ds.isDocumentKey(n))
                throw new Nr(
                  xr.INVALID_ARGUMENT,
                  `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`
                );
              const s = new ds(n);
              o.push(Is(t, s));
            } else {
              const e = Ed(n, r, h);
              o.push(e);
            }
          }
          return new ti(o, i);
        })(e._query, e.firestore._databaseId, s, t, n, r);
      }
      function Qd(e, t, n) {
        if ("string" == typeof (n = m(n))) {
          if ("" === n)
            throw new Nr(
              xr.INVALID_ARGUMENT,
              "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
            );
          if (!di(t) && -1 !== n.indexOf("/"))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            );
          var r = t.path.child(Yr.fromString(n));
          if (!ds.isDocumentKey(r))
            throw new Nr(
              xr.INVALID_ARGUMENT,
              `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`
            );
          return Is(e, new ds(r));
        }
        if (n instanceof Ll) return Is(e, n._key);
        throw new Nr(
          xr.INVALID_ARGUMENT,
          `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xl(
            n
          )}.`
        );
      }
      function Yd(e, t) {
        if (!Array.isArray(e) || 0 === e.length)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${t.toString()}' filters.`
          );
        if (10 < e.length)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid Query. '${t.toString()}' filters support a maximum of 10 elements in the value array.`
          );
      }
      function Xd(e, t, n) {
        if (!n.isEqual(t))
          throw new Nr(
            xr.INVALID_ARGUMENT,
            `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${t.toString()}' and so you must also use '${t.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
          );
      }
      class Jd {
        convertValue(e, t = "none") {
          switch (ms(e)) {
            case 0:
              return null;
            case 1:
              return e.booleanValue;
            case 2:
              return rs(e.integerValue || e.doubleValue);
            case 3:
              return this.convertTimestamp(e.timestampValue);
            case 4:
              return this.convertServerTimestamp(e, t);
            case 5:
              return e.stringValue;
            case 6:
              return this.convertBytes(ss(e.bytesValue));
            case 7:
              return this.convertReference(e.referenceValue);
            case 8:
              return this.convertGeoPoint(e.geoPointValue);
            case 9:
              return this.convertArray(e.arrayValue, t);
            case 10:
              return this.convertObject(e.mapValue, t);
            default:
              throw Ar();
          }
        }
        convertObject(e, n) {
          const r = {};
          return (
            Wr(e.fields, (e, t) => {
              r[e] = this.convertValue(t, n);
            }),
            r
          );
        }
        convertGeoPoint(e) {
          return new id(rs(e.latitude), rs(e.longitude));
        }
        convertArray(e, t) {
          return (e.values || []).map((e) => this.convertValue(e, t));
        }
        convertServerTimestamp(e, t) {
          switch (t) {
            case "previous":
              var n = (function e(t) {
                var n = t.mapValue.fields.__previous_value__;
                return is(n) ? e(n) : n;
              })(e);
              return null == n ? null : this.convertValue(n, t);
            case "estimate":
              return this.convertTimestamp(as(e));
            default:
              return null;
          }
        }
        convertTimestamp(e) {
          var t = ns(e);
          return new Kr(t.seconds, t.nanos);
        }
        convertDocumentKey(e, t) {
          const n = Yr.fromString(e);
          Dr(Ha(n));
          const r = new us(n.get(1), n.get(3)),
            s = new ds(n.popFirst(5));
          return (
            r.isEqual(t) ||
              Tr(
                `Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`
              ),
            s
          );
        }
      }
      function Zd(e, t, n) {
        return e
          ? n && (n.merge || n.mergeFields)
            ? e.toFirestore(t, n)
            : e.toFirestore(t)
          : t;
      }
      class ef extends Jd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new rd(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new Ll(this.firestore, null, t);
        }
      }
      class tf {
        constructor(e, t) {
          (this._firestore = e),
            (this._commitHandler = t),
            (this._mutations = []),
            (this._committed = !1),
            (this._dataReader = dd(e));
        }
        set(e, t, n) {
          this._verifyNotCommitted();
          const r = nf(e, this._firestore),
            s = Zd(r.converter, t, n),
            i = fd(
              this._dataReader,
              "WriteBatch.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._mutations.push(i.toMutation(r._key, Pi.none())), this;
        }
        update(e, t, n, ...r) {
          this._verifyNotCommitted();
          var s = nf(e, this._firestore);
          let i;
          return (
            (i =
              "string" == typeof (t = m(t)) || t instanceof nd
                ? Id(this._dataReader, "WriteBatch.update", s._key, t, n, r)
                : bd(this._dataReader, "WriteBatch.update", s._key, t)),
            this._mutations.push(i.toMutation(s._key, Pi.exists(!0))),
            this
          );
        }
        delete(e) {
          this._verifyNotCommitted();
          var t = nf(e, this._firestore);
          return (
            (this._mutations = this._mutations.concat(
              new Qi(t._key, Pi.none())
            )),
            this
          );
        }
        commit() {
          return (
            this._verifyNotCommitted(),
            (this._committed = !0),
            0 < this._mutations.length
              ? this._commitHandler(this._mutations)
              : Promise.resolve()
          );
        }
        _verifyNotCommitted() {
          if (this._committed)
            throw new Nr(
              xr.FAILED_PRECONDITION,
              "A write batch can no longer be used after commit() has been called."
            );
        }
      }
      function nf(e, t) {
        if ((e = m(e)).firestore !== t)
          throw new Nr(
            xr.INVALID_ARGUMENT,
            "Provided document reference is from a different Firestore instance."
          );
        return e;
      }
      class rf extends Jd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new rd(e);
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return new Ll(this.firestore, null, t);
        }
      }
      function sf(t) {
        t = Nl(t, Ll);
        const n = Nl(t.firestore, Wl),
          e = Hl(n),
          r = new rf(n);
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await (function (t) {
                    const n = e;
                    return n.persistence.runTransaction(
                      "read document",
                      "readonly",
                      (e) => n.ai.Bs(e, t)
                    );
                  })(t);
                  s.isFoundDocument()
                    ? n.resolve(s)
                    : s.isNoDocument()
                    ? n.resolve(null)
                    : n.reject(
                        new Nr(
                          xr.UNAVAILABLE,
                          "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                        )
                      );
                } catch (e) {
                  var r = vc(e, `Failed to get document '${t} from cache`);
                  n.reject(r);
                }
              })(await pl(e), t, n)
            ),
            n.promise
          );
        })(e, t._key).then(
          (e) =>
            new Od(
              n,
              r,
              t._key,
              e,
              new Vd(null !== e && e.hasLocalMutations, !0),
              t.converter
            )
        );
      }
      function af(t) {
        t = Nl(t, Vl);
        const n = Nl(t.firestore, Wl),
          e = Hl(n),
          r = new rf(n);
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (async function (e, t, n) {
                try {
                  const s = await dh(e, t, !0),
                    i = new Lc(t, s.hi),
                    a = i.Gu(s.documents),
                    o = i.applyChanges(a, !1);
                  n.resolve(o.snapshot);
                } catch (e) {
                  var r = vc(e, `Failed to execute query '${t} against cache`);
                  n.reject(r);
                }
              })(await pl(e), t, n)
            ),
            n.promise
          );
        })(e, t._query).then((e) => new Fd(n, r, t, e));
      }
      function of(e, t, n) {
        e = Nl(e, Ll);
        var r = Nl(e.firestore, Wl),
          s = Zd(e.converter, t, n);
        return lf(r, [
          fd(dd(r), "setDoc", e._key, s, null !== e.converter, n).toMutation(
            e._key,
            Pi.none()
          ),
        ]);
      }
      function uf(e, t, n, ...r) {
        e = Nl(e, Ll);
        var s = Nl(e.firestore, Wl),
          i = dd(s);
        let a;
        return (
          (a =
            "string" == typeof (t = m(t)) || t instanceof nd
              ? Id(i, "updateDoc", e._key, t, n, r)
              : bd(i, "updateDoc", e._key, t)),
          lf(s, [a.toMutation(e._key, Pi.exists(!0))])
        );
      }
      function hf(t, ...n) {
        var e;
        t = m(t);
        let r = { includeMetadataChanges: !1 },
          s = 0;
        "object" != typeof n[s] || Gl(n[s]) || ((r = n[s]), s++);
        var i = { includeMetadataChanges: r.includeMetadataChanges };
        if (Gl(n[s])) {
          const t = n[s];
          (n[s] = null === (e = t.next) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 1] =
              null === (e = t.error) || void 0 === e ? void 0 : e.bind(t)),
            (n[s + 2] =
              null === (e = t.complete) || void 0 === e ? void 0 : e.bind(t));
        }
        let a, o, u;
        if (t instanceof Ll)
          (o = Nl(t.firestore, Wl)),
            (u = oi(t._key.path)),
            (a = {
              next: (e) => {
                n[s] && n[s](df(o, t, e));
              },
              error: n[s + 1],
              complete: n[s + 2],
            });
        else {
          const h = Nl(t, Vl);
          (o = Nl(h.firestore, Wl)), (u = h._query);
          const c = new rf(o);
          (a = {
            next: (e) => {
              n[s] && n[s](new Fd(o, c, h, e));
            },
            error: n[s + 1],
            complete: n[s + 2],
          }),
            Ud(t._query);
        }
        return (function (e, t, n, r) {
          const s = new al(r),
            i = new Dc(t, s, n);
          return (
            e.asyncQueue.enqueueAndForget(async () => _c(await wl(e), i)),
            () => {
              s.pa(),
                e.asyncQueue.enqueueAndForget(async () => Sc(await wl(e), i));
            }
          );
        })(Hl(o), u, i, a);
      }
      function cf(e, t) {
        return (function (e, t) {
          const n = new al(t);
          return (
            e.asyncQueue.enqueueAndForget(async () =>
              (function (e, t) {
                e.Tu.add(t), t.next();
              })(await wl(e), n)
            ),
            () => {
              n.pa(),
                e.asyncQueue.enqueueAndForget(async () =>
                  (function (e, t) {
                    e.Tu.delete(t);
                  })(await wl(e), n)
                );
            }
          );
        })(Hl((e = Nl(e, Wl))), Gl(t) ? t : { next: t });
      }
      function lf(e, t) {
        return (function (e, t) {
          const n = new Cr();
          return (
            e.asyncQueue.enqueueAndForget(async () => qc(await vl(e), t, n)),
            n.promise
          );
        })(Hl(e), t);
      }
      function df(e, t, n) {
        var r = n.docs.get(t._key),
          s = new rf(e);
        return new Od(
          e,
          s,
          t._key,
          r,
          new Vd(n.hasPendingWrites, n.fromCache),
          t.converter
        );
      }
      class ff extends class {
        constructor(e, t) {
          (this._firestore = e),
            (this._transaction = t),
            (this._dataReader = dd(e));
        }
        get(e) {
          const n = nf(e, this._firestore),
            r = new ef(this._firestore);
          return this._transaction.lookup([n._key]).then((e) => {
            if (!e || 1 !== e.length) return Ar();
            const t = e[0];
            if (t.isFoundDocument())
              return new Rd(this._firestore, r, t.key, t, n.converter);
            if (t.isNoDocument())
              return new Rd(this._firestore, r, n._key, null, n.converter);
            throw Ar();
          });
        }
        set(e, t, n) {
          var r = nf(e, this._firestore),
            s = Zd(r.converter, t, n),
            s = fd(
              this._dataReader,
              "Transaction.set",
              r._key,
              s,
              null !== r.converter,
              n
            );
          return this._transaction.set(r._key, s), this;
        }
        update(e, t, n, ...r) {
          var s = nf(e, this._firestore),
            i =
              "string" == typeof (t = m(t)) || t instanceof nd
                ? Id(this._dataReader, "Transaction.update", s._key, t, n, r)
                : bd(this._dataReader, "Transaction.update", s._key, t);
          return this._transaction.update(s._key, i), this;
        }
        delete(e) {
          var t = nf(e, this._firestore);
          return this._transaction.delete(t._key), this;
        }
      } {
        constructor(e, t) {
          super(e, t), (this._firestore = e);
        }
        get(e) {
          const t = nf(e, this._firestore),
            n = new rf(this._firestore);
          return super
            .get(e)
            .then(
              (e) =>
                new Od(
                  this._firestore,
                  n,
                  t._key,
                  e._document,
                  new Vd(!1, !1),
                  t.converter
                )
            );
        }
      }
      function gf(t, n) {
        return (function (t, n) {
          const r = new Cr();
          return (
            t.asyncQueue.enqueueAndForget(async () => {
              var e = await gl(t).then((e) => e.datastore);
              new hl(t.asyncQueue, e, n, r).run();
            }),
            r.promise
          );
        })(Hl((t = Nl(t, Wl))), (e) => n(new ff(t, e)));
      }
      (Kl = Bf.SDK_VERSION),
        (wr = Kl),
        Bf._registerComponent(
          new h(
            "firestore",
            (e, { options: t }) => {
              const n = e.getProvider("app").getImmediate(),
                r = new Wl(
                  n,
                  new Lr(e.getProvider("auth-internal")),
                  new Fr(e.getProvider("app-check-internal"))
                );
              return (
                (t = Object.assign({ useFetchStreams: !0 }, t)),
                r._setSettings(t),
                r
              );
            },
            "PUBLIC"
          )
        ),
        Bf.registerVersion(yr, "3.4.7", void 0),
        Bf.registerVersion(yr, "3.4.7", "esm2017");
      function mf(e, t) {
        if (void 0 === t) return { merge: !1 };
        if (void 0 !== t.mergeFields && void 0 !== t.merge)
          throw new Nr(
            "invalid-argument",
            `Invalid options passed to function ${e}(): You cannot ` +
              'specify both "merge" and "mergeFields".'
          );
        return t;
      }
      function pf() {
        if ("undefined" == typeof Uint8Array)
          throw new Nr(
            "unimplemented",
            "Uint8Arrays are not available in this environment."
          );
      }
      function yf() {
        if ("undefined" == typeof atob)
          throw new Nr(
            "unimplemented",
            "Blobs are unavailable in Firestore in this environment."
          );
      }
      class vf {
        constructor(e) {
          this._delegate = e;
        }
        static fromBase64String(e) {
          return yf(), new vf(rd.fromBase64String(e));
        }
        static fromUint8Array(e) {
          return pf(), new vf(rd.fromUint8Array(e));
        }
        toBase64() {
          return yf(), this._delegate.toBase64();
        }
        toUint8Array() {
          return pf(), this._delegate.toUint8Array();
        }
        isEqual(e) {
          return this._delegate.isEqual(e._delegate);
        }
        toString() {
          return "Blob(base64: " + this.toBase64() + ")";
        }
      }
      function wf(e) {
        return (function (e, t) {
          if ("object" != typeof e || null === e) return;
          var n = e;
          for (const r of t) if (r in n && "function" == typeof n[r]) return 1;
          return;
        })(e, ["next", "error", "complete"]);
      }
      class bf {
        enableIndexedDbPersistence(e, t) {
          return (function (e, t) {
            td((e = Nl(e, Wl)));
            var n = Hl(e),
              r = e._freezeSettings(),
              s = new sl();
            return Yl(
              n,
              s,
              new nl(s, r.cacheSizeBytes, null == t ? void 0 : t.forceOwnership)
            );
          })(e._delegate, { forceOwnership: t });
        }
        enableMultiTabIndexedDbPersistence(e) {
          return (function (e) {
            td((e = Nl(e, Wl)));
            var t = Hl(e),
              n = e._freezeSettings(),
              r = new sl();
            return Yl(t, r, new rl(r, n.cacheSizeBytes));
          })(e._delegate);
        }
        clearIndexedDbPersistence(e) {
          return (function (e) {
            if (e._initialized && !e._terminated)
              throw new Nr(
                xr.FAILED_PRECONDITION,
                "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
              );
            const t = new Cr();
            return (
              e._queue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                  await (async function (e) {
                    if (!So.vt()) return Promise.resolve();
                    var t = e + "main";
                    await So.delete(t);
                  })(eh(e._databaseId, e._persistenceKey)),
                    t.resolve();
                } catch (e) {
                  t.reject(e);
                }
              }),
              t.promise
            );
          })(e._delegate);
        }
      }
      class If {
        constructor(e, t, n) {
          (this._delegate = t),
            (this._persistenceProvider = n),
            (this.INTERNAL = { delete: () => this.terminate() }),
            e instanceof us || (this._appCompat = e);
        }
        get _databaseId() {
          return this._delegate._databaseId;
        }
        settings(e) {
          var t = this._delegate._getSettings();
          e.merge ||
            t.host === e.host ||
            _r(
              "You are overriding the original host. If you did not intend to override your settings, use {merge: true}."
            ),
            e.merge &&
              delete (e = Object.assign(Object.assign({}, t), e)).merge,
            this._delegate._setSettings(e);
        }
        useEmulator(e, t, n = {}) {
          Ml(this._delegate, e, t, n);
        }
        enableNetwork() {
          return Jl(this._delegate);
        }
        disableNetwork() {
          return Zl(this._delegate);
        }
        enablePersistence(e) {
          let t = !1,
            n = !1;
          return (
            e &&
              ((t = !!e.synchronizeTabs),
              (n = !!e.experimentalForceOwningTab),
              Sl("synchronizeTabs", t, "experimentalForceOwningTab", n)),
            t
              ? this._persistenceProvider.enableMultiTabIndexedDbPersistence(
                  this
                )
              : this._persistenceProvider.enableIndexedDbPersistence(this, n)
          );
        }
        clearPersistence() {
          return this._persistenceProvider.clearIndexedDbPersistence(this);
        }
        terminate() {
          return (
            this._appCompat &&
              (this._appCompat._removeServiceInstance("firestore-compat"),
              this._appCompat._removeServiceInstance("firestore")),
            this._delegate._delete()
          );
        }
        waitForPendingWrites() {
          return Xl(this._delegate);
        }
        onSnapshotsInSync(e) {
          return cf(this._delegate, e);
        }
        get app() {
          if (!this._appCompat)
            throw new Nr(
              "failed-precondition",
              "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
          return this._appCompat;
        }
        collection(e) {
          try {
            return new Vf(this, Pl(this._delegate, e));
          } catch (e) {
            throw Df(e, "collection()", "Firestore.collection()");
          }
        }
        doc(e) {
          try {
            return new Af(this, Fl(this._delegate, e));
          } catch (e) {
            throw Df(e, "doc()", "Firestore.doc()");
          }
        }
        collectionGroup(e) {
          try {
            return new Rf(
              this,
              (function (e, t) {
                if (
                  ((e = Nl(e, Rl)),
                  _l("collectionGroup", "collection id", t),
                  0 <= t.indexOf("/"))
                )
                  throw new Nr(
                    xr.INVALID_ARGUMENT,
                    `Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
                  );
                return new Vl(e, null, ((t = t), new ii(Yr.emptyPath(), t)));
              })(this._delegate, e)
            );
          } catch (e) {
            throw Df(e, "collectionGroup()", "Firestore.collectionGroup()");
          }
        }
        runTransaction(t) {
          return gf(this._delegate, (e) => t(new Tf(this, e)));
        }
        batch() {
          return (
            Hl(this._delegate),
            new _f(new tf(this._delegate, (e) => lf(this._delegate, e)))
          );
        }
        loadBundle(e) {
          return (
            (t = this._delegate),
            (e = e),
            (n = Hl((t = Nl(t, Wl)))),
            (r = new jl()),
            El(n, t._databaseId, e, r),
            r
          );
          var t, n, r;
        }
        namedQuery(e) {
          return ed(this._delegate, e).then((e) =>
            e ? new Rf(this, e) : null
          );
        }
      }
      class Ef extends Jd {
        constructor(e) {
          super(), (this.firestore = e);
        }
        convertBytes(e) {
          return new vf(new rd(e));
        }
        convertReference(e) {
          var t = this.convertDocumentKey(e, this.firestore._databaseId);
          return Af.forKey(t, this.firestore, null);
        }
      }
      class Tf {
        constructor(e, t) {
          (this._firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Ef(e));
        }
        get(e) {
          const t = Of(e);
          return this._delegate
            .get(t)
            .then(
              (e) =>
                new Cf(
                  this._firestore,
                  new Od(
                    this._firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    t.converter
                  )
                )
            );
        }
        set(e, t, n) {
          var r = Of(e);
          return (
            n
              ? (mf("Transaction.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = Of(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = Of(e);
          return this._delegate.delete(t), this;
        }
      }
      class _f {
        constructor(e) {
          this._delegate = e;
        }
        set(e, t, n) {
          var r = Of(e);
          return (
            n
              ? (mf("WriteBatch.set", n), this._delegate.set(r, t, n))
              : this._delegate.set(r, t),
            this
          );
        }
        update(e, t, n, ...r) {
          var s = Of(e);
          return (
            2 === arguments.length
              ? this._delegate.update(s, t)
              : this._delegate.update(s, t, n, ...r),
            this
          );
        }
        delete(e) {
          var t = Of(e);
          return this._delegate.delete(t), this;
        }
        commit() {
          return this._delegate.commit();
        }
      }
      class Sf {
        constructor(e, t, n) {
          (this._firestore = e),
            (this._userDataWriter = t),
            (this._delegate = n);
        }
        fromFirestore(e, t) {
          var n = new Pd(
            this._firestore._delegate,
            this._userDataWriter,
            e._key,
            e._document,
            e.metadata,
            null
          );
          return this._delegate.fromFirestore(
            new kf(this._firestore, n),
            null != t ? t : {}
          );
        }
        toFirestore(e, t) {
          return t
            ? this._delegate.toFirestore(e, t)
            : this._delegate.toFirestore(e);
        }
        static getInstance(e, t) {
          const n = Sf.INSTANCES;
          let r = n.get(e);
          r || ((r = new WeakMap()), n.set(e, r));
          let s = r.get(t);
          return s || ((s = new Sf(e, new Ef(e), t)), r.set(t, s)), s;
        }
      }
      Sf.INSTANCES = new WeakMap();
      class Af {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Ef(e));
        }
        static forPath(e, t, n) {
          if (e.length % 2 != 0)
            throw new Nr(
              "invalid-argument",
              "Invalid document reference. Document references must have an even number of segments, but " +
                `${e.canonicalString()} has ${e.length}`
            );
          return new Af(t, new Ll(t._delegate, n, new ds(e)));
        }
        static forKey(e, t, n) {
          return new Af(t, new Ll(t._delegate, n, e));
        }
        get id() {
          return this._delegate.id;
        }
        get parent() {
          return new Vf(this.firestore, this._delegate.parent);
        }
        get path() {
          return this._delegate.path;
        }
        collection(e) {
          try {
            return new Vf(this.firestore, Pl(this._delegate, e));
          } catch (e) {
            throw Df(e, "collection()", "DocumentReference.collection()");
          }
        }
        isEqual(e) {
          return (e = m(e)) instanceof Ll && ql(this._delegate, e);
        }
        set(e, t) {
          t = mf("DocumentReference.set", t);
          try {
            return t ? of(this._delegate, e, t) : of(this._delegate, e);
          } catch (e) {
            throw Df(e, "setDoc()", "DocumentReference.set()");
          }
        }
        update(e, t, ...n) {
          try {
            return 1 === arguments.length
              ? uf(this._delegate, e)
              : uf(this._delegate, e, t, ...n);
          } catch (e) {
            throw Df(e, "updateDoc()", "DocumentReference.update()");
          }
        }
        delete() {
          return lf(Nl((e = this._delegate).firestore, Wl), [
            new Qi(e._key, Pi.none()),
          ]);
          var e;
        }
        onSnapshot(...e) {
          var t = xf(e),
            n = Nf(
              e,
              (e) =>
                new Cf(
                  this.firestore,
                  new Od(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            );
          return hf(this._delegate, t, n);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? sf
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = Nl(t, Ll);
                    const n = Nl(t.firestore, Wl);
                    return bl(Hl(n), t._key, { source: "server" }).then((e) =>
                      df(n, t, e)
                    );
                  }
                : function (t) {
                    t = Nl(t, Ll);
                    const n = Nl(t.firestore, Wl);
                    return bl(Hl(n), t._key).then((e) => df(n, t, e));
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new Cf(
                  this.firestore,
                  new Od(
                    this.firestore._delegate,
                    this._userDataWriter,
                    e._key,
                    e._document,
                    e.metadata,
                    this._delegate.converter
                  )
                )
            )
          );
        }
        withConverter(e) {
          return new Af(
            this.firestore,
            e
              ? this._delegate.withConverter(Sf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Df(e, t, n) {
        return (e.message = e.message.replace(t, n)), e;
      }
      function xf(e) {
        for (const t of e) if ("object" == typeof t && !wf(t)) return t;
        return {};
      }
      function Nf(e, t) {
        var n;
        let r;
        return (
          (r = wf(e[0])
            ? e[0]
            : wf(e[1])
            ? e[1]
            : "function" == typeof e[0]
            ? { next: e[0], error: e[1], complete: e[2] }
            : { next: e[1], error: e[2], complete: e[3] }),
          {
            next: (e) => {
              r.next && r.next(t(e));
            },
            error: null === (n = r.error) || void 0 === n ? void 0 : n.bind(r),
            complete:
              null === (n = r.complete) || void 0 === n ? void 0 : n.bind(r),
          }
        );
      }
      class Cf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get ref() {
          return new Af(this._firestore, this._delegate.ref);
        }
        get id() {
          return this._delegate.id;
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get exists() {
          return this._delegate.exists();
        }
        data(e) {
          return this._delegate.data(e);
        }
        get(e, t) {
          return this._delegate.get(e, t);
        }
        isEqual(e) {
          return qd(this._delegate, e._delegate);
        }
      }
      class kf extends Cf {
        data(e) {
          var t = this._delegate.data(e);
          return void 0 !== t || Ar(), t;
        }
      }
      class Rf {
        constructor(e, t) {
          (this.firestore = e),
            (this._delegate = t),
            (this._userDataWriter = new Ef(e));
        }
        where(e, t, n) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                ((r = n), (s = t), (i = Ld("where", e)), new jd(i, s, r))
              )
            );
          } catch (e) {
            throw Df(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var r, s, i;
        }
        orderBy(e, t) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (([n, r = "asc"] = [e, t]),
                (s = r),
                (i = Ld("orderBy", n)),
                new Kd(i, s))
              )
            );
          } catch (e) {
            throw Df(e, /(orderBy|where)\(\)/, "Query.$1()");
          }
          var n, r, s, i;
        }
        limit(e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (Cl("limit", (t = e)), new $d("limit", t, "F"))
              )
            );
          } catch (e) {
            throw Df(e, "limit()", "Query.limit()");
          }
          var t;
        }
        limitToLast(e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (Cl("limitToLast", (t = e)), new $d("limitToLast", t, "L"))
              )
            );
          } catch (e) {
            throw Df(e, "limitToLast()", "Query.limitToLast()");
          }
          var t;
        }
        startAt(...e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (function (...e) {
                  return new zd("startAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Df(e, "startAt()", "Query.startAt()");
          }
        }
        startAfter(...e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (function (...e) {
                  return new zd("startAfter", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Df(e, "startAfter()", "Query.startAfter()");
          }
        }
        endBefore(...e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (function (...e) {
                  return new Wd("endBefore", e, !1);
                })(...e)
              )
            );
          } catch (e) {
            throw Df(e, "endBefore()", "Query.endBefore()");
          }
        }
        endAt(...e) {
          try {
            return new Rf(
              this.firestore,
              Gd(
                this._delegate,
                (function (...e) {
                  return new Wd("endAt", e, !0);
                })(...e)
              )
            );
          } catch (e) {
            throw Df(e, "endAt()", "Query.endAt()");
          }
        }
        isEqual(e) {
          return Ul(this._delegate, e._delegate);
        }
        get(e) {
          let t;
          return (
            (t = (
              "cache" === (null == e ? void 0 : e.source)
                ? af
                : "server" === (null == e ? void 0 : e.source)
                ? function (t) {
                    t = Nl(t, Vl);
                    const n = Nl(t.firestore, Wl),
                      e = Hl(n),
                      r = new rf(n);
                    return Il(e, t._query, { source: "server" }).then(
                      (e) => new Fd(n, r, t, e)
                    );
                  }
                : function (t) {
                    t = Nl(t, Vl);
                    const n = Nl(t.firestore, Wl),
                      e = Hl(n),
                      r = new rf(n);
                    return (
                      Ud(t._query),
                      Il(e, t._query).then((e) => new Fd(n, r, t, e))
                    );
                  }
            )(this._delegate)),
            t.then(
              (e) =>
                new Lf(
                  this.firestore,
                  new Fd(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            )
          );
        }
        onSnapshot(...e) {
          var t = xf(e),
            n = Nf(
              e,
              (e) =>
                new Lf(
                  this.firestore,
                  new Fd(
                    this.firestore._delegate,
                    this._userDataWriter,
                    this._delegate,
                    e._snapshot
                  )
                )
            );
          return hf(this._delegate, t, n);
        }
        withConverter(e) {
          return new Rf(
            this.firestore,
            e
              ? this._delegate.withConverter(Sf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      class Mf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get type() {
          return this._delegate.type;
        }
        get doc() {
          return new kf(this._firestore, this._delegate.doc);
        }
        get oldIndex() {
          return this._delegate.oldIndex;
        }
        get newIndex() {
          return this._delegate.newIndex;
        }
      }
      class Lf {
        constructor(e, t) {
          (this._firestore = e), (this._delegate = t);
        }
        get query() {
          return new Rf(this._firestore, this._delegate.query);
        }
        get metadata() {
          return this._delegate.metadata;
        }
        get size() {
          return this._delegate.size;
        }
        get empty() {
          return this._delegate.empty;
        }
        get docs() {
          return this._delegate.docs.map((e) => new kf(this._firestore, e));
        }
        docChanges(e) {
          return this._delegate
            .docChanges(e)
            .map((e) => new Mf(this._firestore, e));
        }
        forEach(t, n) {
          this._delegate.forEach((e) => {
            t.call(n, new kf(this._firestore, e));
          });
        }
        isEqual(e) {
          return qd(this._delegate, e._delegate);
        }
      }
      class Vf extends Rf {
        constructor(e, t) {
          super(e, t), (this.firestore = e), (this._delegate = t);
        }
        get id() {
          return this._delegate.id;
        }
        get path() {
          return this._delegate.path;
        }
        get parent() {
          var e = this._delegate.parent;
          return e ? new Af(this.firestore, e) : null;
        }
        doc(e) {
          try {
            return void 0 === e
              ? new Af(this.firestore, Fl(this._delegate))
              : new Af(this.firestore, Fl(this._delegate, e));
          } catch (e) {
            throw Df(e, "doc()", "CollectionReference.doc()");
          }
        }
        add(e) {
          return (function (e, t) {
            const n = Nl(e.firestore, Wl),
              r = Fl(e),
              s = Zd(e.converter, t);
            return lf(n, [
              fd(
                dd(e.firestore),
                "addDoc",
                r._key,
                s,
                null !== e.converter,
                {}
              ).toMutation(r._key, Pi.exists(!1)),
            ]).then(() => r);
          })(this._delegate, e).then((e) => new Af(this.firestore, e));
        }
        isEqual(e) {
          return ql(this._delegate, e._delegate);
        }
        withConverter(e) {
          return new Vf(
            this.firestore,
            e
              ? this._delegate.withConverter(Sf.getInstance(this.firestore, e))
              : this._delegate.withConverter(null)
          );
        }
      }
      function Of(e) {
        return Nl(e, Ll);
      }
      const Pf = {
        Firestore: If,
        GeoPoint: id,
        Timestamp: Kr,
        Blob: vf,
        Transaction: Tf,
        WriteBatch: _f,
        DocumentReference: Af,
        DocumentSnapshot: Cf,
        Query: Rf,
        QueryDocumentSnapshot: kf,
        QuerySnapshot: Lf,
        CollectionReference: Vf,
        FieldPath: class Ff {
          constructor(...e) {
            this._delegate = new nd(...e);
          }
          static documentId() {
            return new Ff(Jr.keyField().canonicalString());
          }
          isEqual(e) {
            return (
              (e = m(e)) instanceof nd &&
              this._delegate._internalPath.isEqual(e._internalPath)
            );
          }
        },
        FieldValue: class qf {
          constructor(e) {
            this._delegate = e;
          }
          static serverTimestamp() {
            const e = new pd("serverTimestamp");
            return (e._methodName = "FieldValue.serverTimestamp"), new qf(e);
          }
          static delete() {
            const e = new gd("deleteField");
            return (e._methodName = "FieldValue.delete"), new qf(e);
          }
          static arrayUnion(...e) {
            const t = (function (...e) {
              return new yd("arrayUnion", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayUnion"), new qf(t);
          }
          static arrayRemove(...e) {
            const t = (function (...e) {
              return new vd("arrayRemove", e);
            })(...e);
            return (t._methodName = "FieldValue.arrayRemove"), new qf(t);
          }
          static increment(e) {
            const t = new wd("increment", e);
            return (t._methodName = "FieldValue.increment"), new qf(t);
          }
          isEqual(e) {
            return this._delegate.isEqual(e._delegate);
          }
        },
        setLogLevel: function (e) {
          (e = e), br.setLogLevel(e);
        },
        CACHE_SIZE_UNLIMITED: -1,
      };
      ($l = t.default),
        (zl = (e, t) => new If(e, t, new bf())),
        $l.INTERNAL.registerComponent(
          new h(
            "firestore-compat",
            (e) => {
              var t = e.getProvider("app-compat").getImmediate(),
                n = e.getProvider("firestore").getImmediate();
              return zl(t, n);
            },
            "PUBLIC"
          ).setServiceProps(Object.assign({}, Pf))
        ),
        $l.registerVersion("@firebase/firestore-compat", "0.1.16");
    }.apply(this, arguments);
  } catch (e) {
    throw (
      (console.error(e),
      new Error(
        "Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first."
      ))
    );
  }
});
//# sourceMappingURL=firebase-firestore-compat.js.map
