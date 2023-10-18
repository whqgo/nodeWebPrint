

const webPrint = require('./webPrintUtils/index')

// 数据长度就是打印个数
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
    }
]

webPrint(arr, 'label')
