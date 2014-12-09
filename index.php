<!-- <script src="module/design_bouquet/snap.svg.js"></script> -->

<?php chk_online('login.html'); ?>
<link rel="stylesheet" href="module/index/stylesheet.css">
<div class="overlay">
	<span>x close</span>
</div>
<div class="overlay-boxcode">
	<strong class="title">
		Material ID
	</strong>
	<input type="text" name="" id="barcodematerial">
	<input type="hidden" name="barcodeindex" id="barcodeindex">
</div>

<div class="thumbspace popup popup-cart maximum" id="barcode" style="display: block; opacity: 1;">
<form id="frmCart">
	<div class="cart-title">
		<strong class="thumbhead"><a href="#" class="balloonarticon-cart"></a> Design Bouquet</strong>
		<ul class="actionlist actionlist-shortcut">
			<!-- <li><a href="" class="closebtn balloonarticon-close"></a></li> -->
			<!-- <li><a href="" class="balloonarticon2-minimal"></a></li> -->
		</ul>
	</div>


	<div class="thumbsgroup col-left" rel="noscroll">
		<div class="thumbbox typefull type1">


		<div id="designstage" class="">
			
		</div>



			
			 
		</div>
	</div>

	<div class="col-right">
		<div class="thumbsgroup" >
		
			<div class="thumbbox typefull type1">
				<div>
					<div style="width:100%; margin:0 auto; margin-bottom:2px">
						<div class="title_bar" id="barcodeinputwrapper">
							<strong class="title">บาร์โค้ด</strong> 
							<div class="inputwrapper">
								<input type="text" name="" id="barcodeballoon" class="barcodeinput textboxIncart">
							</div>
						</div>
						<div class="rightwrapper">
							<input type="submit" value="Submit" class="btnsubmit" id="btnsubmit">
						</div>
					</div>
					

					<div class="">
						<div class="title_bar" id="cart_item_title">
							รายการสินค้า
							<div class="iconlink hidden"><a href="#balloonInCart" class="balloonarticon-up showhide clickable"></a></div>
						</div>
						
						
						<div class="thumbcrop" id="balloonInCart">

							<table class="tabledivision" id="balloonset"> <!-- start item content -->
								
								<!-- space for balloon -->
								
							</table><!-- end item content -->

						</div>
					</div>
				</div>
			</div>
		
		
		</div>
	</div>

	<div class="billcolumn" id="billcolumn">
		

		<div style="width:99%; margin:0 auto; margin-bottom:2px">
			<div class="title_bar" style="margin-left:0;">
				<strong class="title title-receipt">ใบเสร็จรับเงินเลขที่</strong> 
				<div class="inputwrapper inputwrapper-receipt">
					<input type="text" name="" id="" class="barcodeinput textboxIncart" value="<?php echo $ball->Billcodeplus($rs->form_no); ?>" style="width:98%;">
				</div>
			</div>
		</div>


		<div class="thumbsgroup">
		
			<div class="thumbbox typefull type1">
				<div>
					
					
<!-- 					<div class="title_bar" id="header_title">
						ข้อมูลลูกค้า/ใบสั่งขายหน้าร้านด้วยบาร์โค้ด
						<div class="iconlink hidden"><a href="#header_detail" class="balloonarticon-down showhide clickable"></a></div>
					</div>
 -->				
 					<div id="header_detail">
						
						
						<div id="header_customer">
							<table class="table" style="margin-bottom:0px;">
								<tbody><tr>
									<th colspan="5">ข้อมูลลูกค้า</th>
								</tr>
								
								<tr>
									<td colspan="5">
										<div class="titleform">บริษัท : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_company" id="cust_company" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>

										<div class="titleform">ชื่อ : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_name" id="cust_name" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
											<input type="hidden" name="customer_no" id="customer_no" value="" class="textboxIncart">
										</div>

										<div class="titleform">Email : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_email" id="cust_email" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<div class="titleform">มือถือ : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_mobile" id="cust_mobile" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
										<div class="titleform">โทร. : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_phone" id="cust_phone" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
									<td colspan="3">
										<div class="titleform">รหัส : </div>
										<div class="formcontrol">
											<input type="text" name="cust_id" id="cust_id" value="" class="textboxIncart" readonly>
										</div>
										<div class="titleform">แฟกซ์ : </div>
										<div class="formcontrol">
											<input type="text" name="cust_fax" id="cust_fax" value="" class="textboxIncart">
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="5">
										<div class="titleform">ที่อยู่ : </div>
										<div class="formcontrol">
											<textarea name="cust_address" id="cust_address" style="width:90%;margin-bottom;" class="textboxIncart"></textarea> 
										</div>
									</td>
								</tr>


<!-- 								<tr>
									<td colspan="2">
										<div class="titleform">ชื่อ : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_name" id="cust_name" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
											<input type="hidden" name="customer_no" id="customer_no" value="" class="textboxIncart">
										</div>
									</td>
									<td colspan="2">
										<div class="titleform">Email : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_email" id="cust_email" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
									<td rowspan="3" class="border-bottom align-top" valign="top">
										<div class="titleform">ที่อยู่ : </div>
										<div class="formcontrol">
											<textarea name="cust_address" id="cust_address" style="width:90%;" class="textboxIncart"></textarea> 
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="3">
										<div class="titleform">บริษัท : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_company" id="cust_company" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
									<td>
										<div class="titleform">รหัส : </div>
										<div class="formcontrol">
											<input type="text" name="cust_id" id="cust_id" value="" class="textboxIncart" readonly>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="titleform">โทร. : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_phone" id="cust_phone" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
									<td colspan="2">
										<div class="titleform">มือถือ : </div>
										<div class="formcontrol">
											<span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="cust_mobile" id="cust_mobile" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										</div>
									</td>
									<td>
										<div class="titleform">แฟกซ์ : </div>
										<div class="formcontrol">
											<input type="text" name="cust_fax" id="cust_fax" value="" class="textboxIncart">
										</div>
									</td>
								</tr>
 -->
							</tbody></table>
							<div class="lnclear"></div>
						</div>
					</div>
					<div class="lnclear"></div>
					
					
					
					<div class="title_bar" id="cart_item_title" style="width:98%; margin-left:0;">
						บริการจัดส่งสินค้า/บริการติดตั้ง
						<div class="iconlink hidden"><a href="#pricebox" class="balloonarticon-down showhide clickable"></a></div>
					</div>
					<div class="pricebox" id="pricebox">
						<div id="shipping">
							<table>
								<tbody>
<!-- 									<tr>
										<td colspan="2">
										<div class="inline">
											<nobr>
											  	<input type="checkbox" id="form_getit" name="form_getit" value="" class="nofloat" checked> <label for="form_getit">ลูกค้ามารับเอง</label>
											  </nobr>
										</div>
										<div class="inline">
											<nobr><input type="checkbox" id="form_shipping" name="form_shipping" value="" class="nofloat" style="margin-left:0px" data-price=""> <label for="form_shipping">บริการจัดส่ง</label></nobr>
										</div>
										<div class="inline">
											<nobr>
												<input type="checkbox" id="form_setup" name="form_setup" value="" class="nofloat" style="margin-left:0px"> <label for="form_setup">บริการติดตั้ง</label>
											</nobr>
										</div>
											<div class="shippingbox">
												<div><input type="radio" name="shipping_type" id="motorbike" value="taxi" v-data="<?php echo OFFICE_NO; ?>"/> บริการจัดส่ง <input type="radio" name="shipping_type" id="car" value="car" v-data="<?php echo $_SESSION['LOGIN']['MAINOFFICE'] != 0 ? $_SESSION['LOGIN']['MAINOFFICE'] : OFFICE_NO; ?>"/> ส่งจากสาขาหลัก</div>
												<ul class="shippingprice">
													<li>
														<select name="shipping_taxi" id="shipping_taxi" class="clickable"data-toggle="tooltip" data-placement="bottom">
															<?php 
																$ship = $db->result(DB_PREFIX.'delivery',"delivery_type='taxi' AND ref_office_no = '". OFFICE_NO ."'",'delivery_price asc');
																if($ship){
																foreach($ship as $s){
																	echo '<option value="'.$s->delivery_no.'" taxi-price="'. $s->delivery_price .'">'.$s->ref_district_no.' [ราคา '.$s->delivery_price.']</option>';
																}
																}
															?>
														</select>
													</li>
												</ul>
											</div>
										</td>
									</tr>
 -->									<tr>
									<td class="firstcheckboxNoLeft" rowspan="3" valign="top" align="left">
										<div>
											<nobr>
											  	<input type="checkbox" id="form_getit" name="form_getit" value="" class="nofloat" checked> <label for="form_getit">ลูกค้ามารับเอง</label>
											  </nobr>
										</div>
										<div>
											<nobr><input type="checkbox" id="form_shipping" name="form_shipping" value="" class="nofloat" style="margin-left:0px" data-price=""> <label for="form_shipping">บริการจัดส่ง</label></nobr>
											<div class="shippingbox">
												<div><input type="radio" name="shipping_type" id="motorbike" value="taxi" v-data="<?php echo OFFICE_NO; ?>"/> บริการจัดส่ง <input type="radio" name="shipping_type" id="car" value="car" v-data="<?php echo $_SESSION['LOGIN']['MAINOFFICE'] != 0 ? $_SESSION['LOGIN']['MAINOFFICE'] : OFFICE_NO; ?>"/> ส่งจากสาขาหลัก</div>
												<ul class="shippingprice">
													<li>
														<select name="shipping_taxi" id="shipping_taxi" class="clickable"data-toggle="tooltip" data-placement="bottom">
															<?php 
																$ship = $db->result(DB_PREFIX.'delivery',"delivery_type='taxi' AND ref_office_no = '". OFFICE_NO ."'",'delivery_price asc');
																if($ship){
																foreach($ship as $s){
																	echo '<option value="'.$s->delivery_no.'" taxi-price="'. $s->delivery_price .'">'.$s->ref_district_no.' [ราคา '.$s->delivery_price.']</option>';
																}
																}
															?>
														</select>
													</li>
												</ul>
											</div>
										</div>
										<div style="clear:left;">
											<nobr>
												<input type="checkbox" id="form_setup" name="form_setup" value="" class="nofloat" style="margin-left:0px"> <label for="form_setup">บริการติดตั้ง</label>
											</nobr>
										</div>
									</td>
									<td>
										วันที่ :  <input type="text" name="send_date" id="send_date" class="textboxIncart " value="">
									</td>
									<td>
										เวลา : <input type="text" name="send_time" id="send_time" value="" class="textboxIncart ">
									</td>
								</tr>
							
<!-- 								<tr>
									<td>
										วันที่ :  <input type="text" name="send_date" id="send_date" class="textboxIncart " value="">
									</td>
									<td>
										เวลา : <input type="text" name="send_time" id="send_time" value="" class="textboxIncart ">
									</td>
								</tr> -->

 								<tr>
									<td>
										อำเภอ : <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="amphur" id="amphur" value="" class="textboxIncart ui-autocomplete-input" readonly="" autocomplete="off">
											  <input type="hidden" name="hamphur" id="hamphur" value="">
											  <input type="hidden" name="hdelivery_no" id="hdelivery_no" value="">
									</td>
									<td>
										จังหวัด : <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span>
										<input type="text" name="province" id="province" disabled="false" value="" class="textboxIncart ui-autocomplete-input" autocomplete="off">
										<input type="hidden" name="hprovince" id="hprovince" value="">
										<button type="button" name="btnAdd" disabled="false" id="btnAdd" box-url="?inc=stock_show-frm_location" box-width="800" box-height="260" class="btn btn-default cbox"><i class="glyphicon glyphicon-plus"></i></button>
									</td>
								</tr>
								<tr>
									<td colspan="2">รายละเอียดการส่ง / ติดตั้ง <br>
										<textarea id="shipp_detail" name="shipp_detail" style="width:100%;" class="textboxIncart"></textarea>
									</td>
								</tr>
							</tbody></table>
							
							
						</div>
						<div id="bank">
							<div class="paydetail" style="width:240px;">

								<div>
									
									<p>
										<select name="" id="promotion_dropdown" class="clickable">
											<option value="">เลือกโปรโมชั่น</option>
											<?php echo $ball->select_promotion(); ?>  
										</select>
									</p>
								</div>

								<div style="display:none;" id="stepdiscount">
									<p style="color:#ff0;font-weight:bold;font-size:14px;padding-left:8px;"> 
								<!-- 
									รายละเอียดโปรโมชั่น <input type="text" name="promotion" id="promotion" class="textboxIncart" value=""> 
										ซื้อสินค้าตั้งแต่ <span id="pricetarget">1000</span> บาทขึ้นไป<br>รับส่วนลด <span id="discountnum">5%</span>
								-->
									</p>
								<!--
									<p>วิธีการชำระเงิน โอนเงินผ่านธนาคาร หรือ ตู้ ATM ชื่อบัญชี บอลลูนอาร์ท จำกัด</p>
									<p>
										</p><ul>
											<li>
														<span class="w120">ธนาคารกรุงเทพ</span> 
														<span class="w100">บัญชีออมทรัพย์</span> <br>
														<span class="">สุขุมวิท 43 เลขที่ 172-0-60126-7</span>
												  </li>
																<li>
														<span class="w120">ธนาคารกสิกรไทย</span> 
														<span class="w100">บัญชีออมทรัพย์</span> <br>
														<span class="">สุขุมวิท 39 เลขที่ 096-2-27713-6</span>
												  </li>
																<li>
														<span class="w120">ธนาคารกสิกรไทย</span> 
														<span class="w100">บัญชีออมทรัพย์</span> <br>
														<span class="">บางกะปิ เลขที่ 096-1-04422-7</span>
												  </li>
																<li>
														<span class="w120">ธนาคารไทยพาณิชย์</span> 
														<span class="w100">บัญชีออมทรัพย์</span> <br>
														<span class="">สาขาทองหล่อ เลขที่ 042-2-47399-4</span>
												  </li>
												</ul>
									<p></p>
									<p>
										</p><div class="w160 floatleft">โปรดยืนยันการชำระเงินโดย ส่ง </div>
										<div class="w60p  floatleft">SMS  หรือ ส่งสำเนาใบ Pay-in ทาง Fax <br>หรือ ส่งสำเนาใบ Pay-in ทาง Email </div>  
									<p></p>
								-->
								</div>


							</div>
							<div class="payments">
								<table class="table">
									<tbody><tr>
										<td><div>ราคารวมสินค้า</div></td>
										<td><div><input type="text" name="totalprice" id="totalprice" value="0" class="textboxIncart"></div></td>
									</tr>
									<tr>
										<td><div>ค่าบริการจัดส่ง/ติดตั้ง</div></td>
										<td><div><input type="text" name="setupprice" id="setupprice" value="0" class="textboxIncart"></div></td>
									</tr>
									<tr>
										<td><div>ราคารวม</div></td>
										<td><div><input type="text" name="sumprice" id="sumprice" value="0" class="textboxIncart"></div></td>
									</tr>
									<tr>
										<td><div>ส่วนลด</div></td>
										<td><div><input type="text" name="discount" id="discount" value="0" class="textboxIncart"></div></td>
									</tr>
									<tr>
										<td><div>Vat 7%</div></td>
										<td><div><input type="text" name="vat" id="vat" value="0" class="textboxIncart" readonly=""></div></td>
									</tr>
									<tr>
										<td><div>ราคารวมทั้งสิ้น</div></td>
										<td><div><input type="text" name="net" id="net" value="0" class="textboxIncart"></div></td>
									</tr>
								</tbody></table>
							</div>
						</div>
						<div class="lnclear"></div>
					</div>
					<div class="lnclear"></div>
				</div>
			</div>
		
		
		</div>

	</div>


	<div class="buttom">
		<ul class="actionlist actionlist-shortcut">
			<li><a href="" class="balloonarticon-print"></a></li>
			<li><a href="previews.html" class="balloonarticon-image"></a></li>
			<li style="margin-left:3px;"><a href="" class="balloonarticon2-save" id="btn-save" style="font-weight:bold;"></a></li>
			<li><a href="" class="balloonarticon-letter"></a></li>
		</ul>
	</div>
	</form>
</div>
<input type="hidden" id="currentpage" value="barcode"/>

<input type="range"  min="0" max="100" id="btnrotate" style="display:none;"/>
