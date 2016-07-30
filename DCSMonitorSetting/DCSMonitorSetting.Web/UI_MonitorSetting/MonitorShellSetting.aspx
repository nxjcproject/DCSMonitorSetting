<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MonitorShellSetting.aspx.cs" Inherits="DCSMonitorSetting.Web.UI_MonitorSetting.MonitorShellSetting" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="/lib/ealib/themes/gray/easyui.css" />
    <link rel="stylesheet" type="text/css" href="/lib/ealib/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="/lib/extlib/themes/syExtIcon.css" />
    <link rel="stylesheet" type="text/css" href="/lib/extlib/themes/syExtCss.css" />

    <script type="text/javascript" src="/lib/ealib/jquery.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/lib/ealib/jquery.easyui.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/lib/ealib/easyui-lang-zh_CN.js" charset="utf-8"></script>

    <!--[if lt IE 8 ]><script type="text/javascript" src="/js/common/json2.min.js"></script><![endif]-->
    <script type="text/javascript" src="js/MonitorSetting.js" charset="utf-8"></script>
</head>
<body>
     <div class="easyui-layout" data-options="fit:true,border:false" style="padding: 5px;">
          <div id="toolbar" style="display: none;">
            <table>
	            <tr>
	                <td>
		                <table>
	                        <tr>
			                    <td><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="AddNodeFun('0');">添加根节点</a></td>
                                <td><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'ext-icon-arrow_up',plain:true" onclick="MoveContentFun();">移动节点</a></td>
                                <td><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'ext-icon-arrow_in',plain:true" onclick="CollapseAllFun();">全部折叠</a></td>
			                    <td><div class="datagrid-btn-separator"></div></td>
                                <td><a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-reload',plain:true" onclick="RefreshFun();">刷新</a></td>
                            </tr>
                        </table>
		            </td>
                </tr>
	        </table>
        </div>
            <div data-options="region:'center',title:''" style="padding:5px">
                <table id="MonitorSetting"></table>
            </div>
    </div>
      <%--------------------------------------------------dialog添加页面------------------------------------------%>
    <div id="dlg_AddPage" class="easyui-dialog" data-options="iconCls:'icon-save',resizable:false,modal:true">
        <fieldset>
		    <legend>画面基本信息</legend>
		    <table class="table" style="width: 100%;">
			    <tr>
				    <th>画面名称</th>
				    <td>
                        <input id = "TextBox_PageContext" class="easyui-validatebox" data-options="required:true"  style="width:120px"/>
                    </td>
				    <th>显示顺序</th>
				    <td>
                        <select id = "Combobox_PageIndex" class="easyui-combobox" name="state" style="width:80px;">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                    <option value="3">3</option>
		                    <option value="4">4</option>
		                    <option value="5">5</option>
		                    <option value="6">6</option>
		                    <option value="7">7</option>
		                    <option value="8">8</option>
		                    <option value="9">9</option>
		                    <option value="10">10</option>
		                    <option value="11">11</option>
		                    <option value="12">12</option>
		                    <option value="13">13</option>
		                    <option value="14">14</option>
		                    <option value="15">15</option>	     
	                    </select>
                    </td>
                     <th>默认</th>
				    <td>
                        <input id = "Text_PageId" class="easyui-validatebox" data-options="required:true"  style="width:40px"/>
                    </td>
				    <th>可见</th>
				    <td>
                         <input id = "Div_IconPath" class="easyui-validatebox" data-options="required:true"  style="width:40px"/>
                    </td>
			    </tr>
                 <tr>
                    <th>链接地址</th>
				    <td colspan = "7">
                        <input id = "TextBox_NavigateUrl" class="easyui-validatebox" />
                    </td>
                </tr>               
		    </table>
	    </fieldset>
    </div>
</body>
</html>
