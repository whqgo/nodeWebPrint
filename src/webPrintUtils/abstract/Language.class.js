/*
 * @Author: whq
 * @Date: 2023-02-21 10:28:31
 * @LastEditTime: 2023-02-21 11:31:19
 * @LastEditors: whq
 * @Description: 
 * @FilePath: \biz_client\src\labelPrintUtils\abstract\Language.class.js
 */
/**
 * 语言抽象类
 *
 * @class
 */
// export default class Language {
class Language {

    /**
     * 初始化打印机语言，一般在在_export()导出缓存后调用重置
     * 约定用于上层调用
     * 
     * @return {void}
     * @abstract
     */
    _init() {
        throw new Error(`[ Language ] 必须实现该方法`);
    }

    /**
     * 导出命令缓存
     * 
     * @returns {Uint8Array}
     * @abstract
     */
    _export() {
        throw new Error(`[ Language ] 必须实现该方法`);
    }
}

module.exports=Language