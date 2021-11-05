/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

import * as echarts from 'echarts';

const funnelData =[
	{value: 60, name: '访问',type:'funnel'},
	{value: 50, name: '咨询',type:'funnel'},
	{value: 20, name: '订单',type:'funnel',
		itemStyle:{
			normal:{
				color: '#E25424'
			}
		}
	},
	{value: 80, name: '点击',type:'funnel'},
	{value: 100, name: '展现',type:'funnel',
		itemStyle:{
			normal:{
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 1,
					y2: 1,
					colorStops: [
						{
							offset: 0, color: 'red' // 0% 处的颜色
						}, {
							offset: 1, color: 'blue' // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				}
			}
		}
	}
];


const cvsWidth =950;
const cvsHeight = 150; // 画布高度
const optTop = 10; // 顶部距离
const optBottom= 10; // 底部距离
const maxs = 70;
const maxSize = maxs + '%';
const colorList = ['#E25424','#FCBB13','6DC0AC','#22B14C','#B5E61D'];
const rx =  (10+maxs) +'%';
const lx ='20%';
const lineData : Array<any> = [];
const pointData =[];

const funnelHeight = cvsHeight - optTop - optBottom;
const funnelItemHeight = funnelHeight / funnelData.length;
funnelData.sort((a,b)=> b.value - a.value).forEach((item,index)=>{
	// 好像是maxsize为125% ft 满屏
	const itemWidth = item.value * (maxs / 125);
	const y = index * funnelItemHeight + funnelItemHeight / 2 + optTop;

	lineData.push([
		{   
			name: '两个屏幕坐标之间的标线',
			x: (50+(itemWidth/2)) + '%',
			y: y
		},
		{
			x: rx,
			y: y,
			symbolSize:[1,1]
		}
	]);

	lineData.push([
		{   
			name: '两个屏幕坐标之间的标线',
			x: (50-(itemWidth/2)) + '%',
			y:y
		},
		{
			x: lx,
			y: y,
			symbolSize: [1,1]
		}
	]);

	pointData.push({
		name: '进入列表名称' + index,
		x: rx,
		y: y,
		symbol:'circle',
		symbolSize:[0,1],
		symbolOffset:[5,0],
		label: {
			normal:{
				color:'#fff',
				align:'left',
				fontSize: 12,
				offset: [5, 0]
			}
		}
	});

	pointData.push({
		name: '转化率' + index,
		x: lx,
		y: y,
		symbol:'circle',
		symbolSize:[0,1],
		symbolOffset:[-5,0],
		label:{
			normal:{
				color:'#fff',
				align:'right',
				fontSize:12,
				offset: [-5, 0]
			}
			
		}
	});
});

export const getOption = (dataList: Array<any>) => {
  return {
    tooltip: {
			trigger: 'item',
			formatter: function(tp : any){
				if(tp.data.type === 'funnel'){
					return tp.value;
				}
				return '';
			},
    },
    calculable: true,
    series: [{
			name:'漏斗图',
			type:'funnel',
			top: optTop,
			//x2: 80,
			bottom: optBottom,
			// height: 120,
			// height: {totalHeight} - y - y2,
			min: 0,
			max: 100,
			minSize: '0%',
			maxSize: maxSize,
			sort: 'descending',
			markPoint:{
				label:{
					normal:{
						show:true,
						formatter:function(pt:any){
							return pt.name;
						}
					}
				},
				data: pointData
			},
			markLine: {
				silent: true,
				lineStyle: {
					normal: {
						color:'#eeeeee',
						type:'solid'
					}
				},
				label: {
					normal: {
						show: false,
					},
				},
				data: lineData
			},
			gap: 2,
			label: {
				normal: {
					show: false,
				},
				emphasis: {
					show: false,
					textStyle: {
						fontSize: 20
					}
				}
			},
			data: funnelData,
		}]
	};
};
