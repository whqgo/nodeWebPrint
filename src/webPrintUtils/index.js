/*
 * @Author: whq
 * @Date: 2023-02-21 16:03:41
 * @LastEditTime: 2023-10-16 17:19:54
 * @LastEditors: whq
 * @Description: 
 * @FilePath: \nodedemo1\src\webPrintUtils\index.js
 */

// import Printer from "#Printer";
// import Usb from "#Usb";
// import Tspl from "#Tspl";
// import bitmap_nodejs from "#bitmap_nodejs";
// import { resolve } from "path";
// import { encode as encoder } from "GBKCodec";

const Printer = require('./printer.class')
const Usb = require('./usb.class')
const Tspl = require('./tspl.class')
const { encode } = require('GBKCodec')

const bitmap_nodejs = require('./bitmap_nodejs')
const { execFile } = require('child_process')
const path = require('path')


const getSubstringFun = (data, maxc = 4, maxe = 4) => {
    let arr = []
    for (let index = 0; index < data.length; index++) {
        const itemD = data[index];
        if (arr.length) {
            let arrFindIndex = arr.findIndex((item) => {
                const chineseCount = item.match(/[\u4e00-\u9fa5]/g)?.length || 0;//中文数量
                const nonChineseCount = item.match(/[^\u4e00-\u9fa5]/g)?.length || 0;//非中文数量

                let e = maxc - chineseCount
                let c = maxe - nonChineseCount
                if (chineseCount) {
                    return (chineseCount <= maxc + (Math.floor(c / 2))) && (nonChineseCount <= maxe + (e * 2))
                } else {
                    return (nonChineseCount <= maxe + (e * 2))
                }
            })
            if (arrFindIndex != -1) {
                arr[arrFindIndex] += itemD
            } else {
                arr[arr.length] = itemD + '';
            }
            console.log(itemD, "===itemD===");
        } else {
            arr[0] = itemD + '';
        }
    }
    console.log(arr, "===arr====");
    return arr
}

/**
 * 标签模式打印示例
 */
const getLabelPrint = async (data, type) => {


    // 实例化 一个 80mm, 40mm的画布
    const print = new Printer({
        connection: new Usb,
        language: new Tspl({
            size: "70mm, 40mm",
            gap: "2mm, 0mm",
            encoder: encode
        })
    });
    // dialog.showMessageBox({ type: 'error', title: `请检查打印机`, message: state });
    switch (type) {
        case 'label':// 普通布局
            // 1.
            // let strArr = await getSubstringFun(data.n, 5, 8)
            // if (data.c.length >= 20) {
            //     await print.barcode(30, 20, '120', data.c, false, 1)
            // } else if (data.c.length < 20 && data.c.length >= 15) {
            //     await print.barcode(30, 20, '120', data.c, false, 2)
            // } else {
            //     await print.barcode(30, 20, '120', data.c, false, 3)
            // }

            // if (data.c.length >= 16) {
            //     await print.text(30, 150, '代码:' + data.c, 1, 'TSS24.BF2')
            // } else {
            //     await print.text(30, 150, '前端精湛掌握')
            // }

            // await print.text(30, 200, '名称:' + strArr[0], 2, 'TSS24.BF2')
            // if (strArr.length >= 2) {
            //     for (let index = 1; index < strArr.length; index++) {
            //         const strelement = strArr[index];
            //         await print.text(30, 200 + (index * 50), strelement, 2, 'TSS24.BF2')
            //     }
            // }


            // const bitmap = await bitmap_nodejs(resolve("./img/ewm.jpg"), 80, 80);
            // await print
            //     .bitmap(5, 0, 10, 80, bitmap)
            //     .block(20, 50, 200, 100, '中文显示', 2, 8)
            //     // // .bar(5, 96, 560, 4)
            //     // .qrcode(5, 110, "https://github.com/lilindog") // 二维码
            //     // .barcode(20, 20, '120', data.id, false, 3)
            //     // .text(20, 150, '名称：' + data.n, 2, 'TSS24.BF2')
            //     // .text(20, 210, '代码：' + data.c, 2, 'TSS24.BF2')
            //     // // .bar(5, 290, 560, 4)
            //     // // .text(20, 316, data.lable)
            //     // .print();

            //     await print.print();


            // 2. 
            await print.text(40, 10, '前端精湛掌握', 2, 'TSS24.BF2')
            await print.bar(5, 96, 560, 4)
            await print.qrcode(40, 110, "http://weixin.qq.com/r/zRHk-BjEZUUarVyf90Tf") // 二维码
            await print.print();
            break;
        case 'smlabel':// 小布局
            // await print.barcode(240, 15, '120', data.id, false, 1)
            // if (data.c.length <= 4) {
            //     await print.barcode(240, 15, '120', data.c, false, 4)
            // } else if (data.c.length > 4 && data.c.length <= 6) {
            //     await print.barcode(240, 15, '120', data.c, false, 3)
            // } else if (data.c.length > 6 && data.c.length <= 10) {
            //     await print.barcode(240, 15, '120', data.c, false, 2)
            // } else {
            //     await print.barcode(240, 15, '120', data.c, false, 1)
            // }
            let strArrc = await getSubstringFun(data.c, 5, 5)
            let strArrn = await getSubstringFun(data.n, 5, 5)
            if (data.c.length <= 4) {
                await print.barcode(240, 15, '120', data.c, false, 4)
            } else if (data.c.length > 4 && data.c.length <= 6) {
                await print.barcode(240, 15, '120', data.c, false, 3)
            } else if (data.c.length > 6 && data.c.length <= 10) {
                await print.barcode(240, 15, '120', data.c, false, 3)
            }


            await print.text(30, 15, strArrc[0], 1, 'TSS24.BF2')
            if (strArrc.length >= 2) {
                for (let index = 1; index < strArrc.length; index++) {
                    const strelement = strArrc[index];
                    await print.text(30, 15 + (index * 30), strelement, 1, 'TSS24.BF2')
                }
            }
            await print.text(30, (strArrc.length + 1) * 20, strArrn[0], 1, 'TSS24.BF2')
            if (strArrn.length >= 2) {
                for (let index = 1; index < strArrn.length; index++) {
                    const strelement = strArrn[index];
                    await print.text(30, (index + 1) * 35, strelement, 1, 'TSS24.BF2')
                }
            }

            await print.bar(5, 140, 560, 3)
            await print.print();
            break;

    }
};


/**
 * 票据模式打印示例
 */
const getBillPrint = async (currentEnv) => {

    // let url = ""
    // //app.asar字符判断 环境
    // if (__dirname.split(path.sep).indexOf("app.asar") >= 0) {
    //     let appPath = app.getPath('exe')
    //     console.log(appPath);
    //     // 获取上一层的目录 app 是当前目录名称 需要给去掉
    //     let path = appPath.replace(/优铸科技.exe/, '')
    //     url = path + 'resources\\init.exe'
    //     execFile(url)
    // } else {
    //     url = path.join(__dirname, '..', '..', 'public/init.exe')
    //     execFile(url)
    // }
    // dialog.showMessageBox({ type: 'error', title: `提示：`, message: url });

    // let appPath = app.getPath('exe')
    // let lindex = appPath.lastIndexOf('\\', appPath.length - 1)
    // console.log(appPath.substring(lindex + 1, appPath.length),"====================111==============================");
    // console.log(lindex);
    // console.log(appPath);
    let url = ""
    //app.asar字符判断 环境
    // if (__dirname.split(path.sep).indexOf("app.asar") >= 0) {
    //     let appPath = app.getPath('exe')
    //     console.log(appPath);
    //     // 获取上一层的目录 app 是当前目录名称 需要给去掉
    //     let path;
    //     if (currentEnv === 'dev') path = appPath.replace(/优铸科技测试.exe/, '')
    //     else if (currentEnv === 'demo') path = appPath.replace(/优铸科技演示.exe/, '')
    //     else path = appPath.replace(/优铸科技.exe/, '')

    //     url = path + 'resources\\init.exe'
    //     execFile(url)
    // } else {
    url = path.join(__dirname, '..', '..', 'public/init.exe')
    execFile(url)
    // }
    // dialog.showMessageBox({ type: 'error', title: `提示：`, message: url });
};

/**
 * @Description 入口
 * @param {*} param 数据
 * @param {*} type label 普通标签 OR smlabel 小标签  OR bill 单据
 */
const WebPrint = (param, type, currentEnv) => {
    console.log(param, type, "------------WebPrint---------------");
    switch (type) {
        case 'label':
        case 'smlabel':
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
            // for (let index = 0; index < arr.length; index++) {
            //     getLabelPrint(arr[index], type)
            // }
            for (let index = 0; index < param.length; index++) {
                getLabelPrint(param[index], type)
            }

            break;
        case 'bill':
            getBillPrint(currentEnv)
            break;
        default:
            break;
    }

}

module.exports = WebPrint