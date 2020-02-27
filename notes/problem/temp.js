var range = function(n) {
  return Array.apply(null, {length: n}).map((_, n) => n);
};
var a = range(10)
console.log(a) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
