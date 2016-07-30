using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DCSMonitorSetting.Web.UI_MonitorSetting
{
    public partial class MonitorShellSetting : WebStyleBaseForEnergy.webStyleBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        [WebMethod]
        public static string GetDCSMonitorMenu()
        { 
            DataTable table=DCSMonitorSetting.Service.MonitorSettingService.MonitorShellSetting.GetDCSMonitorContent();
            string[] columns = { "ViewUrl", "DisplayIndex", "DefaultView", "Enabled", "NodeType" };
            string json = EasyUIJsonParser.TreeGridJsonParser.DataTableToJson(table, "NODE_ID", "NODE_CONTEXT", "PARENT_NODE_ID", "CF44BF59-FF64-4D3D-80D7-81C790C2AB52", columns);
            json = json.Replace("NODE_ID", "id").Replace("NODE_CONTEXT", "text");
            return json;       
        }
    }
}