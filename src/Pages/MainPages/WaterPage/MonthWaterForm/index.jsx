import React,{useEffect,useState,useRef} from 'react' ;
import { DatePicker, Button,Empty ,Table } from 'antd';
import moment from 'moment'
import { SearchOutlined,DownloadOutlined,PrinterOutlined } from '@ant-design/icons';
import { getWhouseFlowForm } from 'Services/Home/search';
import { MessageTool } from 'Components/Tools/MessageTool';  
import { OutputExcel } from 'Components/Tools/OutputExcel';  
import { OutputPrint } from 'Components/Tools/OutputPrint';  

import Common from 'Common';
import Tools from 'Components/Tools/TablesData' 
import { reverseFormatDate} from 'Utils'
import './index.less';
  

function DayWaterForm(){  
    // 端点编码
    let typeList  = []  
    let afterObj =  {stcd:''}
    // 默认后缀
    const afterFix =  '-01 00:00:00' 
    // 初始化日期
    const [searchTxtObj,setSearchTxtObj] = useState({
        time:moment().format("YYYY-MM") + afterFix
    })  
    // 默认日期
    const [defaultValue,setDefaultValue] = useState(moment())
    
    // 加载中
    const [isLoading,setIsLoading] = useState(false)
    // 表格表头，和行列数据。
    const [columns,setColumns] = useState([])  
    const [dataSource,setDataSource] = useState([])  
    // 行列表格
    const [colArr,setColArr] = useState([])
    const [rowArr,setRowArr] = useState([])
    // 列数据（不含顶部栏的表头）
    let rowTitleArr  =  [
        {month:'最高水位'},
        {month:'发生时间'},
        {month:'最低水位'},
        {month:'发生时间'},
        {month:'平均水位'},  
    ]

 
    // 初始化加载
    useEffect(()=>{
        try{ 
            // 获取平均雨量
            let stcdString = ''  
            let t_columns = [
                {
                    title:'日期',
                    dataIndex:'month',
                    key:'month',
                    width:250
                }
            ];
            let t_echartNamesList = []
            let t_colArr = ['日期'] 
            let t_rowArr = ['日期'] 

            // （1.遍历列表头数据
            Common.waterData.forEach((item,index)=>{ 
                if(index == 0){ 
                    stcdString += item.stcd
                }else{ 
                    stcdString =  stcdString  + ',' + item.stcd 
                }
                t_columns.push({
                    title:item.stnm+'(米)',
                    dataIndex:'water'+item.stcd,
                    key:'water'+item.stcd,
                    width:140,
                }) 
                t_colArr.push(item.stnm+'(米)')

                // 间隔设置
                if(index == 0){ 
                    t_columns.push({
                        title:'库容(万立方米)',
                        dataIndex:'kurong'+item.stcd,
                        key:'kurong'+item.stcd,
                        width:160,
                    }) 
                    t_colArr.push('库容(万立方米)')
                }else if(index == 1){ 
                    t_columns.push({
                        title:'入库流量(立方米/秒)',
                        dataIndex:'inflow'+item.stcd,
                        key:'inflow'+item.stcd,
                        width:160,
                    }) 
                    t_colArr.push('入库流量(立方米/秒)')
                }else if(index == 2){ 
                    t_columns.push({
                        title:'出库流量(立方米/秒)',
                        dataIndex:'outflow'+item.stcd,
                        key:'outflow'+item.stcd,
                        width:160,
                    }) 
                    t_colArr.push('出库流量(立方米/秒)')
                }
                
            })      

            //  单位出库流量
            t_columns.push({
                title: '单位出库流量(立方米/秒)',
                dataIndex:'outflowPer' ,
                key:'outflowPer' ,
                width:160,
            }) 
            t_colArr.push( '单位出库流量(立方米/秒)')
            //  减少库容
            t_columns.push({
                title: '减少库容(万立方米)',
                dataIndex:'subkurongPer' ,
                key:'subkurong' ,
                width:160,
            }) 
            t_colArr.push( '减少库容(万立方米)')
            //  每日用水量
            t_columns.push({
                title: '每日用水量(万立方米)',
                dataIndex:'dayusePer' ,
                key:'dayusePer' ,
                width:160,
            }) 
            t_colArr.push( '每日用水量(万立方米)')
            //  降低水位
            t_columns.push({
                title: '降低水位(米)',
                dataIndex:'subwaterlinePer' ,
                key:'subwaterlinePer' ,
                width:160,
            }) 
            t_colArr.push( '降低水位(米)')
 
             
            // （2.遍历行表头数据
            rowTitleArr.forEach(item=>{
                t_rowArr.push(item.month)
            })

            // 默认搜索的站点
            afterObj = {
                stcd:stcdString
            }
            typeList = Common.waterData
 
            setColArr(t_colArr) 
            setRowArr(t_rowArr) 
            setColumns(t_columns)  

            // 设置默认日期 ，开启搜索(日期已经有默认值)
            // YYYY-MM-DD HH:mm:ss
            onSelectDate(null,moment().format('YYYY-MM'))
            setSearchTxtObj({
                ...searchTxtObj,
                stcd:stcdString
            }) 
            onSearchTable({
                ...searchTxtObj,
                stcd:stcdString
            })  
        }catch(err){
            console.log("出现异常",err)
            MessageTool('系统出现异常！请刷新重试','error')
        } 
    },[])


    //   搜索按钮
    const onSearchTable = (initData = null)=>{
        if(!searchTxtObj.time && !initData){   
            MessageTool('请选择月份','warning')
            return;
        }  
 
        // 1.温馨提示
        // setTimeout(()=>{
        //     MessageTool("温馨提示:当前数据量大！请耐心等待",'info')
        // },1000)

        // 2.获取远程数据
        let paramsObj = null
        if(Object.keys(initData) && Object.keys(initData).length ==2){
            paramsObj = initData
        }else{
            paramsObj = searchTxtObj  
        }  
        
        // 3.重新设置一下参数数据
        // let prefix = parseInt(paramsObj.time.slice(6,8)) + 1;  
        paramsObj = {  
            startTime: paramsObj.time,
            // overTime:paramsObj.time.slice(0,6) + prefix + paramsObj.time.slice(7),
            overTime:moment(paramsObj.time,'YYYY-MM-DD HH:mm:ss').add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
        } 

        // 4.查看查询的时间是否是超过当前时间
        // if(moment().format('YYYY-MM') < paramsObj.overTime.slice(0,7)){
        //     paramsObj["overTime"] = moment().subtract(1,'day').format('YYYY-MM-DD 00:00:00')
        // }

        // // 3.选择的时间比返回的数据早1年， 因此提交数据时需要新添加年。
        // let prefix = parseInt(paramsObj.time.slice(0,4)) + 1; 
        // paramsObj = {
        //     ...paramsObj,
        //     time:prefix + paramsObj.time.slice(4)
        // }

        // 4.重新设置站点数据
        typeList = Common.waterData
   
        setIsLoading(true)
        getWhouseFlowForm(paramsObj).then(res=>{
            //console.log("getWhouseFlowForm返回的数据是",res)
            setIsLoading(false)
             
            //  // （2.遍历行表头数据
             let new_data1 = res['data1:'].data.sort(); 
             let t_rowArr = [];
             let t_rowTitleArr = [];
             new_data1.forEach(item=>{
                 var name =  reverseFormatDate(item.tm )
                t_rowTitleArr.push({month:name})
            })  
            rowTitleArr = [...t_rowTitleArr,...rowTitleArr]
            rowTitleArr.forEach(item=>{
                t_rowArr.push(item.month)
            })
            setRowArr(t_rowArr)  

            let t_dataResource = Tools.handleWhouseFlowTableDataY(typeList,res,12,10,rowTitleArr)  
            setDataSource(t_dataResource)
        }).catch(err=>{ 
            setIsLoading(false)
            console.log("请求超时！请重试",err)
            MessageTool('请求超时！请重试','error')
        }) 
    }

    // 选择月期
    const onSelectDate = (date,dateString)=>{
        const fixDateString = dateString + afterFix; 
        const params = {
            ...searchTxtObj,
            time:fixDateString
        }
        setSearchTxtObj(params) 
    }

    // 导出Excel
    const handleOutput = (mode)=>{ 
        if(!dataSource || !dataSource.length){
            MessageTool("请等待当前数据加载！",'warning')
            return;
        }
  
        // 表格是隐藏表格（目的是为了良好的用户体验）
        const outputTableId = 'outTable-div'
        const excelFileName = `山口岩水库分月水位明细报表(${searchTxtObj.time.slice(0,4)})`;

        // 获取行列表头数据    
        // let rowArr = ['月份','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        // let colArr = ['月份','王狗冲','老庵里','新泉站（雨量）','西江口','张佳坊','闸室','新泉站','厂房']

        // 删除的行数据, 从1开始
        const deleteRow = null
        const deleteCol = null
 
        const rowMergesArr =  [
        //     {s: {r: 33, c: 1}, e: {r: 33, c: 12}}, 
        //     {s: {r: 34, c: 1}, e: {r: 34, c: 12}}, 
        //     {s: {r: 35, c: 1}, e: {r: 35, c: 12}}, 
        //     {s: {r: 36, c: 1}, e: {r: 36, c: 12}}, 
        //     {s: {r: 37, c: 1}, e: {r: 37, c: 12}}, 
        ]
        const appendBottom = '水位单位：米,库容单位：万立方米, 入库/出库流量单位：立方米/秒'+',查询时间：'+searchTxtObj.time.slice(0,4)+'年' 
        if(mode == 'excel'){ 
            OutputExcel(outputTableId,excelFileName,rowArr,colArr,deleteRow,deleteCol,rowMergesArr,appendBottom)
        }else{ 
            OutputPrint(outputTableId,excelFileName,rowArr,colArr,deleteRow,deleteCol,rowMergesArr,appendBottom)
        } 
    }
     


    return (
        <div className='dayWaterChart-div commTable-div'>
            <div className='body-top-div'>
                <div className='top-left'> 
                    <div className='date-div'>
                        <span>查询日期：</span>  
                        <DatePicker allowClear={false} inputReadOnly={true} onChange={onSelectDate} defaultValue={defaultValue}  picker="month" placeholder="请选择年份"/>
                    </div>
                    <Button type="default" shape="round"  onClick={onSearchTable}  size='default' icon={<SearchOutlined />}/>
                </div>
                <div className='top-right'>  
                    <div className='top-title'>分月水位明细报表</div>
                    <Button type="default" onClick={()=>handleOutput("excel")} shape="round" size='default' icon={<DownloadOutlined  />}>导出Excel</Button>
                    <Button type="default" onClick={()=>handleOutput("print")} shape="round" size='default' icon={<PrinterOutlined  />}>打印报表</Button>
                </div> 
            </div>
            <div className='body-bottom-div'>  
                <Table dataSource={dataSource} columns={columns}   loading={isLoading}   /> 
                <Table dataSource={dataSource} columns={columns}  id="outTable-div" pagination={false} style={{'display':"none"}}/>  
                {/* <img src={bgEmpty} className="empty-img-div" style={{display:isLoading ? 'block' : 'none'}} /> */}
            </div>
        </div>
    )
}

export default DayWaterForm;