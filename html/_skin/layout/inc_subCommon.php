<?php
include(_LIBRARY_DIR."/config/menu.php");
if($locale != getDefaultLocale()) $arrUrl = explode('/', preg_replace('/'.$locale.'\//','',@$_GET['url']));
$arrSubMenu = @$arrNav[substr(@$category_code,0,2)]['sub'];
//if(getenv("REMOTE_ADDR") == "175.198.83.198") { echo "<div align=left><pre>"; var_dump($arrSubMenu); echo "</pre>"; die("<br>End</div>");}
if(!empty(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['sub'][substr($category_code,0,6)]['sub'])) { // 4depth
    $cf_title_txt = unserialize(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['title'])[getLocale()];
}else if(!empty(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['sub'])) { // 3depth
    $cf_title_txt = unserialize(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['sub'][substr($category_code,0,6)]['title'])[getLocale()];
}else if(!empty(@$arrNav[substr($category_code,0,2)]['sub'])) { // 2depth
    $cf_title_txt = unserialize(@$arrNav[substr($category_code,0,2)]['sub'][substr($category_code,0,4)]['title'])[getLocale()];
} else { // 1depth
   $cf_title_txt = unserialize(@$arrNav[substr($category_code,0,2)]['title'])[getLocale()];
}
if (!empty(@$arrSubMenu) and !preg_match('/index.php\?tpf=shop/',$_SERVER['REQUEST_URI']) and !preg_match('/member+\//',$_SERVER['REQUEST_URI'])) {
?>


<div class="subCommonWrap--fc ce_item">
	<div class="inner">
    <header class="subCommon--fc">
      <h2><?=@$cf_title_txt?></h2>
      <p><?=_LANG('')?></p>
    </header>

<?php

if (!empty($arrSubMenu[substr(@$category_code,0,4)]['sub'][substr($category_code,0,6)]['sub'])) {
    echo '
    <div class="cateBox ce_item">
        <ul class="category_list--fc">';
    $index = 1;
    foreach($arrSubMenu[substr(@$category_code,0,4)]['sub'][substr($category_code,0,6)]['sub'] as $key => $val) {
        $val['title'] = unserialize($val['title'])[getLocale()];
        $val['status'] = unserialize($val['status'])[getLocale()];
        if (!empty($val['title']) and $val['status'] == 'y') {
            if ((empty($arrUrl[1]) and $index == 1) or @$arrUrl[2] == $val['url']) {
                $on_class="class='on'";
                if($val['is_outer_link'] == 'n') echo '<li '.$on_class.'><a href="'.$prefix_link.'/'.$val['full_url'].'">'.$val['title'].'</a></li>';
                else echo '  <li '.$on_class.'><a href="'.$val['url'].'" target="'.$val['target'].'">'.$val['title'].'</a></li>';  // 외부링크 일때
            } else {
                if($val['is_outer_link'] == 'n') echo '<li><a href="'.$prefix_link.'/'.$val['full_url'].'">'.$val['title'].'</a></li>';
                else echo '  <li><a href="'.$val['url'].'" target="'.$val['target'].'">'.$val['title'].'</a></li>';  // 외부링크 일때
            }
        }
        $index++;
    }
    echo '
        </ul>
    </div>';
}
?>
	</div>
</div>
<script>
var lengthValue = $(".subCommon--fc .cateBox .category_list--fc li").length;
//console.log(lengthValue);
if(lengthValue <= 0) {
    $(".subCommon--fc .cateBox").hide();
}
/*
var lengthValue = $("#leftMenu ul li").length;
var cssWidthValue = 100 / lengthValue;
$("#leftMenu ul li").css('width',cssWidthValue+"%");*/
</script>
<?php
}
?>