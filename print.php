<!-- <link rel="stylesheet" href="module/stock_show/print.css" media="print"> -->
<style>
	.mainbox{
		height:auto;
	}
	.a4{
		width:720px;margin:0 auto;
	}
	.bill {
	    background-color:#fff;
	    max-width:320px;
	    padding-right:15px;
	    padding-left:15px;
    	font-family: 'Tahoma';
    	font-size: 12px;
    	/*font-weight: normal;*/
    	line-height: 16px;
	}
	.f10px{
		font-size: 10px !important;
	}
	body,html{
		height:auto;
		overflow:visible;
		/*font:normal 12px/14px 'FontA' !important;*/
	}
	@media print{
	    .mainbox {
	        max-width:100%;
	        margin:0 auto; 
	    } 
	    #header-logo{
	        display:none;
	    }
	    .bill{
	    	width:100%;max-width: none;
	    	font-weight: normal !important;
	    }  
	}
	.paper-head{
		margin-bottom: 15px;
	}
	.text1{
		font-size: 14px;
		display:block;
		margin-bottom: 10px;
	}
	.centertext {
	    text-align:center;
	}
	.nowrap{
		white-space: nowrap;
	}
	.ta-r{
		text-align:right;
	}
	.underline:after {
	    display:block;
	    content:"";
	    padding-top:10px;
	    margin:0 15px 10px 15px;
	   border-bottom:1px dashed #000;
	}
	.logoimg{
		width:60%;
		margin:30px 0 10px 0;
	} 
	.col-xs-last{
		width:auto;
		overflow:hidden;
		float:none;
		position: relative;

	}
	.row-product{
		margin-bottom: 8px;
	}
	@page{
		
	}
</style>

<?php $rs = $db->record(DB_PREFIX.'formheader',"form_no = '".$_GET['id']."' AND form_type='sellbill'");
	  if($rs === FALSE){ alert('ไม่พบรายการขายนี้ กรุณาเลือกรายการใหม่'); redirect('report.html'); }
 ?>
<input type="hidden" id="currentpage" value="print"/>
<div class="container-fluid bill">
	<div class="row">
		<div class="col-xs-12 centertext">
			<img src="images/logo-01.png" alt="" class="logoimg">
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 centertext">
			บริษัท บอลลูนอาร์ท จำกัด <br>
			289/2 ซอยพัฒนาการ20 ถนนพัฒนาการ <br>
			เขตสวนหลวง แขวงสวนหลวง กรุงเทพฯ 10250
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 centertext">
			<!-- บริษัท บอลลูนอาร์ท จำกัด (สำนักงานใหญ่)  -->
			<?php echo $ball->office($rs->ref_office_no); ?>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 centertext">
			<!-- 289/2 ซอยพัฒนาการ20 ถนนพัฒนาการ แขวงสวนหลวง กรุงเทพฯ 10250 -->

			<?php //echo $ball->office_address($rs->ref_office_no); ?>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 centertext">
			เลขประจำตัวผู้เสียภาษี : 0135536000992
			 <?php //echo 'เลขประจำตัวผู้เสียภาษี  '. $ball->offices($rs->ref_office_no)->office_vat; ; ?>
		</div>
	</div>
	<div class="row underline">
		<div class="col-xs-12 centertext">
			 <?php echo 'รหัสสาขา '. $ball->offices($rs->ref_office_no)->office_code  ?> <br>
			 <?php echo ' โทร. '. $ball->offices($rs->ref_office_no)->office_phone; ?>
			 <?php //echo ' โทร. '. $ball->offices($rs->ref_office_no)->office_phone .'  แฟกซ์. '. $ball->offices($rs->ref_office_no)->office_fax; ?>
		</div>
	</div>
	<!-- <div class="row underline">
		<div class="col-xs-12 centertext">
			สาขาที่ xxxxxxx โทร. 02-714-6690
		</div>
	</div> -->
	
	<div class="row">
		<div class="col-xs-12 centertext">
			ใบเสร็จรับเงิน/ใบกำกับภาษี
		</div>
	</div> 
	<div class="row">
		<div class="col-xs-12">เลขที่ <?php echo $ball->Billcode($rs->form_no) ; ?></div>
		<!-- <div class="col-xs-6 ta-r" id="timestr"> <?php echo slate_dateTime($rs->form_date); ?></div> -->
	</div>
	<div class="row">
		<div class="col-xs-12"> <?php echo slate_dateTime($rs->form_date); ?> </div>
	</div>
	<div class="row">
		<div class="col-xs-12">ชื่อ <?php echo $ball->customer($rs->ref_customer_no)->customer_name; ?></div>
	</div>
	<div class="row">
		<div class="col-xs-12">ที่อยู่ <?php echo $ball->customer($rs->ref_customer_no)->customer_address; ?></div>
	</div>
	<div class="row">
		<div class="col-xs-12">เลขประจำตัวผู้เสียภาษี <?php echo $ball->customer($rs->ref_customer_no)->customer_vat != '' ? $ball->customer($rs->ref_customer_no)->customer_vat : '00'; ?></div>
	</div>
	<div class="row underline">
		<div class="col-xs-12">สถานประกอบการ สาขาที่ <?php echo $ball->customer($rs->ref_customer_no)->customer_vat != '' ? $ball->customer($rs->ref_customer_no)->customer_vat : '00'; ?></div>
	</div>

	<?php 
		$row = $db->result(DB_PREFIX.'formdetail',"ref_form_no = '".$_GET['id']."'", "materials_id asc");
		//printArray($row);
		if($row){
			$no = 0;
			$total = 0;
			
			foreach($row as $r){
				$class = '';
				$price = $r->formdetial_price;//$ball->itemPrice($ball->item_no($r->materials_id)) * $r->formdetail_unit;
				if ($r === end($row))
        			$class = 'underline';
				echo '

				<div class="row row-product '. $class .'">
					<div class="col-xs-7">'. (($no++)+1) . $ball->itemName($r->materials_id).' <br>
						'. $r->materials_id .'
					</div>
					<div class="col-xs-1 nowrap">'. $r->formdetail_unit .'</div>
					<div class="col-xs-4 col-xs-last ta-r">'. nb2($price) .'</div>
				</div>
				';
				$total += $price;

			}
			$vat = $total*7/100;
			$rat = $total-$vat;
		}
	?>

	<div class="row">
		<div class="col-xs-12">รวม <?php echo $no ;?> รายการ</div>
	</div>
	<div class="row">
		<div class="col-xs-7">มูลค่าที่เสียภาษี(v)</div>
		<div class="col-xs-5 ta-r"> <?php echo nb2($rat); ?> </div>
	</div>
	<div class="row underline">
		<div class="col-xs-7">ภาษีมูลค่าเพิ่ม</div>
		<div class="col-xs-5 ta-r"><?php echo nb2($vat); ?></div>
	</div>
	<div class="row underline">
		<div class="col-xs-7">
			<nobr>จำนวนเงินที่ต้องชำระรวม</nobr>
		</div>
		<div class="col-xs-5 ta-r">
			<?php echo nb2($total); ?>
		</div>
	</div>
	<div class="row underline">
		<div class="col-xs-12 centertext">ขอบคุณทุกท่านที่อุดหนุนบอลลูนอาร์ทค่ะ<br>
			ผู้ขาย <?php echo $ball->admins($rs->ref_admin_id)->admin_name . ' ' . $ball->admins($rs->ref_admin_id)->admin_surname; ?>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xs-12">&nbsp;</div>
	</div>
	
</div>


<script>
		//$(function(){
			// var _div = document.getElementById("timestr");
			// var _str = _div.innerHTML;
			// _str = _str.substring( 0, _str.length-2 );

			// _div.innerHTML =  _str ;
		//})
</script>
<!--
<div class="container-fluid a4" style="background:#fff;">
	<div class="row paper-head">
		<div class="col-xs-2">
			<img src="images/balloon-logo.png" class="img-responsive"/>
		</div>
		<div class="col-xs-6">
			<strong class="text1">
				ใบเสร็จรับเงิน/ใบกำกับภาษี <br>
				RECEIPT/TAX INVOICE <br>
			</strong>
			ชื่อบริษัท<?php echo $ball->office(OFFICE_NO); ?> <br>
			ที่อยุ๋บริษัท<?php echo $ball->office_address(OFFICE_NO); ?> <br>
			<?php echo 'โทร. '. $ball->office_tel(OFFICE_NO).' แฟกซ์. '. $ball->offices(OFFICE_NO)->office_fax; ?> <br>
			รหัสลูกค้า : <?php echo $ball->customer($rs->ref_customer_no)->customer_no; ?> <br>
			ชื่อลูกค้า : <?php echo $ball->customer($rs->ref_customer_no)->customer_name; ?> <br>
			ที่อยู่ : <?php echo $ball->customer($rs->ref_customer_no)->customer_address; ?>
		</div>
		<div class="col-xs-4">
			<?php echo 'เลขประจำตัวผู้เสียภาษี : 0135536000992'; ?> <br>
			ต้นฉบับ/ORIINAL <br>
			เลขที่/No. : <?php echo $_GET['id']; ?> <br>
			วันที่/Date : <?php echo us_date($rs->form_date); ?> <br>
			เลขที่ผู้เสียภาษี : 
		</div>
	</div>
	<!--
	<div class="row">
		<div class="col-xs-2 col-md-2"><img src="images/balloon-logo.png" class="img-responsive"/></div>
		<div class="col-xs-10 col-md-4">
			<h3><?php echo $ball->office(OFFICE_NO); ?></h3>
			<p><?php echo $ball->office_address(OFFICE_NO); ?></p>
			<p></p>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-2 col-md-2"></div>
		<div class="col-xs-4 col-md-4"><?php echo 'โทร. '. $ball->office_tel(OFFICE_NO).' แฟกซ์. '. $ball->offices(OFFICE_NO)->office_fax; ?></div>
		<div class="col-xs-4 col-md-4"><?php echo 'เลขประจำตัวผู้เสียภาษี : 0135536000992'; ?></div>
	</div>
	<div class="row">
		<div class="col-xs-8 col-md-8">
			<h3 class="text-center">ใบเสร็จรับเงิน/ใบกำกับภาษี</h3>
			<h3 class="text-center">RECEIPT/TAX INVOICE</h3>
		</div>
		<div class="col-xs-4 col-md-4">
			<h3>ต้นฉบับ/ORIINAL</h3>
			<p>เลขที่/No. : <?php echo $_GET['id']; ?></p>
			<p>วันที่/Date : <?php echo us_date($rs->form_date); ?></p>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-8 col-md-8">รหัสลูกค้า : <?php echo $ball->customer($rs->ref_customer_no)->customer_no; ?></div>
		<div class="col-xs-4 col-md-4">เลขที่ผู้เสียภาษี : </div
	</div>
	<div class="row">
		<div class="col-xs-12">ชื่อลูกค้า : <?php echo $ball->customer($rs->ref_customer_no)->customer_name; ?></div>
		<div class="col-xs-12">ที่อยู่ : <?php echo $ball->customer($rs->ref_customer_no)->customer_address; ?></div>
	</div>
	-/->
	<table class="table">
		<tr>
			<th class="text-center">
				<p>ลำดับ</p>
				<p>ITEM</p>
			</th>
			<th class="text-center">
				<p>รหัสสินค้า</p>
				<p>CODE NO.</p>
			</th>
			<th class="text-center">
				<p>รายการ</p>
				<p>DESCRIPTION</p>
			</th>
			<th class="text-center">
				<p>จำนวน</p>
				<p>QTY.</p>
			</th>
			<th class="text-center">
				<p>หน่วยละ</p>
				<p>UNIT PRICE</p>
			</th>
			<th class="text-center">
				<p>จำนวนเงิน</p>
				<p>AMOUNT</p>
			</th>
		</tr>
		<?php 
			$row = $db->result(DB_PREFIX.'sell',"ref_form_no = '".$_GET['id']."'", "ref_materials_id asc");
			if($row){
				$no = 0;
				foreach($row as $r){
					echo '
						<tr>
							<td>'. $no++ .'</td>
							<td>'. $r->ref_materials_id .'</td>
							<td></td>
							<td>'. $r->sell_unit .'</td>
							<td>'. $ball->materialsPrice($r->ref_materials_id) .'</td>
							<td>'. $ball->materialsPrice($r->ref_materials_id) * $r->sell_unit .'</td>
						</tr>
					';
				}
			}
		?>
	</table>
</div>
-->
