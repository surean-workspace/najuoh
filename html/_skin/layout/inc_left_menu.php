<?php
include(_LIBRARY_DIR."/config/menu.php");
if($locale != getDefaultLocale()) $arrUrl = explode('/', preg_replace('/'.$locale.'\//','',@$_GET['url']));
$arrSubMenu = @$arrNav[substr(@$category_code,0,2)]['sub'];
 
if (!empty(@$arrSubMenu) and !preg_match('/index.php\?tpf=shop/',$_SERVER['REQUEST_URI']) and !preg_match('/member/',$_SERVER['REQUEST_URI'])) {
?>
<?php
// 2차 카테고리
if (!empty($arrSubMenu)) {
    echo '
    <div id="leftMenu">
		<div class="leftMenu__tit">
      <div class="tit-inner">
        <h2>
          '.unserialize(@$arrNav[substr(@$category_code,0,2)]['title'])[getLocale()].'
        </h2>
      </div>
		</div>
        <ul class="leftMenu__list-fc">';
        $index = 1;
        foreach($arrNav[$arrCategory[1]]['sub'] as $key => $val) { // 2차 카테고리
            $val['title'] = unserialize($val['title'])[$locale];
            $val['status'] = unserialize($val['status'])[$locale];
            if (!empty($val['title']) and $val['status'] == 'y') {
                echo '  <li'; if((empty($arrUrl[1]) and $index == 1) or @$arrUrl[1] == $val['url']) { echo ' class="on"';} echo '>';
                if($val['is_outer_link'] == 'n') echo '<a href="'.$prefix_link.'/'.$val['full_url'].'">'.$val['title'].'</a><!-- 2차 -->';
                else echo '  <a href="'.$val['url'].'" target="'.$val['target'].'">'.$val['title'].'</a><!-- 2차 -->';  // 외부링크 일때

                if (!empty($val['sub'])) { // 3차 카테고리
                  $index = 1;
                  echo '<ul class="depth2">';
                  foreach($val['sub'] as $key => $val2) {
                     $val2['title'] = unserialize($val2['title'])[$locale];
                     $val2['status'] = unserialize($val2['status'])[$locale];
                     if ($val2['title'] and $val2['status'] == 'y') {
                        echo '  <li'; if((empty($arrUrl[1]) and $index == 1) or @$arrUrl[2] == $val2['url']) { echo ' class="on"';} echo '>';
                        if($val['is_outer_link'] == 'n') echo '<a href="'.$prefix_link.'/'.$val2['full_url'].'">'.$val2['title'].'</a><!-- 2차 -->';
                        else echo '  <a href="'.$val2['url'].'" target="'.$val2['target'].'">'.$val2['title'].'</a><!-- 2차 -->';  // 외부링크 일때
                        echo '  </li>';
                    }
                    $index++;
                  }
                  echo '
                  </ul>';
                }
                echo '  </li>';
            }
            $index++;
        }
    echo '
        </ul>
    </div>';
}
?>

<script>
// var lengthValue = $("#leftMenu ul li").length;
// var cssWidthValue = 100 / lengthValue;
// $("#leftMenu ul li").css('width',cssWidthValue+"%");
</script>
<?php
}
?>
