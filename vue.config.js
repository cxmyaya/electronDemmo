const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    "externals": {
      "fs": 'require("fs")',
      "path": 'require("path")',
  },
  },
  pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				nsis: {
					allowToChangeInstallationDirectory: true, //自定义安装路径
					oneClick: false,
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true, // 创建开始菜单图标
				},
				win: {
					publish: [{
						provider: "generic",
						url: "D:/TBworkspace/test/electron-demo/dist_electron/"  //更新包地址  
					}],
				},
        "publish": ["github"
          // {
          //   "provider": "github", //打包上传到github
          //   "owner": "cxmyaya", //仓库所有者
          //   "repo": "electronDemo" ,//仓库名称
          //   "private": false, //若是私有仓库，则将私有设置为true，同时添加token，反之不需要设置
          //   "token": "", //github的私有token
          //   "releaseType": "release" //上传到github的版本类型（draft:草稿，prerelease:提前发行版，release:发行版）
          // }
        ],
				productName: 'electron-demo'  //项目名
			}
		},
	}

 
})
