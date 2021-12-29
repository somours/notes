import {reactive} from 'vue'
export type PaginationConfig = {
  total: number,
  pageSize: number,
  currentPage: number,
}
export type PageSizes = number[]

export type PaginationResult = {
  paginationConfig: PaginationConfig,
  changeCurrentPage: Function,
  changePageSize: Function,
  pageSizes: PageSizes
}
// 默认配置值
export const defaultPaginationConfig: PaginationConfig = {
  total: 0,
  pageSize: 10,
  currentPage: 1
}
export const pageSizes: PageSizes = [10, 20, 30, 50, 100]
/*
*
*
* */
export const usePagination = (config: PaginationConfig = defaultPaginationConfig): PaginationResult => {
  const paginationConfig = reactive<PaginationConfig>(config)
  // 改变pageSize
  const changePageSize = (pageSize: number, fn: Function) => {
    paginationConfig.pageSize = pageSize
    fn && fn(paginationConfig)
  }
  // 改变currentPage
  const changeCurrentPage = (currentPage: number, fn: Function) => {
    paginationConfig.currentPage = currentPage
    fn && fn(paginationConfig)
  }
  return {
    paginationConfig,
    changeCurrentPage,
    changePageSize,
    pageSizes
  }
}
