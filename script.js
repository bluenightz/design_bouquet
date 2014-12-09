// add comment
Snap.plugin(function (Snap, Element, Paper, global, Fragment) {
    //Snap.newmethod = function () {};
    Element.prototype._RotationBox = null;
    Element.prototype.showRotation = function () {
        var W = 80, H = 78;
        var bbox = this.getBBox();
        var rectL, rectR, rotatetemp;
        //var mbbox = $.svgObj.svgBox.getBBox(); 

        //var initx = ( bbox.w / 2 ) - ((( W * 2 )+10) / 2);
        var initx = $.svgObj.w - 10;
        var inity = $.svgObj.h;

        if( !this._RotationBox ){

            // rectL = $.svgObj.svgBox.paper.rect(initx + bbox.x, bbox.y-H-10, W, H).attr({
            //     "strokeWidth":1,
            //     "stroke":"#ccc",
            //     "fill":"#eaeaea"
            // });
            // rectR = $.svgObj.svgBox.paper.rect(initx + bbox.x+W+10, bbox.y-H-10, W, H).attr({
            //     "strokeWidth":1,
            //     "stroke":"#ccc",
            //     "fill":"#eaeaea"
            // });

            rectL = $.svgObj.svgBox.paper.image("/images/rectL.png",initx - ( W * 2 ) - 10, inity - H - 10, W, H);
            rectR = $.svgObj.svgBox.paper.image("/images/rectR.png",initx - W, inity - H - 10, W, H);

            rotatetemp = new RotationBox({
                "target":this,
                "rectL":rectL,
                "rectR":rectR
            });

            this._RotationBox = rotatetemp;

        }else{
            this._RotationBox.rectL.node.style.display = "block";
            this._RotationBox.rectR.node.style.display = "block";

            this._RotationBox.rectL.attr({
                x:initx - ( W * 2 ) - 10,
                y:inity - H - 10
            });
            this._RotationBox.rectR.attr({
                x:initx - W,
                y:inity - H - 10
            });
        }
    };

    Element.prototype.rotatesvg = function(d){
        var item = this;
        var m = new Snap.Matrix().add( item.matrix );
        m.rotate(d, Number( item.node.getAttribute("ox") ), Number( item.node.getAttribute("oy") ));
        var ts = m.toTransformString();
        item.transform(ts);
    }
    //Paper.prototype.newmethod = function () {};
});

function RotationBox(opt){
    var rectL = opt.rectL,
        rectR = opt.rectR,
        target = opt.target,
        isDown = false,
        interval, timeout;

    init();
    function init(){
        rectL
            .mouseout(function(e){
                clearInterval(interval);
            })
            .mousedown(function(e){
                clearInterval(interval);
                isDown = true;
                timeout = setTimeout(function(){
                    interval = setInterval(function(){
                        target.rotatesvg(-1);
                    },30)
                }, 500);
                target.rotatesvg(-1);
            })
            .mouseup(function(e){
                isDown = false;
                clearTimeout(timeout);
                clearInterval(interval);
            });

        rectR
            .mouseout(function(e){
                clearInterval(interval);
            })
            .mousedown(function(e){
                isDown = true;
                timeout = setTimeout(function(){
                    interval = setInterval(function(){
                        target.rotatesvg(1);
                    },30)
                }, 500);
                target.rotatesvg(1);
            })
            .mouseup(function(e){
                isDown = false;
                clearTimeout(timeout);
                clearInterval(interval);
            });
    }

    function destroy(){

    }

    return {
        "rectL":rectL,
        "rectR":rectR,
        "target":target,
        "hide":function(){
            rectL.node.style.display = "none";
            rectR.node.style.display = "none";
        }
    }
}

var characterlist = {
    "en" : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "th" : ["ฤ", "ฺ", "ฉ", "ฏ", "ฎ", "โ", "ฌ", "็", "ณ", "๋", "ษ", "ศ", "?", "์", "ฯ", "ญ", "๐", "ฑ", "(", "ธ", "๊", "ฮ", '"', ")", "ํ", "(", "จ", "ๅ", "/", "_", "ภ", "ถ", "ุ", "ึ", "ค", "ต"]
}

var tempiscroll, availableH, headArea; 

var idname = "allsvghere";

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
	Math.max(1,2,3,4);
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
				source:'?inc=index-process&Mode=Province',
				minLength: 1,
				select: function( event, ui){
					$('#hprovince').val(ui.item.PROVINCE_ID);
					$('#amphur').attr('readonly',false).focus();
				}
			});
			$('#amphur').autocomplete({
				source: function(request, response) {
					$.ajax({
						url: "?inc=index-process&Mode=Amphur",
						dataType: "json",
						data: {
							ref:$('#hprovince').val(),
							term: request.term
						},
						success: function(data) {
							response($.map(data, function(item) {
								return {
									label: item.label,//group_id + "] " + item.group_name,
									no:item.no,
									value: item.value,
									AMPHUR_ID:item.AMPHUR_ID
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
					$('#shipp_detail').focus();
					//console.log(hcode + '_2' + no);
				}
			});	
}
// add comment
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

        availableH      	= $(window).innerHeight()-105;
  		headArea = $("#header-menu").height() + $("#header-logo").height() - 40;
  		//tempiscroll;

		//allverticalscroll = [];
        turnonscroll();

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
function turnoffscroll(){
    if( tempiscroll ){
        tempiscroll.destroy();
        tempiscroll = null;
    }       
}
function updatescroll( _scroll ){
    if( _scroll ){
        setTimeout(function(){
            _scroll.refresh();
        }, 150);
    }
}
function turnonscroll(){
    var e = document.querySelector(".col-right .thumbsgroup");
    e.style.height = availableH - 50 +"px";

    if( !e.querySelector(".iScrollVerticalScrollbar") ){

        tempiscroll = new IScroll(e, {interactiveScrollbars:true ,scrollbars: true, preventDefaultException: { className: /(^|\s)textboxIncart|clickable(\s|$)/ }, mouseWheel: true});

    }

    /*
    setTimeout(function(){

        $(".thumbsgroup").each(function(i,e){
            var ele = $(e);
            console.log( ele.attr("rel") );

            if( ele.attr("rel") == "noscroll" ){
            }else{  

                ele.height(availableH - 50);

                setTimeout(function(){
                    tempiscroll = new IScroll(e, {interactiveScrollbars:true ,scrollbars: true, preventDefaultException: { className: /(^|\s)textboxIncart|clickable(\s|$)/ }, mouseWheel: true});

                    // setInterval(function(){
                    //  tempiscroll.refresh();
                    // }, 300);
                }, 100);
            }

        });

    }, 00);
    */
}

/**
* Cart initial
*
*/
$(function(){

    $.svgObj = svgsetupstage();

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
   Math.max(1,2,3,4);
   function swapitem(_array, start, target){
        var a = _array //[0,1,2,3,4]; // [0,null,2,3,4];
        var item = a.splice(start, 1);
        
        a.splice(target, 0, item[0]);
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

        _this.loadballoon = function( _id ){
            var result = _this.isExist( _id );
            if( result.isEdit == false ){
                result.addQuantity();
            }else{
                $.ajax({
                    url:"?inc=design_bouquet-getballoon",
    				data:{'code' : _id},
                    success:function(data){


                        loadsvgfile( {
                                "filename" : "module/design_bouquet/svg/new.svg",
                                "svgObj" : $.svgObj, 
                                success : function( svgmatA ){

                                    // $.svgObj.svgBox.mousemove(function(e){

                                    // });
                                    //
                                    var bottomhtml = $(data).find(".matlist").eq(1);

                                    var newhtml = orderhtml( data, svgmatA );
                                    var parent = newhtml.find(".matlist").eq(1).closest("td");

                                    newhtml.find(".matlist").eq(1).remove();

                                    parent.append( bottomhtml );

                                    if(data != 'false'){
                                        var markup = parsehtmltoballoon( newhtml );
                                        markup.find(".runnumber").text( _set.length );
                                        spaceforcontent.prepend(markup);

                                        $(markup).css("opacity", 0).animate({"opacity": 1});

                                        reindex();

                                        _this.updateprice();

                                        var pos;

                                        $(".matlist:eq(0) tbody").sortable({
                                            "helper":"clone",
                                            "sort":function(e, u){
                                                //console.log(u);
                                            },
                                            "stop":function(e, u){
                                                var _index = u.item.index() - 1;
                                                
                                                var _parent = $(".matitem").data("svg").parent();

                                                $(".matitem").each(function(i,e){
                                                    var _this = $(e);
                                                    var _svg = _this.data("svg");

                                                    _parent.append( _svg );

                                                });

                                                swapitem( _balloonset.getballoon( 0 ).materialset , $.svgObj.previndex, _index);

                                                
                                                svgreorder();

                                                turnonscroll();
                                                tempiscroll.scrollTo(0, pos);

                                            },
                                            "start":function(e, u){
                                                pos = tempiscroll.y;

                                                turnoffscroll();
                                                var _index = u.item.index() - 1;
                                                console.log("number of init index");
                                                console.log( _index );
                                                $.svgObj.previndex = _index;
                                            }
                                        });

                                        
                                        $(".matitem").each(function(i,e){
                                            $(this).data("index", i);
                                        });

                                        tempiscroll.refresh();

                                    }else{
                                        alert('Not found this Design Code!! \nPlease try again');
                                    }
                                }
                               }  ); 


    					
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
            var _item = e;
            _item.find(".balloonitem").attr("index", $(".balloonitem").length );
                       
            var _balloon = new balloon( {
                        id: 001,
                        code: _item.find(".leftcolumn .img .title").text().trim().slice(-11),
                        quantity: 1,
                        balloonset: _this,
                        view: {
                            quantity: _item.find(".rightcolumn .quantity"),
                            main: _item,
                            total: _item.find(".balloonprice-price")
                        }
                    } );
            _this.addballoon( _balloon );

            return _item;
        }


   }

   function svgreorder(){
        $(".matitem").each(function(i, e){
            $(e).find(".matnumber").text(i+1);
            $(e).data("index", i);
        })
   }

   function orderhtml( html, svgmatA ){
        var html2 = "";
            html2 += '<tr> ';
            html2 += '  <td colspan="3">&nbsp;</td>';
            html2 += '</tr>';
            html2 += '<tr>';
            html2 += '  <td colspan="3">';
            html2 += '      <table class="basic-barcodetable matlist" >';
            html2 += '          <tr class="matitem">';
            html2 += '              <td class="col7 matnumber"><div class="btnBC clickable btnBC-plus"></div></td>';
            html2 += '              <td class="col2" colspan="6" style="border-right:0px;">&nbsp;</td>';
            html2 += '              <td class="col7" colspan="2" style="padding-right:10px;border-left:0px;text-align:right;">Total</td>';
            html2 += '              <td class="spacetd">&nbsp;</td>';
            html2 += '              <td class="col10 lasttd"><span class="price" id="total2"></span></td>';
            html2 += '          </tr>';
            html2 += '      </table>';
            html2 += '  </td>';
            html2 += '</tr>';
            html2 += '<tr> ';
            html2 += '  <td colspan="3">&nbsp;</td>';
            html2 += '</tr>';

        var _result = "";
        var _items = $( html ).find(".matlist").eq(0).find(".matitem");
        var _objects = [];

        for(var i = 0 ; i < _items.length ; ++i){
            _objects.push( {
                "code":_items.eq(i).find(".codewrap span").text().trim(),
                "html":_items.eq(i)
            } );
        }

        $( svgmatA ).each(function( i, e){
            var _code1 = e.node.getAttribute("id").replace(/::(_\d{1,}_){0,}$/g, "").trim();
            for( var x = 0 ; x < _objects.length ; ++x ){
                if( _objects[x].code == _code1 ){
                    _result += _objects[x].html.prop("outerHTML");
                }
            }
        });

        var h = $(html);
        h.find(".matlist:eq(0) .matitem").remove();

        _result = $(_result);

        _result.each(function( i, e){
            console.log( svgmatA[i] );
            $(e).data("svg", svgmatA[i] ); 
            svgmatA[i].mousedown(function(e){
                $.isrotate = true;
            });
            svgmatA[i].mouseup(function(e){
                $.isrotate = false;
            });
        });
            

        // reorder matnumber
        _result.find(".matnumber").each(function(i, e){
            $(e).addClass("clickable").text( i + 1  );
        });

        _result.insertAfter( h.find(".matlist:eq(0) .rowhead") );
        $(html2).insertAfter( h );


        return h;
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
                                + '<div class="codewrap"><span>'+ opt.fullcode +'</span></div>'
								+ '<div class="codedetail" style="display:none;">'+ opt.name +'</div>' 
                            + '</td>' 
                            + '<td class="col4"><span class="price">'+ opt.price +'</span></td>' 
                            + '<td class="col5" style="display:none;"><span class="quantity">'+ opt.quantity +'</span></td>' 
                            + '<td class="col5"><span class="gas"><select class="clickable"><option value="Y" rel="'+  opt.pricegas  +'" '+ (opt.gas == 'Y' ? 'selected':'') +'>Yes</option><option value="N" rel="'+  opt.pricenogas  +'" '+ (opt.gas == 'N' ? 'selected':'') +'>No</option></select></span></td>' 
                            + '<td class="col5" style="display:none;"><span class="matallprice" style="display:none;">'+ cutmath(opt.price * opt.quantity) +'</span></td>'
                            + '<td class="col6" style="display:none;"><div class="btnBC btnBC-up"></div></td>' 
                            + '<td class="col7"><div class="btnBC clickable btnBC-plus"></div></td>' 
                            + '<td class="col8"><div class="btnBC clickable btnBC-dash"></div></td>' 
                           + '<td class="spacetd">&nbsp;</td>' 
                            + '<td class="col10 lasttd"><span class="price">'+ opt.price +'</span></td>' 
                            + '<td class="spacetd lasttd" style="display:none;">&nbsp;</td>' 
                        + '</tr>' ;


        return $(_mrknewslot);
    }

    function scrolltoBottom(){
        setTimeout(function(){
            var _el = $(".matlist:eq(0) .matitem:last-child");

            tempiscroll.scrollToElement(_el[0], 500, 0, 0);

            _el.find(".matnumber").trigger("click");

        }, 300);
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
        }

		_this.addmaterial = function(_mat){
			_this.materialset.push( _mat );
		}


        _this.shownewslot = function(_id, _svg){
            var _temp,
            _this = this;
            $.getJSON(
               // "module/barcode/json_material.json?clearcache="+Math.random(),
			   "?inc=design_bouquet-process&Mode=ShownewSlot&id="+_id,
                function( data, textStatus, jqXHR ){
                    _this.isEdit = true;
                    _temp = make_mrk({
                                "id":data.material.id,
                                "fullcode":data.material.fullcode,
                                "name":data.material.name,
                                "price":Number(data.material.pricenogas),
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

                    _temp.attr("matno", _id);

                    if( _svg ){
                        _temp.data("svg", _svg);
                    }

                    _this.view.main.find(".matlist").eq(0).append(_temp);

                    svgreorder();

                    
                    turnonscroll();
                    updatescroll( tempiscroll );

                    scrolltoBottom();
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
                    _this.materialset[i].view.main.find(".matlist:eq(0) .matnumber").html(i + 1);
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
                if( !$(this).hasClass("nouse") ){
                    parsehtmltomat( e );
                }
            });
        }

        function parsehtmltomat( e ){
            // not rowhead : true
            if( e.className.search(/rowhead/g) < 0 ){
                var _item = $(e);
                var _m = new material( {
                    id: 001,
                    code: _item.find(".codewrap span").text().trim(),
                    price: Number( _item.find(".price:eq(0)").text() ),
                    quantity: Number( _item.find(".quantity").text() ),
                    total: Number( _item.find(".matallprice").text() ),
                    balloon: _this,
                    gas: _item.find("gas").text(),
                    view: {
                        quantity: _item.find(".quantity"),
                        stock: _item.find(".instock"),
                        main: _item,
                        total: _item.find(".matallprice"),
                        price: _item.find(".price:eq(0)")
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
        

        _this.setPrice = function( _value ){
            _this.price = _value;
            _this.total = _this.price * _this.quantity;
            _this.balloon.applytotal();
            _balloonset.updateprice();

            _this.view.price.html( _this.price );
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
            _this.view.main.fadeOut("fast", function(){
                _this.view.main.remove();

                turnonscroll();
                updatescroll( tempiscroll );
                tempiscroll.scrollTo(0, $.pos);
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
            _this.total = _this.quantity * original.price;

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
            _this.total = cutmath(original.price * _this.quantity);
            
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
    function openoverlay( _id ){



        // run after barcode scaner readed
        //_balloonset.getballoon( Number( _id ) ).shownewslot(256);

        $(".overlay, .overlay-boxcode").fadeIn();
        $("#barcodematerial").focus();
    }
    function closeoverlay(){
        $(".overlay, .overlay-boxcode").fadeOut();
    }

    function focusToBarcode(){
        setTimeout(function(){
            $("#barcodeballoon").focus();
        },100);
    }


   /** Misc. 
   * ขั้นตอนวนนับเอาจำนวน balloon ทั้งหมดที่มีตอนแรกเพื่อสร้าง object balloon
   *
    $("#balloonsetballoonsetballoonset .balloonitem").each(function(i, e){
        var _item = $(e);
        _item.attr("index", i);
    });
   */ 

   function svgsetupstage(){
        var w = $("#designstage").width();
        var h = $(window).innerHeight()-105-50;
        var mains = $("#designstage");
       mains.height( h );
       var s = Snap(w,h);

       return {
            "svgBox" : s ,
            "mains" : mains ,  
            "w" : w ,  
            "h" : h ,
            "selectedSvg" : null,
            "svgmatA" : []
       }
   }

   function addsvgfile ( opt ){
        Snap.load( opt.filename , function(f){
            var a = f.selectAll("[id]");

            //var _id = _item.data("svg").node.getAttribute("id");

            var _code = opt.filename.split("/").pop().split(".")[0];
            var _group = $.svgObj.svgBox.selectAll("[id^='"+ _code +"']");
            var _numA = [];

            if( _group.length != 0 ){
                _group.forEach(function(e, i){
                    var __id = e.node.getAttribute("id");
                    var _num;
                    if( __id.search(/_\d{1,}_/g) != -1 ){
                        _num = Number( __id.match(/::_\d{1,}_/g)[0].replace(/::_/g, '').replace(/_/g,"") );
                    }else{
                        _num = 0;
                    }
                    
                    _numA.push( _num );
                });
            }else{
                _numA.push( 0 );
            }

            

            var _max = Math.max.apply(Math, _numA);
            _max += 1;

            var _newid = _code+"::_"+ _max +"_";

            var _clone;
            a.forEach(function(e, i){
                var _tempcode = e.node.getAttribute("id");
                if( _tempcode.search(/::/g) != -1 ){
                    e.node.setAttribute("id", "");
                    _clone = e;
                }
            });
            //_clone.node.setAttribute("id", _newid);

            var r = $.svgObj.svgBox.paper.g();
            r.node.setAttribute("id", _newid);
            r.add( _clone );

            var n = $.svgObj.svgBox.select("#containersvg > svg");
            n.add( r );



            //_clone.node.setAttribute("transform", "matrix(1 0 0 1 0 0)");

            var _parentid = $(".balloonitem").attr("index");

            _balloonset.getballoon( _parentid ).shownewslot( opt.matno, r ); 


            updatescroll( tempiscroll );
            //var m = decomposeMatrix( n.node.getCTM() );
            

        });   
   }


   function deltaTransformPoint(matrix, point)  {

        var dx = point.x * matrix.a + point.y * matrix.c + 0;
        var dy = point.x * matrix.b + point.y * matrix.d + 0;
        return { x: dx, y: dy };
    }


    function decomposeMatrix(matrix) {

        // @see https://gist.github.com/2052247

        // calculate delta transform point
        var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
        var py = deltaTransformPoint(matrix, { x: 1, y: 0 });

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {

            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };        
    }


   function loadsvgfile( opt ){
        Snap.load( opt.filename , function(f){
                var svgmatA = [];
                var aa = f.selectAll("g");
                f.select("svg").node.setAttribute("width","100%");
                f.select("svg").node.setAttribute("height","100%");
                f.select("svg").node.setAttribute("viewBox","0 0 "+ opt.svgObj.w +" "+opt.svgObj.h);
                // for(var i = 0 ; i < a.length ; ++i){
                //  console.log( a[i] );
                //  a[i].drag();
                // }



                f.selectAll("*").forEach(function(e,i){
                    if( e.attr ){
                           var str = (e.attr("id"));
                           if( str ){
                                      if( str.search(/::(_\d{1,}_){0,}$/g) != -1 ){
                                            svgmatA.push( e );
                                      }
                           }
                    }
                });

                $.svgObj.svgmatA = svgmatA;


                //m.translate(80,50);
                var center = f.selectAll("g")[0].select("[id^=origin]").getBBox();

                
                //a[0].paper.rect(0,0,20,20);

                var result = opt.svgObj.svgBox.paper.g();
                result.add( f );
                result.node.setAttribute("id", "containersvg");

                var b =  result.getBBox();


                // var m = new Snap.Matrix();
                // m.rotate(45, 
                //     center.x+(center.w/2), 
                //     center.y+(center.h/2));
                // a[0].transform(m);


                

                opt.svgObj.svgBox.append( result );


                
                //aa[0].drag();


                function rotatefunc(){
                    var temp = aa[0].matrix;
                    var center2 = aa[0].select("[id^=origin]").getBBox();
                    var newm = new Snap.Matrix(
                            temp.a,
                            temp.b,
                            temp.c,
                            temp.d,
                            temp.e,
                            temp.f
                        )

                    newm.rotate(1, 
                        center2.x+(center2.w/2), 
                        center2.y+(center2.h/2));

                    aa[0].transform(newm);
                }

                opt.svgObj.mains.append( opt.svgObj.svgBox.node );

                opt.success( svgmatA );

                var _tempobj = $.svgObj.svgBox.select("#containersvg svg");
                var _allchild = _tempobj.selectAll("#containersvg > svg > *");

                var _tempgroup = _tempobj.paper.g();
                _tempgroup.node.setAttribute("id", idname);

                _allchild.forEach( function( e, i ){
                    _tempgroup.add( e );
                });


                _tempgroup.transform("t"+ ( opt.svgObj.w /2 - _tempgroup.getBBox().w / 2 ) +" "+ ( opt.svgObj.h /2 -  _tempgroup.getBBox().h/ 2 ) );

                var matrix = _tempgroup.node.getCTM();



                explodegroup( _tempgroup, matrix );
                
            });
   }

// function rotatesvg(ele, d){
//     var item = ele;
//     var m = new Snap.Matrix().add( item.matrix );
//     m.rotate(d, Number( item.node.getAttribute("ox") ), Number( item.node.getAttribute("oy") ));
//     var ts = m.toTransformString();
//     item.transform(ts);
// }

function explodegroup( _group, m ){
    var _parent = _group.parent();
    var _id = _group.node.getAttribute("id");

    var _child = _parent.selectAll("#"+_id+" > *");

    _child.forEach(function(e,i){
        _parent.add( e );
        e.transform("t"+m.e+" "+m.f);
        var origin = e.select("[id^='origin']");
        if( origin ){
            var bbox = origin.getBBox();
            e.node.setAttribute("ox", bbox.x);
            e.node.setAttribute("oy", bbox.y);
        }   
    });

    _group.remove();
}
   
   var isdrag = false, prevnum = 180;
   $("#btnrotate").on("mousemove", function(e){
        if( isdrag && $.svgObj.selectedSvg ){
            var num = 360 * e.currentTarget.value / 100;
            if( prevnum > num){
                $.svgObj.selectedSvg.rotatesvg(-6);
                //rotatesvg( $.svgObj.selectedSvg , -6 );
            }else if( prevnum < num ){
                $.svgObj.selectedSvg.rotatesvg(6);
                //rotatesvg( $.svgObj.selectedSvg, 6 );
            }
            prevnum = num;
        }
   })
   .on("mousedown", function(e){
        isdrag = true;
   })
   .on("mouseup", function(e){
        isdrag = false;
   });


 var key ;
    // var e = jQuery.Event("keydown")
    // e.which = 13 //choose the one you want
    $("#barcodeballoon").keydown(function(e){
        if( e.which == 13 && $(e.currentTarget).val().trim() == "" ){
			$("#btn-save").trigger('click');
            //window.location.href = "design_bouquet-print/75/printing.html";
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
    $("#balloonset")
    .on("click", ".matlist:eq(0) .matnumber", function(e){
                //turnoffscroll();
                // create temporary svg
                if( $.svgObj.tempsvg ){
                    $.svgObj.tempsvg.remove();
                }
                $.svgObj.tempsvg = $.svgObj.svgBox.select("#containersvg").clone();
                $.svgObj.tempsvg.selectAll("*").forEach(function(e, i){
                    e.node.style.display = "block";
                });
                $.svgObj.tempsvg.insertBefore( $.svgObj.svgBox.select("#containersvg") );
                $.svgObj.tempsvg.node.style.opacity = 0.65;
                

                var _svg = $(e.currentTarget).closest(".matitem").data("svg");
                if( $.svgObj.selectedSvg ){
                    $.svgObj.selectedSvg._RotationBox.hide();
                    if( $.svgObj.selectedSvg.node.getAttribute("id") == _svg.node.getAttribute("id") ){
                        $.svgObj.svgBox.selectAll("[id]").forEach(function(e, i){
                            e.node.style.display = "block";
                            e.undrag();
                        });
                        $(".matitem.selected").removeClass("selected");
                        $.svgObj.selectedSvg._RotationBox.hide();
                        $.svgObj.selectedSvg = null;
                        return false;
                    }
                }
                $.svgObj.svgBox.selectAll("[id]").forEach(function(e, i){
                    if( e.node.getAttribute("id").search(/::(_\d{1,}_){0,}$/g) != -1 ){
                        e.node.style.display = "none";
                    }
                });
                $(".matitem.selected").removeClass("selected");
                $(e.currentTarget).parent().addClass("selected");
                _svg.node.style.display = "block";
                _svg.drag();
                
                $.svgObj.selectedSvg = _svg;
                $.svgObj.selectedSvg.showRotation();

                // setTimeout(function(){
                //     turnonscroll();
                // }, 100);
            })
    .on("click", ".matlist .btnBC-up", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        var _matitem = _balloonset.getballoon(_parentid).getMatAt(_id);
        focusToBarcode();


         _matitem.addQuantity();
         e.stopImmediatePropagation();
    })
    .on("click", ".matlist:eq(1) .btnBC-plus", function(e){
        openoverlay( 0 );
        e.stopImmediatePropagation();
    })
    .on("click", ".matlist:eq(0) .btnBC-plus", function(e){
        turnoffscroll();

        var _this = $(this);
        var _item = _this.closest(".matitem");
        var _parent = _item.closest("tbody");
        var _id = _item.data("svg").node.getAttribute("id");

        var _code = _id.match(/\w{1,11}/g)[0];
        var _group = $.svgObj.svgBox.selectAll("[id^='"+ _code +"']");
        var _numA = [];

        _group.forEach(function(e, i){
            var __id = e.node.getAttribute("id");
            var _num;
            if( __id.search(/_\d{1,}_/g) != -1 ){
                _num = Number( __id.match(/::_\d{1,}_/g)[0].replace(/::_/g, '').replace(/_/g,"") );
            }else{
                _num = 0;
            }
            
            _numA.push( _num );
        });

        var _max = Math.max.apply(Math, _numA);
        _max += 1;

        // var _index = _id.search(/::_\d{1,}_/g);
        // var _id2 = _id.slice( _index + 3 );
        // var newnumber = Number(_id2.replace(/_/g, ""))+1;

        var _newid = _id.match(/\w{1,}/g)[0]+"::_"+ _max +"_";

        var _clone = _item.data("svg").clone();
        _clone.node.setAttribute("id", _newid);
        $.svgObj.svgBox.select("#containersvg #Layer_1").append( _clone );



        //_clone.node.setAttribute("transform", "matrix(1 0 0 1 0 0)");

        var _parentid = _this.closest(".balloonitem").attr("index");

        _balloonset.getballoon( _parentid ).shownewslot( _item.attr("matno"), _clone );

        // var _max = _parent.find(".matitem").length+1;
        // var _newitem = _item.clone();
        //     _newitem.data("svg", _clone);
        //     _newitem.find(".matnumber").text( _max ); 
        //     _newitem.data("index", _max-1);


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
    .on("click", ".matlist:eq(0) .btnBC-delete", function(e){
        $.pos = tempiscroll.y;
        turnoffscroll();
        var _this = $(this);
        var _id = _this.closest(".matitem").data("index") - 0;
        var _parentid = _this.closest(".balloonitem").attr("index");
        focusToBarcode();
        _balloonset.getballoon(_parentid).deleteMaterial( _id );

        e.stopImmediatePropagation();

        if( _this.closest(".matitem").data("svg")._RotationBox ){
            _this.closest(".matitem").data("svg")._RotationBox.hide();
        }
        _this.closest(".matitem").data("svg").remove();
        $.svgObj.svgBox.selectAll("[id]").forEach(function(e, i){
            e.node.style.display = "block";
            e.undrag();
        });
        $(".matitem.selected").removeClass("selected");
        $.svgObj.selectedSvg = null;

        if(  $.svgObj.tempsvg  ){

            $.svgObj.tempsvg.remove();
        }

        setTimeout(function(){
            svgreorder();
        }, 800);
    })
    .on("change", ".matlist .gas select", function(e){
        var _this = $(this);
        var _id = _this.closest(".matitem").index() - 1;
        var _parentid = _this.closest(".balloonitem").attr("index");
        var _matitem = _balloonset.getballoon(_parentid).getMatAt(_id);
        _balloonset.getballoon(_parentid).isEdit = true;
        focusToBarcode();

        _matitem.setPrice( Number( e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute("rel") ) );
        console.log( e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute("rel") );
    });
    

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
        focusToBarcode();

        openoverlay( _id );
        e.stopImmediatePropagation();
    }); 
    

   /** Add Eventlistener
   * ขั้นตอนการใส่ action
   * overlay background
   */ 
    $(".overlay")
    .on("click", function(e){
        focusToBarcode();
        closeoverlay();
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
            _balloonset.loadballoon( _str );
            e.preventDefault();
    		$('#barcodeballoon').val('');
		}else{
			e.preventDefault();
			return false;
		}
        focusToBarcode();
    });
	
	$('#barcodeballoon').autocomplete({
		source:'?inc=design_bouquet-process&Mode=balloonSearch',
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
		var inner_html = '<a><div class="list_item_container"><div class="image"><img src="' + item.svg + '" style="width:120px"/></div><div class="txt"><div class="label"><b>Design Code : </b>' + item.key + '</div></div></div></a>';
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append(inner_html)
			.appendTo( ul );
	};

	$('#barcodematerial').autocomplete({
		source:'?inc=design_bouquet-process&Mode=MaterialsSearch',
		minLength: 0,
		select: function( event, ui){
			//var ball = new balloon();//_balloonset.loadballoon(ui.item.value);
			//$('#barcodematerial').val(ui.item.value);
			 //_balloonset.getballoon( Number( $('#barcodeindex').val() ) ).shownewslot(ui.item.no);


             addsvgfile( { 
                "filename" : "module/design_bouquet/svg/AFA07764000.svg" ,
                "matno" : ui.item.no,
                "svgObj" : $.svgObj,
                "success" : function( svgmatA ){

                }

            } );

			//$("#btnsubmit").trigger('click');
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
			$.get('?inc=design_bouquet-process&Mode=chkMaterials',{'code':$(this).val()},function(data){
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
		$.ajax({
			type: 'POST',
			url:'?inc=design_bouquet-process&Mode=Sell',
			data:{'blist':_balloonset.getallcode()
					,'cust_id'		:	$('#cust_id').val()
					,'form_getit'	:	($('#form_getit').prop('checked') ? 'Y':'N')
					,'form_shipping':	($('#form_shipping').prop('checked') ? 'Y':'N')
					,'form_setup'	:	($('#form_setup').prop('checked') ? 'Y':'N')
					,'send_date'	:	$('#send_date').val()
					,'send_time'	:	$('#send_time').val()
					,'hprovince'	:	$('#hprovince').val()
					,'hamphur'		:	$('#hamphur').val()
					,'shipp_detail'	:	$('#shipp_detail').val()
					,'customer'	:	$('#header_customer').find('input, textarea').serialize()
				},
			success:function(data){
				console.log(data);
				var formID = JSON.parse(data);
				console.log(formID.id);
				window.location = 'design_bouquet-print/'+formID.id+'/printing.html';
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
			window.location="design_bouquet.html";
			//alert('Key : ' + code);
		 }
		 console.log('Key : ' + code);
	});
	}

});