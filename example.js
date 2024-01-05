
let obj1 = {
  name: 'sagar',
  address: {
    city:'yavatmal'
  }
}
 let obj2 =obj1;
 obj2.name = 'xyz';
 obj2.address.city = 'ralegaon';
 console.log(obj1);
 console.log(obj2);
