// Define an array of objects holding the denominations and their values
var indValues = [
    {name:"ONE HUNDRED", val:100},
    {name:"FIFTY", val:50},
    {name:"TWENTY", val:20},
    {name:"TEN", val:10},
    {name:"FIVE", val:5},
    {name:"TWO", val:2},
    {name:"ONE", val:1},
    {name:"FIFTY CENTS", val:0.5},
    {name:"TWENTY CENTS", val:0.2},
    {name:"TEN CENTS", val:0.1},
    {name:"FIVE CENTS", val:0.05},
    {name:"TWO CENTS", val:0.02},
    {name:"ONE CENT", val:0.01}
  ];
  
// Define a requested function, an output format, and change
function checkCashRegister(price, cash, cid) {
    var output = {status:null, change:[]};
    var change = cash - price;
  
    // Convert the CID array to an object format
    var register = cid.reduce(function(acc,curr){
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
    }, {total:0});  // An initial value of the total key
  
    // 1.Case: Available cash in a register equals to needed change
    if (register.total === change) {
      output.status = "CLOSED";
      output.change = cid;
      return output;
    };
  
    // 2.Case: Available cash in a drawer is less than needed change => Obviously insufficient funds
    if (register.total < change) {
      output.status = "INSUFFICIENT_FUNDS";
      return output;
    };
  
    // 3.Case: Enough change available in a register. Change is taken from a register, biggest possible denomination are taken first, moving gradually on smaller ones until change equals zero.
    var change_arr = indValues.reduce(function(acc,curr){
      var value = 0;
      while (register[curr.name]>0 && curr.val<=change) {
        register[curr.name] -= curr.val;
        change -= curr.val;
        value += curr.val;
        change = Math.round(change * 100) / 100;
      }
      if (value>0){
      acc.push([curr.name, value]);
      };
      return acc;
    },[]);
  
    // 4.Case: Not possible to give change, no right denomination in a register.
    if (change_arr.length<1 || change>0) {
      output.status = "INSUFFICIENT_FUNDS";
      return output;
    };
  
    // Print an output in the requested format
    output.status = "OPEN";
    output.change = change_arr;
    return output;
  };
