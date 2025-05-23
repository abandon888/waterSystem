import axios from 'axios';
import {MessageTool} from '../../Components/Tools/MessageTool.js'

export const realData = async () => {
  try {
    const response = await axios.get(`https://water-api.hangyi.top/realtimeData`);
    const data = response.data.data
    console.log(data)
    let arr = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {
      update_time: data[i].update_time,
      temperature: data[i].temperature,
      tds: data[i].tds,
    };
    arr.push(obj);
  }
  return arr; 
  } catch (error) {
    MessageTool('系统出现异常！请刷新重试', 'error')
    throw new Error('获取水质数据失败，请稍后再试');
};
}

// Call filterData every 10 seconds
// setInterval(realData, 10000);