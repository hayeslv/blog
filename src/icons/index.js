/*
 * @Author: Lvhz
 * @Date: 2021-08-27 11:48:09
 * @Description: Description
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)