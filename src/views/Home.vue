<template>
    <div class="rootCSS">
        <el-container>
            <el-aside class="aside">
                <div class="logo-view">
                    <div class="logo-content">
                        <div class="img-circle">
                            <img src="../assets/headPic.png" alt="">
                        </div>
                        <a class="username" href="javascript:;">
                            <strong>{{mainObj.staffName}}</strong>
                            <em @click="logout()">退出当前账户
                                <i class="el-icon-font-xiala"></i>
                            </em>
                        </a>
                    </div>
                </div>
                <div class="menu-view">
                    <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" background-color="#1c2952" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose">
                        <div v-for="(item, index) in mainObj.menuTreeList" :key="index" @click.stop="menuClick(item)">
                            <el-menu-item :index="`字符串${item.number}`" v-if="item.children.length == 0 && item.level == '0' && item.menuType == '1'">
                                <i :class="item.navigateIconClass"></i>
                                <span slot="title">{{item.permissionName}}</span>
                            </el-menu-item>
                            <el-submenu :index="`字符串${item.number}`" v-if="item.children.length > 0 && item.level == '0' && item.menuType == '1'">
                                <template slot="title">
                                    <i :class="item.navigateIconClass"></i>
                                    <span slot="title">{{item.permissionName}}</span>
                                </template>
                                <div v-for="(item1, index1) in item.children" :key="index1" @click.stop="menuClick(item1)">
                                    <el-menu-item :index="`字符串${item1.number}`" v-if="item1.children.length == 0 && item1.menuType == '1'">
                                        <span slot="title">{{item1.permissionName}}</span>
                                    </el-menu-item>
                                    <el-submenu :index="`字符串${item1.number}`" v-if="item1.children.length > 0 && item1.menuType == '1'">
                                        <template slot="title">
                                            <span>{{item1.permissionName}}</span>
                                        </template>
                                    </el-submenu>
                                </div>
                            </el-submenu>
                        </div>
                    </el-menu>
                </div>
            </el-aside>
            <el-main>
                <nav>
                    <div class="nav-header">
                        <a class="menu-btn" href="javascript:;">
                            <i class="el-icon-font-caidan"></i>
                        </a>
                    </div>
                    <div class="nav-tabs">
                        <el-dropdown class="site-tabs__tools" :show-timeout="0">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                                <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                                <el-dropdown-item @click.native="clearTab">关闭全部标签页</el-dropdown-item>
                                <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-tabs v-model="mainObj.editableTabsValue" type="card" closable @tab-remove="removeTab">
                            <el-tab-pane v-for="(item, index) in mainObj.editableTabs" :key="item.name" :label="item.title" :name="item.name" lazy>
                                <div class="rootBox">
                                    <component class="root" v-if="index != mainObj.showComponent" :is="item.content" @backParam="backParam($event)"
                                    :paramsObj="item.content" :homeStatus="homeStatus"></component>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </nav>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import homeManager from "./homePage.vue"

// 用户类
import userDivide from "../hrm/views/userDivide"
import postDivide from "../hrm/views/postDivide"
import roleDivide from "../hrm/views/roleDivide"

// 门店类
import storeList from "../storeMan/views/storeList"
import addStoreInfo from "../storeMan/views/addStoreInfo"
import editStoreInfo from "../storeMan/views/editStoreInfo"
import clerkList from "../storeMan/views/clerkList"

// 询价报价
import quoteList from "../quote/views/quoteList"
import quoteOrderList from "../quote/views/quoteOrderList"
import addQuoteList from "../quote/views/addQuoteList"


// 采购订单
import purchaseOrderList from "../purchase/views/purchaseOrderList"
import purchaseOrderDetail from "../purchase/views/purchaseOrderDetail"

// 供应商类
import supplierList from "../supplier/views/supplierList"
import addSupplier from "../supplier/views/addSupplier"
import editSupplier from "../supplier/views/editSupplier"
import verifySupplier from "../supplier/views/verifySupplier"

// 财务
import financeList from "../finance/views/financeList"
import financeListSecond from "../finance/views/financeListSecond"
import oldOrderList from "../finance/views/oldOrderList"

export default {
    data () {
        return {
            mainObj: {
                showComponent: -1,
                menuTreeList: [],
                editableTabs: [], // 显示tab页的集合
                editableTabsValue: '2', // 当前tab的model
                tabIndex: 0, // 当前tab页
                staffName: '',
            },
            currentMenu: "1", // 当前菜单页
            homeStatus: '',
        }
    },
    async created () {
        var vm = this;
        vm.mainObj.staffName = this.$cookieStore.getCookie("staffName");
        
        vm.mainObj = JSON.parse(window.sessionStorage.getItem("_mainObj")) || vm.mainObj;
        
        vm.mainObj.menuTreeList = JSON.parse(
            window.sessionStorage.getItem("menuTreeList")
        );
        
        
        // 默认在首页页签
        if (vm.mainObj.editableTabs.length <= 0) {
            vm.mainObj.editableTabs.push({
                title: "首页",
                name: "0",
                content: "homeManager"
            });
            vm.mainObj.editableTabsValue = "0";
        }

        //默认组件显示
        vm.mainObj.showComponent = -1;
    },
    components: {
        homeManager,
        userDivide,
        postDivide,
        roleDivide,

        quoteList,
        quoteOrderList,
        purchaseOrderList,
        addQuoteList,
        purchaseOrderDetail,
        
        storeList,
        addStoreInfo,
        clerkList,
        editStoreInfo,

        supplierList, // 供应商管理
        addSupplier, // 添加供应商
        editSupplier, // 修改供应商
        verifySupplier, // 供应商审核

        financeList, // 财务
        financeListSecond,
        oldOrderList,
    },
    methods: {
        // 退出登陆
        logout () {
            console.log(1111);
            let token = window.sessionStorage.getItem("gn_request_token");
            if (token) {
                this.$confirm("是否退出登陆？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    window.sessionStorage.removeItem('menuTreeList');
                    window.sessionStorage.removeItem('gn_request_token')
                    window.sessionStorage.removeItem('havePostList')
                    window.sessionStorage.removeItem('_mainObj');
                    this.$router.push('/login');
                });
            }
        },
        // 点击菜单
        menuClick (cur) {
            
            // 看是否还有下级菜单，若存在下级菜单，则只展开菜单，若无下级菜单就新增tab页
            for (let i = 0; i < cur.children.length; i++) {
                if (cur.children[i].menuType == "1") {
                    return;
                }
            }
            let menuName = cur.permissionName;
            let flag = true;
            
            for (let i = 0; i < this.mainObj.editableTabs.length; i++) {
                // 导航名 在不在 tabs集合里
                if (menuName == this.mainObj.editableTabs[i].title) {
                    flag = false;
                    // 显示在的那个name的tab
                    this.mainObj.editableTabsValue = this.mainObj.editableTabs[
                        i
                    ].name;
                    break;
                }
            }
            // 导航名不在tabs集合里 就++1
            if (flag) {
                let newTabName = ++this.mainObj.tabIndex + "";
                this.mainObj.editableTabs.push({
                    title: cur.permissionName,
                    name: newTabName,
                    content: cur.url
                });

                this.mainObj.editableTabsValue = newTabName;
            }
            //页签信息保存在本地
            window.sessionStorage.setItem(
                "_mainObj",
                JSON.stringify(this.mainObj)
            );

        },
        handleOpen (key, keyPath) {
        },
        handleClose (key, keyPath) {
        },
        // 删除tab
        removeTab (targetName) {
            let tabs = this.mainObj.editableTabs;
            // 遍历tabs集合  判断集合name === 要删除的targetName
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].name === targetName) {
                    // 首页不准删除
                    if (tabs[i].content === "homeManager") {
                        return;
                    }
                }
            }
            
            let activeName = this.mainObj.editableTabsValue;
            
            if (activeName === targetName) {
                tabs.forEach((item, index) => {
                    if (item.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.mainObj.editableTabsValue = activeName;
            this.mainObj.editableTabs = tabs.filter(tab => tab.name !== targetName || tab.content == "homeManager");
            window.sessionStorage.setItem(
                "_mainObj",
                JSON.stringify(this.mainObj)
            );
        },
        // 标签
        backParam (val) {
            console.log(val);
            // this.homeStatus
            if (val.param) {
                if (val.param.status) {
                    this.homeStatus = val.param.status
                }
            }
            if (val.flag === "del") {
                this.operateDelTabs(val);
            } else {
                this.operateAddTabs(val);
            }
        },
        //新增页签
        operateAddTabs (val) {
            let menuName = val.menuName;
            let flag = true;
            for (let i = 0; i < this.mainObj.editableTabs.length; i++) {
                if (menuName == this.mainObj.editableTabs[i].title) {
                    flag = false;
                    //先关闭已经打开的页签
                    this.mainObj.editableTabsValue = this.mainObj.editableTabs[
                        i
                    ].name;
                    this.refresh(i);
                    break;
                }
            }

            /**
             * title：标签名字
             * name：标签下标
             * content：标签item
             */

            if (flag) {
                let newTabName = ++this.mainObj.tabIndex + "";
                this.mainObj.editableTabs.push({
                    title: val.menuName,
                    name: newTabName,
                    content: val.item,
                });
                this.mainObj.editableTabsValue = newTabName;
            }

            //页签信息保存在本地
            window.sessionStorage.setItem(
                "_mainObj",
                JSON.stringify(this.mainObj)
            );
        },
        //关闭已经打开的页签
        operateDelTabs (val) {
            let item = val.item;
            for (let i = 0; i < this.mainObj.editableTabs.length; i++) {
                if (item == this.mainObj.editableTabs[i].content) {
                    let delName = this.mainObj.editableTabs[i].name;
                    this.removeTab(delName);
                    break;
                }
            }
        },
        //关闭当前标签
        tabsCloseCurrentHandle() {
            this.removeTab(this.mainObj.editableTabsValue);
        },
        //关闭其他标签
        tabsCloseOtherHandle() {
            let mainTab = {
                title: "首页",
                name: "0",
                content: "homeManager"
            };
            this.mainObj.editableTabs = this.mainObj.editableTabs.filter(item => item.name === this.mainObj.editableTabsValue || item.name === "0");
            if (this.mainObj.editableTabsValue === "0") {
                this.mainObj.editableTabsValue = this.mainObj.editableTabs[0].name;
            } else {
                this.mainObj.editableTabsValue = this.mainObj.editableTabs[1].name;
            }
            // 页签信息保存在本地
            window.sessionStorage.setItem(
                "_mainObj",
                JSON.stringify(this.mainObj)
            );
        },
        // 关闭全部标签页
        clearTab(command) {
            // 删除首页以外的数组值
            this.mainObj.editableTabs.splice(
                1,
                this.mainObj.editableTabs.length - 1
            );
            // 显示首页
            this.mainObj.editableTabsValue = this.mainObj.editableTabs[0].name;
            // 页签信息保存在本地
            window.sessionStorage.setItem(
                "_mainObj",
                JSON.stringify(this.mainObj)
            );
        },
        //刷新当前标签页
        tabsRefreshCurrentHandle() {
            for (let i = 0; i < this.mainObj.editableTabs.length; i++) {
                if (this.mainObj.editableTabs[i].name === this.mainObj.editableTabsValue) {
                    this.refresh(i);
                }
            }
        },
        //点击刷新
        refresh (index) {
            this.mainObj.showComponent = index;
            this.$nextTick(() => {
                this.mainObj.showComponent = -1;
            });
        },
    }
}
</script>

<style lang="less" scoped>
.rootCSS {
    // min-height: 100vh;
    height: 100vh;
    width: 100vw;
    background-color: #f6f6f6;
    
    overflow: hidden;
    .el-container {
        // min-height: 100vh;
        height: 100vh;
    }
    .aside {
        .logo-view {
            .logo-content {
                width: 206px;
                height: 105px;
                padding: 33px 25px;
            }
            .img-circle {
                width: 64px;
                height: 64px;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .username {
                strong {
                    font-weight: 600;
                    color: #fff;
                    display: block;
                    margin-top: 7px;
                    margin-bottom: 2px;
                }
                em {
                    color: rgba(225, 225, 225, 0.4);
                    font-size: 13px;
                }
            }
        }
        width: 256px !important;
        background-color: #1c2952;
        /deep/ .el-menu {
            border: none;
        }
        .menu-view {
            /deep/ .el-menu-item,
            /deep/ .el-submenu__title {
                height: 46px;
                line-height: 46px;
                text-align: left;
                i {
                    margin-right: 5px;
                    color: inherit;
                }
                .iconfont {
                    font-size: 16px;
                    vertical-align: middle;
                    margin-left: 5px;
                }
                span {
                    margin-left: 5px;
                }
            }
            /deep/ .el-menu--inline {
                span {
                    margin-left: 15px;
                }
            }
        }
    }
    .el-main {
        overflow: hidden;
    }

    .nav-header {
        background-color: #fff;
        height: 50px;
        border-bottom: 1px solid #e7eaec;
        .menu-btn {
            padding: 2px 7px;
            margin: 14px 5px 5px 20px;
            float: left;
            border-radius: 4px;
            background-color: #009794;
            border-color: #009794;
            color: #ffffff;
            .el-icon-font-caidan {
                font-size: 24px !important;
                
            }
        }
    }

    .nav-tabs {
        background-color: #fff;
        position: relative;
        .site-tabs__tools {
            position: absolute;
            top: 3px;
            right: 25px;
            z-index: 931;
            height: 28px;
            padding: 0 12px;
            font-size: 16px;
            line-height: 27px;
            margin-top: 5px;
            background-color: #fff;
            cursor: pointer;
        }
        /deep/ .el-tabs__nav-wrap {
            border-bottom: solid 2px #1c2952;
            box-sizing: border-box;
            padding-left: 40px;
        }
        /deep/ .el-tabs__header {
            margin-bottom: 0;
        }
    }
    .rootBox {
        background-color: #f6f6f6;
        padding: 20px;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .root {
        background-color: #fff;
        height: calc(100vh - 135px);
        overflow: auto;
    }
}
</style>

