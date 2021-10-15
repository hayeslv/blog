/*
 * @Author: Lvhz
 * @Date: 2021-10-15 11:35:04
 * @Description: Description
 */

type StateTransferFunction = (...args : Array<any>) => void

/**
 * @export
 * @class StateMachine
 * @template S ： 状态
 * @template A ： Action
 */
export default class StateMachine<S extends number, A extends number> {
  s : S
  table : Map<S, Map<A, [StateTransferFunction, S]>>
  constructor(initialState : S) {
    this.s = initialState
    this.table = new Map()
  }

  hash(s : S, a : A) {
    return s + 10000 * a
  }

  register(from : S, to : S, action : A, fn : StateTransferFunction) {
    if(!this.table.has(from)) {
      this.table.set(from, new Map())
    }
    const adjTable = this.table.get(from)!
    adjTable.set(action, [fn, to])
  }

  dispatch(action : A, ...data : Array<any>) {
    const adjTable = this.table.get(this.s)
    
    if(!adjTable) return false
    if(!adjTable.has(action)) return false

    const [fn, nextS] = adjTable.get(action)!
    fn(...data)
    this.s = nextS

    // Try all auto actions
    while(this.dispatch(0 as A, ...data))

    return true
  }
}