/*
 * @Author: Lvhz
 * @Date: 2021-10-27 10:57:32
 * @Description: Description
 */
import mitt from "mitt";
const emitter = mitt();

emitter.$on = emitter.on;
emitter.$emit = emitter.emit;
emitter.$off = emitter.off;

export default emitter;
