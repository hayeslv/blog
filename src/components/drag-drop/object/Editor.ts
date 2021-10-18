/*
 * @Author: Lvhz
 * @Date: 2021-10-17 16:56:37
 * @Description: Description
 */

import { Actions, Meta, States } from "../types/editor.types";
import StateMachine from "./StateMachine";
import Node from "./Node";
import Metas from "./Metas";
import { EditorEvents } from "./EditorEvents";

export default class Editor extends StateMachine<States, Actions> {
  private root : Node

  private sel : Set<Node> = new Set()
  private addingMeta? : Meta
  private addingVector! : [number, number]

  constructor() {
    super(States.Start)

    this.root = new Node('root', 0, 0, 800, 800)
    const rectMeta = Metas.find(x => x.type === 'rect')
    this.root.add(new Node('rect', 0, 0, rectMeta!.w, rectMeta!.h))

    // 开始 => 拖拽开始
    this.register(States.Start, States.DragStart, Actions.EvtDragStart, (node : Node) => {
      this.replaceSelection(node)
    })
    // 拖拽开始 => 移动
    this.register(States.DragStart, States.Moving, Actions.EvtDrag, () => {})
    // 移动 => 移动
    this.register(States.Moving, States.Moving, Actions.EvtDrag, () => {})
    // 移动 => 停止
    this.register(States.Moving, States.Stoped, Actions.EvtDragEnd, (vec : [number, number]) => {
      for(const node of this.sel.values()) {
        node.setXYByVector(vec)
        node.emit(EditorEvents.NodePositionUpdated)
      }
    })
    // 停止 => 开始
    this.register(States.Stoped, States.Start, Actions.AUTO, () => {})
    // 拖拽开始 => 选中
    this.register(States.DragStart, States.Selected, Actions.EvtDragEnd, () => {})
    // 开始 => 移动组件位置
    this.register(States.Start, States.PlacingComponent, Actions.StartAddComponent, (meta) => {
      this.addingMeta = meta
    })
    // 移动组件位置 => 移动组件位置
    this.register(States.PlacingComponent, States.PlacingComponent, Actions.EvtDrag, (vec) => {
      this.addingVector = vec
    })
    // 移动组件位置 => 添加组件
    this.register(States.PlacingComponent, States.AddingComponent, Actions.EvtDrop, () => {
      const node = new Node(
        this.addingMeta!.type,
        this.addingVector[0] - this.addingMeta!.w / 2 - 100,
        this.addingVector[1] - this.addingMeta!.h / 2,
        this.addingMeta!.w,
        this.addingMeta!.h
      )
      this.root.add(node)
      this.root.emit(EditorEvents.NodeChildrenUpdated)
    })
    // 添加组件 => 开始
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {})

  }

  private replaceSelection(node : Node) {
    this.sel.clear()
    this.sel.add(node)
  }

  public getRoot() {
    return this.root
  }
}
