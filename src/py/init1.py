import os
import sys
import win32com.client
from PyPDF2 import PdfFileReader, PdfFileWriter
from reportlab.pdfgen import canvas

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

def getPathFile(file_extension):
    # 支持的扩展名："xlsx", "docx" 或 "pdf"
    if file_extension not in ["xlsx", "docx", "pdf"]:
        raise ValueError("无效的文件扩展名。支持的扩展名为 'xlsx', 'docx' 和 'pdf'。")

    # 判断应用程序是脚本文件还是冻结的可执行文件
    if getattr(sys, "frozen", False):
        application_path = os.path.dirname(sys.executable)
    elif __file__:
        application_path = os.path.dirname(__file__)

    # 根据指定的扩展名构建文件路径
    file_name = f"files/print.{file_extension}"
    file_path = os.path.join(application_path, file_name)
    return file_path

def checkFileExistence(file_path):
    return os.path.exists(file_path)

# 打印Excel文件
def printExcel(file_path):
    try:
        xlApp = win32com.client.Dispatch("Excel.Application")
        xlBook = xlApp.Workbooks.Open(file_path, UpdateLinks=0)
        xlApp.Visible = 0  # 不在后台运行
        xlApp.DisplayAlerts = False  # 显示弹窗
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.Orientation = win32com.client.constants.xlLandscape  # 设置为横向打印
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.Zoom = False
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.FitToPagesWide = 1  # 页数范围
        xlApp.ActiveWorkbook.Sheets(1).PageSetup.FitToPagesTall = 10
        ename = xlApp.ActiveWorkbook.Name  # 获取打开工作表名称
        print("正在打印 Excel >", ename)
        xlBook.PrintOut()
        xlBook.Close()
        xlApp.Quit()  # 退出
    except Exception as e:
        print(f"打印 Excel 文件时发生错误: {str(e)}")

# 打印Word文件
def printWord(file_path):
    try:
        wdApp = win32com.client.Dispatch("Word.Application")
        wdApp.Visible = False  # 设置 Word 可见
        wdApp.DisplayAlerts = False  # 显示弹窗
        wdDoc = wdApp.Documents.Open(file_path)
        print("正在打印 Word >")
        wdDoc.PrintOut(Background=False, Item=2)
        wdDoc.Close()
        wdApp.Quit()
    except Exception as e:
        print(f"打印 Word 文件时发生错误: {str(e)}")

# 打印PDF文件
def printPDF(file_path):
    try:
        print("正在打印 PDF >")
        # 使用 ReportLab 创建一个新的 PDF，添加打印命令
        c = canvas.Canvas("print_command.pdf")
        c.drawString(100, 750, "Print Command")
        c.showPage()
        c.save()

        # 合并命令 PDF 和目标 PDF
        output = PdfFileWriter()
        command_pdf = PdfFileReader("print_command.pdf")
        target_pdf = PdfFileReader(file_path)

        for page in range(target_pdf.getNumPages()):
            output.addPage(target_pdf.getPage(page))

        with open("combined.pdf", "wb") as outputStream:
            output.write(outputStream)

        # 使用系统默认打印机打印合并后的 PDF
        os.startfile("combined.pdf", "print")
    except Exception as e:
        print(f"打印 PDF 文件时发生错误: {str(e)}")

# 打印
def openRrint():
    xlsx_path = getPathFile("xlsx")
    docx_path = getPathFile("docx")
    pdf_path = getPathFile("pdf")
    print(xlsx_path)
    print(docx_path)
    print(pdf_path)
    print(checkFileExistence(xlsx_path))
    print(checkFileExistence(docx_path))
    print(checkFileExistence(pdf_path))

    if checkFileExistence(xlsx_path):
        print(f"XLSX 文件存在: {xlsx_path}")
        printExcel(xlsx_path)

    if checkFileExistence(docx_path):
        print(f"DOCX 文件存在: {docx_path}")
        printWord(docx_path)

    if checkFileExistence(pdf_path):
        print(f"PDF 文件存在: {pdf_path}")
        printPDF(pdf_path)

if __name__ == "__main__":
    # 调用打印机
    openRrint()
    pass
