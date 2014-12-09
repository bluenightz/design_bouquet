<?php 
	$r = $db->record(DB_PREFIX.'item'," item_code = '".$_GET['code']."'");
	if($r === FALSE): echo 'false'; exit; endif;
	$code = strtoupper($_GET['code']);
//	if($row){
//		foreach($row as $r){
			$code1 		= substr($code,0,1);
			$code2 		= substr($code,1,1);
			$mainFolder	= $ball->itemFolder($code1,'group',0);
			$subFolder 	= $ball->itemFolder($code2,'subgroup',$mainFolder);
			$svgfolder 	= 'images/Balloons/'. $ball->FolderName($mainFolder).'/'.$ball->FolderName($subFolder).'/';
			$img 	= $ball->svgtopng($svgfolder . $code);
			
			$itemNo = $ball->item_no($code);
?>
<tr class="balloonitem"> <!-- start item -->
	<td class="leftcolumn" style="display:none;">
		<table class="basic-barcodetable">
			<tr class="rowhead">
				<td>รายการสินค้า</td>
			</tr>
			<tr>
				<td>
					<div class="img">
						<strong class="title"><span class="runnumber">1</span>. <?php echo $code; ?> </strong>
						<img src="<?php echo $img; ?>" alt="">
						<strong class="edit">แก้ไขแบบ</strong>
						<a href="" class="btn-trash clickable"></a>
					</div>
				</td>
			</tr>
			<tr style="display:none;">
				<td>
					<div class="balloonprice">
						<div class="balloonprice-title">ราคาบอลลูน : </div><div class="balloonprice-price">&nbsp;</div>
					</div>
				</td>
			</tr>
		</table>
	</td>
	<td>
		<table class="basic-barcodetable matlist" >
			<tr class="rowhead">
				<td class="col1">ลำดับ</td>
				<td class="col2">ภาพ</td>
				<td class="col3">รหัส</td>
				<td class="col4" style="display:none;">ราคา/หน่วย</td>
				<td class="col5" style="display:none;">จำนวน</td>
				<td class="col5" style="display:none;">แก๊ส</td>
				<td class="col5" style="display:none;">ราคารวม</td>
				<td class="" colspan='2'>แก้ไขจำนวน</td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10 lasttd">ราคา</td>
				<!-- <td class="spacetd ">&nbsp;</td> -->
			</tr>
			<?php 
			$mat = $db->result(DB_PREFIX.'itemlist',"ref_item_no = '".$itemNo ."'","ref_materials_id asc");
			if($mat){
				$i= 0;
				foreach($mat as $m){
			?>
			<tr class="matitem" matno="<?php echo $ball->materials($m->ref_materials_id)->materials_no; ?>">
				<td class="col1 matnumber"><?php echo ++$i; ?></td>
				<td class="col2">
					<div class="tmbnmat"><img src="images/Materials/<?php echo $ball->materials_img($m->ref_materials_id); ?>" alt=""></div>
				</td>
				<td class="col3">
					<div class="codewrap"><?php echo '<span>' . $m->ref_materials_id .' </span><br> 
						'. $m->list_name ; ?></div>
				</td>
				<!-- <td class="col4" style="display:none;"><span class="price_"><?php echo $ball->unitPrice($m->ref_materials_id,$m->list_no); ?></span></td> -->
				<td class="col5" style="display:none;"><span class="quantity"><?php echo $m->materials_num; ?></span></td>
				<td class="col5" style="display:none;"><span class="gas"><select class="clickable chkgas"><option value="Y" <?php echo $m->list_gas == 'Y' ? 'selected':''; ?> rel="<?php echo $ball->materialsPrice($m->ref_materials_id);?>">Yes</option><option value="N"  <?php echo $m->list_gas == 'N' ? 'selected':''; ?> rel="<?php echo $ball->materials($m->ref_materials_id)->materials_price;?>">No</option></select></span></td>
				<td class="col5" style='display:none;'><span class="matallprice"><?php echo ( $m->materials_num * $ball->materialsPrice($m->ref_materials_id) ) ?></span></td>
				<!-- <td class="col6"><div class="btnBC clickable btnBC-up"></div></td> -->
				<td class="col7"><div class="btnBC clickable btnBC-plus"></div></td>
				<td class="col8"><div class="btnBC clickable btnBC-delete"></div></td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10 lasttd"><span class="price"><?php echo $ball->unitPrice($m->ref_materials_id,$m->list_no); ?></span></td>
				<td class="col10 lasttd" style="display:none;"><span class="instock"><?php echo $ball->office_balance($m->ref_materials_id, $_SESSION['LOGIN']['OFFICE']) - $m->materials_num; ?></span></td>
				<!-- <td class="spacetd ">&nbsp;</td> -->
			</tr>
			<?php 
				}
			}
			?>
			<!--
			<tr class="matitem">
				<td class="col1 matnumber">2</td>
				<td class="col2">
					<div class="tmbnmat"><img src="http://www.balloonoffice.com/images/Materials/1407122160.jpg" alt=""></div>
				</td>
				<td class="col3">
					<div class="codewrap">AFA24477000 <br> 
						Happy Birthday Striped Cupcake</div>
				</td>
				<td class="col4"><span class="price">100</span></td>
				<td class="col5"><span class="quantity">5</span></td>
				<td class="col6"><div class="btnBC clickable btnBC-up"></div></td>
				<td class="col7"><div class="btnBC clickable btnBC-down"></div></td>
				<td class="col8"><div class="btnBC clickable btnBC-delete"></div></td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10"><span class="instock">50</span></td>
				<td class="spacetd lasttd">&nbsp;</td>
			</tr>
			<tr class="matitem">
				<td class="col1 matnumber">3</td>
				<td class="col2">
					<div class="tmbnmat"><img src="http://www.balloonoffice.com/images/Materials/1407122160.jpg" alt=""></div>
				</td>
				<td class="col3">
					<div class="codewrap">AFA24477000 <br> 
						Happy Birthday Striped Cupcake</div>
				</td>
				<td class="col4"><span class="price">150</span></td>
				<td class="col5"><span class="quantity">6</span></td>
				<td class="col6"><div class="btnBC clickable btnBC-up"></div></td>
				<td class="col7"><div class="btnBC clickable btnBC-down"></div></td>
				<td class="col8"><div class="btnBC clickable btnBC-delete"></div></td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10"><span class="instock">20</span></td>
				<td class="spacetd lasttd">&nbsp;</td>
			</tr>
			<tr class="matitem">
				<td class="col1 matnumber">4</td>
				<td class="col2">
					<div class="tmbnmat"><img src="http://www.balloonoffice.com/images/Materials/1407122160.jpg" alt=""></div>
				</td>
				<td class="col3">
					<div class="codewrap">AFA24477000 <br> 
						Happy Birthday Striped Cupcake</div>
				</td>
				<td class="col4"><span class="price">900</span></td>
				<td class="col5"><span class="quantity">2</span></td>
				<td class="col6"><div class="btnBC clickable btnBC-up"></div></td>
				<td class="col7"><div class="btnBC clickable btnBC-down"></div></td>
				<td class="col8"><div class="btnBC clickable btnBC-delete"></div></td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10"><span class="instock">30</span></td>
				<td class="spacetd lasttd">&nbsp;</td>
			</tr>
			-->
		</table>
	</td>
	<td class="rightcolumn" style="display:none;">
		<table class="basic-barcodetable">
			<tr class="rowhead">
				<td>จำนวนสินค้า</td>
			</tr>
			<tr>
				<td>
					<div class="quantity">
						1
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="btnBC clickable btnBC-up">
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="btnBC clickable btnBC-down">
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="btnBC clickable btnBC-plus">
					</div>
				</td>
			</tr>
		</table>
	</td>
</tr> <!-- end item -->

<tr> 
	<td colspan="3">&nbsp;</td>
</tr><!-- space between item -->
<!-- space between item -->
<tr>
	<td colspan="3">
		<table class="basic-barcodetable matlist" >
			<tr class="matitem nouse">
				<td class="col7"><div class="btnBC clickable btnBC-plus"></div></td>
				<td class="col2" colspan="6" style="border-right:0px;">&nbsp;</td>
				<td class="col7" colspan="2" style="padding-right:10px;border-left:0px;text-align:right;">Total</td>
				<td class="spacetd">&nbsp;</td>
				<td class="col10 lasttd"><span class="price" id="total2"></span></td>
				
				<!-- <td class="spacetd ">&nbsp;</td> -->
			</tr>
		</table>
	</td>
</tr>
<tr> 
	<td colspan="3">&nbsp;</td>
</tr><!-- space between item -->