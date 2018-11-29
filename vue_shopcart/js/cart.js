 var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
		fomatMoney:function(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			vm.cartView();
		})
	},
	methods:{
		cartView:function(){
			var _this = this;
			
			this.$http.get("cartData.json",{"id":123}).then(function(res){
				_this.productList = res.data.result.list;
				
			});
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{	
				if(product.productQuantity>1){
					product.productQuantity--;
				}
			}
			this.calcTotalPrice();
		},
		selectedProduct:function(item){
			if(typeof item.checked=='undefined'){
				Vue.set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
			var isAllCheck=this.productList.every((value)=>{
        return value.checked===true;
      });
      this.checkAllFlag=isAllCheck?true:false;
		},
		checkAll:function(){
			// this.checkAllFlag = flag;
			this.checkAllFlag = !this.checkAllFlag
			var _this=this;
			console.log(this);
			
			this.productList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){
					_this.$set(item,"checked",_this.checkAllFlag);
					console.log(this);
				}else{
					item.checked = _this.checkAllFlag;
				}
			});
			_this.calcTotalPrice();
		},
		calcTotalPrice:function(){
			var _this=this;
			this.totalMoney=0;
			this.productList.forEach(function(item,index){
			if(item.checked){
				_this.totalMoney+=item.productPrice*item.productQuantity;
			}
			});
		},
		delProduct:function(){
			this.productList.splice(this.pindex,1);
			this.delFlag=false;
		}
	}
});
 Vue.filter("money",function(value,type){
 	return "￥"+value.toFixed(2)+type;
 })