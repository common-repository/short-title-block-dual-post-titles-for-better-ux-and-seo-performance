
const { __ } = wp.i18n;
import { useBlockProps } from '@wordpress/block-editor';

// Enable custom attributes on Paragraph block
const enabledBlocks = [
	'core/post-title'
];

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { BlockControls } = wp.blockEditor;
const {
	ToolbarGroup,
	ToolbarButton
} = wp.components;
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import PostTitleEdit from  "./edit.js"


import classnames from 'classnames'

/**
 * Create new attribute
 */
const setToolbarButtonAttribute = ( settings, name ) => {

	if ( ! enabledBlocks.includes( name ) ) {
		return settings;
	}

	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			useShortTitle: { type: 'string' }
		} ),
	} );
};
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'i8-attributes/set-toolbar-button-attribute',
	setToolbarButtonAttribute
);

const icon_active = wp.element.createElement(
	wp.primitives.SVG,
	{ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64" },
	wp.element.createElement(
		wp.primitives.Path,
		{
			d: "M55.8008 36.959H36.0254V94H28.1152V36.959H8.33984V30.0156H55.8008V36.959Z",
		}
	)
);

const icon_inactive = wp.element.createElement(
	wp.primitives.SVG,
	{ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 64 64" },
	wp.element.createElement(
		wp.primitives.Path,
		{
			d: "M55.8008 6.95898H36.0254V64H28.1152V6.95898H8.33984V0.015625H55.8008V6.95898Z",
		}
	)
);

/**
 * Add button to the toolbar
 */
const withToolbarButton = createHigherOrderComponent( ( BlockEdit  ) => {
	return ( props ) => {

		// If current block is not allowed
		if ( ! enabledBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		const { attributes, setAttributes } = props;
		const { useShortTitle } = attributes;


		return (
			<Fragment>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							icon={ useShortTitle === 'yes' ? icon_active : icon_inactive}
							label={ __( 'Use short title', 'inn8ly' ) }
							isActive={ useShortTitle === 'yes' }
							onClick={ () => {
								if ( useShortTitle === 'yes' ) {
									setAttributes( { useShortTitle: false } )
								} else {
									setAttributes( { useShortTitle: 'yes' } )
								}
							} }
						/>
					</ToolbarGroup>
				</BlockControls>
				{
					useShortTitle === "yes" ? <PostTitleEdit {...props} /> : <BlockEdit {...props} />
				}



			</Fragment>
		);
	};
}, 'withToolbarButton' );


wp.hooks.addFilter(
	'editor.BlockEdit',
	'i8-attributes/with-toolbar-button',
	withToolbarButton
);

