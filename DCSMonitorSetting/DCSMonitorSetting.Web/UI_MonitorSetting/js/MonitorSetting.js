var SelectedNodeId;

$(function () {
    LoadTreeGridData("first");
    LoadPageDialog();
});
function LoadTreeGridData(myLoadType)
{
    $.ajax({
        type: "POST",
        url: "MonitorShellSetting.aspx/GetDCSMonitorMenu",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var m_TreeMsgData = jQuery.parseJSON(msg.d);
            if (myLoadType = "first")
            {
                LoadTreeGrid(m_TreeMsgData)

            } else if (myLoadType == 'last') {
                $('#MonitorSetting').datagrid('loadData', m_TreeMsgData);
            }    
        }
    });
}


function LoadTreeGrid(myData) {
    $('#MonitorSetting').treegrid({
        data: myData,
        dataType: "json",
        idField: 'id',
        treeField: 'text',
        rownumbers: true,
        singleSelect: true,
        frozenColumns: [[{
            width: '240',
            title: '节点名称',
            field: 'text', editor: 'text'
        }
        ]],
        columns: [[{
            width: '420',
            title: '页面链接',
            field: 'ViewUrl', editor: 'text'
        }, {
            width: '80',
            title: '显示顺序',
            field: 'DisplayIndex'
        }, {
            width: '50',
            title: '默认',
            field: 'DefaultView',
            formatter: function(value,row,index){
                if (row.NodeType == "") {return value;} else {return row.DefaultView = "";}
            }
        }, {
            width: '50',
            title: '使能',
            field: 'Enabled',
            formatter: function(value,row,index){
                if (row.NodeType == "") {return value;} else { return row.Enabled = ""; }}
        },{
            width: '100',
            title: '节点类型',
            field: 'NodeType',
            hidden: true,  
        },{
            width: '120',
            title: '操作',
            field: 'Op',
            formatter: function (value, row, index) {
                var str = '';
                if (row.NodeType == "LeafNode") {
                    /////////////////当为叶子节点时，需要添加页面///////////////////
                    str = '<img class="iconImg" src = "/lib/extlib/themes/images/ext_icons/notes/note_add.png" title="添加页面" onclick="AddPageFun(\'' + row.id + '\');"/>';
                }
                else if (row.NodeType =="") {
                    /////////////////对页面
                    str = '<img class="iconImg" src = "/lib/extlib/themes/images/ext_icons/folder/folder_edit.png" title="编辑页面" onclick="EditNodeFun(\'' + row.id + '\');"/>';
                    str = str + '<img class="iconImg" src = "/lib/extlib/themes/images/ext_icons/folder/folder_delete.png" title="删除页面" onclick="DeleteNodeFun(\'' + row.id + '\');"/>';
                }
                return str;
            }
        }
        ]],
        toolbar: '#toolbar'
        //onLoadSuccess: function (data) {
        //$('.iconImg').attr('src', '../../lib/extlib/themes/images/pixel_01.gif');
        //$('.iconImg').attr('width', '30');
        //parent.$.messager.progress('close');
        //}
    });
}

function AddPageFun(myNodeId) {
    $('#TextBox_PageContext').attr('value', '');
    $('#Combobox_PageIndex').combobox('setValue', 1);

    $('#Text_PageId').attr('value', '');
    $('#TextBox_NavigateUrl').attr('value', '');

    $('#Div_IconPath').removeClass();
    $('#Div_IconPath').addClass('iconImg ext-icon-page');

    $('#hidOperation').attr('value', '0');
    SelectedNodeId = myNodeId;

    $('#dlg_AddPage').dialog('open');
}

////////////////////////////加载PageInfoDialog////////////////////////
function LoadPageDialog() {
    //loading 用户dialog
    $('#dlg_AddPage').dialog({
        title: '编辑页面',
        width: 600,
        height: 210,
        closed: true,
        cache: false,
        modal: true,
        buttons: [{
            text: '编辑页面信息',
            handler: function () {
                var PageContext = $('#TextBox_PageContext').val();
                var PageIndex = $('#Combobox_PageIndex').combobox('getValue');
                var PageId = $('#Text_PageId').val();
                var PageNavigateUrl = $('#TextBox_NavigateUrl').val();
                var IconPath = $('#HiddenField_IconPath').val();

                var ModifyFlag = $('#HiddenField_ModifyFlag').val();

                var Valid_PageContext = $('#TextBox_PageContext').validatebox('isValid');
                var Valid_PageId = $('#Text_PageId').validatebox('isValid');

            //    if (Valid_PageContext && Valid_PageId) {
            //        if ($('#hidOperation').val() == 0) {
            //            $.ajax({
            //                type: "POST",
            //                url: "PageNodeInfo.aspx/AddPageNode",
            //                data: "{myParentNodeId:'" + SelectedNodeId + "',myNodeContext:'" + PageContext + "',myNodeType:'"
            //                        + NodeType_LeafNode + "',myNodeIndex:'" + PageIndex + "',myPageId:'" + PageId +
            //                        "',myNavigateUrl:'" + PageNavigateUrl + "',myIconPath:'" + IconPath + "'}",
            //                contentType: "application/json; charset=utf-8",
            //                dataType: "json",
            //                success: function (msg) {
            //                    if (msg.d == "1") {
            //                        alert("添加成功!");
            //                        $('#dlg_AddPage').dialog('close');
            //                        RefreshFun();

            //                    } else if (msg.d == "0") {
            //                        alert("添加失败!");
            //                    } else {
            //                        alert('必填项不能漏填!');
            //                    }
            //                }
            //            });
            //        }
            //        else {
            //            $.ajax({
            //                type: "POST",
            //                url: "PageNodeInfo.aspx/ModifyPageNode",
            //                data: "{myNodeId:'" + SelectedNodeId + "',myNodeContext:'" + PageContext + "',myNodeType:'"
            //                        + NodeType_LeafNode + "',myNodeIndex:'" + PageIndex + "',myPageId:'" + PageId +
            //                        "',myNavigateUrl:'" + PageNavigateUrl + "',myIconPath:'" + IconPath + "',myModifyFlag:'" + ModifyFlag + "'}",
            //                contentType: "application/json; charset=utf-8",
            //                dataType: "json",
            //                success: function (msg) {
            //                    if (msg.d == "1") {
            //                        alert("修改成功!");
            //                        $('#dlg_AddPage').dialog('close');
            //                        RefreshFun();
            //                    } else if (msg.d == "0") {
            //                        alert("其它用户已修改,修改失败!");
            //                    } else if (msg.d == "-1") {
            //                        alert('数据库错误!');
            //                    } else {
            //                        alert('必填项不能漏填!');
            //                    }
            //                }
            //            });
            //        }
            //    }
            //    else {
            //        alert('请您输入相关信息!');
            //    }
            }
        }]
    });
}