import React,{useEffect,useState} from 'react' ;
import { Menu, Button } from 'antd'; 
import './index.css';
 

function WhouseChange(){
    const [collapsed,setCollapsed] = useState(false)
  

    return (
        <div className='helpPage-div  commTable-div' style={{'font-family':"'楷体','宋体'!important"}}>
                <h1 align="center">使用说明</h1>
                <h2>一、开发语言</h2> 
                <div className='box-title-div' style={{  // 修改开始
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '24px',
                    margin: '20px 0'
                }}> 
                    <h3>1.前端部分</h3> 
                    <div>前端采用React框架和Antd前端UI组件库进行项目的搭建，整个项目进行系统化开发，所有功能都进行过彻底的封装。
                        当前系统具有强大的伸缩性，以便于后期的维护与开发。
                    </div>  

                    <h3>2.后端部分</h3>
                    <div>后端采用python的框架flask，后端对数据的提取进行了多种方式的优化。极大地提高了数据提取速度，比较大程度上提升了
                        当前项目的性能。当前系统的后端数据接口由三个单独的后端项目，后期维护与开发请提前了解各项目的内容。
                    </div>  
                </div>
                
                {/* <h2>二、操作提示</h2> 
                <div className='box-title-div' style={{'margin-bottom':'3rem'}}> 
                    <h3>1.自动刷新</h3> 
                    <div> 实时水雨情部分，采取5分钟自动刷新的功能。表格定时更新滚动，图定时更新重绘</div>  

                    <h3>2.打印报表</h3> 
                    <div> 打印报表需要根据表格的高度和宽度，灵活选择橫向和纵向打印</div>  

                    <h3>3.更多选项</h3>
                    <div>当前的更多选项只适用于实时水雨情模块，它的功能是切换不同的表格数据</div>  

                    <h3>4.表格类型</h3>
                    <div>表格类型有紧缩型和扩展型，紧缩型是图表混合，扩展型是表格全屏</div>  
  
                    <h3>5.用户管理</h3>
                    <div>用户管理机制，管理员无法删除当前账号，也无法删除最后一个管理员账号。</div>  
                </div> */}

                
                {/* <h2>三、功能亮点</h2> 
                <div className='box-title-div' style={{'margin-bottom':'3rem'}}> 

                    <h3>1.实用功能</h3> 
                    <span>(1.各页面的导出Excel报表</span>
                    <span>(2.各页面的导出打印报表</span>
                    
                    <h3>2.权限区分</h3> 
                    <span>(1.可查询数据</span> 
                    <span>(2.自动登录功能</span>  
                    <span>(3.访问权限认证功能</span>  
 
                    <h3>3.高效页务</h3>
                    <span>(1.数据定时自动刷新</span>  
                    <span>(2.表格自动滚动功能</span> 
                    <span>(3.实时显示时间</span>
                    <span>(4.侧边栏伸缩功能</span>
                    <span>(5.首页表格扩展功能</span> 
 
                    <h3>4.性能提升</h3>
                    <span>(1.页面预加载功能</span>
                    <span>(2.页面跳转清理功能</span>
                    <span>(3.页面异常捕获功能</span>
                </div>  */}
             <hr />
        </div>
    )
}

export default WhouseChange;