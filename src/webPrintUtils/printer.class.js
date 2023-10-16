/*
 * @Author: whq
 * @Date: 2023-02-21 10:28:31
 * @LastEditTime: 2023-02-21 11:29:09
 * @LastEditors: whq
 * @Description: 
 * @FilePath: \biz_client\src\labelPrintUtils\printer.class.js
 */
// import Connection from "./abstract/Connection.class.mjs";
// import Language from "./abstract/Language.class.mjs";
// import { expand } from "./tool.js";

const Connection = require('./abstract/Connection.class.js')
const Language = require('./abstract/Language.class.js')
const { expand } = require('./tool.js')

class PrinterOtpion {

    static Fields = {
        /**
         * tspl类或tspl类的配置文件
         */
        language: null,
        connection: null
    };

    constructor(option = {}) {
        const res = Object.create(null);
        const handleConfig = (k) => {
            return {
                language() {
                    if (!(option[k] instanceof Language))
                        throw new Error(`[ PrinterOption ] language 字段必须为Connection类型`);
                    else
                        return option[k];
                },
                connection() {
                    if (!(option[k] instanceof Connection))
                        throw new Error(`[ PrinterOption ] connection 字段必须为Language类型`);
                    else
                        return option[k];
                }
            }[k];
        };
        Reflect.ownKeys(PrinterOtpion.Fields).forEach(k => {
            Object.defineProperty(res, k, {
                configurable: true,
                value: handleConfig(k)()
            });
        });
        return res;
    }
}

class Printer {
    static Option = PrinterOtpion;

    #option = {};

    constructor(option = {}) {
        this.#option = new PrinterOtpion(option);
        expand(this.#option.language, this);
    }

    /**
     * 执行打印
     * 
     * @return {Promise}
     * @public
     */
    print() {
        const source = this.#option.language._export();
        return this.#option.connection.write(source);
    }
}

// export default Printer;
module.exports=Printer