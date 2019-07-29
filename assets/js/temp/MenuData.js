;
(function() {
	var menuData = [{
			title: "首页",
			isFullScreen: true,
			link: "smart-search.html"
		},
		{
			title: "辖区概况",
			menuList: [{
					subTitle: "热力分布图",
					link: "face-monitoring-news.html"
				},
				{
					subTitle: "历史房屋数量分布",
					link: "index-menu.html"
				},
				{
					subTitle: "历史人口数量分布",
					link: "job-reminder-2.html"
				},
				{
					subTitle: "出行统计",
					link: "functionurlAction.do?goCxtj"
				},
				{
					subTitle: "年龄分布",
					link: "functionurlAction.do?goNlfb"
				},
				{
					subTitle: "重点人员",
					link: "functionurlAction.do?goZdry"
				},
				{
					subTitle: "重点车辆",
					link: "functionurlAction.do?goZdcl"
				}
			]
		},
		{
			title: "实时监控",
			menuList: [{
					subTitle: "门禁实时监控",
					link: "access-monitoring.html"
				},
				{
					subTitle: "车辆实时监控",
					link: "car-monitoring.html"
				},
				{
					subTitle: "人脸实时监控",
					link: "face-monitoring.html"
				},
				{
					subTitle: "wifi嗅探实时监控",
					link: "test-3.html"
				}
			]
		},
		{
			title: "综合管理",
			menuList: [{
					subTitle: "门禁模块",
					link: "functionurlAction.do?goZhglMjmk"
				},
				{
					subTitle: "车辆模块",
					link: "functionurlAction.do?goZhglClmk"
				},
				{
					subTitle: "人脸模块",
					link: "functionurlAction.do?goZhglRlmk"
				},
				{
					subTitle: "定位模块",
					link: "functionurlAction.do?goZhglDwmk"
				}
			]
		},
		{
			title: "工作提醒",
			menuList: [{
					subTitle: "人口异常",
					link: "functionurlAction.do?goGztxRkyc"
				},
				{
					subTitle: "房屋异常",
					link: "functionurlAction.do?goGztxFwyc"
				}
			]
		},
		{
			title: "轨迹分析",
			menuList: [{
				subTitle: "轨迹分析",
				link: "test.html"
			}]
		},
		{
			title: "分析决策",
			menuList: [{
				subTitle: "分析决策",
				link: "test.html"
			}]
		},
		{
			title: "系统管理",
			menuList: [{
				subTitle: "系统管理",
				link: "test.html"
			}]
		}
	];
	
	if(!window.menuData){
		window.menuData = menuData;
	}
})()