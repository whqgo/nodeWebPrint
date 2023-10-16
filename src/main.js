/*
 * @Author: whq
 * @Date: 2023-10-16 13:33:33
 * @LastEditTime: 2023-10-16 13:47:37
 * @LastEditors: whq
 * @Description: +
 * @FilePath: \nodedemo1\src\main.js
 */

const webPrint = require('./webPrintUtils/index')




let arr = [
    {
        "id": "1536536908690231303",
        "c": "warehou",
        "n": "2warehouse_test-01fvdj3dfr",
        "shopSign": "",
        "itemTypeN": "主料",
        "goodsType": 102,
        "abcType": null,
        "unitN": "公斤",
        "standardPuchasePrice": 200,
        "standardSellingPrice": null,
        "enableBatchManage": false,
        "enableSerialManage": false
    },
    {
        "id": "1533756778272133163",
        "c": "JC5219",
        "n": "外圆刀片-117.5°-VCGX160404-ALJC5219",
        "shopSign": "",
        "itemTypeN": "辅料",
        "goodsType": 102,
        "abcType": null,
        "unitN": "公斤",
        "standardPuchasePrice": 3000,
        "standardSellingPrice": null,
        "enableBatchManage": false,
        "enableSerialManage": false
    },
    {
        "id": "1533756778272133163",
        "c": "cl00r5",
        "n": "去世的发货尽快地方受大夫",
        "shopSign": "",
        "itemTypeN": "辅料",
        "goodsType": 102,
        "abcType": null,
        "unitN": "公斤",
        "standardPuchasePrice": 3000,
        "standardSellingPrice": null,
        "enableBatchManage": false,
        "enableSerialManage": false
    },
    {
        "id": "1440565671032393776",
        "c": "SYP-34fghj",
        "n": "森远SYP1800砂型钨钢",
        "shopSign": "",
        "itemTypeN": "核心设备",
        "goodsType": 106,
        "abcType": null,
        "unitN": "台",
        "standardPuchasePrice": null,
        "standardSellingPrice": null,
        "enableBatchManage": false,
        "enableSerialManage": false
    },
    // {
    //     "id": "1440595052610064532",
    //     "c": "QSJ",
    //     "n": "清砂机",
    //     "shopSign": "",
    //     "itemTypeN": "核心设备",
    //     "goodsType": 106,
    //     "abcType": null,
    //     "unitN": "台",
    //     "standardPuchasePrice": null,
    //     "standardSellingPrice": null,
    //     "enableBatchManage": false,
    //     "enableSerialManage": false
    // },
    // {
    //     "id": "1440604824889594038",
    //     "c": "XLCS600",
    //     "n": "全自动平水热芯盒射芯机",
    //     "shopSign": "",
    //     "itemTypeN": "核心设备",
    //     "goodsType": 106,
    //     "abcType": null,
    //     "unitN": "台",
    //     "standardPuchasePrice": null,
    //     "standardSellingPrice": null,
    //     "enableBatchManage": false,
    //     "enableSerialManage": false
    // }
]

webPrint(arr, 'label')
