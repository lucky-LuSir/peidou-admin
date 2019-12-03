<template>
    <div class="magnifier">
        111

        <el-button @click="aaa()">发送</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {

        };
    },
    methods: {
        aaa () {
            let ts = 
                `
                <form id="pay_form" name="pay_form" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="amount" id="amount" value="20">
                    <input type="hidden" name="item_number" id="item_number" value="xiu90 coins:50">
                    <input type="hidden" name="cmd" id="cmd" value="_xclick">
                    <input type="hidden" name="item_name" id="item_name" value="buy xiu90 coins">
                    <input type="hidden" name="notify_url" id="notify_url" value="http://47.100.79.150/payment/status/view/">
                    <input type="hidden" name="return" id="return" value="http://47.100.79.150/">
                    <input type="hidden" name="lc" id="lc" value="China">
                    <input type="hidden" name="cancel_return" id="cancel_return" value="http://www.igo19.com/">
                    <input type="hidden" name="currency_code" id="currency_code" value="USD">
                    <input type="hidden" name="business" id="business" value="sb-tyfnl456338@business.example.com">
                </form>
                `
                console.log(ts);
                // const div = document.createElement('div');
                // div.innerHTML = res.data; // html code
                // document.body.appendChild(div);
                // document.forms.alipaysubmit.submit();
                
                const div = document.createElement('div');
                // div.innerHTML = res.data; // html code
                div.innerHTML = ts; // html code
                document.body.appendChild(div);
                // console.log(document.forms);
                // console.log(document.forms[0].submit());
                
                document.forms[0].submit();
        }
    }
}
</script>