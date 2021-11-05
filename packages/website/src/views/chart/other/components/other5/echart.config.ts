/*
 * @Author: Lvhz
 * @Date: 2021-04-14 10:20:23
 * @Description: Description
 */

import * as echarts from 'echarts';

const colorList = ['#fea76d', '#82d7c4', '#01bed2', '#036199', '#FE938C', '#6e56ac'];
type ChartDataList = {
  name: string,
  value: number
}

const getDataList = (dataList: Array<ChartDataList>) => {
	const seriesDataList : Array<any> = [];
	for(let i=0; i<dataList.length; i++) {
		const data = dataList[i]
		seriesDataList.push({
			name: data.name,
			value: data.value,
			itemStyle: { color: colorList[i] }
		})
	}
	return { seriesDataList }
}

export const getOption = (dataList: Array<ChartDataList>) => {
  const { seriesDataList } = getDataList(dataList);
  return {
		background: 'transparent',
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {c}',
		},
		series: [{
			type: 'treemap',
			width: '100%',
			height: '100%',
			breadcrumb: {
				show: false,
			},
			label: {
				normal: {
					show: true,
					textStyle: {
						color: '#fff',
						fontSize: 16,
					},
				},
			},
			itemStyle: {
				normal: {
					show: true,
					borderWidth: 1,
					borderColor: '#fff',
				},
				emphasis: {
					label: {
						show: true,
					},
				},
			},
			data: seriesDataList,
		}],
	};
};
