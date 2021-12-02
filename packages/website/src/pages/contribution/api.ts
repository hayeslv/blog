/*
 * @Author: Lvhz
 * @Date: 2021-12-01 16:52:41
 * @Description: Description
 */
// @ts-ignore
import { ArticleApi } from '@/server/request/api.js'

// 获取类型列表
export const getArticleTypeList = async () => {
  const res = await ArticleApi.getArticleType();
  const { data } = res;
  return data || []
}
// 获取分组列表
export const getArticleGroupList = async (typeId : string | number) => {
  const groupRes = await ArticleApi.getArticleGroupList({ typeId })
  const { data } = groupRes
  return data || []
}