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
					<div style="width:99%; margin:0 auto; margin-bottom:2px">
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
