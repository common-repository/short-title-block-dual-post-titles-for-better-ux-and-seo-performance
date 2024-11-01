<?php
/**
 * Plugin Name:     Short Title Block - Dual Post Titles for Better UX and SEO Performance
 * Plugin URI:
 * Description:     Add a second short and engaging post title for archive pages and in query loops, to boost click-through rates and engagement
 * Author:          Red8 Interactive
 * Author URI:      http://red8interactive.com
 * Text Domain:     red8-short-post-title
 * Domain Path:     /languages
 * Version:         1.0.2
 * License: GPLv2 or later
 * @package         Short_Post_Title
 */

namespace Red8\Short_Title_Block;

define( 'RED_8_SHORT_TITLE_BLOCK_PATH', plugin_dir_path( __FILE__ ) );
define( 'RED_8_SHORT_TITLE_BLOCK_URL', plugin_dir_url( __FILE__ ) );


require_once 'includes/class-block-settings.php';
require_once 'includes/class-short-title-meta-field.php';


new Block_Settings();

add_action(
	'plugins_loaded',
	function () {
		new Short_Title_Meta();
	}
);
