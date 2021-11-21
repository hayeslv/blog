/*
 * @Author: Lvhz
 * @Date: 2021-11-04 14:35:41
 * @Description: Description
 */
type User = {
  name : string,
  age : number
}
const users : User[] = [
  {
    name: 'dy1',
    age: 40,
  },
  {
    name: 'dy2',
    age: 29
  }
]

function logPerson(user : User) {
  console.log(` - ${user.name}, ${user.age}`);
}

users.forEach(logPerson)