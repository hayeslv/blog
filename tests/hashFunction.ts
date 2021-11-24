/*
 * @Author: Lvhz
 * @Date: 2021-11-23 09:08:18
 * @Description: Description
 */
interface CatInfo {
  age : number
  breed : string
}
type CatName = 'miffy' | 'boris' | 'mordred'
const cats : Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
}
cats.boris // (property) boris: CatInfo