/* eslint-disable */

function test(e, t) {
        !function() {
            function e(e, t, n, a) {
                var i = n - e
                  , r = a - t;
                return Math.sqrt(i * i + r * r)
            }
            CanvasRenderingContext2D.prototype.textOverflow = "",
            CanvasRenderingContext2D.prototype.textJustify = !1,
            CanvasRenderingContext2D.prototype.textStrokeMin = 0;
            var t = []
              , n = CanvasRenderingContext2D.prototype.save;
            CanvasRenderingContext2D.prototype.save = function() {
                t.push({
                    textOverflow: this.textOverflow,
                    textJustify: this.textJustify,
                    textStrokeMin: this.textStrokeMin
                }),
                n.call(this)
            };
            
            var a = CanvasRenderingContext2D.prototype.restore;
            CanvasRenderingContext2D.prototype.restore = function() {
                a.call(this);
                var e = t.pop();
                this.textOverflow = e.textOverflow,
                this.textJustify = e.textJustify,
                this.textStrokeMin = e.textStrokeMin
            }
            
            CanvasRenderingContext2D.prototype.textPath = function(t, n) {
                var a, i = 0, r = 2;
                function o(t) {
                    if (!a || i + a < t)
                        for (; r < n.length && (a = e(n[r - 2], n[r - 1], n[r], n[r + 1]),
                        !(i + a > t)) && !((r += 2) >= n.length); )
                            i += a;
                    var o, c, l = t - i;
                    return r >= n.length && (r = n.length - 2),
                    l ? (o = n[r - 2] + (n[r] - n[r - 2]) * l / a,
                    c = n[r - 1] + (n[r + 1] - n[r - 1]) * l / a) : (o = n[r - 2],
                    c = n[r - 1]),
                    [o, c, Math.atan2(n[r + 1] - n[r - 1], n[r] - n[r - 2])]
                }
                for (var c = .25 * this.measureText(" ").width, l = 0, s = 2; s < n.length; s += 2)
                    l += e(n[s - 2], n[s - 1], n[s], n[s + 1]);
                if (!(l < this.minWidth)) {
                    var u = t.split(" ").length - 1;
                    if ("visible" !== this.textOverflow && l < this.measureText(t).width + (t.length - 1 + u) * c) {
                        var p = "ellipsis" === this.textOverflow ? "\u2026" : this.textOverflow || ""
                          , d = p.length - 1;
                        do {
                            " " === t[t.length - 1] && u--,
                            t = t.slice(0, -1)
                        } while (t && l < this.measureText(t + p).width + (t.length + d + u) * c);t += p
                    }
                    var m = 0;
                    switch (this.textJustify || this.textAlign) {
                        case !0:
                        case "center":
                        case "end":
                        case "right":
                            this.textJustify ? (m = 0,
                            c = (l - this.measureText(t).width) / (t.length - 1 + u)) : (m = l - this.measureText(t).width - (t.length + u) * c,
                            "center" === this.textAlign && (m /= 2))
                    }
                    for (var h = 0; h < t.length; h++) {
                        var x = t[h]
                          , f = this.measureText(x).width
                          , b = o(m + f / 2);
                        this.save(),
                        this.textAlign = "center",
                        this.translate(b[0], b[1]),
                        this.rotate(b[2]),
                        this.lineWidth > .1 && this.strokeText(x, 0, 0),
                        this.fillText(x, 0, 0),
                        this.restore(),
                        m += f + c * (" " === x ? 2 : 1)
                    }
                }
            }
        }()

}