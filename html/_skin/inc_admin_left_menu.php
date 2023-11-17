<?php
$arrTmpMenu = explode('/', @$this->reqData['tpf']);
$tmp        = @$arrTmpMenu[0];
$menu_main  = @$arrTmpMenu[1];
$menu_sub   = str_replace("_reg","",@$arrTmpMenu[2]);

$arrMenu[$menu_main] = 'on ';
$arrMenuSub[$menu_main][$menu_sub] = ' class="on"';


//if($_SERVER["REMOTE_ADDR"]=="175.198.83.198"){ echo "<pre>"; print_r($arrMenu); echo "</pre>";};


$arrAdminMenuTmp = $this->objDBH->getRows("select code,menu,is_use from tbl_admin_menu_list order by code");  // 게시판 리스트
foreach($arrAdminMenuTmp['list'] as $key => $val) {
    $arrAdminMenu[$val['menu']] = $val['is_use'];
}
$arrBoard = $this->objDBH->getRows("select code,title,is_mass,is_order from tbl_board order by code");  // 게시판 리스트
$arrForm = $this->objDBH->getRows("select code,title from tbl_form order by code");                     // 모듈 리스트
?>


<div class="admin_nav__head">
				<?=_SITE_NAME?><br />admin
				<button class="btn_nav_toggle ripple_el--dedede shadow_el" type="button">메뉴 열기/닫기</button>
			</div>

			<div class="admin_nav__body">
				<h2 class="rd_only">관리자 메뉴</h2>
				<nav class="gnb">
					<ul class="gnb_depth1" >
						<li class="gnb_item item01 <?=!empty($arrMenu['dashboard']) ? $arrMenu['dashboard'] : ""?>"  >
							<a href="?tpf=admin/dashboard" >관리자 메인</a>
							<!--ul class="gnb_depth2">
								<li><a href="?tpf=admin/dashboard">대시보드</a></li>
							</ul-->
						</li>
						<!-- / 현재 열려있는 페이지 1depth에 "current on" 추가 -->
						<li class="gnb_item item02">
							<a href="#nav">설정</a>
							<ul class="gnb_depth2">
								<!-- / 현재 열려있는 페이지 2depth에 "on" 추가 -->
								<li <?=!empty($arrMenuSub['setting']['basic']) ? $arrMenuSub['setting']['basic'] : ""?>><a href="?tpf=admin/setting/basic">기본설정</a></li>
								<li><a href="?tpf=admin/setting/seo">SEO 설정</a>
									<ul class="gnb_depth3">
										<li <?=!empty($arrMenuSub['setting']['seo']) ? $arrMenuSub['setting']['seo'] : ""?>><a href="?tpf=admin/setting/seo">SEO 기본설정</a></li>
										<li <?=!empty($arrMenuSub['menu']['sitemap']) ? $arrMenuSub['menu']['sitemap'] : ""?>><a href="?tpf=admin/menu/sitemap">하단 사이트맵 관리</a></li>
										<li <?=!empty($arrMenuSub['menu']['link']) ? $arrMenuSub['menu']['link'] : ""?>><a href="?tpf=admin/menu/link">301 Redirect 관리</a></li>
									</ul>
								</li>

								<li <?=!empty($arrMenuSub['setting']['popup']) ? $arrMenuSub['setting']['popup'] : ""?>><a href="?tpf=admin/setting/popup">팝업</a></li>
								<li <?=!empty($arrMenuSub['setting']['history']) ? $arrMenuSub['setting']['history'] : ""?>><a href="?tpf=admin/setting/history">연혁</a></li>
								<li <?=!empty($arrMenuSub['setting']['banner']) ? $arrMenuSub['setting']['banner'] : ""?>><a href="?tpf=admin/setting/banner">배너</a></li>
								<li <?=!empty($arrMenuSub['setting']['map']) ? $arrMenuSub['setting']['map'] : ""?>><a href="?tpf=admin/setting/map">약도</a></li>
								<li <?=!empty($arrMenuSub['setting']['contract']) ? $arrMenuSub['setting']['contract'] : ""?>><a href="?tpf=admin/setting/contract">약관</a></li>
								<!--li><a href="?tpf=admin/setting/staff">임원</a></li>
								<li><a href="?tpf=admin/setting/delivery_company">택배사</a></li-->
							</ul>
						</li>
						<li class="gnb_item item03">
							<a href="#nav">컨텐츠 관리</a>
							<ul class="gnb_depth2">
								<!--li><a href="?tpf=admin/menu/page">페이지 관리</a></li-->
								<li <?=!empty($arrMenuSub['menu']['list']) ? $arrMenuSub['menu']['list'] : ""?>><a href="?tpf=admin/menu/list">메뉴 관리</a></li>
								<li <?=!empty($arrMenuSub['menu']['head']) ? $arrMenuSub['menu']['head'] : ""?>><a href="?tpf=admin/menu/head">헤더 관리</a></li>
								<li <?=!empty($arrMenuSub['menu']['bottom']) ? $arrMenuSub['menu']['bottom'] : ""?>><a href="?tpf=admin/menu/bottom">하단 관리</a></li>
							</ul>
						</li>
						<li class="gnb_item item04">
							<a href="#nav">게시판 관리</a>
							<ul class="gnb_depth2">
								<li class="<?=!empty($arrMenu['board']) ? $arrMenu['board'] : ""?>"><a href="?tpf=admin/board/manage">게시판 관리</a></li>
							</ul>
						</li>
						<li class="gnb_item item05">
							<a href="#nav">제품</a>
							<ul class="gnb_depth2">
								<li <?=!empty($arrMenuSub['product']['list']) ? $arrMenuSub['product']['list'] : ""?>><a href="?tpf=admin/product/list">리스트</a></li>
								<li <?=!empty($arrMenuSub['product']['item']) ? $arrMenuSub['product']['item'] : ""?>><a href="?tpf=admin/product/item">입력항목 설정</a></li>
								<li <?=!empty($arrMenuSub['product']['category']) ? $arrMenuSub['product']['category'] : ""?>><a href="?tpf=admin/product/category">카테고리</a></li>
							</ul>
						</li>
						<li class="gnb_item item06">
							<a href="#nav">모듈 관리</a>
							<ul class="gnb_depth2">
								<li class="<?=!empty($arrMenu['form']) ? $arrMenu['form'] : ""?>"><a href="?tpf=admin/form/manage">모듈 관리</a></li>
							</ul>
						</li>
						<li class="gnb_item item07">
							<a href="#nav">회원</a>
							<ul class="gnb_depth2">
								<li <?=!empty($arrMenuSub['member']['list']) ? $arrMenuSub['member']['list'] : ""?>><a href="?tpf=admin/member/list">회원 리스트</a></li>
								<li <?=!empty($arrMenuSub['member']['withdraw_list']) ? $arrMenuSub['member']['withdraw_list'] : ""?>><a href="?tpf=admin/member/withdraw_list">탈퇴 회원 리스트</a></li>
								<li <?=!empty($arrMenuSub['member']['log']) ? $arrMenuSub['member']['log'] : ""?>><a href="?tpf=admin/member/log">회원 접속이력</a></li>
								<li <?=!empty($arrMenuSub['member']['level']) ? $arrMenuSub['member']['level'] : ""?>><a href="?tpf=admin/member/level">등급 관리</a></li>
							</ul>
						</li>
						<!--li class="gnb_item item08">
							<a href="#nav">접속통계</a>
							<ul class="gnb_depth2">
								<li><a href="#nav">접속통계</a></li>
							</ul>
						</li-->
						<?php
							if (getLoginId() == 'admin' or getLoginId() == 'worker') {
								 $version_info = $this->objDBH->getRow("select version,left(version,1) as v from tbl_version order by version desc");
					

						?>
						<li class="gnb_item item09">
							<a href="#nav">관리자 설정</a>
							<ul class="gnb_depth2">
								<li <?=!empty($arrMenuSub['setting']['info']) ? $arrMenuSub['setting']['info'] : ""?>><a href="?tpf=admin/setting/info">기본 설정</a></li>
								<!--li><a href="#nav">관리자 지정</a></li>
								<li><a href="#nav">메뉴 권한 관리</a></li-->
								<li <?=!empty($arrMenuSub['setting']['locale']) ? $arrMenuSub['setting']['locale'] : ""?>><a href="?tpf=admin/setting/locale">다국어 번역</a></li>
								<li <?=!empty($arrMenuSub['setting']['translation']) ? $arrMenuSub['setting']['translation'] : ""?>><a href="?tpf=admin/setting/translation">컨텐츠 전체 복사 & 번역</a></li>
							<?php
									if (getLoginId() == 'admin') {
							?>
								<li <?=!empty($arrMenuSub['setting']['version']) ? $arrMenuSub['setting']['version'] : ""?>><a href="?tpf=admin/setting/version&v=<?=$version_info['v'];?>">Version <?=$version_info['version'];?></a></li>
							<?php } ?>
							</ul>
						</li>
						<?php } ?>
						<li class="gnb_item item10">
							<a href="#nav">알림 설정</a>
							<ul class="gnb_depth2">
								<li <?=!empty($arrMenuSub['setting']['snslogin']) ? $arrMenuSub['setting']['snslogin'] : ""?>><a href="?tpf=admin/setting/snslogin">SNS 로그인 설정</a></li>
								<li <?=!empty($arrMenuSub['community']['email']) ? $arrMenuSub['community']['email'] : ""?>><a href="?tpf=admin/community/email">메일 설정</a></li>
								<li <?=!empty($arrMenuSub['community']['email_list']) ? $arrMenuSub['community']['email_list'] : ""?>><a href="?tpf=admin/community/email_list">메일 발송 로그</a></li>
								<li <?=!empty($arrMenuSub['community']['sms']) ? $arrMenuSub['community']['sms'] : ""?>><a href="?tpf=admin/community/sms">카카오 알림톡 문구 지정</a></li>
								<li <?=!empty($arrMenuSub['community']['sms_list']) ? $arrMenuSub['community']['sms_list'] : ""?>><a href="?tpf=admin/community/sms_list ">SMS 발송 내역</a></li>
							</ul>
						</li>  
					</ul>
				</nav>

				<!--div class="nav_manual">
					<a href="#">관리자 메뉴얼</a>
				</div-->
			</div>


<script type="text/javascript">
$( document ).ready(function() {
  $('.gnb_item').each(function(i){
	if($(this).find('li.on').length>0){
		$(this).addClass("current");
		$(this).addClass("on");


	}

  });

  	$('.gnb_item').each(function(){
		if ($(this).hasClass('on')) $(this).find('.gnb_depth2').show();
	});
	
	$('.gnb_depth3 li.on').parents('.gnb_depth3').parent().addClass('on');

});
</script>