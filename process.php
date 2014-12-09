<?php 
	if($_GET['Mode'] == 'balloonSearch'){
		if ($_GET['term'] == '') exit ;
			$q = $_GET["term"];
			$tb 	= 	DB_PREFIX.'item';
			$where 	= 	"item_code like '". strtoupper($q) ."%' AND item_active = 'Y'";
			$order 	=	"item_code asc"; 
			$row 	=	$db->result($tb,$where,$order,"0,20");
			//printArray($row);
			$resultArray = array();
			if($row){
				$arrCol = array();
				foreach ($row as $r) {
						$code1 		= substr($r->item_code,0,1);
						$code2 		= substr($r->item_code,1,1);
						$mainFolder	= $ball->itemFolder($code1,'group',0);
						$subFolder 	= $ball->itemFolder($code2,'subgroup',$mainFolder);
						$svgfolder 	= 'images/Balloons/'. $ball->FolderName($mainFolder).'/'.$ball->FolderName($subFolder).'/';
						$chk_img = $ball->svgtopng($svgfolder . $r->item_code);
						
						$arrCol['value'] 	= strtoupper($r->item_code); 
						$arrCol['label'] 	= $r->item_detail; 
						$arrCol['key'] 		= strtoupper($r->item_code);
						$arrCol['image'] 	= $r->item_name;
						$arrCol['svg'] 		= $chk_img;
						array_push($resultArray,$arrCol);
				}
			echo json_encode($resultArray);
			unset($resultArray);
			}
	}
	
	if($_GET['Mode'] == 'Sell'){
		$tbheader 	= DB_PREFIX.'formheader';
		$formNo 	= $db->createID($tbheader,'form_no');
		parse_str($_POST['customer'], $post);
		//printArray($post);
		//printArray($_POST); exit;
		if(empty($post['cust_id'])){
			$ctm = array();
			$cmt['customer_name'] 		= $post['cust_name'];
			$cmt['customer_email'] 		= $post['cust_email'];
			$cmt['customer_company'] 	= $post['cust_company'];
			$cmt['customer_address'] 	= $post['cust_address'];
			$cmt['customer_tel'] 		= $post['cust_phone'];
			$cmt['customer_mobile'] 	= $post['cust_mobile'];
			$cmt['customer_fax'] 		= $post['cust_fax'];
			$cmt['customer_date'] 		= date('Y-m-d H:i:s');
			$cmt['customer_update'] 	= date('Y-m-d H:i:s');
			$cmt['ref_office_no'] 		= $ball->ref_office();
			$cmt['ref_admin_no'] 		= $_SESSION['LOGIN']['ID'];
			if(!empty($cmt['customer_name'])){
				$customer_no	= $db->createID(DB_PREFIX.'customer','customer_no');
				$cmt['customer_no'] 		= $customer_no;
				$db->insert(DB_PREFIX.'customer',$cmt);
			}else{
				$customer_no	= 7;
			}
		}else{
			$customer_no	=  $post['cust_id'];
		}
		
		$data['ref_office_no'] 	= $_SESSION['LOGIN']['OFFICE'];
		$data['ref_admin_id'] 	= $_SESSION['LOGIN']['ID'];
		$data['form_date'] 		= date('Y-m-d H:i:s');
		
		$data['form_type'] 		= 'sellbill';
		$data['ref_customer_no']	= 	$customer_no;
		$data['form_no'] 			= 	$formNo;
		$data['form_id'] 			= 	$ball->runBill(OFFICE_NO);
		$data['form_send_date'] 	=	$_POST['send_date'];
		$data['form_send_time'] 	=	$_POST['send_time'];
		$data['form_amphur'] 		=	$_POST['hamphur'];
		$data['form_province'] 		=	$_POST['hprovince'];
		$data['form_shipp_detail']	=	$_POST['shipp_detail'];
		$data['form_promotion'] 	=	$_POST['promotion'];
		$data['form_getit'] 		=	$_POST['form_getit'];
		$data['form_shipping'] 		=	$_POST['form_shipping'];
		$data['form_setup'] 		=	$_POST['form_setup'];
		$data['form_promotion'] 	=	'';//$_POST['form_setup'];
		
		$fWhere 	= "form_no = '". $formNo ."' AND form_type = 'sellbill' AND ref_office_no = '". $data['ref_office_no'] ."'";		
		
		$chk = $db->record($tbheader, $fWhere);
		$itemNo = $ball->item_no($code);
		
		if($chk === FALSE){
			$db->insert(DB_PREFIX.'formheader',$data);
		}
		//printArray($data);

		//:: FORM DETAIL SELL ON BILL DESIGN BILL :://
		//:: FORM MATERIALS LIST SELL ON BILL DESIGN BILL :://	
		//printArray($_POST['blist']);
		if($_POST['blist']){
			foreach($_POST['blist'] as $b){
				if($b){
					foreach($b as $bk => $bv ){
						if($bv['mat']){
							$price = 0;
							foreach($bv['mat'] as $tokey => $toval){
								$price += $toval['total'];
							}
						}
						
						//echo '<pre>', print_r($bv),'</pre>';
						$dWhere = "ref_form_no = '$formNo' AND materials_id = '". $bv['code']."'";
		//echo '[Where : '. $dWhere .']';
		$frs = $db->record(DB_PREFIX.'formdetail',$dWhere);
		$fdata['ref_materials_no'] 	= $ball->itemID($bv['code']);
		$fdata['ref_form_no'] 		= $formNo;
		$fdata['ref_office_no'] 	= $_SESSION['LOGIN']['OFFICE'];
		$fdata['materials_id'] 		= $bv['code'];
		$fdata['formdetail_unit'] 	= $bv['quantity'];
		$fdata['formdetial_price'] 	= $price;//$ball->itemPrice($itemNo);//$_POST['sell_price'];
		$fdata['formdetail_type'] 	= 'sellbill';
		$item = $db->record(DB_PREFIX.'item',"item_code = '". $bv['code'] ."'");
		if($item !== FALSE)
		if($frs === FALSE){
			$rs = $db->insert(DB_PREFIX.'formdetail',$fdata);
		}else{
			$rs = $db->update(DB_PREFIX.'formdetail',$fdata,$dWhere);
		}
		$ref = $db->record(DB_PREFIX.'formdetail',$dWhere);
		if($bv['mat']){
			foreach($bv['mat'] as $k => $r){
			//$sell=array();
				$sell['ref_materials_id'] 	= $r['code'];
				$sell['ref_form_no'] 		= $formNo;
				$sell['ref_formdetail_no'] 	= $ref->formdetail_no;
				$sell['ref_item_no']		= $itemNo;
				$sell['sell_gas'] 			= $r['gas'];
				$sell['sell_unit'] 			= $r['quantity'];
				$sell['sell_price'] 		= $r['total'];
				$sell['ref_office_no'] 		= OFFICE_NO;
				$chksell = $db->record(DB_PREFIX.'sell',"ref_form_no = '$formNo' AND ref_formdetail_no = '". $ref->formdetail_no ."' AND ref_materials_id = '". $r['code'] ."'");
				if($chksell === FALSE) $db->insert(DB_PREFIX.'sell',$sell);
			}

		}
				}
			}
		}
		}
		$form['id'] = $formNo;
		echo json_encode($form);
		unset($form);
		//redirect('stock_show-print/'.$formNo.'printing.html');
	}
	
	if($_GET['Mode'] == 'MaterialsSearch'){
		//if ($_GET['term'] == '') exit ;
			$q 		= $_GET["term"];
			$tb 	= DB_PREFIX.'materials';
			$where 	= "materials_id like '". strtoupper($q) . "%'";
			$order 	= 'materials_id asc';
			$limit 	= '20';
			
			$row 	=	$db->result($tb,$where,$order,$limit);

		$resultArray = array();
			if($row){
				$arrCol = array();
				foreach ($row as $r) {
		 		$arrCol['value'] 	= $r->materials_id; //$obResult->fields['rm_descript'];
		        $arrCol['label'] 	= $r->materials_id; //$obResult->fields['rm_descript'];
		        $arrCol['key'] 		= $r->materials_detail; //$obResult->fields['rm_code'];
		 		$arrCol['no'] 		= $r->materials_no; //$obResult->fields['rm_descript'];
				$arrCol['image']	= 'images/Materials/'.$r->materials_image;
		         
		        array_push($resultArray,$arrCol);
				}
			}
			echo json_encode($resultArray);
			unset($resultArray);
	}
	
	if($_GET['Mode'] == 'ShownewSlot'){
			$tb 	= DB_PREFIX.'materials';
			$where 	= "materials_no = '". $_GET['id'] . "'";
			
			$r 	=	$db->record($tb,$where);
			$mat["material"] = array(
				"id" => $r->materials_no,
				"fullcode" => $r->materials_id,
				"name" => $r->materials_detail,
				"price" => $ball->materialsPrice($r->materials_id),
				"gas"	=> $ball->gasused($r->materials_id) == 0 ? 'N':'Y',
				"pricegas" => $ball->materialsPrice($r->materials_id),
				"pricenogas" => $ball->materials($r->materials_id)->materials_price,
				"quantity" => 1,
				"img" => "images/Materials/". $r->materials_image,
				"stock" => $ball->office_balance($r->materials_id, $_SESSION['LOGIN']['OFFICE']),
			);
			if(r !== FALSE){
			echo json_encode($mat);
			unset($resultArray);
			}else{ 
				return false;
			}
	}
	
	if($_GET['Mode'] == 'chkMaterials'){
			$tb 	= DB_PREFIX.'materials';
			$where 	= "materials_id = '". $_GET['code'] . "'";
			$r 	=	$db->record($tb,$where);
			
			$arr['no'] = $r !== FALSE ? $r->materials_no : 'false';
			$arr['code'] = $r !== FALSE ? $r->materials_id : 'false';
			echo  json_encode($arr);
			unset($arr);
	}

?>












