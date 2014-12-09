var characterlist = {
    "en" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "th" : ["ฤ", "ฺ", "ฉ", "ฏ", "ฎ", "โ", "ฌ", "็", "ณ", "๋", "ษ", "ศ", "?", "์", "ฯ", "ญ", "๐", "ฑ", "(", "ธ", "๊", "ฮ", '"', ")", "ํ", "(", "จ", "ๅ", "/", "_", "ภ", "ถ", "ุ", "ึ", "ค", "ต"]
}

/* เช็คว่าตัวแรกเป็นภาษาไทยหรือไม่ */
String.prototype.isTH = function(){
    if( this.charAt(0).search(/[^\x00-\x7F]+/) == 0 ){
        return true;
    }else{
        //alert("This is en character");
        return false;
    }
}

/* ทำการแปลงภาษาไทยเป็นอังกฤษ */
String.prototype.convertToEN = function(){
    
    var _str = "";
    for( var i = 0 ; i < this.length ; ++i ){
            _str += characterlist.en[ ( characterlist.th.indexOf( this.charAt(i) ) ) ];
        }
    
    return _str;
}

/**
* check window height and apply to window
* scrollbar config
* show and hide btn
* focus barcode textbox
*
*/
var aj = {};
aj.jqueryUi = function(){
	$('link[href="view/balloonart/css/main_style.css"]').before('<link rel="stylesheet" href="view/balloonart/css/jquery-ui-1.10.4.custom.min.css">'
	+'<link rel="stylesheet" href="view/balloonart/css/jquery.ui.timepicker.css">');
	
	$('script[src="view/balloonart/js/main_script.js"]').before('<script src="view/balloonart/js/jquery-ui-1.10.4.custom.min.js"></script>'
	+'<script src="view/balloonart/js/jquery.ui.timepicker.js"></script>');
	
	aj.auto_customer();
}
//:: QOUTATION CUSTOMER AUTOCOMPLETE :://
aj.auto_customer = function(){
	$('#cust_name').autocomplete({
		source:'?inc=index-process&Mode=AutoCustomer',
		minLength: 1,
		select: function( event, ui){
			$('#cust_id').val(ui.item.customer_no);
			$('#cust_name').val(ui.item.customer_name);
			$('#cust_email').val(ui.item.customer_email);
			$('#cust_company').val(ui.item.customer_company);
			$('#cust_address').val(ui.item.customer_address);
			$('#cust_phone').val(ui.item.customer_tel);
			$('#cust_mobile').val(ui.item.customer_mobile);
			$('#cust_fax').val(ui.item.customer_fax);
		}
	});
	
	$('#cust_email').autocomplete({
		source:'?inc=index-process&Mode=AutoEmail',
		minLength: 1,
		select: function( event, ui){
			$('#cust_id').val(ui.item.customer_no);
			$('#cust_name').val(ui.item.customer_name);
			$('#cust_email').val(ui.item.customer_email);
			$('#cust_company').val(ui.item.customer_company);
			$('#cust_address').val(ui.item.customer_address);
			$('#cust_phone').val(ui.item.customer_tel);
			$('#cust_mobile').val(ui.item.customer_mobile);
			$('#cust_fax').val(ui.item.customer_fax);
		}
	});
	
	$('#cust_company').autocomplete({
		source:'?inc=index-process&Mode=AutoCompany',
		minLength: 1,
		select: function( event, ui){
			$('#cust_id').val(ui.item.customer_no);
			$('#cust_name').val(ui.item.customer_name);
			$('#cust_email').val(ui.item.customer_email);
			$('#cust_company').val(ui.item.customer_company);
			$('#cust_address').val(ui.item.customer_address);
			$('#cust_phone').val(ui.item.customer_tel);
			$('#cust_mobile').val(ui.item.customer_mobile);
			$('#cust_fax').val(ui.item.customer_fax);
		}
	});
	
	$('#cust_phone').autocomplete({
		source:'?inc=index-process&Mode=AutoPhone',
		minLength: 1,
		select: function( event, ui){
			$('#cust_id').val(ui.item.customer_no);
			$('#cust_name').val(ui.item.customer_name);
			$('#cust_email').val(ui.item.customer_email);
			$('#cust_company').val(ui.item.customer_company);
			$('#cust_address').val(ui.item.customer_address);
			$('#cust_phone').val(ui.item.customer_tel);
			$('#cust_mobile').val(ui.item.customer_mobile);
			$('#cust_fax').val(ui.item.customer_fax);
		}
	});
	
	$('#cust_mobile').autocomplete({
		source:'?inc=index-process&Mode=AutoTel',
		minLength: 1,
		select: function( event, ui){
			$('#cust_id').val(ui.item.customer_no);
			$('#cust_name').val(ui.item.customer_name);
			$('#cust_email').val(ui.item.customer_email);
			$('#cust_company').val(ui.item.customer_company);
			$('#cust_address').val(ui.item.customer_address);
			$('#cust_phone').val(ui.item.customer_tel);
			$('#cust_mobile').val(ui.item.customer_mobile);
			$('#cust_fax').val(ui.item.customer_fax);
		}
	});

	$('#province').autocomplete({
		source: function(request, response) {
			$.ajax({
				url : '?inc=stock_show-process&Mode=Province',
				dataType : "json",
				data : {
					vehicle : $('#shipping_taxi').val()
				},
				success: function(data) {
					response($.map(data, function(item) {
						return {
							label: item.label ,//group_id + "] " + item.group_name,
							no:item.no,
							value: item.value,
							AMPHUR_ID:item.AMPHUR_ID,
							PROVINCE_ID:item.PROVINCE_ID,
							shipping:item.DELIVERY
						}
					}))
				}
			})
		},
//		source:
		minLength: 0,
		select: function( event, ui){
			$('#hprovince').val(ui.item.PROVINCE_ID);
			$('#amphur').attr('readonly',false).focus();
		}
	});
			
	$('#amphur').autocomplete({
		source: function(request, response) {
			$.ajax({
				url: "?inc=stock_show-process&Mode=Amphur",
				dataType: "json",
				data: {
					ref:$('#hprovince').val(),
					vehicle : $('#shipping_taxi').val(),
					office : ($('#motorbike').is(':checked') ?  $('#motorbike').attr('v-data') : $('#car').attr('v-data')),
					term: request.term
				},
				success: function(data) {
					response($.map(data, function(item) {
						return {
							label: item.label +'[' + item.AMP_NAME+' ราคา ' + item.DELIVERY +'บาท]',//group_id + "] " + item.group_name,
							no:item.no,
							value: item.value,
							AMPHUR_ID:item.AMPHUR_ID,
							shipping:item.DELIVERY,
							delivery_no:item.DELIVERY_NO
						}
					}))
				}
			})
		},
		minLength: 0,
		select: function( event, ui){
			$('#hamphur').val(ui.item.AMPHUR_ID);
			console.log('Return : '+ ui.item);
			console.log('Ampur ID : '+ ui.item.AMPHUR_ID);
			console.log('Shipping ID : '+ ui.item.DELIVERY + '[' + ui.item.shipping +']');
			$('#form_shipping').attr('data-price',ui.item.shipping);
			$('#hdelivery_no').val(ui.item.delivery_no);
			if($('#form_shipping').is(':checked')){
				//$('#setupprice').val(ui.item.shipping);
			var p = Number( $("#form_shipping").attr('data-price') ) - Number( $("#form_shipping").attr('data-price') ) * 7 / 100;
            $('#setupprice').val( p );  
            $("#setupprice").attr("novat", $("#form_shipping").attr('data-price') );

            $.balloonsetGlobal.updateprice();
					}
					$('#shipp_detail').focus();
					//console.log(hcode + '_2' + no);
		}
	});	
}


function cutmath( _num ){

    var r = Math.round(_num * 100) / 100

    return r;
}

/* START JQUERY PROCESS */
$(function(){


	aj.jqueryUi();
	
	$('#send_date').datepicker({ dateFormat: "yy-mm-dd" });
	$('#send_time').timepicker();

   $("#barcodeballoon").focus();

   var  availableH      	= $(window).innerHeight()-105,
  		headArea = $("#header-menu").height() + $("#header-logo").height() - 40;
  		//tempiscroll;

		allverticalscroll = [];
		$(".thumbsgroup").each(function(i,e){
			var ele = $(e);
            var tempiscroll;   

			ele.height(availableH - headArea - 80);

			setTimeout(function(){
				tempiscroll = new IScroll(e, {interactiveScrollbars:true ,scrollbars: true, preventDefaultException: { className: /(^|\s)textboxIncart|clickable(\s|$)/ }, mouseWheel: true});

				setInterval(function(){
					tempiscroll.refresh();
				}, 300);
			}, 200);
			
		});

    $(".showhide").on("click", function(e){
        var _this = $(this);
        if( _this.hasClass("balloonarticon-up") ){
            _this.removeClass("balloonarticon-up").addClass("balloonarticon-down");
        }else if( _this.hasClass("balloonarticon-down") ){
            _this.removeClass("balloonarticon-down").addClass("balloonarticon-up");
        }
        $( _this.attr("href") ).slideToggle();
        e.preventDefault();
    });

});


/**
* Cart initial
*
*/
$(function(){
	if($('#currentpage').val() == 'barcode'){

   /** Variable
   *
   */
   var spaceforcontent = $("#balloonset"); // use for put content here



   /** Class : stock use for manage all material in stock 
   *
   *
   */
   function stock(){

        var _this = this,
            _set = [];

        _this.addtostock = function( _obj ){
            for(var i = 0 ; i < _set.length ; ++i ){
                if( _set[i].fullcode == _obj.fullcode ){
                    return false;
                }
            }
            _set.push( _obj );
            return true;
        }

        _this.getstockbycode = function( _code ){
            for(var i = 0 ; i < _set.length ; ++i ){
                if( _set[i].fullcode == _code ){
                    return _set[i];
                }
            }
            return false;
        }

        init();

        function init(){

        }

   }



   /** Class : balloonset use for manage balloons in array
   *
   * parameter
   *
   */
   
   function balloonset(){
        var _this = this,
            _set = [];

        _this.isExist = function( _code ){
            for( var i = 0 ; i < _set.length ; ++i ){
                var _balloontemp = _set[i];
                if( _code.toUpperCase() == _balloontemp.code.toUpperCase() ){
                    return _set[i];
                }
            }
            return false;
        }

        _this.addballoon = function( _balloon ){
            // add new member to index 0
            _set.unshift( _balloon );
            _balloon.applytotal();
            _balloon.updateview();
        }

        _this.getballoon = function( _id ){
            return _set[ _id ];
        }

        _this.getballoonset = function(){
            return _set;
        }

        _this.deleteballoon = function( _id ){
            var _balloon = _this.getballoon( _id );
            _balloon.view.main.fadeOut(function(){
                _balloon.view.main.remove();


                reindex();
            });

            _set.splice( _id, 1 );

            _this.updateprice();

        }
		
		_this.hotkey = function(_key){
			if(_key == 'APPEND' || _key == 'append'){
				console.log(_key);
				$('.btnBC.clickable.btnBC-plus:first()').trigger('click');
			}
		}
        _this.loadballoon = function( _id ){
            var result = _this.isExist( _id );
            if( result.isEdit == false ){
                result.addQuantity();
            }else{
                $.ajax({
                    url:"?inc=stock_show-getballoon",
    				data:{'code' : _id},
                    success:function(data){
    					console.log(data);
    					if(data != 'false'){
                            var markup = parsehtmltoballoon(data);
                            markup.find(".runnumber").text( _set.length );
                            spaceforcontent.prepend(markup);

                            $(markup).css("opacity", 0).animate({"opacity": 1});

                            reindex();
    					}else{
    						alert('Not found this Design Code!! \nPlease try again');
    					}
                    }
                });
            }

        }




        _this.updateprice = function(){
            var _setupprice = Number( $("#setupprice").val() );
            var _t = cutmath(_this.getallprice());
            var _product_setup = _t + _setupprice;
		        var totalprice = Number(Number(_t - (_t*0.07)).toFixed(2));
            var _discount, _afterdiscount;



           //ค่าขนส่งแบบไม่มี vat
           var _setupnovat = ( $("#setupprice").attr("novat") )? Number($("#setupprice").attr("novat")) : 0;

           //ส่วนลด
           //_discount = Number(data.price);
           var _dropdown = $("#promotion_dropdown")[0];
           _percent = _dropdown.options[_dropdown.selectedIndex].dataset.discount;

           _discount = ( (Number(_t) * Number(_percent)) / 100 ) || 0;

            //โชว์ราคารวมสินค้าไม่รวมvat
           $("#totalprice").val( totalprice );

           //ผลรวมของราคาสินค้ากับค่าขนส่ง แบบหัก vat ออกแล้ว
           var _sumprice = totalprice + _setupprice;

           //ราคา net
           var _final = _t + _setupnovat;

           //vat รวม
           var _vat = Number( _final - _sumprice ).toFixed(2);


            _afterdiscount = _final - _discount;

            $("#discount").val( _discount );
            $('#sumprice').val( _sumprice );
            $('#vat').val( _vat );
            $('#net').val( _afterdiscount );

            // if( _discount != 0 ){
            //   $(".paydetail #stepdiscount").show();
            //   $("#pricetarget").text( data.promotion_price );
            //   $("#discountnum").text( data.promotion_discount+"%" );
            // }else{
            //   $(".paydetail #stepdiscount").hide();
            // }

           // $.ajax({
           //    "url":"?inc=stock_show-process&Mode=promotion", 
           //    "type":"POST",
           //    "dataType":"json",
           //    "data":{
           //      price: Number( _t )
           //    },
           //    success:function(data){

                

           //    }
           //  });

    		   


        }

        _this.getallprice = function(){
            var r = 0;
            for(var i = 0 ; i < _set.length ; ++i){
                r += _set[i].total ;
            }
            return r;
        }

        _this.getallcode = function(){
            var _temp = {
                balloon:[]
            }
            for(var i = 0 ; i < _set.length ; ++i){
                var matset = _set[i].getMatSet();
                var tempset = [];
                var obj = {
                    code: "",
					quantity : "",
                    mat : []
                }
                for(var a = 0 ; a < matset.length ; ++a){
                    var mattemp = { "code" : matset[a].code ,
                                    "quantity" : matset[a].quantity,
                                    "gas" : matset[a].gas,
                                    "total" : matset[a].total };

                    tempset.push( mattemp );
                }
                    obj.code = _set[i].code;
                    obj.quantity = _set[i].quantity;
                    obj.mat = tempset;

                    _temp.balloon.push( obj );
            }

            return _temp;
        }

        function reindex(){
            var length = $("#balloonset .balloonitem").length;

            $("#balloonset .balloonitem").each(function(i, e){
                var _item = $(e);
                _item.attr("index", i);
                _item.find(".runnumber").text( i+1 );
            });
        }

        function parsehtmltoballoon( e ){
            var _item = $(e);
            _item.find(".balloonitem").attr("index", $(".balloonitem").length );
                       
            var _balloon = new balloon( {
                        id: 001,
                        code: _item.find(".leftcolumn .img .title").text().trim().slice(-11),
                        quantity: 1,
                        balloonset: _this,
                        view: {
                            quantity: _item.find(".rightcolumn .quantity"),
                            main: _item,
                            total: _item.find(".price-1 div"),

                        }
                    } );
            _this.addballoon( _balloon );

            return _item;
        }


   }


   var _balloonset = new balloonset(); // เก็บ object balloon

   $.balloonsetGlobal = _balloonset;
   /** Function : use for create html markup 
   *
   * return jQuery Object : html markup for new material row
   *
   * parameter
   * opt = object keep material value 
   */
    function make_mrk(opt){

       var _mrknewslot = '<tr class="matitem">'
                            + '<td class="col1 matnumber">'+ opt.order +'</td>' 
                            + '<td class="col2">' 
                                + '<div class="tmbnmat"><img src="'+ opt.img +'" /></div>' 
                            + '</td>' 
                            + '<td class="col3">' 
                                + '<div class="codewrap"><span>'+ opt.fullcode +'</span><br><div class="matTH">ชื่อวัสดุ</div></div>'
								+ '<div class="codedetail">'+ opt.name +'</div>' 
                            + '</td>' 
                            + '<td class="col5"><span class="gas"><select class="clickable"><option value="Y" rel="'+  opt.pricegas  +'" '+ (opt.gas == 'Y' ? 'selected':'') +'>Yes</option><option value="N" rel="'+  opt.pricenogas  +'" '+ (opt.gas == 'N' ? 'selected':'') +'>No</option></select></span></td>' 
                            + '<td class="col4"><span class="price">'+ opt.price +'</span></td>' 
                            + '<td class="col5"><span class="quantity">'+ opt.quantity +'</span></td>' 
                            + '<td class="col5" style="display:none;"><span class="matallprice" style="display:none;">'+ cutmath(opt.price * opt.quantity) +'</span></td>'
                            + '<td class="col6"><div class="btnBC btnBC-up"></div></td>' 
                            + '<td class="col7"><div class="btnBC btnBC-down"></div></td>' 
                            + '<td class="col8"><div class="btnBC btnBC-delete"></div></td>' 
                           + '<td class="spacetd">&nbsp;</td>' 
                            + '<td class="col10"><span class="instock">'+ opt.stock +'</span></td>' 
                            + '<td class="spacetd lasttd">&nbsp;</td>' 
                        + '</tr>' ;


        return $(_mrknewslot);
    }




   /** Class : balloon(_value)
   * สำหรับสร้าง object balloon 
   *
   * parameter :
   * _value = object ที่เก็บค่าเริ่มต้นต่างๆ เช่น quantity, id, code, price, view
   *
   * public function จะนำด้วย _this
   */ 
   function balloon(_value){
       var _this = this;
		    _this.materialset = [];
        _this.id = _value.id;
        _this.code = _value.code;
        _this.quantity = _value.quantity;
        _this.view = _value.view;
        _this.total = 0;
        _this.balloonset = _value.balloonset;
        _this.isEdit = false;


        _this.applytotal = function( _m ){
            var _r = 0;
            for(var i = 0; i < _this.materialset.length; ++i){
                if( _this.materialset[i] ){
                    _r += Number( _this.materialset[i].total );
                }
            }
            _this.total = cutmath( _r );
            _this.updateview();
        }

		_this.addmaterial = function(_mat){
			_this.materialset.push( _mat );
		}


        _this.shownewslot = function(_id){
            var _temp;
            $.getJSON(
               // "module/barcode/json_material.json?clearcache="+Math.random(),
			   "?inc=stock_show-process&Mode=ShownewSlot&id="+_id,
                function( data, textStatus, jqXHR ){
                    _this.isEdit = true;
                    _temp = make_mrk({
                                "id":data.material.id,
                                "fullcode":data.material.fullcode,
                                "name":data.material.name,
                                "price":data.material.price,
                                "quantity":data.material.quantity,
                                "img":data.material.img,
                                "stock":data.material.stock,
                                "gas":data.material.gas,
                                "pricegas":data.material.pricegas,
                                "pricenogas":data.material.pricenogas,
                                "order": ( $(_this.view.main).find(".matitem").length + 1 )
                    });

                    parsehtmltomat( _temp[0] );
                    _this.applytotal();
                    _this.updateview();
                    _this.view.main.find(".matlist").append(_temp);
                }
            );
        }
        
        _this.getMatAt = function(_id){
            return _this.materialset[_id];
        }

        _this.getMatSet = function(){
            return _this.materialset;
        }
        
        _this.addQuantity = function( _multiply ){
            var _m;
            if( arguments.length == 0 ){
                _m = 1;
            }else{
                _m = _multiply;
            }
            
            applytoproperty( _m );
            applytochildmat( _this.quantity, 1 );
            
            _this.balloonset.updateprice();

        }


        _this.deleteMaterial = function( _num ){
            _this.isEdit = true;
            _this.materialset[_num].removeView();
            _this.materialset.splice( _num, 1 );
            _this.applytotal();
            _this.updateview();
            _this.arrangeorder();
        }
        
        _this.deleteQuantity = function( _multiply ){
            var _m;
            if( _this.quantity > 0 ){
               if( arguments.length == 0 ){
                    _m = 1;
                }else{
                    _m = _multiply;
                } 
                applytoproperty( -_m );
                applytochildmat( _this.quantity, -1 );

                 _this.balloonset.updateprice();           
            }
        }

        _this.arrangeorder = function(){
            for(var i = 0; i < _this.materialset.length; ++i){
                if( _this.materialset[i] ){
                    _this.materialset[i].view.main.find(".matnumber").html(i + 1);
                }
            }
        }

        _this.updateview = function(){
            applytoview();
        }
        
        function applytoproperty( _m ){
            _this.quantity += _m;
            //_this.total = original.price * _this.quantity;
        }
        
        function applytoview(){
            _this.view.quantity.html( _this.quantity );
            _this.view.total.html( _this.total );

            _this.balloonset.updateprice();
        }
       
        function applytochildmat( _num, _direction ){
            for(var i = 0 ; i < _this.materialset.length ; ++i){
                _this.materialset[i].addoneset( _num, _direction );             
            }
            _this.applytotal();
            applytoview();
        }
        
        function init(){
            _this.view.main.find(".matitem").each(function(i,e){
                parsehtmltomat( e );
            });
        }

        function parsehtmltomat( e ){
            if( e.className.search(/rowhead/g) < 0 ){
                var _item = $(e);
                var _m = new material( {
                    id: 001,
                    code: _item.find(".codewrap span").text().trim(),
                    price: Number( _item.find(".price").text() ),
                    quantity: Number( _item.find(".quantity").text() ),
                    total: Number( _item.find(".matallprice").text() ),
                    balloon: _this,
                    gas: _item.find(".gas select").val(),
                    view: {
                        quantity: _item.find(".quantity"),
                        stock: _item.find(".instock"),
                        main: _item,
                        total: _item.find(".matallprice"),
                        price: _item.find(".price")
                    },
                    stock: Number( _item.find(".instock").text() )
                });
                _this.addmaterial( _m );
            }
        }
        
        init();
       
	}








   /** Class : material(_value)
   * สำหรับสร้าง object material 
   *
   * parameter :
   * _value = object ที่เก็บค่าเริ่มต้นต่างๆ เช่น quantity, id, code, price, view
   *
   * public function จะนำด้วย _this
   */ 
    function material( _value ){
        var original = _value;
        var _this = this;
        
        _this.id = _value.id ;
        _this.code = _value.code ;
        _this.price = Number( _value.price ) ;
        _this.quantity = Number( _value.quantity ) ;
        _this.view = _value.view;
        _this.stock = Number( _value.stock );
        _this.total = _this.price * _this.quantity;
        _this.balloon = _value.balloon;
        _this.gas = _value.gas;
        
        _this.setGas = function(v){
          _this.gas = v;
        }

        _this.setPrice = function( _value ){
            _this.price = _value;
            _this.total = _this.price * _this.quantity;
            _this.balloon.applytotal();
            _balloonset.updateprice();

            _this.view.price.html( _this.price );
            applytoview();
        }

        _this.addQuantity = function( _multiply ){
            var _m;
            if( arguments.length == 0 ){
                _m = 1;
            }else{
                _m = _multiply;
            }
            _this.balloon.isEdit = true;
            applytoproperty( _m );
        }

        _this.getGas = function(){
            _this.balloon.isEdit = true;
            return _this.gas;
        }
        
        _this.deleteQuantity = function( _multiply ){
            var _m;
            if( _this.quantity > 0 ){
               if( arguments.length == 0 ){
                    _m = 1;
                }else{
                    _m = _multiply;
                } 
                _this.balloon.isEdit = true;
                applytoproperty( -_m );
            }
        }

        _this.removeView = function(){
            _this.view.main.fadeOut("slow", function(){
                _this.view.main.remove();
            });
        }


        // _this.getpricetotal = function(){
        // 	return original.price * _this.quantity;
        // }
        
        /**
        * สำหรับเพิ่มจำนวนทีละ set
        */
        _this.addoneset = function( _quantity, _direction ){

            _this.quantity = original.quantity * _quantity;
            _this.stock = _this.stock - ( original.quantity * _direction );
            _this.total = _this.quantity * _this.price;

            checkstock();
            applytoview();
        }

        function checkstock(){
            if( _this.stock < 0 ){
            // if( _this.quantity > _this.stock ){ old condition
                _this.view.main.addClass("outstock");
            }else{
                _this.view.main.removeClass("outstock");
            }
        }
        
        function applytoproperty( _m ){
            _this.quantity += _m;
            //_this.price = original.price * _this.quantity;
            _this.stock -= _m;
            _this.total = cutmath(_this.price * _this.quantity);
            
            original.quantity = _this.quantity;
            applytoview();
            checkstock();
            _this.balloon.applytotal();
            _this.balloon.updateview();
        }
        
        function applytoview(){
            _this.view.quantity.html( _this.quantity );
            _this.view.stock.html( _this.stock );
            _this.view.total.html( cutmath(_this.total.toString()) );
        }
        
        function init(){
            checkstock();
        }
        

        init();
	}

    
    /** Function : 
    * เปิด overlay
    *
    * parameter :
    * _id = เลข index ของ item ที่กดมาเพื่อให้รู้ว่ากดมาจากลูกโป่งชิ้นไหน
    *
    */

    function openoverlayblock(){
          $(".overlay").fadeIn().attr("isBlock", "true");
    }
    function openoverlay( _id ){

        


          $(".overlay").attr("isBlock", "false");
          // run after barcode scaner readed
          //_balloonset.getballoon( Number( _id ) ).shownewslot(256);

          $(".overlay, .overlay-boxcode").fadeIn();
          setTimeout(function(){
              $("#barcodematerial").focus();
          }, 500);
    }
    function closeoverlay(){
        $(".overlay, .overlay-boxcode").fadeOut();
    }

    function focusToBarcode(){
        setTimeout(function(){
            $("#barcodeballoon").focus();
        },100);
    }


    function changelayout( str ){
      var _barcode = $("#barcode");

      if( str == "xs-layout" ){
        _barcode.addClass("xs-layout");
        $("#cart_item_title .clickable")
          .removeClass("balloonarticon-maximum")
          .addClass("balloonarticon-minimum");

        //$("#barcode .col-right").insertBefore("#barcode .col-left");

      }else if( str == "md-layout" ){
        _barcode.removeClass("xs-layout");
        $("#cart_item_title .clickable")
          .removeClass("balloonarticon-minimum")
          .addClass("balloonarticon-maximum");

        //$("#barcode .col-right").insertAfter("#barcode .col-left");

      }
      focusToBarcode();
    }

    $("#expand").click(function(e){
      var _barcode = $("#barcode");
      if( _barcode.hasClass("xs-layout") ){
        changelayout("md-layout");
      }else{
        changelayout("xs-layout");
      }
    });

    //if( $(window).width() <= 1339 ){
    if( false ){
      changelayout("xs-layout");
      $("#barcode").show();
    }else{
      $("#barcode").show();
    }

   /** Misc. 
   * ขั้นตอนวนนับเอาจำนวน balloon ทั้งหมดที่มีตอนแรกเพื่อสร้าง object balloon
   *
    $("#balloonsetballoonsetballoonset .balloonitem").each(function(i, e){
        var _item = $(e);
        _item.attr("index", i);
    });
   */ 

 var key ;
    // var e = jQuery.Event("keydown")
    // e.which = 13 //choose the one you want
    $("#barcodeballoon").keydown(function(e){
		
        if( e.which == 13 && $(e.currentTarget).val().trim() == "" ){
			var length = $(this).length;
			console.log('Lenght key ' + length);
		
			$("#btn-save").trigger('click');
           // window.location.href = "stock_show-print/75/printing.html";
        }
        else if( e.ctrlKey == true && e.which == 50 ){
            $("#cust_name").focus();
            e.preventDefault();
        }
    });

    // $("#barcodeballoon").keypress(function(e){
    //     key = e.charCode;
    // })
    // .keydown(function(e){
    //     setTimeout(function(){
    //         if( e.which == 13 && $(e.currentTarget).val().trim() == "" ){
    //             $("#btn-save").trigger('click');
    //             e.preventDefault(); 
    //         }else if( e.ctrlKey == true && ( key == 47 || key == 50 ) ){
    //             $("#cust_name").focus();        
    //             e.preventDefault();   
    //         }
    //     },50);

    //     e.preventDefault();
    // })
    // .keyup(function(e){
    //     key = "";
    //     e.preventDefault();
    // });



   /** Add Eventlistener 
   * ขั้นตอนการใส่ action ที่ปุ่ม 
   * up down delete on Material Item
   */ 
   $("#promotion_dropdown").on("change", function(e){
      _balloonset.updateprice();
   });
	var vehicle = function(office_no){
		$.ajax({
			type: 'GET',
			url:'?inc=stock_show-process&Mode=Vehicle_list',
			data:{'office'		:	office_no},
			success:function(data){
				$('#shipping_taxi').html(data);
			}
		});
	}
   $('#motorbike, #car').on('change', function(e){
      if( $('#motorbike').is(":checked") ){
			vehicle($(this).attr('v-data'));
		    $('#shipping_taxi').attr('title',$('#shipping_taxi :selected').text());
        $(".shippingprice").fadeIn();
        $("#province").blur();
        
        var p = Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) - Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) * 7 / 100;
        
        $('#setupprice').val( p );

        $("#setupprice").attr("novat", $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") );
      
      }else{

        //$(".shippingprice").fadeOut();

      }

      if( $('#car').is(":checked") ){
	  			vehicle($(this).attr('v-data'));

        //$("#amphur, #province").val("");
        //$("#province").focus();
        // var p = Number( $("#form_shipping").attr('data-price') ) - Number( $("#form_shipping").attr('data-price') ) * 7 / 100;
        // $('#setupprice').val( p );

        // $("#setupprice").attr("novat", $("#form_shipping").attr('data-price') );

      }else{

        //$("#province").blur();

      }

      _balloonset.updateprice();
   });
   $("#shipping_taxi").on("change", function(e){
		$(this).attr('title',$('#shipping_taxi :selected').text());
        var p = Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) - Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) * 7 / 100;
        $('#setupprice').val( p );

            $("#setupprice").attr("novat", $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") );
        _balloonset.updateprice();  
   });
   $('#form_shipping').on('click',function(e){
      if($(this).is(':checked')){
            $("#province, #btnAdd").attr("disabled", false);
            $('#province').focus();
            var p, novat;
            $('#form_getit').prop('checked', false);
      			if(!$("#motorbike").is(':checked') && !$("#car").prop("checked")){
      				$("#car").prop("checked",true);
      				vehicle($('#car').attr('v-data'));
      			}
            if( $("#motorbike").prop("checked") || $("#car").prop("checked") ){
                p = Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) - Number( $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price") ) * 7 / 100;
                novat = $("#shipping_taxi")[0].options[$("#shipping_taxi")[0].selectedIndex].getAttribute("taxi-price");
            }else if( $("#car").prop("checked") ){
				        vehicle($(this).attr('v-data'));
                p = Number( $("#form_shipping").attr('data-price') ) - Number( $("#form_shipping").attr('data-price') ) * 7 / 100;
                novat = $("#form_shipping").attr('data-price');
            }else{
                p = 0;
                novat = 0;
            }
            
            $('#setupprice').val( p );
            $("#setupprice").attr("novat", novat );
            $(".shippingbox").fadeIn();

        }else{
            $("#province, #btnAdd").attr("disabled", true);
            $('#setupprice').val(0)
            $("#setupprice").attr("novat", 0 );


            $(".shippingbox").fadeOut();
        }
        _balloonset.updateprice();
    });

   $("#form_getit").on("change",function(e){
      if( $(this).is(':checked') ){
        $("#province, #btnAdd").attr("disabled", true);
        var p = 0;
        $('#setupprice').val( p );
        $("#setupprice").attr("novat", 0 );
        _balloonset.updateprice();

        $('#form_shipping').prop('checked', false);
        $(".shippingbox").fadeOut();
      }
   });

   focusToBarcode();
   
    $("#balloonset")
    .on("click", ".matlist .btnBC-up", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        var _matitem = _balloonset.getballoon(_parentid).getMatAt(_id);
        focusToBarcode();


         _matitem.addQuantity();
         e.stopImmediatePropagation();
    })
    .on("click", ".matlist .btnBC-down", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        var _matitem = _balloonset.getballoon(_parentid).getMatAt(_id);
        focusToBarcode();

    
         _matitem.deleteQuantity();
         e.stopImmediatePropagation();
    })
    .on("click", ".matlist .btnBC-delete", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        focusToBarcode();
        _balloonset.getballoon(_parentid).deleteMaterial( _id );

        e.stopImmediatePropagation();
    })
    .on("click", ".matlist .gas", function(e){
          var _choice = $(this).find("select");
          var _now = Number( _choice[0].selectedIndex ),
              _max = _choice[0].options.length;
          
          _now = ( _now == _max-1 ) ? 0 : ++_now ;
          
         _choice[0].selectedIndex = _now; 
          
         _choice.trigger("change");
    })
    .on("change", ".matlist .gas select", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        var _matitem = _balloonset.getballoon(_parentid).getMatAt(_id);
        _balloonset.getballoon(_parentid).isEdit = true;
        focusToBarcode();

        _matitem.setGas( _this.val() );

        _matitem.setPrice( Number( e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute("rel") ) );

        console.log( e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute("rel") );
    })
    .on("mousedown", ".matlist .gas select", function(e){
        e.preventDefault();
    });


    $(".officer").click(function(e){
      $(".officer").toggleClass("show");
    })
      // .mouseover(function(e){
      //   $(".officer").addClass("show");
      // })
      // .mouseout(function(e){
      //   $(".officer").removeClass("show");
      // });
    

   /** Add Eventlistener
   * ขั้นตอนการใส่ action ที่ปุ่ม 
   * up down plus on Balloon Item
   */ 
    $("#balloonset")
    .on("click", ".balloonitem .rightcolumn .btnBC-up", function(e){
        var _this = $(this);
        var _id = _this.closest(".balloonitem").attr("index");
        var _balloonitem = _balloonset.getballoon(_id);
        focusToBarcode();


        _balloonitem.addQuantity();
        e.stopImmediatePropagation();
    })
    .on("click", ".balloonitem .rightcolumn .btnBC-down", function(e){
        var _this = $(this);
        var _id = _this.closest(".balloonitem").attr("index");
        var _balloonitem = _balloonset.getballoon(_id);
        focusToBarcode();


        _balloonitem.deleteQuantity();
        e.stopImmediatePropagation();
    })
    .on("click", ".balloonitem .rightcolumn .btnBC-plus", function(e){
        var _this = $(this);
        var _id = _this.closest(".balloonitem").attr("index");
		$('#barcodeindex').val(_id);
		$('#barcodematerial').focus();
        //focusToBarcode();

        openoverlay( _id );
        e.stopImmediatePropagation();
    }); 
    

   /** Add Eventlistener
   * ขั้นตอนการใส่ action
   * overlay background
   */ 
    $(".overlay")
    .on("click", function(e){
        var _this = $(this);
        if( _this.attr("isBlock") == "true" ){

        }else{
          focusToBarcode();
          closeoverlay();
        }
    });


   /** Add Eventlistener
   * ขั้นตอนการใส่ action ที่ปุ่ม 
   * trash 
   */ 
    $("#balloonset")
    .on("click", ".btn-trash", function(e){
        var _this = $(this);
        var _id = _this.closest(".balloonitem").attr("index");
        focusToBarcode();

        _balloonset.deleteballoon( Number(_id) );

        e.stopImmediatePropagation();
        e.preventDefault();
    });
    

    $("#btnsubmit")
    .on("click", function(e){
        var _str = $('#barcodeballoon').val().trim();
		if( _str != ''){
            if( _str.isTH() ){
                _str = _str.convertToEN();
            }
			if(_str.length >= 11){
            _balloonset.loadballoon( _str );
			console.log('Lenght : ' + _str.length);
			}else{
				_balloonset.hotkey(_str);
				console.log('STR : ' + _str);
				console.log('Lenght : ' + _str.length);
			}
            e.preventDefault();
    		$('#barcodeballoon').val('');
		}else{
			e.preventDefault();
			return false;
		}
        focusToBarcode();
    });
	
	$('#barcodeballoon').autocomplete({
    
		source:'?inc=stock_show-process&Mode=balloonSearch',
    // source:[
    //     {
    //       image: "images/Materials/1412589876.jpg",
    //       key: "AFB15843SB3",
    //       label: "Numb 3 40SilverBetallic",
    //       svg: null,
    //       value: "AFB15843SB3"
    //     }

    // ],
		minLength: 0,
		select: function( event, ui){
			//_balloonset.loadballoon(ui.item.value);
			$('#barcodeballoon').val(ui.item.value);				
			$("#btnsubmit").trigger('click');
			
		},
			close: function( event, ui ) {
				$('#barcodeballoon').val('');				
			}
	}).data( "ui-autocomplete" )._renderItem =  function( ul, item ) {
		var inner_html = '<a><div class="list_item_container"><div class="image"><img src="' + item.image + '" style="width:120px"/></div><div class="txt"><div class="label"><b>Design Code : </b>' + item.key + '</div></div></div></a>';
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append(inner_html)
			.appendTo( ul );
	};

	$('#barcodematerial').autocomplete({
		source:'?inc=stock_show-process&Mode=MaterialsSearch',
		minLength: 0,
		select: function( event, ui){
			//var ball = new balloon();//_balloonset.loadballoon(ui.item.value);
			//$('#barcodematerial').val(ui.item.value);
			 _balloonset.getballoon( Number( $('#barcodeindex').val() ) ).shownewslot(ui.item.no);
			$("#btnsubmit").trigger('click');
		},
			close: function( event, ui ) {
				$('#barcodematerial').val('');
					$(".overlay").trigger('click');
				
			}
	}).data( "ui-autocomplete" )._renderItem =  function( ul, item ) {
		var inner_html = '<a><div class="list_item_container"><div class="image"><img src="' + item.image + '" style="width:120px"/><div class="lnclear"></div><div class="txt"><div class="label"><b>Design ID : </b>' + item.value + '</div><div class="description"><b>Detail : </b>' + item.key + '</div></div></div></div></a>';
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append(inner_html)
			.appendTo( ul );
	};
	
	$('#barcodematerial').on('keypress',function(e){
		console.log('Press Key : ' + e.which);
		if(e.which == 13 && $(this).val() != ''){
			$.get('?inc=stock_show-process&Mode=chkMaterials',{'code':$(this).val()},function(data){
				var res = $.parseJSON(data);
				console.log('Result : '+ res.no);
				
				if(res.no != 'false'){
					_balloonset.getballoon( Number( $('#barcodeindex').val() ) ).shownewslot(res.no);
					$('#barcodematerial').val('');
					$(".overlay").trigger('click');
					$('#barcodeballoon').val('').focus();
				}else{
					alert('Not found this Materials Code!! \nPlease try again');
					$('#barcodematerial').val('').focus();
				}
				
			});
		}
	});


    /** Add EventListener
    * ใส่โค้ดปุ่ม save
    *
    */
    $("#btn-save").click(function(e){
        
        console.log( _balloonset.getallcode() );
        e.preventDefault();

		if(confirm('Please Confirm to success sell')){
      openoverlayblock();

		$.ajax({
			type: 'POST',
			url:'?inc=stock_show-process&Mode=Sell',
			data:{'blist':_balloonset.getallcode()
					,'cust_id'		:	$('#cust_id').val()
					,'form_getit'	:	($('#form_getit').prop('checked') ? 'Y':'N')
					,'form_shipping':	($('#form_shipping').prop('checked') ? 'Y':'N')
					,'form_shipping_type' :	($('#motorbike').prop('checked') ? 'taxi':($('#car').prop('checked') ? 'car':''))
					,'form_shipping_taxi_price'	:	$('#shipping_taxi :selected').attr('taxi-price')
					,'delivery_no'	:	$('#hdelivery_no').val()
					,'ref_delivery_no'			:	$('#shipping_taxi').val()
					,'form_shipping_car_price'	:	$('#form_shipping').attr('data-price')
					,'form_discount':	$('#discount').val()
					,'ref_promotion_no':	$('#promotion_dropdown :selected').val()
					,'promotion'	:	$('#promotion_dropdown :selected').text()
					,'form_setup'	:	($('#form_setup').prop('checked') ? 'Y':'N')
					,'send_date'	:	$('#send_date').val()
					,'send_time'	:	$('#send_time').val()
					,'hprovince'	:	$('#hprovince').val()
					,'hamphur'		:	$('#hamphur').val()
					,'shipp_detail'	:	$('#shipp_detail').val()
					,'customer'		:	$('#header_customer').find('input, textarea').serialize()
				},
			success:function(data){
				console.log(data);
				var formID = JSON.parse(data);
				console.log(formID.id);
				window.location = 'stock_show-print/'+formID.id+'/printing.html';
			},
       error: function(xhr, status, error) {
          $(".overlay .error").show();
       }
		});
		}
    }); 


    // make shortcut to move cursor focus between barcode and customer detail.
    $("body, input[type='text'], textarea, #barcodeballoon, #cust_name").keydown(function(e){
        if(  e.ctrlKey == true && e.which == 49 ){
            $("#barcodeballoon").focus();
            e.preventDefault();   
        }
        else if(  e.ctrlKey == true && e.which == 50 ){
            $("#cust_name").focus();        
            e.preventDefault();
        }
    });

	
    // $("body, input[type='text'], textarea, #barcodeballoon, #cust_name").keypress(function(e){
    //     key = e.charCode;
    // })
    // .keydown(function(e){
    //     setTimeout(function(){
    //         if( e.ctrlKey == true && ( key == 3653 || key == 49 ) ){
    //             $("#barcodeballoon").focus();
    //             e.preventDefault(); 
    //         }else if( e.ctrlKey == true && ( key == 47 || key == 50 ) ){
    //             $("#cust_name").focus();        
    //             e.preventDefault();   
    //         }
    //     },50);
    // })
    // .keyup(function(e){
    //     key = "";
    // });
	}
	if($('#currentpage').val() == 'print'){
	setTimeout(function(){
		window.print();
	}, 500);
    $("body").keydown(function(e){
		 var code = e.keyCode || e.which;
		if(code == 27) { //Enter keycode
		   //Do something
			window.location="stock_show.html";
			//alert('Key : ' + code);
		 }
		 console.log('Key : ' + code);
	});
	}
	if($('#currentpage').val()=='frmLocation'){
		var amphur = function(province){
			$.ajax({
				type: 'GET',
				url:'?inc=stock_show-process&Mode=ListAmphur',
				data:{'province':$('#select-province').val()},
				success:function(data){
					$('#select-amphur').html(data);
				}
			});
			
		}
		$('#select-province').on('change',function(){
			amphur($(this).val());
			$('#txt-location').val('');
		});
		
		amphur($('#select-province').val());
		$('#txt-location').autocomplete({
			source: function(request, response) {
				$.ajax({
					url: "?inc=stock_show-process&Mode=ChkLocation",
					dataType: "json",
					data: {
						province:$('#select-province').val(),
						amphur : $('#select-amphur').val(),
						term: request.term
					},
					success: function(data) {
						response($.map(data, function(item) {
							return {
								label: item.label,
								no:item.no,
								value: item.value,
								AMPHUR_ID:item.AMPHUR_ID,
								shipping:item.DELIVERY
							}
						}))
					}
				})
			},
			minLength: 0,
			select: function( event, ui){
				$('#h-location').val(ui.item.AMPHUR_ID);
			}
		});	
		$('.BtnSave').on('click',function(e){
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url:'?inc=stock_show-process&Mode=locationSave',
				data:{'data':$('form').serialize()},
				success:function(data){
					console.log(data);
					var pr = JSON.parse(data);
					console.log('Province ' + pr.province);
						parent.$('#hprovince').val(pr.hprovince);
						parent.$('#hamphur').val(pr.hamphur);
						
						parent.$('#province').val(pr.province);
						parent.$('#amphur').val(pr.amphur);
						parent.$.colorbox.close();
				}
			});
		});
	}
});