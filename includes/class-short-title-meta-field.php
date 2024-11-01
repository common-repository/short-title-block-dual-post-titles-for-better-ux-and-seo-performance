<?php
namespace Red8\Short_Title_Block;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 *  Creates short title meta box and handles saving.
 */
class Short_Title_Meta {

	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_short_post_title_meta_box' ) );
		add_action( 'save_post', array( $this, 'save_custom_meta_field' ) );
	}

	public function add_short_post_title_meta_box() {
		$post_types = array( 'post', 'page' );

		foreach ( $post_types as $post_type ) {
			add_meta_box(
				'short_post_title_meta_box',
				'Short Post Title',
				array( $this, 'render_short_post_title_meta_box' ),
				$post_type,
				'side'
			);
		}
	}



	public function render_short_post_title_meta_box( $post ) {
		$short_post_title = get_post_meta( $post->ID, 'short_title', true );
		wp_nonce_field( 'red8_short_post_title', 'red8_short_post_title_nonce' );

		?>
		<input placeholder="Short Post Title" type="text" id="short_post_title" name="short_post_title" value="<?php echo esc_attr( $short_post_title ); ?>" style="width:100%;" />
		<?php
	}

	public function save_custom_meta_field( $post_id ) {


		if ( ! isset( $_POST['red8_short_post_title_nonce'] ) ) {
			return $post_id;
		}

		if ( ! wp_verify_nonce(
			sanitize_text_field( wp_unslash ($_POST['red8_short_post_title_nonce'])),
				'red8_short_post_title' ) ) {
			return $post_id;
		}


		if ( isset( $_POST['short_post_title'] ) ) {
			update_post_meta( $post_id, 'short_title', sanitize_text_field( wp_unslash( $_POST['short_post_title'] ) ) );
		}
	}
}

