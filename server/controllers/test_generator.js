function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function GenerateTest(Questions, Rules) {
  let i =0, j =0,k =0;
  let res = [];
  while(i< Rules.length){
    while( j<Questions.length && Questions[j].type == i+1){
      j++;
    }
    let arr = Questions.slice(k,j);
    shuffle(arr);
    k = j;
    res = res.concat(arr.slice(0,Rules[i].noofques));
    i++;
  }  
  shuffle(res);
  return res;
}

module.exports = { GenerateTest };
