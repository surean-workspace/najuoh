<!-- 서브 네비게이션 -->
<?php
include(_LIBRARY_DIR."/config/menu.php");
$arrUrl = explode('/', @$_GET['url']);
$arrSubMenu = @$arrNav[substr(@$category_code,0,2)]['sub'];
?>

<section class="path-wrap">
	<ul class="path">
		<li class="path-home path-dep1"><span class="home"><span class="hidden">Home</span></span></li>
		<li class="path-dep1">
			<span><?=unserialize(@$arrNav[substr(@$category_code,0,2)]['title'])[getLocale()]?></span>
		</li>


<?php
if (strlen(@$category_code) >= 4) {
?>
        <li<?php if(strlen(@$category_code) == 4) { echo ' class="on path-dep1"';}?> class="path-dep1">
            <span><?=unserialize(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['title'])[getLocale()]?></span>
        </li>
<?php
}

// 3차 카테고리
if (strlen(@$category_code) >= 6) {
?>
          <li<?php if(strlen(@$category_code) == 6) { echo ' class="on path-dep1"';}?> class="path-dep1">
            <span><?=unserialize(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['sub'][substr($category_code,0,6)]['title'])[getLocale()]?></span>
        </li>
<?php
}
?>
	</ul>
</section>
