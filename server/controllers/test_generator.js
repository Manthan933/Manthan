Array.prototype.shuffle = function () {
  var r = [],
    c = this.slice(0);
  while (c.length) r.push(c.splice(Math.random() * c.length, 1));
  return r;
};

Array.prototype.populate = function (n) {
  return Object.keys(Object(0 + Array(n)));
};

var getRandomInts = function (num, min, max) {
  var a = [].populate(max).slice(min);
  a = a.shuffle();
  return a.slice(0, num);
};

function GetIndex(array, key, start) {
  var pos = start;
  while (pos < array.length) {
    if (array[pos].Rules === key) return pos;
    pos = pos + 1;
  }
  return -1;
}

function Sort(originalArr) {
  if (originalArr.length <= 1) {
    return originalArr;
  } else {
    var leftArr = [];
    var rightArr = [];
    var newArr = [];
    var pivot = originalArr.pop();
    var length = originalArr.length;
    for (var i = 0; i < length; i++) {
      if (originalArr[i].Rules <= pivot.Rules) {
        leftArr.push(originalArr[i]);
      } else {
        rightArr.push(originalArr[i]);
      }
    }
    return newArr.concat(Sort(leftArr), pivot, Sort(rightArr));
  }
}

function GenerateTest(Questions, Rules) {
  var start = 0;
  var end = 0;
  var i = 0;
  var test = [];
  if (Rules.length) {
    while (i < Rules.length) {
      pos = GetIndex(Questions, i + 1, start);
      if (pos != -1) {
        end = pos;
      } else {
        end = Questions.length;
      }
      test = test.concat(getRandomInts(Rules[i], start, end));
      start = end;
      i = i + 1;
    }
  } else {
    test = getRandomInts(Questions.length, 0, Questions.length);
  }
  return test;
}

module.exports = { GenerateTest, Sort };
