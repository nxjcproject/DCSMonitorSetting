using DCSMonitorSetting.Infrastructure.Configuration;
using SqlServerDataAdapter;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCSMonitorSetting.Service.MonitorSettingService
{
    public class MonitorShellSetting
    {
        public static DataTable GetDCSMonitorContent()
        {
            string connectionString = ConnectionStringFactory.NXJCConnectionString;
            ISqlServerDataFactory dataFactory = new SqlServerDataFactory(connectionString);
            string mySql = @" SELECT A.[NODE_ID],A.[NODE_CONTEXT],A.[PARENT_NODE_ID],'' as ViewUrl,NODE_INDEX as DisplayIndex,'' as DefaultView,'' as Enabled,[NODE_TYPE] as NodeType  FROM                       
							(SELECT * FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'
                            union
                            select * from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控')
                            union
                            select * from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'))
                            union
                            select * from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            (select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'))))
							) A
							union 
select ID as [NODE_ID],BtnName as [NODE_CONTEXT],NodeId as [PARENT_NODE_ID] ,ViewUrl,DisplayIndex,DefaultView,Enabled,'' as NodeType from [dbo].[ViewPageInfo]
where NodeId in 
	(SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'
                            union
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控')
                            union
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'))
                            union
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            (select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN (
                            select [NODE_ID] from [IndustryEnergy_SH].[dbo].[content] 
                            where [PARENT_NODE_ID] IN ( SELECT [NODE_ID] FROM [IndustryEnergy_SH].[dbo].[content] where [NODE_CONTEXT] like 'DCS监控'))))
							) 
							order by DisplayIndex";
            DataTable table  = dataFactory.Query(mySql);
            return table;    
        }
    }
}
