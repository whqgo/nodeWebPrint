"""
Author: whq
Date: 2023-02-27 10:27:16
LastEditTime: 2023-09-22 13:52:33
LastEditors: whq
Description: 
FilePath: \pydemo\init.py
"""
""
import xlwings as xw
import os
import sys
import win32com.client
import pandas as pd
from pynput import mouse, keyboard


# 获取根目录
def getPath():
    # 查找的文件名
    config_name = "print.xlsx"
    # determine if application is a script file or frozen exe
    if getattr(sys, "frozen", False):
        application_path = os.path.dirname(sys.executable)
    elif __file__:
        application_path = os.path.dirname(__file__)

    config_path = os.path.join(application_path, config_name)
    return config_path


# 打印
def openRrint():
    lg = getPath()
    try:
        xlApp = win32com.client.Dispatch("Excel.Application")
        # UpdateLinks
        # CorruptLoad=2 尝试修复损坏的文件
        # xlBook = xlApp.Workbooks.Open(lg, UpdateLinks=0, CorruptLoad=2)  # 打印的文件
        xlBook = xlApp.Workbooks.Open(lg, UpdateLinks=0)  # 打印的文件
        xlApp.Visible = 0  # 不在后台运行
        xlApp.DisplayAlerts = False  # 显示弹窗
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.Orientation = win32com.client.constants.xlLandscape # 设置为横向打印
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.Zoom = False
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.FitToPagesWide = 1  # 页数范围
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.FitToPagesTall = 10
        # xlBook.Save() #保存
        ename = xlApp.ActiveWorkbook.Name  # 获取打开工作表名称
        print("正在打印>", ename)
        xlBook.PrintOut()
        print(xlApp, "名称===")
        print(xlBook, "打印的文件===")
        print(lg, "lg===")
        # xlBook.PrintOut(1,5) # 打印页数1-5
        xlApp.Quit()  # 退出
    except Exception as e:
        print(f"打印 Excel 文件时发生错误: {str(e)}")


if __name__ == "__main__":
    # 调用打印机
    openRrint()
    # os.system("pause")
    pass
