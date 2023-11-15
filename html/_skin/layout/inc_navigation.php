<?php
include(_LIBRARY_DIR."/config/menu.php");
$prefix_link = $locale != getDefaultLocale() ? '/'.$locale : '';
?>

    <ul>
<?php
if (!empty($arrNav)) {
    foreach($arrNav as $key => $val) {
        $val['title'] = @unserialize($val['title'])[$locale];
        $val['status'] = @unserialize($val['status'])[$locale];
        // 1차 카테고리
        if(!checkMemberLevelMenu($val['show_level'])){//1차 카테고리 레벨 별 노출 제한
            if (!empty($val['title']) and $val['status'] == 'y') {
                echo '
                    <li>';
                if($val['is_outer_link'] == 'n') echo '<a href="'.$prefix_link.'/'.$val['url'].'" data-url="'.$val['url'].'" class="depth1">'.$val['title'].'</a><!-- 1차 -->';
                else echo '<a href="'.$val['url'].'" target="'.$val['target'].'"" data-url="'.$val['url'].'" class="depth1">'.$val['title'].'</a><!-- 1차 -->';
                // 2차 카테고리
                if (!empty($val['sub'])) {
                    echo '<ul class="depth2">';
                    foreach($val['sub'] as $key2 => $val2) {
                        if(!checkMemberLevelMenu($val2['show_level'])){//2차 카테고리 레벨 별 노출 제한
                            $val2['title'] = unserialize($val2['title'])[$locale];
                            $val2['status'] = unserialize($val2['status'])[$locale];
                            if ($val2['title'] and $val2['status'] == 'y') {
                                if($val2['is_outer_link'] == 'n') echo '  <li><a href="'.$prefix_link.'/'.$val2['full_url'].'">'.$val2['title'].'</a><!-- 2차 -->';
                                else echo '  <li><a href="'.$val2['url'].'" target="'.$val2['target'].'">'.$val2['title'].'</a><!-- 2차 -->';  // 외부링크 일때
                            }
                            // 3차 카테고리
                            if (!empty($val2['sub'])) {
                                echo '<ul class="depth3">';
                                    foreach($val2['sub'] as $key3 => $val3) {
                                        $val3['title'] = unserialize($val3['title'])[$locale];
                                        $val3['status'] = unserialize($val3['status'])[$locale];
                                        if ($val3['title'] and $val3['status'] == 'y') {
                                            if($val3['is_outer_link'] == 'n') { echo '  <li'; if (!empty($val3['sub'])) { echo ' class="in"';} echo '><a href="'.$prefix_link.'/'.$val3['full_url'].'">'.$val3['title'].'</a><!-- 3차 -->';}
                                            else echo '  <li><a href="'.$val3['url'].'" target="'.$val3['target'].'">'.$val2['title'].'</a><!-- 3차 -->';  // 외부링크 일때
                                        }
                                        // 4차 카테고리
                                        if (!empty($val3['sub'])) {
                                            echo '<ul class="depth4">';
                                                foreach($val3['sub'] as $key4 => $val4) {
                                                    $val4['title'] = unserialize($val4['title'])[$locale];
                                                    $val4['status'] = unserialize($val4['status'])[$locale];
                                                    if ($val4['title'] and $val4['status'] == 'y') {
                                                        if($val4['is_outer_link'] == 'n') echo '  <li><a href="'.$prefix_link.'/'.$val4['full_url'].'">'.$val4['title'].'</a></li><!-- 4차 -->';
                                                        else echo '  <li><a href="'.$val4['url'].'" target="'.$val4['target'].'">'.$val3['title'].'</a></li><!-- 4차 -->';  // 외부링크 일때
                                                    }
                                                }
                                            echo '</ul>';
                                        }
                                        echo '</li>';
                                    }
                                echo '</ul>';
                            }
                            echo '</li>';
                        }
                    }
                    echo '</ul>';
                }
                echo '
                    </li>';
            }
        }
    }
}


?>
    </ul>