export default {
    data() {
        return {
            basePageNum: 1,
        }
    },
    methods: {
        exportExcel(reqParams, list, methods, replaceitems = {}, title = null, pageSize = 99999) {
            try {
                let newObj = JSON.parse(JSON.stringify(reqParams));
                let titleList = []
                list.map(item => {
                    titleList.push({
                        property: item.prop,
                        propertyValue: this.$t(item.label)
                    })
                })
                newObj.export = {
                    filetype: 1,
                    replaceitems: replaceitems,
                    titleitems: titleList
                }

                newObj.pageSize = pageSize;
                newObj.pageNumber = 1;
                let date = new Date();
                let fileName = title + date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
                this.$store.dispatch(methods, newObj).then(res => {
                    let blob = new Blob([res], { type: "application/json" })
                    let objectUrl = URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    document.body.appendChild(a);
                    a.setAttribute('style', 'display:none');
                    a.setAttribute('href', objectUrl);
                    a.setAttribute('download', fileName + ".xls");
                    a.click();
                    URL.revokeObjectURL(objectUrl);
                }, error => {
                    console.log("!", JSON.parse(error))
                })
            } catch (error) {
                console.log(error);
            }
        },
        // 获取接口返回success的报错信息
        getSuccessMessage(res){
            if (res.sucess==2) {
                this.$message.error("YTL_ERROR_NOT_FOUND_ACCOUNT")
            }else if(res.sucess==3){
                this.$message.error("YTL_ERROR_PARAM")
            }else if(res.sucess==4){
                this.$message.error("YTL_ERROR_NO_AUTH")
            }else if(res.sucess==5){
                this.$message.error("YTL_ERROR_SQL_ERROR")
            }else if(res.sucess==6){
                this.$message.error("YTL_ERROR_FEIGN_TIME_OUT")
            }else if(res.sucess==7){
                this.$message.error("YTL_ERROR_PROTOCOL_ERROR")
            }else if(res.sucess==8){
                this.$message.error("YTL_ERROR_DEVICE_NO_FOUND")
            }else{
                this.$message.error(res.errorMessage)
            }

        },
        /**四舍五入保留两位小数 */
        keepTwo(val, back = null) {
            if (val === undefined || val === "" || val === null || val.length < 1)
                return back == null ? val : back;
            return (val - 0).toFixed(2);
        },
        /**空回boolearn */
        isEmpty(val) {
            if (val === undefined || val === "" || val === null || val.length < 1)
                return true;
            else return false;
        },
        /**空回替换 */
        repEmpty(val, rep = "") {
            if (val === undefined || val === "" || val === null || val.length < 1)
                return rep;
            else return val;
        },
        /**深拷贝 */
        deepCopy(val) {
            if (!val) return null;
            return JSON.parse(JSON.stringify(val));
        },
        /**字符串中有几个相同字符 (字符串，字符) */
        charCount(str, char) {
            let num = 0,
                index = (str + "").indexOf(char);
            while (index !== -1) {
                num++;
                index = (str + "").indexOf(char, index + 1);
            }
            return num;
        },
        /**获取html根字体大小 */
        htmlFontSize() {
            let htmlfont = getComputedStyle(window.document.documentElement)[
                "font-size"
            ];
            return +htmlfont.slice(0, htmlfont.indexOf("px"));
        },
        /**监听事件 */
        listener(event, callBack = null) {
            this.$bus
                .$off(event)
                .$on(event, callBack);
        },
        /**发送事件 */
        send(event, data = null) {
            this.$bus.$emit(event, data);
        },
        //#region 获得时间
        /**获得时分秒 */
        getHMS() {
            let date = new Date();
            let hh = date.getHours();
            let mf = date.getMinutes();
            let ss = date.getSeconds();
            hh = hh > 9 ? hh : "0" + hh;
            mf = mf > 9 ? mf : "0" + mf;
            ss = ss > 9 ? ss : "0" + ss;
            return hh + ":" + mf + ":" + ss;
        },
        /**获得分秒 */
        getMS() {
            let date = new Date();
            let mf = date.getMinutes();
            let ss = date.getSeconds();
            mf = mf > 9 ? mf : "0" + mf;
            ss = ss > 9 ? ss : "0" + ss;
            return mf + ":" + ss;
        },
        /**获得时 */
        getH() {
            let date = new Date();
            let hh = date.getHours();
            hh = hh > 9 ? hh : "0" + hh;
            return hh;
        },
        /**获得分 */
        getMi() {
            let date = new Date();
            let mf = date.getMinutes();
            mf = mf > 9 ? mf : "0" + mf;
            return mf;
        },
        /**获得秒 */
        getS() {
            let date = new Date();
            let ss = date.getSeconds();
            ss = ss > 9 ? ss : "0" + ss;
            return ss;
        },
        /**获得年月日 */
        getYMD() {
            let date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            mm = mm > 9 ? mm : "0" + mm;
            dd = dd > 9 ? dd : "0" + dd;
            return yy + "-" + mm + "-" + dd;
        },
        /**获得年月 */
        getYM() {
            let date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            mm = mm > 9 ? mm : "0" + mm;
            return yy + "-" + mm;
        },
        /**获得年 */
        getY() {
            let date = new Date();
            return date.getFullYear();
        },
        /**获得月 */
        getM() {
            let date = new Date();
            let mm = date.getMonth() + 1;
            mm = mm > 9 ? mm : "0" + mm;
            return mm;
        },
        /**获得日 */
        getD() {
            let date = new Date();
            let dd = date.getDate();
            dd = dd > 9 ? dd : "0" + dd;
            return dd;
        },
        /**获得年月日时分秒 */
        getYMDHMS() {
            let dateTime;
            let date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();
            let hh = date.getHours();
            let mf = date.getMinutes();
            let ss = date.getSeconds();
            mm = mm < 10 ? "0" + mm : mm;
            dd = dd < 10 ? "0" + dd : dd;
            hh = hh < 10 ? "0" + hh : hh;
            mf = mf < 10 ? "0" + mf : mf;
            ss = ss < 10 ? "0" + ss : ss;
            dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
            return dateTime;
        },
        /**获得当月最后一天 */
        getLastDay(year, month) {
            var new_year = year;
            var new_month = month++;
            if (month > 12) {
                new_month -= 12;
                new_year++;
            }
            var new_date = new Date(new_year, new_month, 1);
            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
        },
        getDayMonthAgo(date) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份  
            var month = arr[1]; //获取当前日期的月份  
            var day = arr[2]; //获取当前日期的日  
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数  
            var year2 = year;
            var month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },
        /**获得前一天 */
        getPreviousDay() {
            let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
            let yesterday = new Date(time);
            let month = yesterday.getMonth() + 1;
            let day = yesterday.getDate();
            month = month > 9 ? month : "0" + month;
            day = day > 9 ? day : "0" + day;
            return yesterday = yesterday.getFullYear() + "-" + month + "-" + day;
        },
        //#endregion
        /**乘法 */
        mul(arg1, arg2) {
            var m = 0;
            var s1 = arg1.toString();
            var s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {
            }
            try {
                m += s2.split(".")[1].length;
            } catch (e) { }

            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        /**除法 */
        div(arg1, arg2) {
            arg1 = Number(arg1);
            arg2 = Number(arg2);
            if (!arg2) {
                return null;
            }
            if (!arg1 && arg1 !== 0) {
                return null;
            } else if (arg1 === 0) {
                return 0;
            }
            arg1 = this.toNonExponential(arg1);
            arg2 = this.toNonExponential(arg2);
            var n1, n2;
            var r1, r2; // 小数位数
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            n1 = Number(arg1.toString().replace(".", ""));
            n2 = Number(arg2.toString().replace(".", ""));
            return this.mul((n1 / n2), Math.pow(10, r2 - r1));
        },
        add(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m + arg2 * m) / m).toFixed(n);
        },
        // 获取四位随机数
        randomNum() {
            return (1000 + Math.round(Math.random() * 8999))
        },
        /**将科学计数法的数字转为字符串 */
        toNonExponential(num) {
            if (num == null) {
                return num;
            }
            if (typeof num == "number") {
                var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
                return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
            } else {
                return num;
            }
        },
    },


}