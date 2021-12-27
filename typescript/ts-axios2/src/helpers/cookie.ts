/*
 * @Description: cookie
 * @Author: somours
 * @Date: 2021-12-27 15:14:55
 * @LastEditors: somours
 * @LastEditTime: 2021-12-27 15:14:55
 */

const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
