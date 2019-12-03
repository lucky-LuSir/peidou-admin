<template>
    <!-- 待报价 -->
    <div class="root">
        <div class="header clearfix">
            <h2>询价信息
                <i class="status">待报价</i>
            </h2>
            <div class="parts-title">
                <span>配件清单</span>
            </div>
        </div>
        <el-form :model="quoteForm" :rules="rules" ref="ruleForm" label-width="100px" class="main clearfix">
            <div class="main-left">
                <div class="slide-wrapper">
                    <div class="middle_img" @mouseover="boxMouseOver" @mouseleave="boxMouseLeave">
                        <el-image style="width: 100px; height: 100px" :src="middleImg" :fit="fit"></el-image>
                        <div class="shade" @mouseover="shadeMouseOver" @mousemove="shadeMouseMove" ref="shade" v-show="isShade"></div>
                    </div>
                    <div class="carousel">
                        <div class="left_arrow arrow" @click="leftArrowClick">
                            <i class="el-icon-arrow-left"></i>
                        </div>
                        <div class="show_box">
                            <ul class="picture_container" ref="middlePicture">
                                <li class="picture_item" @mouseover="tabPicture(item)" v-for="(item, index) in pictureList" :key="index">
                                    <img :src="item.url" class="small_img" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="right_arrow arrow" @click="rightArrowClick">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="left-content">
                    <el-row style="margin-bottom: 16px;">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            询价编号: {{quoteForm.inquiryID}}
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            申请时间: {{quoteForm.createDateTime}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item style="text-align: left; margin-left: -55px;" label="车型:" prop="maker">
                                <el-input class="VINCLASS" size="small" v-model="quoteForm.maker" placeholder="请输入车型"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item style="text-align: left; margin-left: -55px;" label="VIN：" prop="vinCode">
                                <el-input class="VINCLASS VINCODES" size="small" v-model="quoteForm.vinCode" placeholder="请输入VIN"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 16px;">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            询价门店: {{quoteForm.garagrName}}
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <div class="quote-radio _width280">
                                <i class="_label14">结算方式：</i>
                                <el-radio v-model="quoteForm.isAccounts" label="1">挂账</el-radio>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="最后付款日期：" prop="expireDatetime">
                                <el-date-picker size="small" v-model="quoteForm.expireDatetime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="物流名称：" prop="expressName">
                                <el-input v-model="quoteForm.expressName" size="small" placeholder="请输入物流名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="物流地址：" prop="addValue">
                                <!-- <el-autocomplete size="small" v-model="addValue" :fetch-suggestions="querySearch" placeholder="请输入收货地址" clearable></el-autocomplete> -->
                                <el-select size="small" filterable v-model="quoteForm.addValue" placeholder="请选择收货地址">
                                    <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button @click="addAddrFn()" style="margin-left: 5px;" size="small" type="primary">新增地址</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="invoice">
                        <el-col style="padding-left: 20px;" class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="发票:" prop="invoiceType">
                                <el-radio-group v-model="quoteForm.invoiceType">
                                    <el-radio :label="1">无票</el-radio>
                                    <el-radio :label="2">普票</el-radio>
                                    <el-radio :label="3">专票</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="main-right">
                <div class="right_contanier" v-show="isBig">
                    <img :src="middleImg" ref="bigImg" class="big_img" alt="">
                </div>
                <div class="supplier-select">
                    <!-- <span class="supplier-label"></span> -->
                    <el-form-item label="供应商：" prop="supplierID">
                        <el-select v-model="quoteForm.supplierID" size="small" filterable placeholder="请选择">
                            <el-option v-for="item in supplierList" :key="item.supplierID" :label="item.supplierName" :value="item.supplierID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="supplier-list">
                    <el-table :data="tableData" @current-change="handleCurrentChange">
                        <el-table-column type="index" width="50" label="序号" prop="componentID">
                        </el-table-column>
                        <el-table-column prop="partName" label="配件名称" width="180">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.partName" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oeCode" label="OE编号" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.oeCode" placeholder="请输入配件编号" size="small"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="quantity" label="数量" width="120">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.quantity" size="small" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="specification" label="品质" width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.specification" size="small" placeholder="请选择">
                                    <el-option v-for="item in specificationList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="报价" width="240">
                            <template slot-scope="scope">
                                <div class="quoted-price">
                                    <div class="left">
                                        <span>单价: ¥</span>
                                        <el-input v-model="scope.row.price" size="small"></el-input>
                                    </div>
                                    <div class="right">
                                        <i>¥ {{ scope.row.quantity * scope.row.price | ToFixed }}</i>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="servicePrice" label="退货费率" width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.servicePrice" size="small" placeholder="退货费率">
                                    <el-option v-for="item in servicePriceList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                                    移除
                                </el-button>
                                <el-button @click.native.prevent="addRow(scope.$index, tableData)" type="text" size="small">
                                    添加
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-summary">
                        <div class="summary-num">
                            共 {{totalNums}} 件
                        </div>
                        <div class="summary-price">
                            合计: {{ totalPrice | ToFixed }}
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <div class="btn-list">
                        <el-button @click="cancelFn()" plain size="small">取消询价</el-button>
                        <el-button type="primary" size="small" @click="storageFn()">暂存配件清单</el-button>
                        <el-button @click="submitFn('ruleForm')" type="primary" size="small">发布报价</el-button>
                    </div>
                </el-form-item>
            </div>
        </el-form>
        <el-dialog title="新增收货地址" width="500px" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="addAddressObj" :rules="rules" ref="addAddressObj" class="addAddressObj">
                <el-form-item label="收货地址：" prop="name">
                    <el-input size="small" v-model="addAddressObj.addName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addAddressFn()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
        middleImgWidth: {
            default: 450,
            type: Number
        }, // 产品图片宽
        middleImgHeight: {
            default: 270,
            type: Number
        }, // 产品图片高
        thumbnailHeight: {
            default: 100,
            type: Number
        }, // 缩略图容器高度
        imgList: Array, // 图片数据
        zoom: {
            default: 2, // 缩略比例,放大比例
            type: Number
        }
    },
    data () {
        return {
            supplierList: [],
            quoteForm: {
                maker: '', // 车型
                vinCode: '', // VIN
                expireDatetime: '', //最后付款日期
                supplierID: '',
                invoiceType: 1, // 发票类型
                AddrID: '', // 物流ID
                expressName: '',
                addValue: '',
            },
            addAddressObj: {
                addName: "",
            },
            dialogFormVisible: false,
            rules: {
                maker: [
                    { required: true, message: '请输入车型', trigger: 'change' },
                ],
                vinCode: [
                    { required: true, message: '请输入VIN码', trigger: 'change' },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/,
                        message: 'VIN码必须17位字母和数字',
                        trigger: 'change'
                    }
                ],
                expireDatetime: [
                    { required: true, message: '请输入最后付款日期', trigger: 'change' },
                ],
                expressName: [
                    { required: true, message: '请输入物流名称', trigger: 'change' },
                ],
                supplierID: [
                    { required: true, message: '请输入供应商', trigger: 'change' },
                ],
                addValue: [
                    { required: true, message: '请输入物流地址', trigger: 'blur' },
                ],
                invoiceType: [
                    { required: true, message: '请选择发票类型', trigger: 'change' },
                ],
            },
            tableData: [
                {
                    componentID: '',
                    partName: '',
                    quantity: 1,
                    oeCode: '',
                    specification: '',
                    price: '',
                    servicePrice: 0.05,
                },
            ],
            specificationList: [
                {
                    value: 2,
                    label: '品牌件'
                },
                {
                    value: 1,
                    label: '原厂件'
                },
                {
                    value: 3,
                    label: '拆车件'
                },
                {
                    value: 6,
                    label: '再制造'
                },
                {
                    value: 5,
                    label: '无限制'
                },
                {
                    value: 4,
                    label: '其他'
                },
            ],
            servicePriceList: [
                {
                    value: 0.05,
                    label: '5%'
                },
                {
                    value: 1,
                    label: '不可退货'
                }
            ],
            radio: '1',
            addressList: [],
            garageID: '',
            picArrList: [], // 轮播图
            restaurants: [],
            addsID: '',
            fit: 'contain',
            url: 'http://img.maocongwang.com//1573810306187.png',
            pictureList: [

                { url: 'http://img.maocongwang.com//1573810306187.png' },
                { url: 'https://outter-common.toodc.cn/pc_index_jiashan_20191119.png' },
                { url: 'http://img.maocongwang.com//1574244208251.jpeg' },
                { url: 'http://img.maocongwang.com//1574244208642.jpeg' },
                { url: 'http://img.maocongwang.com//1574244208907.jpeg' },
                { url: 'http://img.maocongwang.com//1574244209017.png' },
                { url: 'http://img.maocongwang.com//1574244208642.jpeg' },
                { url: 'http://img.maocongwang.com//1574244208907.jpeg' },
            ],
            middleImg: '', // 中图图片地址
            bigImg: '', // 大图图片地址
            isShade: false, // 控制阴影显示与否
            isBig: false, // 控制放大图显示与否
            initX: 296, // 初始clientX值
            initY: 195, // 初始clientY值
            leftX: 0, // 初始定位left
            topY: 0, // 初始定位top
            middleLeft: 0, // 当前放置小图盒子的定位left值,
            itemWidth: 90, // 缩略图每张的宽度
        }
    },
    computed: {
        totalPrice () {
            var totalprice = 0;
            this.tableData.forEach((item, index) => {
                totalprice += item.quantity * item.price;
            });
            return totalprice;
        },
        totalNums () {
            var totalNums = 0;
            this.tableData.forEach((item, index) => {
                totalNums += item.quantity
            });
            return totalNums;
        }
    },
    created () {
        var date1 = new Date();
        var date2 = new Date(date1);
        let date3 = date2.setDate(date1.getDate() + 30);
        this.quoteForm.lastDate = new Date(date3);

        this.quoteForm.expireDatetime = new Date();

        let quoteStatusObj = JSON.parse(window.sessionStorage.getItem("quoteStatusObj"));
        this.inquiryID = quoteStatusObj.inquiryID;
        this.getDetailFn();
        this.getSupplierListFn();

        if (this.imgList && this.imgList.length) {
            this.pictureList = this.imgList
        }
        this.middleImg = this.pictureList[0].url
        // 计算缩略图的宽度,默认是显示4张图片,两边箭头的宽度和为50
        this.itemWidth = (this.middleImgWidth - 50) / 4
    },
    mounted() {
        this.$nextTick(() => {
            // 容器的高
            const imgWidth = this.middleImgHeight + this.thumbnailHeight + 20
            // 设置产品图宽高
            $('.middle_img').css({
                width: this.middleImgWidth,
                height: this.middleImgHeight
            })
            // 设置移动阴影图宽高
            $('.middle_img .shade').css({
                width: this.middleImgWidth / this.zoom,
                height: this.middleImgHeight / this.zoom
            })
            // 设置缩略图容器高
            $('.carousel').css({
                height: this.thumbnailHeight
            })
            // 设置每个缩略图宽
            $('.picture_item').css({
                width: this.itemWidth
            })
            // 设置放大后图片容器的宽高,left
            $('.right_contanier').css({
                left: this.middleImgWidth,
                width: imgWidth,
                height: imgWidth
            })
            // 设置放大图片的宽高(图片的放大倍数)
            $('.right_contanier .big_img').css({
                width: imgWidth * this.zoom,
                height: imgWidth * this.zoom
            })
        })
    },
    methods: {
        // 产品图片鼠标移入事件,显示阴影,显示大图
        boxMouseOver (e) {
            e.preventDefault();
            e.stopPropagation();
            this.isShade = true
            this.isBig = true
            // 计算阴影的位置
            let x = e.offsetX - $('.shade').width() / 2
            let y = e.offsetY - $('.shade').height() / 2
            let maxLeft = $('.middle_img').width() - $('.shade').width()
            let maxTop = $('.middle_img').height() - $('.shade').height()
            x = x <= 0 ? 0 : x
            x = x >= maxLeft ? maxLeft : x
            y = y <= 0 ? 0 : y
            y = y >= maxTop ? maxTop : y
            $('.shade').css({
                left: x,
                top: y
            })
        },
        // 鼠标在阴影移动
        shadeMouseMove (e) {
            e.preventDefault();
            e.stopPropagation();
            
            //用页面x - 父盒子的offsetLeft - 父盒子的左边框宽度
            var x = this.getEventPage(e).pageX - this.initX - $('.middle_img')[0].offsetParent.offsetLeft - $('.middle_img')[0].offsetParent.clientLeft;


            //用页面y - 父盒子的offsetTop - 父盒子的上边框宽度
            var y = this.getEventPage(e).pageY - this.initY - $('.middle_img')[0].offsetParent.offsetTop - $('.middle_img')[0].offsetParent.clientTop;

            
            //让阴影的坐标居中
            x -= $('.shade').width() / 2;
            y -= $('.shade').height() / 2;

            // 移动边界限制
            let maxLeft = $('.middle_img').width() - $('.shade').width()
            let maxTop = $('.middle_img').height() - $('.shade').height()
            x = x <= 0 ? 0 : x
            x = x >= maxLeft ? maxLeft : x
            y = y <= 0 ? 0 : y
            y = y >= maxTop ? maxTop : y
            // 重新赋值当前的定位值
            $('.shade').css({
                left: x,
                top: y
            })
            // 计算出实时的大图的定位,首先计算出比例
            // 比例为x:大图宽度/小图宽度 y: 大图高度/小图高度,将小图的定位乘以比例就是大图的定位
            const xRate = $('.big_img').width() / $('.middle_img').width()
            const yRate = $('.big_img').height() / $('.middle_img').height()
            // console.log(xRate, yRate);
            console.log(x, y);
            
            $('.big_img').css({
                left: -x * xRate,
                top: -y * yRate
            })
            // console.log(e, x, y, xRate, yRate, 66677)
        },
        // 鼠标移入阴影,去除自定义事件
        shadeMouseOver (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        // 图片移出隐藏阴影和大图
        boxMouseLeave () {
            this.isShade = false
            this.isBig = false
        },
        // 切换图片
        tabPicture (item) {
            this.middleImg = item.url
        },
        // 点击左边箭头
        leftArrowClick () {
            if (this.middleLeft < 0) {
                // 每次向右平移一个图片盒子的宽度
                this.middleLeft += this.itemWidth
                $('.picture_container').animate({
                    left: this.middleLeft
                }, 500)
            }
        },
        // 点击右边箭头
        rightArrowClick () {
            // 每次向左平移一个盒子的宽度,最多移动的宽度为(图片数组长度-4)*每张缩略图的宽度
            if (this.middleLeft > -this.itemWidth * (this.pictureList.length - 4)) {
                this.middleLeft -= this.itemWidth
                $('.picture_container').animate({
                    left: this.middleLeft
                }, 500)
            }
        },
        /**
         * 获取网页滚出去的距离（包括上面滚出去的部分和左边滚出去的部分）
         * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}
         */
        getPageScroll () {
            return {
                scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
            }
        },

        /**
        * 获取事件对象点击的点，相对于文档左上角的坐标
        * @param e
        * @returns {{pageX: *, pageY: *}}
        */
        getEventPage (e) {
            return {
                pageX: e.clientX + this.getPageScroll().scrollLeft,
                pageY: e.clientY + this.getPageScroll().scrollTop
            }
        },
        // 添加地址
        async addAddressFn () {
            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].address == this.addAddressObj.addName) {
                    // this.addsID = this.addressList[i].id
                    this.$message({
                        type: "error",
                        message: "当前有这个地址, 请不要重复添加哦!"
                    })
                    return;
                }
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                Address: {
                    address: this.addAddressObj.addName,
                    GarageID: this.garageID,
                    addrType: 2
                }
            }
            const res = await this.postData("A1047", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "添加成功"
                })
                this.getAddressList();
                this.dialogFormVisible = false;
            }
        },
        // 取消报价
        async cancelFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryState: 4,
            }
            const res = await this.postData("A1030", paramObj);
        },
        // 提交
        async submitFn (ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    for (let i = 0; i < this.addressList.length; i++) {
                        if (this.addressList[i].address == this.quoteForm.addValue) {
                            this.addsID = this.addressList[i].id
                        }
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let Components = this.tableData;
                    let paramObj = {
                        Token: token,
                        InquiryID: this.inquiryID,
                        VinCode: this.quoteForm.vinCode,
                        SupplierID: this.quoteForm.supplierID,
                        Mark: this.quoteForm.maker,
                        ExpireDatetime: this.quoteForm.expireDatetime,
                        ExpressName: this.quoteForm.expressName,
                        // AddrID: this.addsID,
                        AddrID: this.quoteForm.addValue,
                        InquiryState: 2,
                        Components: Components,
                        invoiceType: this.quoteForm.invoiceType
                    }

                    const res = await this.postData("A1030", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '询价报价',
                            item: 'quoteList',
                        };
                        this.$emit('quoteBack', data);
                    }
                } else {
                    return false;
                }
            });
        },
        // 获取地址列表
        async getAddressList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                GarageID: this.garageID
            }
            const res = await this.postData("A1036", paramObj);

            this.addressList = res.res.data;
            if (this.addressList.length > 0) {
                this.quoteForm.addValue = this.addressList[this.addressList.length - 1].id
            }
        },
        // 获取供应商
        async getSupplierListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1029", paramObj);
            if (res.res.data) {
                let supplierList = res.res.data.date;
                for (let i = 0; i < supplierList.length; i++) {
                    this.supplierList.push({
                        supplierName: supplierList[i].companyName,
                        supplierID: supplierList[i].supplierID
                    })
                }
            }
        },
        // 获取详情
        async getDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID
            }
            const res = await this.postData("A1023", paramObj);
            let result = res.res.data;
            this.garageID = result.inquiry.garageID;
            this.tableData = result.inquiryComponents;
            if (this.tableData.length == 0) {
                this.tableData.push({
                    componentID: '',
                    partName: "",
                    specification: "",
                    price: "",
                    servicePrice: 0.05,
                    quantity: 1
                })
            }

            let newObj = {}
            let userObj = {
                porder: result.porder,
                userName: result.userName,
                isAccounts: "1",
            }
            Object.assign(newObj, result.inquiry, result.inquiryInfo, result.car, result.garage, userObj, result.express, result.addr);
            this.quoteForm = newObj;
            if (this.quoteForm.invoiceType == 0) {
                this.quoteForm.invoiceType = 1;
            }
            this.picArrList = this.quoteForm.pictures ? JSON.parse(this.quoteForm.pictures) : [];
            if (this.quoteForm.componentIMG) {
                this.picArrList.push(this.quoteForm.componentIMG);
            }
            if (this.quoteForm.vinCodeIMG) {
                this.picArrList.push(this.quoteForm.vinCodeIMG);
            }
            this.getAddressList();
        },
        // 暂存
        async storageFn () {
            let token = window.sessionStorage.getItem("gn_request_token");

            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].address == this.quoteForm.addValue) {
                    this.addsID = this.addressList[i].id
                }
            }
            let Components = this.tableData;
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID,
                VinCode: this.quoteForm.vinCode,
                SupplierID: this.quoteForm.supplierID,
                Mark: this.quoteForm.maker,
                ExpireDatetime: this.quoteForm.expireDatetime,
                ExpressName: this.quoteForm.expressName,
                AddrID: this.quoteForm.addValue,
                InquiryState: 5,
                Components: Components,
                invoiceType: this.quoteForm.invoiceType
            }

            const res = await this.postData("A1030", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: 'success',
                    message: "暂存成功!"
                })
                let data = {
                    menuName: '询价报价',
                    item: 'quoteList',
                };
                this.$emit('quoteBack', data);
            }
        },
        handleCurrentChange (val) {
        },
        // 删除行
        async deleteRow (index, rows) {
            let componentID = rows[index].componentID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                ComponentID: componentID
            }
            const res = await this.postData("A1048", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "删除成功"
                })
                rows.splice(index, 1);
            }
        },
        addRow (index, rows) {
            rows.push({
                partName: "",
                specification: "",
                price: "",
                servicePrice: 0.05,
                quantity: 1
            })
        },
        // 添加收货地址
        async addAddrFn () {
            this.dialogFormVisible = true;
        },
        // 计数器
        handleChange (value) {
        },
        querySearch (queryString, cb) {
            for (let i = 0; i < this.addressList.length; i++) {
                this.addressList[i].value = this.addressList[i].address;
            }
            this.restaurants = this.addressList;
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
    },
}
</script>

<style lang="less" scoped>
.root {
    /deep/ .el-dialog__wrapper {
        display: flex;
        justify-items: center;
        align-items: center;
    }
    /deep/ .el-form-item__label {
        font-weight: 600;
    }
}
.header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
    h2 {
        color: #000;
        font-size: 20px;
        font-weight: 600;
        width: 500px;
        float: left;
        text-align: left;
        padding-left: 10px;
        box-sizing: border-box;
        .status {
            color: #ff7d72;
            font-size: 20px;
            margin-left: 30px;
        }
    }

    .parts-title {
        color: #000;
        font-size: 20px;
        font-weight: 600;
        float: left;
    }
}

.main {
    padding: 20px;
    // min-width: 1030px;
    white-space: nowrap;
    display: flex;
    overflow-x: auto;
    .main-left {
        float: left;
        width: 457px;
        .slide-wrapper {
            text-align: left;
            img {
                width: 450px;
                height: 270px;
                // width: 523px;
                // height: 275px;
            }
        }
        .left-content {
            width: 457px;
            .el-col {
                text-align: left;
                line-height: 40px;
            }
            /deep/ .el-input {
                width: 294px;
                margin-left: 20px;
            }
            .maxLh {
                line-height: 60px;
            }
            .invoice {
                .el-radio {
                    margin-left: 40px;
                }
            }
            .VINCLASS {
                padding-left: 0;
                margin-left: 0;
                width: 153px;
            }
            .VINCODES {
                width: 180px;
            }
        }
    }

    .main-right {
        margin-left: 20px;
        float: left;
        .supplier-select {
            text-align: left;
            .supplier-label {
                margin-right: 50px;
            }
        }
        .supplier-list {
            position: relative;
            /deep/ .el-input-number {
                width: 85px;
                /deep/ .el-input__inner {
                    padding-left: 10px;
                }
            }
            .quoted-price {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        margin-right: 8px;
                    }
                    .el-input {
                        width: 85px;
                    }
                }
                .right {
                    margin-right: 15px;
                    text-align: right;
                    color: #409eff;
                    font-weight: 700;
                }
            }
            .table-summary {
                position: absolute;
                bottom: -65px;
                left: 0;
                width: 100%;
                height: 65px;
                .summary-num {
                    position: absolute;
                    left: 430px;
                    top: 35%;
                    transform: translateY(-50%);
                }
                .summary-price {
                    position: absolute;
                    left: 600px;
                    top: 35%;
                    transform: translateY(-50%);
                }
            }
        }

        .btn-list {
            margin-top: 60px;
            .el-button {
                margin: 0 35px;
            }
        }
    }
}

.main-left {
    .slide-wrapper {
        .middle_img {
            border: 1px solid #333;
            box-sizing: border-box;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            .el-image {
                width: 250px !important;
                height: 250px !important;
            }
            .shade {
                background-color: rgba(135, 206, 235, 0.5);
                position: absolute;
                top: 0;
                left: 0;
                cursor: move;
                z-index: 2000;
            }
        }
        .carousel {
            display: flex;
            padding-top: 10px;
            .arrow {
                // background-color: #b4b9be;
                width: 25px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #333333;
                color: #bcc2ac;
                font-size: 18px;
            } 
            .right_arrow {
                margin-left: 10px;
            }

            
            .show_box {
                width: 392px;
                overflow: hidden;
                position: relative;
            }
            
            .picture_container {
                width: 2000px;
                display: flex;
                position: absolute;
                overflow: hidden;
                top: 0;
                left: 0;
                .picture_item {
                    width: 90px !important;
                    height: 70px!important;
                    margin-left: 10px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}


.right_contanier {
    overflow: hidden;
    position: absolute;
    top: 0;
    border: 1px solid #ccc;
    z-index: 888;
}
.right_contanier .big_img {
    position: absolute;
    top: 0px;
    left: 0px;
}




</style>
