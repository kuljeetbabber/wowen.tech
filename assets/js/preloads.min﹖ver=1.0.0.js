this.createjs = this.createjs || {},
    function() {
        "use strict";
        var a = createjs.PreloadJS = createjs.PreloadJS || {};
        a.version = "1.0.0", a.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT"
    }(), this.createjs = this.createjs || {}, createjs.extend = function(a, b) {
        "use strict";

        function c() {
            this.constructor = a
        }
        return c.prototype = b.prototype, a.prototype = new c
    }, this.createjs = this.createjs || {}, createjs.promote = function(a, b) {
        "use strict";
        var c = a.prototype,
            d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;
        if (d) {
            c[(b += "_") + "constructor"] = d.constructor;
            for (var e in d) c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e])
        }
        return a
    }, this.createjs = this.createjs || {}, createjs.deprecate = function(a, b) {
        "use strict";
        return function() {
            var c = "Deprecated property or method '" + b + "'. See docs for info.";
            return console && (console.warn ? console.warn(c) : console.log(c)), a && a.apply(this, arguments)
        }
    }, this.createjs = this.createjs || {},
    function() {
        "use strict";
        createjs.proxy = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 2);
            return function() {
                return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
            }
        }
    }(), this.createjs = this.createjs || {}, createjs.indexOf = function(a, b) {
        "use strict";
        for (var c = 0, d = a.length; d > c; c++)
            if (b === a[c]) return c;
        return -1
    }, this.createjs = this.createjs || {},
    function() {
        "use strict";

        function Event(a, b, c) {
            this.type = a, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!b, this.cancelable = !!c, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
        }
        var a = Event.prototype;
        a.preventDefault = function() {
            this.defaultPrevented = this.cancelable && !0
        }, a.stopPropagation = function() {
            this.propagationStopped = !0
        }, a.stopImmediatePropagation = function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        }, a.remove = function() {
            this.removed = !0
        }, a.clone = function() {
            return new Event(this.type, this.bubbles, this.cancelable)
        }, a.set = function(a) {
            for (var b in a) this[b] = a[b];
            return this
        }, a.toString = function() {
            return "[Event (type=" + this.type + ")]"
        }, createjs.Event = Event
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function ErrorEvent(a, b, c) {
            this.Event_constructor("error"), this.title = a, this.message = b, this.data = c
        }
        var a = createjs.extend(ErrorEvent, createjs.Event);
        a.clone = function() {
            return new createjs.ErrorEvent(this.title, this.message, this.data)
        }, createjs.ErrorEvent = createjs.promote(ErrorEvent, "Event")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function EventDispatcher() {
            this._listeners = null, this._captureListeners = null
        }
        var a = EventDispatcher.prototype;
        EventDispatcher.initialize = function(b) {
            b.addEventListener = a.addEventListener, b.on = a.on, b.removeEventListener = b.off = a.removeEventListener, b.removeAllEventListeners = a.removeAllEventListeners, b.hasEventListener = a.hasEventListener, b.dispatchEvent = a.dispatchEvent, b._dispatchEvent = a._dispatchEvent, b.willTrigger = a.willTrigger
        }, a.addEventListener = function(a, b, c) {
            var d;
            d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
            var e = d[a];
            return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
        }, a.on = function(a, b, c, d, e, f) {
            return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
                b.call(c, a, e), d && a.remove()
            }, f)
        }, a.removeEventListener = function(a, b, c) {
            var d = c ? this._captureListeners : this._listeners;
            if (d) {
                var e = d[a];
                if (e)
                    for (var f = 0, g = e.length; g > f; f++)
                        if (e[f] == b) {
                            1 == g ? delete d[a] : e.splice(f, 1);
                            break
                        }
            }
        }, a.off = a.removeEventListener, a.removeAllEventListeners = function(a) {
            a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
        }, a.dispatchEvent = function(a, b, c) {
            if ("string" == typeof a) {
                var d = this._listeners;
                if (!(b || d && d[a])) return !0;
                a = new createjs.Event(a, b, c)
            } else a.target && a.clone && (a = a.clone());
            try {
                a.target = this
            } catch (e) {}
            if (a.bubbles && this.parent) {
                for (var f = this, g = [f]; f.parent;) g.push(f = f.parent);
                var h, i = g.length;
                for (h = i - 1; h >= 0 && !a.propagationStopped; h--) g[h]._dispatchEvent(a, 1 + (0 == h));
                for (h = 1; i > h && !a.propagationStopped; h++) g[h]._dispatchEvent(a, 3)
            } else this._dispatchEvent(a, 2);
            return !a.defaultPrevented
        }, a.hasEventListener = function(a) {
            var b = this._listeners,
                c = this._captureListeners;
            return !!(b && b[a] || c && c[a])
        }, a.willTrigger = function(a) {
            for (var b = this; b;) {
                if (b.hasEventListener(a)) return !0;
                b = b.parent
            }
            return !1
        }, a.toString = function() {
            return "[EventDispatcher]"
        }, a._dispatchEvent = function(a, b) {
            var c, d, e = 2 >= b ? this._captureListeners : this._listeners;
            if (a && e && (d = e[a.type]) && (c = d.length)) {
                try {
                    a.currentTarget = this
                } catch (f) {}
                try {
                    a.eventPhase = 0 | b
                } catch (f) {}
                a.removed = !1, d = d.slice();
                for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                    var h = d[g];
                    h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1)
                }
            }
            2 === b && this._dispatchEvent(a, 2.1)
        }, createjs.EventDispatcher = EventDispatcher
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function ProgressEvent(a, b) {
            this.Event_constructor("progress"), this.loaded = a, this.total = null == b ? 1 : b, this.progress = 0 == b ? 0 : this.loaded / this.total
        }
        var a = createjs.extend(ProgressEvent, createjs.Event);
        a.clone = function() {
            return new createjs.ProgressEvent(this.loaded, this.total)
        }, createjs.ProgressEvent = createjs.promote(ProgressEvent, "Event")
    }(window),
    function() {
        function a(b, d) {
            function f(a) {
                if (f[a] !== q) return f[a];
                var b;
                if ("bug-string-char-index" == a) b = "a" != "a" [0];
                else if ("json" == a) b = f("json-stringify") && f("json-parse");
                else {
                    var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == a) {
                        var i = d.stringify,
                            k = "function" == typeof i && t;
                        if (k) {
                            (c = function() {
                                return 1
                            }).toJSON = c;
                            try {
                                k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({
                                    a: [c, !0, !1, null, "\x00\b\n\f\r	"]
                                }) == e && "1" === i(null, c) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1))
                            } catch (l) {
                                k = !1
                            }
                        }
                        b = k
                    }
                    if ("json-parse" == a) {
                        var m = d.parse;
                        if ("function" == typeof m) try {
                            if (0 === m("0") && !m(!1)) {
                                c = m(e);
                                var n = 5 == c.a.length && 1 === c.a[0];
                                if (n) {
                                    try {
                                        n = !m('"	"')
                                    } catch (l) {}
                                    if (n) try {
                                        n = 1 !== m("01")
                                    } catch (l) {}
                                    if (n) try {
                                        n = 1 !== m("1.")
                                    } catch (l) {}
                                }
                            }
                        } catch (l) {
                            n = !1
                        }
                        b = n
                    }
                }
                return f[a] = !!b
            }
            b || (b = e.Object()), d || (d = e.Object());
            var g = b.Number || e.Number,
                h = b.String || e.String,
                i = b.Object || e.Object,
                j = b.Date || e.Date,
                k = b.SyntaxError || e.SyntaxError,
                l = b.TypeError || e.TypeError,
                m = b.Math || e.Math,
                n = b.JSON || e.JSON;
            "object" == typeof n && n && (d.stringify = n.stringify, d.parse = n.parse);
            var o, p, q, r = i.prototype,
                s = r.toString,
                t = new j(-0xc782b5b800cec);
            try {
                t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
            } catch (u) {}
            if (!f("json")) {
                var v = "[object Function]",
                    w = "[object Date]",
                    x = "[object Number]",
                    y = "[object String]",
                    z = "[object Array]",
                    A = "[object Boolean]",
                    B = f("bug-string-char-index");
                if (!t) var C = m.floor,
                    D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                    E = function(a, b) {
                        return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
                    };
                if ((o = r.hasOwnProperty) || (o = function(a) {
                        var b, c = {};
                        return (c.__proto__ = null, c.__proto__ = {
                            toString: 1
                        }, c).toString != s ? o = function(a) {
                            var b = this.__proto__,
                                c = a in (this.__proto__ = null, this);
                            return this.__proto__ = b, c
                        } : (b = c.constructor, o = function(a) {
                            var c = (this.constructor || b).prototype;
                            return a in this && !(a in c && this[a] === c[a])
                        }), c = null, o.call(this, a)
                    }), p = function(a, b) {
                        var d, e, f, g = 0;
                        (d = function() {
                            this.valueOf = 0
                        }).prototype.valueOf = 0, e = new d;
                        for (f in e) o.call(e, f) && g++;
                        return d = e = null, g ? p = 2 == g ? function(a, b) {
                            var c, d = {},
                                e = s.call(a) == v;
                            for (c in a) e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                        } : function(a, b) {
                            var c, d, e = s.call(a) == v;
                            for (c in a) e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                            (d || o.call(a, c = "constructor")) && b(c)
                        } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function(a, b) {
                            var d, f, g = s.call(a) == v,
                                h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                            for (d in a) g && "prototype" == d || !h.call(a, d) || b(d);
                            for (f = e.length; d = e[--f]; h.call(a, d) && b(d));
                        }), p(a, b)
                    }, !f("json-stringify")) {
                    var F = {
                            92: "\\\\",
                            34: '\\"',
                            8: "\\b",
                            12: "\\f",
                            10: "\\n",
                            13: "\\r",
                            9: "\\t"
                        },
                        G = "000000",
                        H = function(a, b) {
                            return (G + (b || 0)).slice(-a)
                        },
                        I = "\\u00",
                        J = function(a) {
                            for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) {
                                var g = a.charCodeAt(c);
                                switch (g) {
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 13:
                                    case 34:
                                    case 92:
                                        b += F[g];
                                        break;
                                    default:
                                        if (32 > g) {
                                            b += I + H(2, g.toString(16));
                                            break
                                        }
                                        b += e ? f[c] : a.charAt(c)
                                }
                            }
                            return b + '"'
                        },
                        K = function(a, b, c, d, e, f, g) {
                            var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L;
                            try {
                                h = b[a]
                            } catch (M) {}
                            if ("object" == typeof h && h)
                                if (i = s.call(h), i != w || o.call(h, "toJSON")) "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a));
                                else if (h > -1 / 0 && 1 / 0 > h) {
                                if (E) {
                                    for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++);
                                    for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++);
                                    m = 1 + m - E(j, k), n = (h % 864e5 + 864e5) % 864e5, r = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3
                                } else j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
                                h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
                            } else h = null;
                            if (c && (h = c.call(b, a, h)), null === h) return "null";
                            if (i = s.call(h), i == A) return "" + h;
                            if (i == x) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                            if (i == y) return J("" + h);
                            if ("object" == typeof h) {
                                for (G = g.length; G--;)
                                    if (g[G] === h) throw l();
                                if (g.push(h), B = [], I = f, f += e, i == z) {
                                    for (F = 0, G = h.length; G > F; F++) D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D);
                                    L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
                                } else p(d || h, function(a) {
                                    var b = K(a, h, c, d, e, f, g);
                                    b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
                                }), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
                                return g.pop(), L
                            }
                        };
                    d.stringify = function(a, b, d) {
                        var e, f, g, h;
                        if (c[typeof b] && b)
                            if ((h = s.call(b)) == v) f = b;
                            else if (h == z) {
                            g = {};
                            for (var i, j = 0, k = b.length; k > j; i = b[j++], h = s.call(i), (h == y || h == x) && (g[i] = 1));
                        }
                        if (d)
                            if ((h = s.call(d)) == x) {
                                if ((d -= d % 1) > 0)
                                    for (e = "", d > 10 && (d = 10); e.length < d; e += " ");
                            } else h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
                        return K("", (i = {}, i[""] = a, i), f, g, e, "", [])
                    }
                }
                if (!f("json-parse")) {
                    var L, M, N = h.fromCharCode,
                        O = {
                            92: "\\",
                            34: '"',
                            47: "/",
                            98: "\b",
                            116: "	",
                            110: "\n",
                            102: "\f",
                            114: "\r"
                        },
                        P = function() {
                            throw L = M = null, k()
                        },
                        Q = function() {
                            for (var a, b, c, d, e, f = M, g = f.length; g > L;) switch (e = f.charCodeAt(L)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    L++;
                                    break;
                                case 123:
                                case 125:
                                case 91:
                                case 93:
                                case 58:
                                case 44:
                                    return a = B ? f.charAt(L) : f[L], L++, a;
                                case 34:
                                    for (a = "@", L++; g > L;)
                                        if (e = f.charCodeAt(L), 32 > e) P();
                                        else if (92 == e) switch (e = f.charCodeAt(++L)) {
                                        case 92:
                                        case 34:
                                        case 47:
                                        case 98:
                                        case 116:
                                        case 110:
                                        case 102:
                                        case 114:
                                            a += O[e], L++;
                                            break;
                                        case 117:
                                            for (b = ++L, c = L + 4; c > L; L++) e = f.charCodeAt(L), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P();
                                            a += N("0x" + f.slice(b, L));
                                            break;
                                        default:
                                            P()
                                    } else {
                                        if (34 == e) break;
                                        for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e;) e = f.charCodeAt(++L);
                                        a += f.slice(b, L)
                                    }
                                    if (34 == f.charCodeAt(L)) return L++, a;
                                    P();
                                default:
                                    if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && 57 >= e) {
                                        for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && 57 >= e) && P(), d = !1; g > L && (e = f.charCodeAt(L), e >= 48 && 57 >= e); L++);
                                        if (46 == f.charCodeAt(L)) {
                                            for (c = ++L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                            c == L && P(), L = c
                                        }
                                        if (e = f.charCodeAt(L), 101 == e || 69 == e) {
                                            for (e = f.charCodeAt(++L), (43 == e || 45 == e) && L++, c = L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                            c == L && P(), L = c
                                        }
                                        return +f.slice(b, L)
                                    }
                                    if (d && P(), "true" == f.slice(L, L + 4)) return L += 4, !0;
                                    if ("false" == f.slice(L, L + 5)) return L += 5, !1;
                                    if ("null" == f.slice(L, L + 4)) return L += 4, null;
                                    P()
                            }
                            return "$"
                        },
                        R = function(a) {
                            var b, c;
                            if ("$" == a && P(), "string" == typeof a) {
                                if ("@" == (B ? a.charAt(0) : a[0])) return a.slice(1);
                                if ("[" == a) {
                                    for (b = []; a = Q(), "]" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
                                    return b
                                }
                                if ("{" == a) {
                                    for (b = {}; a = Q(), "}" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q());
                                    return b
                                }
                                P()
                            }
                            return a
                        },
                        S = function(a, b, c) {
                            var d = T(a, b, c);
                            d === q ? delete a[b] : a[b] = d
                        },
                        T = function(a, b, c) {
                            var d, e = a[b];
                            if ("object" == typeof e && e)
                                if (s.call(e) == z)
                                    for (d = e.length; d--;) S(e, d, c);
                                else p(e, function(a) {
                                    S(e, a, c)
                                });
                            return c.call(a, b, e)
                        };
                    d.parse = function(a, b) {
                        var c, d;
                        return L = 0, M = "" + a, c = R(Q()), "$" != Q() && P(), L = M = null, b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
                    }
                }
            }
            return d.runInContext = a, d
        }
        var b = "function" == typeof define && define.amd,
            c = {
                "function": !0,
                object: !0
            },
            d = c[typeof exports] && exports && !exports.nodeType && exports,
            e = c[typeof window] && window || this,
            f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global;
        if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f), d && !b) a(e, d);
        else {
            var g = e.JSON,
                h = e.JSON3,
                i = !1,
                j = a(e, e.JSON3 = {
                    noConflict: function() {
                        return i || (i = !0, e.JSON = g, e.JSON3 = h, g = h = null), j
                    }
                });
            e.JSON = {
                parse: j.parse,
                stringify: j.stringify
            }
        }
        b && define(function() {
            return j
        })
    }.call(this),
    function() {
        var a = {};
        a.a = function() {
            return a.el("a")
        }, a.svg = function() {
            return a.el("svg")
        }, a.object = function() {
            return a.el("object")
        }, a.image = function() {
            return a.el("image")
        }, a.img = function() {
            return a.el("img")
        }, a.style = function() {
            return a.el("style")
        }, a.link = function() {
            return a.el("link")
        }, a.script = function() {
            return a.el("script")
        }, a.audio = function() {
            return a.el("audio")
        }, a.video = function() {
            return a.el("video")
        }, a.text = function(a) {
            return document.createTextNode(a)
        }, a.el = function(a) {
            return document.createElement(a)
        }, createjs.Elements = a
    }(),
    function() {
        var a = {};
        a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, a.RELATIVE_PATT = /^[.\/]*?\//i, a.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i, a.parseURI = function(b) {
            var c = {
                absolute: !1,
                relative: !1,
                protocol: null,
                hostname: null,
                port: null,
                pathname: null,
                search: null,
                hash: null,
                host: null
            };
            if (null == b) return c;
            var d = createjs.Elements.a();
            d.href = b;
            for (var e in c) e in d && (c[e] = d[e]);
            var f = b.indexOf("?");
            f > -1 && (b = b.substr(0, f));
            var g;
            return a.ABSOLUTE_PATT.test(b) ? c.absolute = !0 : a.RELATIVE_PATT.test(b) && (c.relative = !0), (g = b.match(a.EXTENSION_PATT)) && (c.extension = g[1].toLowerCase()), c
        }, a.formatQueryString = function(a, b) {
            if (null == a) throw new Error("You must specify data.");
            var c = [];
            for (var d in a) c.push(d + "=" + escape(a[d]));
            return b && (c = c.concat(b)), c.join("&")
        }, a.buildURI = function(a, b) {
            if (null == b) return a;
            var c = [],
                d = a.indexOf("?");
            if (-1 != d) {
                var e = a.slice(d + 1);
                c = c.concat(e.split("&"))
            }
            return -1 != d ? a.slice(0, d) + "?" + this.formatQueryString(b, c) : a + "?" + this.formatQueryString(b, c)
        }, a.isCrossDomain = function(a) {
            var b = createjs.Elements.a();
            b.href = a.src;
            var c = createjs.Elements.a();
            c.href = location.href;
            var d = "" != b.hostname && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname);
            return d
        }, a.isLocal = function(a) {
            var b = createjs.Elements.a();
            return b.href = a.src, "" == b.hostname && "file:" == b.protocol
        }, createjs.URLUtils = a
    }(),
    function() {
        var a = {
            container: null
        };
        a.appendToHead = function(b) {
            a.getHead().appendChild(b)
        }, a.appendToBody = function(b) {
            if (null == a.container) {
                a.container = document.createElement("div"), a.container.id = "preloadjs-container";
                var c = a.container.style;
                c.visibility = "hidden", c.position = "absolute", c.width = a.container.style.height = "10px", c.overflow = "hidden", c.transform = c.msTransform = c.webkitTransform = c.oTransform = "translate(-10px, -10px)", a.getBody().appendChild(a.container)
            }
            a.container.appendChild(b)
        }, a.getHead = function() {
            return document.head || document.getElementsByTagName("head")[0]
        }, a.getBody = function() {
            return document.body || document.getElementsByTagName("body")[0]
        }, a.removeChild = function(a) {
            a.parent && a.parent.removeChild(a)
        }, a.isImageTag = function(a) {
            return a instanceof HTMLImageElement
        }, a.isAudioTag = function(a) {
            return window.HTMLAudioElement ? a instanceof HTMLAudioElement : !1
        }, a.isVideoTag = function(a) {
            return window.HTMLVideoElement ? a instanceof HTMLVideoElement : !1
        }, createjs.DomUtils = a
    }(),
    function() {
        var a = {};
        a.parseXML = function(a) {
            var b = null;
            try {
                if (window.DOMParser) {
                    var c = new DOMParser;
                    b = c.parseFromString(a, "text/xml")
                }
            } catch (d) {}
            if (!b) try {
                b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.loadXML(a)
            } catch (d) {
                b = null
            }
            return b
        }, a.parseJSON = function(a) {
            if (null == a) return null;
            try {
                return JSON.parse(a)
            } catch (b) {
                throw b
            }
        }, createjs.DataUtils = a
    }(), this.createjs = this.createjs || {},
    function() {
        var a = {};
        a.BINARY = "binary", a.CSS = "css", a.FONT = "font", a.FONTCSS = "fontcss", a.IMAGE = "image", a.JAVASCRIPT = "javascript", a.JSON = "json", a.JSONP = "jsonp", a.MANIFEST = "manifest", a.SOUND = "sound", a.VIDEO = "video", a.SPRITESHEET = "spritesheet", a.SVG = "svg", a.TEXT = "text", a.XML = "xml", createjs.Types = a
    }(), this.createjs = this.createjs || {},
    function() {
        var a = {};
        a.POST = "POST", a.GET = "GET", createjs.Methods = a
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function LoadItem() {
            this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.Methods.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = null, this.loadTimeout = b.LOAD_TIMEOUT_DEFAULT
        }
        var a = LoadItem.prototype = {},
            b = LoadItem;
        b.LOAD_TIMEOUT_DEFAULT = 8e3, b.create = function(a) {
            if ("string" == typeof a) {
                var c = new LoadItem;
                return c.src = a, c
            }
            if (a instanceof b) return a;
            if (a instanceof Object && a.src) return null == a.loadTimeout && (a.loadTimeout = b.LOAD_TIMEOUT_DEFAULT), a;
            throw new Error("Type not recognized.")
        }, a.set = function(a) {
            for (var b in a) this[b] = a[b];
            return this
        }, createjs.LoadItem = b
    }(),
    function() {
        var a = {};
        a.isBinary = function(a) {
            switch (a) {
                case createjs.Types.IMAGE:
                case createjs.Types.BINARY:
                    return !0;
                default:
                    return !1
            }
        }, a.isText = function(a) {
            switch (a) {
                case createjs.Types.TEXT:
                case createjs.Types.JSON:
                case createjs.Types.MANIFEST:
                case createjs.Types.XML:
                case createjs.Types.CSS:
                case createjs.Types.SVG:
                case createjs.Types.JAVASCRIPT:
                case createjs.Types.SPRITESHEET:
                    return !0;
                default:
                    return !1
            }
        }, a.getTypeByExtension = function(a) {
            if (null == a) return createjs.Types.TEXT;
            switch (a.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.Types.IMAGE;
                case "ogg":
                case "mp3":
                case "webm":
                    return createjs.Types.SOUND;
                case "mp4":
                case "webm":
                case "ts":
                    return createjs.Types.VIDEO;
                case "json":
                    return createjs.Types.JSON;
                case "xml":
                    return createjs.Types.XML;
                case "css":
                    return createjs.Types.CSS;
                case "js":
                    return createjs.Types.JAVASCRIPT;
                case "svg":
                    return createjs.Types.SVG;
                default:
                    return createjs.Types.TEXT
            }
        }, createjs.RequestUtils = a
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function AbstractLoader(a, b, c) {
            this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = c, this.resultFormatter = null, this._item = a ? createjs.LoadItem.create(a) : null, this._preferXHR = b, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
        }
        var a = createjs.extend(AbstractLoader, createjs.EventDispatcher),
            b = AbstractLoader;
        try {
            Object.defineProperties(b, {
                POST: {
                    get: createjs.deprecate(function() {
                        return createjs.Methods.POST
                    }, "AbstractLoader.POST")
                },
                GET: {
                    get: createjs.deprecate(function() {
                        return createjs.Methods.GET
                    }, "AbstractLoader.GET")
                },
                BINARY: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.BINARY
                    }, "AbstractLoader.BINARY")
                },
                CSS: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.CSS
                    }, "AbstractLoader.CSS")
                },
                FONT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.FONT
                    }, "AbstractLoader.FONT")
                },
                FONTCSS: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.FONTCSS
                    }, "AbstractLoader.FONTCSS")
                },
                IMAGE: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.IMAGE
                    }, "AbstractLoader.IMAGE")
                },
                JAVASCRIPT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JAVASCRIPT
                    }, "AbstractLoader.JAVASCRIPT")
                },
                JSON: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JSON
                    }, "AbstractLoader.JSON")
                },
                JSONP: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JSONP
                    }, "AbstractLoader.JSONP")
                },
                MANIFEST: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.MANIFEST
                    }, "AbstractLoader.MANIFEST")
                },
                SOUND: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SOUND
                    }, "AbstractLoader.SOUND")
                },
                VIDEO: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.VIDEO
                    }, "AbstractLoader.VIDEO")
                },
                SPRITESHEET: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SPRITESHEET
                    }, "AbstractLoader.SPRITESHEET")
                },
                SVG: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SVG
                    }, "AbstractLoader.SVG")
                },
                TEXT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.TEXT
                    }, "AbstractLoader.TEXT")
                },
                XML: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.XML
                    }, "AbstractLoader.XML")
                }
            })
        } catch (c) {}
        a.getItem = function() {
            return this._item
        }, a.getResult = function(a) {
            return a ? this._rawResult : this._result
        }, a.getTag = function() {
            return this._tag
        }, a.setTag = function(a) {
            this._tag = a
        }, a.load = function() {
            this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
            var a = new createjs.Event("initialize");
            a.loader = this._request, this.dispatchEvent(a), this._request.load()
        }, a.cancel = function() {
            this.canceled = !0, this.destroy()
        }, a.destroy = function() {
            this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
        }, a.getLoadedItems = function() {
            return this._loadedItems
        }, a._createRequest = function() {
            this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
        }, a._createTag = function() {
            return null
        }, a._sendLoadStart = function() {
            this._isCanceled() || this.dispatchEvent("loadstart")
        }, a._sendProgress = function(a) {
            if (!this._isCanceled()) {
                var b = null;
                "number" == typeof a ? (this.progress = a, b = new createjs.ProgressEvent(this.progress)) : (b = a, this.progress = a.loaded / a.total, b.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(b)
            }
        }, a._sendComplete = function() {
            if (!this._isCanceled()) {
                this.loaded = !0;
                var a = new createjs.Event("complete");
                a.rawResult = this._rawResult, null != this._result && (a.result = this._result), this.dispatchEvent(a)
            }
        }, a._sendError = function(a) {
            !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a))
        }, a._isCanceled = function() {
            return null == window.createjs || this.canceled ? !0 : !1
        }, a.resultFormatter = null, a.handleEvent = function(a) {
            switch (a.type) {
                case "complete":
                    this._rawResult = a.target._response;
                    var b = this.resultFormatter && this.resultFormatter(this);
                    b instanceof Function ? b.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = b || this._rawResult, this._sendComplete());
                    break;
                case "progress":
                    this._sendProgress(a);
                    break;
                case "error":
                    this._sendError(a);
                    break;
                case "loadstart":
                    this._sendLoadStart();
                    break;
                case "abort":
                case "timeout":
                    this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + a.type.toUpperCase() + "_ERROR"))
            }
        }, a._resultFormatSuccess = function(a) {
            this._result = a, this._sendComplete()
        }, a._resultFormatFailed = function(a) {
            this._sendError(a)
        }, a.toString = function() {
            return "[PreloadJS AbstractLoader]"
        }, createjs.AbstractLoader = createjs.promote(AbstractLoader, "EventDispatcher")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function AbstractMediaLoader(a, b, c) {
            this.AbstractLoader_constructor(a, b, c), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.on("initialize", this._updateXHR, this)
        }
        var a = createjs.extend(AbstractMediaLoader, createjs.AbstractLoader);
        a.load = function() {
            this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
        }, a._createTag = function() {}, a._createRequest = function() {
            this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
        }, a._updateXHR = function(a) {
            a.loader.setResponseType && a.loader.setResponseType("blob")
        }, a._formatResult = function(a) {
            if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR) {
                var b = window.URL || window.webkitURL,
                    c = a.getResult(!0);
                a.getTag().src = b.createObjectURL(c)
            }
            return a.getTag()
        }, createjs.AbstractMediaLoader = createjs.promote(AbstractMediaLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";
        var AbstractRequest = function(a) {
                this._item = a
            },
            a = createjs.extend(AbstractRequest, createjs.EventDispatcher);
        a.load = function() {}, a.destroy = function() {}, a.cancel = function() {}, createjs.AbstractRequest = createjs.promote(AbstractRequest, "EventDispatcher")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function TagRequest(a, b, c) {
            this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1
        }
        var a = createjs.extend(TagRequest, createjs.AbstractRequest);
        a.load = function() {
            this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this), this._tag.onerror = createjs.proxy(this._handleError, this);
            var a = new createjs.Event("initialize");
            a.loader = this._tag, this.dispatchEvent(a), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag[this._tagSrcAttribute] = this._item.src, null == this._tag.parentNode && (createjs.DomUtils.appendToBody(this._tag), this._addedToDOM = !0)
        }, a.destroy = function() {
            this._clean(), this._tag = null, this.AbstractRequest_destroy()
        }, a._handleReadyStateChange = function() {
            clearTimeout(this._loadTimeout);
            var a = this._tag;
            ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
        }, a._handleError = function() {
            this._clean(), this.dispatchEvent("error")
        }, a._handleTagComplete = function() {
            this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this.dispatchEvent("complete")
        }, a._handleTimeout = function() {
            this._clean(), this.dispatchEvent(new createjs.Event("timeout"))
        }, a._clean = function() {
            this._tag.onload = null, this._tag.onreadystatechange = null, this._tag.onerror = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout)
        }, a._handleStalled = function() {}, createjs.TagRequest = createjs.promote(TagRequest, "AbstractRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function MediaTagRequest(a, b, c) {
            this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
        }
        var a = createjs.extend(MediaTagRequest, createjs.TagRequest);
        a.load = function() {
            var a = createjs.proxy(this._handleStalled, this);
            this._stalledCallback = a;
            var b = createjs.proxy(this._handleProgress, this);
            this._handleProgress = b, this._tag.addEventListener("stalled", a), this._tag.addEventListener("progress", b), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
        }, a._handleReadyStateChange = function() {
            clearTimeout(this._loadTimeout);
            var a = this._tag;
            ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
        }, a._handleStalled = function() {}, a._handleProgress = function(a) {
            if (a && !(a.loaded > 0 && 0 == a.total)) {
                var b = new createjs.ProgressEvent(a.loaded, a.total);
                this.dispatchEvent(b)
            }
        }, a._clean = function() {
            this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.removeEventListener("stalled", this._stalledCallback), this._tag.removeEventListener("progress", this._progressCallback), this.TagRequest__clean()
        }, createjs.MediaTagRequest = createjs.promote(MediaTagRequest, "TagRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function XHRRequest(a) {
            this.AbstractRequest_constructor(a), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), !this._createXHR(a)
        }
        var a = createjs.extend(XHRRequest, createjs.AbstractRequest);
        XHRRequest.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], a.getResult = function(a) {
            return a && this._rawResponse ? this._rawResponse : this._response
        }, a.cancel = function() {
            this.canceled = !0, this._clean(), this._request.abort()
        }, a.load = function() {
            if (null == this._request) return void this._handleError();
            null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
            try {
                this._item.values ? this._request.send(createjs.URLUtils.formatQueryString(this._item.values)) : this._request.send()
            } catch (a) {
                this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a))
            }
        }, a.setResponseType = function(a) {
            "blob" === a && (a = window.URL ? "blob" : "arraybuffer", this._responseType = a), this._request.responseType = a
        }, a.getAllResponseHeaders = function() {
            return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
        }, a.getResponseHeader = function(a) {
            return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
        }, a._handleProgress = function(a) {
            if (a && !(a.loaded > 0 && 0 == a.total)) {
                var b = new createjs.ProgressEvent(a.loaded, a.total);
                this.dispatchEvent(b)
            }
        }, a._handleLoadStart = function() {
            clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
        }, a._handleAbort = function(a) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, a))
        }, a._handleError = function(a) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent(a.message))
        }, a._handleReadyStateChange = function() {
            4 == this._request.readyState && this._handleLoad()
        }, a._handleLoad = function() {
            if (!this.loaded) {
                this.loaded = !0;
                var a = this._checkError();
                if (a) return void this._handleError(a);
                if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                    this._response = new Blob([this._response])
                } catch (b) {
                    if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === b.name && window.BlobBuilder) {
                        var c = new BlobBuilder;
                        c.append(this._response), this._response = c.getBlob()
                    }
                }
                this._clean(), this.dispatchEvent(new createjs.Event("complete"))
            }
        }, a._handleTimeout = function(a) {
            this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a))
        }, a._checkError = function() {
            var a = parseInt(this._request.status);
            return a >= 400 && 599 >= a ? new Error(a) : 0 == a && /^https?:/.test(location.protocol) ? new Error(0) : null
        }, a._getResponse = function() {
            if (null != this._response) return this._response;
            if (null != this._request.response) return this._request.response;
            try {
                if (null != this._request.responseText) return this._request.responseText
            } catch (a) {}
            try {
                if (null != this._request.responseXML) return this._request.responseXML
            } catch (a) {}
            return null
        }, a._createXHR = function(a) {
            var b = createjs.URLUtils.isCrossDomain(a),
                c = {},
                d = null;
            if (window.XMLHttpRequest) d = new XMLHttpRequest, b && void 0 === d.withCredentials && window.XDomainRequest && (d = new XDomainRequest);
            else {
                for (var e = 0, f = s.ACTIVEX_VERSIONS.length; f > e; e++) {
                    var g = s.ACTIVEX_VERSIONS[e];
                    try {
                        d = new ActiveXObject(g);
                        break
                    } catch (h) {}
                }
                if (null == d) return !1
            }
            null == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8"), a.mimeType && d.overrideMimeType && d.overrideMimeType(a.mimeType), this._xhrLevel = "string" == typeof d.responseType ? 2 : 1;
            var i = null;
            if (i = a.method == createjs.Methods.GET ? createjs.URLUtils.buildURI(a.src, a.values) : a.src, d.open(a.method || createjs.Methods.GET, i, !0), b && d instanceof XMLHttpRequest && 1 == this._xhrLevel && (c.Origin = location.origin), a.values && a.method == createjs.Methods.POST && (c["Content-Type"] = "application/x-www-form-urlencoded"), b || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"), a.headers)
                for (var j in a.headers) c[j] = a.headers[j];
            for (j in c) d.setRequestHeader(j, c[j]);
            return d instanceof XMLHttpRequest && void 0 !== a.withCredentials && (d.withCredentials = a.withCredentials), this._request = d, !0
        }, a._clean = function() {
            clearTimeout(this._loadTimeout), null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
        }, a.toString = function() {
            return "[PreloadJS XHRRequest]"
        }, createjs.XHRRequest = createjs.promote(XHRRequest, "AbstractRequest")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function LoadQueue(a, b, c) {
            this.AbstractLoader_constructor(), this._plugins = [], this._typeCallbacks = {}, this._extensionCallbacks = {}, this.next = null, this.maintainScriptOrder = !0, this.stopOnError = !1, this._maxConnections = 1, this._availableLoaders = [createjs.FontLoader, createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader], this._defaultLoaderLength = this._availableLoaders.length, this.init(a, b, c)
        }
        var a = createjs.extend(LoadQueue, createjs.AbstractLoader),
            b = LoadQueue;
        try {
            Object.defineProperties(b, {
                POST: {
                    get: createjs.deprecate(function() {
                        return createjs.Methods.POST
                    }, "AbstractLoader.POST")
                },
                GET: {
                    get: createjs.deprecate(function() {
                        return createjs.Methods.GET
                    }, "AbstractLoader.GET")
                },
                BINARY: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.BINARY
                    }, "AbstractLoader.BINARY")
                },
                CSS: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.CSS
                    }, "AbstractLoader.CSS")
                },
                FONT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.FONT
                    }, "AbstractLoader.FONT")
                },
                FONTCSS: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.FONTCSS
                    }, "AbstractLoader.FONTCSS")
                },
                IMAGE: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.IMAGE
                    }, "AbstractLoader.IMAGE")
                },
                JAVASCRIPT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JAVASCRIPT
                    }, "AbstractLoader.JAVASCRIPT")
                },
                JSON: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JSON
                    }, "AbstractLoader.JSON")
                },
                JSONP: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.JSONP
                    }, "AbstractLoader.JSONP")
                },
                MANIFEST: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.MANIFEST
                    }, "AbstractLoader.MANIFEST")
                },
                SOUND: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SOUND
                    }, "AbstractLoader.SOUND")
                },
                VIDEO: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.VIDEO
                    }, "AbstractLoader.VIDEO")
                },
                SPRITESHEET: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SPRITESHEET
                    }, "AbstractLoader.SPRITESHEET")
                },
                SVG: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.SVG
                    }, "AbstractLoader.SVG")
                },
                TEXT: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.TEXT
                    }, "AbstractLoader.TEXT")
                },
                XML: {
                    get: createjs.deprecate(function() {
                        return createjs.Types.XML
                    }, "AbstractLoader.XML")
                }
            })
        } catch (c) {}
        a.init = function(a, b, c) {
            this.preferXHR = !0, this._preferXHR = !0, this.setPreferXHR(a), this._paused = !1, this._basePath = b, this._crossOrigin = c, this._loadStartWasDispatched = !1, this._currentlyLoadingScript = null, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._numItems = 0, this._numItemsLoaded = 0, this._scriptOrder = [], this._loadedScripts = [], this._lastProgress = 0 / 0
        }, a.registerLoader = function(a) {
            if (!a || !a.canLoadItem) throw new Error("loader is of an incorrect type.");
            if (-1 != this._availableLoaders.indexOf(a)) throw new Error("loader already exists.");
            this._availableLoaders.unshift(a)
        }, a.unregisterLoader = function(a) {
            var b = this._availableLoaders.indexOf(a); - 1 != b && b < this._defaultLoaderLength - 1 && this._availableLoaders.splice(b, 1)
        }, a.setPreferXHR = function(a) {
            return this.preferXHR = 0 != a && null != window.XMLHttpRequest, this.preferXHR
        }, a.removeAll = function() {
            this.remove()
        }, a.remove = function(a) {
            var b = null;
            if (a && !Array.isArray(a)) b = [a];
            else if (a) b = a;
            else if (arguments.length > 0) return;
            var c = !1;
            if (b) {
                for (; b.length;) {
                    var d = b.pop(),
                        e = this.getResult(d);
                    for (f = this._loadQueue.length - 1; f >= 0; f--)
                        if (g = this._loadQueue[f].getItem(), g.id == d || g.src == d) {
                            this._loadQueue.splice(f, 1)[0].cancel();
                            break
                        } for (f = this._loadQueueBackup.length - 1; f >= 0; f--)
                        if (g = this._loadQueueBackup[f].getItem(), g.id == d || g.src == d) {
                            this._loadQueueBackup.splice(f, 1)[0].cancel();
                            break
                        } if (e) this._disposeItem(this.getItem(d));
                    else
                        for (var f = this._currentLoads.length - 1; f >= 0; f--) {
                            var g = this._currentLoads[f].getItem();
                            if (g.id == d || g.src == d) {
                                this._currentLoads.splice(f, 1)[0].cancel(), c = !0;
                                break
                            }
                        }
                }
                c && this._loadNext()
            } else {
                this.close();
                for (var h in this._loadItemsById) this._disposeItem(this._loadItemsById[h]);
                this.init(this.preferXHR, this._basePath)
            }
        }, a.reset = function() {
            this.close();
            for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
            for (var b = [], c = 0, d = this._loadQueueBackup.length; d > c; c++) b.push(this._loadQueueBackup[c].getItem());
            this.loadManifest(b, !1)
        }, a.installPlugin = function(a) {
            if (null != a && null != a.getPreloadHandlers) {
                this._plugins.push(a);
                var b = a.getPreloadHandlers();
                if (b.scope = a, null != b.types)
                    for (var c = 0, d = b.types.length; d > c; c++) this._typeCallbacks[b.types[c]] = b;
                if (null != b.extensions)
                    for (c = 0, d = b.extensions.length; d > c; c++) this._extensionCallbacks[b.extensions[c]] = b
            }
        }, a.setMaxConnections = function(a) {
            this._maxConnections = a, !this._paused && this._loadQueue.length > 0 && this._loadNext()
        }, a.loadFile = function(a, b, c) {
            if (null == a) {
                var d = new createjs.ErrorEvent("PRELOAD_NO_FILE");
                return void this._sendError(d)
            }
            this._addItem(a, null, c), this.setPaused(b !== !1 ? !1 : !0)
        }, a.loadManifest = function(a, c, d) {
            var e = null,
                f = null;
            if (Array.isArray(a)) {
                if (0 == a.length) {
                    var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                    return void this._sendError(g)
                }
                e = a
            } else if ("string" == typeof a) e = [{
                src: a,
                type: b.MANIFEST
            }];
            else {
                if ("object" != typeof a) {
                    var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                    return void this._sendError(g)
                }
                if (void 0 !== a.src) {
                    if (null == a.type) a.type = b.MANIFEST;
                    else if (a.type != b.MANIFEST) {
                        var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                        this._sendError(g)
                    }
                    e = [a]
                } else void 0 !== a.manifest && (e = a.manifest, f = a.path)
            }
            for (var h = 0, i = e.length; i > h; h++) this._addItem(e[h], f, d);
            this.setPaused(c !== !1 ? !1 : !0)
        }, a.load = function() {
            this.setPaused(!1)
        }, a.getItem = function(a) {
            return this._loadItemsById[a] || this._loadItemsBySrc[a]
        }, a.getResult = function(a, b) {
            var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
            if (null == c) return null;
            var d = c.id;
            return b && this._loadedRawResults[d] ? this._loadedRawResults[d] : this._loadedResults[d]
        }, a.getItems = function(a) {
            var b = [];
            for (var c in this._loadItemsById) {
                var d = this._loadItemsById[c],
                    e = this.getResult(c);
                (a !== !0 || null != e) && b.push({
                    item: d,
                    result: e,
                    rawResult: this.getResult(c, !0)
                })
            }
            return b
        }, a.setPaused = function(a) {
            this._paused = a, this._paused || this._loadNext()
        }, a.close = function() {
            for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
            this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1, this._itemCount = 0, this._lastProgress = 0 / 0
        }, a._addItem = function(a, b, c) {
            var d = this._createLoadItem(a, b, c);
            if (null != d) {
                var e = this._createLoader(d);
                null != e && ("plugins" in e && (e.plugins = this._plugins), d._loader = e, this._loadQueue.push(e), this._loadQueueBackup.push(e), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && d.type == createjs.Types.JAVASCRIPT || d.maintainOrder === !0) && (this._scriptOrder.push(d), this._loadedScripts.push(null)))
            }
        }, a._createLoadItem = function(a, b, c) {
            var d = createjs.LoadItem.create(a);
            if (null == d) return null;
            var e = "",
                f = c || this._basePath;
            if (d.src instanceof Object) {
                if (!d.type) return null;
                if (b) {
                    e = b;
                    var g = createjs.URLUtils.parseURI(b);
                    null == f || g.absolute || g.relative || (e = f + e)
                } else null != f && (e = f)
            } else {
                var h = createjs.URLUtils.parseURI(d.src);
                h.extension && (d.ext = h.extension), null == d.type && (d.type = createjs.RequestUtils.getTypeByExtension(d.ext));
                var i = d.src;
                if (!h.absolute && !h.relative)
                    if (b) {
                        e = b;
                        var g = createjs.URLUtils.parseURI(b);
                        i = b + i, null == f || g.absolute || g.relative || (e = f + e)
                    } else null != f && (e = f);
                d.src = e + d.src
            }
            d.path = e, (void 0 === d.id || null === d.id || "" === d.id) && (d.id = i);
            var j = this._typeCallbacks[d.type] || this._extensionCallbacks[d.ext];
            if (j) {
                var k = j.callback.call(j.scope, d, this);
                if (k === !1) return null;
                k === !0 || null != k && (d._loader = k), h = createjs.URLUtils.parseURI(d.src), null != h.extension && (d.ext = h.extension)
            }
            return this._loadItemsById[d.id] = d, this._loadItemsBySrc[d.src] = d, null == d.crossOrigin && (d.crossOrigin = this._crossOrigin), d
        }, a._createLoader = function(a) {
            if (null != a._loader) return a._loader;
            for (var b = this.preferXHR, c = 0; c < this._availableLoaders.length; c++) {
                var d = this._availableLoaders[c];
                if (d && d.canLoadItem(a)) return new d(a, b)
            }
            return null
        }, a._loadNext = function() {
            if (!this._paused) {
                this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
                for (var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); a++) {
                    var b = this._loadQueue[a];
                    this._canStartLoad(b) && (this._loadQueue.splice(a, 1), a--, this._loadItem(b))
                }
            }
        }, a._loadItem = function(a) {
            a.on("fileload", this._handleFileLoad, this), a.on("progress", this._handleProgress, this), a.on("complete", this._handleFileComplete, this), a.on("error", this._handleError, this), a.on("fileerror", this._handleFileError, this), this._currentLoads.push(a), this._sendFileStart(a.getItem()), a.load()
        }, a._handleFileLoad = function(a) {
            a.target = null, this.dispatchEvent(a)
        }, a._handleFileError = function(a) {
            var b = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, a.item);
            this._sendError(b)
        }, a._handleError = function(a) {
            var b = a.target;
            this._numItemsLoaded++, this._finishOrderedItem(b, !0), this._updateProgress();
            var c = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, b.getItem());
            this._sendError(c), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(b), this._cleanLoadItem(b), this._loadNext())
        }, a._handleFileComplete = function(a) {
            var b = a.target,
                c = b.getItem(),
                d = b.getResult();
            this._loadedResults[c.id] = d;
            var e = b.getResult(!0);
            null != e && e !== d && (this._loadedRawResults[c.id] = e), this._saveLoadedItems(b), this._removeLoadItem(b), this._finishOrderedItem(b) || this._processFinishedLoad(c, b), this._cleanLoadItem(b)
        }, a._saveLoadedItems = function(a) {
            var b = a.getLoadedItems();
            if (null !== b)
                for (var c = 0; c < b.length; c++) {
                    var d = b[c].item;
                    this._loadItemsBySrc[d.src] = d, this._loadItemsById[d.id] = d, this._loadedResults[d.id] = b[c].result, this._loadedRawResults[d.id] = b[c].rawResult
                }
        }, a._finishOrderedItem = function(a, b) {
            var c = a.getItem();
            if (this.maintainScriptOrder && c.type == createjs.Types.JAVASCRIPT || c.maintainOrder) {
                a instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
                var d = createjs.indexOf(this._scriptOrder, c);
                return -1 == d ? !1 : (this._loadedScripts[d] = b === !0 ? !0 : c, this._checkScriptLoadOrder(), !0)
            }
            return !1
        }, a._checkScriptLoadOrder = function() {
            for (var a = this._loadedScripts.length, b = 0; a > b; b++) {
                var c = this._loadedScripts[b];
                if (null === c) break;
                if (c !== !0) {
                    var d = this._loadedResults[c.id];
                    c.type == createjs.Types.JAVASCRIPT && createjs.DomUtils.appendToHead(d);
                    var e = c._loader;
                    this._processFinishedLoad(c, e), this._loadedScripts[b] = !0
                }
            }
        }, a._processFinishedLoad = function(a, b) {
            if (this._numItemsLoaded++, !this.maintainScriptOrder && a.type == createjs.Types.JAVASCRIPT) {
                var c = b.getTag();
                createjs.DomUtils.appendToHead(c)
            }
            this._updateProgress(), this._sendFileComplete(a, b), this._loadNext()
        }, a._canStartLoad = function(a) {
            if (!this.maintainScriptOrder || a.preferXHR) return !0;
            var b = a.getItem();
            if (b.type != createjs.Types.JAVASCRIPT) return !0;
            if (this._currentlyLoadingScript) return !1;
            for (var c = this._scriptOrder.indexOf(b), d = 0; c > d;) {
                var e = this._loadedScripts[d];
                if (null == e) return !1;
                d++
            }
            return this._currentlyLoadingScript = !0, !0
        }, a._removeLoadItem = function(a) {
            for (var b = this._currentLoads.length, c = 0; b > c; c++)
                if (this._currentLoads[c] == a) {
                    this._currentLoads.splice(c, 1);
                    break
                }
        }, a._cleanLoadItem = function(a) {
            var b = a.getItem();
            b && delete b._loader
        }, a._handleProgress = function(a) {
            var b = a.target;
            this._sendFileProgress(b.getItem(), b.progress), this._updateProgress()
        }, a._updateProgress = function() {
            var a = this._numItemsLoaded / this._numItems,
                b = this._numItems - this._numItemsLoaded;
            if (b > 0) {
                for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++) c += this._currentLoads[d].progress;
                a += c / b * (b / this._numItems)
            }
            this._lastProgress != a && (this._sendProgress(a), this._lastProgress = a)
        }, a._disposeItem = function(a) {
            delete this._loadedResults[a.id], delete this._loadedRawResults[a.id], delete this._loadItemsById[a.id], delete this._loadItemsBySrc[a.src]
        }, a._sendFileProgress = function(a, b) {
            if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
                var c = new createjs.Event("fileprogress");
                c.progress = b, c.loaded = b, c.total = 1, c.item = a, this.dispatchEvent(c)
            }
        }, a._sendFileComplete = function(a, b) {
            if (!this._isCanceled() && !this._paused) {
                var c = new createjs.Event("fileload");
                c.loader = b, c.item = a, c.result = this._loadedResults[a.id], c.rawResult = this._loadedRawResults[a.id], a.completeHandler && a.completeHandler(c), this.hasEventListener("fileload") && this.dispatchEvent(c)
            }
        }, a._sendFileStart = function(a) {
            var b = new createjs.Event("filestart");
            b.item = a, this.hasEventListener("filestart") && this.dispatchEvent(b)
        }, a.toString = function() {
            return "[PreloadJS LoadQueue]"
        }, createjs.LoadQueue = createjs.promote(LoadQueue, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function TextLoader(a) {
            this.AbstractLoader_constructor(a, !0, createjs.Types.TEXT)
        }
        var a = (createjs.extend(TextLoader, createjs.AbstractLoader), TextLoader);
        a.canLoadItem = function(a) {
            return a.type == createjs.Types.TEXT
        }, createjs.TextLoader = createjs.promote(TextLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function BinaryLoader(a) {
            this.AbstractLoader_constructor(a, !0, createjs.Types.BINARY), this.on("initialize", this._updateXHR, this)
        }
        var a = createjs.extend(BinaryLoader, createjs.AbstractLoader),
            b = BinaryLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.BINARY
        }, a._updateXHR = function(a) {
            a.loader.setResponseType("arraybuffer")
        }, createjs.BinaryLoader = createjs.promote(BinaryLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function CSSLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.CSS), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "href", this._tag = b ? createjs.Elements.style() : createjs.Elements.link(), this._tag.rel = "stylesheet", this._tag.type = "text/css"
        }
        var a = createjs.extend(CSSLoader, createjs.AbstractLoader),
            b = CSSLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.CSS
        }, a._formatResult = function(a) {
            if (this._preferXHR) {
                var b = a.getTag();
                if (b.styleSheet) b.styleSheet.cssText = a.getResult(!0);
                else {
                    var c = createjs.Elements.text(a.getResult(!0));
                    b.appendChild(c)
                }
            } else b = this._tag;
            return createjs.DomUtils.appendToHead(b), b
        }, createjs.CSSLoader = createjs.promote(CSSLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function FontLoader(a, b) {
            this.AbstractLoader_constructor(a, b, a.type), this._faces = {}, this._watched = [], this._count = 0, this._watchInterval = null, this._loadTimeout = null, this._injectCSS = void 0 === a.injectCSS ? !0 : a.injectCSS, this.dispatchEvent("initialize")
        }
        var a = createjs.extend(FontLoader, createjs.AbstractLoader);
        FontLoader.canLoadItem = function(a) {
            return a.type == createjs.Types.FONT || a.type == createjs.Types.FONTCSS
        }, FontLoader.sampleText = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ", FontLoader._ctx = document.createElement("canvas").getContext("2d"), FontLoader._referenceFonts = ["serif", "monospace"], FontLoader.WEIGHT_REGEX = /[- ._]*(thin|normal|book|regular|medium|black|heavy|[1-9]00|(?:extra|ultra|semi|demi)?[- ._]*(?:light|bold))[- ._]*/gi, FontLoader.STYLE_REGEX = /[- ._]*(italic|oblique)[- ._]*/gi, FontLoader.FONT_FORMAT = {
            woff2: "woff2",
            woff: "woff",
            ttf: "truetype",
            otf: "truetype"
        }, FontLoader.FONT_WEIGHT = {
            thin: 100,
            extralight: 200,
            ultralight: 200,
            light: 300,
            semilight: 300,
            demilight: 300,
            book: "normal",
            regular: "normal",
            semibold: 600,
            demibold: 600,
            extrabold: 800,
            ultrabold: 800,
            black: 900,
            heavy: 900
        }, FontLoader.WATCH_DURATION = 10, a.load = function() {
            if (this.type == createjs.Types.FONTCSS) {
                var a = this._watchCSS();
                if (!a) return void this.AbstractLoader_load()
            } else if (this._item.src instanceof Array) this._watchFontArray();
            else {
                var b = this._defFromSrc(this._item.src);
                this._watchFont(b), this._injectStyleTag(this._cssFromDef(b))
            }
            this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this.dispatchEvent("loadstart")
        }, a._handleTimeout = function() {
            this._stopWatching(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT"))
        }, a._createRequest = function() {
            return this._request
        }, a.handleEvent = function(a) {
            switch (a.type) {
                case "complete":
                    this._rawResult = a.target._response, this._result = !0, this._parseCSS(this._rawResult);
                    break;
                case "error":
                    this._stopWatching(), this.AbstractLoader_handleEvent(a)
            }
        }, a._watchCSS = function() {
            var a = this._item.src;
            return a instanceof HTMLStyleElement && (this._injectCSS && !a.parentNode && (document.head || document.getElementsByTagName("head")[0]).appendChild(a), this._injectCSS = !1, a = "\n" + a.textContent), -1 !== a.search(/\n|\r|@font-face/i) ? (this._parseCSS(a), !0) : (this._request = new createjs.XHRRequest(this._item), !1)
        }, a._parseCSS = function(a) {
            for (var b = /@font-face\s*\{([^}]+)}/g;;) {
                var c = b.exec(a);
                if (!c) break;
                this._watchFont(this._parseFontFace(c[1]))
            }
            this._injectStyleTag(a)
        }, a._watchFontArray = function() {
            for (var a, b = this._item.src, c = "", d = b.length - 1; d >= 0; d--) {
                var e = b[d];
                a = "string" == typeof e ? this._defFromSrc(e) : this._defFromObj(e), this._watchFont(a), c += this._cssFromDef(a) + "\n"
            }
            this._injectStyleTag(c)
        }, a._injectStyleTag = function(a) {
            if (this._injectCSS) {
                var b = document.head || document.getElementsByTagName("head")[0],
                    c = document.createElement("style");
                c.type = "text/css", c.styleSheet ? c.styleSheet.cssText = a : c.appendChild(document.createTextNode(a)), b.appendChild(c)
            }
        }, a._parseFontFace = function(a) {
            var b = this._getCSSValue(a, "font-family"),
                c = this._getCSSValue(a, "src");
            return b && c ? this._defFromObj({
                family: b,
                src: c,
                style: this._getCSSValue(a, "font-style"),
                weight: this._getCSSValue(a, "font-weight")
            }) : null
        }, a._watchFont = function(a) {
            a && !this._faces[a.id] && (this._faces[a.id] = a, this._watched.push(a), this._count++, this._calculateReferenceSizes(a), this._startWatching())
        }, a._startWatching = function() {
            null == this._watchInterval && (this._watchInterval = setInterval(createjs.proxy(this._watch, this), FontLoader.WATCH_DURATION))
        }, a._stopWatching = function() {
            clearInterval(this._watchInterval), clearTimeout(this._loadTimeout), this._watchInterval = null
        }, a._watch = function() {
            for (var a = this._watched, b = FontLoader._referenceFonts, c = a.length, d = c - 1; d >= 0; d--)
                for (var e = a[d], f = e.refs, g = f.length - 1; g >= 0; g--) {
                    var h = this._getTextWidth(e.family + "," + b[g], e.weight, e.style);
                    if (h != f[g]) {
                        var i = new createjs.Event("fileload");
                        e.type = "font-family", i.item = e, this.dispatchEvent(i), a.splice(d, 1);
                        break
                    }
                }
            if (c !== a.length) {
                var i = new createjs.ProgressEvent(this._count - a.length, this._count);
                this.dispatchEvent(i)
            }
            0 === c && (this._stopWatching(), this._sendComplete())
        }, a._calculateReferenceSizes = function(a) {
            for (var b = FontLoader._referenceFonts, c = a.refs = [], d = 0; d < b.length; d++) c[d] = this._getTextWidth(b[d], a.weight, a.style)
        }, a._defFromSrc = function(a) {
            var b, c = /[- ._]+/g,
                d = a,
                e = null;
            b = d.search(/[?#]/), -1 !== b && (d = d.substr(0, b)), b = d.lastIndexOf("."), -1 !== b && (e = d.substr(b + 1), d = d.substr(0, b)), b = d.lastIndexOf("/"), -1 !== b && (d = d.substr(b + 1));
            var f = d,
                g = f.match(FontLoader.WEIGHT_REGEX);
            g && (g = g[0], f = f.replace(g, ""), g = g.replace(c, "").toLowerCase());
            var h = d.match(FontLoader.STYLE_REGEX);
            h && (f = f.replace(h[0], ""), h = "italic"), f = f.replace(c, "");
            var i = "local('" + d.replace(c, " ") + "'), url('" + a + "')",
                j = FontLoader.FONT_FORMAT[e];
            return j && (i += " format('" + j + "')"), this._defFromObj({
                family: f,
                weight: FontLoader.FONT_WEIGHT[g] || g,
                style: h,
                src: i
            })
        }, a._defFromObj = function(a) {
            var b = {
                family: a.family,
                src: a.src,
                style: a.style || "normal",
                weight: a.weight || "normal"
            };
            return b.id = b.family + ";" + b.style + ";" + b.weight, b
        }, a._cssFromDef = function(a) {
            return "@font-face {\n	font-family: '" + a.family + "';\n	font-style: " + a.style + ";\n	font-weight: " + a.weight + ";\n	src: " + a.src + ";\n}"
        }, a._getTextWidth = function(a, b, c) {
            var d = FontLoader._ctx;
            return d.font = c + " " + b + " 72px " + a, d.measureText(FontLoader.sampleText).width
        }, a._getCSSValue = function(a, b) {
            var c = new RegExp(b + ":s*([^;}]+?)s*[;}]"),
                d = c.exec(a);
            return d && d[1] ? d[1] : null
        }, createjs.FontLoader = createjs.promote(FontLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function ImageLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.IMAGE), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", createjs.DomUtils.isImageTag(a) ? this._tag = a : createjs.DomUtils.isImageTag(a.src) ? this._tag = a.src : createjs.DomUtils.isImageTag(a.tag) && (this._tag = a.tag), null != this._tag ? this._preferXHR = !1 : this._tag = createjs.Elements.img(), this.on("initialize", this._updateXHR, this)
        }
        var a = createjs.extend(ImageLoader, createjs.AbstractLoader),
            b = ImageLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.IMAGE
        }, a.load = function() {
            if ("" != this._tag.src && this._tag.complete) return void this._sendComplete();
            var a = this._item.crossOrigin;
            1 == a && (a = "Anonymous"), null == a || createjs.URLUtils.isLocal(this._item) || (this._tag.crossOrigin = a), this.AbstractLoader_load()
        }, a._updateXHR = function(a) {
            a.loader.mimeType = "text/plain; charset=x-user-defined-binary", a.loader.setResponseType && a.loader.setResponseType("blob")
        }, a._formatResult = function() {
            return this._formatImage
        }, a._formatImage = function(a, b) {
            var c = this._tag,
                d = window.URL || window.webkitURL;
            if (this._preferXHR)
                if (d) {
                    var e = d.createObjectURL(this.getResult(!0));
                    c.src = e, c.addEventListener("load", this._cleanUpURL, !1), c.addEventListener("error", this._cleanUpURL, !1)
                } else c.src = this._item.src;
            else;
            c.complete ? a(c) : (c.onload = createjs.proxy(function() {
                a(this._tag), c.onload = c.onerror = null
            }, this), c.onerror = createjs.proxy(function(a) {
                b(new createjs.ErrorEvent("IMAGE_FORMAT", null, a)), c.onload = c.onerror = null
            }, this))
        }, a._cleanUpURL = function(a) {
            var b = window.URL || window.webkitURL;
            b.revokeObjectURL(a.target.src)
        }, createjs.ImageLoader = createjs.promote(ImageLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function JavaScriptLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.JAVASCRIPT), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.setTag(createjs.Elements.script())
        }
        var a = createjs.extend(JavaScriptLoader, createjs.AbstractLoader),
            b = JavaScriptLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.JAVASCRIPT
        }, a._formatResult = function(a) {
            var b = a.getTag();
            return this._preferXHR && (b.text = a.getResult(!0)), b
        }, createjs.JavaScriptLoader = createjs.promote(JavaScriptLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function JSONLoader(a) {
            this.AbstractLoader_constructor(a, !0, createjs.Types.JSON), this.resultFormatter = this._formatResult
        }
        var a = createjs.extend(JSONLoader, createjs.AbstractLoader),
            b = JSONLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.JSON
        }, a._formatResult = function(a) {
            var b = null;
            try {
                b = createjs.DataUtils.parseJSON(a.getResult(!0))
            } catch (c) {
                var d = new createjs.ErrorEvent("JSON_FORMAT", null, c);
                return this._sendError(d), c
            }
            return b
        }, createjs.JSONLoader = createjs.promote(JSONLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function JSONPLoader(a) {
            this.AbstractLoader_constructor(a, !1, createjs.Types.JSONP), this.setTag(createjs.Elements.script()), this.getTag().type = "text/javascript"
        }
        var a = createjs.extend(JSONPLoader, createjs.AbstractLoader),
            b = JSONPLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.JSONP
        }, a.cancel = function() {
            this.AbstractLoader_cancel(), this._dispose()
        }, a.load = function() {
            if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests.");
            if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
            window[this._item.callback] = createjs.proxy(this._handleLoad, this), createjs.DomUtils.appendToBody(this._tag), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag.src = this._item.src
        }, a._handleLoad = function(a) {
            this._result = this._rawResult = a, this._sendComplete(), this._dispose()
        }, a._handleTimeout = function() {
            this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout"))
        }, a._dispose = function() {
            createjs.DomUtils.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout)
        }, createjs.JSONPLoader = createjs.promote(JSONPLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function ManifestLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.MANIFEST), this.plugins = null, this._manifestQueue = null
        }
        var a = createjs.extend(ManifestLoader, createjs.AbstractLoader),
            b = ManifestLoader;
        b.MANIFEST_PROGRESS = .25, b.canLoadItem = function(a) {
            return a.type == createjs.Types.MANIFEST
        }, a.load = function() {
            this.AbstractLoader_load()
        }, a._createRequest = function() {
            var a = this._item.callback;
            this._request = null != a ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
        }, a.handleEvent = function(a) {
            switch (a.type) {
                case "complete":
                    return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(b.MANIFEST_PROGRESS), void this._loadManifest(this._result);
                case "progress":
                    return a.loaded *= b.MANIFEST_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(a)
            }
            this.AbstractLoader_handleEvent(a)
        }, a.destroy = function() {
            this.AbstractLoader_destroy(), this._manifestQueue.close()
        }, a._loadManifest = function(a) {
            if (a && a.manifest) {
                var b = this._manifestQueue = new createjs.LoadQueue(this._preferXHR);
                b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("complete", this._handleManifestComplete, this, !0), b.on("error", this._handleManifestError, this, !0);
                for (var c = 0, d = this.plugins.length; d > c; c++) b.installPlugin(this.plugins[c]);
                b.loadManifest(a)
            } else this._sendComplete()
        }, a._handleManifestFileLoad = function(a) {
            a.target = null, this.dispatchEvent(a)
        }, a._handleManifestComplete = function() {
            this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
        }, a._handleManifestProgress = function(a) {
            this.progress = a.progress * (1 - b.MANIFEST_PROGRESS) + b.MANIFEST_PROGRESS, this._sendProgress(this.progress)
        }, a._handleManifestError = function(a) {
            var b = new createjs.Event("fileerror");
            b.item = a.data, this.dispatchEvent(b)
        }, createjs.ManifestLoader = createjs.promote(ManifestLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function SoundLoader(a, b) {
            this.AbstractMediaLoader_constructor(a, b, createjs.Types.SOUND), createjs.DomUtils.isAudioTag(a) ? this._tag = a : createjs.DomUtils.isAudioTag(a.src) ? this._tag = a : createjs.DomUtils.isAudioTag(a.tag) && (this._tag = createjs.DomUtils.isAudioTag(a) ? a : a.src), null != this._tag && (this._preferXHR = !1)
        }
        var a = createjs.extend(SoundLoader, createjs.AbstractMediaLoader),
            b = SoundLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.SOUND
        }, a._createTag = function(a) {
            var b = createjs.Elements.audio();
            return b.autoplay = !1, b.preload = "none", b.src = a, b
        }, createjs.SoundLoader = createjs.promote(SoundLoader, "AbstractMediaLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function VideoLoader(a, b) {
            this.AbstractMediaLoader_constructor(a, b, createjs.Types.VIDEO), createjs.DomUtils.isVideoTag(a) || createjs.DomUtils.isVideoTag(a.src) ? (this.setTag(createjs.DomUtils.isVideoTag(a) ? a : a.src), this._preferXHR = !1) : this.setTag(this._createTag())
        }
        var a = createjs.extend(VideoLoader, createjs.AbstractMediaLoader),
            b = VideoLoader;
        a._createTag = function() {
            return createjs.Elements.video()
        }, b.canLoadItem = function(a) {
            return a.type == createjs.Types.VIDEO
        }, createjs.VideoLoader = createjs.promote(VideoLoader, "AbstractMediaLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function SpriteSheetLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.SPRITESHEET), this._manifestQueue = null
        }
        var a = createjs.extend(SpriteSheetLoader, createjs.AbstractLoader),
            b = SpriteSheetLoader;
        b.SPRITESHEET_PROGRESS = .25, b.canLoadItem = function(a) {
            return a.type == createjs.Types.SPRITESHEET
        }, a.destroy = function() {
            this.AbstractLoader_destroy(), this._manifestQueue.close()
        }, a._createRequest = function() {
            var a = this._item.callback;
            this._request = null != a ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
        }, a.handleEvent = function(a) {
            switch (a.type) {
                case "complete":
                    return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(b.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
                case "progress":
                    return a.loaded *= b.SPRITESHEET_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(a)
            }
            this.AbstractLoader_handleEvent(a)
        }, a._loadManifest = function(a) {
            if (a && a.images) {
                var b = this._manifestQueue = new createjs.LoadQueue(this._preferXHR, this._item.path, this._item.crossOrigin);
                b.on("complete", this._handleManifestComplete, this, !0), b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("error", this._handleManifestError, this, !0), b.loadManifest(a.images)
            }
        }, a._handleManifestFileLoad = function(a) {
            var b = a.result;
            if (null != b) {
                var c = this.getResult().images,
                    d = c.indexOf(a.item.src);
                c[d] = b
            }
        }, a._handleManifestComplete = function() {
            this._result = new createjs.SpriteSheet(this._result), this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete()
        }, a._handleManifestProgress = function(a) {
            this.progress = a.progress * (1 - b.SPRITESHEET_PROGRESS) + b.SPRITESHEET_PROGRESS, this._sendProgress(this.progress)
        }, a._handleManifestError = function(a) {
            var b = new createjs.Event("fileerror");
            b.item = a.data, this.dispatchEvent(b)
        }, createjs.SpriteSheetLoader = createjs.promote(SpriteSheetLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function SVGLoader(a, b) {
            this.AbstractLoader_constructor(a, b, createjs.Types.SVG), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "data", b ? this.setTag(createjs.Elements.svg()) : (this.setTag(createjs.Elements.object()), this.getTag().type = "image/svg+xml")
        }
        var a = createjs.extend(SVGLoader, createjs.AbstractLoader),
            b = SVGLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.SVG
        }, a._formatResult = function(a) {
            var b = createjs.DataUtils.parseXML(a.getResult(!0)),
                c = a.getTag();
            if (!this._preferXHR && document.body.contains(c) && document.body.removeChild(c), null != b.documentElement) {
                var d = b.documentElement;
                return document.importNode && (d = document.importNode(d, !0)), c.appendChild(d), c
            }
            return b
        }, createjs.SVGLoader = createjs.promote(SVGLoader, "AbstractLoader")
    }(), this.createjs = this.createjs || {},
    function() {
        "use strict";

        function XMLLoader(a) {
            this.AbstractLoader_constructor(a, !0, createjs.Types.XML), this.resultFormatter = this._formatResult
        }
        var a = createjs.extend(XMLLoader, createjs.AbstractLoader),
            b = XMLLoader;
        b.canLoadItem = function(a) {
            return a.type == createjs.Types.XML
        }, a._formatResult = function(a) {
            return createjs.DataUtils.parseXML(a.getResult(!0))
        }, createjs.XMLLoader = createjs.promote(XMLLoader, "AbstractLoader")
    }(); // This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}