<template>
    <div class="root">
        <div class="logo">
            <!-- <img src="../../assets/Logoslogan2.png" alt=""> -->
            <div class="logo_view">
                <div class="left">
                    <img src="../../assets/144X144.png" alt="">
                </div>
                <div class="right">
                    <span>PEI DOU TECH</span>
                    <p>配兜科技</p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="view-wrapper">
                    <h2>用户登陆</h2>
                    <el-form class="formObj" ref="form" :rules="rules" :model="form" label-width="80px">
                        <el-form-item prop="username">
                            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item class="content_item" prop="password">
                            <el-input v-model="form.password" type="password" class="input-text" placeholder="请输入密码">
                            </el-input>
                        </el-form-item>
                        <p>登陆即表示您同意《毛葱用户服务协定》</p>
                        <el-form-item>
                            <el-button @click="submitForm('form')">登陆</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            secure: '',
            "result": [
                {
                    "id": 1,
                    "url": "homeManager",
                    "level": 0,
                    "permissionName": "首页",
                    "menuType": "1",
                    "children": [],
                    "code": "1",
                    "navigateIconClass": "el-icon-font-shouye"
                },
                {
                    "id": 2,
                    "url": "shopMan",
                    "level": 0,
                    "permissionName": "门店管理",
                    "menuType": "1",
                    "code": "2",
                    "navigateIconClass": "el-icon-font-tablelarge",
                    "children": [
                        {
                            "id": 20,
                            "url": "storeList",
                            "level": 1,
                            "permissionName": "门店列表",
                            "menuType": "1",
                            "code": "20",
                            "children": []
                        },
                        {
                            "id": 21,
                            "url": "clerkList",
                            "level": 1,
                            "permissionName": "店员列表",
                            "menuType": "1",
                            "code": "21",
                            "children": []
                        },
                        {
                            "id": 25,
                            "url": "storeFirst",
                            "level": 1,
                            "permissionName": "门店初审",
                            "menuType": "2",
                            "code": "25",
                            "children": []
                        },
                        {
                            "id": 26,
                            "url": "storeSecond",
                            "level": 1,
                            "permissionName": "门店复核",
                            "menuType": "2",
                            "code": "26",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 3,
                    "url": "quoteMan",
                    "level": 0,
                    "permissionName": "询价采购管理",
                    "menuType": "1",
                    "navigateIconClass": "el-icon-font-renminbi",
                    "code": "3",
                    "children": [
                        {
                            "id": 30,
                            "url": "quoteList",
                            "level": 1,
                            "permissionName": "询价报价",
                            "menuType": "1",
                            "code": "30",
                            "children": []
                        },
                        {
                            "id": 32,
                            "url": "purchaseOrderList",
                            "level": 1,
                            "code": "32",
                            "permissionName": "采购订单",
                            "menuType": "1",
                            "children": []
                        }
                    ]
                },
                {
                    "id": 4,
                    "url": "supplierMan",
                    "level": 0,
                    "permissionName": "供应商管理",
                    "menuType": "1",
                    "code": "4",
                    "navigateIconClass": "el-icon-font--gerenxinxi",
                    "children": [
                        {
                            "id": 40,
                            "url": "supplierList",
                            "level": 1,
                            "permissionName": "供应商列表",
                            "menuType": "1",
                            "code": "40",
                            "children": []
                        },
                        {
                            "id": 45,
                            "url": "supplierFirst",
                            "level": 1,
                            "permissionName": "供应商初审",
                            "menuType": "2",
                            "code": "45",
                            "children": []
                        },
                        {
                            "id": 45,
                            "url": "supplierSecond",
                            "level": 1,
                            "permissionName": "供应商复核",
                            "menuType": "2",
                            "code": "45",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 5,
                    "url": "financeMan",
                    "level": 0,
                    "permissionName": "财务管理",
                    "menuType": "1",
                    "navigateIconClass": "el-icon-font-caiwu",
                    "code": "5",
                    "children": [
                        {
                            "id": 50,
                            "url": "financeList",
                            "level": 1,
                            "permissionName": "支付状态审核",
                            "menuType": "1",
                            "code": "50",
                            "children": []
                        },
                    ]
                },
                {
                    "id": 6,
                    "url": "userMan",
                    "level": 0,
                    "permissionName": "用户管理",
                    "menuType": "1",
                    "navigateIconClass": "el-icon-font-authority",
                    "code": "6",
                    "children": [
                        {
                            "id": 60,
                            "url": "userDivide",
                            "level": 1,
                            "permissionName": "用户列表",
                            "menuType": "1",
                            "code": "60",
                            "children": []
                        },
                        {
                            "id": 61,
                            "url": "postDivide",
                            "level": 1,
                            "permissionName": "权限管理",
                            "menuType": "1",
                            "code": "61",
                            "children": []
                        },
                        {
                            "id": 62,
                            "url": "roleDivide",
                            "level": 1,
                            "permissionName": "角色管理",
                            "menuType": "1",
                            "code": "62",
                            "children": []
                        },
                    ]
                }
            ],
            rules: {
                username: [
                    { required: true, message: '请选择用户名', trigger: 'blur' }
                ],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                }]
            }
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const loginRes = await this.postData("A1001", this.form);
                    console.log(loginRes);
                    
                    let result = loginRes.res.data;
                    let token = result.token;
                    window.sessionStorage.setItem("gn_request_token", token)
                    let staffName = loginRes.res.data.userName;
                    this.$cookieStore.addCookie("staffName", staffName);
                    let addMenuObj = {
                        Token: token,
                        PageIndex: 1,
                        PageSize: 20
                    }
                    
                    let havePostList = loginRes.res.data.permissionList;
                    
                    let arr = loginRes.res.data.permissionList;
                    console.log(arr);
                
                    let newArr = [];

                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].level == 0) {
                                arr[i].children = [];
                                for (let j = 0; j < arr.length; j++) {
                                    if (arr[i].number == arr[j].parentNumber && arr[i].number != 0) {
                                        arr[j].children = [];
                                        arr[i].children.push(arr[j]);
                                    }
                                }
                                newArr.push(arr[i]);
                            }
                        }
                    }

                    let menuTreeList = newArr;
                    // let menuTreeList = this.result;
                    
                    window.sessionStorage.setItem("menuTreeList", JSON.stringify(menuTreeList));

                    window.sessionStorage.setItem("havePostList", JSON.stringify(havePostList));
                    
                    this.$router.push('/home');
                    // this.$router.replace('/home');
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>
//  style=""

.root {
    background-image: url('../../assets/Bg2.png');
    height: 100vh;
    z-index: 9999;
    background-size: 100% 100%;
    .logo {
        position: absolute;
        top: 57px;
        left: 69px;
        z-index: 100;
        .logo_view {
            display: flex;
            .left {
                img {
                    width: 83px; 
                    height: 83px;
                }
            }
            .right {
                margin-left: 20px;
                text-align: left;
                padding-top: 10px;
                span {
                    color: #fff;
                    font-size: 28px;
                }
                p {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }
    }
    .container {
        display: table;
        width: 1170px;
        height: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .row {
        display: table-cell;
        vertical-align: middle;
        margin-right: -15px;
        margin-left: -15px;
    }
    .view-wrapper {
        background-color: #fefefe;

        width: 384px;
        height: 478px;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 40px 40px 65px;
        box-sizing: border-box;
        // background: #fff;
        max-width: 400px;
        z-index: 100;
        margin: 0 auto;
        margin-right: 90px;
        h2 {
            color: #070911;
            font-size: 30px;
            font-weight: 500;
            margin-top: 20px;
            margin-bottom: 35px;
        }
    }
    .formObj /deep/ .el-input__inner {
        border: 0;
        border-bottom: 1px solid #d1d4dc;
    }
    .formObj {
        p {
            font-size: 13px;
            color: #b5b5b6;
            text-align: left;
            text-indent: 1em;
        }
        .el-input {
            height: 40px;
            border-width: 0 0 1px;
            border-color: rgba(28, 41, 82, 0.2);
            font-size: 18px;
            line-height: 40px;
            color: #070911;
            border-radius: 0;
        }
        .el-form-item {
            margin-bottom: 15px;
        }
        .el-form-item:first-child {
            margin-top: 10px;
        }
        .el-form-item:last-child {
            // margin-top: 10px;
            margin: 50px 0 15px;
        }
        .el-button {
            height: 40px;
            color: #fff;
            font-size: 18px;
            border-radius: 6px;
            background: #009794;
            // margin-top: 50px;
            width: 100%;
        }
        /deep/ .el-form-item__content {
            margin-left: 0 !important;
        }
        /deep/ .el-input__inner {
            margin-left: 0;
            border: 0;
            border-bottom: 1px solid #d1d4dc;
        }
        /deep/ .el-input__inner:hover {
            border-bottom: 1px solid #009592;
        }
    }
}
</style>

