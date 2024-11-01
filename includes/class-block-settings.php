<?php
namespace Red8\Short_Title_Block;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class I8_Block_Settings
 * Handles extending and modifying the title block.
 */
class Block_Settings {

	public function __construct() {
		$this->remove_core_blocks();
		add_action( 'init', array( $this, 'init_query_loop_settings' ) );
		add_action( 'init', array( $this, 'register_meta' ) );
	}

	public function register_meta() {
		register_post_meta(
			'',
			'short_title',
			array(
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			)
		);
	}

	/**
	 * We want to remove these core actions and requeue it later with a new function
	 * that will overwrite render_callback
	 */
	private function remove_core_blocks() {
		remove_action( 'init', 'register_block_core_post_title', 10 );
	}

	/**
	 * Enqueue necessary block assets
	 */
	public function init_query_loop_settings() {
		$asset_file = include RED_8_SHORT_TITLE_BLOCK_PATH . '/block/build/index.asset.php';
		wp_register_script(
			'red8-post-title-settings',
			RED_8_SHORT_TITLE_BLOCK_URL . '/block/build/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		register_block_type(
			'red8-blocks/red8-post-title',
			array(
				'api_version'   => 2,
				'editor_script' => 'red8-post-title-settings',
			)
		);

		/*
		 * Overwrite core block render_callback function in \wp-includes\blocks\post-title.php
		 */
		register_block_type_from_metadata(
			WPINC . '/blocks/post-title',
			array(
				'render_callback' => array( $this, 'render_block_core_post_title' ),
			)
		);
	}

	/**
	 * Returns post title or post short title if specified.
	 *
	 * @param $attributes
	 * @param $content
	 * @param $block
	 *
	 * @return string
	 */
	public function render_block_core_post_title( $attributes, $content, $block ) {
		if ( ! isset( $block->context['postId'] ) ) {
			return '';
		}
		$post_ID = $block->context['postId'];
		$title   = get_the_title();
		if ( ! $title ) {
			return '';
		}
		$tag_name         = 'h2';
		$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";
		if ( isset( $attributes['level'] ) ) {
			$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . $attributes['level'];
		}
		if ( isset( $attributes['useShortTitle'] ) && 'yes' === $attributes['useShortTitle'] ) {

			$short_title = get_post_meta( $post_ID, 'short_title', true );

			$title = $short_title ? $short_title : $title;
		}
		if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
			$title = sprintf( '<a href="%1$s" target="%2$s" rel="%3$s">%4$s</a>', get_the_permalink( $post_ID ), esc_attr( $attributes['linkTarget'] ), esc_attr( $attributes['rel'] ), $title );
		}
		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) );

		return sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			$wrapper_attributes,
			$title
		);
	}
}
