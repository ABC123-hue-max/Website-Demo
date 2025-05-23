!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).firebase =
        t());
})(this, function () {
  "use strict";
  const r = function (t) {
      const r = [];
      let n = 0;
      for (let a = 0; a < t.length; a++) {
        let e = t.charCodeAt(a);
        e < 128
          ? (r[n++] = e)
          : (e < 2048
              ? (r[n++] = (e >> 6) | 192)
              : (55296 == (64512 & e) &&
                a + 1 < t.length &&
                56320 == (64512 & t.charCodeAt(a + 1))
                  ? ((e =
                      65536 + ((1023 & e) << 10) + (1023 & t.charCodeAt(++a))),
                    (r[n++] = (e >> 18) | 240),
                    (r[n++] = ((e >> 12) & 63) | 128))
                  : (r[n++] = (e >> 12) | 224),
                (r[n++] = ((e >> 6) & 63) | 128)),
            (r[n++] = (63 & e) | 128));
      }
      return r;
    },
    n = {
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
      encodeByteArray(r, e) {
        if (!Array.isArray(r))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        var n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
        const a = [];
        for (let l = 0; l < r.length; l += 3) {
          var i = r[l],
            s = l + 1 < r.length,
            o = s ? r[l + 1] : 0,
            c = l + 2 < r.length,
            h = c ? r[l + 2] : 0;
          let e = ((15 & o) << 2) | (h >> 6),
            t = 63 & h;
          c || ((t = 64), s || (e = 64)),
            a.push(n[i >> 2], n[((3 & i) << 4) | (o >> 4)], n[e], n[t]);
        }
        return a.join("");
      },
      encodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? btoa(e)
          : this.encodeByteArray(r(e), t);
      },
      decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? atob(e)
          : (function (e) {
              const t = [];
              let r = 0,
                n = 0;
              for (; r < e.length; ) {
                var a,
                  i,
                  s = e[r++];
                s < 128
                  ? (t[n++] = String.fromCharCode(s))
                  : 191 < s && s < 224
                  ? ((a = e[r++]),
                    (t[n++] = String.fromCharCode(((31 & s) << 6) | (63 & a))))
                  : 239 < s && s < 365
                  ? ((i =
                      (((7 & s) << 18) |
                        ((63 & e[r++]) << 12) |
                        ((63 & e[r++]) << 6) |
                        (63 & e[r++])) -
                      65536),
                    (t[n++] = String.fromCharCode(55296 + (i >> 10))),
                    (t[n++] = String.fromCharCode(56320 + (1023 & i))))
                  : ((a = e[r++]),
                    (i = e[r++]),
                    (t[n++] = String.fromCharCode(
                      ((15 & s) << 12) | ((63 & a) << 6) | (63 & i)
                    )));
              }
              return t.join("");
            })(this.decodeStringToByteArray(e, t));
      },
      decodeStringToByteArray(e, t) {
        this.init_();
        var r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_;
        const n = [];
        for (let c = 0; c < e.length; ) {
          var a = r[e.charAt(c++)],
            i = c < e.length ? r[e.charAt(c)] : 0;
          ++c;
          var s = c < e.length ? r[e.charAt(c)] : 64;
          ++c;
          var o = c < e.length ? r[e.charAt(c)] : 64;
          if ((++c, null == a || null == i || null == s || null == o))
            throw Error();
          n.push((a << 2) | (i >> 4)),
            64 !== s &&
              (n.push(((i << 4) & 240) | (s >> 2)),
              64 !== o && n.push(((s << 6) & 192) | o));
        }
        return n;
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
              (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
              e >= this.ENCODED_VALS_BASE.length &&
                ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
        }
      },
    },
    a = function (e) {
      return (e = e), (t = r(e)), n.encodeByteArray(t, !0).replace(/\./g, "");
      var t;
    };
  function c(e, t) {
    if (!(t instanceof Object)) return t;
    switch (t.constructor) {
      case Date:
        const r = t;
        return new Date(r.getTime());
      case Object:
        void 0 === e && (e = {});
        break;
      case Array:
        e = [];
        break;
      default:
        return t;
    }
    for (const n in t)
      t.hasOwnProperty(n) && "__proto__" !== n && (e[n] = c(e[n], t[n]));
    return e;
  }
  class i {
    constructor() {
      (this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        }));
    }
    wrapCallback(r) {
      return (e, t) => {
        e ? this.reject(e) : this.resolve(t),
          "function" == typeof r &&
            (this.promise.catch(() => {}), 1 === r.length ? r(e) : r(e, t));
      };
    }
  }
  class s extends Error {
    constructor(e, t, r) {
      super(t),
        (this.code = e),
        (this.customData = r),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, s.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, o.prototype.create);
    }
  }
  class o {
    constructor(e, t, r) {
      (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    create(e, ...t) {
      var n,
        r = t[0] || {},
        a = `${this.service}/${e}`,
        i = this.errors[e],
        i = i
          ? ((n = r),
            i.replace(h, (e, t) => {
              var r = n[t];
              return null != r ? String(r) : `<${t}?>`;
            }))
          : "Error",
        i = `${this.serviceName}: ${i} (${a}).`;
      return new s(a, i, r);
    }
  }
  const h = /\{\$([^}]+)}/g;
  function l(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function d(e, t) {
    if (e === t) return 1;
    const r = Object.keys(e),
      n = Object.keys(t);
    for (const s of r) {
      if (!n.includes(s)) return;
      var a = e[s],
        i = t[s];
      if (p(a) && p(i)) {
        if (!d(a, i)) return;
      } else if (a !== i) return;
    }
    for (const o of n) if (!r.includes(o)) return;
    return 1;
  }
  function p(e) {
    return null !== e && "object" == typeof e;
  }
  function u(e, t) {
    const r = new f(e, t);
    return r.subscribe.bind(r);
  }
  class f {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(t) {
      this.forEachObserver((e) => {
        e.next(t);
      });
    }
    error(t) {
      this.forEachObserver((e) => {
        e.error(t);
      }),
        this.close(t);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, r) {
      let n;
      if (void 0 === e && void 0 === t && void 0 === r)
        throw new Error("Missing Observer.");
      (n = (function (e, t) {
        if ("object" != typeof e || null === e) return !1;
        for (const r of t) if (r in e && "function" == typeof e[r]) return !0;
        return !1;
      })(e, ["next", "error", "complete"])
        ? e
        : { next: e, error: t, complete: r }),
        void 0 === n.next && (n.next = g),
        void 0 === n.error && (n.error = g),
        void 0 === n.complete && (n.complete = g);
      var a = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? n.error(this.finalError) : n.complete();
            } catch (e) {}
          }),
        this.observers.push(n),
        a
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        --this.observerCount,
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(t) {
      if (!this.finalized)
        for (let e = 0; e < this.observers.length; e++) this.sendOne(e, t);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(() => {
          (this.observers = void 0), (this.onNoObservers = void 0);
        }));
    }
  }
  function g() {}
  function m(e, n) {
    return new Promise((t, r) => {
      (e.onsuccess = (e) => {
        t(e.target.result);
      }),
        (e.onerror = (e) => {
          var t;
          r(
            `${n}: ${
              null === (t = e.target.error) || void 0 === t ? void 0 : t.message
            }`
          );
        });
    });
  }
  class b {
    constructor(e) {
      (this._db = e), (this.objectStoreNames = this._db.objectStoreNames);
    }
    transaction(e, t) {
      return new v(this._db.transaction.call(this._db, e, t));
    }
    createObjectStore(e, t) {
      return new _(this._db.createObjectStore(e, t));
    }
    close() {
      this._db.close();
    }
  }
  class v {
    constructor(e) {
      (this._transaction = e),
        (this.complete = new Promise((e, t) => {
          (this._transaction.oncomplete = function () {
            e();
          }),
            (this._transaction.onerror = () => {
              t(this._transaction.error);
            }),
            (this._transaction.onabort = () => {
              t(this._transaction.error);
            });
        }));
    }
    objectStore(e) {
      return new _(this._transaction.objectStore(e));
    }
  }
  class _ {
    constructor(e) {
      this._store = e;
    }
    index(e) {
      return new E(this._store.index(e));
    }
    createIndex(e, t, r) {
      return new E(this._store.createIndex(e, t, r));
    }
    get(e) {
      return m(this._store.get(e), "Error reading from IndexedDB");
    }
    put(e, t) {
      return m(this._store.put(e, t), "Error writing to IndexedDB");
    }
    delete(e) {
      return m(this._store.delete(e), "Error deleting from IndexedDB");
    }
    clear() {
      return m(this._store.clear(), "Error clearing IndexedDB object store");
    }
  }
  class E {
    constructor(e) {
      this._index = e;
    }
    get(e) {
      return m(this._index.get(e), "Error reading from IndexedDB");
    }
  }
  class y {
    constructor(e, t, r) {
      (this.name = e),
        (this.instanceFactory = t),
        (this.type = r),
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
  const w = "[DEFAULT]";
  class C {
    constructor(e, t) {
      (this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map());
    }
    get(e) {
      var t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        const n = new i();
        if (
          (this.instancesDeferred.set(t, n),
          this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            var r = this.getOrInitializeService({ instanceIdentifier: t });
            r && n.resolve(r);
          } catch (e) {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      var t = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier
        ),
        r = null !== (r = null == e ? void 0 : e.optional) && void 0 !== r && r;
      if (!this.isInitialized(t) && !this.shouldAutoInitialize()) {
        if (r) return null;
        throw Error(`Service ${this.name} is not available`);
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: t });
      } catch (e) {
        if (r) return null;
        throw e;
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(
          `Mismatching Component ${e.name} for Provider ${this.name}.`
        );
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if ("EAGER" === e.instantiationMode)
          try {
            this.getOrInitializeService({ instanceIdentifier: w });
          } catch (e) {}
        for (var [t, r] of this.instancesDeferred.entries()) {
          t = this.normalizeInstanceIdentifier(t);
          try {
            var n = this.getOrInitializeService({ instanceIdentifier: t });
            r.resolve(n);
          } catch (e) {}
        }
      }
    }
    clearInstance(e = w) {
      this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e);
    }
    async delete() {
      const e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return null != this.component;
    }
    isInitialized(e = w) {
      return this.instances.has(e);
    }
    getOptions(e = w) {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      var { options: t = {} } = e,
        r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(r))
        throw Error(`${this.name}(${r}) has already been initialized`);
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`);
      var n,
        a,
        i = this.getOrInitializeService({ instanceIdentifier: r, options: t });
      for ([n, a] of this.instancesDeferred.entries())
        r === this.normalizeInstanceIdentifier(n) && a.resolve(i);
      return i;
    }
    onInit(e, t) {
      var r = this.normalizeInstanceIdentifier(t);
      const n =
        null !== (a = this.onInitCallbacks.get(r)) && void 0 !== a
          ? a
          : new Set();
      n.add(e), this.onInitCallbacks.set(r, n);
      var a = this.instances.get(r);
      return (
        a && e(a, r),
        () => {
          n.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      var r = this.onInitCallbacks.get(t);
      if (r)
        for (const n of r)
          try {
            n(e, t);
          } catch (e) {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let r = this.instances.get(e);
      if (
        !r &&
        this.component &&
        ((r = this.component.instanceFactory(this.container, {
          instanceIdentifier: (n = e) === w ? void 0 : n,
          options: t,
        })),
        this.instances.set(e, r),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(r, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, r);
        } catch (e) {}
      var n;
      return r || null;
    }
    normalizeInstanceIdentifier(e = w) {
      return !this.component || this.component.multipleInstances ? e : w;
    }
    shouldAutoInitialize() {
      return (
        !!this.component && "EXPLICIT" !== this.component.instantiationMode
      );
    }
  }
  class I {
    constructor(e) {
      (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
      const t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          `Component ${e.name} has already been registered with ${this.name}`
        );
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      const t = this.getProvider(e.name);
      t.isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      var t = new C(e, this);
      return this.providers.set(e, t), t;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  }
  const S = [];
  var O, e;
  ((e = O = O || {})[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
  const D = {
      debug: O.DEBUG,
      verbose: O.VERBOSE,
      info: O.INFO,
      warn: O.WARN,
      error: O.ERROR,
      silent: O.SILENT,
    },
    t = O.INFO,
    A = {
      [O.DEBUG]: "log",
      [O.VERBOSE]: "log",
      [O.INFO]: "info",
      [O.WARN]: "warn",
      [O.ERROR]: "error",
    },
    N = (e, t, ...r) => {
      if (!(t < e.logLevel)) {
        var n = new Date().toISOString(),
          a = A[t];
        if (!a)
          throw new Error(
            `Attempted to log a message with an invalid logType (value: ${t})`
          );
        console[a](`[${n}]  ${e.name}:`, ...r);
      }
    };
  class L {
    constructor(e) {
      (this.name = e),
        (this._logLevel = t),
        (this._logHandler = N),
        (this._userLogHandler = null),
        S.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in O))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? D[e] : e;
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
      this._userLogHandler && this._userLogHandler(this, O.DEBUG, ...e),
        this._logHandler(this, O.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, O.VERBOSE, ...e),
        this._logHandler(this, O.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, O.INFO, ...e),
        this._logHandler(this, O.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, O.WARN, ...e),
        this._logHandler(this, O.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, O.ERROR, ...e),
        this._logHandler(this, O.ERROR, ...e);
    }
  }
  class P {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      const e = this.container.getProviders();
      return e
        .map((e) => {
          if ("VERSION" !== (null == (t = e.getComponent()) ? void 0 : t.type))
            return null;
          var t,
            t = e.getImmediate();
          return `${t.library}/${t.version}`;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const T = "@firebase/app",
    B = "0.7.20",
    R = new L("@firebase/app");
  var $;
  const M = "[DEFAULT]",
    j = {
      "@firebase/app": "fire-core",
      "@firebase/app-compat": "fire-core-compat",
      "@firebase/analytics": "fire-analytics",
      "@firebase/analytics-compat": "fire-analytics-compat",
      "@firebase/app-check": "fire-app-check",
      "@firebase/app-check-compat": "fire-app-check-compat",
      "@firebase/auth": "fire-auth",
      "@firebase/auth-compat": "fire-auth-compat",
      "@firebase/database": "fire-rtdb",
      "@firebase/database-compat": "fire-rtdb-compat",
      "@firebase/functions": "fire-fn",
      "@firebase/functions-compat": "fire-fn-compat",
      "@firebase/installations": "fire-iid",
      "@firebase/installations-compat": "fire-iid-compat",
      "@firebase/messaging": "fire-fcm",
      "@firebase/messaging-compat": "fire-fcm-compat",
      "@firebase/performance": "fire-perf",
      "@firebase/performance-compat": "fire-perf-compat",
      "@firebase/remote-config": "fire-rc",
      "@firebase/remote-config-compat": "fire-rc-compat",
      "@firebase/storage": "fire-gcs",
      "@firebase/storage-compat": "fire-gcs-compat",
      "@firebase/firestore": "fire-fst",
      "@firebase/firestore-compat": "fire-fst-compat",
      "fire-js": "fire-js",
      firebase: "fire-js-all",
    },
    k = new Map(),
    H = new Map();
  function x(t, r) {
    try {
      t.container.addComponent(r);
    } catch (e) {
      R.debug(
        `Component ${r.name} failed to register with FirebaseApp ${t.name}`,
        e
      );
    }
  }
  function F(e, t) {
    e.container.addOrOverwriteComponent(t);
  }
  function z(e) {
    var t = e.name;
    if (H.has(t))
      return (
        R.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    H.set(t, e);
    for (const r of k.values()) x(r, e);
    return !0;
  }
  function V(e, t) {
    const r = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return r && r.triggerHeartbeat(), e.container.getProvider(t);
  }
  const U = new o("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "storage-open":
      "Error thrown when opening storage. Original error: {$originalErrorMessage}.",
    "storage-get":
      "Error thrown when reading from storage. Original error: {$originalErrorMessage}.",
    "storage-set":
      "Error thrown when writing to storage. Original error: {$originalErrorMessage}.",
    "storage-delete":
      "Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",
  });
  class W {
    constructor(e, t, r) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = r),
        this.container.addComponent(new y("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
    }
    get name() {
      return this.checkDestroyed(), this._name;
    }
    get options() {
      return this.checkDestroyed(), this._options;
    }
    get config() {
      return this.checkDestroyed(), this._config;
    }
    get container() {
      return this._container;
    }
    get isDeleted() {
      return this._isDeleted;
    }
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw U.create("app-deleted", { appName: this._name });
    }
  }
  const G = "9.6.10";
  function J(e, t = {}) {
    if ("object" != typeof t) {
      const n = t;
      t = { name: n };
    }
    var r = Object.assign({ name: M, automaticDataCollectionEnabled: !1 }, t);
    const n = r.name;
    if ("string" != typeof n || !n)
      throw U.create("bad-app-name", { appName: String(n) });
    var a = k.get(n);
    if (a) {
      if (d(e, a.options) && d(r, a.config)) return a;
      throw U.create("duplicate-app", { appName: n });
    }
    const i = new I(n);
    for (const s of H.values()) i.addComponent(s);
    r = new W(e, r, i);
    return k.set(n, r), r;
  }
  async function Y(e) {
    var t = e.name;
    k.has(t) &&
      (k.delete(t),
      await Promise.all(e.container.getProviders().map((e) => e.delete())),
      (e.isDeleted = !0));
  }
  function K(e, t, r) {
    let n = null !== (i = j[e]) && void 0 !== i ? i : e;
    r && (n += `-${r}`);
    var a = n.match(/\s|\//),
      i = t.match(/\s|\//);
    if (a || i) {
      const s = [`Unable to register library "${n}" with version "${t}":`];
      return (
        a &&
          s.push(
            `library name "${n}" contains illegal characters (whitespace or "/")`
          ),
        a && i && s.push("and"),
        i &&
          s.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`
          ),
        void R.warn(s.join(" "))
      );
    }
    z(new y(`${n}-version`, () => ({ library: n, version: t }), "VERSION"));
  }
  function X(e, t) {
    if (null !== e && "function" != typeof e)
      throw U.create("invalid-log-argument");
    !(function (i, e) {
      for (const t of S) {
        let a = null;
        e && e.level && (a = D[e.level]),
          (t.userLogHandler =
            null === i
              ? null
              : (e, t, ...r) => {
                  var n = r
                    .map((e) => {
                      if (null == e) return null;
                      if ("string" == typeof e) return e;
                      if ("number" == typeof e || "boolean" == typeof e)
                        return e.toString();
                      if (e instanceof Error) return e.message;
                      try {
                        return JSON.stringify(e);
                      } catch (e) {
                        return null;
                      }
                    })
                    .filter((e) => e)
                    .join(" ");
                  t >= (null !== a && void 0 !== a ? a : e.logLevel) &&
                    i({
                      level: O[t].toLowerCase(),
                      message: n,
                      args: r,
                      type: e.name,
                    });
                });
      }
    })(e, t);
  }
  function Z(e) {
    var t;
    (t = e),
      S.forEach((e) => {
        e.setLogLevel(t);
      });
  }
  const q = "firebase-heartbeat-database",
    Q = 1,
    ee = "firebase-heartbeat-store";
  let te = null;
  function re() {
    var e, a, i;
    return (
      (te =
        te ||
        ((e = q),
        (a = Q),
        (i = (e, t) => {
          0 === t && e.createObjectStore(ee);
        }),
        new Promise((t, r) => {
          try {
            const n = indexedDB.open(e, a);
            (n.onsuccess = (e) => {
              t(new b(e.target.result));
            }),
              (n.onerror = (e) => {
                var t;
                r(
                  `Error opening indexedDB: ${
                    null === (t = e.target.error) || void 0 === t
                      ? void 0
                      : t.message
                  }`
                );
              }),
              (n.onupgradeneeded = (e) => {
                i(
                  new b(n.result),
                  e.oldVersion,
                  e.newVersion,
                  new v(n.transaction)
                );
              });
          } catch (e) {
            r(`Error opening indexedDB: ${e.message}`);
          }
        }).catch((e) => {
          throw U.create("storage-open", { originalErrorMessage: e.message });
        }))),
      te
    );
  }
  async function ne(e, t) {
    try {
      const r = await re(),
        n = r.transaction(ee, "readwrite"),
        a = n.objectStore(ee);
      return await a.put(t, ae(e)), n.complete;
    } catch (e) {
      throw U.create("storage-set", { originalErrorMessage: e.message });
    }
  }
  function ae(e) {
    return `${e.name}!${e.options.appId}`;
  }
  class ie {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      var t = this.container.getProvider("app").getImmediate();
      (this._storage = new oe(t)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => (this._heartbeatsCache = e)));
    }
    async triggerHeartbeat() {
      const e = this.container.getProvider("platform-logger").getImmediate();
      var t = e.getPlatformInfoString();
      const r = se();
      if (
        (null === this._heartbeatsCache &&
          (this._heartbeatsCache = await this._heartbeatsCachePromise),
        this._heartbeatsCache.lastSentHeartbeatDate !== r &&
          !this._heartbeatsCache.heartbeats.some((e) => e.date === r))
      )
        return (
          this._heartbeatsCache.heartbeats.push({ date: r, agent: t }),
          (this._heartbeatsCache.heartbeats =
            this._heartbeatsCache.heartbeats.filter((e) => {
              var t = new Date(e.date).valueOf();
              return Date.now() - t <= 2592e6;
            })),
          this._storage.overwrite(this._heartbeatsCache)
        );
    }
    async getHeartbeatsHeader() {
      if (
        (null === this._heartbeatsCache && (await this._heartbeatsCachePromise),
        null === this._heartbeatsCache ||
          0 === this._heartbeatsCache.heartbeats.length)
      )
        return "";
      var e = se(),
        { heartbeatsToSend: t, unsentEntries: r } = (function (e, t = 1024) {
          const r = [];
          let n = e.slice();
          for (const a of e) {
            const i = r.find((e) => e.agent === a.agent);
            if (i) {
              if ((i.dates.push(a.date), ce(r) > t)) {
                i.dates.pop();
                break;
              }
            } else if (
              (r.push({ agent: a.agent, dates: [a.date] }), ce(r) > t)
            ) {
              r.pop();
              break;
            }
            n = n.slice(1);
          }
          return { heartbeatsToSend: r, unsentEntries: n };
        })(this._heartbeatsCache.heartbeats),
        t = a(JSON.stringify({ version: 2, heartbeats: t }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = e),
        0 < r.length
          ? ((this._heartbeatsCache.heartbeats = r),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        t
      );
    }
  }
  function se() {
    const e = new Date();
    return e.toISOString().substring(0, 10);
  }
  class oe {
    constructor(e) {
      (this.app = e),
        (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
      return (
        "object" == typeof indexedDB &&
        new Promise((t, r) => {
          try {
            let e = !0;
            const n = "validate-browser-context-for-indexeddb-analytics-module",
              a = self.indexedDB.open(n);
            (a.onsuccess = () => {
              a.result.close(), e || self.indexedDB.deleteDatabase(n), t(!0);
            }),
              (a.onupgradeneeded = () => {
                e = !1;
              }),
              (a.onerror = () => {
                var e;
                r(
                  (null === (e = a.error) || void 0 === e
                    ? void 0
                    : e.message) || ""
                );
              });
          } catch (e) {
            r(e);
          }
        })
          .then(() => !0)
          .catch(() => !1)
      );
    }
    async read() {
      return (
        ((await this._canUseIndexedDBPromise) &&
          (await (async function (e) {
            try {
              const t = await re();
              return t.transaction(ee).objectStore(ee).get(ae(e));
            } catch (e) {
              throw U.create("storage-get", {
                originalErrorMessage: e.message,
              });
            }
          })(this.app))) || { heartbeats: [] }
      );
    }
    async overwrite(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        var r = await this.read();
        return ne(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: e.heartbeats,
        });
      }
    }
    async add(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        var r = await this.read();
        return ne(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: [...r.heartbeats, ...e.heartbeats],
        });
      }
    }
  }
  function ce(e) {
    return a(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  ($ = ""),
    z(new y("platform-logger", (e) => new P(e), "PRIVATE")),
    z(new y("heartbeat", (e) => new ie(e), "PRIVATE")),
    K(T, B, $),
    K(T, B, "esm2017"),
    K("fire-js", "");
  var he = Object.freeze({
    __proto__: null,
    SDK_VERSION: G,
    _DEFAULT_ENTRY_NAME: M,
    _addComponent: x,
    _addOrOverwriteComponent: F,
    _apps: k,
    _clearComponents: function () {
      H.clear();
    },
    _components: H,
    _getProvider: V,
    _registerComponent: z,
    _removeServiceInstance: function (e, t, r = M) {
      V(e, t).clearInstance(r);
    },
    deleteApp: Y,
    getApp: function (e = M) {
      var t = k.get(e);
      if (!t) throw U.create("no-app", { appName: e });
      return t;
    },
    getApps: function () {
      return Array.from(k.values());
    },
    initializeApp: J,
    onLog: X,
    registerVersion: K,
    setLogLevel: Z,
    FirebaseError: s,
  });
  class le {
    constructor(e, t) {
      (this._delegate = e),
        (this.firebase = t),
        x(e, new y("app-compat", () => this, "PUBLIC")),
        (this.container = e.container);
    }
    get automaticDataCollectionEnabled() {
      return this._delegate.automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this._delegate.automaticDataCollectionEnabled = e;
    }
    get name() {
      return this._delegate.name;
    }
    get options() {
      return this._delegate.options;
    }
    delete() {
      return new Promise((e) => {
        this._delegate.checkDestroyed(), e();
      }).then(
        () => (this.firebase.INTERNAL.removeApp(this.name), Y(this._delegate))
      );
    }
    _getService(e, t = M) {
      var r;
      this._delegate.checkDestroyed();
      const n = this._delegate.container.getProvider(e);
      return (
        n.isInitialized() ||
          "EXPLICIT" !==
            (null === (r = n.getComponent()) || void 0 === r
              ? void 0
              : r.instantiationMode) ||
          n.initialize(),
        n.getImmediate({ identifier: t })
      );
    }
    _removeServiceInstance(e, t = M) {
      this._delegate.container.getProvider(e).clearInstance(t);
    }
    _addComponent(e) {
      x(this._delegate, e);
    }
    _addOrOverwriteComponent(e) {
      F(this._delegate, e);
    }
    toJSON() {
      return {
        name: this.name,
        automaticDataCollectionEnabled: this.automaticDataCollectionEnabled,
        options: this.options,
      };
    }
  }
  const de = new o("app-compat", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  });
  function pe(a) {
    const i = {},
      s = {
        __esModule: !0,
        initializeApp: function (e, t = {}) {
          var r = J(e, t);
          if (l(i, r.name)) return i[r.name];
          var n = new a(r, s);
          return (i[r.name] = n);
        },
        app: o,
        registerVersion: K,
        setLogLevel: Z,
        onLog: X,
        apps: null,
        SDK_VERSION: G,
        INTERNAL: {
          registerComponent: function (r) {
            const n = r.name,
              t = n.replace("-compat", "");
            {
              var e;
              z(r) &&
                "PUBLIC" === r.type &&
                ((e = (e = o()) => {
                  if ("function" != typeof e[t])
                    throw de.create("invalid-app-argument", { appName: n });
                  return e[t]();
                }),
                void 0 !== r.serviceProps && c(e, r.serviceProps),
                (s[t] = e),
                (a.prototype[t] = function (...e) {
                  const t = this._getService.bind(this, n);
                  return t.apply(this, r.multipleInstances ? e : []);
                }));
            }
            return "PUBLIC" === r.type ? s[t] : null;
          },
          removeApp: function (e) {
            delete i[e];
          },
          useAsService: function (e, t) {
            if ("serverAuth" === t) return null;
            var r = t;
            return r;
          },
          modularAPIs: he,
        },
      };
    function o(e) {
      if (((e = e || M), !l(i, e))) throw de.create("no-app", { appName: e });
      return i[e];
    }
    return (
      (s.default = s),
      Object.defineProperty(s, "apps", {
        get: function () {
          return Object.keys(i).map((e) => i[e]);
        },
      }),
      (o.App = a),
      s
    );
  }
  var ue = (function e() {
    const t = pe(le);
    return (
      (t.INTERNAL = Object.assign(Object.assign({}, t.INTERNAL), {
        createFirebaseNamespace: e,
        extendNamespace: function (e) {
          c(t, e);
        },
        createSubscribe: u,
        ErrorFactory: o,
        deepExtend: c,
      })),
      t
    );
  })();
  const fe = new L("@firebase/app-compat");
  if (
    "object" == typeof self &&
    self.self === self &&
    void 0 !== self.firebase
  ) {
    fe.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);
    const me = self.firebase.SDK_VERSION;
    me &&
      0 <= me.indexOf("LITE") &&
      fe.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `);
  }
  const ge = ue;
  K("@firebase/app-compat", "0.1.21", void 0);
  return ge.registerVersion("firebase", "9.6.10", "app-compat-cdn"), ge;
});
//# sourceMappingURL=firebase-app-compat.js.map
