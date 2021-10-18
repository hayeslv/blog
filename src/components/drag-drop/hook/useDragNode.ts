/*
 * @Author: Lvhz
 * @Date: 2021-10-18 09:47:39
 * @Description: Description
 */

import { Ref, ref } from "vue";
import { effect, lexicalScoped } from "../util/vue-lexical";
import DragNode from "../object/DragNode";
import { DragEvents, RawDragEvents } from "../types/editor.types";

lexicalScoped('ref')

// <Draggable onDragStart... />
export function useDragNode(props : DragEvents, initialPosition : [number, number]) : [Ref<DragNode>, RawDragEvents] {
	const node = ref<DragNode>(new DragNode())
	const ver = ref(0)

	effect(() => {
		node.value.init()
		ver.value++
	}, initialPosition)

	const handlers : RawDragEvents= {
		onDragstart: (e: DragEvent) => {
      node.value.start(e)
      props.onDragStart && props.onDragStart(node.value as DragNode)
    },
    onDrag: (e: DragEvent) => {
      node.value.update(e)
      ver.value++
      props.onDrag && props.onDrag(node.value as DragNode)
    },
    onDragend: (e: DragEvent) => {
      node.value.update(e)
      props.onDragEnd && props.onDragEnd(node.value as DragNode)
    },
	}
	return [node as Ref<DragNode>,handlers]
}
