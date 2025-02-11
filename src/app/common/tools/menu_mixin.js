export default {
    data() {
        return {
           topMenuHeight:70,
           mainHeight: "",
           routeHeight: "",
           footh:"",
           shadowLineBottom:65,
           menuHeight: 0
        }
    },
    created(){
    },
    methods:{
        getHeight(h,toph,footh,headNavh){
            // console.log(toph,h,footh,headNavh);//865   49 937 23   70 937 26
            // console.log(this.mainHeight);
            this.mainHeight = h - toph;
            this.routeHeight = h - toph - headNavh - footh;
            this.menuHeight = h - toph - footh;
            this.topMenuHeight = toph;

            this.footh = footh ;
            // console.log(this.mainHeight);
        },
        getMenuBottomHeight(val){
            this.shadowLineBottom = val + this.footh;
        }
    },

}